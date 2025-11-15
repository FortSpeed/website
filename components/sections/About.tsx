"use client";

import Image from "next/image";
import collaboration from "@/assets/collaboration-2.jpg";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import Link from "next/link";
import Beams from "../Beams";
import {
  achievements,
  coreValues,
  description,
  encouragement,
  joinUs,
  subtitle,
  title,
  values,
} from "@/data/about";
import { motion } from "motion/react";
import { TextAnimate } from "../ui/text-animate";

export default function About() {
  /* ------------------------------------
     Variants
  ------------------------------------ */

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  const containerStagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  } as const;

  const scaleFade = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  return (
    <section
      id="about"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-x-hidden mx-auto"
    >
      {/* Background */}
      {/* <div className="absolute flex h-[50rem] w-[70rem] left-[-00%] top-[20%] overflow-hidden">
        <Beams
          rotation={28}
          speed={0.9}
          beamWidth={3}
          beamHeight={15}
          lightColor="#c4c4c4"
        />
        <div className="size-full bg-[radial-gradient(ellipse_at_center,transparent_35%,black)] absolute inset-0" />
      </div> */}

      <div className="relative">
        {/* Title */}
        <h2 className="subtitle lg:mb-12">
          <TextAnimate animation="blurInUp" by="character" once>
            {title}
          </TextAnimate>
        </h2>

        {/* IMAGE + TEXT BLOCK */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerStagger}
        >
          {/* IMAGE */}
          <motion.div variants={fadeUp} className="relative">
            <div className="inset-0 absolute bg-[radial-gradient(ellipse_at_center,transparent_45%,black)] z-10" />
            <Image
              src={collaboration}
              alt="Team collaboration"
              className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover border border-white/10"
            />
          </motion.div>

          {/* TEXT */}
          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3
              variants={fadeUp}
              className="text-3xl font-bold text-white mb-6 max-lg:text-center"
            >
              {subtitle}
            </motion.h3>

            {description.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-gray-400 mb-6 leading-relaxed text-lg max-lg:text-center"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>

        {/* ACHIEVEMENTS */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerStagger}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={scaleFade}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                {achievement.number}
              </div>
              <div className="text-gray-400">{achievement.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CORE VALUES */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerStagger}
        >
          <motion.h3
            variants={fadeUp}
            className="text-3xl font-bold text-center text-white mb-12"
          >
            {coreValues}
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={scaleFade}
                  className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl  "
                  whileHover={{
                    scale: 1.04,
                    borderColor: "rgb(34 211 238)",
                    boxShadow: "0 25px 60px rgba(0, 255, 255, 0.22)",
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="inline-flex p-3 bg-gray-400/15 rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-white group-hover:text-cyan-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CALL TO ACTION */}
        <motion.div
          className="mt-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {encouragement}
          </p>
          <InteractiveHoverButton className="hover:border-cyan-500">
            <Link href="#contact">{joinUs}</Link>
          </InteractiveHoverButton>
        </motion.div>
      </div>
    </section>
  );
}
