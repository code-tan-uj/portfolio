"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Clock,
  Users,
  User,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import type { ProjectData } from "@/lib/content";

/* ========================================================================== */
/*  Types                                                                      */
/* ========================================================================== */

interface ProjectDetailProps {
  project: ProjectData;
  contentHtml: string;
  relatedProjects: ProjectData[];
}

/* ========================================================================== */
/*  Animation variants                                                         */
/* ========================================================================== */

const EASE = [0.4, 0, 0.2, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE, delay },
  },
});

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

/* ========================================================================== */
/*  Sub-components                                                             */
/* ========================================================================== */

function ProjectHero({ project }: { project: ProjectData }) {
  return (
    <div className="relative overflow-hidden" style={{ minHeight: 360 }}>
      {/* Background image */}
      <Image
        src={project.thumbnail}
        alt={project.title}
        fill
        className="object-cover"
        priority
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, var(--color-bg) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 mx-auto flex flex-col justify-end"
        style={{
          maxWidth: "var(--container-lg)",
          padding: "var(--space-6)",
          paddingTop: "var(--space-24)",
          paddingBottom: "var(--space-10)",
        }}
      >
        <motion.div variants={fadeUp(0)} initial="hidden" animate="visible">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/#projects" },
              { label: project.title },
            ]}
          />
        </motion.div>

        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          animate="visible"
          style={{ marginTop: "var(--space-4)" }}
        >
          <Badge variant="info" shape="pill">
            {project.category}
          </Badge>
        </motion.div>

        <motion.h1
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(var(--text-3xl), 5vw, var(--text-5xl))",
            fontWeight: 800,
            color: "var(--color-text-primary)",
            margin: 0,
            marginTop: "var(--space-3)",
            lineHeight: "var(--leading-tight)",
          }}
        >
          {project.title}
        </motion.h1>

        <motion.p
          variants={fadeUp(0.3)}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-lg)",
            color: "var(--color-text-secondary)",
            margin: 0,
            marginTop: "var(--space-3)",
            maxWidth: 640,
          }}
        >
          {project.description}
        </motion.p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function InfoGrid({ project }: { project: ProjectData }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="grid gap-6"
      style={{ gridTemplateColumns: "1fr", marginBottom: "var(--space-10)" }}
    >
      <div
        className="project-info-grid grid gap-6 rounded-2xl"
        style={{
          padding: "var(--space-6)",
          background: "var(--glass-bg)",
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
          border: "1px solid var(--glass-border)",
        }}
      >
        {/* Details column */}
        <div className="flex flex-col gap-4">
          {project.role && (
            <motion.div variants={fadeUp()} className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                  flexShrink: 0,
                }}
              >
                <User size={16} />
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-tertiary)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-wide)",
                  }}
                >
                  Role
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-primary)",
                    fontWeight: 500,
                  }}
                >
                  {project.role}
                </p>
              </div>
            </motion.div>
          )}

          {project.duration && (
            <motion.div variants={fadeUp()} className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                  flexShrink: 0,
                }}
              >
                <Clock size={16} />
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-tertiary)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-wide)",
                  }}
                >
                  Duration
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-primary)",
                    fontWeight: 500,
                  }}
                >
                  {project.duration}
                </p>
              </div>
            </motion.div>
          )}

          {project.team && (
            <motion.div variants={fadeUp()} className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                  flexShrink: 0,
                }}
              >
                <Users size={16} />
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-tertiary)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-wide)",
                  }}
                >
                  Team Size
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-primary)",
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-primary)",
                    fontWeight: 500,
                  }}
                >
                  {project.team} {project.team === 1 ? "person" : "people"}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Links column */}
        <motion.div variants={fadeUp()} className="flex flex-col gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl"
              style={{
                padding: "var(--space-3) var(--space-6)",
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                color: "#fff",
                background: "var(--gradient-primary)",
                textDecoration: "none",
                transition: "opacity var(--duration-fast) var(--ease-smooth)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl"
              style={{
                padding: "var(--space-3) var(--space-6)",
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                background: "var(--glass-bg)",
                border: "1px solid var(--color-border)",
                textDecoration: "none",
                transition:
                  "border-color var(--duration-fast) var(--ease-smooth), color var(--duration-fast) var(--ease-smooth)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-primary)";
                e.currentTarget.style.color = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-text-primary)";
              }}
            >
              <Github size={16} />
              View Source
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

function TechStack({ tags }: { tags: string[] }) {
  return (
    <motion.div
      variants={fadeUp(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ marginBottom: "var(--space-10)" }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-2xl)",
          fontWeight: 700,
          color: "var(--color-text-primary)",
          margin: 0,
          marginBottom: "var(--space-4)",
        }}
      >
        Technologies Used
      </h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="info" shape="pill">
            {tag}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

function RelatedProjects({ projects }: { projects: ProjectData[] }) {
  if (projects.length === 0) return null;

  return (
    <motion.div
      variants={fadeUp(0.2)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        marginTop: "var(--space-16)",
        paddingTop: "var(--space-12)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-2xl)",
          fontWeight: 700,
          color: "var(--color-text-primary)",
          margin: 0,
          marginBottom: "var(--space-8)",
          textAlign: "center",
        }}
      >
        More Projects
      </h2>
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
        }}
      >
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group rounded-2xl overflow-hidden"
            style={{
              textDecoration: "none",
              background: "var(--glass-bg)",
              backdropFilter: "blur(var(--glass-blur))",
              WebkitBackdropFilter: "blur(var(--glass-blur))",
              border: "1px solid var(--glass-border)",
              transition:
                "transform var(--duration-slow) var(--ease-smooth), box-shadow var(--duration-slow) var(--ease-smooth), border-color var(--duration-slow) var(--ease-smooth)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "var(--glass-shadow-lg)";
              e.currentTarget.style.borderColor = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "var(--glass-border)";
            }}
          >
            <div className="relative" style={{ aspectRatio: "16/9" }}>
              <Image
                src={p.thumbnail}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div style={{ padding: "var(--space-4)" }}>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-lg)",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--space-1)",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-primary)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-secondary)",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {p.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

/* ========================================================================== */
/*  Main component                                                             */
/* ========================================================================== */

export default function ProjectDetail({
  project,
  contentHtml,
  relatedProjects,
}: ProjectDetailProps) {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="fixed z-20"
        style={{ top: 88, left: "var(--space-6)" }}
      >
        <Link
          href="/#projects"
          className="flex items-center gap-2 rounded-xl"
          style={{
            padding: "var(--space-2) var(--space-4)",
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            color: "var(--color-text-secondary)",
            background: "var(--glass-bg)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--color-border)",
            textDecoration: "none",
            transition: "all var(--duration-base) var(--ease-smooth)",
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
          <ArrowLeft size={16} />
          Projects
        </Link>
      </motion.div>

      {/* Hero */}
      <ProjectHero project={project} />

      {/* Content */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "var(--container-lg)",
          padding: "var(--space-10) var(--space-6) var(--space-24)",
        }}
      >
        <InfoGrid project={project} />
        <TechStack tags={project.tags} />

        {/* Rendered markdown */}
        <motion.div
          variants={fadeUp(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Related */}
        <RelatedProjects projects={relatedProjects} />
      </div>
    </div>
  );
}
