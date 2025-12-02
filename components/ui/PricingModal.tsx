// PricingModal (refactored layout to match sketch; keeps your colors & behavior)
"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import CustomSelect from "./CustomSelect";
import { contactEmail as defaultRecipient } from "@/data/contact";
import {
    planQuestions,
    title as plansTitle,
    plans as rawPlans,
    calculateDeposit,
    formatCurrency,
} from "@/data/prices";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { showToast } from "nextjs-toast-notify";

const leadSchema = z.object({
    name: z.string().regex(/^[A-Za-z\u0600-\u06FF\s'-]{2,50}$/, "Please enter a valid name (2–50 letters, spaces, ' or -)"),
    email: z.string().min(1, "Please enter your email").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/, "Enter a valid email"),
    company: z.string().optional(),
    phone: z
        .string()
        .optional()
        .refine((v) => {
            if (!v || v.trim() === "") return true; // optional when empty
            return /^\d{7,15}$/.test(v);
        }, "Enter a valid phone number"),
    agree: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
    // Dynamic step 2 fields - all optional since they only apply to specific plans
    "What type of website do you need?": z.string().optional(),
    "Other website type": z.string().optional(),
    "Do you have the content ready?": z.string().optional(),
    "Tell us about your project": z.string().optional(),
    "How many pages or main features do you need?": z.string().optional(),
    "Do you have branding or design ready?": z.string().optional(),
    "What is your timeline?": z.string().optional(),
    "What problem are you trying to solve?": z.string().optional(),
    "List any core features you need": z.string().optional(),
    "Do you need AI or automation?": z.string().optional(),
    "Do you have an existing website? (optional URL)": z.string().optional(),
    "Existing website? (optional URL)": z.string().optional(),
    "Flexible date": z.string().optional(),
}).passthrough(); // Allow additional fields

type Lead = z.infer<typeof leadSchema>;

type PlanQuestion = {
    label: string;
    type: string;
    options?: string[];
};

type Props = {
    open: boolean;
    onClose: () => void;
    initialPlanId?: string;
};

