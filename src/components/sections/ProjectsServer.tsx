import { getAllProjects } from '@/lib/data';
import ProjectsClient from './Projects';
import type { ProjectCategory } from './Projects';

/**
 * Server Component wrapper for Projects section
 * Fetches projects from Hygraph (or fallback) and passes to client component
 */
export default async function ProjectsServer() {
  const projects = await getAllProjects();

  // Transform to match the client component's expected format
  const transformedProjects = projects.map(p => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    description: p.description,
    image: p.image || '/projects/project-1.svg',
    tags: p.technologies || [],
    liveUrl: p.liveUrl,
    githubUrl: p.githubUrl,
    category: p.category as ProjectCategory,
  }));

  return <ProjectsClient projects={transformedProjects} />;
}
