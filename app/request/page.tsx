"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RequestPage() {
    const router = useRouter();
    const [type, setType] = useState<"start" | "quote">("start");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [project, setProject] = useState("");
    const [message, setMessage] = useState("");
    const [terms, setTerms] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!terms) {
            setError("You must agree to the Terms & Conditions.");
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch("/api/project-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type,
                    phase: "initial",
                    form: {
                        name,
                        email,
                        company,
                        phone,
                        project,
                        message,
                        termsAgreed: terms,
                        submissionType: type === "start" ? "Start Immediately" : "Get a Quote",
                    },
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Failed to submit");
            const id = data.id as string;
            if (type === "start") {
                router.push(`/request/payment?rid=${encodeURIComponent(id)}`);
            } else {
                router.push(`/request/thanks?type=quote&id=${encodeURIComponent(id)}`);
            }
        } catch (err: any) {
            setError(err?.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-black text-white px-4 py-16">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-semibold mb-6">Start a Project</h1>
                <p className="text-gray-300 mb-8">Choose how you want to proceed.</p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                        type="button"
                        onClick={() => setType("start")}
                        className={`px-4 py-3 rounded-lg border ${type === "start" ? "border-white bg-white/10" : "border-white/20 hover:border-white/40"
                            }`}
                    >
                        Start Immediately
                    </button>
                    <button
                        type="button"
                        onClick={() => setType("quote")}
                        className={`px-4 py-3 rounded-lg border ${type === "quote" ? "border-white bg-white/10" : "border-white/20 hover:border-white/40"
                            }`}
                    >
                        Get a Quote
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Name</label>
                            <input className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <input type="email" className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Company (optional)</label>
                            <input className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2" value={company} onChange={(e) => setCompany(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Phone (optional)</label>
                            <input className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Project Title</label>
                        <input className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2" value={project} onChange={(e) => setProject(e.target.value)} required />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Brief Description</label>
                        <textarea className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 min-h-[120px]" value={message} onChange={(e) => setMessage(e.target.value)} required />
                    </div>

                    <label className="flex items-start gap-2 text-sm">
                        <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
                        <span>I agree to the Terms & Conditions</span>
                    </label>

                    {error && <div className="text-red-400 text-sm">{error}</div>}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-3 rounded-lg bg-white text-black font-medium disabled:opacity-60"
                    >
                        {submitting ? "Submitting..." : type === "start" ? "Continue to Payment" : "Submit Request"}
                    </button>
                </form>
            </div>
        </div>
    );
}
