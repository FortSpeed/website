"use client";
import Beams from "../Beams";
import Headline from "../Headline";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import Achievements from "../ui/Achievements";
import { motion } from "motion/react";

const Hero = () => {
  // breakpoints
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDesktopXL = useMediaQuery("(min-width: 1536px)");
  const isUltraWide = useMediaQuery("(min-width: 1920px)");
  const is4K = useMediaQuery("(min-width: 2560px)");

  // dynamic props
  // const rotation = isMobile ? 10 : isTablet ? 20 : 30;
  const speed = isMobile ? 0.4 : 0.7;
  const beamHeight = is4K ? 54 : isUltraWide ? 46 : isDesktopXL ? 38 : isTablet ? 22 : isMobile ? 20 : 32;
  const beamWidth = is4K ? 5 : isUltraWide ? 4.2 : isDesktopXL ? 3.6 : isTablet ? 2.7 : isMobile ? 2.2 : 3.2;
  const beamCount = is4K ? 36 : isUltraWide ? 30 : isDesktopXL ? 24 : isTablet ? 16 : 12;
  const lightColor = isTablet ? "#a1a1a1" : isMobile ? "#a0a0a0" : "white";

  return (
    <section
      className="section relative pt-32 w-full flex justify-center items-center min-h-[70vh] lg:min-h-[80vh] xl:min-h-[90vh] 2xl:min-h-screen"
      id="hero"
    >
      <div className="absolute inset-0">
        <Beams
          rotation={30}
          lightColor={lightColor}
          beamHeight={beamHeight}
          beamWidth={beamWidth}
          beamNumber={beamCount}
          speed={speed}
        />
      </div>

      {/* Max width container with horizontal padding to fix cropping on large screens */}
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 mx-auto flex flex-col justify-center items-center gap-12 sm:gap-16 md:gap-20">
        <Headline className="left-0 right-0 mx-auto" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="flex flex-col sm:flex-row w-full sm:w-auto justify-center items-center gap-3 sm:gap-5"
        >
          <InteractiveHoverButton className="md:py-3 text-md max-md:text-sm px-5 sm:px-6">
            Start Your Project
          </InteractiveHoverButton>
          <InteractiveHoverButton className="md:py-3 text-md max-md:text-sm bg-black text-white px-5 sm:px-6">
            View Our Work
          </InteractiveHoverButton>
        </motion.div>

        <Achievements />
      </div>
    </section>
  );
};

export default Hero;
