"use client";
import { Easing, motion } from "framer-motion";
import { MorphingText } from "./ui/morphing-text";
import { morphingText, title } from "@/data/hero";

const Headline = () => {
  const text1 = title[0];
  const text2 = title[1];

  // Softer, more fluid letter animation
  const letterVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as Easing, // smooth cubic-bezier like CSS ease-out
      },
    },
  };
  // Gentle wave-like stagger
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div>
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute flex flex-col text-center w-full top-[28%] text-6xl sm:text-7xl md:text-[5rem] xl:text-7xl  font-inter font-bold leading-[1.2]  text-white px-8 max-md:w-120 sm:w-140 md:w-156 lg:w-full left-0 right-0 mx-auto "
      >
        {[text1, text2].map((line, lineIndex) => (
          <motion.span
            key={lineIndex}
            variants={containerVariants}
            className="block"
          >
            {line.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        ))}

        {/* Morphing Text */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center mt-6 text-8xl md:text-6xl relative"
        >
          <MorphingText
            className="absolute mt-16 text-6xl "
            texts={morphingText}
          />
        </motion.span>
      </motion.h1>
    </div>
  );
};

export default Headline;
