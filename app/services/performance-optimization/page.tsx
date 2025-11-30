"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Rocket,
  GaugeCircle,
  LineChart,
  Search,
  BarChart3,
} from "lucide-react";
import performanceBg from "@/assets/performance-bg.png";
import coreVitalsImg from "@/assets/core-vitals.png";
import seoImg from "@/assets/seo-optimization.png";
import auditImg from "@/assets/performance.png";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useRouter } from "next/navigation";

export default function PerformanceOptimizationPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full bg-black text-white font-sans overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full mx-auto px-6 pt-32 pb-28 lg:px-16 z-10">
        <div className="flex justify-center items-center w-fit p-4 text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-xl mb-6 relative z-10">
          <Rocket />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-2xl max-w-3xl relative z-10"
        >
          Performance Optimization
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl opacity-80 mt-6 text-lg relative z-10"
        >
          We fix slow websites. Expect faster load times, tighter SEO, higher
          conversions, and smoother experiences across every device.
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
            Optimize Your Website
          </InteractiveHoverButton>
        </motion.div>

        {/* HERO IMAGE */}
        <div className="absolute inset-0 overflow-hidden shadow-2xl z-0">
          <Image
            src={performanceBg}
            alt="Performance Optimization Illustration"
            width={1400}
            height={800}
            className="w-full h-full object-cover absolute h-[115%] right-0"
          />

          <div className="absolute inset-0 bg-radial from-black/30 to-black/70"></div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-20">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-14">
          What We Improve
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* CARD 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 p-10 rounded-2xl text-center backdrop-blur-xl border border-white/10 
            hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)] shadow-xl"
          >
            <Image
              src={coreVitalsImg}
              alt="Core Web Vitals"
              className="w-32 h-32 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-3">
              Speed & Core Web Vitals
            </h3>
            <p className="opacity-80 text-sm leading-relaxed">
              We supercharge performance using Lighthouse, PageSpeed, and deep
              frontend audits to ensure instant-loading experiences.
            </p>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white/5 p-10 rounded-2xl text-center backdrop-blur-xl border border-white/10 
            hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)] shadow-xl"
          >
            <Image
              src={seoImg}
              alt="SEO Improvements"
              className="w-32 h-32 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-3">SEO Improvements</h3>
            <p className="opacity-80 text-sm leading-relaxed">
              We enhance rankings with technical SEO, schema, meta optimization,
              and error-free crawling.
            </p>
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white/5 p-10 rounded-2xl text-center backdrop-blur-xl border border-white/10 
            hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)] shadow-xl"
          >
            <Image
              src={auditImg}
              alt="Monitoring & Audits"
              className="w-32 h-32 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-3">
              Monitoring & Ongoing Audits
            </h3>
            <p className="opacity-80 text-sm leading-relaxed">
              Real-time performance tracking, analytics, and audits to ensure
              your site stays fast as it grows.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURE LIST SECTION */}
      <section className="w-full max-w-5xl mx-auto px-6 py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
        >
          A Proven Approach to Faster Websites
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="opacity-80 mb-16 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          Our optimization process is data-driven, measurable, and tailored to
          your business goals. Every improvement is validated with real
          analytics and before/after benchmarks.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Performance Audits",
              desc: "Deep analysis of bottlenecks, render blocking, backend delays, caching issues, and bundle size.",
              icon: GaugeCircle,
            },
            {
              title: "SEO & Indexing Boost",
              desc: "Technical SEO, structured data, metadata, sitemaps, and crawl optimization for maximum visibility.",
              icon: Search,
            },
            {
              title: "Analytics & Monitoring",
              desc: "Tracking Core Web Vitals, user interactions, and ongoing reports to maintain long-term performance.",
              icon: BarChart3,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-xl 
              hover:border-cyan-500/40 hover:shadow-[0_0_35px_rgba(236,72,153,0.15)] 
              "
            >
              <div className="flex flex-col items-center gap-4">
                <item.icon className="w-12 h-12 text-cyan-400" />
                <h3 className="font-semibold text-base mb-4">{item.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
