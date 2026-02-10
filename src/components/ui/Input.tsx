"use client";

import {
  forwardRef,
  useState,
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

type SharedProps = {
  /** Floating label text */
  label: string;
  /** Error message (also sets error styling) */
  error?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Icon placed at the left edge */
  iconLeft?: ReactNode;
  /** Icon placed at the right edge */
  iconRight?: ReactNode;
  /** Show live character count (provide maxLength on the input props) */
  showCount?: boolean;
};

export type InputFieldProps = SharedProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
    as?: "input";
  };

export type TextareaFieldProps = SharedProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> & {
    as: "textarea";
    /** Visible rows for textarea */
    rows?: number;
  };

export type InputProps = InputFieldProps | TextareaFieldProps;

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

/** Styled input / textarea with floating label, glass background, and error state. */
const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  function Input(props, ref) {
    const {
      label,
      error,
      helperText,
      iconLeft,
      iconRight,
      showCount = false,
      className,
      ...rest
    } = props;

    const isTextarea = props.as === "textarea";
    const uid = useId();
    const id = rest.id ?? uid;
    const [focused, setFocused] = useState(false);

    const value = String(rest.value ?? rest.defaultValue ?? "");
    const hasValue = value.length > 0;
    const isFloating = focused || hasValue;
    const hasError = !!error;
    const maxLen = rest.maxLength;

    /* ---- shared wrapper + field styles ----------------------------------- */
    const wrapperStyle: React.CSSProperties = {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      background: "var(--glass-bg)",
      backdropFilter: "blur(var(--glass-blur))",
      WebkitBackdropFilter: "blur(var(--glass-blur))",
      border: `1px solid ${hasError ? "var(--color-error)" : focused ? "var(--color-primary)" : "var(--color-border)"}`,
      borderRadius: "var(--radius-xl)",
      padding: iconLeft ? "0 var(--space-4) 0 var(--space-10)" : "0 var(--space-4)",
      paddingRight: iconRight ? "var(--space-10)" : "var(--space-4)",
      transition:
        "border-color var(--duration-base) var(--ease-smooth), box-shadow var(--duration-base) var(--ease-smooth)",
      boxShadow: focused
        ? hasError
          ? "0 0 0 3px rgba(239,68,68,0.15)"
          : "0 0 0 3px rgba(99,102,241,0.12)"
        : "none",
    };

    const fieldStyle: React.CSSProperties = {
      width: "100%",
      background: "transparent",
      border: "none",
      outline: "none",
      fontFamily: "var(--font-primary)",
      fontSize: "var(--text-base)",
      color: "var(--color-text-primary)",
      padding: "22px 0 6px",
      lineHeight: "var(--leading-normal)",
    };

    const labelStyle: React.CSSProperties = {
      position: "absolute",
      left: iconLeft ? "var(--space-10)" : "var(--space-4)",
      pointerEvents: "none",
      fontFamily: "var(--font-primary)",
      transformOrigin: "left top",
      transition:
        "transform var(--duration-base) var(--ease-smooth), color var(--duration-base) var(--ease-smooth), font-size var(--duration-base) var(--ease-smooth)",
      color: hasError
        ? "var(--color-error)"
        : focused
          ? "var(--color-primary)"
          : "var(--color-text-tertiary)",
      transform: isFloating ? "translateY(-10px)" : "translateY(0)",
      fontSize: isFloating ? "var(--text-xs)" : "var(--text-base)",
      fontWeight: isFloating ? 600 : 400,
      top: isFloating ? 8 : 14,
    };

    const iconStyle = (side: "left" | "right"): React.CSSProperties => ({
      position: "absolute",
      [side]: "var(--space-3)",
      top: "50%",
      transform: "translateY(-50%)",
      color: focused ? "var(--color-primary)" : "var(--color-text-tertiary)",
      transition: "color var(--duration-base) var(--ease-smooth)",
      display: "flex",
      pointerEvents: "none",
    });

    return (
      <div className={clsx("flex flex-col gap-1", className)}>
        <div style={wrapperStyle}>
          {iconLeft && <span style={iconStyle("left")} aria-hidden="true">{iconLeft}</span>}

          <label htmlFor={id} style={labelStyle}>
            {label}
          </label>

          {isTextarea ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={id}
              rows={(props as TextareaFieldProps).rows ?? 4}
              aria-invalid={hasError}
              aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
              onFocus={(e) => { setFocused(true); (rest as TextareaHTMLAttributes<HTMLTextAreaElement>).onFocus?.(e as never); }}
              onBlur={(e) => { setFocused(false); (rest as TextareaHTMLAttributes<HTMLTextAreaElement>).onBlur?.(e as never); }}
              style={{ ...fieldStyle, resize: "vertical", minHeight: 80 }}
              {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              id={id}
              aria-invalid={hasError}
              aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
              onFocus={(e) => { setFocused(true); (rest as InputHTMLAttributes<HTMLInputElement>).onFocus?.(e as never); }}
              onBlur={(e) => { setFocused(false); (rest as InputHTMLAttributes<HTMLInputElement>).onBlur?.(e as never); }}
              style={fieldStyle}
              {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}

          {iconRight && <span style={iconStyle("right")} aria-hidden="true">{iconRight}</span>}
        </div>

        {/* Bottom row: error / helper + character count */}
        <div className="flex items-start justify-between gap-2 min-h-[20px] px-1">
          <AnimatePresence mode="wait">
            {hasError ? (
              <motion.p
                key="error"
                id={`${id}-error`}
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                style={{
                  margin: 0,
                  fontSize: "var(--text-xs)",
                  color: "var(--color-error)",
                  fontFamily: "var(--font-primary)",
                }}
              >
                {error}
              </motion.p>
            ) : helperText ? (
              <motion.p
                key="helper"
                id={`${id}-helper`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  margin: 0,
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-tertiary)",
                  fontFamily: "var(--font-primary)",
                }}
              >
                {helperText}
              </motion.p>
            ) : (
              <span />
            )}
          </AnimatePresence>

          {showCount && maxLen != null && (
            <span
              style={{
                fontSize: "var(--text-xs)",
                color: value.length >= maxLen ? "var(--color-error)" : "var(--color-text-tertiary)",
                fontFamily: "var(--font-mono)",
                flexShrink: 0,
              }}
            >
              {value.length}/{maxLen}
            </span>
          )}
        </div>
      </div>
    );
  },
);

export default Input;
