"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const plan = searchParams.get("plan") || "";
    const deposit = searchParams.get("deposit") || "";
    const id = searchParams.get("payment_id") || "";
    const fallbackId = "PAY_PENDING";

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full"
            >
                {/* Success Icon */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <svg
                            className="w-10 h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </motion.div>

                    <h1 className="text-4xl font-bold text-white mb-4">
                        Payment Successful!
                    </h1>
                    <p className="text-xl text-gray-300">
                        Your project has been officially started
                    </p>
                </div>

                {/* Payment Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 mb-8"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        Payment Summary
                    </h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-700">
                            <span className="text-gray-300">Plan:</span>
                            <span className="text-white font-medium">{plan || "Professional"}</span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-700">
                            <span className="text-gray-300">Deposit Paid:</span>
                            <span className="text-green-400 font-bold text-lg">
                                {deposit || "$570"}
                            </span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-700">
                            <span className="text-gray-300">Payment ID:</span>
                            <span className="text-white font-mono text-sm">
                                {id || fallbackId}
                            </span>
                        </div>

                        <div className="flex justify-between items-center py-3">
                            <span className="text-gray-300">Status:</span>
                            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                                Completed
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Next Steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8"
                >
                    <h3 className="text-xl font-semibold text-white mb-4">
                        What Happens Next?
                    </h3>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-bold">1</span>
                            </div>
                            <div>
                                <h4 className="text-white font-medium">Project Kickoff Call</h4>
                                <p className="text-gray-300 text-sm">
                                    We&apos;ll schedule a call within 24 hours to discuss your project details
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-bold">2</span>
                            </div>
                            <div>
                                <h4 className="text-white font-medium">Project Planning</h4>
                                <p className="text-gray-300 text-sm">
                                    Our team will create a detailed timeline and milestone plan
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-bold">3</span>
                            </div>
                            <div>
                                <h4 className="text-white font-medium">Development Begins</h4>
                                <p className="text-gray-300 text-sm">
                                    We&apos;ll start building your project with regular progress updates
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-center"
                >
                    <p className="text-gray-300 mb-6">
                        Have questions? We&apos;re here to help!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="mailto:contact@fortspeed.com"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Email Support
                        </Link>

                        <Link
                            href="/"
                            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Back to Home
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
                <div className="text-white text-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
