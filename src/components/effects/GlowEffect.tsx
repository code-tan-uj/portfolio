"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ========================================================================== */
/*  Types                                                                      */
/* ========================================================================== */

export interface GlowEffectProps {
  /** Glow colour (default: var(--color-primary)) */
  color?: string;
  /** Glow diameter in px (default 300) */
  size?: number;
  /** Glow opacity 0-1 (default 0.15) */
  intensity?: number;
  /** CSS mix-blend-mode (default "screen") */
  blendMode?: "screen" | "overlay" | "soft-light" | "normal";
  /** Extra class names on the wrapper */
  className?: string;
  children: React.ReactNode;
}

/* ========================================================================== */
/*  Spring config                                                              */
/* ========================================================================== */

const SPRING = { stiffness: 300, damping: 30, mass: 0.5 };

/* ========================================================================== */
/*  Component                                                                  */
/* ========================================================================== */

export default function GlowEffect({
  color = "var(--color-primary)",
  size = 300,
  intensity = 0.15,
  blendMode = "screen",
  className,
  children,
}: GlowEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const glowX = useSpring(rawX, SPRING);
  const glowY = useSpring(rawY, SPRING);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    },
    [rawX, rawY],
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}

      {/* Glow overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 1 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      >
        <motion.div
          style={{
            position: "absolute",
            width: size,
            height: size,
            x: glowX,
            y: glowY,
            marginLeft: -size / 2,
            marginTop: -size / 2,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity: intensity,
            mixBlendMode: blendMode,
            willChange: "transform",
          }}
        />
      </motion.div>
    </div>
  );
}
