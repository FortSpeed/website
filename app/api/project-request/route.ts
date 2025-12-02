import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_FILE = path.join(process.cwd(), "data", "submissions.jsonl");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const PAYMENT_LINK_TTL_MS = 2 * 60 * 1000; // 2 minutes

function ensureDirs() {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export async function GET(req: NextRequest) {
    try {
        const rid = req.nextUrl.searchParams.get("rid");
        if (!rid) {
            return NextResponse.json({ error: "Missing rid" }, { status: 400 });
        }

        const init = findInitialById(rid);
        if (!init) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        if (hasFinalSubmission(rid)) {
            return NextResponse.json({ error: "This payment link has already been used.", code: "USED" }, { status: 409 });
        }

        if (isRidExpired(init)) {
            return NextResponse.json({ error: "This payment link has expired.", code: "EXPIRED" }, { status: 410 });
        }

        return NextResponse.json({
            ok: true,
            submission: {
                id: init.id,
                type: init.type,
                timestamp: init.timestamp,
                data: {
                    project: init.data?.project || null,
                    planId: init.data?.planId || null,
                    planName: init.data?.planName || null,
                },
            },
        });
    } catch (err) {
        console.error("/api/project-request GET error", err);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

function genId(prefix = "req") {
    const rnd = Math.random().toString(36).slice(2, 8);
    return `${prefix}_${Date.now().toString(36)}_${rnd}`;
}

function getClientIp(req: NextRequest) {
    const xf = req.headers.get("x-forwarded-for");
    const xr = req.headers.get("x-real-ip");
    return (xr || (xf ? xf.split(",")[0].trim() : null)) || null;
}

function appendSubmission(row: any) {
    // In production/serverless, use memory storage
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
        submissions.push(row);
        console.log("Submission stored in memory:", row.id);
        return;
    }

    // In development, use file storage
    ensureDirs();
    fs.appendFileSync(DATA_FILE, JSON.stringify(row) + "\n");
}

function findInitialById(id: string): any | null {
    // In production/serverless, search memory
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
        return submissions.find(s => s.id === id && s.phase === 'initial') || null;
    }

    // In development, read from file
    if (!fs.existsSync(DATA_FILE)) return null;
    const lines = fs.readFileSync(DATA_FILE, "utf8").split(/\n+/).filter(Boolean);
    for (const line of lines) {
        try {
            const row = JSON.parse(line);
            if (row.id === id && row.phase === "initial") return row;
        } catch { }
    }
    return null;
}

function hasFinalSubmission(id: string): boolean {
    // In production/serverless, search memory
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
        return submissions.some(s => s.id === id && s.phase === 'final');
    }

    // In development, read from file
    if (!fs.existsSync(DATA_FILE)) return false;
    const lines = fs.readFileSync(DATA_FILE, "utf8").split(/\n+/).filter(Boolean);
    for (const line of lines) {
        try {
            const row = JSON.parse(line);
            if (row.id === id && row.phase === "final") return true;
        } catch { }
    }
    return false;
}

function isRidExpired(init: any): boolean {
    return Date.now() - new Date(init.timestamp).getTime() > PAYMENT_LINK_TTL_MS;
}

async function sendEmail({ to, subject, text, html, replyTo, senderName }: { to: string; subject: string; text: string; html: string; replyTo?: string; senderName?: string }) {
    console.log("🔧 SMTP env check:", {
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASS: process.env.SMTP_PASS ? "***" : undefined,
        SMTP_FROM: process.env.SMTP_FROM,
    });
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || `no-reply@${(SMTP_HOST || "example.com").replace(/^smtp\./, "")}`;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        console.log("Email not configured - would send:", { to, subject, text });
        return { ok: true, logged: true } as const;
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const info = await transporter.sendMail({ from: senderName ? `"${senderName}" <${SMTP_FROM}>` : SMTP_FROM, to, replyTo, subject, text, html });
    console.log("📧 Nodemailer response:", info);
    return { ok: true } as const;
}

