"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Suspense } from "react";

function PaymentContent() {
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
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 flex items-start justify-center px-4 pt-24 sm:pt-32">
            {/* Background decoration similar to your website */}
            <div className="absolute inset-0 bg-[url('/img-4.png')] bg-cover bg-no-repeat bg-center opacity-10"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl w-full relative z-10"
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="subtitle-gradient text-3xl sm:text-4xl font-semibold mb-4">
                        Choose Payment Method
                    </h2>
                    <p className="text-gray-300 text-base sm:text-lg">
                        Select how you&apos;d like to pay your deposit
                    </p>
                </div>

                {/* Main Grid Layout */}
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-8">

                    {/* Payment Methods - Left Columns (2/3) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="lg:col-span-2"
                    >
                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">

                            {/* Credit Card (Stripe) */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group"
                            >
                                <button
                                    onClick={() => handlePayment("stripe")}
                                    disabled={isProcessing}
                                    className={`w-full h-full bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 sm:p-6 lg:p-8 text-left transition-all backdrop-blur-sm ${selectedMethod === "stripe" ? "border-white bg-white/10" : "hover:border-white/50 hover:bg-neutral-800/60"
                                        } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    <div className="flex flex-col h-full">
                                        {/* Icon */}
                                        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-all ${selectedMethod === "stripe" ? "bg-white/20" : "bg-white/10 group-hover:bg-white/20"
                                            }`}>
                                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                            </svg>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h4 className="text-white font-semibold text-lg sm:text-xl mb-2">Credit Card</h4>
                                            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                                                Pay with Visa, Mastercard, or Amex
                                            </p>

                                            {/* Features */}
                                            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg>
                                                    Instant processing
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg>
                                                    Secure encryption
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Checkmark */}
                                        <div className={`transition-all mt-3 sm:mt-4 ${selectedMethod === "stripe" ? "text-white" : "text-transparent"
                                            }`}>
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
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
                                    className={`w-full h-full bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 sm:p-6 lg:p-8 text-left transition-all backdrop-blur-sm ${selectedMethod === "paypal" ? "border-white bg-white/10" : "hover:border-white/50 hover:bg-neutral-800/60"
                                        } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    <div className="flex flex-col h-full">
                                        {/* Icon */}
                                        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-all ${selectedMethod === "paypal" ? "bg-white/20" : "bg-white/10 group-hover:bg-white/20"
                                            }`}>
                                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 4.203A.641.641 0 0 1 5.564 3.7h7.226c1.5 0 2.642.352 3.426 1.047.794.705 1.13 1.718 1.003 3.014a5.237 5.237 0 0 1-.522 1.718 5.08 5.08 0 0 1-1.087 1.401 5.322 5.322 0 0 1-1.586.936 5.49 5.49 0 0 1-1.924.342H9.791l-.58 3.784a.641.641 0 0 1-.633.54h-1.5zm7.393-11.995h-1.5a.641.641 0 0 0-.633.54l-.58 3.784h1.5l.58-3.784a.641.641 0 0 1 .633-.54z" />
                                            </svg>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h4 className="text-white font-semibold text-xl mb-2">PayPal</h4>
                                            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                                                Fast and secure payment
                                            </p>

                                            {/* Features */}
                                            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg>
                                                    Buyer protection
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg>
                                                    Quick checkout
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Checkmark */}
                                        <div className={`transition-all mt-3 sm:mt-4 ${selectedMethod === "paypal" ? "text-white" : "text-transparent"
                                            }`}>
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </motion.div>

                            {/* Bank Transfer - Spans 2 columns */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group md:col-span-2"
                            >
                                <button
                                    onClick={() => handlePayment("bank")}
                                    disabled={isProcessing}
                                    className={`w-full bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 sm:p-6 lg:p-8 text-left transition-all backdrop-blur-sm ${selectedMethod === "bank" ? "border-white bg-white/10" : "hover:border-white/50 hover:bg-neutral-800/60"
                                        } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    <div className="flex flex-col md:flex-row gap-8 items-center">
                                        {/* Icon */}
                                        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all shrink-0 ${selectedMethod === "bank" ? "bg-white/20" : "bg-white/10 group-hover:bg-white/20"
                                            }`}>
                                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M11.5 1L2 6v2h19V6m-5.5 7l-4 4-4-4m0 6l4 4 4-4" />
                                            </svg>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h4 className="text-white font-semibold text-lg sm:text-xl mb-2">Bank Transfer</h4>
                                            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                                                Direct bank deposit
                                            </p>

                                            {/* Features */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg>
                                                    No fees
                                                </div>
                                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg>
                                                    Secure
                                                </div>
                                                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg>
                                                    Traditional
                                                </div>
                                            </div>
                                        </div>

                                        {/* Checkmark */}
                                        <div className={`transition-all shrink-0 ${selectedMethod === "bank" ? "text-white" : "text-transparent"
                                            }`}>
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </motion.div>

                        </div>
                    </motion.div>

                    {/* Order Summary - Right Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm sticky top-24">
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
                                Order Summary
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-neutral-600/30">
                                    <span className="text-gray-300">Plan:</span>
                                    <span className="text-white font-medium">{plan || "Professional"}</span>
                                </div>

                                <div className="flex justify-between items-center py-3 border-b border-neutral-600/30">
                                    <span className="text-gray-300">Deposit Amount:</span>
                                    <span className="text-white font-bold text-base sm:text-lg">
                                        {deposit || "$570"}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pt-4">
                                    <span className="text-gray-300">Due Today:</span>
                                    <span className="text-white font-bold text-lg sm:text-xl">
                                        {deposit || "$570"}
                                    </span>
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-neutral-600/30">
                                <div className="flex items-center gap-3 text-white">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                                    </svg>
                                    <span className="text-sm font-medium">Secure Payment</span>
                                </div>
                                <p className="text-gray-400 text-xs sm:text-sm mt-2">
                                    Your payment information is encrypted and secure
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Processing State */}
                {isProcessing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8"
                    >
                        <div className="inline-flex items-center gap-3 bg-white/10 border border-white/30 rounded-lg px-6 py-3 backdrop-blur-sm">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-white">Processing payment...</span>
                        </div>
                    </motion.div>
                )}

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-lg text-white font-medium transition-all backdrop-blur-sm"
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

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 flex items-start justify-center px-4 pt-24 sm:pt-32">
                <div className="text-white text-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
}
