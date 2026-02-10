"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseTypewriterOptions {
  words: string[];
  /** ms per character when typing */
  typeSpeed?: number;
  /** ms per character when deleting */
  deleteSpeed?: number;
  /** ms to wait after a word is fully typed */
  pauseDuration?: number;
}

interface UseTypewriterReturn {
  /** The currently visible text slice */
  text: string;
  /** Index of the word currently being displayed */
  wordIndex: number;
  /** true while characters are being added */
  isTyping: boolean;
}

export function useTypewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 50,
  pauseDuration = 2000,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const currentWord = words[wordIndex] ?? "";

  const tick = useCallback(() => {
    if (!isDeleting) {
      // Typing forward
      if (charIndex < currentWord.length) {
        setCharIndex((c) => c + 1);
        timeoutRef.current = setTimeout(tick, typeSpeed);
      } else {
        // Word complete — pause, then start deleting
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
          timeoutRef.current = setTimeout(tick, deleteSpeed);
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        setCharIndex((c) => c - 1);
        timeoutRef.current = setTimeout(tick, deleteSpeed);
      } else {
        // Deleted — move to next word
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
        timeoutRef.current = setTimeout(tick, typeSpeed);
      }
    }
  }, [charIndex, currentWord.length, deleteSpeed, isDeleting, pauseDuration, typeSpeed, words.length]);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timeoutRef.current);
  }, [tick, typeSpeed]);

  return {
    text: currentWord.slice(0, charIndex),
    wordIndex,
    isTyping: !isDeleting,
  };
}
