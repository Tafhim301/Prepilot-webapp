"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Globe, Zap, Shield, Heart, Users,
  Code2, Lightbulb, Award, Coffee,
} from "lucide-react";
import {
  P, GRAD, GRAD_TEXT, GRAD_H, GRAD_SECTION, GRAD_SECTION_ALT,
  cardGlass, cardDark, cardHoverShadow, labelLight, labelDark,
} from "@/lib/ds";

// ── Data ──────────────────────────────────────────────────────────────────────
const VALUES = [
  { icon: Shield,    title: "Full Ownership",         body: "We build on open-source. Every line of code belongs to you — no vendor lock-in, no hostage fees. Walk away with everything." },
  { icon: Zap,       title: "Speed Without Shortcuts", body: "Fast delivery doesn't mean cutting corners. Our processes are tuned for both velocity and craft — because clients deserve both." },
  { icon: Heart,     title: "Radical Transparency",   body: "You see every decision, every trade-off, every invoice line. Surprises belong in birthday parties, not development projects." },
  { icon: Globe,     title: "Global Perspective",     body: "With teams across the US and South Asia, we bring diverse thinking to every problem — and timezone overlap that actually works." },
  { icon: Lightbulb, title: "Curiosity First",        body: "We ask why before we ask how. The best solutions come from understanding the real problem, not just executing the brief." },
  { icon: Users,     title: "Long-term Partnership",  body: "We measure success in years, not sprints. Over half our revenue comes from clients we've worked with for three or more years." },
];

const TEAM = [
  { name: "Aryan Chowdhury", role: "Founder & CEO",     location: "Dhaka, BD",     bio: "10 years building enterprise products. Formerly at Automattic.",      emoji: "👨‍💻", color: "#8b3a2a" },
  { name: "Sarah Lin",       role: "Head of Design",    location: "New York, US",   bio: "Ex-Figma. Obsessed with the gap between beautiful and usable.",        emoji: "🎨",  color: "#9b4a28" },
  { name: "Marcus Webb",     role: "Lead Engineer",     location: "Sheridan, WY",   bio: "Open-source contributor. Builds things that don't break at 3am.",      emoji: "⚙️",  color: "#a85e26" },
  { name: "Priya Nair",      role: "Strategy Director", location: "Dhaka, BD",     bio: "Turns fuzzy briefs into clear roadmaps. MBA, ex-McKinsey.",            emoji: "📊",  color: "#7a3520" },
  { name: "James Okoye",     role: "Senior Developer",  location: "Remote",         bio: "Full-stack specialist. WordPress core contributor since 2018.",        emoji: "🔧",  color: "#6b4a2a" },
  { name: "Leila Hassan",    role: "Project Manager",   location: "Dhaka, BD",     bio: "Keeps 12 clients happy simultaneously. Certified in everything.",      emoji: "🗂️", color: "#8b5a30" },
];

const TIMELINE = [
  { year: "2015", title: "Founded in a co-working space",  body: "Started with two people, one laptop, and an irrational belief that agencies could be better." },
  { year: "2017", title: "First enterprise client",         body: "Landed a Fortune 500 engagement. Proved that small teams can punch far above their weight." },
  { year: "2019", title: "Opened Dhaka office",             body: "Built a world-class engineering team in Bangladesh — cutting costs for clients without cutting quality." },
  { year: "2021", title: "100th project delivered",         body: "Crossed a milestone. Celebrated quietly. Then immediately started project 101." },
  { year: "2023", title: "Google partnership",              body: "Selected to collaborate on Web Stories for WordPress, now installed 500,000+ times." },
  { year: "2025", title: "Today & beyond",                  body: "500+ projects, 12 countries, zero projects we're embarrassed by. The best work is still ahead." },
];

