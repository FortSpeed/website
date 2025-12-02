"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ThanksPageContent() {
    const sp = useSearchParams();
    const type = sp.get("type") || "quote";
    const id = sp.get("id") || "";

    const title = type === "quote" ? "Request Received" : "Submitted";
    const desc = type === "quote"
        ? "Thanks! We've received your request. We'll review and email you a proposal soon."
        : "Thanks! We'll be in touch shortly.";

    return (
        <div className="min-h-screen bg-black text-white px-4 py-16">
            <div className="max-w-xl mx-auto text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-600 mx-auto flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white">
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                </div>
                <h1 className="text-3xl font-semibold">{title}</h1>
                <p className="text-gray-300">{desc}</p>
                {id && (
                    <p className="text-gray-400 text-sm">Reference ID: <span className="font-mono">{id}</span></p>
                )}

                <div className="pt-4">
                    <Link href="/" className="inline-block px-5 py-3 rounded-lg bg-white text-black font-medium">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function ThanksPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        }>
            <ThanksPageContent />
        </Suspense>
    );
}
