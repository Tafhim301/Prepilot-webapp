"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import projects from "@/data/projects.json";
import type { Project } from "@/types/projects.types";
import {
  P, GRAD, GRAD_TEXT, GRAD_SECTION_ALT,
  cardGlass, cardHoverShadow, labelLight,
} from "@/lib/ds";

// ── ProjectCard ───────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [arrowHover, setArrowHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/our-work/${project.slug}`}
        className="group relative block rounded-3xl transition-all duration-500 overflow-hidden"
        style={{
          ...cardGlass,
          boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
        }}
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.boxShadow = cardHoverShadow}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)"}
      >
        {/* Top accent line */}
        <div
          aria-hidden
          className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${P.amber}70, transparent)` }}
        />

        {/* Hover warm wash */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `linear-gradient(220deg, ${P.amber}08, transparent 55%)` }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 p-8 lg:p-12 items-center">

          {/* Left: 3 stacked cover images */}
          <div className="relative min-h-[260px] flex items-center justify-center">
            {/* Soft blob background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[85%] h-[80%] rounded-full blur-2xl"
                style={{ background: `radial-gradient(ellipse, ${P.amber}18, ${P.red}0c, transparent 70%)` }}
              />
            </div>

            {/* 3 images in a staggered stack */}
            <div className="relative z-10 flex items-end gap-3">
              {project.coverImages.map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative rounded-xl overflow-hidden shadow-lg flex-shrink-0"
                  style={{
                    width:  i === 1 ? "120px" : "100px",
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

            {/* Awards */}
            {project.awards.length > 0 && (
              <div className="absolute bottom-0 left-0 flex gap-3 z-20">
                {project.awards.map((award) => (
                  <span
                    key={award}
                    className="text-xs font-medium"
                    style={{ color: P.inkMid }}
                  >
                    🏆 {award}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-6 pr-16">
            {/* Client name */}
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: P.amber }}
            >
              {project.client.name}
            </p>

            <h3
              className="text-2xl lg:text-3xl font-bold leading-tight transition-colors duration-300"
              style={{ color: P.ink }}
            >
              {project.title}
            </h3>

            <div className="grid grid-cols-2 gap-6 max-w-md">
              <div>
                <p
                  className="text-xs uppercase tracking-widest mb-1.5"
                  style={{ color: P.inkMid }}
                >
                  Solution
                </p>
                <p className="text-sm font-semibold" style={{ color: P.ink }}>
                  {project.solution}
                </p>
              </div>
              <div>
                <p
                  className="text-xs uppercase tracking-widest mb-1.5"
                  style={{ color: P.inkMid }}
                >
                  Industry
                </p>
                <p className="text-sm font-semibold" style={{ color: P.ink }}>
                  {project.industry}
                </p>
              </div>
            </div>

            {/* View project CTA text */}
            <span
              className="inline-flex items-center gap-1.5 text-sm font-semibold w-fit
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={GRAD_TEXT}
            >
              View project <ArrowRight size={14} />
            </span>
          </div>
        </div>

        {/* Arrow button */}
        <div className="absolute top-1/2 right-8 lg:right-10 -translate-y-1/2">
          <motion.div
            whileHover={{ scale: 1.12, rotate: -45 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              border:     arrowHover ? "2px solid transparent" : `2px solid ${P.border}`,
              background: arrowHover ? GRAD : "transparent",
              color:      arrowHover ? "#fff" : P.inkMid,
            }}
            onMouseEnter={() => setArrowHover(true)}
            onMouseLeave={() => setArrowHover(false)}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProjectShowcase() {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-10 relative overflow-hidden"
      style={{ background: GRAD_SECTION_ALT }}
    >
      {/* Ambient blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full blur-[110px] opacity-28"
          style={{ background: `radial-gradient(circle, ${P.amber}, transparent 65%)` }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full blur-[100px] opacity-22"
          style={{ background: `radial-gradient(circle, ${P.red}, transparent 65%)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-5 border w-fit"
            style={labelLight}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: P.primary }} />
            Our Work
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: P.ink }}>
            Projects we&rsquo;re{" "}
            <span style={GRAD_TEXT}>proud of.</span>
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: P.inkMid }}>
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
