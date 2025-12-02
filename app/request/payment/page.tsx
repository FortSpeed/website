"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { showToast } from "nextjs-toast-notify";

const WALLET = "TCdnuFLw8xJJWvgH73CbqNB2h8MTn1mz9e";

function PaymentPageContent() {
    const sp = useSearchParams();
    const rid = sp.get("rid") || "";

    const [txid, setTxid] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("No file selected");
    const [confirm, setConfirm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [accessError, setAccessError] = useState<{ message: string; code?: string } | null>(null);
    const [submittingInfo, setSubmittingInfo] = useState<{ planName?: string | null } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setError(null);
        setAccessError(null);
        setSubmittingInfo(null);
        if (!rid) {
            setLoading(false);
            return;
        }

        let cancelled = false;
        async function fetchInfo() {
            try {
                const res = await fetch(`/api/project-request?rid=${encodeURIComponent(rid)}`, { cache: "no-store" });
                const data = await res.json();
                if (!res.ok) throw new Error(data?.error || "Not allowed");
                if (!cancelled) {
                    setSubmittingInfo({ planName: data?.submission?.data?.planName });
                }
            } catch (err: any) {
                if (!cancelled) {
                    setAccessError({ message: err?.message || "Access denied. Please submit your project brief first." });
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchInfo();

        return () => {
            cancelled = true;
        };
    }, [rid]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!rid) {
            setError("Missing request reference. Please go back and submit the form again.");
            return;
        }
        if (!txid.trim()) {
            setError("Transaction ID is required");
            return;
        }
        if (!confirm) {
            setError("Please confirm you sent the payment");
            return;
        }

        setSubmitting(true);
        try {
            const fd = new FormData();
            fd.append("rid", rid);
            fd.append("type", "start");
            fd.append("txid", txid.trim());
            fd.append("confirm", String(confirm));
            if (file) fd.append("screenshot", file);

            const res = await fetch("/api/project-request", { method: "POST", body: fd });
            const data = await res.json();
            if (!res.ok) {
                if (data?.code === "USED" || data?.code === "EXPIRED") {
                    setAccessError({ message: data?.error || "Access denied.", code: data?.code });
                }
                throw new Error(data?.error || "Failed to submit");
            }

            showToast.success("Thanks! We received your payment details. We'll validate your transaction and reach out shortly.", { position: "top-right" });
        } catch (err: any) {
            setError(err?.message || "Something went wrong");
            showToast.error(err?.message || "Submission failed", { position: "top-right" });
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white px-4 py-16 flex items-center justify-center">
                <div className="text-center">Checking access…</div>
            </div>
        );
    }

    if (!rid || accessError) {
        return (
            <div className="min-h-screen bg-black text-white px-4 py-16 flex items-center justify-center">
                <div className="max-w-md text-center space-y-4">
                    <h1 className="text-2xl font-semibold">Access Restricted</h1>
                    <p className="text-gray-300">
                        {accessError?.code === "EXPIRED" && "This payment link has expired. Please submit the form again to get a new secure link."}
                        {accessError?.code === "USED" && "This payment link has already been used. Reach out if you need help submitting again."}
                        {!accessError?.code && (accessError?.message || "To access secure payment instructions, please start your project request first.")}
                    </p>
                    <a href="/" className="inline-flex px-4 py-2 rounded-lg bg-white text-black font-medium">Back to Home</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white px-4 py-16">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-semibold mb-2">Secure Payment Instructions (USDT – TRC20)</h1>
                    <p className="text-gray-300">
                        {submittingInfo?.planName
                            ? `To begin ${submittingInfo.planName}, a 30% upfront payment is required.`
                            : "To begin your project immediately, a 30% upfront payment is required."}
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <div className="text-sm text-gray-300">Official FortSpeed Wallet (USDT – TRC20)</div>
                            <div className="font-mono break-all text-lg">{WALLET}</div>
                        </div>
                        <button
                            className="shrink-0 px-3 py-2 rounded-md bg-white/10 border border-white/20 hover:bg-white/20"
                            onClick={() => navigator.clipboard.writeText(WALLET)}
                        >
                            Copy
                        </button>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
                    <h2 className="font-medium">Your Security Matters</h2>
                    <ul className="list-disc pl-5 text-gray-300 space-y-1">
                        <li>Always send USDT on the TRC20 network only.</li>
                        <li>We will never ask you to send money to any wallet address other than the one listed here.</li>
                        <li>After sending your payment, we will validate the transaction and send a confirmation email from admin@fortspeed.com.</li>
                    </ul>
                </div>

                <form onSubmit={onSubmit} className="space-y-4 bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-2">Submit Your Transaction</h3>
                    <input type="hidden" name="rid" value={rid} />

                    <div>
                        <label className="block text-sm mb-1">Transaction ID (TXID)</label>
                        <input
                            className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2"
                            value={txid}
                            onChange={(e) => setTxid(e.target.value)}
                            placeholder="e.g. 3b5a..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Payment Screenshot (optional)</label>
                        <div className="flex items-center gap-3 flex-wrap">
                            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-white/30 bg-white/10 hover:bg-white/20 cursor-pointer text-sm font-medium">
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const selected = e.target.files?.[0] || null;
                                        setFile(selected);
                                        setFileName(selected ? selected.name : "No file selected");
                                    }}
                                />
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 12L12 8m0 0L8 12m4-4v12" />
                                </svg>
                                Choose File
                            </label>
                            <span className="text-sm text-gray-300 break-all">{fileName}</span>
                        </div>
                    </div>

                    <label className="flex items-center gap-3 text-sm">
                        <input
                            type="checkbox"
                            checked={confirm}
                            onChange={(e) => setConfirm(e.target.checked)}
                            className="mt-0.5 h-4 w-4"
                        />
                        <span className="leading-tight">I confirm I sent the 30% deposit to the wallet above.</span>
                    </label>

                    {error && <div className="text-red-400 text-sm">{error}</div>}

                    <button type="submit" disabled={submitting} className="px-5 py-3 rounded-lg bg-white text-black font-medium disabled:opacity-60">
                        {submitting ? "Submitting..." : "Payment Sent"}
                    </button>
                </form>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h3 className="font-medium mb-2">What Happens After You Pay?</h3>
                    <ol className="list-decimal pl-5 text-gray-300 space-y-1">
                        <li>You send the 30% deposit.</li>
                        <li>You submit your Transaction ID (TXID) in the form.</li>
                        <li>Within a few hours, you receive a confirmation email from admin@fortspeed.com.</li>
                        <li>Your project is assigned and work begins immediately. You'll receive regular updates.</li>
                    </ol>
                    <p className="text-gray-300 mt-2">Support: admin@fortspeed.com</p>
                </div>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading payment page...</p>
                </div>
            </div>
        }>
            <PaymentPageContent />
        </Suspense>
    );
}
