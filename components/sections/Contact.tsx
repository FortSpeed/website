"use client";

import Beams from "../Beams";
import BlurText from "../BlurText";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import { description, title } from "@/data/contact";
import MotionSection from "../animation/MotionSection";
import { useState } from "react";
import PricingModal from "../ui/PricingModal";

export default function ContactSection() {
  const [open, setOpen] = useState(false);
  return (
    <MotionSection className="section  ">
      {/* BACKGROUND BEAMS */}
      {/* <div className="absolute w-2/3 h-full  left-0 right-0 mx-auto top-0  overflow-hidden">
        <Beams
          rotation={28}
          speed={0.9}
          beamWidth={2.5}
          beamHeight={15}
          lightColor="#969696"
        />
      </div> */}
      <div className="absolute inset-0 opacity-30"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-20">
        <h2 className="text-6xl font-bold mb-6 tracking-tight text-white">
          <BlurText
            text={title}
            animateBy="words"
            direction="bottom"
            delay={50}
            className="justify-center md:max-w-[80%] w-full mx-auto"
          />
        </h2>
        <p className="text-lg text-gray-300 mb-12">{description}</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <InteractiveHoverButton className=" md:py-3 max-md:text-sm" onClick={() => setOpen(true)}>
          Start Your Project
        </InteractiveHoverButton>
        <InteractiveHoverButton className="md:py-3 max-md:text-sm bg-black text-white">
          Schedule a Call
        </InteractiveHoverButton>
      </div>
      <PricingModal open={open} onClose={() => setOpen(false)} />
    </MotionSection>
  );
}
