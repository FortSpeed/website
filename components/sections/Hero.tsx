"use client";
import Beams from "../Beams";
import Headline from "../Headline";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import Achievements from "../ui/Achievements";
import { motion } from "motion/react";
import { useState } from "react";
import PricingModal from "../ui/PricingModal";
import Link from "next/link";

const Hero = () => {
  // breakpoints
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  // dynamic props
  // const rotation = isMobile ? 10 : isTablet ? 20 : 30;
  const speed = isTablet ? 0.3 : isMobile ? 0.2 : 0.7;
  const beamHeight = isTablet ? 10 : isMobile ? 7 : 18;
  const beamWidth = isTablet ? 2.5 : isMobile ? 1.35 : 3;
  const lightColor = isTablet ? "#a1a1a1" : isMobile ? "#a0a0a0" : "#dbdbdb";

  const [open, setOpen] = useState(false);

  return (
    <section
      className="section pt-32 w-full flex flex-col justify-center items-center gap-20 max-h-[900px] "
      id="hero"
    >
      <div className="absolute w-full h-full -top-20  ">
        {/* <Beams
          rotation={30}
          lightColor={lightColor}
          beamHeight={beamHeight}
          beamWidth={beamWidth}
          speed={speed}
          // noiseIntensity={2}
        /> */}
        {/* <Hyperspeed/> */}
        {/* <div className="relative w-full h-[100vh] overflow-hidden"> */}
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        {/* <source src="/videos/hero-bg.mp4" type="video/mp4" /> */}

        {/* Dark overlay for readability */}
        {/* <div className="absolute inset-0 bg-black/50"></div> */}

        {/* Content */}
        {/* </div> */}
      </div>
      <Headline className="  left-0 right-0  mx-auto " />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 1 } }}
        className="flex justify-center items-center gap-5"
      >
        <InteractiveHoverButton
          className="md:py-3 text-md max-md:text-sm "
          onClick={() => setOpen(true)}
        >
          Start Your Project
        </InteractiveHoverButton>
        <InteractiveHoverButton className="md:py-3 text-md max-md:text-sm bg-black text-white">
          <Link href={"#projects"}>View Our Work</Link>
        </InteractiveHoverButton>
      </motion.div>
      <Achievements />

      <PricingModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default Hero;
