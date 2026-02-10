"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface ParallaxSectionProps {
  /** Parallax speed factor (0.1 = subtle, 0.9 = dramatic). Default 0.3 */
  speed?: number;
  /** Additional class names on the outer wrapper */
  className?: string;
  /** Inline styles on the outer wrapper */
  style?: CSSProperties;
  children: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Wraps children in a parallax layer that moves slower than the scroll,
 * creating a depth-of-field illusion.
 *
 * Uses `transform: translateY` for GPU-composited performance — no layout
 * thrashing, no paint, no reflow.
 *
 * ```tsx
 * <ParallaxSection speed={0.3}>
 *   <Image src="/bg.jpg" fill alt="" />
 * </ParallaxSection>
 * ```
 */
export default function ParallaxSection({
  speed = 0.3,
  className,
  style,
  children,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map scroll progress [0→1] to a translateY range.
  // Negative speed multiplier keeps movement in the natural direction.
  const range = 100 * speed; // px of total travel
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
