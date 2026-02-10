import fs from "fs";
import path from "path";
import matter from "gray-matter";

/* ========================================================================== */
/*  Types                                                                      */
/* ========================================================================== */

export interface PortfolioData {
  name: string;
  title: string;
  roles: string[];
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  availability: boolean;
  resumeUrl?: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  order: number;
  role?: string;
  duration?: string;
  team?: number;
  content: string;
}

/* ========================================================================== */
/*  Paths                                                                      */
/* ========================================================================== */

const CONTENT_DIR = path.join(process.cwd(), "content");
const PORTFOLIO_FILE = path.join(CONTENT_DIR, "portfolio.md");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");

/* ========================================================================== */
/*  Portfolio data                                                             */
/* ========================================================================== */

export async function getPortfolioData(): Promise<PortfolioData> {
  const raw = fs.readFileSync(PORTFOLIO_FILE, "utf-8");
  const { data } = matter(raw);

  return {
    name: data.name ?? "Tanuj Sansare",
    title: data.title ?? "Full Stack Developer",
    roles: data.roles ?? [],
    bio: data.bio ?? "",
    email: data.email ?? "",
    phone: data.phone,
    location: data.location,
    social: data.social ?? {},
    availability: data.availability ?? true,
    resumeUrl: data.resumeUrl,
  };
}

/* ========================================================================== */
/*  Projects                                                                   */
/* ========================================================================== */

export async function getAllProjects(): Promise<ProjectData[]> {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"));

  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    const slug = data.slug ?? file.replace(/\.md$/, "");

    return {
      slug,
      title: data.title ?? "",
      description: data.description ?? "",
      category: data.category ?? "web",
      tags: data.tags ?? [],
      featured: data.featured ?? false,
      thumbnail: data.thumbnail ?? "",
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl,
      order: data.order ?? 99,
      role: data.role,
      duration: data.duration,
      team: data.team,
      content,
    } satisfies ProjectData;
  });

  return projects.sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectData | null> {
  const projects = await getAllProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getProjectSlugs(): Promise<string[]> {
  const projects = await getAllProjects();
  return projects.map((p) => p.slug);
}
