"use client";

import { description, services, title } from "@/data/services";
import Beams from "../Beams";
import { easeInOut, motion } from "motion/react";
import MotionCard from "../animation/MotionCard";

export default function Services() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.12,
        easing: easeInOut,
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
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.65,
        easing: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="services" className="section overflow-hidden bg-[url('/img-4.png')] md:bg-[url('/img-6.png')] bg-no-repeat bg-center bg-cover lg:bg-contain">
      {/* BACKGROUND BEAMS */}
      {/* <div className="absolute size-160 rounded-full right-[-10%] top-[30%] bottom-0 overflow-hidden"> */}

      {/* Left background image */}
      {/* <div className="bg-[url('/img-5.png')]  md:bg-[url('/img-5.png')]  bg-no-repeat overflow-hidden size-120 object-contain md:rounded-full rounded-b-[30%]  absolute top-1/3 md:rounded-b-sm lg:bottom-20 left-20 max-md:left-0 opacity-30 hidden md:block"></div> */}

      {/* Center background image */}
      {/* <div className="bg-[url('/img-1.png')]  md:bg-[url('/img-3.png')]  bg-no-repeat overflow-hidden size-120 object-contain md:rounded-full rounded-b-[30%]  absolute top-1/3 md:rounded-b-sm lg:bottom-20 left-1/2 transform -translate-x-1/2 max-md:left-0 max-md:transform-none opacity-30 hidden md:block"></div> */}

      {/* Right background image */}
      {/* <div className="bg-[url('/img-1.png')]  md:bg-[url('/img-3.png')]  bg-no-repeat overflow-hidden size-120 object-contain md:rounded-full rounded-b-[30%]  absolute top-1/3 md:rounded-b-sm lg:bottom-20 right-20 max-md:right-0 opacity-30 hidden md:block"></div> */}

      {/* <Beams
          rotation={28}
          speed={0.9}
          beamWidth={2.5}
          beamHeight={20}
          lightColor="#969696"
        /> */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,black)]" /> */}
      {/* </div> */}

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
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {services.map((service, idx) => (
            <MotionCard
              key={idx}
              inherit
              variants={cardVariants}
              className={`group text-gray-200 p-8 bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 rounded-2xl  ${service.theme.borderHover}
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
