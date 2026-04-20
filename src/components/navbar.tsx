"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Phone,
  Contact2Icon,
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
  Star,
  Trophy,
  ChevronDown,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// ── Single source of truth ───────────────────────────────────────────────────
import projectsData from "@/data/projects.json";
import pricingData  from "@/data/pricing.json";
import type { Project }     from "@/types/projects.types";
import type { PricingData } from "@/types/pricing.types";

// ─── Design tokens (mirrors globals.css + Pricing / Services / OurWork) ──────
const P = {
  page:      "#f4f1ec",
  ink:       "#1f1a14",
  inkMid:    "#7a6e62",
  inkLight:  "#a89e94",
  card:      "#fdfcfb",
  border:    "rgba(0,0,0,0.08)",
  borderMid: "rgba(0,0,0,0.05)",
  mutedFill: "rgba(0,0,0,0.03)",
  primary:   "#4a3018",
  red:       "#8b3a2a",
  mid:       "#9b4a28",
  amber:     "#a85e26",
  darkBg:    "#1a1208",
  onDark:    "#f4f1ec",
  onDarkMid: "#c4bdb4",
  onDarkDim: "#7a7168",
} as const;

const GRAD = `linear-gradient(135deg, ${P.red} 0%, ${P.mid} 50%, ${P.amber} 100%)`;

// ─── Services data (matches ServicesSection.tsx tone) ────────────────────────

type ServicePreview = {
  icon: string;
  title: string;
  description: string;
  tags: string[];
};

const SERVICES_PREVIEW: ServicePreview[] = [
  { icon: "🎨", title: "Strategic UI/UX",       description: "User-centric interfaces that convert.",   tags: ["Figma", "Design Systems"]    },
  { icon: "⚛️", title: "MERN Stack",            description: "Full-stack JS apps, end to end.",         tags: ["React", "Node.js"]           },
  { icon: "🌐", title: "Custom Architecture",   description: "High-performance web applications.",      tags: ["Next.js", "GraphQL"]         },
  { icon: "🔷", title: "WordPress",              description: "Custom themes, plugins, headless CMS.",   tags: ["Gutenberg", "Headless"]      },
  { icon: "💧", title: "Webflow",                description: "Pixel-perfect builds, CMS, handoff.",     tags: ["CMS", "Interactions"]        },
  { icon: "🛒", title: "E-commerce",             description: "Storefronts built to sell and scale.",    tags: ["Shopify", "Stripe"]          },
];

const SERVICES_SUMMARY = [
  "Custom Web Development",
  "Full-stack Engineering",
  "API Integrations",
  "CMS Implementation",
  "Accessibility Audits",
  "Performance Optimization",
];

// ─── Derived data from JSON ──────────────────────────────────────────────────

const PROJECTS_PREVIEW = (projectsData as Project[]).slice(0, 4);
const PRICING_PREVIEW  = (pricingData  as PricingData).plans;
const FEATURED_ADDONS  = (pricingData  as PricingData).addons.slice(0, 3);

// ─── Smooth-scroll hook ──────────────────────────────────────────────────────

function useSmoothScroll() {
  const router   = useRouter();
  const pathname = usePathname();

  return useCallback(
    (sectionId: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      if (pathname === "/") {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(`/#${sectionId}`);
      }
    },
    [pathname, router]
  );
}

/**
 * Tracks which nav item is currently "active".
 *
 * For route-based items (/pricing, /about)   → match on pathname
 * For scroll-based items (#services, #our-work) → only active on the
 *   homepage AND when the corresponding section is in view.
 *
 * IntersectionObserver watches #services and #our-work with a rootMargin
 * that biases toward the section whose top has crossed the viewport mid.
 */
