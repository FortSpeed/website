"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import Beams from "../Beams";
import {
  availableTime,
  contactEmail,
  contactPhone,
  description,
  title,
} from "@/data/contact";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", companyName: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-black py-32 px-6 md:px-12 lg:px-20 overflow-hidden 
    "
    >
      {/* <div className="absolute flex h-[50rem] w-[70rem]  left-[25%] top-[30%]  overflow-hidden ">
        <Beams
          rotation={28}
          speed={0.9}
          beamWidth={2}
          beamHeight={15}
          lightColor="#646464"
        />
        <div className=" size-full bg-[radial-gradient(ellipse_at_center,transparent_35%,black)] absolute inset-0 " />
      </div> */}

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start relative">
        {/* Left Info Section */}
        <div className="flex-1 space-y-6">
          <h2 className="subtitle-gradient">{title}</h2>
          <p className="text-gray-400 leading-relaxed">{description}</p>

          <div className="space-y-4">
            <div>
              <p className="text-gray-200 font-medium">Email:</p>
              <a
                href="mailto:hello@finpro.com"
                className="text-gray-400 font-semibold hover:underline"
              >
                {contactEmail}
              </a>
            </div>
            <div>
              <p className="text-gray-200 font-medium">Phone:</p>
              <p className="text-gray-400 font-semibold">{contactPhone}</p>
              <p className="text-gray-500 text-sm">{availableTime}</p>
            </div>
          </div>

          <InteractiveHoverButton className="hover:border-cyan-500 ">
            Live Chat
          </InteractiveHoverButton>
        </div>

        {/* Right Contact Form */}
        <div className="flex-1 bg-white/5 shadow-lg rounded-2xl p-8 space-y-6">
          <h3 className="text-2xl font-bold text-gray-200">
            Send us a message
          </h3>

          {submitted && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium">
              Message sent successfully! We&apos;ll be in touch soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-300 text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 p-3 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm font-medium">
                  Your Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter your company name..."
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 p-3 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address..."
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium">
                How can we help you?
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Enter your message..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white resize-none"
              ></textarea>
            </div>

            <InteractiveHoverButton
              type="submit"
              className="hover:border-cyan-500 "
            >
              Send Message
            </InteractiveHoverButton>
          </form>
        </div>
      </div>
    </section>
  );
}
