"use client";

import {
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { clsx } from "clsx";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  /** Whether the modal is visible */
  open: boolean;
  /** Called when the modal should close */
  onClose: () => void;
  /** Modal title (rendered in header) */
  title?: string;
  /** Close when clicking the backdrop */
  closeOnBackdrop?: boolean;
  /** Width preset */
  size?: ModalSize;
  /** Extra class names on the content panel */
  className?: string;
  children: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*  Sizes                                                                      */
/* -------------------------------------------------------------------------- */

const sizeMap: Record<ModalSize, React.CSSProperties> = {
  sm: { maxWidth: 400, width: "90vw" },
  md: { maxWidth: 560, width: "90vw" },
  lg: { maxWidth: 720, width: "92vw" },
  xl: { maxWidth: 960, width: "94vw" },
  full: { maxWidth: "none", width: "96vw", height: "92vh" },
};

/* -------------------------------------------------------------------------- */
/*  Animation                                                                  */
/* -------------------------------------------------------------------------- */

const EASE = [0.4, 0, 0.2, 1] as const;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: EASE } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    transition: { duration: 0.15, ease: EASE },
  },
};

/* -------------------------------------------------------------------------- */
/*  Focus-trap helpers                                                         */
/* -------------------------------------------------------------------------- */

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

function trapFocus(e: KeyboardEvent<HTMLDivElement>, container: HTMLDivElement) {
  if (e.key !== "Tab") return;
  const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

/** Accessible overlay modal with backdrop blur, focus trap, and Framer Motion animations. */
export default function Modal({
  open,
  onClose,
  title,
  closeOnBackdrop = true,
  size = "md",
  className,
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  /* ---- scroll lock + restore focus -------------------------------------- */
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      // focus first focusable or the panel itself
      requestAnimationFrame(() => {
        const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
        (first ?? panelRef.current)?.focus();
      });
    } else {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* ---- esc key ---------------------------------------------------------- */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") { onClose(); return; }
      if (panelRef.current) trapFocus(e, panelRef.current);
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={closeOnBackdrop ? onClose : undefined}
          onKeyDown={handleKeyDown}
          className="fixed inset-0 flex items-center justify-center"
          style={{
            zIndex: 500,
            backgroundColor: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            padding: "var(--space-4)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label={title ?? "Modal"}
        >
          <motion.div
            key="modal-panel"
            ref={panelRef}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className={clsx("relative flex flex-col outline-none", className)}
            style={{
              ...sizeMap[size],
              maxHeight: size === "full" ? undefined : "85vh",
              background: "var(--glass-bg-heavy)",
              backdropFilter: "blur(var(--glass-blur-lg))",
              WebkitBackdropFilter: "blur(var(--glass-blur-lg))",
              border: "1px solid var(--glass-border)",
              borderRadius: "var(--radius-2xl)",
              boxShadow: "var(--glass-shadow-lg)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            {(title || true) && (
              <div
                className="flex items-center justify-between flex-shrink-0"
                style={{
                  padding: "var(--space-5) var(--space-6)",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                {title && (
                  <h2
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-lg)",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    {title}
                  </h2>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="flex items-center justify-center rounded-lg cursor-pointer"
                  style={{
                    marginLeft: "auto",
                    width: 32,
                    height: 32,
                    background: "transparent",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-secondary)",
                    transition:
                      "color var(--duration-fast) var(--ease-smooth), background-color var(--duration-fast) var(--ease-smooth)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-surface)";
                    e.currentTarget.style.color = "var(--color-text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Scrollable body */}
            <div
              className="flex-1 overflow-y-auto"
              style={{ padding: "var(--space-6)" }}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
