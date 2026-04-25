"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, ChevronRight } from "lucide-react";
import type { Project, ContentBlock } from "@/types/projects.types";
import { renderInlineMarkdown } from "@/lib/markdown";
import { JSX } from "react";
import { P, GRAD, GRAD_TEXT, GRAD_SECTION, cardGlass } from "@/lib/ds";

/* --- Content Block Renderer --- */
function ContentRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: P.inkMid }}>
          {renderInlineMarkdown(block.text)}
        </p>
      );

    case "heading": {
      const sizes: Record<number, string> = {
        1: "text-4xl md:text-5xl font-bold mb-6 mt-10",
        2: "text-3xl md:text-4xl font-bold mb-5 mt-10",
        3: "text-2xl md:text-3xl font-bold mb-4 mt-8",
        4: "text-xl md:text-2xl font-semibold mb-3 mt-6",
      };
      const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
      return (
        <Tag className={`${sizes[block.level]} tracking-tight`} style={{ color: P.ink }}>
          {renderInlineMarkdown(block.text)}
        </Tag>
      );
    }

    case "list":
      if (block.style === "numbered") {
        return (
          <ol className="list-decimal list-outside pl-6 space-y-2 mb-6 text-base md:text-lg" style={{ color: P.inkMid }}>
            {block.items.map((item, i) => (
              <li key={i} className="leading-relaxed pl-2">
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="space-y-2.5 mb-6 text-base md:text-lg" style={{ color: P.inkMid }}>
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: P.primary }} />
              <span>{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote
          className="my-8 pl-6 rounded-r-xl py-5 px-6"
          style={{ borderLeft: `4px solid ${P.purple}`, background: "rgba(161,0,255,0.06)" }}
        >
          <p className="text-lg md:text-xl italic leading-relaxed" style={{ color: P.ink }}>
            &ldquo;{renderInlineMarkdown(block.text)}&rdquo;
          </p>
          {block.author && (
            <footer className="mt-3 text-sm font-semibold not-italic" style={{ color: P.inkMid }}>
              — {block.author}
            </footer>
          )}
        </blockquote>
      );

    case "image":
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image src={block.src} alt={block.alt} fill className="object-cover" />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-sm text-center italic" style={{ color: P.inkMid }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return null;
  }
}

/* --- Main Detail Component --- */
export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className="min-h-screen" style={{ background: GRAD_SECTION }}>

      {/* Hero */}
      <section
        className="relative overflow-hidden px-4 sm:px-6 lg:px-10 pt-10 pb-16 lg:pb-20"
        style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Gradient blobs */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Primary gradient — top-center sweep */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[420px] rounded-full bg-linear-to-b from-[#6a00ff] via-[#a100ff] to-[#ff3c7e] opacity-16 blur-[130px]" />
          {/* Top-right accent */}
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-linear-to-bl from-[#6a00ff] to-[#a100ff] opacity-12 blur-[110px]" />
          {/* Bottom-left accent */}
          <div className="absolute -bottom-20 -left-20 w-[380px] h-[380px] rounded-full bg-linear-to-tr from-[#a100ff] to-[#ff3c7e] opacity-10 blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm mb-10"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:opacity-80" style={{ color: P.inkMid }} aria-label="Home">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" style={{ color: P.inkLight }} />
            <Link href="/our-work" className="transition-colors hover:opacity-80" style={{ color: P.inkMid }}>
              Our Work
            </Link>
            <ChevronRight className="w-4 h-4" style={{ color: P.inkLight }} />
            <span className="font-medium truncate max-w-[50vw]" style={{ color: P.ink }}>
              {project.shortTitle}
            </span>
          </motion.nav>

          {/* Client name label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: P.purple }}
          >
            {project.client.name}
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-3xl"
            style={{ color: P.ink }}
          >
            {project.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: P.inkMid }}
          >
            {project.excerpt}
          </motion.p>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-8 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {[
              { label: "Client",   value: project.client.name },
              { label: "Solution", value: project.solution     },
              { label: "Industry", value: project.industry     },
              ...(project.awards.length > 0 ? [{ label: "Awards", value: project.awards.join(" · ") }] : []),
            ].map((m) => (
              <div key={m.label}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: P.inkMid }}>{m.label}</p>
                <p className="text-sm font-semibold" style={{ color: P.ink }}>{m.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="px-4 sm:px-6 lg:px-10 -mt-8 relative z-10"
      >
        <div className="max-w-5xl mx-auto relative aspect-[16/7] rounded-2xl overflow-hidden shadow-2xl"
          style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
          <Image src={project.featuredImage} alt={project.title} fill className="object-cover" priority />
        </div>
      </motion.div>

      {/* Content body */}
      <section className="px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {project.content.map((block, i) => (
            <ContentRenderer key={i} block={block} />
          ))}
        </motion.div>
      </section>

      {/* Back CTA */}
      <section className="px-4 sm:px-6 lg:px-10 pb-20">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
            style={GRAD_TEXT}
          >
            ← Back to all projects
          </Link>
        </div>
      </section>
    </article>
  );
}
