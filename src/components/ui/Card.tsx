"use client";

import { forwardRef, type ReactNode, type HTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type CardVariant = "default" | "elevated" | "flat";
export type CardPadding = "sm" | "md" | "lg" | "none";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  /** Visual style variant */
  variant?: CardVariant;
  /** Inner padding preset */
  padding?: CardPadding;
  /** Optional header area rendered above children */
  header?: ReactNode;
  /** Optional footer area rendered below children */
  footer?: ReactNode;
  /** Enable hover-lift animation */
  hoverable?: boolean;
  /** Make the whole card clickable */
  onClick?: () => void;
  children: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Style maps                                                                 */
/* -------------------------------------------------------------------------- */

const variantBase: Record<CardVariant, React.CSSProperties> = {
  default: {
    background: "var(--glass-bg)",
    backdropFilter: "blur(var(--glass-blur))",
    WebkitBackdropFilter: "blur(var(--glass-blur))",
    border: "1px solid var(--glass-border)",
    boxShadow: "var(--glass-shadow)",
  },
  elevated: {
    background: "var(--glass-bg-heavy)",
    backdropFilter: "blur(var(--glass-blur-lg))",
    WebkitBackdropFilter: "blur(var(--glass-blur-lg))",
    border: "1px solid var(--glass-border)",
    boxShadow: "var(--glass-shadow-lg)",
  },
  flat: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    boxShadow: "none",
  },
};

const paddingMap: Record<CardPadding, string> = {
  none: "0",
  sm: "var(--space-4)",
  md: "var(--space-6)",
  lg: "var(--space-8)",
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

/** Glass-morphism card with optional header, footer, and hover animation. */
const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = "default",
    padding = "md",
    header,
    footer,
    hoverable = false,
    onClick,
    className,
    children,
    ...rest
  },
  ref,
) {
  const isClickable = !!onClick;

  return (
    <motion.div
      ref={ref}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isClickable
          ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }
          : undefined
      }
      className={clsx("rounded-2xl overflow-hidden", className)}
      style={{
        ...variantBase[variant],
        borderRadius: "var(--radius-2xl)",
        cursor: isClickable ? "pointer" : undefined,
        transition:
          "box-shadow var(--duration-base) var(--ease-smooth), border-color var(--duration-base) var(--ease-smooth), transform var(--duration-base) var(--ease-smooth)",
      }}
      whileHover={
        hoverable || isClickable
          ? {
              y: -4,
              boxShadow: "var(--glass-shadow-lg)",
              borderColor: "var(--color-border-hover)",
            }
          : undefined
      }
      whileTap={isClickable ? { scale: 0.985 } : undefined}
      {...(rest as HTMLMotionProps<"div">)}
    >
      {header && (
        <div
          style={{
            padding: `${paddingMap[padding]} ${paddingMap[padding]} 0`,
          }}
        >
          {header}
        </div>
      )}

      <div style={{ padding: paddingMap[padding] }}>{children}</div>

      {footer && (
        <div
          style={{
            padding: `0 ${paddingMap[padding]} ${paddingMap[padding]}`,
            borderTop: "1px solid var(--color-border)",
            marginTop: padding === "none" ? 0 : undefined,
          }}
        >
          <div style={{ paddingTop: paddingMap[padding === "none" ? "sm" : padding] }}>
            {footer}
          </div>
        </div>
      )}
    </motion.div>
  );
});

export default Card;
