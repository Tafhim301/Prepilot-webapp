"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { P, GRAD, GRAD_TEXT, labelLight } from "@/lib/ds";

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-[92vh] flex flex-col items-center justify-center
                 px-4 sm:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16 overflow-hidden"
      style={{ background: P.page }}
    >
      {/* ── Ambient glow blobs ─────────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full blur-[130px] opacity-20"
          style={{ background: `radial-gradient(circle, ${P.violet}, transparent 65%)` }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full blur-[120px] opacity-18"
          style={{ background: `radial-gradient(circle, ${P.pink}, transparent 65%)` }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[140px] opacity-7"
          style={{ background: `radial-gradient(ellipse, ${P.purple}, transparent 70%)` }}
        />
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-7">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold
                     uppercase tracking-[0.18em] border"
          style={labelLight}
        >
          <Sparkles size={10} />
          Enterprise Web — Built to Own
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08]"
          style={{ color: P.ink }}
        >
          Digital products
          <br />
          built{" "}
          <span style={GRAD_TEXT}>to scale.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="text-lg sm:text-xl leading-relaxed max-w-2xl"
          style={{ color: P.inkMid }}
        >
          Full-service digital agency delivering enterprise-grade web experiences
          on open-source tech. Full ownership. No lock-in. Since 2015.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="flex flex-col sm:flex-row gap-3 mt-2"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl
                       text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-85"
            style={{ background: GRAD, boxShadow: `0 8px 28px -6px ${P.pink}55` }}
          >
            Start a Project
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/our-work"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl
                       text-sm font-bold tracking-wide transition-all hover:bg-white/5"
            style={{ color: P.inkMid, border: `1px solid ${P.border}` }}
          >
            View Our Work
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="flex items-center gap-8 pt-4"
        >
          {[
            { value: "500+", label: "Projects"     },
            { value: "12+",  label: "Years"        },
            { value: "98%",  label: "Satisfaction" },
          ].map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              {i > 0 && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-6"
                  style={{ background: P.border }}
                />
              )}
              <span className="text-xl font-extrabold" style={GRAD_TEXT}>{s.value}</span>
              <span className="text-xs" style={{ color: P.inkLight }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${P.page})` }}
      />
    </section>
  );
}
