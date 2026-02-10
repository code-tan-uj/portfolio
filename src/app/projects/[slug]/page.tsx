import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getProjectSlugs, getAllProjects } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";
import ProjectDetail from "@/components/projects/ProjectDetail";

/* ========================================================================== */
/*  Static params                                                              */
/* ========================================================================== */

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

/* ========================================================================== */
/*  Dynamic metadata                                                           */
/* ========================================================================== */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Tanuj Sansare`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Tanuj Sansare`,
      description: project.description,
      images: project.thumbnail ? [project.thumbnail] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Tanuj Sansare`,
      description: project.description,
    },
  };
}

/* ========================================================================== */
/*  Page                                                                       */
/* ========================================================================== */

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const contentHtml = await markdownToHtml(project.content);

  // Get related projects (same category, excluding current)
  const allProjects = await getAllProjects();
  const related = allProjects
    .filter((p) => p.slug !== slug && p.category === project.category)
    .slice(0, 3);

  // If not enough related by category, fill with other projects
  if (related.length < 3) {
    const others = allProjects
      .filter(
        (p) => p.slug !== slug && !related.some((r) => r.slug === p.slug),
      )
      .slice(0, 3 - related.length);
    related.push(...others);
  }

  return (
    <ProjectDetail
      project={project}
      contentHtml={contentHtml}
      relatedProjects={related}
    />
  );
}