const STATS = [
  { value: "500+", label: "Projects delivered", icon: Code2  },
  { value: "12+",  label: "Years in business",  icon: Coffee },
  { value: "40+",  label: "Team members",        icon: Users  },
  { value: "98%",  label: "Client retention",    icon: Award  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function SectionLabel({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-5 border w-fit"
      style={dark ? labelDark : labelLight}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ background: dark ? P.amber : P.primary }}
      />
      {children}
    </div>
  );
}

function FadeIn({
  children, delay = 0, className = "", direction = "up",
}: {
  children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right";
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const initial =
    direction === "left"  ? { opacity: 0, x: -32 }
    : direction === "right" ? { opacity: 0, x:  32 }
    : { opacity: 0, y: 28 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────────
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y  = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const op = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[88vh] flex items-center overflow-hidden"
      style={{ background: `linear-gradient(160deg, #f8f5f0 0%, #f3ede4 45%, #ede5d6 100%)` }}
    >
      {/* Diagonal stripe texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.20]"
        style={{ backgroundImage: "repeating-linear-gradient(-18deg, transparent 0px, transparent 220px, oklch(0.78 0.04 54 / 0.7) 220px, oklch(0.78 0.04 54 / 0.7) 221px)" }}
      />

      {/* Ambient blobs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full blur-[120px] opacity-38"
          style={{ background: `radial-gradient(circle, ${P.amber}, transparent 65%)` }}
        />
        <div
          className="absolute bottom-[-15%] left-[-8%] w-[550px] h-[550px] rounded-full blur-[110px] opacity-30"
          style={{ background: `radial-gradient(circle, ${P.red}, transparent 65%)` }}
        />
      </motion.div>

      <motion.div
        style={{ opacity: op }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24 w-full"
      >
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SectionLabel>About DigiTreak</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.04]"
            style={{ color: P.ink }}
          >
            We build digital
            <br />
            products teams
            <br />
            <span style={GRAD_TEXT}>fully own.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mt-8 text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: P.inkMid }}
          >
            DigiTreak is a full-service digital agency built for ambitious brands. We design,
            build, and ship enterprise-grade web experiences — always on open-source, always
            yours to keep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white
                         transition-all duration-200 hover:opacity-85 hover:-translate-y-px"
              style={{ background: GRAD, boxShadow: `0 8px 28px -6px ${P.red}55` }}
            >
              Start a project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/#our-work"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border
                         transition-all duration-200 hover:bg-white/55 hover:-translate-y-px"
              style={{ borderColor: P.border, color: P.ink }}
            >
              See our work
            </Link>
          </motion.div>
        </div>

        {/* Floating stat chips — desktop only */}
        <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={cardGlass}
            >
              <s.icon className="w-4 h-4" style={{ color: P.primary }} />
              <div>
                <p className="text-lg font-extrabold leading-none" style={{ color: P.ink }}>{s.value}</p>
                <p className="text-[11px] mt-0.5" style={{ color: P.inkMid }}>{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Story() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10 relative overflow-hidden" style={{ background: P.darkBg }}>
      {/* Ambient glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-[130px] opacity-20"
          style={{ background: `radial-gradient(circle, ${P.amber}, transparent 65%)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">

          <FadeIn direction="left">
            <SectionLabel dark>Our Story</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: P.onDark }}>
              Built out of frustration
              <br />
              <span style={GRAD_TEXT}>with the status quo.</span>
            </h2>
            <div className="space-y-5 text-base leading-relaxed" style={{ color: P.onDarkMid }}>
              <p>
                We started DigiTreak in 2015 because we were tired of watching great companies
                get trapped inside bloated agency retainers and proprietary platforms they&apos;d
                never truly own.
              </p>
              <p>
                The web is fundamentally open. WordPress, React, Node — the best tools in the
                world are free. Yet somehow, &quot;digital transformation&quot; had become a synonym for
                expensive lock-in. We wanted to change that.
              </p>
              <p>
                So we built a studio around a single principle:{" "}
                <strong style={{ color: P.onDark }}>your digital infrastructure should be yours</strong>{" "}
                — fully owned, fully understood, and fully transferable the moment you want it to be.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl opacity-22" style={{ background: GRAD }} />
              <div
                className="relative rounded-3xl p-8 sm:p-10"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
              >
                <svg className="w-10 h-10 mb-6 opacity-45" fill="currentColor" viewBox="0 0 32 32" style={{ color: P.amber }}>
                  <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7c0-1.654 1.346-3 3-3V8zm16 0c-3.314 0-6 2.686-6 6v10h10V14h-7c0-1.654 1.346-3 3-3V8z" />
                </svg>
                <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8" style={{ color: P.onDark }}>
                  &quot;The best agencies don&apos;t just build for you — they build with you, and they
                  leave you better equipped than when they arrived.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0" style={{ background: GRAD }}>
                    👨‍💻
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: P.onDark }}>Aryan Chowdhury</p>
                    <p className="text-xs" style={{ color: P.onDarkMid }}>Founder & CEO, DigiTreak</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10" style={{ background: GRAD_SECTION_ALT }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <SectionLabel>What We Stand For</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: P.ink }}>
            Principles we actually
            <br />
            <span style={GRAD_TEXT}>live by.</span>
          </h2>
          <p className="mt-5 text-lg max-w-xl mx-auto leading-relaxed" style={{ color: P.inkMid }}>
            These aren&apos;t values from a branding workshop. They&apos;re the rules we&apos;ve broken
            enough times to know we shouldn&apos;t.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.22 }}
                className="group relative h-full flex flex-col gap-5 rounded-2xl p-7 overflow-hidden
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
                {/* Hover wash */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ background: `linear-gradient(220deg, ${P.amber}10, transparent 55%)` }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${P.primary}12` }}
                >
                  <v.icon className="w-5 h-5" style={{ color: P.primary }} />
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: P.ink }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: P.inkMid }}>{v.body}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10 overflow-hidden" style={{ background: GRAD_SECTION }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <SectionLabel>How We Got Here</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: P.ink }}>
            A decade of shipping
            <br />
            <span style={GRAD_TEXT}>things that matter.</span>
          </h2>
        </FadeIn>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[18px] lg:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: `linear-gradient(to bottom, transparent, ${P.amber}65, transparent)` }}
          />

          <div className="flex flex-col gap-0">
            {TIMELINE.map((item, i) => {
              const isRight = i % 2 === 0;
              return (
                <FadeIn key={item.year} delay={i * 0.08}>
                  <div
                    className={`relative flex items-center gap-8 py-8 flex-row ${
                      isRight ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    <div className={`flex-1 pl-12 lg:pl-0 ${isRight ? "lg:text-right lg:pr-12" : "lg:text-left lg:pl-12"}`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block max-w-sm rounded-2xl p-6 text-left"
                        style={cardGlass}
                      >
                        <span className="text-[11px] font-bold uppercase tracking-widest mb-2 block" style={{ color: P.amber }}>
                          {item.year}
                        </span>
                        <h3 className="text-base font-bold mb-1.5" style={{ color: P.ink }}>{item.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: P.inkMid }}>{item.body}</p>
                      </motion.div>
                    </div>

                    <div
                      className="absolute left-[18px] lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white flex-shrink-0 z-10"
                      style={{ background: GRAD, boxShadow: `0 0 0 4px ${P.amber}35` }}
                    />

                    <div className="flex-1 hidden lg:block" />
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10 relative overflow-hidden" style={{ background: P.darkBg }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[130px] opacity-18"
          style={{ background: `radial-gradient(ellipse, ${P.red}, transparent 70%)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn className="text-center mb-16">
          <SectionLabel dark>The Team</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: P.onDark }}>
            People who care
            <br />
            <span style={GRAD_TEXT}>about your success.</span>
          </h2>
          <p className="mt-5 text-lg max-w-xl mx-auto leading-relaxed" style={{ color: P.onDarkMid }}>
            40+ specialists across design, engineering, strategy, and delivery.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group relative flex flex-col gap-5 rounded-2xl p-7 overflow-hidden transition-shadow duration-300"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 48px rgba(0,0,0,0.35), 0 0 0 1px ${member.color}30`}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = "none"}
              >
                <div
                  aria-hidden
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${member.color}80, transparent)` }}
                />

                <div className="flex items-start justify-between">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${member.color}28`, border: `1px solid ${member.color}30` }}
                  >
                    {member.emoji}
                  </div>
                  <span
                    className="text-[10px] font-semibold px-3 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.07)", color: P.onDarkMid }}
                  >
                    {member.location}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base" style={{ color: P.onDark }}>{member.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-widest mt-0.5" style={{ color: member.color }}>
                    {member.role}
                  </p>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: P.onDarkMid }}>{member.bio}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-12 text-center">
          <p className="text-sm" style={{ color: P.onDarkMid }}>
            Plus 34 more specialists in design, QA, content, and infrastructure.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Offices() {
  const offices = [
    { city: "Sheridan", country: "United States", flag: "🇺🇸", address: "30 N Gould St Ste R, Sheridan, WY 82801",         phone: "+1 307 459 1578",    type: "Headquarters"  },
    { city: "Dhaka",    country: "Bangladesh",    flag: "🇧🇩", address: "House-2/1A, Post Office Road, Mirpur-11, Dhaka-1216", phone: "+880 9611 656798", type: "Engineering Hub" },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10" style={{ background: GRAD_SECTION_ALT }}>
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-14">
          <SectionLabel>Where We Work</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: P.ink }}>
            Two offices.
            <br />
            <span style={GRAD_TEXT}>One standard.</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {offices.map((office, i) => (
            <FadeIn key={office.city} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.22 }}
                className="rounded-2xl p-8 transition-shadow duration-300"
                style={cardGlass}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.boxShadow = cardHoverShadow}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.boxShadow = cardGlass.boxShadow as string}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-3xl">{office.flag}</span>
                    <h3 className="text-2xl font-bold mt-2" style={{ color: P.ink }}>{office.city}</h3>
                    <p className="text-sm" style={{ color: P.inkMid }}>{office.country}</p>
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: `${P.primary}10`, color: P.primary }}
                  >
                    {office.type}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed" style={{ color: P.inkMid }}>{office.address}</p>
                  <p className="text-sm font-semibold" style={{ color: P.ink }}>{office.phone}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10" style={{ background: GRAD_SECTION }}>
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div
            className="relative rounded-3xl p-10 sm:p-12 md:p-16 overflow-hidden text-center"
            style={{ background: P.darkBg, boxShadow: `0 32px 80px -16px rgba(0,0,0,0.4), 0 8px 24px -8px ${P.red}22` }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${P.red}30, transparent 55%)` }}
            />

            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: P.amber }}>
                Ready when you are
              </p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: P.onDark }}>
                Let&apos;s build something
                <br />
                <span style={GRAD_TEXT}>you&apos;re proud of.</span>
              </h2>
              <p className="text-lg leading-relaxed max-w-lg mx-auto mb-10" style={{ color: P.onDarkMid }}>
                Whether you have a fully scoped brief or just a vague idea, we&apos;ll help you
                find the right path forward. No pressure, no pitch.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold text-white
                             transition-all duration-200 hover:opacity-85 hover:-translate-y-px"
                  style={{ background: GRAD, boxShadow: `0 8px 28px -6px ${P.red}60` }}
                >
                  Start a conversation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold border
                             transition-all duration-200 hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.16)", color: P.onDarkMid }}
                >
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main>
      <Hero />
      <Story />
      <Values />
      <Timeline />
      <Team />
      <Offices />
      <CTA />
    </main>
  );
}