function safe(v: any) {
    return String(v ?? "-").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
    try {
        const ip = getClientIp(req);
        const ct = req.headers.get("content-type") || "";

        // Final step with multipart form (TXID + screenshot)
        if (ct.includes("multipart/form-data")) {
            const form = await req.formData();
            const rid = String(form.get("rid") || "").trim();
            const txid = String(form.get("txid") || "").trim();
            const confirm = String(form.get("confirm") || "false") === "true";
            const type = String(form.get("type") || "start");

            if (!rid) return NextResponse.json({ error: "Missing request id" }, { status: 400 });
            if (!txid) return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
            if (!confirm) return NextResponse.json({ error: "Please confirm payment sent" }, { status: 400 });

            const init = findInitialById(rid);
            if (!init) return NextResponse.json({ error: "Initial submission not found" }, { status: 404 });
            if (hasFinalSubmission(rid)) {
                return NextResponse.json({ error: "This payment link has already been used.", code: "USED" }, { status: 409 });
            }
            if (isRidExpired(init)) {
                return NextResponse.json({ error: "This payment link has expired.", code: "EXPIRED" }, { status: 410 });
            }

            let screenshotPath: string | null = null;
            const file = form.get("screenshot");
            if (file && typeof file === "object" && "arrayBuffer" in file) {
                const ab = await (file as File).arrayBuffer();
                const buf = Buffer.from(ab);
                const ext = path.extname((file as File).name || "").slice(0, 10) || ".bin";
                const fname = `${rid}_${Date.now()}${ext}`;

                // In production/serverless, store in memory
                if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
                    uploads.set(fname, buf);
                    screenshotPath = `/uploads/${fname}`;
                    console.log("File stored in memory:", fname);
                } else {
                    // In development, save to file system
                    ensureDirs();
                    const outPath = path.join(UPLOAD_DIR, fname);
                    fs.writeFileSync(outPath, buf);
                    screenshotPath = `/uploads/${fname}`;
                }
            }

            const timestamp = new Date().toISOString();
            const finalRow = {
                id: rid,
                type,
                phase: "final" as const,
                timestamp,
                ip,
                data: { txid, confirm, screenshotPath },
            };
            appendSubmission(finalRow);

            const to = "admin@fortspeed.com";
            const subject = `Payment sent — ${init?.data?.projectTitle || init?.data?.project || "Project"} — ${rid}`;
            // Format initial form data for better display
            const formatInitialField = (key: string, value: any): string => {
                if (typeof value === 'object' && value !== null) {
                    return ''; // Skip complex objects
                }
                return `${key}: ${value}`;
            };

            // Define field order for initial data
            const initialFieldOrder = ['name', 'email', 'company', 'phone', 'project', 'planId', 'planName', 'projectStartPreference', 'submissionType', 'depositAmount', 'termsAgreed'];
            const orderedInitialFields = initialFieldOrder
                .filter(key => init.data && init.data.hasOwnProperty(key) && init.data[key] !== '' && init.data[key] !== null && init.data[key] !== undefined)
                .map(key => formatInitialField(key, init.data[key]));

            // Add specific answers fields
            if (init.data.answers && typeof init.data.answers === 'object') {
                Object.entries(init.data.answers).forEach(([k, v]) => {
                    if (v && v !== '') {
                        if (k === 'What type of website do you need?' && v === 'Other') {
                            const otherType = init.data['Other website type'];
                            if (otherType) {
                                orderedInitialFields.push(`${k}: Other: ${otherType}`);
                            } else {
                                orderedInitialFields.push(`${k}: ${v}`);
                            }
                        } else {
                            orderedInitialFields.push(`${k}: ${v}`);
                        }
                    }
                });
            }

            const formattedInitialFields = orderedInitialFields.filter(f => f !== '').join('\n');

            const text = [
                `Submission Type: Start Immediately`,
                `Timestamp: ${timestamp}`,
                ip ? `IP: ${ip}` : undefined,
                "",
                "Form Fields:",
                formattedInitialFields,
                "",
                "Transaction:",
                `TXID: ${txid}`,
                `Screenshot: ${screenshotPath || "-"}`,
            ].filter(Boolean).join("\n");

            // Convert image to base64 for embedding
            let imageEmbed = '';
            if (screenshotPath) {
                try {
                    let imageBuffer: Buffer | null = null;

                    // In production/serverless, get from memory
                    if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
                        const filename = path.basename(screenshotPath);
                        imageBuffer = uploads.get(filename) || null;
                    } else {
                        // In development, read from file
                        const imagePath = path.join(process.cwd(), 'public', screenshotPath);
                        if (fs.existsSync(imagePath)) {
                            imageBuffer = fs.readFileSync(imagePath);
                        }
                    }

                    if (imageBuffer) {
                        const base64Image = imageBuffer.toString('base64');
                        const mimeType = path.extname(screenshotPath).toLowerCase() === '.png' ? 'image/png' :
                            path.extname(screenshotPath).toLowerCase() === '.jpg' || path.extname(screenshotPath).toLowerCase() === '.jpeg' ? 'image/jpeg' :
                                'image/gif';
                        imageEmbed = `<img src="data:${mimeType};base64,${base64Image}" style="max-width:100%;height:auto;border-radius:8px;border:1px solid #2a2a2a;" alt="Payment Screenshot" />`;
                    }
                } catch (err) {
                    console.error('Failed to embed image:', err);
                }
            }

            const html = `
        <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#e5e7eb;background:#0a0a0a;padding:24px;">
          <div style="max-width:720px;margin:0 auto;background:#111214;border:1px solid #2a2a2a;border-radius:14px;overflow:hidden;">
            <div style="padding:20px 24px;border-bottom:1px solid #2a2a2a;">
              <h2 style="margin:0;color:#fff;font-size:18px;">Payment Sent — Start Immediately</h2>
              <p style="margin:6px 0 0;color:#c8c8c8;font-size:12px;">ID: ${safe(rid)}</p>
            </div>
            <div style="padding:20px 24px;color:#ddd;">
              <p><strong>Timestamp:</strong> ${safe(timestamp)}</p>
              ${ip ? `<p><strong>IP:</strong> ${safe(ip)}</p>` : ""}
              <h3 style="margin:16px 0 8px;color:#fff;">Form Fields</h3>
              <div style="white-space:pre-wrap;background:#0f1113;border:1px solid #2a2a2a;border-radius:8px;padding:12px;color:#eaeaea;font-family:monospace;font-size:13px;line-height:1.5;">${safe(formattedInitialFields)}</div>
              <h3 style="margin:16px 0 8px;color:#fff;">Transaction</h3>
              <p><strong>TXID:</strong> ${safe(txid)}</p>
              ${imageEmbed ? `
                <div style="margin-top:12px;">
                  <p style="margin-bottom:8px;"><strong>Screenshot:</strong></p>
                  ${imageEmbed}
                </div>
              ` : (screenshotPath ? `<p><strong>Screenshot:</strong> <a style="color:#61dafb" href="${safe(screenshotPath)}">${safe(screenshotPath)}</a></p>` : "")}
            </div>
          </div>
        </div>`;

            await sendEmail({ to, subject, text, html });
            return NextResponse.json({ ok: true, id: rid, screenshotPath });
        }

        // Initial step (JSON)
        const body = await req.json();
        const { type, phase, form } = body || {} as any;
        if (!form || (type !== "start" && type !== "quote") || phase !== "initial") {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        const required = ["name", "email", "project"];
        for (const key of required) {
            if (!form[key] || !String(form[key]).trim()) {
                return NextResponse.json({ error: `${key} is required` }, { status: 400 });
            }
        }
        if (!form.termsAgreed) {
            return NextResponse.json({ error: "You must agree to the Terms & Conditions" }, { status: 400 });
        }

        const id = genId(type === "start" ? "start" : "quote");
        const timestamp = new Date().toISOString();
        const initialRow = {
            id,
            type,
            phase: "initial" as const,
            timestamp,
            ip,
            data: form,
        };
        appendSubmission(initialRow);

        // Send notification email for all initial submissions
        const submitLabel = type === "start" ? "Start Immediately" : "Get a Quote";
        const to = "admin@fortspeed.com";
        const subject = `${type === "start" ? "Start immediately" : "Quote"} request — ${form.projectTitle || form.project || form.topic || "Project"} — ${id}`;
        const text = [
            `Submission Type: ${submitLabel}`,
            `Timestamp: ${timestamp}`,
            ip ? `IP: ${ip}` : undefined,
            "",
            "Form Fields:",
        ].filter(Boolean).join("\n");

        // Format form fields for better display
        const formatFormField = (key: string, value: any): string => {
            if (typeof value === 'object' && value !== null) {
                // Skip complex objects, they're handled separately
                return '';
            }
            return `${key}: ${value}`;
        };

        // Define field order and exclude problematic fields
        const fieldOrder = ['name', 'email', 'company', 'phone', 'project', 'planId', 'planName', 'projectStartPreference', 'submissionType', 'depositAmount', 'termsAgreed'];
        const orderedFields = fieldOrder
            .filter(key => form.hasOwnProperty(key) && form[key] !== '' && form[key] !== null && form[key] !== undefined)
            .map(key => formatFormField(key, form[key]));

        // Add specific form fields from answers
        if (form.answers && typeof form.answers === 'object') {
            Object.entries(form.answers).forEach(([k, v]) => {
                if (v && v !== '') {
                    // Handle "Other" case specially
                    if (k === 'What type of website do you need?' && v === 'Other') {
                        const otherType = form['Other website type'];
                        if (otherType) {
                            orderedFields.push(`${k}: Other: ${otherType}`);
                        } else {
                            orderedFields.push(`${k}: ${v}`);
                        }
                    } else {
                        orderedFields.push(`${k}: ${v}`);
                    }
                }
            });
        }

        const formattedFields = orderedFields.filter(f => f !== '').join('\n');
        const finalText = text + '\n' + formattedFields;

        const html = `
        <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#e5e7eb;background:#0a0a0a;padding:24px;">
          <div style="max-width:720px;margin:0 auto;background:#111214;border:1px solid #2a2a2a;border-radius:14px;overflow:hidden;">
            <div style="padding:20px 24px;border-bottom:1px solid #2a2a2a;">
              <h2 style="margin:0;color:#fff;font-size:18px;">New ${submitLabel} Submission</h2>
              <p style="margin:6px 0 0;color:#c8c8c8;font-size:12px;">ID: ${safe(id)}</p>
            </div>
            <div style="padding:20px 24px;color:#ddd;">
              <p><strong>Timestamp:</strong> ${safe(timestamp)}</p>
              ${ip ? `<p><strong>IP:</strong> ${safe(ip)}</p>` : ""}
              <h3 style="margin:16px 0 8px;color:#fff;">Form Fields</h3>
              <div style="white-space:pre-wrap;background:#0f1113;border:1px solid #2a2a2a;border-radius:8px;padding:12px;color:#eaeaea;font-family:monospace;font-size:13px;line-height:1.5;">${safe(formattedFields)}</div>
            </div>
          </div>
        </div>`;

        await sendEmail({ to, subject, text: finalText, html, replyTo: form.email, senderName: form.name });
        console.log("✅ Email sent successfully to", to);

        return NextResponse.json({ ok: true, id });
    } catch (err) {
        console.error("/api/project-request error", err);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
