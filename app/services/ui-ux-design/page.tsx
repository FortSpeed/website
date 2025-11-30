"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Layers,
  CheckCircle2,
  Component,
  LayoutTemplate,
  PenTool,
  Rocket,
  SearchCheck,
} from "lucide-react";
import UiUxBg from "@/assets/ui-ux.png";
import uxDesign from "@/assets/ux-design.png";
import wireFrame from "@/assets/wireframe.png";
import designSystem from "@/assets/design-system.png";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useRouter } from "next/navigation";

export default function UIUXDesignPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full bg-black text-white font-sans overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full mx-auto px-6 pt-32 pb-28 lg:px-16 z-10">
        <div className="flex justify-center items-center w-fit p-4 text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-xl mb-6 relative z-10">
          <Layers />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-2xl max-w-3xl relative z-10"
        >
          Clean, Modern UI/UX Design
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl opacity-80 mt-6 text-lg relative z-10"
        >
          We craft intuitive, user‑focused designs that feel effortless. Our
          process blends research, clarity, and modern aesthetics.
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
            Craft Your Design
          </InteractiveHoverButton>
        </motion.div>

        {/* HERO IMAGE */}
        <div className=" absolute inset-0 overflow-hidden shadow-2xl  z-0 ">
          <Image
            src={UiUxBg}
            alt="Hero Illustration"
            width={1400}
            height={800}
            className="w-full h-full object-cover absolute h-[115%] right-0  "
          />

          <div className="absolute inset-0 bg-radial from-black/30 to-black/60"></div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-20 bg-[url('/test-bg.pngd')] bg-cover bg-no-repeat">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">
          What We Deliver
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 p-10 rounded-2xl text-center backdrop-blur-xl border border-white/10 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] shadow-xl"
          >
            {/* <PenTool className="w-20 h-20 mx-auto text-purple-400 mb-4" /> */}
            <Image
              src={uxDesign}
              alt="ui ux design"
              className="w-32 h-32 mx-auto text-purple-400 mb-4"
            />
            <h3 className="text-xl font-semibold mb-3">UI/UX Design</h3>
            <p className="opacity-80 text-sm leading-relaxed">
              Straightforward, user-focused design that feels good to use. Clean
              interfaces backed by real research and clarity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white/5 p-10 rounded-2xl text-center backdrop-blur-xl border border-white/10 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] shadow-xl"
          >
            <Image
              src={wireFrame}
              alt="wireframe"
              className="w-32 h-32 mx-auto text-purple-400 mb-4"
            />
            <h3 className="text-xl font-semibold mb-3">
              Wireframing & Prototyping
            </h3>
            <p className="opacity-80 text-sm leading-relaxed">
              High‑fidelity prototypes that bring ideas to life before
              development begins.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white/5 p-10 rounded-2xl text-center backdrop-blur-xl border border-white/10 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] shadow-xl"
          >
            <Image
              src={designSystem}
              alt="design system"
              className="w-32 h-32 mx-auto text-purple-400 mb-4"
            />
            <h3 className="text-xl font-semibold mb-3">Design Systems</h3>
            <p className="opacity-80 text-sm leading-relaxed">
              Scalable component libraries ensuring visual consistency across
              your entire platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURE LIST */}

      <section className="w-full max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
        >
          How We Deliver Reliable, High-Quality Experiences
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="opacity-80 mb-16 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          Our process is built on clarity, precision, and measurable outcomes.
          Every decision is informed by real user behavior and validated through
          methodical testing — removing guesswork and ensuring long-term product
          success.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "User Research & Validation",
              desc: "We uncover user needs, pain points, and behavior patterns through qualitative and quantitative research — ensuring every feature is grounded in reality.",
              icon: SearchCheck,
            },
            {
              title: "Scalable Design Systems",
              desc: "We craft modular component libraries and unified visual standards that create long-term consistency, reduce dev time, and prevent design drift.",
              icon: Component,
            },
            {
              title: "Prototyping & Experience Mapping",
              desc: "Before anything is built, we create high-fidelity flows and interactive prototypes to validate usability, align teams, and eliminate costly rework.",
              icon: PenTool,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-xl 
        hover:border-purple-500/40 hover:shadow-[0_0_35px_rgba(168,85,247,0.15)]
        "
            >
              <div className="flex flex-col items-center gap-4">
                <item.icon className="w-12 h-12 text-purple-400 flex-shrink-0" />
                <div className="text-center">
                  <h3 className="font-semibold text-base mb-4">{item.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
