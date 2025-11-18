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

  // dynamic props
  // const rotation = isMobile ? 10 : isTablet ? 20 : 30;
  const speed = isMobile ? 0.4 : 0.7;
  const beamHeight = isTablet ? 20 : isMobile ? 20 : 30;
  const beamWidth = isTablet ? 2.5 : isMobile ? 2 : 3;
  const lightColor = isTablet ? "#a1a1a1" : isMobile ? "#a0a0a0" : "white";

  return (
    <section
      className="section pt-32 w-full flex flex-col justify-center items-center gap-20 max-h-[900px] "
      id="hero"
    >
      <div className="absolute w-full h-full top-0">
        <Beams
          rotation={30}
          lightColor={lightColor}
          beamHeight={beamHeight}
          beamWidth={beamWidth}
          speed={speed}
        />
      </div>
      <Headline className="  left-0 right-0  mx-auto " />

      <motion.div initial={{opacity: 0, scale: 0.85}} animate={{opacity: 1, scale:1, transition:{delay: 1}}} className="flex justify-center items-center gap-5">
        <InteractiveHoverButton className="md:py-3 text-md max-md:text-sm ">
          Start Your Project
        </InteractiveHoverButton>
        <InteractiveHoverButton className="md:py-3 text-md max-md:text-sm bg-black text-white">
          View Our Work
        </InteractiveHoverButton>
      </motion.div>
      <Achievements />
    </section>
  );
};

export default Hero;
