"use client";

import {
  forwardRef,
  useRef,
  useCallback,
  type ButtonHTMLAttributes,
  type ReactNode,
  type MouseEvent,
} from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Show a loading spinner and disable interaction */
  loading?: boolean;
  /** Icon placed before the label */
  iconLeft?: ReactNode;
  /** Icon placed after the label */
  iconRight?: ReactNode;
  /** Stretch to full container width */
  fullWidth?: boolean;
  children: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Style maps                                                                 */
/* -------------------------------------------------------------------------- */

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "var(--gradient-primary)",
    color: "#fff",
    border: "none",
    boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
  },
  secondary: {
    background: "var(--glass-bg)",
    color: "var(--color-primary)",
    border: "1px solid var(--color-border)",
    backdropFilter: "blur(var(--glass-blur))",
    WebkitBackdropFilter: "blur(var(--glass-blur))",
  },
  ghost: {
    background: "transparent",
    color: "var(--color-primary)",
    border: "1px solid transparent",
  },
  danger: {
    background: "var(--color-error)",
    color: "#fff",
    border: "none",
    boxShadow: "0 4px 20px rgba(239,68,68,0.3)",
  },
};

const hoverVariants: Record<ButtonVariant, HTMLMotionProps<"button">["whileHover"]> = {
  primary: { scale: 1.04, boxShadow: "0 8px 30px rgba(99,102,241,0.45)" },
  secondary: { scale: 1.04, borderColor: "var(--color-primary)", boxShadow: "0 4px 20px rgba(99,102,241,0.12)" },
  ghost: { scale: 1.04, backgroundColor: "var(--color-primary-light)" },
  danger: { scale: 1.04, boxShadow: "0 8px 30px rgba(239,68,68,0.45)" },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: "var(--space-2) var(--space-4)", fontSize: "var(--text-sm)" },
  md: { padding: "10px var(--space-6)", fontSize: "var(--text-base)" },
  lg: { padding: "var(--space-3) var(--space-8)", fontSize: "var(--text-lg)" },
  xl: { padding: "var(--space-4) var(--space-10)", fontSize: "var(--text-xl)" },
};

const radiusMap: Record<ButtonSize, string> = {
  sm: "var(--radius-md)",
  md: "var(--radius-lg)",
  lg: "var(--radius-xl)",
  xl: "var(--radius-xl)",
};

/* -------------------------------------------------------------------------- */
/*  Ripple helper                                                              */
/* -------------------------------------------------------------------------- */

function spawnRipple(e: MouseEvent<HTMLButtonElement>) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  const ripple = document.createElement("span");
  ripple.style.cssText = `
    position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;
    border-radius:50%;background:rgba(255,255,255,0.3);
    transform:scale(0);animation:btn-ripple 500ms ease-out forwards;
    pointer-events:none;
  `;
  btn.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

/** Versatile button with variants, sizes, loading state, and ripple effect. */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    iconLeft,
    iconRight,
    fullWidth = false,
    disabled,
    className,
    children,
    onClick,
    ...rest
  },
  ref,
) {
  const internalRef = useRef<HTMLButtonElement>(null);
  const btnRef = (ref as React.RefObject<HTMLButtonElement>) ?? internalRef;

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;
      spawnRipple(e);
      onClick?.(e);
    },
    [loading, disabled, onClick],
  );

  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={btnRef}
      disabled={isDisabled}
      onClick={handleClick}
      className={clsx("relative inline-flex items-center justify-center gap-2 overflow-hidden select-none", fullWidth && "w-full", className)}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        borderRadius: radiusMap[size],
        fontFamily: "var(--font-primary)",
        fontWeight: 600,
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.55 : 1,
        transition:
          "opacity var(--duration-base) var(--ease-smooth), box-shadow var(--duration-base) var(--ease-smooth), border-color var(--duration-base) var(--ease-smooth), background-color var(--duration-base) var(--ease-smooth)",
      }}
      whileHover={isDisabled ? undefined : hoverVariants[variant]}
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      {...(rest as HTMLMotionProps<"button">)}
    >
      {loading && (
        <Loader2 size={size === "sm" ? 14 : 18} className="animate-spin" />
      )}
      {!loading && iconLeft}
      <span>{children}</span>
      {!loading && iconRight}
    </motion.button>
  );
});

export default Button;
