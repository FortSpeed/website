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
import MotionSection from "../animation/MotionSection";
import MotionCard from "../animation/MotionCard";

export default function About() {
  return (
    <MotionSection
      id="about"
      className="section grid lg:grid-cols-2 lg:gap-0 xl:gap-16 items-center relative"
    >

      <div className="bg-[url('/img-4.png')]  bg-cover  bg-no-repea overflow-hiddent bg-center h-full lg:h-full w-1/2  object-contain   absolute top-0   lg:bottom-0 left-0 "></div>

      <div className="text-center lg:text-start relative">
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
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }}
          className="flex justify-center lg:justify-start items-center gap-16  relative"
        >
          {achievements.map(({ label, sym, desc }, i) => (
            <motion.li
              key={label}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="flex flex-col items-center lg:items-start justify-center relative md:pr-16 "
            >
              <span className="text-white text-4xl font-bold">
                <CountUp
                  from={0}
                  to={label}
                  separator=","
                  direction="up"
                  duration={1}
                />

                {sym}
              </span>
              <span className="text-gray-300">{desc}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <MotionCard className="relative rounded-2xl h-5/6 overflow-hidden">
        <div className="aspect-square  bg-gradient-to-br from-blue-900/20 to-purple-900/20  border border-white/10 flex items-center justify-center ">
          <div className="inset-0 absolute bg-[radial-gradient(ellipse_at_center,transparent_45%,black)] z-10 " />
          <Image alt="our-teamwork" src={collaboration} loading="lazy" />
        </div>
      </MotionCard>
    </MotionSection>
  );
}
