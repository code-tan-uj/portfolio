"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Tooltip text content */
  content: string;
  /** Preferred position (auto-adjusts if clipped) */
  position?: TooltipPosition;
  /** Delay before showing (ms) */
  delay?: number;
  /** Max width of the tooltip */
  maxWidth?: number;
  children: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Arrow offset / translation per position                                    */
/* -------------------------------------------------------------------------- */

const positionStyles: Record<TooltipPosition, { tip: CSSProperties; arrow: CSSProperties }> = {
  top: {
    tip: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 8 },
    arrow: {
      bottom: -4,
      left: "50%",
      transform: "translateX(-50%) rotate(45deg)",
    },
  },
  bottom: {
    tip: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 8 },
    arrow: {
      top: -4,
      left: "50%",
      transform: "translateX(-50%) rotate(45deg)",
    },
  },
  left: {
    tip: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: 8 },
    arrow: {
      right: -4,
      top: "50%",
      transform: "translateY(-50%) rotate(45deg)",
    },
  },
  right: {
    tip: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 8 },
    arrow: {
      left: -4,
      top: "50%",
      transform: "translateY(-50%) rotate(45deg)",
    },
  },
};

const originMap: Record<TooltipPosition, string> = {
  top: "center bottom",
  bottom: "center top",
  left: "right center",
  right: "left center",
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

/** Hover tooltip with arrow, configurable position, and entrance animation. */
export default function Tooltip({
  content,
  position = "top",
  delay = 300,
  maxWidth = 200,
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const pos = positionStyles[position];

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] as const }}
            className="pointer-events-none absolute z-50"
            style={{
              ...pos.tip,
              transformOrigin: originMap[position],
              whiteSpace: "normal",
            }}
          >
            <span
              className="block rounded-lg"
              style={{
                padding: "6px 12px",
                maxWidth,
                fontSize: "var(--text-xs)",
                fontFamily: "var(--font-primary)",
                fontWeight: 500,
                lineHeight: 1.5,
                color: "#fff",
                backgroundColor: "var(--color-text-primary)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                textAlign: "center",
              }}
            >
              {content}
            </span>

            {/* Arrow */}
            <span
              aria-hidden="true"
              className="absolute"
              style={{
                ...pos.arrow,
                width: 8,
                height: 8,
                backgroundColor: "var(--color-text-primary)",
              }}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
