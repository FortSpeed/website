"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Beams from "../Beams";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    message: "",
  });

  return (
    <section className="section max-h-120 overflow-hidden">
      {/* BACKGROUND BEAMS */}
      <div className="absolute w-2/3 h-full  left-0 right-0 mx-auto top-0  overflow-hidden">
        <Beams
          rotation={28}
          speed={0.9}
          beamWidth={2.5}
          beamHeight={15}
          lightColor="#969696"
        />
      </div>
      <div className="absolute inset-0 opacity-30"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-20">
        <h2 className="text-6xl font-bold mb-6 tracking-tight text-white">
          Ready to Build Something Amazing?
        </h2>
        <p className="text-lg text-gray-300 mb-12">
          Let's bring your vision to life with cutting-edge technology and
          expert craftsmanship.
        </p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <InteractiveHoverButton className="py-3">
          Start Your Project
        </InteractiveHoverButton>
        <InteractiveHoverButton className="py-3 bg-black text-white">
          Schedule a Call
        </InteractiveHoverButton>
      </div>
    </section>
  );
}
