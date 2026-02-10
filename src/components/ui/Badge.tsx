"use client";

import { type ReactNode, type HTMLAttributes } from "react";
import { clsx } from "clsx";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type BadgeVariant = "default" | "success" | "warning" | "error" | "info";
export type BadgeShape = "pill" | "rounded";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Colour variant */
  variant?: BadgeVariant;
  /** Border-radius style */
  shape?: BadgeShape;
  /** Optional icon before text */
  icon?: ReactNode;
  /** Show a small colour dot instead of / in addition to an icon */
  dot?: boolean;
  children: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Colour map                                                                 */
/* -------------------------------------------------------------------------- */

const colors: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  default: {
    bg: "var(--color-primary-light)",
    text: "var(--color-primary)",
    dot: "var(--color-primary)",
  },
  success: {
    bg: "rgba(16,185,129,0.12)",
    text: "var(--color-success)",
    dot: "var(--color-success)",
  },
  warning: {
    bg: "rgba(245,158,11,0.12)",
    text: "var(--color-warning)",
    dot: "var(--color-warning)",
  },
  error: {
    bg: "rgba(239,68,68,0.12)",
    text: "var(--color-error)",
    dot: "var(--color-error)",
  },
  info: {
    bg: "rgba(59,130,246,0.12)",
    text: "var(--color-info)",
    dot: "var(--color-info)",
  },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

/** Small colour-coded label / tag. */
export default function Badge({
  variant = "default",
  shape = "pill",
  icon,
  dot = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  const c = colors[variant];

  return (
    <span
      className={clsx("inline-flex items-center gap-1.5 select-none", className)}
      style={{
        padding: "2px 10px",
        fontSize: "var(--text-xs)",
        fontWeight: 600,
        fontFamily: "var(--font-primary)",
        lineHeight: 1.6,
        color: c.text,
        backgroundColor: c.bg,
        borderRadius: shape === "pill" ? "var(--radius-full)" : "var(--radius-md)",
        whiteSpace: "nowrap",
      }}
      {...rest}
    >
      {dot && (
        <span
          aria-hidden="true"
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: c.dot,
            flexShrink: 0,
          }}
        />
      )}
      {icon && <span className="flex items-center" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}
