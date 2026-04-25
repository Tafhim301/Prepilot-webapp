"use client";

import { Check, ArrowUpRight } from "lucide-react";
import { motion, cubicBezier } from "framer-motion";
import Link from "next/link";
import {
  P, GRAD, GRAD_TEXT, GRAD_SECTION_SERVICE,
  cardGlass, cardHoverShadow, labelLight,
} from "@/lib/ds";

const services = [
  { icon: "🎨", title: "Strategic UI/UX Design",   description: "User-centric interfaces that optimise conversion rates and drive meaningful engagement.", tags: ["Figma", "Prototyping", "User Research", "Design Systems"] },
  { icon: "⚛️", title: "MERN Stack Development",   description: "Full-stack JavaScript applications built with MongoDB, Express, React, and Node.js.",    tags: ["MongoDB", "Express", "React", "Node.js"] },
  { icon: "🌐", title: "Custom Web Architecture",  description: "Secure, high-performance web applications tailored to complex business logic.",           tags: ["Next.js", "React", "Node.js", "GraphQL"] },
  { icon: "🔷", title: "WordPress Development",    description: "Custom themes, plugins, and headless WordPress setups for content-driven sites.",          tags: ["Custom Themes", "Plugins", "WooCommerce", "Headless CMS"] },
  { icon: "💧", title: "Webflow Development",      description: "Pixel-perfect Webflow builds with CMS, animations, and full client handoff.",              tags: ["Webflow CMS", "Interactions", "E-commerce", "SEO"] },
  { icon: "🛒", title: "E-commerce Solutions",     description: "Conversion-optimised storefronts with seamless checkout and payment integrations.",        tags: ["Shopify", "WooCommerce", "Stripe", "Headless"] },
];

const summaryText = [
  "Custom Web Development", "Front-end Development", "Back-end Development", "Full-stack Development",
  "E-commerce Solutions", "WordPress Development", "API Integrations", "Web Application",
  "Webflow Development", "E-commerce Development", "Web Interactions & Animations",
  "Technical Planning", "CMS Implementation", "Landing Page Development",
  "Hosting & Domain Setup", "Accessibility Audits", "Quality Assurance", "And More…",
];

const ease = cubicBezier(0.22, 1, 0.36, 1);
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const cardVariants = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };
const listVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } };
const listItemVariants = { hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.28 } } };

function ServiceCard({ icon, title, description, tags }: { icon: string; title: string; description: string; tags: string[] }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22 }}
      className="group relative flex flex-col gap-5 rounded-2xl p-7 cursor-pointer overflow-hidden transition-shadow duration-300"
      style={cardGlass}
      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.boxShadow = cardHoverShadow}
      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = cardGlass.boxShadow as string}
    >
      <div aria-hidden className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${P.pink}80, ${P.violet}80, transparent)` }} />
        <div
        className="absolute top-0 right-0 w-90 h-30 
        bg-linear-to-bl from-[#6a00ff] via-[#a100ff] to-[#ff3c7e] 
        opacity-30 blur-[120px] pointer-events-none"
      />
  
      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl select-none z-10 transition-transform duration-300 group-hover:scale-110"
        style={{ background: "rgba(161,0,255,0.15)" }}>{icon}</div>
      <div className="flex flex-col gap-10 z-10">
        <h3 className="text-xl font-bold tracking-tight" style={{ color: P.ink }}>{title}</h3>
        <p className="text-base leading-relaxed" style={{ color: P.inkMid }}>{description}</p>
      </div>
      <div className="flex flex-wrap gap-2 z-10">
        {tags.map((tag) => (
          <span key={tag} className="text-xs rounded-full px-3 py-1 shadow-lg  transition-colors duration-200"
            style={{ border: `1px solid ${P.primary}`, background: P.darkBg }}>{tag}</span>
        ))}
      </div>
      
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 flex flex-col gap-16 relative overflow-hidden"
      style={{ background: GRAD_SECTION_SERVICE }}>
      <div
        className="absolute top-0 left-0 w-125 h-80 
        bg-linear-to-br from-[#6a00ff] via-[#a100ff] to-[#ff3c7e] 
        opacity-30 blur-[120px] pointer-events-none"
      />

      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="flex flex-col gap-3 max-w-xl relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] w-fit border" style={labelLight}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: P.primary }} /> What We Do
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: P.ink }}>
          Services built for <span style={GRAD_TEXT}>scale.</span>
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed" style={{ color: P.inkMid }}>
          End-to-end digital solutions for teams that want to own their stack — no lock-in, no compromises.
        </p>
      </motion.div>

     <div className="grid lg:grid-cols-[320px_1fr] gap-10 items-stretch">
        {/* Sidebar */}
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease }}
          className="lg:sticky lg:top-24 w-full h-full lg:w-75 xl:w-85 shrink-0 flex flex-col gap-6 rounded-2xl p-7 relative overflow-hidden"
          style={cardGlass}>
          <div aria-hidden className="absolute top-[-30%] right-[-20%] w-50 h-50 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${P.purple}28, transparent 65%)`, filter: "blur(40px)" }} />
          <div aria-hidden className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)" }} />
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-3" style={{ color: P.ink }}>In Summary</h2>
            <p className="text-base leading-relaxed" style={{ color: P.inkMid }}>
              We keep things neat behind the scenes — making it easy to update, maintain, and get the most out of your website.
            </p>
          </div>
          <motion.ul className="relative z-10 flex flex-col gap-2.5" variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {summaryText.map((text) => (
              <motion.li key={text} variants={listItemVariants}
                className="flex items-center gap-2.5 group/item p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-default">
                <Check className="w-4 h-4 shrink-0" style={{ color: P.purple }} strokeWidth={2.5} />
                <span className="text-base font-medium transition-colors group-hover/item:text-white/90" style={{ color: P.inkMid }}>{text}</span>
              </motion.li>
            ))}
          </motion.ul>
          <div className="relative z-10 inline-flex flex-wrap items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium w-fit mt-2 transition-all duration-200 hover:opacity-85 hover:-translate-y-px cursor-pointer"
            style={{ background: GRAD, color: "#fff", boxShadow: `0 6px 20px -4px ${P.pink}50` }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Accepting New Partnerships
            <Link href="/contact" className="font-semibold hover:opacity-75 transition-opacity inline-flex text-xs items-center gap-1">
              Contact Us <ArrowUpRight size={12} />
            </Link>
          </div>
        </motion.div>

        {/* Cards grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1 h-full" variants={containerVariants} initial="hidden" animate="visible">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
