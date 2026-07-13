"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { fadeInUp } from "@/lib/motion";

interface MotionItemProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

/**
 * A staggered child for use inside a `MotionSection` carrying a container
 * variant (e.g. `staggerContainer`). Unlike `MotionSection`, it has no
 * viewport trigger of its own — it inherits animation state from the
 * nearest animating ancestor, which is what makes the stagger work.
 */
export function MotionItem({
  children,
  className,
  variants = fadeInUp,
}: MotionItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
