/* ========================================================================== */
/*  Skill data — swap for CMS later                                            */
/* ========================================================================== */

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "tools"
  | "design";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  /** 0-100 proficiency rating */
  proficiency: number;
  /** Lucide icon key — mapped in the component */
  icon: string;
  description?: string;
}

export const SKILL_CATEGORIES: { key: SkillCategory; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "tools", label: "Tools & DevOps" },
  { key: "design", label: "Design" },
];

export const skills: Skill[] = [
  /* ── Frontend ────────────────────────────────────────────────────────────── */
  { id: "react", name: "React", category: "frontend", proficiency: 92, icon: "atom" },
  { id: "nextjs", name: "Next.js", category: "frontend", proficiency: 88, icon: "globe" },
  { id: "typescript", name: "TypeScript", category: "frontend", proficiency: 85, icon: "file-code-2" },
  { id: "javascript", name: "JavaScript", category: "frontend", proficiency: 95, icon: "braces" },
  { id: "html", name: "HTML5", category: "frontend", proficiency: 95, icon: "code-2" },
  { id: "css", name: "CSS3", category: "frontend", proficiency: 90, icon: "paintbrush" },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", proficiency: 90, icon: "wind" },
  { id: "vue", name: "Vue.js", category: "frontend", proficiency: 70, icon: "hexagon" },

  /* ── Backend ─────────────────────────────────────────────────────────────── */
  { id: "nodejs", name: "Node.js", category: "backend", proficiency: 88, icon: "server" },
  { id: "express", name: "Express", category: "backend", proficiency: 85, icon: "route" },
  { id: "python", name: "Python", category: "backend", proficiency: 78, icon: "terminal" },
  { id: "django", name: "Django", category: "backend", proficiency: 65, icon: "layout-grid" },
  { id: "graphql", name: "GraphQL", category: "backend", proficiency: 72, icon: "share-2" },
  { id: "rest", name: "REST APIs", category: "backend", proficiency: 92, icon: "webhook" },

  /* ── Database ────────────────────────────────────────────────────────────── */
  { id: "mongodb", name: "MongoDB", category: "database", proficiency: 82, icon: "database" },
  { id: "postgresql", name: "PostgreSQL", category: "database", proficiency: 80, icon: "database" },
  { id: "mysql", name: "MySQL", category: "database", proficiency: 75, icon: "database" },
  { id: "redis", name: "Redis", category: "database", proficiency: 68, icon: "zap" },
  { id: "prisma", name: "Prisma", category: "database", proficiency: 78, icon: "layers" },

  /* ── Tools & DevOps ──────────────────────────────────────────────────────── */
  { id: "git", name: "Git", category: "tools", proficiency: 90, icon: "git-branch" },
  { id: "docker", name: "Docker", category: "tools", proficiency: 75, icon: "container" },
  { id: "aws", name: "AWS", category: "tools", proficiency: 70, icon: "cloud" },
  { id: "cicd", name: "CI/CD", category: "tools", proficiency: 78, icon: "refresh-cw" },
  { id: "vercel", name: "Vercel", category: "tools", proficiency: 85, icon: "triangle" },
  { id: "vscode", name: "VS Code", category: "tools", proficiency: 92, icon: "code" },

  /* ── Design ──────────────────────────────────────────────────────────────── */
  { id: "figma", name: "Figma", category: "design", proficiency: 80, icon: "figma" },
  { id: "uiux", name: "UI/UX Design", category: "design", proficiency: 82, icon: "palette" },
  { id: "responsive", name: "Responsive Design", category: "design", proficiency: 92, icon: "smartphone" },
  { id: "animation", name: "Animation", category: "design", proficiency: 78, icon: "sparkles" },
  { id: "accessibility", name: "Accessibility", category: "design", proficiency: 80, icon: "eye" },
];
