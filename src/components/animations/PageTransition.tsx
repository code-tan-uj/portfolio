"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* ========================================================================== */
/*  Types                                                                      */
/* ========================================================================== */

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/* ========================================================================== */
/*  Animation variants                                                         */
/* ========================================================================== */

const variants = {
  hidden: { opacity: 0, y: 12 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  },
};

/* ========================================================================== */
/*  Component                                                                  */
/* ========================================================================== */

export default function PageTransition({
  children,
  className,
}: PageTransitionProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
