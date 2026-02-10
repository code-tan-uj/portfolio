"use client";

import { type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type ScrollRevealVariant =
  | "fadeIn"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "rotate";

export interface ScrollRevealProps {
  /** Animation preset */
  variant?: ScrollRevealVariant;
  /** Duration in seconds (default 0.5) */
  duration?: number;
  /** Delay in seconds (default 0) */
  delay?: number;
  /** Animate only once (default true) */
  once?: boolean;
  /** IntersectionObserver threshold (default 0.15) */
  threshold?: number;
  /** Extra class names */
  className?: string;
  children: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Variant definitions                                                        */
/* -------------------------------------------------------------------------- */

const EASE = [0.4, 0, 0.2, 1] as const;

interface VariantPair {
  hidden: Record<string, number>;
  visible: Record<string, number>;
}

const variants: Record<ScrollRevealVariant, VariantPair> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  rotate: {
    hidden: { opacity: 0, rotate: 10 },
    visible: { opacity: 1, rotate: 0 },
  },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Wraps children and animates them when scrolled into view.
 *
 * ```tsx
 * <ScrollReveal variant="slideUp" delay={0.2}>
 *   <Card>...</Card>
 * </ScrollReveal>
 * ```
 */
export default function ScrollReveal({
  variant = "slideUp",
  duration = 0.5,
  delay = 0,
  once = true,
  threshold = 0.15,
  className,
  children,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  const v = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial={v.hidden}
      animate={isInView ? v.visible : v.hidden}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
