/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, type ReactNode } from "react";
import {  usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, Phone, Contact2Icon, ArrowRight, ArrowUpRight,
  Check, Sparkles, Star, ChevronDown,
} from "lucide-react";

import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// ── Design system ────────────────────────────────────────────────────────────
import { P, GRAD, GRAD_TEXT, cardGlass, cardHoverShadow } from "@/lib/ds";
import Logo from "@/components/Logo";

// ── Data imports ─────────────────────────────────────────────────────────────
import projectsData from "@/data/projects.json";

import type { Project } from "@/types/projects.types";


// ─── Services data ────────────────────────────────────────────────────────────
type ServicePreview = { icon: string; title: string; description: string; tags: string[] };

const SERVICES_PREVIEW: ServicePreview[] = [
  { icon: "🎨", title: "Strategic UI/UX",    description: "User-centric interfaces that convert.",      tags: ["Figma", "Design Systems"] },
  { icon: "⚛️", title: "MERN Stack",         description: "Full-stack JS apps, end to end.",            tags: ["React", "Node.js"]        },
  { icon: "🌐", title: "Custom Architecture", description: "High-performance web applications.",         tags: ["Next.js", "GraphQL"]      },
  { icon: "🔷", title: "WordPress",           description: "Custom themes, plugins, headless CMS.",     tags: ["Gutenberg", "Headless"]   },
  { icon: "💧", title: "Webflow",             description: "Pixel-perfect builds, CMS, handoff.",       tags: ["CMS", "Interactions"]     },
  { icon: "🛒", title: "E-commerce",          description: "Storefronts built to sell and scale.",      tags: ["Shopify", "Stripe"]       },
];

const SERVICES_SUMMARY = [
  "Custom Web Development", "Front-end Development", "Back-end Development",
  "Full-stack Development", "E-commerce Solutions", "WordPress Development",
  "API Integrations", "Web Application", "Webflow Development",
  "E-commerce Development", "Web Interactions & Animations", "Technical Planning",
  "CMS Implementation", "Landing Page Development", "Hosting & Domain Setup",
  "Accessibility Audits", "Quality Assurance",
];

// ─── Derived data ────────────────────────────────────────────────────────────
const PROJECTS_PREVIEW = (projectsData as Project[]).slice(0, 4);


// ─── Smooth-scroll hook ──────────────────────────────────────────────────────


function useActiveSection(): string {
  const pathname = usePathname();
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (pathname !== "/") {
      if (pathname.startsWith("/pricing"))   setActive("/pricing");
      else if (pathname.startsWith("/about"))     setActive("/about");
      else if (pathname.startsWith("/our-work"))  setActive("/our-work");
      else if (pathname.startsWith("/service"))   setActive("/service");
      else if (pathname.startsWith("/contact"))   setActive("/contact");
      else setActive("");
      return;
    }

    setActive("/");
    const sectionIds = ["services", "our-work"];
    const elements   = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const visibility = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visibility.set(entry.target.id, entry.intersectionRatio);
        let best: { id: string; ratio: number } | null = null;
        for (const [id, ratio] of visibility) {
          if (ratio > 0.25 && (!best || ratio > best.ratio)) best = { id, ratio };
        }
        setActive(best ? `#${best.id}` : "/");
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  return active;
}

