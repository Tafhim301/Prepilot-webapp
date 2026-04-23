"use client";

import { Check, ArrowUpRight } from "lucide-react";
import { motion, cubicBezier } from "framer-motion";
import Link from "next/link";
import {
  P, GRAD, GRAD_TEXT, GRAD_SECTION,
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

const summaryText = [
  "Custom Web Development",
  "Front-end Development",
  "Back-end Development",
  "Full-stack Development",
  "E-commerce Solutions",
  "WordPress Development",
  "API Integrations",
  "Web Application",
  "Webflow Development",
  "E-commerce Development",
  "Web Interactions & Animations",
  "Technical Planning",
  "CMS Implementation",
  "Landing Page Development",
  "Hosting & Domain Setup",
  "Accessibility Audits",
  "Quality Assurance",
  "And More…",
];

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) } },
};

const listVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const listItemVariants = {
  hidden:  { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.28 } },
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
        style={{ background: `linear-gradient(90deg, transparent, ${P.amber}70, transparent)` }}
      />

      {/* Hover warm wash */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(220deg, ${P.amber}10, transparent 55%)` }}
      />

      {/* Shine */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl select-none z-10
                   transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${P.primary}0e` }}
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
            className="text-xs rounded-full px-3 py-1 transition-colors duration-200"
            style={{ border: `1px solid ${P.border}`, color: P.inkMid, background: "rgba(0,0,0,0.025)" }}
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
export default function ServicesPage() {
  return (
    <div
      className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 flex flex-col gap-16 relative overflow-hidden"
      style={{ background: GRAD_SECTION }}
    >
      {/* Ambient blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full blur-[110px] opacity-30"
          style={{ background: `radial-gradient(circle, ${P.amber}, transparent 65%)` }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[380px] h-[380px] rounded-full blur-[100px] opacity-24"
          style={{ background: `radial-gradient(circle, ${P.red}, transparent 65%)` }}
        />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
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

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: P.ink }}>
          Services built for{" "}
          <span style={GRAD_TEXT}>scale.</span>
        </h1>
        <p className="text-base sm:text-lg leading-relaxed" style={{ color: P.inkMid }}>
          End-to-end digital solutions for teams that want to own their stack —
          no lock-in, no compromises.
        </p>
      </motion.div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-10 items-start relative z-10">

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) }}
          className="lg:sticky lg:top-24 w-full lg:w-[300px] xl:w-[340px] flex-shrink-0
                     flex flex-col gap-6 rounded-2xl p-7 relative overflow-hidden"
          style={cardGlass}
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="absolute top-[-30%] right-[-20%] w-[200px] h-[200px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${P.amber}28, transparent 65%)`, filter: "blur(40px)" }}
          />

          {/* Shine */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.08) 50%, transparent 100%)" }}
          />

          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-3" style={{ color: P.ink }}>In Summary</h2>
            <p className="text-sm leading-relaxed" style={{ color: P.inkMid }}>
              We keep things neat behind the scenes — making it easy to update,
              maintain, and get the most out of your website.
            </p>
          </div>

          <motion.ul
            className="relative z-10 flex flex-col gap-2"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {summaryText.map((text) => (
              <motion.li
                key={text}
                variants={listItemVariants}
                className="flex items-center gap-2.5 group/item p-1 rounded-lg
                           hover:bg-black/[0.025] transition-colors cursor-default"
              >
                <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: P.mid }} strokeWidth={2.5} />
                <span
                  className="text-sm font-medium transition-colors group-hover/item:text-gray-950"
                  style={{ color: P.inkMid }}
                >
                  {text}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Accepting badge */}
          <div
            className="relative z-10 inline-flex flex-wrap items-center justify-center gap-2 rounded-full
                       px-4 py-2.5 text-xs font-medium w-fit mt-2
                       transition-all duration-200 hover:opacity-85 hover:-translate-y-px cursor-pointer"
            style={{ background: P.darkBg, color: "#f4f1ec", boxShadow: `0 6px 20px -4px rgba(0,0,0,0.4)` }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Accepting New Partnerships
            <Link
              href="/contact"
              className="font-semibold hover:opacity-75 transition-opacity inline-flex text-xs items-center gap-1"
            >
              Contact Us <ArrowUpRight size={12} />
            </Link>
          </div>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
