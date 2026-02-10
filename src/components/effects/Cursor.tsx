"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

/* ========================================================================== */
/*  Types                                                                      */
/* ========================================================================== */

export interface CursorProps {
  /** Disable the custom cursor */
  enabled?: boolean;
  /** Dot radius in px (default 5) */
  dotSize?: number;
  /** Follower ring diameter in px (default 36) */
  ringSize?: number;
  /** Dot colour (default var(--color-primary)) */
  color?: string;
}

type CursorState = "default" | "hover" | "click";

/* ========================================================================== */
/*  Helpers                                                                    */
/* ========================================================================== */

const DOT_SPRING = { stiffness: 800, damping: 35, mass: 0.2 };
const RING_SPRING = { stiffness: 200, damping: 25, mass: 0.5 };

/* ========================================================================== */
/*  Component                                                                  */
/* ========================================================================== */

export default function Cursor({
  enabled = true,
  dotSize = 5,
  ringSize = 36,
  color = "var(--color-primary)",
}: CursorProps) {
  const [state, setState] = useState<CursorState>("default");
  const [isDesktop, setIsDesktop] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(undefined);

  /* Raw position (no spring for the motion value source) */
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  /* Dot follows tightly */
  const dotX = useSpring(rawX, DOT_SPRING);
  const dotY = useSpring(rawY, DOT_SPRING);

  /* Ring follows loosely */
  const ringX = useSpring(rawX, RING_SPRING);
  const ringY = useSpring(rawY, RING_SPRING);

  /* ---- Desktop detection ------------------------------------------------ */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ---- Mouse tracking --------------------------------------------------- */
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [rawX, rawY, visible],
  );

  const onMouseDown = useCallback(() => setState("click"), []);
  const onMouseUp = useCallback(() => setState("default"), []);

  const onMouseEnterInteractive = useCallback(() => setState("hover"), []);
  const onMouseLeaveInteractive = useCallback(() => setState("default"), []);

  const onMouseLeaveWindow = useCallback(() => setVisible(false), []);
  const onMouseEnterWindow = useCallback(() => setVisible(true), []);

  useEffect(() => {
    if (!enabled || !isDesktop) return;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

    /* Detect interactive elements */
    const interactives = () =>
      document.querySelectorAll<HTMLElement>(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]',
      );

    const attach = () => {
      interactives().forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
    const detach = () => {
      interactives().forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };

    attach();
    const observer = new MutationObserver(() => {
      detach();
      attach();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      detach();
      observer.disconnect();
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [
    enabled,
    isDesktop,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    onMouseEnterInteractive,
    onMouseLeaveInteractive,
    onMouseLeaveWindow,
    onMouseEnterWindow,
  ]);

  /* ---- Conditional rendering -------------------------------------------- */
  if (!enabled || !isDesktop) return null;

  const ringScale = state === "hover" ? 1.6 : state === "click" ? 0.8 : 1;
  const dotScale = state === "click" ? 0.6 : 1;

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      {/* Dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          width: dotSize * 2,
          height: dotSize * 2,
          marginLeft: -dotSize,
          marginTop: -dotSize,
          borderRadius: "50%",
          backgroundColor: color,
          opacity: visible ? 1 : 0,
          scale: dotScale,
        }}
        transition={{ scale: { duration: 0.15 } }}
      />

      {/* Ring follower */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderRadius: "50%",
          border: `1.5px solid ${color}`,
          opacity: visible ? (state === "hover" ? 0.6 : 0.35) : 0,
          scale: ringScale,
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
      />
    </div>
  );
}
