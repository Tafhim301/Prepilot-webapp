"use client";

import { Check, ArrowUpRight } from "lucide-react";
import { motion, cubicBezier } from "framer-motion";
import Link from "next/link";

// ─── Design tokens ────────────────────────────────────────────────────────────
const P = {
  page:    "#f4f1ec",
  ink:     "#1f1a14",
  inkMid:  "#7a6e62",
  primary: "#4a3018",
  red:     "#8b3a2a",
  mid:     "#9b4a28",
  amber:   "#a85e26",
  darkBg:  "#1a1208",
  border:  "rgba(0,0,0,0.08)",
} as const;

const GRAD = `linear-gradient(135deg, ${P.red} 0%, ${P.mid} 50%, ${P.amber} 100%)`;
const GRAD_TEXT = {
  backgroundImage:        GRAD,
  WebkitBackgroundClip:  "text" as const,
  WebkitTextFillColor:   "transparent" as const,
  backgroundClip:        "text" as const,
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: "🎨",
    title: "Strategic UI/UX Design",
    description: "User-centric interfaces that optimize conversion rates and drive meaningful engagement.",
    tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
    href: "#",
  },
  {
    icon: "⚛️",
    title: "MERN Stack Development",
    description: "Full-stack JavaScript applications built with MongoDB, Express, React, and Node.js.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    href: "#",
  },
  {
    icon: "🌐",
    title: "Custom Web Architecture",
    description: "Secure, high-performance web applications tailored to complex business logic.",
    tags: ["Next.js", "React", "Node.js", "REST & GraphQL"],
    href: "#",
  },
  {
    icon: "🔷",
    title: "WordPress Development",
    description: "Custom themes, plugins, and headless WordPress setups for content-driven sites.",
    tags: ["Custom Themes", "Plugins", "WooCommerce", "Headless CMS"],
    href: "#",
  },
  {
    icon: "💧",
    title: "Webflow Development",
    description: "Pixel-perfect Webflow builds with CMS, animations, and full client handoff.",
    tags: ["Webflow CMS", "Interactions", "E-commerce", "SEO"],
    href: "#",
  },
  {
    icon: "🛒",
    title: "E-commerce Solutions",
    description: "Conversion-optimized storefronts with seamless checkout and payment integrations.",
    tags: ["Shopify", "WooCommerce", "Stripe", "Headless"],
    href: "#",
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

];

// ─── Variants ─────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:   { opacity: 0, y: 32 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) } },
};

const listVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.04 } },
};

const listItemVariants = {
  hidden:   { opacity: 0, x: -12 },
  visible:  { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

// ─── ServiceCard ──────────────────────────────────────────────────────────────
function ServiceCard({
  icon, title, description, tags, href,
}: {
  icon: string; title: string; description: string; tags: string[]; href: string;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col gap-5 rounded-2xl p-7 cursor-pointer overflow-hidden"
      style={{
        background:     "rgba(255,255,255,0.6)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border:         "1px solid rgba(255,255,255,0.85)",
        boxShadow:      "0 2px 16px rgba(0,0,0,0.05)",
      }}
    >
      {/* Hover gradient wash */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${P.amber}09, transparent 60%)` }}
      />

      {/* Shine */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
        }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl select-none z-10"
        style={{ background: `${P.primary}0d` }}
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
            className="text-xs rounded-full px-3 py-1 transition-colors"
            style={{
              border:     `1px solid ${P.border}`,
              color:      P.inkMid,
              background: "rgba(0,0,0,0.02)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={href}
        className="inline-flex items-center gap-1 text-sm font-semibold mt-auto z-10 w-fit transition-opacity hover:opacity-75"
        style={GRAD_TEXT}
      >
        See More
        <motion.span
          className="inline-flex"
          whileHover={{ x: 2, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUpRight size={15} />
        </motion.span>
      </a>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <section
      id="services"
      className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-16 flex flex-col gap-16 scroll-mt-20"
      style={{ background: P.page }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3 max-w-xl"
      >
        {/* Label pill */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] w-fit border"
          style={{
            background:   `${P.primary}0a`,
            borderColor:  `${P.primary}20`,
            color:        P.primary,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: P.primary }}
          />
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

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">

        {/* ── Sidebar ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) }}
          className="lg:sticky lg:top-24 w-full lg:w-[300px] xl:w-[340px] flex-shrink-0 flex flex-col gap-6 rounded-2xl p-7 overflow-hidden relative"
          style={{
            background:     "rgba(255,255,255,0.5)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border:         "1px solid rgba(255,255,255,0.85)",
            boxShadow:      "0 2px 16px rgba(0,0,0,0.05)",
          }}
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="absolute top-[-30%] right-[-20%] w-[220px] h-[220px] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${P.amber}20, transparent 65%)`,
              filter:     "blur(40px)",
            }}
          />

          {/* Shine */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
            }}
          />

          <div className="relative z-10">
            <h3 className="text-2xl font-semibold mb-3" style={{ color: P.ink }}>In Summary</h3>
            <p className="text-sm leading-relaxed" style={{ color: P.inkMid }}>
              We keep things neat behind the scenes — making it easy to update,
              maintain and get the most out of your website.
            </p>
          </div>

          <motion.ul
            className="relative z-10 flex flex-col gap-2"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {summaryText.map((text, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                className="flex items-center gap-2.5 group/item hover:cursor-pointer p-1 rounded-xl transition-colors  shadow-sm hover:shadow-md"
              >
                <Check className="w-4 h-4 shrink-0" style={{ color: P.mid }} />
                <p
                  className="text-sm font-medium  transition-colors hover:text-gray-950 group-hover/item:text-gray-950"
                  style={{ color: P.inkMid }}
                >
                  {text}
                </p>
              </motion.li>
            ))}
          </motion.ul>

          {/* Accepting badge */}
          <div
            className="relative z-10 flex flex-wrap items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-medium w-fit mt-2 hover:shadow-xl transition-opacity hover:opacity-85"
            style={{ background: P.darkBg, color: "#f4f1ec" }}
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

        {/* ── Cards grid ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}