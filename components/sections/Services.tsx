"use client";

import { description, services, title } from "@/data/services";
import Beams from "../Beams";
import { TextAnimate } from "../ui/text-animate";
import { easeInOut, motion } from "motion/react";
import MotionCard from "../animation/MotionCard";

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
    <section id="services" className="section">
      {/* BACKGROUND BEAMS */}
      {/* <div className="absolute size-160 rounded-full right-[-10%] top-[30%] bottom-0 overflow-hidden">
        <Beams
          rotation={28}
          speed={0.9}
          beamWidth={2.5}
          beamHeight={20}
          lightColor="#969696"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,black)]" />
      </div> */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* TITLE + DESCRIPTION */}
        <div className="text-center mb-20">
          <h2 className="subtitle-gradient">{title}</h2>

          <div className="text-xl text-gray-400 max-w-3xl mx-auto">
            {description}
          </div>
        </div>

        {/* SERVICES GRID */}
        <motion.ul
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {services.map((service, idx) => (
            <MotionCard
              key={idx}
              className={`group p-8 bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 rounded-2xl  ${service.theme.borderHover}
      ${service.theme.shadowHover}
    `}
            >
              <div
                className={`
        w-12 h-12 rounded-xl flex items-center justify-center mb-6
        
        ${service.theme.iconWrapper.base}
        ${service.theme.iconWrapper.hover}
      `}
              >
                <service.icon
                  className={`w-6 h-6 ${service.theme.iconColor}`}
                />
              </div>

              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3">
                {service.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <f.icon
                      className={`w-4 h-4 ${service.theme.featureIcon}`}
                    />
                    {f.desc}
                  </li>
                ))}
              </ul>
            </MotionCard>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
