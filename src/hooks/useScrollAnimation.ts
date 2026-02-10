"use client";

import { useState, useEffect, useRef } from "react";

export interface UseScrollAnimationOptions {
  /** Proportion of the element that must be visible (0–1). Default 0.15 */
  threshold?: number;
  /** IntersectionObserver rootMargin. Default "0px" */
  rootMargin?: string;
  /** Fire only once, then disconnect. Default true */
  once?: boolean;
}

/**
 * Detects when the referenced element enters the viewport.
 *
 * @returns `[ref, isInView]` — attach `ref` to your element.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = "0px",
  once = true,
}: UseScrollAnimationOptions = {}): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isInView];
}
