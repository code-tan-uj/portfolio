"use client";

import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  /** Target number to count to */
  end: number;
  /** Starting number (default 0) */
  start?: number;
  /** Duration in ms (default 2000) */
  duration?: number;
  /** Only start when triggered (default false → starts immediately) */
  enabled?: boolean;
}

/**
 * Animates a number from `start` to `end` over `duration` ms using
 * requestAnimationFrame for smooth 60 fps output.
 */
export function useCountUp({
  end,
  start = 0,
  duration = 2000,
  enabled = true,
}: UseCountUpOptions): number {
  const [value, setValue] = useState(start);
  const rafRef = useRef<number>(undefined);

  useEffect(() => {
    if (!enabled) {
      setValue(start);
      return;
    }

    const startTime = performance.now();
    const delta = end - start;

    function frame(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(Math.round(start + delta * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      }
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [start, end, duration, enabled]);

  return value;
}
