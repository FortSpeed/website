"use client";

import { HTMLAttributes, PropsWithChildren } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Variants } from "motion/react";

interface MotionCardProps extends HTMLAttributes<HTMLDivElement> {
  variants?: Variants;
}

export default function MotionCard({
  children,
  className,
  variants,
  ...rest
}: PropsWithChildren<MotionCardProps>) {
  const prefersReduced = useReducedMotion();

  const itemVariants: Variants =
    variants ??
    (prefersReduced
      ? { hidden: { opacity: 1 }, show: { opacity: 1, transition: { duration: 0 } } }
      : {
          hidden: { opacity: 0, y: 24, scale: 0.98, filter: "blur(6px)" },
          show: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          },
        });

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={prefersReduced ? undefined : { y: -4, scale: 1.01 }}
      whileTap={prefersReduced ? undefined : { scale: 0.99 }}
      variants={itemVariants}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
