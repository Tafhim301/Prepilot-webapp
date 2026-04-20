"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import projects from "@/data/projects.json";
import type { Project } from "@/types/projects.types";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/our-work/${project.slug}`}
        className="group relative block rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 p-8 lg:p-12 items-center">

          {/* Left: 3 stacked cover images */}
          <div className="relative min-h-[260px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[85%] h-[80%] rounded-full bg-gradient-to-br from-amber-100/50 via-orange-50/30 to-rose-100/20 blur-2xl" />
            </div>

            <div className="relative z-10 flex items-end gap-3">
              {project.coverImages.map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative rounded-xl overflow-hidden shadow-lg flex-shrink-0"
                  style={{
                    width: i === 1 ? "120px" : "100px",
                    height: i === 1 ? "195px" : "165px",
                  }}
                >
                  <Image
                    src={src}
                    alt={`${project.client.name} project preview ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </motion.div>
              ))}
            </div>

            {project.awards.length > 0 && (
              <div className="absolute bottom-0 left-0 flex gap-3 z-20">
                {project.awards.map((award) => (
                  <span key={award} className="text-xs font-medium text-muted-foreground">
                    🏆 {award}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-8 pr-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {project.client.name}
            </p>

            <h3 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>

            <div className="grid grid-cols-2 gap-8 max-w-md">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
                  Solution
                </p>
                <p className="text-sm font-semibold text-foreground">{project.solution}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
                  Industry
                </p>
                <p className="text-sm font-semibold text-foreground">{project.industry}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow button */}
        <div className="absolute top-1/2 right-8 lg:right-10 -translate-y-1/2 rounded-full transition-all duration-300">
          <motion.div
            whileHover={{ scale: 1.12, rotate: -45 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="w-14 h-14 rounded-full border-2 border-foreground/20 flex items-center justify-center group-hover:bg-primary-gradaint group-hover:text-white transition-colors duration-300"
          >
            <ArrowRight className="w-5 h-5  hover:text-white transition-colors duration-300" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function OurWorkSection() {
  return (
    <section
      id="our-work"
      className="py-20 px-4 sm:px-6 lg:px-10 bg-muted/30 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Our Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Projects we&rsquo;re proud of
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of the products, platforms, and experiences we&rsquo;ve
            built with ambitious teams.
          </p>
        </motion.div>

        {/* Project cards — show first 3 on homepage */}
        <div className="flex flex-col gap-6">
          {(projects as Project[]).slice(0, 3).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold hover:bg-primary-gradaint transition-opacity duration-200"
          >
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}