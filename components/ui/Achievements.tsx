import React from "react";
import CountUp from "../CountUp";
import { achievements } from "@/data/hero";
import { motion } from "motion/react";

const Achievements = () => {
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 1 } }}
      className="flex flex-wrap justify-center lg:justify-between items-center relative gap-x-4 gap-y-6 pl-2 lg:pl-0"
    >
      {achievements.map(({ label, sym, desc }, i) => (
        <li
          key={label}
          className="flex flex-col items-center lg:items-start justify-center relative px-3 sm:px-5 md:px-7 lg:px-18"
        >
          <span className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">
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
          <span className="text-gray-300 text-xs sm:text-sm">{desc}</span>

          {i < achievements.length - 1 && (
            <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-0.5 h-full bg-white/20 " />
          )}
        </li>
      ))}
    </motion.ul>
  );
};

export default Achievements;
