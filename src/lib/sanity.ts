/**
 * Sanity CMS Client
 * 
 * Provides client and helper functions for fetching content from Sanity.
 * Falls back to file-based content if Sanity is not configured.
 */

import { createClient, type SanityClient } from "@sanity/client";
import { config } from "@/config";
import type { PortfolioData, ProjectData } from "./content";

// =========================================
// Sanity Client
// =========================================

let _client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!config.sanity.enabled) {
    return null;
  }

  if (!_client) {
    _client = createClient({
      projectId: config.sanity.projectId,
      dataset: config.sanity.dataset,
      apiVersion: config.sanity.apiVersion,
      useCdn: config.sanity.useCdn,
      token: config.sanity.token,
    });
  }

  return _client;
}

// =========================================
// GROQ Queries
// =========================================

const QUERIES = {
  // Portfolio/Profile data
  portfolio: `*[_type == "portfolio"][0] {
    name,
    title,
    roles,
    bio,
    email,
    phone,
    location,
    social {
      github,
      linkedin,
      twitter
    },
    availability,
    "resumeUrl": resume.asset->url
  }`,

  // All projects
  allProjects: `*[_type == "project"] | order(order asc) {
    "slug": slug.current,
    title,
    description,
    category,
    tags,
    featured,
    "thumbnail": thumbnail.asset->url,
    liveUrl,
    githubUrl,
    order,
    role,
    duration,
    team,
    "content": coalesce(content, body)
  }`,

  // Single project by slug
  projectBySlug: `*[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    description,
    category,
    tags,
    featured,
    "thumbnail": thumbnail.asset->url,
    liveUrl,
    githubUrl,
    order,
    role,
    duration,
    team,
    "content": coalesce(content, body)
  }`,

  // Project slugs for static generation
  projectSlugs: `*[_type == "project"].slug.current`,
};

// =========================================
// Data Fetching Functions
// =========================================

/**
 * Get portfolio/profile data from Sanity
 */
export async function getSanityPortfolioData(): Promise<PortfolioData | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    const data = await client.fetch(QUERIES.portfolio);
    if (!data) return null;

    return {
      name: data.name || "",
      title: data.title || "",
      roles: data.roles || [],
      bio: data.bio || "",
      email: data.email || "",
      phone: data.phone,
      location: data.location,
      social: data.social || {},
      availability: data.availability ?? true,
      resumeUrl: data.resumeUrl,
    };
  } catch (error) {
    console.error("Error fetching portfolio from Sanity:", error);
    return null;
  }
}

/**
 * Get all projects from Sanity
 */
export async function getSanityProjects(): Promise<ProjectData[]> {
  const client = getSanityClient();
  if (!client) return [];

  try {
    const projects = await client.fetch(QUERIES.allProjects);
    return (projects || []).map(mapSanityProject);
  } catch (error) {
    console.error("Error fetching projects from Sanity:", error);
    return [];
  }
}

/**
 * Get single project by slug from Sanity
 */
export async function getSanityProjectBySlug(
  slug: string
): Promise<ProjectData | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    const project = await client.fetch(QUERIES.projectBySlug, { slug });
    if (!project) return null;
    return mapSanityProject(project);
  } catch (error) {
    console.error("Error fetching project from Sanity:", error);
    return null;
  }
}

/**
 * Get all project slugs for static generation
 */
export async function getSanityProjectSlugs(): Promise<string[]> {
  const client = getSanityClient();
  if (!client) return [];

  try {
    const slugs = await client.fetch(QUERIES.projectSlugs);
    return slugs || [];
  } catch (error) {
    console.error("Error fetching project slugs from Sanity:", error);
    return [];
  }
}

// =========================================
// Helpers
// =========================================

interface SanityProject {
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
  content?: string | PortableTextBlock[];
}

interface PortableTextBlock {
  _type: string;
  children?: Array<{ text: string }>;
  [key: string]: unknown;
}

function mapSanityProject(raw: SanityProject): ProjectData {
  // Convert Portable Text to plain text if needed
  let content = "";
  if (typeof raw.content === "string") {
    content = raw.content;
  } else if (Array.isArray(raw.content)) {
    content = portableTextToPlain(raw.content);
  }

  return {
    slug: raw.slug || "",
    title: raw.title || "",
    description: raw.description || "",
    category: raw.category || "web",
    tags: raw.tags || [],
    featured: raw.featured ?? false,
    thumbnail: raw.thumbnail || "",
    liveUrl: raw.liveUrl,
    githubUrl: raw.githubUrl,
    order: raw.order ?? 99,
    role: raw.role,
    duration: raw.duration,
    team: raw.team,
    content,
  };
}

/**
 * Convert Portable Text blocks to plain markdown-ish text
 */
function portableTextToPlain(blocks: PortableTextBlock[]): string {
  return blocks
    .map((block) => {
      if (block._type === "block" && block.children) {
        return block.children.map((child) => child.text || "").join("");
      }
      return "";
    })
    .join("\n\n");
}
