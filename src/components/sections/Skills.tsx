"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Atom,
  Globe,
  FileCode2,
  Braces,
  Code2,
  Paintbrush,
  Wind,
  Hexagon,
  Server,
  Route,
  Terminal,
  LayoutGrid,
  Share2,
  Webhook,
  Database,
  Zap,
  Layers,
  GitBranch,
  Container,
  Cloud,
  RefreshCw,
  Triangle,
  Code,
  Palette,
  Smartphone,
  Sparkles,
  Eye,
  type LucideIcon,
} from "lucide-react";
import {
  skills,
  SKILL_CATEGORIES,
  type Skill,
  type SkillCategory,
} from "@/data/skills";
import { FloatingShapes } from "@/components/effects";

/* ========================================================================== */
/*  Icon mapping                                                               */
/* ========================================================================== */

const ICON_MAP: Record<string, LucideIcon> = {
  atom: Atom,
  globe: Globe,
  "file-code-2": FileCode2,
  braces: Braces,
  "code-2": Code2,
  paintbrush: Paintbrush,
  wind: Wind,
  hexagon: Hexagon,
  server: Server,
  route: Route,
  terminal: Terminal,
  "layout-grid": LayoutGrid,
  "share-2": Share2,
  webhook: Webhook,
  database: Database,
  zap: Zap,
  layers: Layers,
  "git-branch": GitBranch,
  container: Container,
  cloud: Cloud,
  "refresh-cw": RefreshCw,
  triangle: Triangle,
  code: Code,
  figma: Palette, // lucide doesn't have a real figma icon
  palette: Palette,
  smartphone: Smartphone,
  sparkles: Sparkles,
  eye: Eye,
};

function getIcon(key: string): LucideIcon {
  return ICON_MAP[key] ?? Code2;
}

/* ========================================================================== */
/*  Animation variants                                                         */
/* ========================================================================== */

const EASE = [0.4, 0, 0.2, 1] as const;

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
};

/* ========================================================================== */
/*  Sub-components                                                             */
/* ========================================================================== */

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="flex flex-col items-center text-center"
      style={{ marginBottom: "var(--space-12)" }}
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
        My Skills
      </span>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--text-3xl), 5vw, var(--text-5xl))",
          fontWeight: 800,
          color: "var(--color-text-primary)",
          margin: 0,
          lineHeight: "var(--leading-tight)",
        }}
      >
        Technologies I Work With
      </h2>
      <motion.div
        style={{
          height: 4,
          borderRadius: 2,
          background: "var(--gradient-primary)",
          marginTop: "var(--space-4)",
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: 64, opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
      />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

function CategoryTabs({
  active,
  onChange,
}: {
  active: SkillCategory | "all";
  onChange: (key: SkillCategory | "all") => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-center gap-2 overflow-x-auto pb-2 justify-center"
      style={{
        marginBottom: "var(--space-10)",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <motion.button
        onClick={() => onChange("all")}
        className="flex-shrink-0 rounded-xl cursor-pointer"
        style={{
          padding: "var(--space-2) var(--space-5)",
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-sm)",
          fontWeight: 600,
          border: "1px solid",
          borderColor: active === "all" ? "var(--color-primary)" : "var(--color-border)",
          background: active === "all" ? "var(--color-primary)" : "transparent",
          color: active === "all" ? "#fff" : "var(--color-text-secondary)",
          transition: "all var(--duration-base) var(--ease-smooth)",
          whiteSpace: "nowrap",
        }}
        whileHover={
          active === "all"
            ? undefined
            : { borderColor: "var(--color-primary)", color: "var(--color-primary)" }
        }
        whileTap={{ scale: 0.96 }}
      >
        All
      </motion.button>
      {SKILL_CATEGORIES.map((cat) => {
        const isActive = active === cat.key;
        return (
          <motion.button
            key={cat.key}
            onClick={() => onChange(cat.key)}
            className="flex-shrink-0 rounded-xl cursor-pointer"
            style={{
              padding: "var(--space-2) var(--space-5)",
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              border: "1px solid",
              borderColor: isActive ? "var(--color-primary)" : "var(--color-border)",
              background: isActive ? "var(--color-primary)" : "transparent",
              color: isActive ? "#fff" : "var(--color-text-secondary)",
              transition: "all var(--duration-base) var(--ease-smooth)",
              whiteSpace: "nowrap",
            }}
            whileHover={
              isActive
                ? undefined
                : { borderColor: "var(--color-primary)", color: "var(--color-primary)" }
            }
            whileTap={{ scale: 0.96 }}
          >
            {cat.label}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

function ProficiencyBar({ value, inView }: { value: number; inView: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        height: 6,
        borderRadius: 3,
        background: "var(--color-border)",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          height: "100%",
          borderRadius: 3,
          background: "var(--gradient-primary)",
        }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function SkillCard({ skill, inView }: { skill: Skill; inView: boolean }) {
  const Icon = getIcon(skill.icon);

  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col items-center gap-3 rounded-2xl"
      style={{
        padding: "var(--space-6) var(--space-4)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        transition:
          "transform var(--duration-slow) var(--ease-smooth), box-shadow var(--duration-slow) var(--ease-smooth), border-color var(--duration-slow) var(--ease-smooth)",
      }}
      whileHover={{
        y: -6,
        boxShadow: "var(--glass-shadow-lg)",
        borderColor: "var(--color-primary)",
      }}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center rounded-xl"
        style={{
          width: 56,
          height: 56,
          background: "var(--color-primary-light)",
          color: "var(--color-primary)",
        }}
      >
        <Icon size={28} />
      </div>

      {/* Name */}
      <span
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-sm)",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          textAlign: "center",
        }}
      >
        {skill.name}
      </span>

      {/* Proficiency */}
      <div style={{ width: "100%" }}>
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "var(--space-1)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-tertiary)",
            }}
          >
            Proficiency
          </span>
          <motion.span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              color: "var(--color-primary)",
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            {skill.proficiency}%
          </motion.span>
        </div>
        <ProficiencyBar value={skill.proficiency} inView={inView} />
      </div>
    </motion.div>
  );
}

/* ========================================================================== */
/*  Main Skills component                                                      */
/* ========================================================================== */

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "all">("all");

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? skills
        : skills.filter((s) => s.category === activeCategory),
    [activeCategory],
  );

  const handleChange = useCallback((key: SkillCategory | "all") => {
    setActiveCategory(key);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative"
      style={{ padding: "var(--space-24) var(--space-6)" }}
    >
      {/* Background decoration */}
      <FloatingShapes count={5} className="opacity-50" />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative mx-auto"
        style={{ maxWidth: "var(--container-xl)" }}
      >
        <SectionHeader />
        <CategoryTabs active={activeCategory} onChange={handleChange} />

        {/* ── Skill cards grid ──────────────────────────────────── */}
        <motion.div
          layout
          className="grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 180px), 1fr))",
          }}
        >
          {filtered.map((skill) => (
            <SkillCard key={skill.id} skill={skill} inView={inView} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
