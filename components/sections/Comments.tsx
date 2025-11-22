"use client"

import { Star } from "lucide-react";
import React from "react";
import { title, description, comments } from "@/data/testimonials";
import MotionSection from "../animation/MotionSection";
import MotionCard from "../animation/MotionCard";
import { motion } from "motion/react";
const Comments = () => {
  return (
    <MotionSection className="section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="subtitle-gradient">{title}</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <motion.ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } } }}>
          {comments.map(({ client, comment, position, rating }, i) => (
            <MotionCard
              key={i}
              className="
      group relative p-8 
      bg-white/5 backdrop-blur-sm 
      border border-white/10 rounded-2xl 
      overflow-hidden
      transition-all duration-500 
      hover:scale-105 hover:border-white/20
    "
            >
              {/* Optional glowing border */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/30 transition-all duration-500"></div>

              <div className="flex gap-1 mb-4">
                {[...Array(rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">{comment}</p>

              <div className="border-t border-white/10 pt-4">
                <div className="font-semibold text-gray-200">{client}</div>
                <div className="text-sm text-gray-500">{position}</div>
              </div>
            </MotionCard>
          ))}
        </motion.ul>
      </div>
    </MotionSection>
  );
};

export default Comments;
