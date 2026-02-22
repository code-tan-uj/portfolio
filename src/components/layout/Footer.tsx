"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const SOCIALS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/code-tan-uj",
    icon: <Github size={20} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tps2000",
    icon: <Linkedin size={20} />,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/tanujsansare",
    icon: <Twitter size={20} />,
  },
  {
    label: "Email",
    href: "mailto:tanuj.sansare2000@gmail.com",
    icon: <Mail size={20} />,
  },
];

/* -------------------------------------------------------------------------- */
/*  Animation variants                                                         */
/* -------------------------------------------------------------------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative"
      style={{
        borderTop: "1px solid var(--glass-border)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto flex flex-col items-center gap-6 px-6 py-12"
        style={{ maxWidth: "var(--container-xl)" }}
      >
        {/* Social icons */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3"
        >
          {SOCIALS.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex items-center justify-center rounded-xl"
              style={{
                width: 44,
                height: 44,
                color: "var(--color-text-secondary)",
                border: "1px solid var(--color-border)",
                background: "transparent",
                textDecoration: "none",
                transition:
                  "color var(--duration-base) var(--ease-smooth), border-color var(--duration-base) var(--ease-smooth), background-color var(--duration-base) var(--ease-smooth)",
              }}
              whileHover={{
                scale: 1.1,
                y: -3,
                backgroundColor: "var(--color-primary-light)",
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)",
              }}
              whileTap={{ scale: 0.92 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          style={{
            width: 48,
            height: 2,
            borderRadius: 1,
            background: "var(--gradient-primary)",
          }}
        />

        {/* Copy + built-with */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-2 text-center"
        >
          <p
            style={{
              margin: 0,
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-primary)",
            }}
          >
            &copy; {year} Tanuj Sansare. All rights reserved.
          </p>
          <p
            className="flex items-center gap-1"
            style={{
              margin: 0,
              fontSize: "var(--text-xs)",
              color: "var(--color-text-tertiary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Built with Next.js &amp; Framer Motion
            <Heart
              size={12}
              style={{ color: "var(--color-accent)" }}
              fill="var(--color-accent)"
            />
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