export default function PricingModal({ open, onClose, initialPlanId }: Props) {
    const [step, setStep] = useState<"plans" | "preference" | "form">("plans");
    const [formStep, setFormStep] = useState(1);
    const [projectStartPreference, setProjectStartPreference] = useState<"now" | "quote" | null>(null);

    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
        initialPlanId ?? null
    );

    const plans = rawPlans;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch,
        trigger,
        setError,
        clearErrors,
    } = useForm<Lead>({
        resolver: zodResolver(leadSchema),
        mode: "onChange",
    });

    React.useEffect(() => {
        if (open) {
            setStep("plans");
            setSelectedPlanId(initialPlanId ?? null);
            setProjectStartPreference(null);
            reset();
            setFormStep(1);
        }
    }, [open, initialPlanId, reset]);

    const selectedPlan = useMemo(
        () => plans.find((p) => p.id === selectedPlanId) ?? null,
        [plans, selectedPlanId]
    );

    function pickPlan(id: string) {
        // Invalidate any previous pending submission/fallbacks
        try {
            const wAny: any = window as any;
            wAny.__mailRunId = (wAny.__mailRunId || 0) + 1; // bump global run so older callbacks can't open
            if (wAny.__mailAbortController) {
                try { wAny.__mailAbortController.abort(); } catch { }
            }
        } catch { }

        setSelectedPlanId(id);
        setStep("preference");
    }

    // Validate first step and show errors
    async function validateStep1() {
        const phoneVal = watch("phone");
        if (phoneVal && phoneVal.trim() !== "") {
            // validate phone too when provided
            return await trigger(["name", "email", "phone"] as any);
        }
        return await trigger(["name", "email"]);
    }

    // Live validation for individual step 2 fields
    const validateField = (fieldName: string, value: string) => {
        // Clear error for this field first
        clearErrors(fieldName as any);

        // Skip optional fields (those containing "(optional)" or "(optional URL)")
        if (fieldName.toLowerCase().includes("(optional)") || fieldName.toLowerCase().includes("(optional url)")) {
            return;
        }

        // Handle flexible date field
        if (fieldName === "Flexible date") {
            if (!value || (typeof value === 'string' && value.trim() === '')) {
                setError(fieldName as any, { message: "Please select a preferred date" });
                return;
            }
            return;
        }

        // Check if field is required and empty
        if (!value || (typeof value === 'string' && value.trim() === '')) {
            setError(fieldName as any, { message: `Please ${fieldName.toLowerCase().includes('?') ? 'answer' : 'enter'} ${fieldName.toLowerCase().replace('?', '')}` });
            return;
        }

        // Check minimum character requirements
        if (fieldName === "Tell us about your project" && value.length < 20) {
            setError(fieldName as any, { message: "Please provide at least 20 characters" });
            return;
        }

        if (fieldName === "How many pages or main features do you need?" && value.length < 5) {
            setError(fieldName as any, { message: "Please provide at least 5 characters" });
            return;
        }

        if (fieldName === "Other website type" && value.length < 3) {
            setError(fieldName as any, { message: "Please provide at least 3 characters" });
            return;
        }
    };

    // Validate step 2 fields
    async function validateStep2() {
        const qList = selectedPlanId
            ? (planQuestions as Record<string, PlanQuestion[]>)[selectedPlanId] || []
            : [];

        let hasErrors = false;

        console.log("validateStep2 called for plan:", selectedPlanId);
        console.log("Questions:", qList);

        // Clear previous errors for step 2 fields
        for (const q of qList) {
            clearErrors(q.label as any);
        }
        clearErrors("Flexible date");
        clearErrors("Other website type");

        // Validate each required field based on its type
        for (const q of qList) {
            const value = watch(q.label as any);
            console.log(`Validating ${q.label}:`, value);

            // Skip optional fields (those containing "(optional)" or "(optional URL)")
            const isOptional = q.label.toLowerCase().includes("(optional)") || q.label.toLowerCase().includes("(optional url)");
            console.log(`Field "${q.label}" contains "(optional)": ${isOptional}`);
            if (isOptional) {
                console.log(`Skipping optional field: ${q.label}`);
                continue;
            }

            // Check if field is required and empty
            if (!value || (typeof value === 'string' && value.trim() === '')) {
                setError(q.label as any, { message: `Please ${q.label.toLowerCase().includes('?') ? 'answer' : 'enter'} ${q.label.toLowerCase().replace('?', '')}` });
                hasErrors = true;
                console.log(`Error set for ${q.label}: empty field`);
            }

            // Check minimum character requirements
            if (q.label === "Tell us about your project" && typeof value === "string" && value.length < 20) {
                setError(q.label as any, { message: "Please provide at least 20 characters" });
                hasErrors = true;
                console.log(`Error set for ${q.label}: too short`);
            }

            if (q.label === "How many pages or main features do you need?" && typeof value === "string" && value.length < 5) {
                setError(q.label as any, { message: "Please provide at least 5 characters" });
                hasErrors = true;
                console.log(`Error set for ${q.label}: too short`);
            }

            // If "Other" is selected for website type, validate the custom field
            if (q.label === "What type of website do you need?" && value === "Other") {
                const otherValue = watch("Other website type");
                if (!otherValue || (typeof otherValue === 'string' && otherValue.trim() === '')) {
                    setError("Other website type" as any, { message: "Please specify the type of website" });
                    hasErrors = true;
                    console.log(`Error set for Other website type: empty field`);
                } else if (typeof otherValue === 'string' && otherValue.length < 3) {
                    setError("Other website type" as any, { message: "Please provide at least 3 characters" });
                    hasErrors = true;
                    console.log(`Error set for Other website type: too short`);
                }
            }

            // Check flexible date if timeline is "Flexible"
            if (q.label === "What is your timeline?" && value === "Flexible") {
                const flexibleDate = watch("Flexible date");
                console.log("Timeline is Flexible, checking date:", flexibleDate);
                if (!flexibleDate) {
                    setError("Flexible date", { message: "Please select a preferred date" });
                    hasErrors = true;
                    console.log("Error set for Flexible date: no date selected");
                }
            }
        }

        console.log("Final hasErrors:", hasErrors);
        return !hasErrors;
    }

    async function submit(data: Lead) {
        const w: any = window as any;
        const originPlanId = selectedPlanId ?? null;
        w.__mailRunId = (w.__mailRunId || 0) + 1;
        w.__mailPlanId = originPlanId;
        // Validate step 1
        if (!(await validateStep1())) {
            setFormStep(1);
            return;
        }

        // Validate step 2
        if (!(await validateStep2())) {
            setFormStep(2);
            return;
        }

        // Agreement checkbox validation (handled by React Hook Form)
        if (!data.agree) {
            return;
        }

        const qList = selectedPlanId
            ? (planQuestions as Record<string, PlanQuestion[]>)[selectedPlanId] || []
            : [];
        const lines: string[] = [];

        // Extract a potential reference file (enterprise plan upload)
        let referenceFile: File | null = null;

        qList.forEach((q: PlanQuestion) => {
            const key = q.label;
            let val = data[key as keyof Lead];
            if (q.type === "file" && val instanceof File) {
                // Remember file for optional embedding, but show its name in the text summary
                referenceFile = val;
                if (val.name) val = val.name;
            }
            if (q.label === "What is your timeline?" && val === "Flexible") {
                const flexibleDate = data["Flexible date"];
                if (flexibleDate) val = `Flexible (Preferred date: ${flexibleDate})`;
            }
            // If "Other" is selected for website type, include the custom specification
            if (q.label === "What type of website do you need?" && val === "Other") {
                const otherType = data["Other website type"];
                if (otherType) val = `Other: ${otherType}`;
            }
            lines.push(`${q.label}: ${val || "-"}`);
        });

        // Also include the "Other website type" field directly if it has a value
        const otherWebsiteType = data["Other website type"];
        if (otherWebsiteType && data["What type of website do you need?"] !== "Other") {
            lines.push(`Other website type: ${otherWebsiteType}`);
        }

        const topic = projectStartPreference === "now"
            ? `Project Started — ${selectedPlan?.name ?? "Unknown"}`
            : `Quote Request — ${selectedPlan?.name ?? "Unknown"}`;
        const message = `Project Type: ${projectStartPreference === "now" ? "Start Project Now" : "Get Quote First"}
Selected plan: ${selectedPlan?.name ?? "(not selected)"}
${selectedPlan && selectedPlan.basePrice > 0 && projectStartPreference === "now" ? `Deposit Amount: ${formatCurrency(calculateDeposit(selectedPlan.basePrice))}` : ""}

Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "-"}
Phone: ${data.phone || "-"}

${lines.join("\n")}`;

        try {
            const wAny: any = window as any;
            if (wAny.__mailAbortController) {
                try { wAny.__mailAbortController.abort(); } catch { }
            }
            wAny.__mailAbortController = new AbortController();

            // Build answers object (for text summary) and, if present, encode reference file as base64
            const answers: Record<string, string | undefined> = {};
            qList.forEach((q) => {
                const value = data[q.label as keyof Lead];
                if (value instanceof File) {
                    if (value.name) {
                        answers[q.label] = value.name;
                    }
                } else if (value !== undefined && value !== null) {
                    answers[q.label] = String(value);
                }
            });

            let referenceImageName: string | null = null;
            let referenceImageData: string | null = null;

            if (referenceFile) {
                const file: any = referenceFile; // explicit cast to avoid TS narrowing to never
                referenceImageName = (file && file.name) ? String(file.name) : null;
                // Convert file to base64 data URL so the server can embed it in the email
                referenceImageData = await new Promise<string | null>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = () => resolve(null);
                    reader.readAsDataURL(file);
                });
            }

            const payload = {
                type: projectStartPreference === "now" ? "start" : "quote",
                phase: "initial" as const,
                form: {
                    name: data.name,
                    email: data.email,
                    company: data.company || "",
                    phone: data.phone || "",
                    project: selectedPlan?.name || "Custom Project",
                    planId: selectedPlan?.id || null,
                    planName: selectedPlan?.name || null,
                    projectStartPreference,
                    submissionType: projectStartPreference === "now" ? "Start Immediately" : "Get a Quote",
                    depositAmount: selectedPlan?.basePrice
                        ? formatCurrency(calculateDeposit(selectedPlan.basePrice))
                        : "Custom",
                    termsAgreed: data.agree,
                    message,
                    answers,
                    // Optional reference upload for enterprise plan
                    referenceImageName,
                    referenceImageData,
                },
            };

            const res = await fetch("/api/project-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                signal: wAny.__mailAbortController.signal,
            });

            if (!res.ok) {
                showToast.error("We couldn't send your request. Please try again.", { position: "top-right" });
                return;
            }

            const { id } = await res.json();
            if (!id) {
                showToast.error("Unexpected response. Please try again.", { position: "top-right" });
                return;
            }

            if (projectStartPreference === "now") {
                // Encode form data in URL for serverless compatibility
                const encodedData = encodeURIComponent(JSON.stringify(payload.form));
                window.location.href = `/request/payment?rid=${encodeURIComponent(id)}&data=${encodedData}`;
            } else {
                window.location.href = `/request/thanks?type=quote&id=${encodeURIComponent(id)}`;
            }
        } catch (err) {
            showToast.error("We couldn't send your request. Please try again.", { position: "top-right" });
            console.error(err);
        }
    }

    // UI helpers for the circular step indicator
    function StepCircle({
        n,
        label,
        active,
    }: {
        n: number;
        label: string;
        active: boolean;
    }) {
        return (
            <div className="flex flex-col items-center">
                <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${active
                        ? "bg-white text-black border-white"
                        : "border-neutral-600 text-neutral-300"
                        } font-medium`}
                >
                    {n}
                </div>
                <div
                    className={`mt-2 text-xs ${active ? "text-white font-medium" : "text-neutral-400"
                        }`}
                >
                    {label}
                </div>
            </div>
        );
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            ariaLabel="Start your project"
            className="max-w-5xl lg:max-w-5xl relative overflow-hidden pb-6"
        >
            {/* hide background video when form opens */}
            {step === "plans" && (
                <>
                    <div className="absolute inset-0 top-0 overflow-hidden pointer-events-none">
                        <div className="border-2 border-white absolute inset-0 scale-125">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover z-0"
                            >
                                <source src="/bg-vid.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="absolute inset-0 bg-radial from-gray-900/20 to-black"></div>
                    </div>
                </>
            )}

            {/* content */}
            <div className="p-4 sm:p-6 md:p-8 relative z-10">
                {/* header */}
                <div className="mb-8 sm:mb-12 max-md:text-center max-md:mt-6 text-center">
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3 sm:mb-4">
                        {plansTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                        Choose a plan to get started or request a custom quote.
                    </p>
                </div>

                {/* PLAN SELECTION */}
                {step === "plans" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        {plans.map((p, idx) => (
                            <div
                                key={p.id}
                                className={`group relative rounded-xl border border-neutral-700 bg-neutral-800/60 hover:bg-neutral-500/25 transition-colors ${idx === 1 ? "md:scale-[1.1] md:z-10" : ""
                                    } overflow-hidden`}
                            >
                                {idx === 1 && (
                                    <>
                                        <BorderBeam
                                            duration={6}
                                            size={400}
                                            className="from-transparent via-red-500 to-transparent"
                                        />
                                        <BorderBeam
                                            duration={6}
                                            delay={3}
                                            size={400}
                                            borderWidth={2}
                                            className="from-transparent via-blue-500 to-transparent"
                                        />
                                    </>
                                )}

                                <div className="p-4 sm:p-5">
                                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                                        <span className="text-2xl sm:text-3xl font-semibold text-white">
                                            {p.number}
                                        </span>
                                    </div>
                                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">
                                        {p.name}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-neutral-300 mb-4 sm:mb-6">{p.tagline}</p>
                                    <p className="text-base sm:text-lg font-medium text-white mb-3">
                                        {p.price}
                                    </p>

                                    <ul className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
                                        {p.features.map((f: string, i: number) => (
                                            <li
                                                key={i}
                                                className="text-xs sm:text-sm text-neutral-300 flex gap-2"
                                            >
                                                <svg
                                                    className="mt-0.5 shrink-0"
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span className="flex-1">{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => pickPlan(p.id)}
                                        className={`w-full inline-flex items-center justify-center rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-colors ${idx === 1 && "!bg-cyan-300/80"
                                            }`}
                                    >
                                        {p.id === "enterprise" ? "Request Quote" : "Get Started"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* PROJECT START PREFERENCE */}
                {step === "preference" && selectedPlan && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* selected plan */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-neutral-400">Selected plan</p>
                                <p className="text-white font-medium">{selectedPlan.name}</p>
                            </div>

                            <button
                                onClick={() => setStep("plans")}
                                type="button"
                                className="text-sm text-neutral-300 hover:text-white underline"
                            >
                                Change
                            </button>
                        </div>

                        {/* Preference selection */}
                        <div className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 text-center">
                                How would you like to start your project?
                            </h3>
                            <p className="text-gray-400 text-xs sm:text-sm text-center mb-6 sm:mb-8">
                                Choose the option that works best for you
                            </p>

                            {/* Plan summary */}
                            <div className="bg-neutral-900/50 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                                    <h4 className="text-base sm:text-lg font-semibold text-white">{selectedPlan.name} Plan</h4>
                                    <div className="text-right sm:text-left">
                                        <div className="text-xl font-bold text-white">{selectedPlan.price}</div>
                                        {selectedPlan.basePrice > 0 && (
                                            <div className="text-sm text-gray-400">
                                                30% deposit: {formatCurrency(calculateDeposit(selectedPlan.basePrice))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Key features */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {selectedPlan.features.slice(0, 4).map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="truncate">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Preference options */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
                                {/* Option A: Start Project Now */}
                                <button
                                    onClick={() => {
                                        setProjectStartPreference("now");
                                        setStep("form");
                                    }}
                                    disabled={selectedPlan.id === "enterprise"}
                                    className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 text-left w-full ${projectStartPreference === "now"
                                        ? "border-green-500 bg-green-500/10"
                                        : selectedPlan.id === "enterprise"
                                            ? "border-neutral-700 bg-neutral-800/50 opacity-50 cursor-not-allowed"
                                            : "border-neutral-700 bg-neutral-800/50 hover:border-neutral-600 hover:bg-neutral-800/70"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${projectStartPreference === "now"
                                            ? "border-green-500 bg-green-500"
                                            : "border-neutral-600"
                                            }`}>
                                            {projectStartPreference === "now" && (
                                                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <h3 className="text-base sm:text-lg font-semibold text-white">Start Project Now</h3>
                                    </div>

                                    <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
                                        Pay the 30% deposit and begin your project immediately
                                    </p>

                                    {selectedPlan.basePrice > 0 ? (
                                        <div className="bg-neutral-900/50 rounded-lg p-2 sm:p-3">
                                            <div className="text-xs text-gray-400 mb-1">Initial payment</div>
                                            <div className="text-lg sm:text-xl font-bold text-white">
                                                {formatCurrency(calculateDeposit(selectedPlan.basePrice))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-neutral-900/50 rounded-lg p-3">
                                            <div className="text-sm text-gray-400">
                                                Contact us for custom pricing
                                            </div>
                                        </div>
                                    )}
                                </button>

                                {/* Option B: Get a Quote First */}
                                <button
                                    onClick={() => {
                                        setProjectStartPreference("quote");
                                        setStep("form");
                                    }}
                                    className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 text-left w-full ${projectStartPreference === "quote"
                                        ? "border-blue-500 bg-blue-500/10"
                                        : "border-neutral-700 bg-neutral-800/50 hover:border-neutral-600 hover:bg-neutral-800/70"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${projectStartPreference === "quote"
                                            ? "border-blue-500 bg-blue-500"
                                            : "border-neutral-600"
                                            }`}>
                                            {projectStartPreference === "quote" && (
                                                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <h3 className="text-base sm:text-lg font-semibold text-white">Get a Quote First</h3>
                                    </div>

                                    <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
                                        Discuss your requirements and receive a custom proposal
                                    </p>

                                    <div className="bg-neutral-900/50 rounded-lg p-2 sm:p-3">
                                        <div className="text-xs text-gray-400 mb-1">What happens next</div>
                                        <ul className="text-xs sm:text-sm text-gray-300 space-y-1">
                                            <li>• Detailed project consultation</li>
                                            <li>• Custom pricing proposal</li>
                                            <li>• No obligation to proceed</li>
                                        </ul>
                                    </div>
                                </button>
                            </div>

                            {/* Enterprise plan notice */}
                            {selectedPlan.id === "enterprise" && (
                                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <h4 className="text-white font-medium mb-1 text-sm sm:text-base">Enterprise Plan</h4>
                                            <p className="text-gray-300 text-xs sm:text-sm">
                                                For enterprise solutions, we&apos;ll provide a custom quote based on your specific requirements.
                                                Select &quot;Get a Quote First&quot; to begin the consultation process.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* FORM MULTI-STEP */}
                {step === "form" && (
                    <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 gap-4 sm:gap-6">
                        {/* selected plan */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                                <p className="text-xs sm:text-sm text-neutral-400">Selected plan</p>
                                <p className="text-white font-medium text-sm sm:text-base">{selectedPlan?.name}</p>
                                {projectStartPreference && selectedPlan && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        {projectStartPreference === "now"
                                            ? `Starting project with ${formatCurrency(calculateDeposit(selectedPlan.basePrice))} deposit`
                                            : "Requesting custom quote"
                                        }
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                {projectStartPreference && (
                                    <button
                                        onClick={() => setStep("preference")}
                                        type="button"
                                        className="text-xs sm:text-sm text-neutral-300 hover:text-white underline"
                                    >
                                        Change preference
                                    </button>
                                )}
                                <button
                                    onClick={() => setStep("plans")}
                                    type="button"
                                    className="text-sm text-neutral-300 hover:text-white underline"
                                >
                                    Change plan
                                </button>
                            </div>
                        </div>

                        {/* MAIN LAYOUT: left = steps + instruction; right = form fields */}
                        <div className="grid grid-cols-1">
                            {/* LEFT: Step circles + instruction */}
                            <div className="md:col-span-5 lg:col-span-4">
                                <div className="flex flex-col items-center mb-6 sm:mb-8">
                                    {/* three circles in a row with arrows */}
                                    <div className="flex items-center gap-2 sm:gap-4 mb-3">
                                        <StepCircle n={1} label="Step 1" active={formStep === 1} />
                                        <div className="w-4 sm:w-6 h-px bg-neutral-600" />
                                        <StepCircle n={2} label="Step 2" active={formStep === 2} />
                                        <div className="w-4 sm:w-6 h-px bg-neutral-600" />
                                        <StepCircle n={3} label="Step 3" active={formStep === 3} />
                                    </div>

                                    {/* short instruction under circles — changes depending on step */}
                                    <p className="text-xs sm:text-sm text-neutral-400 mb-4 sm:mb-6 text-center">
                                        {formStep === 1 &&
                                            "Enter your contact information"}
                                        {formStep === 2 &&
                                            `Tell us about your ${projectStartPreference === "now" ? "project" : "requirements"}`}
                                        {formStep === 3 && `Review and submit your ${projectStartPreference === "now" ? "payment" : "quote request"}`}
                                    </p>

                                    {/* small plan reminder */}
                                    <div className="text-xs text-neutral-500 text-center">
                                        {/* <p>Plan: <span className="text-neutral-300 font-medium">{selectedPlan?.name}</span></p> */}
                                        <p className="mt-2 text-neutral-500 text-xs">
                                            We&apos;ll usually respond within 24 hours.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: Form fields + checkbox + buttons */}
                            <div className="md:col-span-7 lg:col-span-6">
                                <div className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-4 sm:p-6">
                                    {/* Step 1 fields */}
                                    {formStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.18 }}
                                        >
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* Name */}
                                                <div className="sm:col-span-2">
                                                    <label className="block text-xs sm:text-sm text-neutral-200 mb-1 font-medium">
                                                        Your name <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        {...register("name", { onBlur: () => { } })}
                                                        placeholder="Enter your full name"
                                                        className="w-full rounded-lg bg-neutral-800 border border-neutral-700 focus:border-white/30 focus:ring-2 focus:ring-white/5 px-3 py-2 text-white text-sm"
                                                    />
                                                    {errors.name && (
                                                        <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                                                    )}
                                                </div>

                                                {/* Email */}
                                                <div>
                                                    <label className="block text-xs sm:text-sm text-neutral-200 mb-1 font-medium">
                                                        Contact email{" "}
                                                        <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        {...register("email", { onBlur: () => { } })}
                                                        placeholder="your.email@example.com"
                                                        className="w-full rounded-lg bg-neutral-800 border border-neutral-700 focus:border-white/30 focus:ring-2 focus:ring-white/5 px-3 py-2 text-white text-sm"
                                                    />
                                                    {errors.email && (
                                                        <p className="text-xs text-red-400 mt-1">
                                                            {errors.email.message}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Company */}
                                                <div>
                                                    <label className="block text-xs sm:text-sm text-neutral-300 mb-1">
                                                        Company name{" "}
                                                        <span className="text-neutral-500">(optional)</span>
                                                    </label>
                                                    <input
                                                        {...register("company")}
                                                        placeholder="Your company name"
                                                        className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white text-sm"
                                                    />
                                                </div>

                                                {/* Phone */}
                                                <div>
                                                    <label className="block text-xs sm:text-sm text-neutral-300 mb-1">
                                                        Contact phone{" "}
                                                        <span className="text-neutral-500">(optional)</span>
                                                    </label>
                                                    <input
                                                        {...register("phone")}
                                                        placeholder="+1 555 123 4567"
                                                        className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white text-sm"
                                                    />
                                                    {errors.phone && (
                                                        <p className="text-xs text-red-400 mt-1">
                                                            {errors.phone.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 2: project questions */}
                                    {formStep === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.18 }}
                                        >
                                            <div className="grid grid-cols-1 gap-4">
                                                {(selectedPlanId
                                                    ? (planQuestions as Record<string, PlanQuestion[]>)[selectedPlanId]
                                                    : []
                                                )?.map((q: PlanQuestion, idx: number) => (
                                                    <div key={idx}>
                                                        <label className="block text-xs sm:text-sm text-neutral-300 mb-1 font-medium">
                                                            {q.label}
                                                        </label>

                                                        {q.type === "select" && (
                                                            <>
                                                                <CustomSelect
                                                                    value={String(watch(q.label as any) || "")}
                                                                    onChange={(value) => {
                                                                        setValue(q.label as any, value);
                                                                        validateField(q.label, value);
                                                                        // If timeline changed to Flexible, validate the date field
                                                                        if (q.label === "What is your timeline?" && value === "Flexible") {
                                                                            const flexibleDate = watch("Flexible date");
                                                                            validateField("Flexible date", flexibleDate || "");
                                                                        }
                                                                        // If timeline changed from Flexible, clear date error
                                                                        if (q.label === "What is your timeline?" && value !== "Flexible") {
                                                                            clearErrors("Flexible date");
                                                                        }
                                                                        // If "Other" selected for website type, clear the custom field
                                                                        if (q.label === "What type of website do you need?" && value !== "Other") {
                                                                            setValue("Other website type", "");
                                                                            clearErrors("Other website type");
                                                                        }
                                                                    }}
                                                                    options={[
                                                                        { value: "", label: "Select..." },
                                                                        ...(q.options?.map((opt: string) => ({ value: opt, label: opt })) || [])
                                                                    ]}
                                                                    placeholder="Select..."
                                                                    className="w-full"
                                                                />
                                                                {errors[q.label as keyof Lead] && (
                                                                    <p className="text-xs text-red-400 mt-1">
                                                                        {(errors[q.label as keyof Lead] as any)?.message}
                                                                    </p>
                                                                )}

                                                                {/* Show text field when "Other" is selected for website type */}
                                                                {q.label === "What type of website do you need?" && watch(q.label as any) === "Other" && (
                                                                    <div className="mt-3">
                                                                        <label className="block text-xs sm:text-sm text-neutral-300 mb-1 font-medium">
                                                                            Please specify:
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            {...register("Other website type" as any)}
                                                                            placeholder="Describe the type of website you need..."
                                                                            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                            onChange={(e) => {
                                                                                setValue("Other website type" as any, e.target.value);
                                                                                validateField("Other website type", e.target.value);
                                                                            }}
                                                                        />
                                                                        {errors["Other website type" as keyof Lead] && (
                                                                            <p className="text-xs text-red-400 mt-1">
                                                                                {(errors["Other website type" as keyof Lead] as any)?.message}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {/* Flexible timeline extra field */}
                                                                {q.label === "What is your timeline?" &&
                                                                    watch(q.label as any) === "Flexible" && (
                                                                        <div className="mt-2">
                                                                            <label className="block text-xs text-neutral-400 mb-1">
                                                                                Preferred date
                                                                            </label>
                                                                            <input
                                                                                type="date"
                                                                                {...register("Flexible date", {
                                                                                    onBlur: (e) => {
                                                                                        if (watch("What is your timeline?") === "Flexible") {
                                                                                            validateField("Flexible date", e.target.value);
                                                                                        }
                                                                                    },
                                                                                    onChange: (e) => {
                                                                                        if (watch("What is your timeline?") === "Flexible") {
                                                                                            validateField("Flexible date", e.target.value);
                                                                                        }
                                                                                    }
                                                                                })}
                                                                                min={
                                                                                    new Date().toISOString().split("T")[0]
                                                                                }
                                                                                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
                                                                            />
                                                                            {errors["Flexible date"] && (
                                                                                <p className="text-xs text-red-400 mt-1">
                                                                                    {errors["Flexible date"]?.message}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                            </>
                                                        )}

                                                        {q.type === "text" && (
                                                            <>
                                                                <input
                                                                    {...register(q.label as any, {
                                                                        onBlur: (e) => validateField(q.label, e.target.value),
                                                                        onChange: (e) => validateField(q.label, e.target.value)
                                                                    })}
                                                                    placeholder={q.label.includes("URL") ? "https://example.com" : "Enter details..."}
                                                                    className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
                                                                />
                                                                {errors[q.label as keyof Lead] && (
                                                                    <p className="text-xs text-red-400 mt-1">
                                                                        {(errors[q.label as keyof Lead] as any)?.message}
                                                                    </p>
                                                                )}
                                                            </>
                                                        )}

                                                        {q.type === "textarea" && (
                                                            <>
                                                                <textarea
                                                                    {...register(q.label as any, {
                                                                        onBlur: (e) => validateField(q.label, e.target.value),
                                                                        onChange: (e) => validateField(q.label, e.target.value)
                                                                    })}
                                                                    rows={4}
                                                                    placeholder="Enter details..."
                                                                    className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
                                                                />
                                                                {errors[q.label as keyof Lead] && (
                                                                    <p className="text-xs text-red-400 mt-1">
                                                                        {(errors[q.label as keyof Lead] as any)?.message}
                                                                    </p>
                                                                )}
                                                            </>
                                                        )}

                                                        {q.type === "file" && (
                                                            <input
                                                                type="file"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    setValue(q.label as any, file as any, { shouldDirty: true, shouldValidate: false });
                                                                }}
                                                                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white file:mr-4 file:py-2 file:px-3 file:rounded-md file:bg-white/10"
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3: review */}
                                    {formStep === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.18 }}
                                        >
                                            <div className="space-y-4 text-neutral-300">
                                                <p className="text-white text-lg font-medium mb-2">
                                                    Review your details
                                                </p>

                                                {/* Payment summary for "Start Now" */}
                                                {projectStartPreference === "now" && selectedPlan && selectedPlan.basePrice > 0 && (
                                                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                                                        <h4 className="text-white font-medium mb-3">Payment Summary</h4>
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-300">Plan Total:</span>
                                                                <span className="text-white">{formatCurrency(selectedPlan.basePrice)}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-300">Deposit (30%):</span>
                                                                <span className="text-green-400 font-semibold">{formatCurrency(calculateDeposit(selectedPlan.basePrice))}</span>
                                                            </div>
                                                            <div className="flex justify-between text-sm">
                                                                <span className="text-gray-400">Remaining (due on completion):</span>
                                                                <span className="text-gray-400">{formatCurrency(selectedPlan.basePrice - calculateDeposit(selectedPlan.basePrice))}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4">
                                                    <p>
                                                        <span className="text-white">Name:</span>{" "}
                                                        {watch("name") || "-"}
                                                    </p>
                                                    <p>
                                                        <span className="text-white">Email:</span>{" "}
                                                        {watch("email") || "-"}
                                                    </p>
                                                    <p>
                                                        <span className="text-white">Company:</span>{" "}
                                                        {watch("company") || "-"}
                                                    </p>
                                                    <p>
                                                        <span className="text-white">Phone:</span>{" "}
                                                        {watch("phone") || "-"}
                                                    </p>

                                                    <p className="mt-3 text-white font-medium">
                                                        Project Details:
                                                    </p>
                                                    {(() => {
                                                        const qList = selectedPlanId
                                                            ? (planQuestions as Record<string, PlanQuestion[]>)[selectedPlanId] || []
                                                            : [];
                                                        const hasDetails = qList.some(q => watch(q.label as any));

                                                        if (!hasDetails) {
                                                            return (
                                                                <p className="text-neutral-400">
                                                                    No additional details provided.
                                                                </p>
                                                            );
                                                        }

                                                        return qList.map((q) => {
                                                            const value = watch(q.label as any);
                                                            if (!value) return null;
                                                            let displayValue = value instanceof File ? value.name : (typeof value === "string" ? value : String(value ?? "-"));

                                                            // If "Other" is selected for website type, show the custom specification
                                                            if (q.label === "What type of website do you need?" && value === "Other") {
                                                                const otherType = watch("Other website type");
                                                                if (otherType) displayValue = `Other: ${otherType}`;
                                                            }

                                                            return (
                                                                <p key={q.label}>
                                                                    <span className="text-neutral-400">{q.label}:</span>{" "}
                                                                    {displayValue}
                                                                </p>
                                                            );
                                                        }).concat(
                                                            // Show "Other website type" separately if it has a value but wasn't included above
                                                            watch("Other website type") && watch("What type of website do you need?") !== "Other" ? (
                                                                <p key="other-website-type">
                                                                    <span className="text-neutral-400">Other website type:</span>{" "}
                                                                    {watch("Other website type")}
                                                                </p>
                                                            ) : []
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Agreement checkbox - only on Step 3 */}
                                    {formStep === 3 && (
                                        <div className="mt-4 flex items-start gap-2">
                                            <input
                                                id="agree"
                                                type="checkbox"
                                                {...register("agree")}
                                                className="mt-1 w-4 h-4 rounded border-neutral-600 bg-neutral-800"
                                            />
                                            <label htmlFor="agree" className="text-sm text-neutral-300">
                                                I agree to the
                                                <a href="/legal/terms" className="underline hover:text-white ml-1">Terms & Conditions</a>,
                                                <a href="/legal/privacy" className="underline hover:text-white ml-1">Privacy Policy</a>,
                                                <a href="/legal/cookies" className="underline hover:text-white ml-1">Cookie Policy</a>, and
                                                <a href="/legal/refund" className="underline hover:text-white ml-1">Refund & Cancellation</a>.
                                            </label>
                                            {errors.agree && (
                                                <p className="text-xs text-red-400 mt-1">{errors.agree.message}</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Buttons (aligned to bottom-right like sketch) */}
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 mt-6">
                                        {formStep > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => setFormStep((s) => s - 1)}
                                                className="text-xs sm:text-sm text-neutral-300 hover:text-white underline order-2 sm:order-1"
                                            >
                                                Back
                                            </button>
                                        )}

                                        {formStep < 3 && (
                                            <InteractiveHoverButton
                                                type="button"
                                                onClick={async () => {
                                                    // validate steps before moving forward
                                                    if (formStep === 1) {
                                                        const isValid = await validateStep1();
                                                        if (!isValid) return;
                                                    } else if (formStep === 2) {
                                                        const isValid = await validateStep2();
                                                        if (!isValid) return;
                                                    }
                                                    setFormStep((s) => s + 1);
                                                }}
                                                className="text-xs sm:text-sm font-medium order-1 sm:order-2"
                                            >
                                                Next
                                            </InteractiveHoverButton>
                                        )}

                                        {formStep === 3 && (
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="inline-flex items-center justify-center rounded-lg px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-neutral-700 hover:opacity-90 disabled:opacity-50 order-1 sm:order-2 w-full sm:w-auto"
                                            >
                                                {isSubmitting
                                                    ? "Sending..."
                                                    : projectStartPreference === "now"
                                                        ? "Pay Deposit & Start Project"
                                                        : "Submit Quote Request"
                                                }
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
}
