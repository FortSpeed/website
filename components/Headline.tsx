// "use client";
import { morphingText, title } from "@/data/hero";
import { motion } from "motion/react";
import BlurText from "./BlurText";
import { MorphingText } from "./ui/morphing-text";

const Headline = ({ className }: { className: string }) => {
  const text1 = title[0];
  const text2 = title[1];

  return (
    <h1
      className={`flex flex-col text-center items-center gap-0 font-inter font-bold leading-[1.2]  text-white text-6xl sm:text-7xl max-w-98 sm:max-w-120 md:max-w-135 md:text-[5rem] lg:text-8xl lg:max-w-full tracking-tight ${className} md:gap-5 lg:gap-2`}
    >
      {[text1, text2].map((line, lineIndex) => (
        <BlurText
          key={lineIndex}
          text={line}
          animateBy="letters"
          direction="bottom"
          delay={50}
          className="justify-center md:-my-3 "
        />
      ))}

      {/* Morphing Text */}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center  relative w-full mt-1"
      >
        <MorphingText
          className="  text-5xl sm:text-7xl md:text-[5rem] lg:text-8xl"
          texts={morphingText}
        />
      </motion.span>
    </h1>
  );
};

export default Headline;
