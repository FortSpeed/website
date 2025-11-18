"use client";

import { HTMLMotionProps, motion, useReducedMotion, Variants } from "motion/react";
import { PropsWithChildren } from "react";

interface MotionSectionProps extends HTMLMotionProps<"section"> {
  variants?: Variants;
  viewportAmount?: number;
}

export default function MotionSection({
  children,
  className,
  variants,
  viewportAmount = 0.2,
  ...rest
}: PropsWithChildren<MotionSectionProps>) {
  const prefersReduced = useReducedMotion();

  const baseVariants: Variants = variants ?? {
    hidden: prefersReduced ? { opacity: 1 } : { opacity: 0, y: 24 },
    show: prefersReduced
      ? { opacity: 1, transition: { duration: 0 } }
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: viewportAmount }}
      variants={baseVariants}
      className={className}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
