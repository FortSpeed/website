"use client";
import React from "react";
import Modal from "./Modal";
import { motion } from "framer-motion";
import CustomSelect from "./CustomSelect";
import { contactEmail as defaultRecipient } from "@/data/contact";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { showToast } from "nextjs-toast-notify";

const contactSchema = z.object({
    name: z.string().regex(/^[A-Za-z\u0600-\u06FF\s&apos;-]{2,50}$/, "Please enter a valid name (2–50 letters, spaces, &apos; or -)"),
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
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
    } = useForm<Lead>({
        resolver: zodResolver(contactSchema),
        mode: "onChange",
    });

    React.useEffect(() => {
        if (open) {
            reset();
        }
    }, [open, reset]);

    async function submit(data: Lead) {
        try {
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
        }
    }

    return (
        <Modal open={open} onClose={onClose} ariaLabel="Contact form" className="relative">

            <div className="p-4 sm:p-6 md:p-8 relative z-10 max-h-[90vh] overflow-y-auto">
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-1">Contact us</h3>
                    <p className="text-xs sm:text-sm text-neutral-300 mb-4 sm:mb-6">Tell us about your project. We usually respond within 1–2 business days.</p>
                </motion.div>

                <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 gap-4">
                    {/* Debug: {JSON.stringify(errors)} */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm text-neutral-300 mb-1">Your name</label>
                            <input {...register("name", { onBlur: () => { } })} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 sm:py-2.5 text-white outline-none focus:border-neutral-500 text-sm sm:text-base" />
                            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                            {/* Debug: {JSON.stringify(errors.name?.message)} */}
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm text-neutral-300 mb-1">Contact email</label>
                            <input type="email" {...register("email")} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 sm:py-2.5 text-white outline-none focus:border-neutral-500 text-sm sm:text-base" />
                            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm text-neutral-300 mb-1">What are you contacting us about?</label>
                            <CustomSelect
                                value={watch("topic") || ""}
                                onChange={(value) => setValue("topic", value)}
                                options={[
                                    { value: "", label: "Select a topic" },
                                    { value: "Website development", label: "Website development" },
                                    { value: "Web app", label: "Web app" },
                                    { value: "Branding/Design", label: "Branding/Design" },
                                    { value: "SEO", label: "SEO" },
                                    { value: "Something else", label: "Something else" },
                                ]}
                                placeholder="Select a topic"
                                className="w-full"
                            />
                            {errors.topic && <p className="text-xs text-red-400 mt-1">{errors.topic.message}</p>}
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm text-neutral-300 mb-1">Phone number (optional)</label>
                            <input {...register("phone")} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 sm:py-2.5 text-white outline-none focus:border-neutral-500 text-sm sm:text-base" placeholder="+1 555 123 4567" />
                            {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm text-neutral-300 mb-1">Budget range (optional)</label>
                        <CustomSelect
                            value={watch("budget") || ""}
                            onChange={(value) => setValue("budget", value)}
                            options={[
                                { value: "", label: "Select a range" },
                                { value: "<$500", label: "<$500" },
                                { value: "$500–$1500", label: "$500–$1500" },
                                { value: "$1500–$5000", label: "$1500–$5000" },
                                { value: "$5000+", label: "$5000+" },
                            ]}
                            placeholder="Select a range"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm text-neutral-300 mb-1">Message</label>
                        <textarea {...register("message")} rows={4} className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 sm:py-2.5 text-white outline-none focus:border-neutral-500 text-sm sm:text-base resize-none" placeholder="Tell us about your needs, context, and timeline" />
                        {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
                    </div>
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3 pt-2">
                        <div className="text-xs text-neutral-400 max-w-full sm:max-w-md order-2 sm:order-1">
                            We&apos;ll review your details and get back to you shortly. By contacting us, you agree to our
                            <a href="/legal/privacy" className="text-neutral-300 hover:text-white underline ml-1">Privacy Policy</a>,
                            <a href="/legal/terms" className="text-neutral-300 hover:text-white underline ml-1">Terms & Conditions</a>,
                            <a href="/legal/cookies" className="text-neutral-300 hover:text-white underline ml-1">Cookie Policy</a>, and
                            <a href="/legal/refund" className="text-neutral-300 hover:text-white underline ml-1">Refund & Cancellation</a>.
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-neutral-700 hover:opacity-90 disabled:opacity-50 order-1 sm:order-2">
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </form>
            </div>

        </Modal>
    );
}
