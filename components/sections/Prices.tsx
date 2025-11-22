"use client";

import { useState } from "react";
import { motion, AnimatePresence, Easing } from "framer-motion";
import { plans, title } from "@/data/prices";

export default function Prices() {
  const [active, setActive] = useState<string | null>(null);

  // Parent container variants for stagger animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as Easing },
    },
  };

  // Left vertical line variants
  const lineVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "100%",
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" as Easing },
    },
    hover: {
      scaleX: 1.1,
      transition: { duration: 0.3, ease: "easeInOut" as Easing },
    },
  };

  // Glowing dot animation
  const dotVariants = {
    rest: { scale: 1, opacity: 1 },
    hover: {
      scale: 1.2,
      opacity: 1,
      boxShadow: "0 0 10px rgba(0,255,255,0.8)",
      transition: { duration: 0.3, ease: "easeInOut" as Easing },
    },
  };

  return (
    <section className="section flex flex-col justify-center items-center">
      {/* background beams */}
      {/* <div className="absolute rounded-4xl p-10 left-[-10%] top-[0%] overflow-hidden">
        <div className="relative flex size-[70rem] overflow-hidden">
          <Beams
            rotation={38}
            speed={0.7}
            beamWidth={2.1}
            beamHeight={25}
            lightColor="#929292"
          />
        </div>
        <div className="size-full bg-[radial-gradient(ellipse_at_center,transparent,black)] absolute inset-0 z-10" />
      </div> */}

      {/* heading */}
      <h2 className="subtitle">{title}</h2>

      {/* cards grid */}
      <motion.div
        className="grid mt-20 md:grid-cols-3 gap-10 w-full max-w-6xl z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            variants={cardVariants}
            whileHover="hover"
            onHoverStart={() => setActive(plan.id)}
            onHoverEnd={() => setActive(null)}
            onClick={() => setActive(active === plan.id ? null : plan.id)}
            className={`relative p-8 cursor-pointer overflow-hidden transition-all duration-500 h-fit pb-20 group`}
            style={{ marginTop: `${index * 4}rem` }}
          >
            {/* left animated line */}
            <motion.div
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className={`absolute w-0.5 bg-linear-to-b ${active === plan.id
                ? "from-cyan-500 via-cyan-500/25"
                : `${plan.color}`
                } to-transparent left-1 top-14`}
            >
              <motion.div
                variants={dotVariants}
                initial="rest"
                whileHover="hover"
                animate={active === plan.id ? "hover" : "rest"}
                className={`absolute w-2 h-2 rounded-full bg-linear-to-b  top-0 left-1/2 -translate-x-1/2 ${active === plan.id ? "bg-cyan-500" : `${plan.dotColor}`
                  }`}
              ></motion.div>
            </motion.div>

            {/* content */}
            <div className="flex flex-col justify-between h-full relative z-10">
              <div className="flex flex-col gap-5">
                <motion.div
                  animate={{
                    color: active === plan.id ? "#22d3ee" : "#d1d5db",
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-normal text-3xl"
                >
                  {plan.number}
                </motion.div>

                <h3 className="text-2xl font-semibold -mb-2 text-gray-300">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-300 max-w-4/5">
                  {plan.tagline}
                </p>
              </div>

              <motion.ul
                key="features"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1.5 mt-6 text-gray-400 text-sm pl-3"
              >
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-linear-to-r from-gray-600 to-gray-400" />
                    {f}
                  </li>
                ))}
              </motion.ul>

              <AnimatePresence>
                {active === plan.id && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                    className="text-cyan-500 text-xl font-bold uppercase tracking-wide mt-8"
                  >
                    {plan.price}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
