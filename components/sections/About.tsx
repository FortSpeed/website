"use client";

import collaboration from "@/assets/collaboration-2.jpg";
import {
  achievements,
  description_1,
  description_2,
  description_3,
  title,
} from "@/data/about";
import { motion } from "motion/react";
import Image from "next/image";
import CountUp from "../CountUp";

export default function About() {
  return (
    <section
      id="about"
      className="section grid lg:grid-cols-2 lg:gap-0 xl:gap-16 items-center"
    >
      <div className="text-center lg:text-start">
        <h2 className="subtitle-gradient lg:!mx-0 mb-10 ">{title}</h2>
        <p className="text-gray-300 text-lg mb-6 leading-relaxed md:w-3xl lg:w-auto mx-auto pr-5">
          {description_1}
        </p>
        <p className="text-gray-400 mb-6 leading-relaxed md:w-3xl lg:w-auto mx-auto pr-5">
          {description_2}
        </p>
        <p className="text-gray-400 mb-8 leading-relaxed italic md:w-3xl lg:w-auto mx-auto pr-5">
          {description_3}
        </p>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1 } }}
          className="flex justify-center lg:justify-start items-center gap-16  relative"
        >
          {achievements.map(({ label, sym, desc }, i) => (
            <li
              key={label}
              className="flex flex-col items-center lg:items-start justify-center relative md:pr-16 "
            >
              <span className="text-white text-4xl font-bold">
                <CountUp
                  from={0}
                  to={label}
                  separator=","
                  direction="up"
                  duration={1}
                  // delay={1}
                />

                {sym}
              </span>
              <span className="text-gray-300">{desc}</span>
            </li>
          ))}
        </motion.ul>
      </div>
      <div className="relative rounded-2xl h-5/6 overflow-hidden">
        <div className="aspect-square  bg-gradient-to-br from-blue-900/20 to-purple-900/20  border border-white/10 flex items-center justify-center ">
          <div className="inset-0 absolute bg-[radial-gradient(ellipse_at_center,transparent_45%,black)] z-10 " />
          <Image alt="our-teamwork" src={collaboration} loading="lazy" />
        </div>
      </div>
    </section>
  );
}
