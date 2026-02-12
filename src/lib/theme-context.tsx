"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const STORAGE_KEY = "portfolio-theme";

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

function getSystemPreference(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Theme store with subscription pattern for useSyncExternalStore
let currentTheme: Theme = "light";
const listeners = new Set<() => void>();

function getSnapshot(): Theme {
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "light"; // Always light on server for consistency
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setThemeInternal(newTheme: Theme) {
  currentTheme = newTheme;
  listeners.forEach((listener) => listener());
}

// Custom hook to track mounted state
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mounted = useMounted();
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Initialize theme on mount (client-side only)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initialTheme: Theme = 
      stored === "light" || stored === "dark" 
        ? stored 
        : getSystemPreference();
    
    setThemeInternal(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  // Apply data-theme attribute and persist on theme change (after mount)
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  // Listen for OS-level theme changes (when no stored preference)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setThemeInternal(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeInternal(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeInternal(currentTheme === "light" ? "dark" : "light");
  }, []);

  // Always provide context so consumers work during SSR.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}
