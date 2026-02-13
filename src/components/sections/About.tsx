"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  FolderGit2,
  Cpu,
  Coffee,
  FileDown,
  ArrowRight,
} from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import Badge from "@/components/ui/Badge";
import { ParallaxSection } from "@/components/animations";
import { FloatingShapes } from "@/components/effects";

/* ========================================================================== */
/*  Types & Props                                                              */
/* ========================================================================== */

interface Portfolio {
  name: string;
  title: string;
  bio: string;
  email: string;
}

interface AboutProps {
  portfolio?: Portfolio;
}

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: ReactNode;
}

/* ========================================================================== */
/*  Data — fallback if no CMS data provided                                   */
/* ========================================================================== */

const STATS: Stat[] = [
  { label: "Years Experience", value: 4, suffix: "+", icon: <Briefcase size={20} /> },
  { label: "Projects Completed", value: 30, suffix: "+", icon: <FolderGit2 size={20} /> },
  { label: "Technologies", value: 20, suffix: "+", icon: <Cpu size={20} /> },
  { label: "Coffee Consumed", value: 3, suffix: "k cups", icon: <Coffee size={20} /> },
];

const DEFAULT_BIO = [
  "I'm a passionate full-stack developer and designer who thrives at the intersection of creativity and engineering. With a strong foundation in modern web technologies, I build performant, accessible, and visually stunning digital experiences.",
  "My journey into tech started with a curiosity about how things work on the internet. That curiosity evolved into a career where I've had the privilege of working on products used by thousands of people — from interactive dashboards to real-time collaboration tools.",
  "When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or experimenting with creative coding and generative art. I believe great software is built where empathy meets craftsmanship.",
];

const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "Framer Motion",
  "PostgreSQL",
  "Prisma",
  "AWS",
  "Docker",
  "Figma",
  "UI/UX Design",
];

/* ========================================================================== */
/*  Animation variants                                                         */
/* ========================================================================== */

const EASE = [0.4, 0, 0.2, 1] as const;

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const fadeLeft = {
  hidden: { x: -30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const fadeRight = {
  hidden: { x: 30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const scaleIn = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const badgeContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const badgeItem = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: EASE } },
};

/* ========================================================================== */
/*  Sub-components                                                             */
/* ========================================================================== */

/** Animated counter that starts when scrolled into view. */
function StatCard({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useCountUp({ end: stat.value, duration: 2000, enabled: inView });

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      className="flex flex-col items-center gap-2 rounded-2xl"
      style={{
        padding: "var(--space-5) var(--space-4)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
      }}
    >
      <span style={{ color: "var(--color-primary)" }}>{stat.icon}</span>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-3xl)",
          fontWeight: 800,
          color: "var(--color-text-primary)",
          lineHeight: 1,
        }}
      >
        {count}{stat.suffix}
      </span>
      <span
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-xs)",
          fontWeight: 500,
          color: "var(--color-text-tertiary)",
          textAlign: "center",
        }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

/** Profile image with animated gradient border ring. */
function ProfileImage() {
  return (
    <motion.div
      variants={scaleIn}
      className="relative mx-auto"
      style={{ width: "fit-content" }}
      whileHover={{ scale: 1.03, rotate: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {/* Gradient glow ring */}
      <div
        className="absolute -inset-1 rounded-3xl"
        style={{
          background: "var(--gradient-accent)",
          opacity: 0.6,
          filter: "blur(12px)",
          animation: "glow-pulse 3s ease-in-out infinite alternate",
        }}
      />
      {/* Border ring */}
      <div
        className="absolute -inset-[3px] rounded-3xl"
        style={{ background: "var(--gradient-accent)" }}
      />
      {/* Image container */}
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          width: 320,
          height: 320,
          background: "var(--color-surface)",
        }}
      >
        <Image
          src="/profile/git-hub-profile-Picsart-BackgroundChanger.png"
          alt="Tanuj Sansare - AI Engineer"
          fill
          className="object-cover"
          sizes="320px"
          priority
        />
      </div>
    </motion.div>
  );
}

/* ========================================================================== */
/*  Section header (reusable pattern for future sections)                      */
/* ========================================================================== */

