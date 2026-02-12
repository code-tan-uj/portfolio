"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowDown,
  FileDown,
} from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { Particles, MagneticButton, TextGradient } from "@/components/effects";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const ROLES = [
  "AI Engineer",
  "Full Stack Developer",
  "Generative AI Specialist",
  "ML Systems Architect",
];

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const SOCIALS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/code-tan-uj", icon: <Github size={20} /> },
  { label: "LinkedIn", href: "https://linkedin.com/in/tanuj-sansare", icon: <Linkedin size={20} /> },
  { label: "Twitter", href: "https://twitter.com", icon: <Twitter size={20} /> },
  { label: "Email", href: "mailto:tanujsansare@gmail.com", icon: <Mail size={20} /> },
];

/* -------------------------------------------------------------------------- */
/*  Framer Motion variants                                                     */
/* -------------------------------------------------------------------------- */

const EASE = [0.4, 0, 0.2, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp = (delay = 0) => ({
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE, delay },
  },
});

const fadeDown = (delay = 0) => ({
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: EASE, delay },
  },
});

const socialContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.8 },
  },
};

const socialItemVariants = {
  hidden: { y: 16, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE },
  },
};

/* -------------------------------------------------------------------------- */
/*  Animated mesh background                                                   */
/* -------------------------------------------------------------------------- */

function MeshBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Orb 1 — indigo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          maxWidth: 600,
          maxHeight: 600,
          top: "5%",
          left: "10%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 2 — purple */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "35vw",
          height: "35vw",
          maxWidth: 500,
          maxHeight: 500,
          top: "30%",
          right: "5%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orb 3 — pink */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "30vw",
          height: "30vw",
          maxWidth: 450,
          maxHeight: 450,
          bottom: "10%",
          left: "25%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 25, -35, 0],
          y: [0, -25, 15, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.3,
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Typewriter display                                                         */
/* -------------------------------------------------------------------------- */

function TypewriterRole() {
  const { text } = useTypewriter({
    words: ROLES,
    typeSpeed: 70,
    deleteSpeed: 40,
    pauseDuration: 2200,
  });

  return (
    <span aria-label={`Role: ${text}`}>
      {text}
      <motion.span
        className="inline-block"
        style={{
          width: 3,
          height: "1.1em",
          marginLeft: 2,
          backgroundColor: "var(--color-accent)",
          borderRadius: 1,
          verticalAlign: "text-bottom",
        }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero component                                                             */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  const scrollTo = useCallback((href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <MeshBackground />
      <Particles count={60} speed={0.3} linkDistance={110} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex flex-col items-center text-center"
        style={{
          maxWidth: "var(--container-lg)",
          padding: "var(--space-24) var(--space-6) var(--space-16)",
        }}
      >
        {/* ── Greeting ─────────────────────────────────────────── */}
        <motion.p
          variants={fadeDown(0)}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-lg)",
            fontWeight: 500,
            color: "var(--color-accent)",
            margin: 0,
            marginBottom: "var(--space-4)",
          }}
        >
          Hello, I&apos;m
        </motion.p>

        {/* ── Name ─────────────────────────────────────────────── */}
        <motion.h1
          variants={fadeUp(0.1)}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "var(--tracking-tight)",
            margin: 0,
            marginBottom: "var(--space-6)",
            fontSize: "clamp(var(--text-5xl), 8vw, 5rem)",
          }}
        >
          <TextGradient speed="slow">Tanuj Sansare</TextGradient>
        </motion.h1>

        {/* ── Typewriter role ──────────────────────────────────── */}
        <motion.p
          variants={fadeUp(0.2)}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            color: "var(--color-text-secondary)",
            margin: 0,
            marginBottom: "var(--space-6)",
            fontSize: "clamp(var(--text-xl), 3.5vw, var(--text-3xl))",
            minHeight: "1.4em",
          }}
        >
          <TypewriterRole />
        </motion.p>

        {/* ── Description ──────────────────────────────────────── */}
        <motion.p
          variants={fadeUp(0.4)}
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-lg)",
            lineHeight: "var(--leading-relaxed)",
            color: "var(--color-text-secondary)",
            maxWidth: 600,
            margin: "0 auto",
            marginBottom: "var(--space-10)",
          }}
        >
          I build production-grade AI systems — from LLM agents and RAG pipelines
          to vision transformers. Passionate about turning cutting-edge ML research
          into scalable solutions that ship to millions.
        </motion.p>

        {/* ── CTA Buttons ──────────────────────────────────────── */}
        <motion.div
          variants={fadeUp(0.6)}
          className="flex flex-wrap items-center justify-center gap-4"
          style={{ marginBottom: "var(--space-12)" }}
        >
          {/* Primary — View My Work */}
          <MagneticButton strength={0.3}>
            <motion.button
              onClick={() => scrollTo("#projects")}
              className="flex items-center gap-2 rounded-xl cursor-pointer"
              style={{
                padding: "var(--space-3) var(--space-8)",
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-base)",
                fontWeight: 600,
                color: "#fff",
                background: "var(--gradient-primary)",
                border: "none",
                boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
                transition: "box-shadow var(--duration-base) var(--ease-smooth)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 30px rgba(99,102,241,0.45)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
              <ArrowDown size={16} />
            </motion.button>
          </MagneticButton>

          {/* Secondary — Contact Me */}
          <MagneticButton strength={0.25}>
            <motion.button
              onClick={() => scrollTo("#contact")}
              className="glass flex items-center gap-2 rounded-xl cursor-pointer"
              style={{
                padding: "var(--space-3) var(--space-8)",
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-base)",
                fontWeight: 600,
                color: "var(--color-primary)",
                background: "var(--glass-bg)",
                border: "1px solid var(--color-border)",
                transition:
                  "border-color var(--duration-base) var(--ease-smooth), box-shadow var(--duration-base) var(--ease-smooth)",
              }}
              whileHover={{
                scale: 1.05,
                borderColor: "var(--color-primary)",
                boxShadow: "0 4px 20px rgba(99,102,241,0.15)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
              <Mail size={16} />
            </motion.button>
          </MagneticButton>

          {/* Tertiary — Download CV */}
          <motion.a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 rounded-xl"
            style={{
              padding: "var(--space-3) var(--space-8)",
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-base)",
              fontWeight: 600,
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              border: "1px solid transparent",
              transition:
                "color var(--duration-base) var(--ease-smooth), border-color var(--duration-base) var(--ease-smooth)",
            }}
            whileHover={{
              scale: 1.05,
              color: "var(--color-primary)",
              borderColor: "var(--color-border)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Download CV
            <FileDown size={16} />
          </motion.a>
        </motion.div>

        {/* ── Social links ─────────────────────────────────────── */}
        <motion.div
          variants={socialContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3"
        >
          {SOCIALS.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              variants={socialItemVariants}
              className="flex items-center justify-center rounded-xl"
              style={{
                width: 44,
                height: 44,
                color: "var(--color-text-tertiary)",
                border: "1px solid var(--color-border)",
                textDecoration: "none",
                transition:
                  "color var(--duration-base) var(--ease-smooth), border-color var(--duration-base) var(--ease-smooth), background-color var(--duration-base) var(--ease-smooth)",
              }}
              whileHover={{
                scale: 1.15,
                y: -3,
                backgroundColor: "var(--color-primary-light)",
                borderColor: "var(--color-primary)",
                color: "var(--color-primary)",
              }}
              whileTap={{ scale: 0.9 }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* ── Scroll indicator ─────────────────────────────────── */}
        <motion.div
          className="absolute left-1/2 flex flex-col items-center"
          style={{
            bottom: "var(--space-8)",
            transform: "translateX(-50%)",
            color: "var(--color-text-tertiary)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              marginBottom: "var(--space-2)",
            }}
          >
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
