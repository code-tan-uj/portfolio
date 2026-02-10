"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Calendar,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import {
  experiences,
  EXPERIENCE_FILTERS,
  type Experience,
  type ExperienceType,
} from "@/data/experience";

/* ========================================================================== */
/*  Animation variants                                                         */
/* ========================================================================== */

const EASE = [0.4, 0, 0.2, 1] as const;

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: EASE },
  },
};

const cardLeft = {
  hidden: { x: -40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

const cardRight = {
  hidden: { x: 40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

const nodeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] as const },
  },
};

/* ========================================================================== */
/*  Helpers                                                                    */
/* ========================================================================== */

function getTypeIcon(type: ExperienceType) {
  switch (type) {
    case "work":
      return Briefcase;
    case "education":
      return GraduationCap;
    case "certification":
      return Award;
  }
}

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
      style={{ marginBottom: "var(--space-6)" }}
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
        Journey
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
        My Experience
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
        Professional background and education
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
        marginBottom: "var(--space-12)",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {EXPERIENCE_FILTERS.map((f) => {
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
            {f.label}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

function TimelineNode({ type, isCurrent }: { type: ExperienceType; isCurrent: boolean }) {
  const Icon = getTypeIcon(type);

  return (
    <motion.div
      variants={nodeVariants}
      className="relative z-10 flex items-center justify-center rounded-full"
      style={{
        width: 44,
        height: 44,
        background: isCurrent ? "var(--gradient-primary)" : "var(--color-surface-elevated)",
        border: isCurrent ? "none" : "2px solid var(--color-primary)",
        color: isCurrent ? "#fff" : "var(--color-primary)",
        flexShrink: 0,
      }}
    >
      <Icon size={18} />
      {isCurrent && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: "2px solid var(--color-primary)",
            opacity: 0.4,
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

function TimelineCard({
  exp,
  side,
}: {
  exp: Experience;
  side: "left" | "right";
}) {
  const isCurrent = exp.endDate === "Present";

  return (
    <motion.div
      variants={side === "left" ? cardLeft : cardRight}
      className="rounded-2xl"
      style={{
        padding: "var(--space-6)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
        border: `1px solid ${isCurrent ? "var(--color-primary)" : "var(--glass-border)"}`,
        boxShadow: isCurrent
          ? "0 8px 32px rgba(99,102,241,0.15)"
          : "var(--glass-shadow)",
        transition:
          "box-shadow var(--duration-slow) var(--ease-smooth), border-color var(--duration-slow) var(--ease-smooth)",
      }}
    >
      {/* Date range + Current badge */}
      <div
        className="flex items-center gap-2 flex-wrap"
        style={{ marginBottom: "var(--space-3)" }}
      >
        <div
          className="flex items-center gap-1.5"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--color-primary)",
            fontWeight: 600,
          }}
        >
          <Calendar size={13} />
          {exp.startDate} — {exp.endDate ?? "Present"}
        </div>
        {isCurrent && (
          <Badge variant="success" shape="pill">
            Current
          </Badge>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-xl)",
          fontWeight: 700,
          color: "var(--color-text-primary)",
          marginBottom: "var(--space-1)",
        }}
      >
        {exp.title}
      </h3>

      {/* Organization + Location */}
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-base)",
          color: "var(--color-text-secondary)",
          marginBottom: "var(--space-1)",
        }}
      >
        {exp.organization}
      </p>
      {exp.location && (
        <p
          className="flex items-center gap-1"
          style={{
            margin: 0,
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-sm)",
            color: "var(--color-text-tertiary)",
            marginBottom: "var(--space-3)",
          }}
        >
          <MapPin size={13} />
          {exp.location}
        </p>
      )}

      {/* Description */}
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-sm)",
          lineHeight: "var(--leading-relaxed)",
          color: "var(--color-text-secondary)",
          marginBottom: exp.highlights?.length ? "var(--space-3)" : "var(--space-4)",
        }}
      >
        {exp.description}
      </p>

      {/* Highlights */}
      {exp.highlights && exp.highlights.length > 0 && (
        <ul
          style={{
            margin: 0,
            padding: 0,
            paddingLeft: "var(--space-4)",
            listStyleType: "disc",
            marginBottom: "var(--space-4)",
          }}
        >
          {exp.highlights.map((h, i) => (
            <li
              key={i}
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-sm)",
                lineHeight: "var(--leading-relaxed)",
                color: "var(--color-text-secondary)",
                marginBottom: "var(--space-1)",
              }}
            >
              {h}
            </li>
          ))}
        </ul>
      )}

      {/* Skills */}
      {exp.skills && exp.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {exp.skills.map((s) => (
            <Badge key={s} variant="default" shape="pill">
              {s}
            </Badge>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ========================================================================== */
/*  Main Experience component                                                  */
/* ========================================================================== */

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.05 });
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? experiences
        : experiences.filter((e) => e.type === activeFilter),
    [activeFilter],
  );

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative"
      style={{ padding: "var(--space-24) var(--space-6)" }}
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative mx-auto"
        style={{ maxWidth: 1200 }}
      >
        <SectionHeader />
        <FilterTabs active={activeFilter} onChange={handleFilterChange} />

        {/* ── Timeline ─────────────────────────────────────────── */}
        <div className="relative">
          {/* Central line — desktop only */}
          <motion.div
            variants={lineVariants}
            className="hidden lg:block absolute left-1/2"
            style={{
              width: 3,
              top: 0,
              bottom: 0,
              marginLeft: -1.5,
              background: "var(--gradient-primary)",
              borderRadius: 2,
              transformOrigin: "top",
            }}
          />

          {/* Left line — mobile only */}
          <motion.div
            variants={lineVariants}
            className="block lg:hidden absolute"
            style={{
              width: 3,
              top: 0,
              bottom: 0,
              left: 20,
              background: "var(--gradient-primary)",
              borderRadius: 2,
              transformOrigin: "top",
            }}
          />

          {/* Entries */}
          <div className="flex flex-col gap-10">
            {filtered.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const isCurrent = exp.endDate === "Present";

              return (
                <motion.div
                  key={exp.id}
                  variants={fadeUp}
                  className="relative"
                >
                  {/* ── Desktop layout (alternating) ──────────────── */}
                  <div className="hidden lg:grid" style={{ gridTemplateColumns: "1fr 44px 1fr", gap: "var(--space-6)", alignItems: "start" }}>
                    {/* Left slot */}
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      {isLeft ? (
                        <div style={{ maxWidth: 500, width: "100%" }}>
                          <TimelineCard exp={exp} side="left" />
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Node */}
                    <div className="flex justify-center" style={{ paddingTop: "var(--space-6)" }}>
                      <TimelineNode type={exp.type} isCurrent={isCurrent} />
                    </div>

                    {/* Right slot */}
                    <div>
                      {!isLeft ? (
                        <div style={{ maxWidth: 500, width: "100%" }}>
                          <TimelineCard exp={exp} side="right" />
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>

                  {/* ── Mobile layout (all left-aligned) ─────────── */}
                  <div className="flex lg:hidden items-start gap-4">
                    <div className="flex-shrink-0" style={{ marginLeft: -1 }}>
                      <TimelineNode type={exp.type} isCurrent={isCurrent} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <TimelineCard exp={exp} side="right" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
