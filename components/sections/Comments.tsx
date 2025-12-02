"use client";

import { Star } from "lucide-react";
import React from "react";
import { title, description, comments } from "@/data/testimonials";
import MotionSection from "../animation/MotionSection";
import MotionCard from "../animation/MotionCard";
import { Marquee } from "../ui/marquee";
import { cn } from "@/lib/utils";

const TestimonialCard = ({
  client,
  comment,
  position,
  rating,
}: {
  client: string;
  comment: string;
  position: string;
  rating: number;
}) => {
  return (
    <MotionCard
      className={cn(
        "relative p-6 md:p-8",
        "min-w-[280px] max-w-[280px] md:min-w-[350px] md:max-w-[350px]",
        "bg-white/5 backdrop-blur-sm",
        "border border-white/10 rounded-2xl",
        "overflow-hidden duration-400",
        "hover:scale-105 hover:border-white/20"
      )}
    >
      {/* Optional glowing border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/30"></div>

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
  );
};

const Comments = () => {
  // Split testimonials into two rows for marquee effect
  const firstRow = comments.slice(0, Math.ceil(comments.length / 2));
  const secondRow = comments.slice(Math.ceil(comments.length / 2));

  return (
    <MotionSection className="section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="subtitle-gradient">{title}</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black">
          <Marquee pauseOnHover className="[--duration:30s] py-4">
            {firstRow.map((testimonial, i) => (
              <div key={`first-${i}`} className="mx-4">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:30s] py-4">
            {secondRow.map((testimonial, i) => (
              <div key={`second-${i}`} className="mx-4">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </Marquee>
          <div className="from-black pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
          <div className="from-black pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
      </div>
    </MotionSection>
  );
};

export default Comments;
