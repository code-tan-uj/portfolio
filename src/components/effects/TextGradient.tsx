"use client";

import { type ReactNode, type CSSProperties } from "react";

/* ========================================================================== */
/*  Types                                                                      */
/* ========================================================================== */

export interface TextGradientProps {
  children: ReactNode;
  /** Gradient colour stops (default: primary → secondary → accent) */
  colors?: string[];
  /** Animation speed preset (default "medium") */
  speed?: "slow" | "medium" | "fast";
  /** Render as a different element (default "span") */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  /** Extra class names */
  className?: string;
  /** Extra inline styles */
  style?: CSSProperties;
}

/* ========================================================================== */
/*  Speed map                                                                  */
/* ========================================================================== */

const DURATION: Record<NonNullable<TextGradientProps["speed"]>, string> = {
  slow: "6s",
  medium: "3.5s",
  fast: "1.8s",
};

/* ========================================================================== */
/*  Component                                                                  */
/* ========================================================================== */

export default function TextGradient({
  children,
  colors = [
    "var(--color-primary)",
    "var(--color-secondary)",
    "var(--color-accent)",
    "var(--color-primary)",
  ],
  speed = "medium",
  as: Tag = "span",
  className,
  style,
}: TextGradientProps) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  return (
    <Tag
      className={className}
      style={{
        ...style,
        backgroundImage: gradient,
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: `text-gradient-shift ${DURATION[speed]} linear infinite`,
      }}
    >
      {children}
    </Tag>
  );
}
