"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import projects from "@/data/projects.json";
import type { Project } from "@/types/projects.types";
import {
  P, GRAD, GRAD_TEXT, GRAD_SECTION,
  cardGlass, cardHoverShadow, labelLight,
} from "@/lib/ds";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [arrowHovered, setArrowHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/our-work/${project.slug}`}
        className="group relative flex flex-col sm:flex-row items-center gap-6 rounded-2xl p-6
                   transition-shadow duration-300 overflow-hidden"
        style={cardGlass}
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.boxShadow = cardHoverShadow}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = cardGlass.boxShadow as string}
      >
        {/* Top accent line on hover */}
        <div
          aria-hidden
          className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${P.pink}80, ${P.violet}80, transparent)` }}
        />

        {/* Hover wash */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `linear-gradient(220deg, ${P.pink}0a, ${P.violet}06, transparent 60%)` }}
        />

        {/* Images stack */}
        <div className="relative flex items-end gap-2 flex-shrink-0">
          {project.coverImages.slice(0, 3).map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative rounded-xl overflow-hidden shadow-lg flex-shrink-0"
              style={{
                width:  i === 1 ? "110px" : "90px",
                height: i === 1 ? "175px" : "148px",
              }}
            >
              <Image
                src={src}
                alt={`${project.client.name} preview ${i + 1}`}
                fill
                className="object-cover"
                sizes="110px"
              />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 flex-1 z-10 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: P.purple }}>
            {project.client.name}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold leading-tight" style={{ color: P.ink }}>
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: P.inkLight }}>Solution</p>
              <p className="text-sm font-semibold" style={{ color: P.inkMid }}>{project.solution}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: P.inkLight }}>Industry</p>
              <p className="text-sm font-semibold" style={{ color: P.inkMid }}>{project.industry}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold mt-1 w-fit" style={GRAD_TEXT}>
            View case study <ArrowRight size={13} />
          </span>
        </div>

        {/* Arrow button */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: -45 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10
                     transition-all duration-300"
          style={{
            border:     arrowHovered ? "1.5px solid transparent" : `1.5px solid ${P.border}`,
            background: arrowHovered ? GRAD : "transparent",
            color:      arrowHovered ? "#fff" : P.inkMid,
          }}
          onMouseEnter={() => setArrowHovered(true)}
          onMouseLeave={() => setArrowHovered(false)}
        >
          <ArrowRight size={18} />
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function OurWorkSection() {
  const preview = (projects as Project[]).slice(0, 3);

  return (
    <section
      id="our-work"
      className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28
                 relative overflow-hidden scroll-mt-20"
      style={{ background: GRAD_SECTION }}
    >
      {/* Ambient blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-12"
          style={{ background: `radial-gradient(ellipse, ${P.purple}, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[110px] opacity-14"
          style={{ background: `radial-gradient(circle, ${P.pink}, transparent 65%)` }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col gap-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div className="flex flex-col gap-3">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] w-fit border"
              style={labelLight}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: P.primary }} />
              Our Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: P.ink }}>
              Projects we&rsquo;re{" "}
              <span style={GRAD_TEXT}>proud of.</span>
            </h2>
          </div>
          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold
                       transition-all hover:bg-white/5 flex-shrink-0"
            style={{ color: P.inkMid, border: `1px solid ${P.border}` }}
          >
            All Projects <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {preview.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
