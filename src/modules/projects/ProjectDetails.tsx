"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, ChevronRight } from "lucide-react";
import type { Project, ContentBlock } from "@/types/projects.types";
import { renderInlineMarkdown } from "@/lib/markdown";
import { JSX } from "react";

/* --- Content Block Renderer --- */
function ContentRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6">
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
        <Tag className={`${sizes[block.level]} text-foreground tracking-tight`}>
          {renderInlineMarkdown(block.text)}
        </Tag>
      );
    }

    case "list":
      if (block.style === "numbered") {
        return (
          <ol className="list-decimal list-outside pl-6 space-y-2 mb-6 text-foreground/80 text-base md:text-lg">
            {block.items.map((item, i) => (
              <li key={i} className="leading-relaxed pl-2">
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="space-y-2.5 mb-6 text-foreground/80 text-base md:text-lg">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{renderInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="my-8 pl-6 border-l-4 border-primary bg-primary/5 rounded-r-xl py-5 px-6">
          <p className="text-lg md:text-xl italic text-foreground/90 leading-relaxed">
            &ldquo;{renderInlineMarkdown(block.text)}&rdquo;
          </p>
          {block.author && (
            <footer className="mt-3 text-sm font-semibold text-muted-foreground not-italic">
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
            <figcaption className="mt-3 text-sm text-center text-muted-foreground italic">
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
    <article className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden bg-muted/40 px-4 sm:px-6 lg:px-10 pt-10 pb-16 lg:pb-20">
        {/* Diagonal stripe texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-20deg, transparent 0px, transparent 200px, oklch(0.88 0.02 60 / 0.5) 200px, oklch(0.88 0.02 60 / 0.5) 201px)",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-10"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-foreground transition-colors" aria-label="Home">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/our-work" className="hover:text-foreground transition-colors">
              Our Work
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium truncate max-w-[50vw]">
              {project.shortTitle}
            </span>
          </motion.nav>

          {/* Client name label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-xs font-semibold uppercase tracking-widest text-primary mb-4"
          >
            {project.client.name}
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] max-w-3xl"
          >
            {project.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            {project.excerpt}
          </motion.p>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-8 pt-8 border-t border-border/50"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Client</p>
              <p className="text-sm font-semibold">{project.client.name}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Solution</p>
              <p className="text-sm font-semibold">{project.solution}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Industry</p>
              <p className="text-sm font-semibold">{project.industry}</p>
            </div>
            {project.awards.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Awards</p>
                <p className="text-sm font-semibold">{project.awards.join(" · ")}</p>
              </div>
            )}
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
        <div className="max-w-5xl mx-auto relative aspect-[16/7] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300"
          >
            ← Back to all projects
          </Link>
        </div>
      </section>
    </article>
  );
}