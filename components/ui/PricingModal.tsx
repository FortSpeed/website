"use client";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";

import { plans as rawPlans, title as plansTitle, planQuestions } from "@/data/prices";
import { contactEmail as defaultRecipient } from "@/data/contact";
import {BorderBeam} from "@/components/ui/border-beam";
import {InteractiveHoverButton} from "@/components/ui/interactive-hover-button";

type Lead = {
  name: string;
  email: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  // Optional plan id to preselect (e.g., when opening from a specific CTA)
  initialPlanId?: string;
};

export default function PricingModal({ open, onClose, initialPlanId }: Props) {
  const [step, setStep] = useState<"plans" | "form">("plans");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(initialPlanId ?? null);
  const [lead, setLead] = useState<Lead>({ name: "", email: "" });
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const plans = rawPlans;

  React.useEffect(() => {
    if (open) {
      setStep("plans");
      setSelectedPlanId(initialPlanId ?? null);
      setLead({ name: "", email: "" });
      setAnswers({});
      setErrors({});
      setSending(false);
    }
  }, [open, initialPlanId]);

  const selectedPlan = useMemo(() => plans.find(p => p.id === selectedPlanId) ?? null, [plans, selectedPlanId]);

  function pickPlan(id: string) {
    setSelectedPlanId(id);
    setStep("form");
  }

  function validate(l: Lead) {
    const errs: Record<string, string> = {};
    if (!l.name?.trim()) errs.name = "Please enter your name";
    if (!l.email?.trim()) errs.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l.email)) errs.email = "Enter a valid email";
    return errs;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate(lead);
    setErrors(v);
    if (Object.keys(v).length) return;

    const qList = selectedPlanId ? (planQuestions as any)[selectedPlanId] || [] : [];
    const lines: string[] = [];
    qList.forEach((q: any) => {
      const key = q.label;
      let val = answers[key];
      if (q.type === "file" && val?.name) val = val.name;
      lines.push(`${q.label}: ${val ? val : "-"}`);
    });

    const topic = `Plan inquiry — ${selectedPlan ? selectedPlan.name : "Unknown"}`;
    const message = `Selected plan: ${selectedPlan ? selectedPlan.name : "(not selected)"}\n\n${lines.join("\n")}`;

    try {
      setSending(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: lead.name, email: lead.email, topic, message, to: defaultRecipient }),
      });
      if (!res.ok) {
        const subject = encodeURIComponent(`New Project Inquiry${selectedPlan ? ` — ${selectedPlan.name}` : ""}`);
        const body = encodeURIComponent(
          `Name: ${lead.name}\nEmail: ${lead.email}\nTopic: ${topic}\n\n${message}`
        );
        window.location.href = `mailto:${defaultRecipient}?subject=${subject}&body=${body}`;
        onClose();
      } else {
        onClose();
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Start your project" className="lg:max-w-5xl  ">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-16 max-md:text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">{plansTitle}</h3>
          <p className="text-sm text-neutral-300 mt-1">Choose a plan to get started or request a custom quote.</p>
        </div>

        {step === "plans" ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3  gap-4 md:gap-6 ">
              {plans.map((p, idx) => (
                <div
                  key={p.id}
                  className={`group relative rounded-xl border border-neutral-700 bg-neutral-800/40 hover:bg-neutral-800 transition-colors ${idx === 1 ? "md:scale-[1.08] md:z-10" : ""} transition-transform overflow-hidden`}
                >
                  {/* BorderBeam overlays per card */}
                  {idx === 0 && <BorderBeam
                      duration={4}
                      size={300}
                      reverse
                      className="from-transparent via-blue-500 to-transparent"
                  />  }
                  {idx === 1 && (
                   <><BorderBeam
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
                       /></>
                  )}
                  {idx === 2 && <BorderBeam
                      duration={4}
                      size={300}

                      className="from-transparent via-red-500 to-transparent"
                  />}


                  <div className="p-5">

                    <div className="flex items-center justify-between mb-8">
                      <span className="text-3xl md:text-4xl font-semibold text-white leading-none">{p.number}</span>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">{p.name}</h4>
                    <p className="text-sm text-neutral-300 mb-6">{p.tagline}</p>
                    <p className="text-lg font-medium text-white mb-3">{p.price}</p>
                    <ul className="space-y-2 mb-8">
                      {p.features.map((f: string, i: number) => (
                        <li key={i} className="text-sm text-neutral-300 flex gap-2">
                          <svg className="mt-0.5 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => pickPlan(p.id)}
                      className="w-full inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none"
                    >
                      {p.id === "enterprise" ? "Request Quote" : "Get Started"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-400">Selected plan</p>
                <p className="text-white font-medium">{selectedPlan ? selectedPlan.name : "Not selected"}</p>
              </div>
              <button type="button" onClick={() => setStep("plans")} className="text-sm text-neutral-300 hover:text-white underline">Change</button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Your name</label>
                <input value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500" required />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Contact email</label>
                <input type="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500" required />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            {(selectedPlanId ? (planQuestions as any)[selectedPlanId] : [])?.map((q: any, idx: number) => (
              <div key={idx}>
                <label className="block text-sm text-neutral-300 mb-1">{q.label}</label>
                {q.type === "select" && (
                  <select
                    value={answers[q.label] ?? ""}
                    onChange={(e) => setAnswers({ ...answers, [q.label]: e.target.value })}
                    className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500"
                  >
                    <option value="">Select...</option>
                    {q.options?.map((opt: string) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
                {q.type === "text" && (
                  <input
                    value={answers[q.label] ?? ""}
                    onChange={(e) => setAnswers({ ...answers, [q.label]: e.target.value })}
                    className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500"
                  />
                )}
                {q.type === "textarea" && (
                  <textarea
                    rows={4}
                    value={answers[q.label] ?? ""}
                    onChange={(e) => setAnswers({ ...answers, [q.label]: e.target.value })}
                    className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500"
                  />
                )}
                {q.type === "file" && (
                  <input
                    type="file"
                    onChange={(e) => setAnswers({ ...answers, [q.label]: e.target.files?.[0] || null })}
                    className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-white/10 file:text-white"
                  />
                )}
              </div>
            ))}

            <div className="flex items-center justify-between gap-3 pt-2">
              <p className="text-xs text-neutral-400">We’ll review your details and get back within 1–2 business days.</p>
              < InteractiveHoverButton type="submit" disabled={sending} className=" items-center justify-center  text-sm font-medium  disabled:opacity-50">
                {sending ? "Sending..." : "Send Request"}
                  </InteractiveHoverButton>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
