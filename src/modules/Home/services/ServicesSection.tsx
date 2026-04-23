"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, cubicBezier } from "framer-motion";
import Link from "next/link";
import {
  P, GRAD, GRAD_TEXT, GRAD_SECTION_ALT,
  cardGlass, cardHoverShadow, labelLight,
} from "@/lib/ds";

// ── Data ──────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "🎨",
    title: "Strategic UI/UX Design",
    description: "User-centric interfaces that optimise conversion rates and drive meaningful engagement.",
    tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
  },
  {
    icon: "⚛️",
    title: "MERN Stack Development",
    description: "Full-stack JavaScript applications built with MongoDB, Express, React, and Node.js.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    icon: "🌐",
    title: "Custom Web Architecture",
    description: "Secure, high-performance web applications tailored to complex business logic.",
    tags: ["Next.js", "React", "Node.js", "GraphQL"],
  },
  {
    icon: "🔷",
    title: "WordPress Development",
    description: "Custom themes, plugins, and headless WordPress setups for content-driven sites.",
    tags: ["Custom Themes", "Plugins", "WooCommerce", "Headless CMS"],
  },
  {
    icon: "💧",
    title: "Webflow Development",
    description: "Pixel-perfect Webflow builds with CMS, animations, and full client handoff.",
    tags: ["Webflow CMS", "Interactions", "E-commerce", "SEO"],
  },
  {
    icon: "🛒",
    title: "E-commerce Solutions",
    description: "Conversion-optimised storefronts with seamless checkout and payment integrations.",
    tags: ["Shopify", "WooCommerce", "Stripe", "Headless"],
  },
];

// ── Animation variants ────────────────────────────────────────────────────────
const ease = cubicBezier(0.22, 1, 0.36, 1);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// ── ServiceCard ───────────────────────────────────────────────────────────────
function ServiceCard({ icon, title, description, tags }: {
  icon: string; title: string; description: string; tags: string[];
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22 }}
      className="group relative flex flex-col gap-5 rounded-2xl p-7 cursor-pointer overflow-hidden
                 transition-shadow duration-300"
      style={cardGlass}
      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.boxShadow = cardHoverShadow}
      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = cardGlass.boxShadow as string}
    >
      {/* Top accent line */}
      <div
        aria-hidden
        className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${P.pink}80, ${P.violet}80, transparent)` }}
      />

      {/* Hover gradient wash */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(220deg, ${P.pink}0d, ${P.violet}08, transparent 60%)` }}
      />

      {/* Shine */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)" }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl select-none z-10
                   transition-transform duration-300 group-hover:scale-110"
        style={{ background: "rgba(160,48,200,0.15)" }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 z-10">
        <h3 className="text-xl font-bold tracking-tight" style={{ color: P.ink }}>{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: P.inkMid }}>{description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 z-10">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs rounded-full px-3 py-1"
            style={{ border: `1px solid ${P.border}`, color: P.inkLight, background: P.mutedFill }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <span
        className="inline-flex items-center gap-1 text-sm font-semibold mt-auto z-10 w-fit
                   transition-opacity hover:opacity-70"
        style={GRAD_TEXT}
      >
        See More
        <ArrowUpRight
          size={15}
          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
        />
      </span>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <section
      id="services"
      className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 flex flex-col gap-16
                 relative overflow-hidden scroll-mt-20"
      style={{ background: GRAD_SECTION_ALT }}
    >
      {/* Ambient blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full blur-[120px] opacity-18"
          style={{ background: `radial-gradient(circle, ${P.violet}, transparent 65%)` }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full blur-[100px] opacity-14"
          style={{ background: `radial-gradient(circle, ${P.pink}, transparent 65%)` }}
        />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3 max-w-xl relative z-10"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] w-fit border"
          style={labelLight}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: P.primary }} />
          What We Do
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: P.ink }}>
          Services built for{" "}
          <span style={GRAD_TEXT}>scale.</span>
        </h2>
        <p className="text-base sm:text-lg leading-relaxed" style={{ color: P.inkMid }}>
          End-to-end digital solutions for teams that want to own their stack —
          no lock-in, no compromises.
        </p>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </motion.div>

      {/* CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col sm:flex-row items-center gap-4"
      >
        <Link
          href="/service"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold
                     tracking-wide text-white transition-opacity hover:opacity-85"
          style={{ background: GRAD, boxShadow: `0 8px 28px -6px ${P.pink}50` }}
        >
          View All Services <ArrowUpRight size={14} />
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm" style={{ color: P.inkMid }}>
            Accepting new partnerships
          </span>
        </div>
      </motion.div>
    </section>
  );
}
