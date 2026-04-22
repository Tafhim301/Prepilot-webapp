"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Featured from "../Featured/Featured";

// ─── Design tokens (mirrors about page) ──────────────────────────────────────
const P = {
  page:      "#f4f1ec",
  ink:       "#1f1a14",
  inkMid:    "#7a6e62",
  primary:   "#4a3018",
  red:       "#8b3a2a",
  mid:       "#9b4a28",
  amber:     "#a85e26",
  border:    "rgba(0,0,0,0.08)",
} as const;

const GRAD = `linear-gradient(135deg, ${P.red} 0%, ${P.mid} 50%, ${P.amber} 100%)`;
const GRAD_TEXT = {
  backgroundImage: GRAD,
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center overflow-hidden w-full px-4 sm:px-8 md:px-12 lg:px-16 pb-16 sm:py-20"
      style={{ background: P.page }}
    >
      {/* ── Diagonal stripe texture (matches about page) ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-18deg, transparent 0px, transparent 220px, oklch(0.78 0.04 54 / 0.6) 220px, oklch(0.78 0.04 54 / 0.6) 221px)",
        }}
      />

      {/* ── Ambient gradient blobs (matches about page) ── */}
      <motion.div style={{ y: blobY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[110px] opacity-25"
          style={{ background: `radial-gradient(circle, ${P.amber}, transparent 65%)` }}
        />
        <div
          className="absolute bottom-[-15%] left-[-8%] w-[450px] h-[450px] rounded-full blur-[100px] opacity-18"
          style={{ background: `radial-gradient(circle, ${P.red}, transparent 65%)` }}
        />
      </motion.div>

      {/* ── Floating badges ── */}
      <div
        className="hidden md:flex absolute top-[28%] left-[4%] lg:left-[6%] items-center gap-2 rounded-full px-3 py-1.5 lg:px-4 lg:py-2 shadow-md text-xs lg:text-sm font-medium z-10 pointer-events-none select-none"
        style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(10px)" }}
      >
        <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-green-400 inline-block" />
        Alice
      </div>

      <div
        className="hidden md:flex absolute top-[48%] left-[10%] lg:left-[14%] items-center gap-2 rounded-full px-3 py-1.5 lg:px-4 lg:py-2 shadow-md text-xs lg:text-sm font-semibold z-10 pointer-events-none select-none"
        style={{ background: "#fde047" }}
      >
        <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-yellow-600 inline-block" />
        Client
      </div>

      <div
        className="hidden md:flex absolute top-[22%] right-[4%] lg:right-[8%] items-center gap-2 rounded-full px-3 py-1.5 lg:px-4 lg:py-2 shadow-md text-xs lg:text-sm font-medium z-10 pointer-events-none select-none"
        style={{ background: "#a78bfa", color: "#fff" }}
      >
        <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-white inline-block" />
        Dev Team
      </div>

      {/* ── Center content ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-center w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl z-10 flex flex-col items-center gap-4 sm:gap-6"
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm"
          style={{
            background: `${P.primary}0a`,
            border: `1px solid ${P.primary}20`,
            color: P.primary,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: P.primary }}
          />
          <span className="font-semibold">500+ Projects</span>
          <span style={{ color: P.inkMid }}>delivered to enterprise clients worldwide</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
          style={{ color: P.ink }}
        >
          Enterprise web built{" "}
          <span className="italic font-normal">&amp; owned</span>
          <br className="hidden sm:block" />
          {" "}
          <span style={GRAD_TEXT}>by your team, forever.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-lg md:max-w-2xl leading-relaxed"
          style={{ color: P.inkMid }}
        >
          We deliver full autonomy for marketing teams at global brands — secure,
          high-performance applications on open-source tech. Fully owned.
          Free from vendor lock-in. At a fraction of the TCO.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 w-full sm:w-auto"
        >
          <Link
            href="/#our-work"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-85"
            style={{
              background: GRAD,
              boxShadow: `0 8px 24px -6px ${P.red}50`,
            }}
          >
            OUR WORK{" "}
            <ArrowRight
              size={15}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>

       
        </motion.div>
      </motion.div>

      <Featured />
    </section>
  );
}