// ─── Shared label ────────────────────────────────────────────────────────────
function NavLabel({ children }: { children: ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] w-fit"
      style={{ background: "rgba(161,0,255,0.12)", color: "#d090f0", border: "1px solid rgba(161,0,255,0.22)" }}
    >
      <Sparkles className="w-2.5 h-2.5" style={{ color: P.purple }} />
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Panel · SERVICES
// ═══════════════════════════════════════════════════════════════════════════
function ServicesPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-85 shrink-0 flex flex-col p-8 relative overflow-hidden rounded-bl-2xl"
        style={{ background: P.darkBg, borderRight: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div
        className="absolute top-0 left-0 w-125 h-125 
        bg-linear-to-br from-[#6a00ff] via-[#a100ff] to-[#ff3c7e] 
        opacity-30 blur-[120px] pointer-events-none"
      />

        <div className="relative z-10 flex flex-col flex-1 min-h-0">
          <NavLabel>What We Do</NavLabel>
          <h3 className="text-[28px] font-bold leading-[1.05] mt-4 mb-3" style={{ color: P.onDark }}>
            Services built
            <br />
            <span style={{ ...GRAD_TEXT, fontStyle: "italic", fontWeight: 300 }}>for scale.</span>
          </h3>

          <p className="text-[10px] font-bold uppercase tracking-widest mb-3 shrink-0" style={{ color: P.onDarkDim }}>
            In Summary
          </p>
          <ul
            className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto pr-2"
            style={{ scrollbarWidth: "thin", scrollbarColor: `${P.purple}55 transparent` }}
          >
            {SERVICES_SUMMARY.map((text) => (
              <li key={text} className="flex rounded-xl px-2 py-1 cursor-default hover:bg-accent-foreground/20 items-center gap-2 shrink-0" style={{ color: P.onDarkMid }}>
                <Check className="w-3 h-3 shrink-0" style={{ color: P.purple }} strokeWidth={2.75} />
                <span className="text-sm font-mono font-bold ">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="relative z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium w-fit mt-4 shrink-0"
          style={{ background: "rgba(255,255,255,0.05)", color: P.onDark, border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Accepting new partnerships
        </div>
      </div>

      {/* Cards grid */}
      <div className="flex-1 flex flex-col p-6 min-h-0 relative">
        <div
        className="absolute -top-10 left-0 w-150 h-90 
        bg-linear-to-br from-[#6a00ff]/50 via-[#a100ff]/70 to-[#ff3c7e]/40 
        opacity-30 blur-[120px] pointer-events-none"
      />
        <div
        className="absolute -top-10 right-0 w-150 h-90 
        bg-linear-to-br from-[#6a00ff]/50 via-[#a100ff]/70 to-[#ff3c7e]/40
        opacity-30 blur-[120px] pointer-events-none"
      />
        
        <div className="flex items-center justify-between mb-4 px-1 shrink-0">
          <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: P.inkMid }}>Core Services</p>
          <Link
            href="/service"
            onClick={onClose}
            className="group inline-flex items-center gap-1 text-[12px] font-semibold"
            style={GRAD_TEXT}
          >
            View all services
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div
          className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto min-h-0 pr-1"
          style={{ scrollbarWidth: "thin", scrollbarColor: `${P.purple}55 transparent` }}
        >
          {SERVICES_PREVIEW.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/service"
                onClick={onClose}
                className="group relative flex flex-col gap-2.5 p-4 rounded-xl overflow-hidden h-full transition-all duration-200"
                style={{ ...cardGlass }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = cardHoverShadow;
                  el.style.transform = "translateY(-2px)";
                  el.style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = cardGlass.boxShadow as string;
                  el.style.transform = "translateY(0)";
                  el.style.background = cardGlass.background as string;
                }}
              >
                {/* Hover accent line */}
                <div aria-hidden className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${P.pink}80, ${P.violet}80, transparent)` }} />

                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0 select-none"
                    style={{ background: "rgba(161,0,255,0.15)" }}>
                    {s.icon}
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{ color: P.purple }}
                  />
                </div>

                <div>
                  <p className="text-[14px] font-bold leading-tight tracking-tight" style={{ color: P.ink }}>{s.title}</p>
                  <p className="text-[12px] mt-1 leading-snug" style={{ color: P.inkMid, fontFamily: "var(--font-space-mono), monospace" }}>{s.description}</p>
                </div>

                <div className="flex flex-wrap gap-1 mt-auto">
                  {s.tags.map((t) => (
                    <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ border: `1px solid ${P.border}`, color: P.inkMid, background: P.mutedFill }}>
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Panel · OUR WORK
// ═══════════════════════════════════════════════════════════════════════════
function OurWorkPanel({ onClose }: { onClose: () => void }) {
  const [hovered, setHovered] = useState<number>(0);
  const active = PROJECTS_PREVIEW[hovered];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className="w-85 shrink-0 flex flex-col p-6 relative overflow-hidden rounded-bl-2xl"
        style={{ background: P.darkBg, borderRight: "1px solid rgba(255,255,255,0.07)" }}
      >
       <div
        className="absolute top-0 left-0 w-125 h-125 
        bg-linear-to-br from-[#6a00ff] via-[#a100ff] to-[#ff3c7e] 
        opacity-30 blur-[120px] pointer-events-none"
      />

        <div className="relative z-10 mb-4">
          <NavLabel>Our Work</NavLabel>
          <h3 className="text-[28px] font-bold leading-[1.05] mt-4 mb-2.5" style={{ color: P.onDark }}>
            Projects we&rsquo;re
            <br />
            <span style={{ ...GRAD_TEXT, fontStyle: "italic", fontWeight: 300 }}>proud of.</span>
          </h3>
          <p className="text-[13px] leading-relaxed" style={{ color: P.onDarkMid, fontFamily: "var(--font-space-mono), monospace" }}>
            500+ projects for teams like Google, Grist, and Dealertrack.
          </p>
        </div>

        <div className="relative rounded-xl overflow-hidden flex-1 min-h-0"
          style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image src={active.featuredImage} alt={active.shortTitle} fill className="object-cover" sizes="340px" />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(8,6,9,0.92) 0%, rgba(8,6,9,0.1) 45%, transparent 60%)" }} />


              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: P.purple }}>
                  {active.client.name}
                </p>
                <p className="text-[13px] font-bold leading-tight line-clamp-2 mb-1.5" style={{ color: P.onDark }}>
                  {active.shortTitle}
                </p>
                <p className="text-[10px]" style={{ color: P.onDarkMid }}>
                  {active.industry} · {active.solution}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Link
          href="/our-work" onClick={onClose}
          className="group inline-flex items-center gap-1.5 text-[12px] font-semibold mt-4 w-fit"
          style={GRAD_TEXT}
        >
          View all projects <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Project list */}
      <div className="flex-1 flex flex-col p-5 relative">
         <div
        className="absolute top-0 right-0 w-125 h-125 
        bg-linear-to-br from-[#6a00ff] via-[#a100ff] to-[#ff3c7e] 
        opacity-30 blur-[120px] pointer-events-none"
      />
        <div
        className="absolute left-0 w-125 h-125 
        bg-linear-to-br from-[#6a00ff] via-[#a100ff] to-[#ff3c7e] 
        opacity-30 blur-[120px] pointer-events-none"
      />
        <div className="flex items-center justify-between mb-4 px-1">
          <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: P.inkMid }}>Featured Work</p>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
            style={{ background: "rgba(161,0,255,0.15)", color: P.purple }}>
            {PROJECTS_PREVIEW.length} of 500+
          </span>
        </div>

        <div className="flex flex-col gap-2.5 flex-1">
          {PROJECTS_PREVIEW.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/our-work/${p.slug}`} onClick={onClose}
                onMouseEnter={() => setHovered(i)}
                className="group flex items-center gap-3.5 p-3 rounded-xl transition-all duration-200"
                style={{
                  ...cardGlass,
                  background:    hovered === i ? "rgba(255,255,255,0.08)" : cardGlass.background as string,
                  boxShadow:     hovered === i ? cardHoverShadow : cardGlass.boxShadow as string,
                  transform:     hovered === i ? "translateX(4px)" : "translateX(0)",
                }}
              >
                <div className="w-18 h-12 rounded-md overflow-hidden shrink-0 relative" style={{ width: 72, height: 48 }}>
                  <Image src={p.coverImages[0]} alt={p.shortTitle} fill className="object-cover" sizes="72px" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: P.purple }}>
                      {p.client.name}
                    </p>
                    {p.awards.length > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-[10px]" style={{ color: P.inkLight }}>
                        <Star className="w-2 h-2" fill="currentColor" /> {p.awards.length}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] font-semibold leading-snug line-clamp-1" style={{ color: P.ink }}>
                    {p.shortTitle}
                  </p>
                  <p className="text-[11px] mt-0.5 truncate" style={{ color: P.inkMid }}>
                    {p.industry} · {p.solution}
                  </p>
                </div>

                <ArrowRight
                  className="w-4 h-4 shrink-0 transition-all duration-200"
                  style={{
                    color:     hovered === i ? P.purple : P.inkLight,
                    transform: hovered === i ? "translateX(2px)" : "translateX(0)",
                  }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}



// ═══════════════════════════════════════════════════════════════════════════
// Panel configuration
// ═══════════════════════════════════════════════════════════════════════════
type PanelKey = "services" | "our-work";

const PANEL_SIZE = { width: 1440, height: 540 } as const;

const NAV_ITEMS: Array<{
  title: string; url: string; activeKey: string; panel?: PanelKey;
}> = [
  { title: "Home",     url: "/",         activeKey: "/"         },
  { title: "Services", url: "/service",  activeKey: "/service",  panel: "services"  },
  { title: "Our Work", url: "/our-work", activeKey: "/our-work", panel: "our-work"  },
  { title: "Pricing",  url: "/pricing",  activeKey: "/pricing",  },
  { title: "About Us", url: "/about",    activeKey: "/about"    },
];

// ═══════════════════════════════════════════════════════════════════════════
// Main Navbar
// ═══════════════════════════════════════════════════════════════════════════
export function Navbar({ className }: { className?: string }) {
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  const activeKey    = useActiveSection();

  return (
    <>
      {/* keyframe for traveling light */}
      <style>{`@keyframes navTravelLight { 0% { left: -100px; } 100% { left: calc(100% + 100px); } }`}</style>

      <section
        className={cn("sticky top-0 z-50 w-full py-4 px-10 lg:flex justify-center shrink-0 mx-auto", className)}
        style={{
          background:          "rgba(13,11,20,0.92)",
          backdropFilter:      "blur(20px)",
          WebkitBackdropFilter:"blur(20px)",
          borderBottom:        "1px solid rgba(255,255,255,0.07)",
          boxShadow:           "0 1px 0 rgba(255,255,255,0.04), 0 4px 24px -4px rgba(0,0,0,0.4)",
        }}
      >
        {/* ── Desktop nav ────────────────────────────────────────── */}
        <div className="w-full relative lg:flex justify-center hidden bg-transparent backdrop-blur-sm">
          <div
     className="absolute right-0 w-125 h-30 
     bg-linear-to-bl from-[#6a00ff]/10 via-[#a100ff] to-[#ff3c7e]/90
     opacity-30 blur-[120px] pointer-events-none"
   />
          <div
     className="absolute -left-30 w-200 h-30 
     bg-linear-to-r from-[#6a00ff]/10 via-[#a100ff] to-[#ff3c7e]/90
     opacity-30 blur-[120px] pointer-events-none"
   />
          <div
            className="relative w-full max-w-5xl rounded-2xl p-[1.5px]"
            style={{
              background: GRAD,
              boxShadow: `0 0 0 1px rgba(161,0,255,0.2), 0 8px 32px -8px rgba(161,0,255,0.3)`,
            }}
          >
            {/* Traveling light */}
            <div aria-hidden className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-10">
              <div
                className="absolute"
                style={{
                  width: "100px", height: "4px", borderRadius: "999px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,1), rgba(255,255,255,0.6), transparent)",
                  filter: "blur(1.5px)",
                  animation: "navTravelLight 15s linear infinite",
                }}
              />
            </div>

            {/* Inner nav surface */}
            <nav
              className="relative flex items-center justify-between px-6 py-2 rounded-[14px]"
              style={{ background: P.darkBg, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
              onMouseLeave={() => setActivePanel(null)}
            >
              {/* Glows container */}
              <div className="absolute inset-0 rounded-[14px
              ] overflow-hidden pointer-events-none z-0">
                <div aria-hidden className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 40%, transparent 100%)" }} />
                <div aria-hidden className="absolute top-[-80%] right-[-5%] w-75 h-75 rounded-full"
                  style={{ background: `radial-gradient(circle, ${P.violet}18, transparent 65%)`, filter: "blur(40px)" }} />
                <div aria-hidden className="absolute top-[-80%] left-[-5%] w-50 h-50 rounded-full"
                  style={{ background: `radial-gradient(circle, ${P.pink}10, transparent 65%)`, filter: "blur(40px)" }} />
              </div>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 shrink-0 z-20" onClick={() => setActivePanel(null)}>
                <Logo />
              </Link>

              {/* Links */}
              <div className="flex items-center z-20">
                {NAV_ITEMS.map((item) => {
                  const isActive   = activeKey === item.activeKey;
                  const isPanelOpen = activePanel === item.panel;
                  const isLit      = isActive || isPanelOpen;

                  if (item.panel) {
                    return (
                      <div key={item.title} onMouseEnter={() => setActivePanel(item.panel!)} className="relative">
                        <Link
                          href={item.url}
                          onClick={() => setActivePanel(null)}
                          className="relative inline-flex items-center gap-1 h-10 px-4 text-sm font-medium rounded-md transition-colors duration-150 font-mono"
                          style={{
                            color:      isLit ? P.ink : P.inkMid,
                            background: isActive ? "rgba(161,0,255,0.10)" : isPanelOpen ? "rgba(255,255,255,0.04)" : "transparent",
                          }}
                          onMouseEnter={(e) => { if (!isActive && !isPanelOpen) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                          onMouseLeave={(e) => { if (!isActive && !isPanelOpen) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                        >
                          {item.title}
                          <ChevronDown className="w-3 h-3 transition-transform duration-200"
                            style={{ transform: isPanelOpen ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.55 }} />
                          <motion.span aria-hidden className="absolute -bottom-1.5 left-1/2 h-0.5 rounded-full -translate-x-1/2"
                            style={{ background: GRAD }}
                            animate={{ width: isLit ? 20 : 0, opacity: isActive ? 1 : isPanelOpen ? 0.5 : 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </Link>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.title} href={item.url}
                      onMouseEnter={(e) => { setActivePanel(null); if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                      onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                      onClick={() => setActivePanel(null)}
                      className="relative inline-flex items-center h-10 px-4 text-sm font-medium rounded-md transition-colors duration-150 font-mono"
                      style={{ color: isActive ? P.ink : P.inkMid, background: isActive ? "rgba(161,0,255,0.10)" : "transparent" }}
                    >
                      {item.title}
                      <motion.span aria-hidden className="absolute -bottom-1.5 left-1/2 h-0.5 rounded-full -translate-x-1/2"
                        style={{ background: GRAD }}
                        animate={{ width: isActive ? 20 : 0, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* CTA */}
              <Button asChild className="rounded-4xl py-5 px-8 shrink-0 z-20 font-medium">
                <Link href="/contact" onClick={() => setActivePanel(null)}>
                  <Phone className="w-3.5 h-3.5 " /> Contact Us
                </Link>
              </Button>

              {/* Mega popover */}
              <AnimatePresence>
                {activePanel && (
                  <motion.div
                    key="panel"
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-40"
                  >
                    {/* Invisible bridge */}
                    <div className="absolute top-4 left-0 w-full p-4 h-4 z-50" />

                    <div
                      className="relative rounded-b-2xl overflow-hidden"
                      style={{
                        width:              `${PANEL_SIZE.width}px`,
                        height:             `${PANEL_SIZE.height}px`,
                        background:         "rgba(13,11,20,0.97)",
                        backdropFilter:     "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        border:             "1px solid rgba(255,255,255,0.09)",
                        boxShadow:          "0 32px 72px rgba(0,0,0,0.55), 0 6px 20px rgba(0,0,0,0.3)",
                      }}
                    >
                      {/* Top gradient accent */}
                      <div aria-hidden className="absolute top-0 left-0 right-0 h-0.5 z-20"
                        style={{ background: GRAD }} />
                      {/* Ambient glow */}
                      <div aria-hidden className="absolute pointer-events-none"
                        style={{
                          top: "-25%", right: "-10%", width: "320px", height: "320px",
                          background: `radial-gradient(circle, ${P.violet}15, transparent 65%)`,
                          filter: "blur(60px)",
                        }}
                      />

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activePanel}
                          initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full"
                        >
                          {activePanel === "services"  && <ServicesPanel onClose={() => setActivePanel(null)} />}
                          {activePanel === "our-work"  && <OurWorkPanel  onClose={() => setActivePanel(null)} />}
                          
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>
          </div>
        </div>

        {/* ── Mobile nav ──────────────────────────────────────────── */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Logo  />
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/"><Logo/></Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 p-4 mt-2">
                  <Accordion type="single" collapsible className="flex w-full flex-col">
                    {NAV_ITEMS.filter((i) => i.panel).map((item) => (
                      <MobileAccordion
                        key={item.title}
                        title={item.title}
                        panel={item.panel!}
                        isActive={activeKey === item.activeKey}
                      />
                    ))}
                  </Accordion>

                  {NAV_ITEMS.filter((i) => !i.panel).map((item) => {
                    const isActive = activeKey === item.activeKey;
                    return (
                      <Link
                        key={item.title} href={item.url}
                        className="text-base font-semibold py-1 inline-flex items-center gap-2"
                        style={{ color: isActive ? P.purple : P.ink }}
                      >
                        {isActive && <span className="w-1 h-1 rounded-full shrink-0" style={{ background: GRAD }} />}
                        {item.title}
                      </Link>
                    );
                  })}

                  <Button asChild className="mt-2 p-5">
                    <Link href="/contact">
                      <Contact2Icon /> Contact Us
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Mobile accordion ───────────────────────────────────────────────────────
function MobileAccordion({
  title, panel, isActive = false,
}: {
  title: string; panel: PanelKey; isActive?: boolean;
}) {
  return (
    <AccordionItem value={title} className="border-b border-border/40 last:border-0">
      <AccordionTrigger
        className="text-base font-semibold hover:no-underline py-3"
        style={{ color: isActive ? P.purple : undefined }}
      >
        <span className="inline-flex items-center gap-2">
          {isActive && <span className="w-1 h-1 rounded-full shrink-0" style={{ background: GRAD }} />}
          {title}
        </span>
      </AccordionTrigger>

      <AccordionContent className="pt-2 pb-4">
        {panel === "services" && (
          <div className="flex flex-col gap-2">
            {SERVICES_PREVIEW.slice(0, 4).map((s) => (
              <Link
                key={s.title} href="/service"
                className="flex items-center gap-3 p-2 rounded-lg transition-colors"
                style={{ background: "rgba(255,255,255,0.03)" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"}
              >
                <div className="w-8 h-8 rounded-md flex items-center justify-center text-base shrink-0"
                  style={{ background: "rgba(161,0,255,0.15)" }}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: P.ink }}>{s.title}</p>
                  <p className="text-[11px]" style={{ color: P.inkMid }}>{s.description}</p>
                </div>
              </Link>
            ))}
            <Link href="/service" className="text-sm font-semibold mt-2" style={GRAD_TEXT}>
              All services →
            </Link>
          </div>
        )}

        {panel === "our-work" && (
          <div className="flex flex-col gap-2">
            {PROJECTS_PREVIEW.map((p) => (
              <Link
                key={p.slug} href={`/our-work/${p.slug}`}
                className="flex items-center gap-3 p-2 rounded-lg transition-colors"
                style={{ background: "rgba(255,255,255,0.03)" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"}
              >
                <div className="w-14 h-10 rounded-md overflow-hidden relative shrink-0">
                  <Image src={p.coverImages[0]} alt={p.shortTitle} fill className="object-cover" sizes="56px" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: P.purple }}>
                    {p.client.name}
                  </p>
                  <p className="text-xs font-semibold truncate" style={{ color: P.ink }}>{p.shortTitle}</p>
                </div>
              </Link>
            ))}
            <Link href="/our-work" className="text-sm font-semibold mt-2" style={GRAD_TEXT}>
              View all projects →
            </Link>
          </div>
        )}

       
      </AccordionContent>
    </AccordionItem>
  );
}