function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="flex flex-col items-center text-center"
      style={{ marginBottom: "var(--space-16)" }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-sm)",
          fontWeight: 600,
          color: "var(--color-accent)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wider)",
          marginBottom: "var(--space-3)",
        }}
      >
        {label}
      </span>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--text-3xl), 5vw, var(--text-5xl))",
          fontWeight: 800,
          color: "var(--color-text-primary)",
          margin: 0,
          marginBottom: "var(--space-4)",
          lineHeight: "var(--leading-tight)",
        }}
      >
        {title}
      </h2>
      {/* Animated gradient underline */}
      <motion.div
        style={{
          height: 4,
          borderRadius: 2,
          background: "var(--gradient-accent)",
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: 64, opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
      />
    </motion.div>
  );
}

/* ========================================================================== */
/*  Main About component                                                       */
/* ========================================================================== */

export default function About({ portfolio }: AboutProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Use Hygraph data if available, otherwise fallback to default
  const bioText = portfolio?.bio ? [portfolio.bio] : DEFAULT_BIO;

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative"
      style={{
        padding: "var(--space-24) var(--space-6)",
      }}
    >
      <FloatingShapes count={6} />

      {/* Parallax decorative orb */}
      <ParallaxSection
        speed={0.2}
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 0 }}
      >
        <div
          aria-hidden="true"
          className="absolute rounded-full"
          style={{
            width: "40vw",
            maxWidth: 500,
            height: "40vw",
            maxHeight: 500,
            right: "-10%",
            top: "10%",
            background: "radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)",
            opacity: 0.5,
            filter: "blur(40px)",
          }}
        />
      </ParallaxSection>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mx-auto"
        style={{ maxWidth: "var(--container-xl)" }}
      >
        <SectionHeader label="About Me" title="Who I Am" />

        {/* ── Two-column grid ──────────────────────────────────── */}
        <div
          className="grid gap-12 lg:gap-16 items-start"
          style={{
            gridTemplateColumns: "1fr",
          }}
        >
          {/* Use CSS media-query approach via responsive class */}
          <div className="grid gap-12 lg:gap-16 about-grid">
            {/* ── Left column — image + stats ─────────────────── */}
            <motion.div variants={fadeLeft} className="flex flex-col gap-10">
              <ProfileImage />

              {/* Stat cards */}
              <div
                className="grid grid-cols-2 gap-4"
                style={{ maxWidth: 400, margin: "0 auto", width: "100%" }}
              >
                {STATS.map((stat) => (
                  <StatCard key={stat.label} stat={stat} />
                ))}
              </div>
            </motion.div>

            {/* ── Right column — bio + skills + CTAs ──────────── */}
            <motion.div variants={fadeRight} className="flex flex-col gap-8">
              {/* Bio */}
              <div className="flex flex-col gap-5">
                {bioText.map((paragraph, i) => (
                  <motion.p
                    key={i}
                    variants={fadeUp}
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-primary)",
                      fontSize: "var(--text-lg)",
                      lineHeight: 1.75,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Skills badges */}
              <motion.div variants={badgeContainer} className="flex flex-col gap-3">
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-wide)",
                  }}
                >
                  Core Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <motion.span key={skill} variants={badgeItem}>
                      <Badge variant="default" shape="pill">
                        {skill}
                      </Badge>
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-4"
                style={{ paddingTop: "var(--space-2)" }}
              >
                <motion.a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-xl"
                  style={{
                    padding: "var(--space-3) var(--space-8)",
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-base)",
                    fontWeight: 600,
                    color: "#fff",
                    background: "var(--gradient-primary)",
                    border: "none",
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
                    transition: "box-shadow var(--duration-base) var(--ease-smooth)",
                  }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 8px 30px rgba(99,102,241,0.45)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FileDown size={18} />
                  Download Resume
                </motion.a>

                <motion.button
                  onClick={() => scrollTo("#projects")}
                  className="inline-flex items-center gap-2 rounded-xl cursor-pointer"
                  style={{
                    padding: "var(--space-3) var(--space-8)",
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-base)",
                    fontWeight: 600,
                    color: "var(--color-primary)",
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(var(--glass-blur))",
                    WebkitBackdropFilter: "blur(var(--glass-blur))",
                    border: "1px solid var(--color-border)",
                    transition:
                      "border-color var(--duration-base) var(--ease-smooth), box-shadow var(--duration-base) var(--ease-smooth)",
                  }}
                  whileHover={{
                    scale: 1.04,
                    borderColor: "var(--color-primary)",
                    boxShadow: "0 4px 20px rgba(99,102,241,0.12)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Projects
                  <ArrowRight size={18} />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
