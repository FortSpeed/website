// "use client";
import { morphingText, title, subtitle } from "@/data/hero";
import { motion } from "motion/react";
import BlurText from "./BlurText";
import { MorphingText } from "./ui/morphing-text";

const Headline = ({ className }: { className: string }) => {
  const text1 = title[0];
  const text2 = title[1];
  // const text3 = title[2];

  return (
    <h1
      className={`relative z-10 flex flex-col text-center items-center gap-2 sm:gap-3 font-inter font-bold leading-tight sm:leading-[1.15] md:leading-[1.2]  text-white text-5xl sm:text-6xl max-w-98 sm:max-w-120 md:max-w-135 md:text-[5rem] lg:text-8xl lg:max-w-full tracking-tight ${className} md:gap-5 lg:gap-2`}
    >
      <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-5 lg:gap-5">
        <div className="flex items-center justify-center lg:whitespace-nowrap gap-2 sm:gap-3 md:gap-5 lg:gap-5">
          <BlurText
            text={text1}
            animateBy="letters"
            direction="bottom"
            delay={50}
            className="justify-center md:-my-3 lg:my-0"
          />
        </div>
        <div className="flex items-center justify-center">
          <BlurText
            text={text2}
            animateBy="letters"
            direction="bottom"
            delay={50}
            className="justify-center md:-my-3 lg:my-0"
          />
        </div>
      </div>

      {/* Morphing Text */}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center relative z-0 w-full mt-3 sm:mt-2 pointer-events-none"
      >
        <MorphingText
          className="  text-4xl sm:text-6xl md:text-[5rem] lg:text-8xl"
          texts={morphingText}
        />
      </motion.span>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 opacity-50 max-w-[65ch] text-center text-base sm:text-lg md:text-xl leading-7 sm:leading-8 px-4 mt-8 sm:mt-10 font-medium tracking-normal sm:tracking-[0.01em] md:tracking-[0.02em] antialiased bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent"
      >
        {subtitle}
      </motion.p>
    </h1>
  );
};

export default Headline;
