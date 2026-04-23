"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Featured from "../Featured/Featured";
import { P, GRAD, GRAD_TEXT } from "@/lib/ds";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center overflow-hidden w-full
                 px-4 sm:px-8 md:px-12 lg:px-16 pt-16 pb-12 sm:pt-24 sm:pb-16"
      style={{
        background: `linear-gradient(160deg, #f8f5f0 0%, #f3ede4 45%, #ede5d6 100%)`,
      }}
    >
      {/* Diagonal stripe texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.22]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-18deg, transparent 0px, transparent 220px, oklch(0.78 0.04 54 / 0.7) 220px, oklch(0.78 0.04 54 / 0.7) 221px)",
        }}
      />

      {/* Ambient gradient blobs — more visible */}
      <motion.div style={{ y: blobY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-12%] right-[-6%] w-[580px] h-[580px] rounded-full blur-[100px] opacity-40"
          style={{ background: `radial-gradient(circle, ${P.amber}, transparent 65%)` }}
        />
        <div
          className="absolute bottom-[-18%] left-[-10%] w-[480px] h-[480px] rounded-full blur-[90px] opacity-35"
          style={{ background: `radial-gradient(circle, ${P.red}, transparent 65%)` }}
        />
        <div
          className="absolute top-[30%] left-[30%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
          style={{ background: `radial-gradient(circle, ${P.mid}, transparent 65%)` }}
        />
      </motion.div>

      {/* Floating status badges — desktop only */}
      <div
        className="hidden lg:flex absolute top-[26%] left-[4%] lg:left-[6%] items-center gap-2
                   rounded-full px-3 py-1.5 lg:px-4 lg:py-2 shadow-lg text-xs lg:text-sm font-medium z-10
                   pointer-events-none select-none border border-white/60"
        style={{ background: "rgba(255,255,255,0.80)", backdropFilter: "blur(12px)" }}
      >
        <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
        Alice
      </div>

      <div
        className="hidden md:flex absolute top-[48%] left-[9%] lg:left-[13%] items-center gap-2
                   rounded-full px-3 py-1.5 lg:px-4 lg:py-2 shadow-lg text-xs lg:text-sm font-semibold z-10
                   pointer-events-none select-none"
        style={{ background: "#fde047" }}
      >
        <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-yellow-600 inline-block" />
        Client
      </div>

      <div
        className="hidden md:flex absolute top-[20%] right-[4%] lg:right-[7%] items-center gap-2
                   rounded-full px-3 py-1.5 lg:px-4 lg:py-2 shadow-lg text-xs lg:text-sm font-medium z-10
                   pointer-events-none select-none"
        style={{ background: "#a78bfa", color: "#fff" }}
      >
        <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-white inline-block" />
        Dev Team
      </div>

      {/* Centre content */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-center w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl z-10
                   flex flex-col items-center gap-5 sm:gap-6"
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex flex-wrap justify-center items-center gap-1.5 sm:gap-2
                     rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm border"
          style={{
            background: `${P.primary}0d`,
            borderColor: `${P.primary}22`,
            color: P.primary,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: P.primary }} />
          <span className="font-semibold">500+ Projects</span>
          <span style={{ color: P.inkMid }}>delivered to enterprise clients worldwide</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
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
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-lg md:max-w-2xl leading-relaxed"
          style={{ color: P.inkMid }}
        >
          We deliver full autonomy for marketing teams at global brands — secure,
          high-performance applications on open-source tech. Fully owned. Free from
          vendor lock-in. At a fraction of the TCO.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-1 w-full sm:w-auto"
        >
          <Link
            href="/#our-work"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2
                       px-7 py-3.5 rounded-full text-sm font-bold text-white
                       transition-all duration-200 hover:opacity-85 hover:-translate-y-px"
            style={{
              background: GRAD,
              boxShadow: `0 8px 28px -6px ${P.red}55`,
            }}
          >
            Our Work
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/contact"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2
                       px-7 py-3.5 rounded-full text-sm font-semibold border
                       transition-all duration-200 hover:bg-white/60 hover:-translate-y-px"
            style={{ borderColor: P.border, color: P.ink }}
          >
            Start a Project
          </Link>
        </motion.div>
      </motion.div>

      <Featured />
    </section>
  );
}
