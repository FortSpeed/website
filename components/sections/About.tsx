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
    <section id="about" className="section">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="subtitle !mx-0">{title}</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mb-8"></div>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {description_1}
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {description_2}
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed italic">
              {description_3}
            </p>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1 } }}
              className="flex justify-start items-center gap-16  relative"
            >
              {achievements.map(({ label, sym, desc }, i) => (
                <li
                  key={label}
                  className="flex flex-col items-start justify-center relative pr-16 "
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
          <div className="relative ">
            <div className="aspect-square bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="inset-0 absolute bg-[radial-gradient(ellipse_at_center,transparent_45%,black)] z-10" />
              <Image alt="our-teamwork" src={collaboration} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
