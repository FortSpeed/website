"use client";

import { HTMLMotionProps, motion, useReducedMotion, Variants } from "motion/react";
import { PropsWithChildren } from "react";

interface MotionCardProps extends HTMLMotionProps<"div"> {
  variants?: Variants;
  inherit?: boolean; // if true, let parent control animation states (for stagger)
}

export default function MotionCard({
  children,
  className,
  variants,
  inherit = false,
  ...rest
}: PropsWithChildren<MotionCardProps>) {
  const prefersReduced = useReducedMotion();

  const itemVariants: Variants =
    variants ??
    (prefersReduced
      ? {
          hidden: { opacity: 1 },
          show: { opacity: 1, transition: { duration: 0 } },
        }
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

  const commonProps = {
    whileHover: prefersReduced ? undefined : { y: -4, scale: 1.01 },
    whileTap: prefersReduced ? undefined : { scale: 0.99 },
    variants: itemVariants,
    className,
  } as const;

  return inherit ? (
    <motion.div {...commonProps} {...rest}>
      {children}
    </motion.div>
  ) : (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      {...commonProps}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