function useActiveSection(): string {
  const pathname = usePathname();
  const [active, setActive] = useState<string>("");

  // Sub-route / scroll-section detection
  useEffect(() => {
    // Non-home routes: active key is the first path segment
    if (pathname !== "/") {
      if (pathname.startsWith("/pricing"))  setActive("/pricing");
      else if (pathname.startsWith("/about"))    setActive("/about");
      else if (pathname.startsWith("/our-work")) setActive("#our-work");
      else if (pathname.startsWith("/contact"))  setActive("/contact");
      else setActive("");
      return;
    }

    // Homepage — observe the anchor sections
    setActive("/"); // default: Home

    const sectionIds = ["services", "our-work"];
    const elements   = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }
        // Pick the most-visible observed section (if it's meaningfully visible)
        let best: { id: string; ratio: number } | null = null;
        for (const [id, ratio] of visibility) {
          if (ratio > 0.25 && (!best || ratio > best.ratio)) {
            best = { id, ratio };
          }
        }
        setActive(best ? `#${best.id}` : "/");
      },
      {
        // Trigger when section occupies the middle band of viewport
        rootMargin: "-35% 0px -35% 0px",
        threshold:  [0, 0.25, 0.5, 0.75, 1],
      }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  return active;
}

// ─── Shared components ───────────────────────────────────────────────────────

