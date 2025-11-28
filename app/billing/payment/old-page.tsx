"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const plan = searchParams.get("plan") || "";
    const deposit = searchParams.get("deposit") || "";
    const [selectedMethod, setSelectedMethod] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async (method: string) => {
        setSelectedMethod(method);
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            // Generate payment ID
            const paymentId = "PAY_" + Math.random().toString(36).substr(2, 9).toUpperCase();

            // Redirect to success page
            window.location.href = `/billing/success?plan=${encodeURIComponent(plan)}&deposit=${encodeURIComponent(deposit)}&payment_id=${encodeURIComponent(paymentId)}`;
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
            {/* Background decoration similar to your website */}
            <div className="absolute inset-0 bg-[url('/img-4.png')] bg-cover bg-no-repeat bg-center opacity-10"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full relative z-10"
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="subtitle-gradient text-4xl font-semibold mb-4">
                        Choose Payment Method
                    </h2>
                    <p className="text-gray-300 text-lg">
                        Select how you'd like to pay your deposit
                    </p>
                </div>

                {/* Order Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-8 mb-8 backdrop-blur-sm"
                >
                    <h3 className="text-xl font-semibold text-white mb-6 text-center">
                        Order Summary
                    </h3>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-neutral-600/30">
                            <span className="text-gray-300">Plan:</span>
                            <span className="text-white font-medium">{plan || "Professional"}</span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-neutral-600/30">
                            <span className="text-gray-300">Deposit Amount:</span>
                            <span className="text-cyan-400 font-bold text-lg">
                                {deposit || "$570"}
                            </span>
                        </div>

                        <div className="flex justify-between items-center pt-4">
                            <span className="text-gray-300">Due Today:</span>
                            <span className="text-white font-bold text-xl">
                                {deposit || "$570"}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Payment Methods */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="space-y-4 mb-8"
                >
                    <h3 className="text-lg font-semibold text-white mb-6 text-center">
                        Select Payment Method
                    </h3>

                    {/* Credit Card (Stripe) */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group"
                    >
                        <button
                            onClick={() => handlePayment("stripe")}
                            disabled={isProcessing}
                            className={`w-full bg-neutral-800/40 border border-neutral-700 rounded-xl p-6 text-left transition-all backdrop-blur-sm ${selectedMethod === "stripe" ? "border-cyan-500 bg-cyan-500/10" : "hover:border-cyan-500/50 hover:bg-neutral-800/60"
                                } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all ${selectedMethod === "stripe" ? "bg-cyan-500/20" : "bg-cyan-500/10 group-hover:bg-cyan-500/20"
                                        }`}>
                                        <svg className="w-7 h-7 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-lg">Credit Card</h4>
                                        <p className="text-gray-400 text-sm">Pay with Visa, Mastercard, or Amex</p>
                                    </div>
                                </div>
                                <div className={`transition-all ${selectedMethod === "stripe" ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"
                                    }`}>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </motion.div>

                    {/* PayPal */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group"
                    >
                        <button
                            onClick={() => handlePayment("paypal")}
                            disabled={isProcessing}
                            className={`w-full bg-neutral-800/40 border border-neutral-700 rounded-xl p-6 text-left transition-all backdrop-blur-sm ${selectedMethod === "paypal" ? "border-cyan-500 bg-cyan-500/10" : "hover:border-cyan-500/50 hover:bg-neutral-800/60"
                                } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all ${selectedMethod === "paypal" ? "bg-cyan-500/20" : "bg-cyan-500/10 group-hover:bg-cyan-500/20"
                                        }`}>
                                        <svg className="w-7 h-7 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 4.203A.641.641 0 0 1 5.564 3.7h7.226c1.5 0 2.642.352 3.426 1.047.794.705 1.13 1.718 1.003 3.014a5.237 5.237 0 0 1-.522 1.718 5.08 5.08 0 0 1-1.087 1.401 5.322 5.322 0 0 1-1.586.936 5.49 5.49 0 0 1-1.924.342H9.791l-.58 3.784a.641.641 0 0 1-.633.54h-1.5zm7.393-11.995h-1.5a.641.641 0 0 0-.633.54l-.58 3.784h1.5l.58-3.784a.641.641 0 0 1 .633-.54z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-lg">PayPal</h4>
                                        <p className="text-gray-400 text-sm">Fast and secure payment</p>
                                    </div>
                                </div>
                                <div className={`transition-all ${selectedMethod === "paypal" ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"
                                    }`}>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </motion.div>

                    {/* Bank Transfer */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group"
                    >
                        <button
                            onClick={() => handlePayment("bank")}
                            disabled={isProcessing}
                            className={`w-full bg-neutral-800/40 border border-neutral-700 rounded-xl p-6 text-left transition-all backdrop-blur-sm ${selectedMethod === "bank" ? "border-cyan-500 bg-cyan-500/10" : "hover:border-cyan-500/50 hover:bg-neutral-800/60"
                                } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all ${selectedMethod === "bank" ? "bg-cyan-500/20" : "bg-cyan-500/10 group-hover:bg-cyan-500/20"
                                        }`}>
                                        <svg className="w-7 h-7 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11.5 1L2 6v2h19V6m-5.5 7l-4 4-4-4m0 6l4 4 4-4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-lg">Bank Transfer</h4>
                                        <p className="text-gray-400 text-sm">Direct bank deposit</p>
                                    </div>
                                </div>
                                <div className={`transition-all ${selectedMethod === "bank" ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"
                                    }`}>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Processing State */}
                {isProcessing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8"
                    >
                        <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-6 py-3 backdrop-blur-sm">
                            <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-cyan-400">Processing payment...</span>
                        </div>
                    </motion.div>
                )}

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-center"
                >
                    <Link
                        href="/"
                        className="text-gray-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                        </svg>
                        Back to website
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
