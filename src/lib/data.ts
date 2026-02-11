/**
 * Unified Data Service
 *
 * This service fetches data from Hygraph CMS when available,
 * and falls back to local hardcoded data if Hygraph is not configured.
 */

import { config } from '@/config';
import * as hygraph from './hygraph';

// ============================================
// Portfolio / Profile Data
// ============================================

export interface Portfolio {
  name: string;
  title: string;
  tagline?: string;
  bio: string;
  email: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  avatar?: string;
}

export async function getPortfolio(): Promise<Portfolio> {
  // Try Hygraph first
  if (config.features.useHygraphCms) {
    try {
      const data = await hygraph.getPortfolio();
      if (data) {
        return {
          name: data.name,
          title: data.title,
          tagline: data.tagline,
          bio: data.bio,
          email: data.email,
          github: data.github,
          linkedin: data.linkedin,
          twitter: data.twitter,
          avatar: data.avatar?.url,
        };
      }
    } catch (error) {
      console.warn('Failed to fetch from Hygraph, using fallback data:', error);
    }
  }

  // Fallback to hardcoded data
  return {
    name: 'Tanuj Sansare',
    title: 'Full Stack Developer',
    tagline: 'Building beautiful, performant web experiences',
    bio: "I'm a passionate full-stack developer and designer who thrives at the intersection of creativity and engineering. With a strong foundation in modern web technologies, I build performant, accessible, and visually stunning digital experiences.",
    email: 'hello@example.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  };
}

// ============================================
// Projects
// ============================================

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  technologies: string[];
  category: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  highlights?: string[];
  year: number;
}

export async function getAllProjects(): Promise<Project[]> {
  // Try Hygraph first
  if (config.features.useHygraphCms) {
    try {
      const data = await hygraph.getAllProjects();
      if (data && data.length > 0) {
        return data.map(p => ({
          slug: p.slug,
          title: p.title,
          description: p.description,
          longDescription: p.longDescription,
          image: p.image?.url,
          technologies: p.technologies,
          category: p.category,
          featured: p.featured,
          liveUrl: p.liveUrl,
          githubUrl: p.githubUrl,
          highlights: p.highlights,
          year: p.year,
        }));
      }
    } catch (error) {
      console.warn('Failed to fetch projects from Hygraph, using fallback data:', error);
    }
  }

  // Fallback to sample data
  return [
    {
      slug: 'cloudsync-dashboard',
      title: 'CloudSync Dashboard',
      description: 'A real-time analytics dashboard for cloud infrastructure monitoring with live metrics, alert management, and team collaboration features.',
      image: '/projects/project-1.svg',
      technologies: ['React', 'TypeScript', 'Node.js', 'WebSocket'],
      category: 'web',
      featured: true,
      liveUrl: '#',
      githubUrl: '#',
      year: 2024,
    },
    {
      slug: 'artistry-design-platform',
      title: 'Artistry — Design Platform',
      description: 'A collaborative design platform where creators share, remix, and sell digital artwork with built-in licensing and version control.',
      image: '/projects/project-2.svg',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind'],
      category: 'design',
      featured: true,
      liveUrl: '#',
      githubUrl: '#',
      year: 2023,
    },
  ];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  // Try Hygraph first
  if (config.features.useHygraphCms) {
    try {
      const data = await hygraph.getFeaturedProjects();
      if (data && data.length > 0) {
        return data.map(p => ({
          slug: p.slug,
          title: p.title,
          description: p.description,
          image: p.image?.url,
          technologies: p.technologies,
          category: p.category,
          featured: p.featured,
          liveUrl: p.liveUrl,
          githubUrl: p.githubUrl,
          year: p.year,
        }));
      }
    } catch (error) {
      console.warn('Failed to fetch featured projects from Hygraph:', error);
    }
  }

  // Fallback: filter from all projects
  const all = await getAllProjects();
  return all.filter(p => p.featured);
}

// ============================================
// Skills
// ============================================

export interface Skill {
  name: string;
  category: string;
  level: number;
  icon: string;
}

export async function getSkills(): Promise<Skill[]> {
  // Try Hygraph first
  if (config.features.useHygraphCms) {
    try {
      const data = await hygraph.getSkills();
      if (data && data.length > 0) {
        return data;
      }
    } catch (error) {
      console.warn('Failed to fetch skills from Hygraph:', error);
    }
  }

  // Fallback to sample data
  return [
    { name: 'React', category: 'frontend', level: 95, icon: '⚛️' },
    { name: 'TypeScript', category: 'frontend', level: 90, icon: '📘' },
    { name: 'Next.js', category: 'frontend', level: 90, icon: '▲' },
    { name: 'Node.js', category: 'backend', level: 85, icon: '🟢' },
    { name: 'PostgreSQL', category: 'database', level: 80, icon: '🐘' },
    { name: 'Tailwind CSS', category: 'frontend', level: 95, icon: '🎨' },
  ];
}

// ============================================
// Experience
// ============================================

export interface Experience {
  role: string;
  company: string;
  location?: string;
  period: string;
  type: 'work' | 'education';
  description: string;
  achievements?: string[];
  technologies?: string[];
}

export async function getExperiences(): Promise<Experience[]> {
  // Try Hygraph first
  if (config.features.useHygraphCms) {
    try {
      const data = await hygraph.getExperiences();
      if (data && data.length > 0) {
        return data;
      }
    } catch (error) {
      console.warn('Failed to fetch experiences from Hygraph:', error);
    }
  }

  // Fallback to sample data
  return [
    {
      role: 'Senior Full Stack Developer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      type: 'work',
      description: 'Leading development of cloud-based applications',
      achievements: [
        'Built real-time dashboard serving 10k+ users',
        'Improved performance by 40%',
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL'],
    },
  ];
}
