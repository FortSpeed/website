"use client";
import React from "react";
import Modal from "./Modal";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { contactEmail as defaultRecipient } from "@/data/contact";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { showToast } from "nextjs-toast-notify";

const contactSchema = z.object({
    name: z.string().regex(/^[A-Za-z\u0600-\u06FF\s'-]{2,50}$/, "Please enter a valid name (2–50 letters, spaces, ' or -)"),
    email: z.string().min(1, "Please enter your email").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/, "Enter a valid email"),
    topic: z.string().min(1, "Please select a topic"),
    message: z.string().min(1, "Please enter a message"),
    phone: z
        .string()
        .optional()
        .refine((v) => {
            if (!v || v.trim() === "") return true; // optional when empty
            return /^\d{7,15}$/.test(v);
        }, "Enter a valid phone number"),
    budget: z.string().optional(),
});

type Lead = z.infer<typeof contactSchema>;

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function ContactModal({ open, onClose }: Props) {
    const [sending, setSending] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<Lead>({
        resolver: zodResolver(contactSchema),
        mode: "onChange",
    });

    React.useEffect(() => {
        if (open) {
            reset();
            setSending(false);
        }
    }, [open, reset]);

    async function submit(data: Lead) {
        try {
            setSending(true);
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, to: defaultRecipient }),
            });
            if (!res.ok) {
                showToast.error("We couldn't send your message. Please try again.", { position: "top-right" });
            } else {
                showToast.success("Your message has been sent. We'll get back to you soon!", { position: "top-right" });
                reset();
                setTimeout(() => {
                    onClose();
                }, 1600);
            }
        } catch (err) {
            // show error toast
            showToast.error("We couldn't send your message. Please try again.", { position: "top-right" });
            console.error(err);
        } finally {
            setSending(false);
        }
    }

    return (
        <Modal open={open} onClose={onClose} ariaLabel="Contact form" className="relative">
            <div className="absolute inset-0">
                <Image src="/img-2.png" alt="" fill className="object-cover z-0" />
            </div>

            <div className="p-6 md:p-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-1">Contact us</h3>
                    <p className="text-sm text-neutral-300 mb-6">Tell us about your project. We usually respond within 1–2 business days.</p>
                </motion.div>

                <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 gap-4">
                    {/* Debug: {JSON.stringify(errors)} */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-neutral-300 mb-1">Your name</label>
                            <input {...register("name", { onBlur: () => { } })} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500" />
                            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                            {/* Debug: {JSON.stringify(errors.name?.message)} */}
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-300 mb-1">Contact email</label>
                            <input type="email" {...register("email")} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500" />
                            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-neutral-300 mb-1">What are you contacting us about?</label>
                            <select {...register("topic")} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500">
                                <option value="">Select a topic</option>
                                <option value="Website development">Website development</option>
                                <option value="Web app">Web app</option>
                                <option value="Branding/Design">Branding/Design</option>
                                <option value="SEO">SEO</option>
                                <option value="Something else">Something else</option>
                            </select>
                            {errors.topic && <p className="text-xs text-red-400 mt-1">{errors.topic.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-300 mb-1">Phone number (optional)</label>
                            <input {...register("phone")} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500" placeholder="+1 555 123 4567" />
                            {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-neutral-300 mb-1">Budget range (optional)</label>
                        <select {...register("budget")} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500">
                            <option value="">Select a range</option>
                            <option value="<$500">&lt;$500</option>
                            <option value="$500–$1500">$500–$1500</option>
                            <option value="$1500–$5000">$1500–$5000</option>
                            <option value="$5000+">$5000+</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-neutral-300 mb-1">Message</label>
                        <textarea {...register("message")} rows={5} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-white outline-none focus:border-neutral-500" placeholder="Tell us about your needs, context, and timeline" />
                        {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
                    </div>
                    <div className="flex items-start md:items-center justify-between gap-3 pt-2">
                        <div className="text-xs text-neutral-400 max-w-md">
                            We'll review your details and get back to you shortly. By contacting us, you agree to our
                            <a href="/legal/privacy" className="text-neutral-300 hover:text-white underline ml-1">Privacy Policy</a>,
                            <a href="/legal/terms" className="text-neutral-300 hover:text-white underline ml-1">Terms & Conditions</a>,
                            <a href="/legal/cookies" className="text-neutral-300 hover:text-white underline ml-1">Cookie Policy</a>, and
                            <a href="/legal/refund" className="text-neutral-300 hover:text-white underline ml-1">Refund & Cancellation</a>.
                        </div>
                        <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-neutral-700  hover:opacity-90 disabled:opacity-50">
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </form>
            </div>

        </Modal>
    );
}
