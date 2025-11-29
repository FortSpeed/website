import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactEmail as defaultTo } from "@/data/contact";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      company,
      email,
      project,
      topic,
      phone,
      budget,
      message,
      to,
    }: {
      name?: string;
      company?: string;
      email?: string;
      project?: string;
      topic?: string;
      phone?: string;
      budget?: "<$500" | "$500–$1500" | "$1500–$5000" | "$5000+" | string;
      message?: string;
      to?: string;
    } = body || {};

    if (!name || !name.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!email || !isEmail(email)) return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    if (!message || !message.trim()) return NextResponse.json({ error: "Message is required" }, { status: 400 });
    if ((!topic || !topic.trim()) && (!project || !project.trim())) return NextResponse.json({ error: "Please select a topic" }, { status: 400 });

    const recipient = (to && isEmail(to) ? to : defaultTo) || defaultTo;

    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || `no-reply@${(SMTP_HOST || "example.com").replace(/^smtp\./, "")}`;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      // Not configured. For development, log the request and return success.
      // In production, you should configure these environment variables.
      console.log("Email not configured - logging request:", {
        name,
        email,
        topic,
        message,
        recipient: defaultTo
      });
      return NextResponse.json({ ok: true, logged: true });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const subject = `New contact from ${name}${(topic || project) ? ` — ${topic || project}` : ""}`;

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Topic: ${topic || project || "-"}`,
      `Phone: ${phone || "-"}`,
      `Budget: ${budget || "-"}`,
      company ? `Company: ${company}` : undefined,
      "",
      "Message:",
      message,
    ].filter(Boolean).join("\n");

    const html = `
      <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#e5e7eb;background:#0a0a0a;padding:24px;">
        <div style="max-width:640px;margin:0 auto;background:#111214;border:1px solid #2a2a2a;border-radius:14px;overflow:hidden;">
          <div style="padding:20px 24px;border-bottom:1px solid #2a2a2a;">
            <h2 style="margin:0;color:#fff;font-size:18px;">New contact request</h2>
            <p style="margin:6px 0 0;color:#c8c8c8;font-size:12px;">from ${name}</p>
          </div>
          <div style="padding:20px 24px;color:#ddd;">
            <p style="margin:0 0 8px;"><strong>Name:</strong> ${name}</p>
            <p style="margin:0 0 8px;"><strong>Email:</strong> ${email}</p>
            <p style="margin:0 0 8px;"><strong>Topic:</strong> ${topic || project || "-"}</p>
            <p style="margin:0 0 8px;"><strong>Phone:</strong> ${phone || "-"}</p>
            <p style="margin:0 0 12px;"><strong>Budget:</strong> ${budget || "-"}</p>
            ${company ? `<p style="margin:0 0 12px;"><strong>Company:</strong> ${company}</p>` : ""}
            <div style="white-space:pre-wrap;background:#0f1113;border:1px solid #2a2a2a;border-radius:8px;padding:12px;color:#eaeaea;">${(message || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
          </div>
        </div>
      </div>`;

    await transporter.sendMail({
      from: SMTP_FROM,
      to: recipient,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/contact error", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
