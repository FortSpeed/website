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
      className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-16 items-center"
    >
      <div className="text-center lg:text-start lg:-translate-x-4 xl:-translate-x-6 2xl:-translate-x-8 transition-transform">
        <h2 className="subtitle-gradient lg:mx-0 mb-10 ">{title}</h2>
        <p className="text-gray-300 text-lg mb-6 leading-relaxed md:max-w-2xl lg:max-w-none mx-auto lg:mx-0 lg:pr-4">
          {description_1}
        </p>
        <p className="text-gray-400 mb-6 leading-relaxed md:max-w-2xl lg:max-w-none mx-auto lg:mx-0 lg:pr-4">
          {description_2}
        </p>
        <p className="text-gray-400 mb-8 leading-relaxed italic md:max-w-2xl lg:max-w-none mx-auto lg:mx-0 lg:pr-4">
          {description_3}
        </p>
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }}
          className="flex flex-wrap justify-center lg:justify-start items-center gap-6 md:gap-10 lg:gap-16 relative"
        >
          {achievements.map(({ label, sym, desc }) => (
            <motion.li
              key={label}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="flex flex-col items-center lg:items-start justify-center relative md:pr-10 lg:pr-16 "
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
      <MotionCard className="relative flex justify-center lg:justify-end lg:translate-x-4 xl:translate-x-6 2xl:translate-x-8 transition-transform">
        <div className="relative w-full max-w-[560px] xl:max-w-[660px] 2xl:max-w-[760px] aspect-4/3 rounded-2xl overflow-hidden bg-linear-to-br from-blue-900/20 to-purple-900/20 border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,black)] z-10" />
          <Image alt="our-teamwork" src={collaboration} loading="lazy" fill className="object-cover" sizes="(min-width: 1536px) 660px, (min-width: 1024px) 560px, 100vw" />
        </div>
      </MotionCard>
    </MotionSection>
  );
}
