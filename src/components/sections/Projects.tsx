"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ExternalLink,
  Github,
  ChevronDown,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { ParallaxSection } from "@/components/animations";
import { GlowEffect } from "@/components/effects";

/* ========================================================================== */
/*  Types                                                                      */
/* ========================================================================== */

export type ProjectCategory = "ai" | "web" | "research" | "performance";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: ProjectCategory;
}

interface ProjectsProps {
  projects?: Project[];
}

/* ========================================================================== */
/*  Sample data — swap for CMS later                                           */
/* ========================================================================== */

const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "gen-ai-bannerization",
    title: "Gen AI Bannerization Platform",
    description:
      "Enterprise-scale AI system automating banner creation with multi-agent LLMs, Vision Transformer QC (98% accuracy), and distributed processing — generating 9,000+ production-ready banners daily.",
    image: "/projects/project-1.svg",
    tags: ["Vision Transformers", "LangGraph", "RabbitMQ", "Celery", "FastAPI"],
    category: "ai",
  },
  {
    id: "2",
    slug: "release-agent",
    title: "Release Agent — Autonomous DevOps",
    description:
      "Agentic AI system that automates software releases end-to-end — from changelog generation to compliance checks — boosting developer velocity by ~15%.",
    image: "/projects/project-2.svg",
    tags: ["LangGraph", "AutoGen", "GitHub API", "Python", "Redis"],
    category: "ai",
  },
  {
    id: "3",
    slug: "sentimeter-ai",
    title: "Sentimeter AI — Chat Intelligence",
    description:
      "Research initiative at Samsung transforming chat screenshots into actionable sentiment intelligence using OCR, speaker diarization, and fine-tuned RoBERTa (0.92+ F1-score).",
    image: "/projects/project-3.svg",
    tags: ["RoBERTa", "BERT", "OpenCV", "EasyOCR", "NLP"],
    category: "research",
  },
  {
    id: "4",
    slug: "chat-with-files",
    title: "Chat With Your Files — RAG System",
    description:
      "Production-grade RAG application enabling natural language queries over enterprise documents — built in 8 weeks from research to deployment at American Axle Manufacturing.",
    image: "/projects/project-4.svg",
    tags: ["LangChain", "FAISS", "Cohere", "Streamlit", "Python"],
    category: "ai",
  },
  {
    id: "5",
    slug: "kpi-portal",
    title: "KPI Portal — Analytics Dashboard",
    description:
      "Real-time executive dashboard consolidating multi-dimensional KPIs with AI-powered insights, supporting 2M+ concurrent users at Bajaj Finserv.",
    image: "/projects/project-5.svg",
    tags: ["React", "TypeScript", "Node.js", "Redis", "MongoDB"],
    category: "web",
  }
];

/* ========================================================================== */
/*  Filter config                                                              */
/* ========================================================================== */

interface FilterTab {
  key: "all" | ProjectCategory;
  label: string;
}

const FILTERS: FilterTab[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI/ML" },
  { key: "web", label: "Full Stack" },
  { key: "research", label: "Research" },
  { key: "performance", label: "Performance" },
];

/* ========================================================================== */
/*  Animation variants                                                         */
/* ========================================================================== */

const EASE = [0.4, 0, 0.2, 1] as const;

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const cardVariants = {
  hidden: { y: 40, opacity: 0, scale: 0.97 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
  exit: { y: -20, opacity: 0, scale: 0.97, transition: { duration: 0.25, ease: EASE } },
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
        My Work
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
        Featured Projects
      </h2>
      <p
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-lg)",
          color: "var(--color-text-secondary)",
          margin: 0,
          marginTop: "var(--space-3)",
          marginBottom: "var(--space-4)",
        }}
      >
        A selection of my recent work
      </p>
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

/* -------------------------------------------------------------------------- */

function FilterTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (key: string) => void;
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
      {FILTERS.map((f) => {
        const isActive = active === f.key;
        return (
          <motion.button
            key={f.key}
            onClick={() => onChange(f.key)}
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
              transition:
                "all var(--duration-base) var(--ease-smooth)",
              whiteSpace: "nowrap",
            }}
            whileHover={
              isActive
                ? undefined
                : {
                    borderColor: "var(--color-primary)",
                    color: "var(--color-primary)",
                  }
            }
            whileTap={{ scale: 0.96 }}
          >
            {f.label}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col overflow-hidden rounded-2xl group"
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
        transition:
          "transform var(--duration-slow) var(--ease-smooth), box-shadow var(--duration-slow) var(--ease-smooth), border-color var(--duration-slow) var(--ease-smooth)",
      }}
      whileHover={{
        y: -8,
        boxShadow: "var(--glass-shadow-lg)",
        borderColor: "var(--color-primary)",
      }}
    >
    <GlowEffect size={350} intensity={0.12} blendMode="soft-light">
      {/* ── Thumbnail ─────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Hover gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
          }}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live`}
              className="flex items-center justify-center rounded-full"
              style={{
                width: 44,
                height: 44,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                transition: "background var(--duration-fast) var(--ease-smooth)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
            >
              <ExternalLink size={18} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source on GitHub`}
              className="flex items-center justify-center rounded-full"
              style={{
                width: 44,
                height: 44,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                transition: "background var(--duration-fast) var(--ease-smooth)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
            >
              <Github size={18} />
            </a>
          )}
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div
        className="flex flex-col flex-1"
        style={{ padding: "var(--space-5) var(--space-5) var(--space-5)" }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-xl)",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-2)",
          }}
        >
          <Link
            href={`/projects/${project.slug}`}
            style={{
              color: "inherit",
              textDecoration: "none",
              transition: "color var(--duration-base) var(--ease-smooth)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "inherit"; }}
          >
            {project.title}
          </Link>
        </h3>

        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-sm)",
            lineHeight: 1.65,
            color: "var(--color-text-secondary)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginBottom: "var(--space-4)",
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {Array.isArray(project.tags) && project.tags.map((tag) => (
            <Badge key={tag} variant="default" shape="pill">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* ── Card footer actions ───────────────────────────────── */}
      <div
        className="flex items-center gap-3"
        style={{
          padding: "0 var(--space-5) var(--space-5)",
        }}
      >
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg"
            style={{
              padding: "var(--space-2) var(--space-4)",
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              color: "#fff",
              background: "var(--gradient-primary)",
              textDecoration: "none",
              transition: "opacity var(--duration-fast) var(--ease-smooth)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg"
            style={{
              padding: "var(--space-2) var(--space-4)",
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-xs)",
              fontWeight: 600,
              color: "var(--color-text-secondary)",
              background: "transparent",
              border: "1px solid var(--color-border)",
              textDecoration: "none",
              transition:
                "color var(--duration-fast) var(--ease-smooth), border-color var(--duration-fast) var(--ease-smooth)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-primary)";
              e.currentTarget.style.borderColor = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-secondary)";
              e.currentTarget.style.borderColor = "var(--color-border)";
            }}
          >
            <Github size={13} />
            Source
          </a>
        )}
      </div>
    </GlowEffect>
    </motion.article>
  );
}

/* ========================================================================== */
/*  Main Projects component                                                    */
/* ========================================================================== */

const INITIAL_COUNT = 6;
const LOAD_INCREMENT = 6;

export default function Projects({ projects: projectsProp }: ProjectsProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Use Hygraph data if available, otherwise fallback to sample data
  const allProjects = projectsProp || PROJECTS;

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? allProjects
        : allProjects.filter((p) => p.category === activeFilter),
    [activeFilter, allProjects],
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key);
    setVisibleCount(INITIAL_COUNT);
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{
        padding: "var(--space-24) var(--space-6)",
      }}
    >
      {/* Parallax section background */}
      <ParallaxSection
        speed={0.15}
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 0 }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: "var(--gradient-hero)",
            opacity: 0.4,
            height: "120%",
            top: "-10%",
          }}
        />
      </ParallaxSection>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative mx-auto"
        style={{ maxWidth: 1400 }}
      >
        <SectionHeader />
        <FilterTabs active={activeFilter} onChange={handleFilterChange} />

        {/* ── Project grid ─────────────────────────────────────── */}
        <motion.div
          layout
          className="grid gap-7"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
          }}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Load more ────────────────────────────────────────── */}
        {hasMore && (
          <motion.div
            variants={fadeUp}
            className="flex justify-center"
            style={{ marginTop: "var(--space-12)" }}
          >
            <motion.button
              onClick={() => setVisibleCount((c) => c + LOAD_INCREMENT)}
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
              Load More Projects
              <ChevronDown size={18} />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
