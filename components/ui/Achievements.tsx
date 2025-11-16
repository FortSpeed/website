import React from "react";
import CountUp from "../CountUp";
import { achievements } from "@/data/hero";
import { motion } from "motion/react";

const Achievements = () => {
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 1 } }}
      className="flex justify-between items-center gap-16  relative"
    >
      {achievements.map(({ label, sym, desc }, i) => (
        <li
          key={label}
          className="flex flex-col items-start justify-center relative pr-16"
        >
          <span className="text-white text-4xl font-bold">
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
          <span className="text-gray-300">{desc}</span>

          {i < achievements.length - 1 && (
            <div className="absolute top-0 bottom-0 right-0 w-0.5 h-full bg-white/20 " />
          )}
        </li>
      ))}
    </motion.ul>
  );
};

export default Achievements;
