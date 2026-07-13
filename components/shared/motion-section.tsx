"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { fadeInUp, viewportOnce } from "@/lib/motion";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

/**
 * Centralized scroll-reveal wrapper: every animated block in the app goes
 * through here so `prefers-reduced-motion` is honored in exactly one place.
 */
export function MotionSection({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
}: MotionSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
