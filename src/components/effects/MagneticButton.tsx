"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

/* ========================================================================== */
/*  Types                                                                      */
/* ========================================================================== */

export interface MagneticButtonProps {
  children: ReactNode;
  /** Pull strength toward cursor — 0 = none, 1 = max (default 0.3) */
  strength?: number;
  /** Max displacement in px (default 12) */
  maxDistance?: number;
  /** Extra class names */
  className?: string;
}

/* ========================================================================== */
/*  Spring config                                                              */
/* ========================================================================== */

const SPRING = { stiffness: 250, damping: 20, mass: 0.5 };

/* ========================================================================== */
/*  Component                                                                  */
/* ========================================================================== */

export default function MagneticButton({
  children,
  strength = 0.3,
  maxDistance = 12,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;

      x.set(clamp(dx, -maxDistance, maxDistance));
      y.set(clamp(dy, -maxDistance, maxDistance));
    },
    [strength, maxDistance, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: hovered ? 1.04 : 1 }}
    >
      {children}
    </motion.div>
  );
}
