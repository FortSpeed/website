// PricingModal (refactored layout to match sketch; keeps your colors & behavior)
"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { contactEmail as defaultRecipient } from "@/data/contact";
import {
  planQuestions,
  title as plansTitle,
  plans as rawPlans,
} from "@/data/prices";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import { SmoothCursor } from "./smooth-cursor";

type Lead = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
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

  const [lead, setLead] = useState<Lead>({
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [agree, setAgree] = useState(false);

  const plans = rawPlans;

  React.useEffect(() => {
    if (open) {
      setStep("plans");
      setSelectedPlanId(initialPlanId ?? null);
      setLead({ name: "", email: "", company: "", phone: "" });
      setAnswers({});
      setErrors({});
      setSending(false);
      setFormStep(1);
      setAgree(false);
    }
  }, [open, initialPlanId]);

  const selectedPlan = useMemo(
    () => plans.find((p) => p.id === selectedPlanId) ?? null,
    [plans, selectedPlanId]
  );

  function pickPlan(id: string) {
    setSelectedPlanId(id);
    setStep("form");
  }

  // Validate only name + email
  function validateLead() {
    const errs: Record<string, string> = {};

    if (!lead.name.trim()) errs.name = "Please enter your name";
    if (!lead.email.trim()) errs.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email))
      errs.email = "Enter a valid email";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    // final validation
    if (!validateLead()) {
      setFormStep(1);
      return;
    }
    if (!agree) {
      setErrors((s) => ({ ...s, agree: "You must agree to proceed" }));
      return;
    }

    const qList = selectedPlanId
      ? (planQuestions as any)[selectedPlanId] || []
      : [];
    const lines: string[] = [];

    qList.forEach((q: any) => {
      const key = q.label;
      let val = answers[key];
      if (q.type === "file" && val?.name) val = val.name;
      if (q.label === "What is your timeline?" && val === "Flexible") {
        const flexibleDate = answers["Flexible date"];
        if (flexibleDate) val = `Flexible (Preferred date: ${flexibleDate})`;
      }
      lines.push(`${q.label}: ${val || "-"}`);
    });

    const topic = `Plan inquiry — ${selectedPlan?.name ?? "Unknown"}`;
    const message = `Selected plan: ${selectedPlan?.name ?? "(not selected)"}

Name: ${lead.name}
Email: ${lead.email}
Company: ${lead.company || "-"}
Phone: ${lead.phone || "-"}

${lines.join("\n")}`;

    try {
      setSending(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          topic,
          message,
          to: defaultRecipient,
        }),
      });

      if (!res.ok) {
        const subject = encodeURIComponent(
          `New Project Inquiry${selectedPlan ? ` — ${selectedPlan.name}` : ""}`
        );
        const body = encodeURIComponent(
          `Name: ${lead.name}
Email: ${lead.email}
Company: ${lead.company || "-"}
Phone: ${lead.phone || "-"}
Topic: ${topic}

${message}`
        );
        window.location.href = `mailto:${defaultRecipient}?subject=${subject}&body=${body}`;
      }

      onClose();
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
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
            active
              ? "bg-white text-black border-white"
              : "border-neutral-600 text-neutral-300"
          } font-medium`}
        >
          {n}
        </div>
        <div
          className={`mt-2 text-xs ${
            active ? "text-white font-medium" : "text-neutral-400"
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
          <div className="max-lg:hidden">
            <SmoothCursor />
          </div>

          <div className="absolute inset-0 top-0 overflow-hidden">
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
      <div className="p-6 md:p-8 relative">
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
                className={`group relative rounded-xl border border-neutral-700 bg-neutral-800/60 hover:bg-neutral-500/25 transition-colors ${
                  idx === 1 ? "md:scale-[1.1] md:z-10" : ""
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
                    className={`w-full inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 ${
                      idx === 1 && "!bg-cyan-300/80"
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
          <form onSubmit={submit} className="grid grid-cols-1 gap-6 ">
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
                      We’ll usually respond within 24 hours.
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
                            value={lead.name}
                            onChange={(e) =>
                              setLead({ ...lead, name: e.target.value })
                            }
                            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 focus:border-white/30 focus:ring-2 focus:ring-white/5 px-3 py-2 text-white"
                          />
                          {errors.name && (
                            <p className="text-xs text-red-400 mt-1">
                              {errors.name}
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
                            value={lead.email}
                            onChange={(e) =>
                              setLead({ ...lead, email: e.target.value })
                            }
                            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 focus:border-white/30 focus:ring-2 focus:ring-white/5 px-3 py-2 text-white"
                          />
                          {errors.email && (
                            <p className="text-xs text-red-400 mt-1">
                              {errors.email}
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
                            value={lead.company}
                            onChange={(e) =>
                              setLead({ ...lead, company: e.target.value })
                            }
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
                            value={lead.phone}
                            onChange={(e) =>
                              setLead({ ...lead, phone: e.target.value })
                            }
                            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
                          />
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
                          ? (planQuestions as any)[selectedPlanId]
                          : []
                        )?.map((q: any, idx: number) => (
                          <div key={idx}>
                            <label className="block text-sm text-neutral-300 mb-1 font-medium">
                              {q.label}
                            </label>

                            {q.type === "select" && (
                              <>
                                <select
                                  value={answers[q.label] ?? ""}
                                  onChange={(e) => {
                                    const v = e.target.value;
                                    setAnswers((prev) => {
                                      const next = { ...prev, [q.label]: v };
                                      if (
                                        q.label === "What is your timeline?" &&
                                        v !== "Flexible"
                                      ) {
                                        delete next["Flexible date"];
                                      }
                                      return next;
                                    });
                                  }}
                                  className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
                                >
                                  <option value="">Select...</option>
                                  {q.options?.map((opt: string) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>

                                {/* Flexible timeline extra field */}
                                {q.label === "What is your timeline?" &&
                                  answers[q.label] === "Flexible" && (
                                    <div className="mt-2">
                                      <label className="block text-xs text-neutral-400 mb-1">
                                        Preferred date
                                      </label>
                                      <input
                                        type="date"
                                        value={answers["Flexible date"] ?? ""}
                                        onChange={(e) =>
                                          setAnswers({
                                            ...answers,
                                            ["Flexible date"]: e.target.value,
                                          })
                                        }
                                        min={
                                          new Date().toISOString().split("T")[0]
                                        }
                                        className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
                                      />
                                    </div>
                                  )}
                              </>
                            )}

                            {q.type === "text" && (
                              <input
                                value={answers[q.label] ?? ""}
                                onChange={(e) =>
                                  setAnswers({
                                    ...answers,
                                    [q.label]: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
                              />
                            )}

                            {q.type === "textarea" && (
                              <textarea
                                rows={4}
                                value={answers[q.label] ?? ""}
                                onChange={(e) =>
                                  setAnswers({
                                    ...answers,
                                    [q.label]: e.target.value,
                                  })
                                }
                                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white"
                              />
                            )}

                            {q.type === "file" && (
                              <input
                                type="file"
                                onChange={(e) =>
                                  setAnswers({
                                    ...answers,
                                    [q.label]: e.target.files?.[0] || null,
                                  })
                                }
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
                            {lead.name || "-"}
                          </p>
                          <p>
                            <span className="text-white">Email:</span>{" "}
                            {lead.email || "-"}
                          </p>
                          <p>
                            <span className="text-white">Company:</span>{" "}
                            {lead.company || "-"}
                          </p>
                          <p>
                            <span className="text-white">Phone:</span>{" "}
                            {lead.phone || "-"}
                          </p>

                          <p className="mt-3 text-white font-medium">
                            Project Details:
                          </p>
                          {Object.entries(answers).length === 0 && (
                            <p className="text-neutral-400">
                              No additional details provided.
                            </p>
                          )}
                          {Object.entries(answers).map(([k, v]) => (
                            <p key={k}>
                              <span className="text-neutral-400">{k}:</span>{" "}
                              {v?.name || v || "-"}
                            </p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Agreement checkbox */}
                  <div className="mt-4 flex items-start gap-2">
                    <input
                      id="agree"
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => {
                        setAgree(e.target.checked);
                        setErrors((s) => {
                          const copy = { ...s };
                          delete copy.agree;
                          return copy;
                        });
                      }}
                      className="mt-1 w-4 h-4 rounded border-neutral-600 bg-neutral-800"
                    />
                    <label htmlFor="agree" className="text-sm text-neutral-300">
                      I agree to the
                      <a href="/legal/terms" className="underline hover:text-white ml-1">Terms & Conditions</a>,
                      <a href="/legal/privacy" className="underline hover:text-white ml-1">Privacy Policy</a>,
                      <a href="/legal/cookies" className="underline hover:text-white ml-1">Cookie Policy</a>, and
                      <a href="/legal/refund" className="underline hover:text-white ml-1">Refund & Cancellation</a>.
                    </label>
                  </div>
                  {errors.agree && (
                    <p className="text-xs text-red-400 mt-1">{errors.agree}</p>
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
                        onClick={() => {
                          // validate first step before moving forward
                          if (formStep === 1) {
                            if (!validateLead()) return;
                          }
                          setFormStep((s) => s + 1);
                        }}
                        className="text-sm font-medium"
                      >
                        Next
                      </InteractiveHoverButton>
                    )}

                    {formStep === 3 && (
                      <InteractiveHoverButton
                        type="submit"
                        disabled={sending}
                        className="text-sm font-medium disabled:opacity-50"
                      >
                        {sending ? "Sending..." : "Submit"}
                      </InteractiveHoverButton>
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
