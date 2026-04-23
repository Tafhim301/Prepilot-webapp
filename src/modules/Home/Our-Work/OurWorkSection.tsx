"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import projects from "@/data/projects.json";
import type { Project } from "@/types/projects.types";
import { P, GRAD, GRAD_TEXT, GRAD_SECTION, cardGlass, cardHoverShadow } from "@/lib/ds";

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
        className="group relative block rounded-3xl overflow-hidden transition-all duration-400"
        style={cardGlass}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = cardHoverShadow;
          el.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = cardGlass.boxShadow as string;
          el.style.transform = "translateY(0)";
        }}
      >
        {/* Top shine */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)" }}
        />

        {/* Hover warm wash */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-350"
          style={{ background: `linear-gradient(220deg, ${P.amber}09, transparent 55%)` }}
        />

        {/* Top accent line on hover */}
        <div
          aria-hidden
          className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-350"
          style={{ background: `linear-gradient(90deg, transparent, ${P.amber}80, transparent)` }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 sm:gap-8 p-6 sm:p-8 lg:p-12 items-center">

          {/* Left: stacked cover images */}
          <div className="relative min-h-[220px] sm:min-h-[260px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[85%] h-[80%] rounded-full blur-2xl"
                style={{ background: `radial-gradient(circle, ${P.amber}28, ${P.red}12, transparent 70%)` }}
              />
            </div>

            <div className="relative z-10 flex items-end gap-2 sm:gap-3">
              {project.coverImages.map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative rounded-xl overflow-hidden shadow-lg flex-shrink-0"
                  style={{
                    width:  i === 1 ? "110px" : "90px",
                    height: i === 1 ? "180px" : "150px",
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
                  <span key={award} className="text-xs font-medium" style={{ color: P.inkMid }}>
                    🏆 {award}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right: content */}
          <div className="flex flex-col gap-5 sm:gap-8 pr-0 sm:pr-14 lg:pr-16 relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: P.amber }}>
              {project.client.name}
            </p>

            <h3
              className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight transition-colors duration-300 group-hover:text-[#8b3a2a]"
              style={{ color: P.ink }}
            >
              {project.title}
            </h3>

            <div className="grid grid-cols-2 gap-5 sm:gap-8 max-w-md">
              <div>
                <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: P.inkMid }}>
                  Solution
                </p>
                <p className="text-sm font-semibold" style={{ color: P.ink }}>
                  {project.solution}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: P.inkMid }}>
                  Industry
                </p>
                <p className="text-sm font-semibold" style={{ color: P.ink }}>
                  {project.industry}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow button */}
        <div className="absolute top-1/2 right-6 sm:right-8 lg:right-10 -translate-y-1/2">
          <motion.div
            whileHover={{ scale: 1.12, rotate: -45 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              border: `2px solid ${P.border}`,
              color:  P.inkMid,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = GRAD;
              el.style.borderColor = "transparent";
              el.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.borderColor = P.border;
              el.style.color = P.inkMid;
            }}
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300" />
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
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-10 scroll-mt-20 relative overflow-hidden"
      style={{ background: GRAD_SECTION }}
    >
      {/* Ambient blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[130px] opacity-28"
          style={{ background: `radial-gradient(ellipse, ${P.red}, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full blur-[110px] opacity-25"
          style={{ background: `radial-gradient(circle, ${P.amber}, transparent 65%)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold
                       uppercase tracking-[0.18em] mb-5 border w-fit"
            style={{
              background:  `${P.primary}0d`,
              borderColor: `${P.primary}22`,
              color:       P.primary,
            }}
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

        {/* Cards */}
        <div className="flex flex-col gap-5 sm:gap-6">
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
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold
                       text-white transition-all duration-200 hover:opacity-85 hover:-translate-y-px"
            style={{
              background:  GRAD,
              boxShadow:   `0 8px 28px -6px ${P.red}55`,
            }}
          >
            View all projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
