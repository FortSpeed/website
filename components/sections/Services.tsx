"use client";

import { description, services, title } from "@/data/services";
import Beams from "../Beams";
import { TextAnimate } from "../ui/text-animate";
import { easeInOut, motion } from "motion/react";

export default function Services() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.12,
        ease: easeInOut,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.65,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  };

  return (
    <section
      id="services"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-x-hidden"
    >
      {/* BACKGROUND BEAMS */}
      <div className="absolute size-160 rounded-full right-[-10%] top-[30%] bottom-0 overflow-hidden">
        <Beams
          rotation={28}
          speed={0.9}
          beamWidth={2.5}
          beamHeight={20}
          lightColor="#969696"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,black)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* TITLE + DESCRIPTION */}
        <div className="text-center mb-20">
          <h2 className="subtitle">
            <TextAnimate animation="blurInUp" by="character" once>
              {title}
            </TextAnimate>
          </h2>

          <div className="text-xl text-gray-400 max-w-3xl mx-auto">
            <TextAnimate animation="blurIn" by="word" once delay={0.1}>
              {description}
            </TextAnimate>
          </div>
        </div>

        {/* SERVICES GRID */}
        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.li
                key={index}
                variants={cardVariants}
                whileHover={{
                  scale: 1.06,
                  rotateX: 4,
                  rotateY: -4,
                  boxShadow: "0 25px 60px rgba(0, 255, 255, 0.22)",
                  borderColor: "rgb(34 211 238)",
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
              >
                {/* Hover Shine Layer */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-transparent to-transparent blur-xl" />
                </div>

                {/* CONTENT */}
                <div className="relative z-10">
                  {/* ICON with its own animation */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                    whileInView={{ opacity: 1, scale: 0.9, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: 0.1,
                    }}
                    className="inline-flex p-3 bg-gray-400/15 rounded-xl mb-4 group-hover:scale-125 transition-transform"
                  >
                    <Icon className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors duration-300" />
                  </motion.div>

                  {/* TITLE */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* FEATURES */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.35,
                          delay: featureIndex * 0.05,
                        }}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
