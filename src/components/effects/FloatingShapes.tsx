"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

/* ========================================================================== */
/*  Types                                                                      */
/* ========================================================================== */

export interface FloatingShapesProps {
  /** Turn the effect on/off */
  enabled?: boolean;
  /** Number of shapes (default 8, capped at 12) */
  count?: number;
  /** Extra class names */
  className?: string;
}

type ShapeKind = "circle" | "square" | "triangle";

interface ShapeConfig {
  kind: ShapeKind;
  size: number;
  x: string;
  y: string;
  opacity: number;
  blur: number;
  duration: number;
  delay: number;
  dx: number;
  dy: number;
  rotate: number;
  color: string;
}

/* ========================================================================== */
/*  Colour palette — pulled from design-system tokens via CSS vars             */
/* ========================================================================== */

const PALETTE = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-accent)",
];

/* ========================================================================== */
/*  Deterministic pseudo-random (seeded) to avoid hydration mismatches         */
/* ========================================================================== */

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateShapes(count: number): ShapeConfig[] {
  const rand = seededRandom(42);
  const kinds: ShapeKind[] = ["circle", "square", "triangle"];
  const shapes: ShapeConfig[] = [];

  for (let i = 0; i < Math.min(count, 12); i++) {
    shapes.push({
      kind: kinds[Math.floor(rand() * kinds.length)],
      size: 40 + rand() * 120,
      x: `${5 + rand() * 85}%`,
      y: `${5 + rand() * 85}%`,
      opacity: 0.04 + rand() * 0.08,
      blur: 20 + rand() * 40,
      duration: 18 + rand() * 14,
      delay: rand() * 6,
      dx: 20 + rand() * 40,
      dy: 20 + rand() * 40,
      rotate: 10 + rand() * 30,
      color: PALETTE[Math.floor(rand() * PALETTE.length)],
    });
  }
  return shapes;
}

/* ========================================================================== */
/*  Shape renderer                                                             */
/* ========================================================================== */

function Shape({ cfg }: { cfg: ShapeConfig }) {
  const borderRadius =
    cfg.kind === "circle"
      ? "50%"
      : cfg.kind === "square"
        ? "20%"
        : "0"; // triangle uses clip-path

  const clipPath =
    cfg.kind === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : undefined;

  return (
    <motion.div
      className="absolute"
      style={{
        width: cfg.size,
        height: cfg.size,
        left: cfg.x,
        top: cfg.y,
        background: cfg.color,
        borderRadius,
        clipPath,
        opacity: cfg.opacity,
        filter: `blur(${cfg.blur}px)`,
        willChange: "transform",
      }}
      animate={{
        x: [0, cfg.dx, -cfg.dx * 0.6, 0],
        y: [0, -cfg.dy, cfg.dy * 0.7, 0],
        rotate: [0, cfg.rotate, -cfg.rotate * 0.5, 0],
      }}
      transition={{
        duration: cfg.duration,
        delay: cfg.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ========================================================================== */
/*  Component                                                                  */
/* ========================================================================== */

/**
 * Decorative floating geometric shapes. Lightweight Framer Motion alternative
 * to the Canvas-based Particles component.
 *
 * ```tsx
 * <FloatingShapes enabled count={6} />
 * ```
 */
export default function FloatingShapes({
  enabled = true,
  count = 8,
  className,
}: FloatingShapesProps) {
  const shapes = useMemo(() => generateShapes(count), [count]);

  if (!enabled) return null;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {shapes.map((cfg, i) => (
        <Shape key={i} cfg={cfg} />
      ))}
    </div>
  );
}
