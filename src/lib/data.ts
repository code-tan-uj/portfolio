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
          tagline: data.tagline ?? '',
          bio: data.bio ?? '',
          email: data.email ?? '',
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
    title: 'AI Engineer',
    tagline: 'Building AI systems that ship to millions',
    bio: "I'm an AI Engineer specializing in LLMs, Vision Transformers, and RAG pipelines. At Bajaj Finserv, I've built systems generating 9,000+ personalized banners daily and AI agents automating enterprise workflows. I turn cutting-edge research into production-ready ML systems.",
    email: 'tanuj.sansare2000@gmail.com',
    github: 'https://github.com/code-tan-uj',
    linkedin: 'https://www.linkedin.com/in/tps2000',
    twitter: 'https://x.com/Tanuj0181',
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
          technologies: p.technologies || [],
          category: p.category,
          featured: p.featured,
          liveUrl: p.liveUrl,
          githubUrl: p.githubUrl,
          highlights: p.highlights || [],
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
      slug: 'gen-ai-bannerization',
      title: 'Gen AI Bannerization Platform',
      description: 'Enterprise-scale AI system automating banner creation with multi-agent LLMs, Vision Transformer QC (98% accuracy), and distributed processing — generating 9,000+ production-ready banners daily at Bajaj Finserv.',
      image: '/projects/project-1.svg',
      technologies: ['Vision Transformers', 'LangGraph', 'RabbitMQ', 'Celery', 'FastAPI'],
      category: 'ai',
      featured: true,
      year: 2024,
    },
    {
      slug: 'release-agent',
      title: 'Release Agent — Autonomous DevOps',
      description: 'Agentic AI system that automates software releases end-to-end — from changelog generation to compliance checks — boosting developer velocity by ~15%.',
      image: '/projects/project-2.svg',
      technologies: ['LangGraph', 'AutoGen', 'GitHub API', 'Python', 'Redis'],
      category: 'ai',
      featured: true,
      year: 2025,
    },
    {
      slug: 'sentimeter-ai',
      title: 'Sentimeter AI — Chat Intelligence',
      description: 'Samsung Research initiative transforming chat screenshots into actionable sentiment intelligence using OCR, speaker diarization, and fine-tuned RoBERTa (0.92+ F1-score).',
      image: '/projects/project-3.svg',
      technologies: ['RoBERTa', 'BERT', 'OpenCV', 'EasyOCR', 'Transformers'],
      category: 'research',
      featured: true,
      year: 2023,
    },
    {
      slug: 'chat-with-files',
      title: 'Chat With Your Files — RAG System',
      description: 'Production-grade RAG application enabling natural language queries over enterprise documents — built in 8 weeks from research to deployment at American Axle.',
      image: '/projects/project-4.svg',
      technologies: ['LangChain', 'FAISS', 'Cohere', 'Streamlit', 'Python'],
      category: 'ai',
      featured: true,
      year: 2023,
    },
    {
      slug: 'kpi-portal',
      title: 'KPI Portal — Analytics Dashboard',
      description: 'Real-time executive dashboard consolidating multi-dimensional KPIs with AI-powered insights, supporting 2M+ concurrent users at Bajaj Finserv.',
      image: '/projects/project-5.svg',
      technologies: ['React', 'TypeScript', 'Node.js', 'Redis', 'MongoDB'],
      category: 'web',
      featured: true,
      year: 2024,
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
        return data.map((exp) => ({
          role: exp.role,
          company: exp.company,
          location: exp.location,
          period: exp.period,
          type: exp.type,
          description: exp.description ?? '',
          achievements: exp.achievements,
          technologies: exp.technologies,
        }));
      }
    } catch (error) {
      console.warn('Failed to fetch experiences from Hygraph:', error);
    }
  }

  // Fallback to sample data
  return [
    {
      role: 'AI Engineer',
      company: 'Bajaj Finserv',
      location: 'Pune, India',
      period: 'July 2024 - Present',
      type: 'work',
      description: 'Building enterprise-scale AI systems for personalization and automation',
      achievements: [
        'Built Gen AI Bannerization generating 9,000+ personalized banners daily',
        'Developed Release Agent automating deployment workflows with 98% QC accuracy',
        'Engineered Sentimeter AI achieving 0.92+ F1-score on sentiment analysis',
      ],
      technologies: ['Python', 'LangChain', 'Vision Transformers', 'RAG', 'FastAPI', 'Azure'],
    },
    {
      role: 'AI/ML Intern',
      company: 'Bajaj Finserv',
      location: 'Pune, India',
      period: 'January 2024 - July 2024',
      type: 'work',
      description: 'Developed AI-powered tools for enterprise analytics and testing',
      achievements: [
        'Created KPI Portal with GPT-powered Q&A achieving 95%+ response accuracy',
        'Built Web Vitals optimization tool improving performance scores by 35%',
      ],
      technologies: ['Python', 'GPT-4', 'RAG', 'React', 'Node.js'],
    },
    {
      role: 'Research Intern',
      company: 'Samsung PRISM',
      location: 'Bangalore, India',
      period: 'August 2023 - January 2024',
      type: 'work',
      description: 'Multi-modal AI research on chat screenshot understanding',
      achievements: [
        'Built multi-modal pipeline processing 10,000+ screenshots for training data',
        'Achieved 89% accuracy on emotion classification using Vision Transformers',
      ],
      technologies: ['PyTorch', 'Vision Transformers', 'BERT', 'Computer Vision'],
    },
  ];
}
