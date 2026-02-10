"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface StaggerContainerProps {
  /** Delay between each child animation in seconds (default 0.1) */
  stagger?: number;
  /** Delay before the first child animates (default 0) */
  delayChildren?: number;
  /** Animate only once (default true) */
  once?: boolean;
  /** IntersectionObserver threshold (default 0.1) */
  threshold?: number;
  /** Extra class names */
  className?: string;
  children: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Container that staggers the entrance of its children.
 *
 * Works best when direct children are `<ScrollReveal>` or any component that
 * accepts Framer Motion parent orchestration via variants with
 * `hidden` / `visible` states.
 *
 * ```tsx
 * <StaggerContainer stagger={0.12}>
 *   <ScrollReveal variant="slideUp"><Card /></ScrollReveal>
 *   <ScrollReveal variant="slideUp"><Card /></ScrollReveal>
 * </StaggerContainer>
 * ```
 */
export default function StaggerContainer({
  stagger = 0.1,
  delayChildren = 0,
  once = true,
  threshold = 0.1,
  className,
  children,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