function Label({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] w-fit"
      style={
        onDark
          ? { background: "rgba(255,255,255,0.06)", color: P.onDarkMid }
          : { background: `${P.primary}10`, color: P.primary, border: `1px solid ${P.primary}18` }
      }
    >
      <Sparkles className="w-2.5 h-2.5" style={{ color: onDark ? P.amber : P.primary }} />
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Panel · SERVICES — mini version of ServicesSection
// ═══════════════════════════════════════════════════════════════════════════

function ServicesPanel({ onClose }: { onClose: () => void }) {
  const smoothScroll = useSmoothScroll();

  return (
    <div className="flex h-full">
      {/* LEFT: dark intro + In Summary + Accepting badge */}
      <div
        className="w-[300px] flex-shrink-0 flex flex-col justify-between p-7 relative overflow-hidden"
        style={{ background: P.darkBg, borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 20% 0%, ${P.red}22 0%, transparent 55%)`,
          }}
        />

        <div className="relative z-10">
          <Label onDark>What We Do</Label>
          <h3 className="text-[24px] font-bold leading-[1.05] mt-4 mb-3" style={{ color: P.onDark }}>
            Services built
            <br />
            <span
              style={{
                backgroundImage: GRAD,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              for scale.
            </span>
          </h3>
          <p className="text-[12px] leading-relaxed mb-5" style={{ color: P.onDarkMid }}>
            End-to-end digital solutions for teams that want to own their stack — no lock-in, no compromises.
          </p>

          {/* In Summary list */}
          <p className="text-[9px] font-bold uppercase tracking-widest mb-2.5" style={{ color: P.onDarkDim }}>
            In Summary
          </p>
          <ul className="flex flex-col gap-1.5 mb-5">
            {SERVICES_SUMMARY.map((text) => (
              <li key={text} className="flex items-center gap-2">
                <Check className="w-3 h-3 flex-shrink-0" style={{ color: P.amber }} strokeWidth={2.75} />
                <span className="text-[11px]" style={{ color: P.onDarkMid }}>
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Accepting partnerships badge */}
        <div
          className="relative z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-medium w-fit"
          style={{ background: "rgba(255,255,255,0.05)", color: P.onDark, border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Accepting new partnerships
        </div>
      </div>

      {/* RIGHT: service grid */}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-center justify-between mb-3.5 px-1">
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: P.inkMid }}>
            Core Services
          </p>
          <Link
            href="/#services"
            onClick={(e) => { onClose(); smoothScroll("services")(e); }}
            className="group inline-flex items-center gap-1 text-[11px] font-semibold"
            style={{ color: P.amber }}
          >
            View all services
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2.5 flex-1">
          {SERVICES_PREVIEW.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/#services"
                onClick={(e) => { onClose(); smoothScroll("services")(e); }}
                className="group relative flex flex-col gap-2 p-3.5 rounded-xl border overflow-hidden h-full transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  borderColor: "rgba(255,255,255,0.7)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background  = "rgba(255,255,255,0.95)";
                  el.style.borderColor = `${P.amber}55`;
                  el.style.transform   = "translateY(-2px)";
                  el.style.boxShadow   = "0 10px 24px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background  = "rgba(255,255,255,0.55)";
                  el.style.borderColor = "rgba(255,255,255,0.7)";
                  el.style.transform   = "translateY(0)";
                  el.style.boxShadow   = "none";
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0 select-none"
                    style={{ background: `${P.primary}0d` }}
                  >
                    {s.icon}
                  </div>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{ color: P.primary }}
                  />
                </div>

                <div>
                  <p className="text-[13px] font-bold leading-tight tracking-tight" style={{ color: P.ink }}>
                    {s.title}
                  </p>
                  <p className="text-[11px] mt-1 leading-snug" style={{ color: P.inkMid }}>
                    {s.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 mt-auto">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-medium px-1.5 py-0.5 rounded-full border"
                      style={{ borderColor: P.border, color: P.inkMid, background: "rgba(0,0,0,0.02)" }}
                    >
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
// Panel · OUR WORK — mini version of ProjectsShowCase
// ═══════════════════════════════════════════════════════════════════════════

function OurWorkPanel({ onClose }: { onClose: () => void }) {
  const [hovered, setHovered] = useState<number>(0);
  const active = PROJECTS_PREVIEW[hovered];

  return (
    <div className="flex h-full">
      {/* LEFT: featured preview image + intro */}
      <div
        className="w-[340px] flex-shrink-0 flex flex-col p-6 relative overflow-hidden"
        style={{ background: P.darkBg, borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="relative z-10 mb-4">
          <Label onDark>Our Work</Label>
          <h3 className="text-[24px] font-bold leading-[1.05] mt-4 mb-2.5" style={{ color: P.onDark }}>
            Projects we&rsquo;re
            <br />
            <span
              style={{
                backgroundImage: GRAD,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              proud of.
            </span>
          </h3>
          <p className="text-[11px] leading-relaxed" style={{ color: P.onDarkMid }}>
            500+ projects for teams like Google, Grist, and Dealertrack.
          </p>
        </div>

        {/* Featured preview image */}
        <div
          className="relative rounded-xl overflow-hidden flex-1 min-h-0"
          style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1    }}
              exit ={{ opacity: 0, scale: 0.98  }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={active.featuredImage}
                alt={active.shortTitle}
                fill
                className="object-cover"
                sizes="340px"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(26,18,8,0.92) 0%, rgba(26,18,8,0.1) 45%, transparent 60%)" }}
              />

              {/* Awards tag if any */}
              {active.awards.length > 0 && (
                <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
                     style={{ background: "rgba(26,18,8,0.7)", backdropFilter: "blur(8px)" }}>
                  <Trophy className="w-2.5 h-2.5" style={{ color: P.amber }} />
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: P.onDark }}>
                    Award-winning
                  </span>
                </div>
              )}

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: P.amber }}>
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
          href="/our-work"
          onClick={onClose}
          className="group inline-flex items-center gap-1.5 text-[12px] font-semibold mt-4 w-fit"
          style={{ color: P.amber }}
        >
          View all projects
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* RIGHT: project list */}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-center justify-between mb-3.5 px-1">
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: P.inkMid }}>
            Featured Work
          </p>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${P.amber}15`, color: P.amber }}
          >
            {PROJECTS_PREVIEW.length} of 500+
          </span>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          {PROJECTS_PREVIEW.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/our-work/${p.slug}`}
                onClick={onClose}
                onMouseEnter={() => setHovered(i)}
                className="group flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-200"
                style={{
                  background:  hovered === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
                  borderColor: hovered === i ? `${P.amber}55`            : "rgba(255,255,255,0.7)",
                  transform:   hovered === i ? "translateX(4px)"         : "translateX(0)",
                  boxShadow:   hovered === i ? "0 6px 16px rgba(0,0,0,0.06)" : "none",
                }}
              >
                {/* Thumbnail */}
                <div className="w-16 h-11 rounded-md overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={p.coverImages[0]}
                    alt={p.shortTitle}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                {/* Meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p
                      className="text-[9px] font-bold uppercase tracking-[0.15em]"
                      style={{ color: P.amber }}
                    >
                      {p.client.name}
                    </p>
                    {p.awards.length > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-[9px]" style={{ color: P.inkLight }}>
                        <Star className="w-2 h-2" fill="currentColor" />
                        {p.awards.length}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] font-semibold leading-snug line-clamp-1" style={{ color: P.ink }}>
                    {p.shortTitle}
                  </p>
                  <p className="text-[10px] mt-0.5 truncate" style={{ color: P.inkMid }}>
                    {p.industry} · {p.solution}
                  </p>
                </div>

                <ArrowRight
                  className="w-3.5 h-3.5 flex-shrink-0 transition-all duration-200"
                  style={{
                    color:     hovered === i ? P.primary : P.inkLight,
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
// Panel · PRICING — mini version of Pricing section
// ═══════════════════════════════════════════════════════════════════════════

function PricingPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full">
      {/* LEFT: intro + addons */}
      <div
        className="w-[270px] flex-shrink-0 flex flex-col justify-between p-6 relative overflow-hidden"
        style={{ background: P.darkBg, borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 20% 0%, ${P.red}22 0%, transparent 55%)`,
          }}
        />

        <div className="relative z-10">
          <Label onDark>Pricing</Label>
          <h3 className="text-[24px] font-bold leading-[1.05] mt-4 mb-2.5" style={{ color: P.onDark }}>
            Simple, honest
            <br />
            <span
              style={{
                backgroundImage: GRAD,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              pricing.
            </span>
          </h3>
          <p className="text-[11px] leading-relaxed mb-5" style={{ color: P.onDarkMid }}>
            No setup fees. No lock-in. Save {pricingData.billing.annualDiscount}% when you bill yearly.
          </p>

          {/* Trust points */}
          <ul className="flex flex-col gap-1.5 mb-6">
            {["No setup fees", "Cancel anytime", "30-day money-back"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="w-3 h-3 flex-shrink-0" style={{ color: P.amber }} strokeWidth={2.75} />
                <span className="text-[11px]" style={{ color: P.onDarkMid }}>
                  {t}
                </span>
              </li>
            ))}
          </ul>

          {/* Popular addons */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: P.onDarkDim }}>
              Popular Add-ons
            </p>
            <div className="flex flex-col gap-1.5">
              {FEATURED_ADDONS.map((a) => (
                <div key={a.name} className="flex items-center justify-between gap-2 text-[10px]">
                  <span className="truncate" style={{ color: P.onDarkMid }}>{a.name}</span>
                  <span className="font-bold flex-shrink-0" style={{ color: P.amber }}>
                    +${a.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Link
          href="/pricing"
          onClick={onClose}
          className="group relative z-10 inline-flex items-center gap-1.5 text-[12px] font-semibold mt-4 w-fit"
          style={{ color: P.amber }}
        >
          Compare all plans
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* RIGHT: pricing cards */}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-center justify-between mb-3.5 px-1">
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: P.inkMid }}>
            Our Plans
          </p>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${P.amber}15`, color: P.amber }}
          >
            Save {pricingData.billing.annualDiscount}% yearly
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 flex-1">
          {PRICING_PREVIEW.map((plan, i) => {
            const topFeatures = plan.features.filter((f) => f.included).slice(0, 4);

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <Link
                  href="/pricing"
                  onClick={onClose}
                  className="group relative flex flex-col rounded-xl p-4 h-full overflow-hidden border transition-all duration-200"
                  style={
                    plan.highlight
                      ? {
                          background: P.darkBg,
                          borderColor: "rgba(255,255,255,0.08)",
                          boxShadow:   `0 12px 32px -10px ${P.red}50`,
                        }
                      : {
                          background: "rgba(255,255,255,0.55)",
                          borderColor: "rgba(255,255,255,0.7)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (plan.highlight) return;
                    const el = e.currentTarget as HTMLElement;
                    el.style.background  = "rgba(255,255,255,0.95)";
                    el.style.borderColor = `${P.amber}55`;
                    el.style.transform   = "translateY(-2px)";
                    el.style.boxShadow   = "0 10px 24px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    if (plan.highlight) return;
                    const el = e.currentTarget as HTMLElement;
                    el.style.background  = "rgba(255,255,255,0.55)";
                    el.style.borderColor = "rgba(255,255,255,0.7)";
                    el.style.transform   = "translateY(0)";
                    el.style.boxShadow   = "none";
                  }}
                >
                  {/* Highlighted glow */}
                  {plan.highlight && (
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${P.red}30, transparent 60%)`,
                      }}
                    />
                  )}

                  {/* Badge */}
                  {plan.badge && (
                    <span
                      className="absolute top-2.5 right-2.5 text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full z-10 inline-flex items-center gap-0.5"
                      style={
                        plan.highlight
                          ? { background: GRAD, color: "#fff", boxShadow: `0 4px 12px ${P.red}40` }
                          : { background: `${P.primary}14`, color: P.primary }
                      }
                    >
                      {plan.highlight && <Sparkles className="w-2 h-2" />}
                      {plan.badge}
                    </span>
                  )}

                  {/* Name + Price */}
                  <div className="relative z-10 mb-3">
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.15em]"
                      style={{ color: plan.highlight ? P.amber : P.primary }}
                    >
                      {plan.name}
                    </p>
                    <div className="flex items-baseline gap-0.5 mt-1.5">
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: plan.highlight ? P.onDarkMid : P.inkMid }}
                      >
                        $
                      </span>
                      <span
                        className="text-[24px] font-extrabold leading-none tracking-tight"
                        style={{ color: plan.highlight ? P.onDark : P.ink }}
                      >
                        {plan.monthlyPrice.toLocaleString()}
                      </span>
                      <span
                        className="text-[10px] font-medium ml-0.5"
                        style={{ color: plan.highlight ? P.onDarkMid : P.inkMid }}
                      >
                        /mo
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="relative z-10 flex flex-col gap-1.5 flex-1">
                    {topFeatures.map((f) => (
                      <li key={f.label} className="flex items-start gap-1.5">
                        <div
                          className="w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={plan.highlight ? { background: GRAD } : { background: `${P.primary}15` }}
                        >
                          <Check
                            strokeWidth={3}
                            className="w-1.5 h-1.5"
                            style={{ color: plan.highlight ? "#fff" : P.primary }}
                          />
                        </div>
                        <span
                          className="text-[10px] leading-snug line-clamp-1"
                          style={{ color: plan.highlight ? P.onDark : P.ink }}
                        >
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Mini CTA */}
                  <div
                    className="relative z-10 mt-3 pt-2.5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider"
                    style={{ borderTop: `1px solid ${plan.highlight ? "rgba(255,255,255,0.08)" : P.borderMid}` }}
                  >
                    <span style={{ color: plan.highlight ? P.amber : P.primary }}>{plan.cta}</span>
                    <ArrowRight
                      className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                      style={{ color: plan.highlight ? P.amber : P.primary }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Panel configuration
// ═══════════════════════════════════════════════════════════════════════════

type PanelKey = "services" | "our-work" | "pricing";

const PANEL_SIZE = { width: 920, height: 460 } as const;

const NAV_ITEMS: Array<{
  title: string;
  url: string;
  /** Key used to match against useActiveSection() — route path OR #anchor */
  activeKey: string;
  scrollTo?: string;
  panel?: PanelKey;
}> = [
  { title: "Home",     url: "/",           activeKey: "/"                                                     },
  { title: "Services", url: "/#services",  activeKey: "#services",  scrollTo: "services", panel: "services"  },
  { title: "Our Work", url: "/#our-work",  activeKey: "#our-work",  scrollTo: "our-work", panel: "our-work"  },
  { title: "Pricing",  url: "/pricing",    activeKey: "/pricing",                         panel: "pricing"   },
  { title: "About Us", url: "/about",      activeKey: "/about"                                                },
];

// ═══════════════════════════════════════════════════════════════════════════
// Main Navbar
// ═══════════════════════════════════════════════════════════════════════════

export function Navbar({ className }: { className?: string }) {
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  const closeTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const smoothScroll  = useSmoothScroll();
  const activeKey     = useActiveSection();

  const openPanel = useCallback((key: PanelKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActivePanel(key);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActivePanel(null), 180);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const closeNow = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActivePanel(null);
  }, []);

  return (
    <section
      className={cn(
        "py-4 px-10 sticky top-0 z-50 bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="w-full mx-auto">

        {/* ── Desktop nav ─────────────────────────────────────────────── */}
        <nav
          className="hidden lg:flex items-center justify-between px-6 py-2 rounded-lg border shadow-accent relative"
          onMouseLeave={scheduleClose}
        >
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 z-20" onClick={closeNow}>
            <p className="font-semibold text-sm tracking-tight" style={{ color: P.ink }}>PrePilot</p>
          </Link>

          {/* Links */}
          <div className="flex items-center">
            {NAV_ITEMS.map((item) => {
              const isActive      = activeKey === item.activeKey;
              const isPanelOpen   = activePanel === item.panel;
              // "Lit" — either we're on this page/section, or its panel is open
              const isLit         = isActive || isPanelOpen;

              if (item.panel) {
                return (
                  <div
                    key={item.title}
                    onMouseEnter={() => openPanel(item.panel!)}
                    className="relative"
                  >
                    {/*
                      CRITICAL: This is a <Link>, not a <button>.
                      — For scroll items (Services / Our Work), smoothScroll's
                        preventDefault handles the scroll when on homepage,
                        and falls through to Next.js navigation otherwise.
                      — For Pricing, no scrollTo is set, so clicking this
                        actually navigates to /pricing. (Previous bug: button
                        onClick only called closeNow() and had no href.)
                    */}
                    <Link
                      href={item.url}
                      onClick={(e) => {
                        closeNow();
                        if (item.scrollTo) smoothScroll(item.scrollTo)(e);
                      }}
                      className="relative inline-flex items-center gap-1 h-10 px-4 text-sm font-medium rounded-md transition-colors duration-150 hover:bg-muted"
                      style={{
                        color:      isLit ? P.ink : P.inkMid,
                        background: isActive ? `${P.primary}08` : "transparent",
                      }}
                    >
                      {item.title}
                      <ChevronDown
                        className="w-3 h-3 transition-transform duration-200"
                        style={{
                          transform: isPanelOpen ? "rotate(180deg)" : "rotate(0deg)",
                          opacity: 0.55,
                        }}
                      />
                      {/* Active indicator — underline bar under the link */}
                      <motion.span
                        aria-hidden
                        className="absolute -bottom-[6px] left-1/2 h-[2px] rounded-full -translate-x-1/2"
                        style={{ background: GRAD }}
                        animate={{
                          width:   isLit    ? 20 : 0,
                          opacity: isActive ? 1  : isPanelOpen ? 0.5 : 0,
                        }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={item.title}
                  href={item.url}
                  onMouseEnter={closeNow}
                  onClick={closeNow}
                  className="relative inline-flex items-center h-10 px-4 text-sm font-medium rounded-md transition-colors duration-150 hover:bg-muted"
                  style={{
                    color:      isActive ? P.ink : P.inkMid,
                    background: isActive ? `${P.primary}08` : "transparent",
                  }}
                >
                  {item.title}
                  <motion.span
                    aria-hidden
                    className="absolute -bottom-[6px] left-1/2 h-[2px] rounded-full -translate-x-1/2"
                    style={{ background: GRAD }}
                    animate={{
                      width:   isActive ? 20 : 0,
                      opacity: isActive ? 1  : 0,
                    }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <Button asChild className="rounded-sm flex-shrink-0 z-20">
            <Link href="/contact" onClick={closeNow}>
              <Phone className="w-3.5 h-3.5" /> Contact Us
            </Link>
          </Button>

          {/*
            MEGA POPOVER
            — Absolutely positioned relative to <nav>
            — left:50% + translateX(-50%) = always centered under navbar
              regardless of which trigger the user hovered
          */}
          <AnimatePresence>
            {activePanel && (
              <motion.div
                key="panel"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit ={{ opacity: 0, y: -6,  scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-40"
              >
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    width:                `${PANEL_SIZE.width}px`,
                    height:               `${PANEL_SIZE.height}px`,
                    background:           "rgba(250,248,245,0.94)",
                    backdropFilter:       "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border:               "1px solid rgba(255,255,255,0.9)",
                    boxShadow: `
                      0 32px 72px rgba(0,0,0,0.18),
                      0 6px 20px rgba(0,0,0,0.08),
                      0 0 0 1px rgba(0,0,0,0.04)
                    `,
                  }}
                >
                  {/* Top gradient accent line */}
                  <div
                    aria-hidden
                    className="absolute top-0 left-0 right-0 h-[2px] z-20"
                    style={{ background: GRAD }}
                  />

                  {/* Ambient orb */}
                  <div
                    aria-hidden
                    className="absolute pointer-events-none"
                    style={{
                      top:        "-25%",
                      right:      "-10%",
                      width:      "320px",
                      height:     "320px",
                      background: `radial-gradient(circle, ${P.amber}20, transparent 65%)`,
                      filter:     "blur(48px)",
                    }}
                  />

                  {/* Smooth panel transition */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePanel}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit ={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full"
                    >
                      {activePanel === "services" && <ServicesPanel onClose={closeNow} />}
                      {activePanel === "our-work" && <OurWorkPanel  onClose={closeNow} />}
                      {activePanel === "pricing"  && <PricingPanel  onClose={closeNow} />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* ── Mobile nav ──────────────────────────────────────────────── */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <p className="font-semibold tracking-tight" style={{ color: P.ink }}>PrePilot</p>
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
                    <Link href="/">
                      <p>PrePilot</p>
                    </Link>
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
                        key={item.title}
                        href={item.url}
                        className="text-base font-semibold py-1 inline-flex items-center gap-2"
                        style={{ color: isActive ? P.primary : P.ink }}
                      >
                        {isActive && (
                          <span
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: GRAD }}
                          />
                        )}
                        {item.title}
                      </Link>
                    );
                  })}

                  <Button asChild className="mt-2">
                    <Link href="/contact">
                      <Contact2Icon /> Contact Us
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Mobile accordion ───────────────────────────────────────────────────────

function MobileAccordion({
  title,
  panel,
  isActive = false,
}: {
  title: string;
  panel: PanelKey;
  isActive?: boolean;
}) {
  return (
    <AccordionItem value={title} className="border-b border-border/40 last:border-0">
      <AccordionTrigger
        className="text-base font-semibold hover:no-underline py-3"
        style={{ color: isActive ? P.primary : undefined }}
      >
        <span className="inline-flex items-center gap-2">
          {isActive && (
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: GRAD }}
            />
          )}
          {title}
        </span>
      </AccordionTrigger>
      <AccordionContent className="pt-2 pb-4">
        {panel === "services" && (
          <div className="flex flex-col gap-2">
            {SERVICES_PREVIEW.slice(0, 4).map((s) => (
              <Link
                key={s.title}
                href="/#services"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/60 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: `${P.primary}0d` }}
                >
                  {s.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: P.ink }}>{s.title}</p>
                  <p className="text-[11px]" style={{ color: P.inkMid }}>{s.description}</p>
                </div>
              </Link>
            ))}
            <Link href="/#services" className="text-xs font-semibold mt-2" style={{ color: P.amber }}>
              All services →
            </Link>
          </div>
        )}

        {panel === "our-work" && (
          <div className="flex flex-col gap-2">
            {PROJECTS_PREVIEW.map((p) => (
              <Link
                key={p.slug}
                href={`/our-work/${p.slug}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/60 transition-colors"
              >
                <div className="w-14 h-10 rounded-md overflow-hidden relative flex-shrink-0">
                  <Image src={p.coverImages[0]} alt={p.shortTitle} fill className="object-cover" sizes="56px" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: P.amber }}>
                    {p.client.name}
                  </p>
                  <p className="text-xs font-semibold truncate" style={{ color: P.ink }}>
                    {p.shortTitle}
                  </p>
                </div>
              </Link>
            ))}
            <Link href="/our-work" className="text-xs font-semibold mt-2" style={{ color: P.amber }}>
              View all projects →
            </Link>
          </div>
        )}

        {panel === "pricing" && (
          <div className="flex flex-col gap-2">
            {PRICING_PREVIEW.map((plan) => (
              <Link
                key={plan.id}
                href="/pricing"
                className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-muted/60 transition-colors border border-border/40"
              >
                <div>
                  <p className="text-xs font-semibold" style={{ color: P.ink }}>{plan.name}</p>
                  <p className="text-[10px]" style={{ color: P.inkMid }}>{plan.badge ?? "Plan"}</p>
                </div>
                <p className="text-sm font-extrabold" style={{ color: P.primary }}>
                  ${plan.monthlyPrice.toLocaleString()}/mo
                </p>
              </Link>
            ))}
            <Link href="/pricing" className="text-xs font-semibold mt-2" style={{ color: P.amber }}>
              Compare all plans →
            </Link>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}