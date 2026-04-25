import { notFound } from "next/navigation";
import projects from "@/data/projects.json";

import ProjectDetail from "@/modules/projects/ProjectDetails";
import { Project } from "@/types/projects.types";


// Static params for SSG
export async function generateStaticParams() {
  return (projects as Project[]).map((p) => ({ slug: p.slug }));
}

// Dynamic metadata per project
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = (projects as Project[]).find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.shortTitle} | Our Work`,
    description: project.excerpt,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = (projects as Project[]).find((p) => p.slug === slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}