"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Beams from "../Beams";

const plans = [
  {
    id: "starter",
    number: "01",
    name: "Essential",
    tagline: "Perfect for personal brands & small businesses",
    price: "starting from $499",
    features: [
      "1–3 page responsive website",
      "Basic SEO setup",
      "Fast performance optimization",
      "1 week delivery",
    ],
    color: "from-red-500 to-pink-500",
  },
  {
    id: "pro",
    number: "02",
    name: "Professional",
    tagline: "Ideal for startups & agencies",
    price: "starting from $1,200",
    features: [
      "5–10 page website or web app",
      "Custom design system",
      "SEO + analytics integration",
      "2–3 week delivery",
    ],
    color: "from-purple-500 to-blue-500",
  },
  {
    id: "enterprise",
    number: "03",
    name: "Enterprise",
    tagline: "Custom solutions for serious scale",
    price: "get a custom quote",
    features: [
      "Complex web apps or portals",
      "AI & automation integrations",
      "Dedicated project manager",
      "Long-term maintenance support",
    ],
    color: "from-cyan-500 to-green-500",
  },
];

export default function Prices() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <div className=" absolute  rounded-4xl p-10 left-[-10%] top-[0%]  overflow-hidden">
        <div className="relative flex size-[70rem] overflow-hidden  ">
          <Beams
            rotation={38}
            speed={0.1}
            beamWidth={2.1}
            beamHeight={25}
            lightColor="#929292"
            // scale={1}
          />
        </div>
        <div className="size-full bg-[radial-gradient(ellipse_at_center,transparent,black)] absolute inset-0 z-10" />
      </div>

      {/* <div className=" absolute   -right-[10%] top-[60%]  overflow-hidden">
        <div className="relative flex size-[20rem] rounded-full  ">
          <Beams
            rotation={38}
            speed={0.9}
            beamWidth={2}
            beamHeight={25}
            lightColor="#c4c4c4"
          />
        </div>
        <div className="size-full bg-[radial-gradient(ellipse_at_center,transparent,black)] absolute inset-0 z-10" />
      </div> */}
      <h2 className=" subtitle-gradient z-10">
        Flexible Plans for Every Vision
      </h2>

      <div className=" grid mt-20 md:grid-cols-3  gap-10 w-full max-w-6xl z-10 ">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            onHoverStart={() => setActive(plan.id)}
            onHoverEnd={() => setActive(null)}
            onClick={() => setActive(active === plan.id ? null : plan.id)}
            className={`relative   p-8 cursor-pointer overflow-hidden transition-all duration-500  ${
              active === plan.id ? "md:scale-100 scale-100" : "hover:scale-100"
            } h-fit  pb-20  group  `}
            style={{ marginTop: `${index * 4}rem` }}
          >
            <div className={`absolute w-0.5 h-full bg-gradient-to-b ${active === plan.id ? "from-cyan-500 via-cyan-500/25": "from-red-500 via-red-500/25"} to-transparent left-1 top-14 `}>
              <div className={`absolute w-1.5 h-1.5  ${active === plan.id ? "bg-cyan-500": "bg-red-500"} rounded-full top-0 left-1/2 -translate-x-1/2`}></div>
            </div>

            {/* Gradient accent line on top */}
            {/* <motion.div
              layoutId={`bar-${plan.id}`}
              className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${plan.color}`}
            /> */}

            <div className="flex flex-col justify-between h-full relative z-10">
              <div className="flex flex-col gap-5">
                <div className={`${active === plan.id ? "text-cyan-500": "text-gray-300"} font-normal text-3xl `}>
                  {plan.number}
                </div>
                <h3 className="text-2xl font-semibold -mb-2 text-gray-300 ">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-300 max-w-4/5 ">
                  {plan.tagline}
                </p>
              </div>

              {/* <AnimatePresence> */}
              {/* {active === plan.id && ( */}
              <motion.ul
                key="features"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-1.5 mt-6  text-gray-400   text-sm pl-3 "
              >
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 ">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-gray-600 to-gray-400" />
                    {f}
                  </li>
                ))}
              </motion.ul>

              {active === plan.id && (
                <AnimatePresence>
                  <motion.p initial={{opacity: 0}} animate={{opacity: 1}} className="text-cyan-500 text-xl font-bold uppercase tracking-wide hidden group-hover:block transition-all duration-500 ease-in mt-8">
                    {plan.price}
                  </motion.p>
                </AnimatePresence>
              )}
              {/* )} */}
              {/* </AnimatePresence> */}

              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-400 text-white font-medium tracking-wide text-xl"
              >
                {plan.id === "enterprise" ? "Get a Quote" : "Start Project"}
              </motion.button> */}
            </div>

            {/* background accent blur */}
            {/* <motion.div
              animate={{
                opacity: active === plan.id ? 0.3 : 0.15,
                scale: active === plan.id ? 1.2 : 1,
              }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-10 blur-3xl`}
            /> */}
          </motion.div>
        ))}
      </div>

      {/* soft gradient overlay at bottom */}
      {/* <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-red-500/10 to-transparent pointer-events-none" /> */}
    </section>
  );
}
