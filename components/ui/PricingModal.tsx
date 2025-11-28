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
    const [step, setStep] = useState<"plans" | "form">("plans");
    const [formStep, setFormStep] = useState(1);

    const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
        initialPlanId ?? null
    );

    const [sending, setSending] = useState(false);

    // Guard to ensure only the latest submission can open the mail client
    const mailRunRef = React.useRef(0);

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
            reset();
            setSending(false);
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
        setStep("form");
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
        const runId = w.__mailRunId;
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

        qList.forEach((q: PlanQuestion) => {
            const key = q.label;
            let val = data[key as keyof Lead];
            if (q.type === "file" && val instanceof File && val.name) val = val.name;
            if (q.label === "What is your timeline?" && val === "Flexible") {
                const flexibleDate = data["Flexible date"];
                if (flexibleDate) val = `Flexible (Preferred date: ${flexibleDate})`;
            }
            lines.push(`${q.label}: ${val || "-"}`);
        });

        const topic = `Plan inquiry — ${selectedPlan?.name ?? "Unknown"}`;
        const message = `Selected plan: ${selectedPlan?.name ?? "(not selected)"}

Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "-"}
Phone: ${data.phone || "-"}

${lines.join("\n")}`;

        try {
            setSending(true);
            const wAny: any = window as any;
            if (wAny.__mailAbortController) {
                try { wAny.__mailAbortController.abort(); } catch { }
            }
            wAny.__mailAbortController = new AbortController();

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    topic,
                    message,
                    to: defaultRecipient,
                }),
                signal: wAny.__mailAbortController.signal,
            });
            if (res.ok) {
                showToast.success("Your request has been sent. We'll get back to you soon!", { position: "top-right" });
                onClose();
            } else {
                showToast.error("We couldn't send your request. Please try again.", { position: "top-right" });
            }
        } catch (err) {
            showToast.error("We couldn't send your request. Please try again.", { position: "top-right" });
            console.error(err);
        } finally {
            setSending(false);
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
            className="lg:max-w-5xl relative overflow-hidden pb-6"
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
            <div className="p-6 md:p-8 relative z-10">
                {/* header */}
                <div className="mb-16 max-md:text-center max-md:mt-10 text-center">
                    <h3 className="text-3xl font-semibold text-white mb-4">
                        {plansTitle}
                    </h3>
                    <p className="text-sm text-neutral-300 mt-1">
                        Choose a plan to get started or request a custom quote.
                    </p>
                </div>

                {/* PLAN SELECTION */}
                {step === "plans" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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

                                <div className="p-5">
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-3xl font-semibold text-white">
                                            {p.number}
                                        </span>
                                    </div>
                                    <h4 className="text-xl font-semibold text-white mb-2">
                                        {p.name}
                                    </h4>
                                    <p className="text-sm text-neutral-300 mb-6">{p.tagline}</p>
                                    <p className="text-lg font-medium text-white mb-3">
                                        {p.price}
                                    </p>

                                    <ul className="space-y-2 mb-8">
                                        {p.features.map((f: string, i: number) => (
                                            <li
                                                key={i}
                                                className="text-sm text-neutral-300 flex gap-2"
                                            >
                                                <svg
                                                    className="mt-0.5 flex-shrink-0"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => pickPlan(p.id)}
                                        className={`w-full inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 ${idx === 1 && "!bg-cyan-300/80"
                                            }`}
                                    >
                                        {p.id === "enterprise" ? "Request Quote" : "Get Started"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* FORM MULTI-STEP */}
                {step === "form" && (
                    <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 gap-6 ">
                        {/* selected plan */}
                        <div className="flex items-center justify-between ">
                            <div>
                                <p className="text-sm text-neutral-400">Selected plan</p>
                                <p className="text-white font-medium">{selectedPlan?.name}</p>
                            </div>

                            <button
                                onClick={() => setStep("plans")}
                                type="button"
                                className="text-sm text-neutral-300 hover:text-white underline"
                            >
                                Change
                            </button>
                        </div>

                        {/* MAIN LAYOUT: left = steps + instruction; right = form fields */}
                        <div className="grid grid-cols-1">
                            {/* LEFT: Step circles + instruction */}
                            <div className="md:col-span-5 lg:col-span-4">
                                <div className="flex flex-col items-center mb-8">
                                    {/* three circles in a row with arrows */}
                                    <div className="flex items-center gap-4 mb-3">
                                        <StepCircle n={1} label="Step 1" active={formStep === 1} />
                                        <div className="w-6 h-px bg-neutral-600" />
                                        <StepCircle n={2} label="Step 2" active={formStep === 2} />
                                        <div className="w-6 h-px bg-neutral-600" />
                                        <StepCircle n={3} label="Step 3" active={formStep === 3} />
                                    </div>

                                    {/* short instruction under circles — changes depending on step */}
                                    <p className="text-sm text-neutral-400 mb-6">
                                        {formStep === 1 &&
                                            "Write down what the user should do in step 1."}
                                        {formStep === 2 &&
                                            "Write down what the user should do in step 2."}
                                        {formStep === 3 && "Review your details and submit."}
                                    </p>

                                    {/* small plan reminder */}
                                    <div className="text-xs text-neutral-500">
                                        {/* <p>Plan: <span className="text-neutral-300 font-medium">{selectedPlan?.name}</span></p> */}
                                        <p className="mt-2 text-neutral-500 text-xs">
                                            We'll usually respond within 24 hours.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: Form fields + checkbox + buttons */}
                            <div className="md:col-span-7 lg:col-span-6">
                                <div className="bg-neutral-800/40 border border-neutral-700 rounded-xl p-6">
                                    {/* Step 1 fields */}
                                    {formStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.18 }}
                                        >
                                            <div className="grid md:grid-cols-1 gap-4">
                                                {/* Name */}
                                                <div>
                                                    <label className="block text-sm text-neutral-200 mb-1 font-medium">
                                                        Your name <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        {...register("name", { onBlur: () => { } })}
                                                        placeholder="Enter your full name"
                                                        className="w-full rounded-lg bg-neutral-800 border border-neutral-700 focus:border-white/30 focus:ring-2 focus:ring-white/5 px-3 py-2 text-white"
                                                    />
                                                    {errors.name && (
                                                        <p className="text-xs text-red-400 mt-1">
                                                            {errors.name.message}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Email */}
                                                <div>
                                                    <label className="block text-sm text-neutral-200 mb-1 font-medium">
                                                        Contact email{" "}
                                                        <span className="text-red-400">*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        {...register("email", { onBlur: () => { } })}
                                                        placeholder="your.email@example.com"
                                                        className="w-full rounded-lg bg-neutral-800 border border-neutral-700 focus:border-white/30 focus:ring-2 focus:ring-white/5 px-3 py-2 text-white"
                                                    />
                                                    {errors.email && (
                                                        <p className="text-xs text-red-400 mt-1">
                                                            {errors.email.message}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Company */}
                                                <div>
                                                    <label className="block text-sm text-neutral-300 mb-1">
                                                        Company name{" "}
                                                        <span className="text-neutral-500">(optional)</span>
                                                    </label>
                                                    <input
                                                        {...register("company")}
                                                        placeholder="Your company name"
                                                        className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
                                                    />
                                                </div>

                                                {/* Phone */}
                                                <div>
                                                    <label className="block text-sm text-neutral-300 mb-1">
                                                        Contact phone{" "}
                                                        <span className="text-neutral-500">(optional)</span>
                                                    </label>
                                                    <input
                                                        {...register("phone")}
                                                        placeholder="+1 555 123 4567"
                                                        className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
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
                                                        <label className="block text-sm text-neutral-300 mb-1 font-medium">
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
                                                            return (
                                                                <p key={q.label}>
                                                                    <span className="text-neutral-400">{q.label}:</span>{" "}
                                                                    {value instanceof File ? value.name : (typeof value === "string" ? value : String(value ?? "-"))}
                                                                </p>
                                                            );
                                                        });
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
                                    <div className="flex items-center justify-end gap-3 mt-6">
                                        {formStep > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => setFormStep((s) => s - 1)}
                                                className="text-sm text-neutral-300 hover:text-white underline"
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
                                                className="text-sm font-medium"
                                            >
                                                Next
                                            </InteractiveHoverButton>
                                        )}

                                        {formStep === 3 && (
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-neutral-700 hover:opacity-90 disabled:opacity-50"
                                            >
                                                {isSubmitting ? "Sending..." : "Submit"}
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
