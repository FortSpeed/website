"use client";
import React from "react";
import Modal from "./Modal";
import { motion, AnimatePresence } from "framer-motion";
import { contactEmail as defaultRecipient } from "@/data/contact";

type Lead = {
  name: string;
  email: string;
  topic: string;
  message: string;
  phone?: string;
  budget?: "<$500" | "$500–$1500" | "$1500–$5000" | "$5000+";
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: Props) {
  const [lead, setLead] = React.useState<Lead>({ name: "", email: "", message: "" });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [sending, setSending] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      setLead({ name: "", email: "", topic: "", message: "" });
      setErrors({});
      setSending(false);
      setToast(null);
    }
  }, [open]);

  function validate(l: Lead) {
    const errs: Record<string, string> = {};
    if (!l.name?.trim()) errs.name = "Please enter your name";
    if (!l.email?.trim()) errs.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l.email)) errs.email = "Enter a valid email";
    if (!l.topic?.trim()) errs.topic = "Please select a topic";
    if (l.phone && !/^[\d+()\-\s]{7,}$/.test(l.phone)) errs.phone = "Enter a valid phone number";
    if (!l.message?.trim()) errs.message = "Please enter a message";
    return errs;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate(lead);
    setErrors(v);
    if (Object.keys(v).length) return;
    try {
      setSending(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, to: defaultRecipient }),
      });
      if (!res.ok) {
        // Fallback: open mail client if server cannot send
        const subject = encodeURIComponent(`New contact from ${lead.name}${lead.topic ? ` — ${lead.topic}` : ""}`);
        const body = encodeURIComponent(
          `Name: ${lead.name}\nEmail: ${lead.email}\nTopic: ${lead.topic || "-"}\nPhone: ${lead.phone || "-"}\nBudget: ${lead.budget || "-"}\n\nMessage:\n${lead.message}`
        );
        window.location.href = `mailto:${defaultRecipient}?subject=${subject}&body=${body}`;
        setToast("Opening your mail client... You can also reach us directly.");
      } else {
        setToast("Your message has been sent. We'll get back to you soon!");
        setLead({ name: "", email: "", topic: "", message: "" });
        setTimeout(() => {
          setToast(null);
          onClose();
        }, 1600);
      }
    } catch (err) {
      // show error toast
      setToast("We couldn't send your message. Please try again.");
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Contact form">
      <div className="p-6 md:p-8">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-1">Contact us</h3>
          <p className="text-sm text-neutral-300 mb-6">Tell us about your project. We usually respond within 1–2 business days.</p>
        </motion.div>

        <form onSubmit={submit} className="grid grid-cols-1 gap-4">
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
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-300 mb-1">What are you contacting us about?</label>
              <select value={lead.topic} onChange={(e) => setLead({ ...lead, topic: e.target.value })} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500">
                <option value="">Select a topic</option>
                <option value="Website development">Website development</option>
                <option value="Web app">Web app</option>
                <option value="Branding/Design">Branding/Design</option>
                <option value="SEO">SEO</option>
                <option value="Something else">Something else</option>
              </select>
              {errors.topic && <p className="text-xs text-red-400 mt-1">{errors.topic}</p>}
            </div>
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Phone number (optional)</label>
              <input value={lead.phone ?? ""} onChange={(e) => setLead({ ...lead, phone: e.target.value })} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500" placeholder="+1 555 123 4567" />
              {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Budget range (optional)</label>
            <select value={lead.budget ?? ""} onChange={(e) => setLead({ ...lead, budget: (e.target.value || undefined) as any })} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500">
              <option value="">Select a range</option>
              <option value="<$500">&lt;$500</option>
              <option value="$500–$1500">$500–$1500</option>
              <option value="$1500–$5000">$1500–$5000</option>
              <option value="$5000+">$5000+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Message</label>
            <textarea value={lead.message} onChange={(e) => setLead({ ...lead, message: e.target.value })} rows={5} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500" placeholder="Tell us about your needs, context, and timeline" required />
            {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
          </div>
          <div className="flex items-center justify-between gap-3 pt-2">
            <p className="text-xs text-neutral-400">We’ll review your details and get back to you shortly.</p>
            <button type="submit" disabled={sending} className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-green-500 hover:opacity-90 disabled:opacity-50">
              {sending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-4 rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-2 text-sm text-white shadow-lg"
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
