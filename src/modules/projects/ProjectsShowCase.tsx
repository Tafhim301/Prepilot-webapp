"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import projects from "@/data/projects.json";
import { Project } from "@/types/projects.types";


function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/our-work/${project.slug}`}
        className="group relative block rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
      >
        {/* Decorative dotted arc in header area */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 80px 20px at center top, transparent 49%, currentColor 50%, currentColor 51%, transparent 52%)",
            maskImage:
              "radial-gradient(ellipse 80px 20px at center top, black 50%, transparent 51%)",
            color: "oklch(0.6 0.05 20)",
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 p-8 lg:p-12 items-center">
          {/* Left: Preview images */}
          <div className="relative min-h-[280px] flex items-center justify-center">
            {/* Soft peach blob background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[90%] h-[85%] rounded-full bg-gradient-to-br from-amber-100/60 via-orange-50/40 to-rose-100/30 blur-xl" />
            </div>

            <div className="relative z-10 w-full">
              {/* Client logo */}
              <div className="mb-4">
                <Image
                  src={project.client.logo}
                  alt={project.client.name}
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>

              {/* Cover images stack */}
              {project.coverImages.length > 0 && (
                <div className="flex items-end gap-3 flex-wrap">
                  {project.coverImages.slice(0, 3).map((src, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -6, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative rounded-xl overflow-hidden shadow-lg"
                      style={{
                        width: i === 1 ? "130px" : "110px",
                        height: i === 1 ? "200px" : "170px",
                      }}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} preview ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Awards row */}
              {project.awards.length > 0 && (
                <div className="flex gap-4 mt-5">
                  {project.awards.map((award) => (
                    <span
                      key={award}
                      className="text-xs font-medium text-muted-foreground tracking-wide"
                    >
                      🏆 {award}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>

            <div className="grid grid-cols-2 gap-8 max-w-md">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
                  Solution
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {project.solution}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5">
                  Industry
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {project.industry}
                </p>
              </div>
            </div>
          </div>

          {/* Arrow button (absolute top-right on desktop) */}
          <div className="absolute top-8 right-8 lg:top-1/2 lg:right-10 lg:-translate-y-1/2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -45 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="w-14 h-14 rounded-full border-2 border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-colors duration-300"
            >
              <ArrowRight className="w-5 h-5 text-foreground group-hover:text-background transition-colors duration-300" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-10 bg-muted/30">
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

        {/* Project cards */}
        <div className="flex flex-col gap-6">
          {(projects as Project[]).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}