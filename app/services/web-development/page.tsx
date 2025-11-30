"use client";

import backend from "@/assets/backend.png";
import frontend from "@/assets/frontend.png";
import fullstack from "@/assets/fullstack.png";
import webDevDesktop from "@/assets/web-dev-desktop.png";
import BlurText from "@/components/BlurText";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { motion } from "framer-motion";
import { Code2, Gauge, Layers, Wrench } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WebDevelopment() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full bg-black text-white font-sans overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full  mx-auto px-6 pt-32 pb-32 lg:px-16  z-10">
        <div className="max-w-[1370px] mx-auto ">
          <div className="flex justify-center items-center w-fit p-4 text-blue-400 hover:border-blue-500/50 bg-blue-500/10 border border-blue-500/20 rounded-xl relative z-10  mb-5">
            <Code2 />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-2xl max-w-3xl z-10 relative"
          >
            Fast, Reliable Web Development
            <br />& Custom Applications
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl opacity-80 mt-6 text-lg relative z-10"
          >
            Build your digital foundation with modern, scalable tech solutions
            that grow with your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <InteractiveHoverButton
              onClick={() => router.push("/")}
              className="md:py-3 text-md max-md:text-sm  text-black mt-10"
            >
              Build Your Website
            </InteractiveHoverButton>
          </motion.div>
          {/* HERO IMAGE */}
          <div className=" absolute inset-0 overflow-hidden shadow-2xl object-cover e z-0">
            <Image
              src={webDevDesktop}
              alt="Hero Illustration"
              width={1400}
              height={800}
              className="w-full h-full object-cover absolute left-0 right-0 inset-0"
            />
            <div className="absolute inset-0 bg-radial from-black/40 to-black/60"></div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <div className="bg-[url('/test-bg.pngd')] bg-no-repeat bg-cover ">
        <section className="w-full max-w-[1440px] mx-auto px-6  lg:px-10  ">
          <div className=" pt-16">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">
              Our Core Web Development Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Blazing-Fast Frontends",
                  desc: "We build ultra-fast and reliable frontends using modern frameworks engineered for scale.",
                  icon: frontend,
                },
                {
                  title: "Full‑Stack Applications",
                  desc: "Full custom applications built with clean architecture and robust engineering.",
                  icon: fullstack,
                },
                {
                  title: "Robust & Scalable Backends",
                  desc: "Secure and high‑performance backend systems ready for enterprise scaling.",
                  icon: backend,
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="bg-white/5 p-10 pt-3 text-center rounded-2xl backdrop-blur-xl shadow-xl border border-white/10 hover:border-cyan-400/40 hover:shadow-cyan-400/10 "
                >
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={150}
                    height={150}
                    className="h-36 w-fit  object-cover mx-auto"
                  ></Image>
                  <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                  <p className="opacity-80 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE BUILD SECTION */}
        <section className="w-full mx-auto px-6 py-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            How We Build — The Right Way
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="opacity-80 mb-14 max-w-2xl mx-auto text-lg"
          >
            Every project we deliver is engineered with clean architecture,
            performance in mind, and long-term scalability. No shortcuts, no
            messy code — just solid, production-grade engineering.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-xl text-left"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-4 text-cyan-400"
              >
                <Wrench className="w-10 h-10" />
              </motion.div>

              <h3 className="text-xl font-semibold mb-3">
                Engineering-First Approach
              </h3>
              <p className="opacity-80 text-sm leading-relaxed">
                We structure every project with clean, modular architecture. Our
                codebases are easy to extend, maintain, and scale — built for
                real production, not for demos.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-xl text-left"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-4 text-cyan-400"
              >
                <Gauge className="w-10 h-10" />
              </motion.div>

              <h3 className="text-xl font-semibold mb-3">
                Performance Obsessed
              </h3>
              <p className="opacity-80 text-sm leading-relaxed">
                From API response times to UI transitions, we optimize every
                layer for speed. Fast apps convert better, retain users, and
                feel premium.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-xl text-left"
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-4 text-cyan-400"
              >
                <Layers className="w-10 h-10" />
              </motion.div>

              <h3 className="text-xl font-semibold mb-3">
                Scalable From Day One
              </h3>
              <p className="opacity-80 text-sm leading-relaxed">
                We build systems that grow with your business — from database
                design to deployment workflows. Your app stays stable and ready
                for scale.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
