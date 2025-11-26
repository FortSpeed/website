import React from "react";
import CountUp from "../CountUp";
import { achievements } from "@/data/hero";
import { motion } from "motion/react";

const Achievements = () => {
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 1 } }}
      className="grid w-full max-w-5xl grid-cols-1 gap-4 px-4 mx-auto items-stretch sm:grid-cols-3 sm:gap-6 md:gap-8 sm:px-0"
    >
      {achievements.map(({ label, sym, desc }) => (
        <li
          key={label}
          className="flex h-full flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center shadow-sm backdrop-blur-sm sm:px-5 sm:py-6 lg:px-6 lg:py-7"
        >
          <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-1">
            <CountUp
              from={0}
              to={label}
              separator=","
              direction="up"
              duration={1}
              delay={1}
            />
            {sym}
          </span>
          <span className="text-gray-300 text-xs sm:text-sm md:text-base leading-snug">{desc}</span>
        </li>
      ))}
    </motion.ul>
  );
};

export default Achievements;
