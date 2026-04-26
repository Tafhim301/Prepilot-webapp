"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Zap, Globe, ShoppingCart, Layers, PhoneCall, Play } from "lucide-react";
import { useEffect, useRef, type RefObject } from "react";
import { P, GRAD, GRAD_TEXT, GRAD_SECTION, cardGlass, cardGlassElevated } from "@/lib/ds";
import Featured from "../Featured/Featured";

// ── Grain canvas hook ─────────────────────────────────────────────────────────
function useGrainCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function drawNoise() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 18; // very subtle
      }
      ctx.putImageData(imageData, 0, 0);
      rafId = requestAnimationFrame(drawNoise);
    }

    resize();
    drawNoise();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [canvasRef]);
}

// ── Data ──────────────────────────────────────────────────────────────────────
const SERVICE_PILLS = [
  { label: "UI/UX Design", dot: P.pink },
  { label: "MERN Stack", dot: P.violet },
  { label: "WordPress", dot: P.purple },
  { label: "E-commerce", dot: P.pink },
  { label: "Webflow", dot: "#22d3ee" },

];

const RIGHT_SERVICES = [
  { icon: <Zap size={18} />, label: "UI/UX Design", desc: "Interfaces that convert", color: P.pink },
  { icon: <Globe size={18} />, label: "Web Dev", desc: "MERN · Next.js · Node", color: P.violet },
  { icon: <ShoppingCart size={18} />, label: "E-commerce", desc: "Shopify · WooCommerce", color: P.purple },
  { icon: <Layers size={18} />, label: "CMS Platforms", desc: "WordPress · Webflow", color: "#22d3ee" },
];


// Fake avatar initials for social proof
const AVATARS = ["AK", "JM", "SR", "TL", "PD"];

// ── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

// ── Component ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useGrainCanvas(canvasRef);

  return (
    <section
      className="relative w-full  overflow-hidden flex flex-col md:pb-10"
      style={{ background: GRAD_SECTION }}
    >
      {/* ── Grain canvas ─────────────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1, mixBlendMode: "overlay", opacity: 0.55 }}
      />

      {/* ── Scanlines overlay ────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px)",
        }}
      />

      {/* ── Inset glow border ────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          boxShadow: `inset 0 0 120px rgba(168,48,200,0.06), inset 0 0 60px rgba(232,35,108,0.04)`,
        }}
      />

      {/* ── Orbital blobs ────────────────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {/* Top-right violet */}
        <div
          className="absolute -top-48 -right-40 w-200 h-200 rounded-full blur-[140px] opacity-22"
          style={{ background: `radial-gradient(circle, ${P.violet}, transparent 65%)` }}
        />
        {/* Bottom-left pink */}
        <div
          className="absolute -bottom-32 -left-32 w-162.5 h-162.5 rounded-full blur-[130px] opacity-18"
          style={{ background: `radial-gradient(circle, ${P.pink}, transparent 65%)` }}
        />
        {/* Center purple */}
        <div
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-225 h-120 rounded-full blur-[150px] opacity-8"
          style={{ background: `radial-gradient(ellipse, ${P.purple}, transparent 65%)` }}
        />
        {/* Top-left warm */}
          <motion.div
        style={{
          position: "absolute",
          width: 700,
          height: 600,
          top: -200,
          left: -170,
          borderRadius: "55% 45% 62% 38% / 60% 44% 56% 40%",
          background: `
            radial-gradient(ellipse at 28% 28%, rgba(160,80,255,0.55) 0%, transparent 52%),
            radial-gradient(ellipse at 68% 38%, rgba(220,60,160,0.40) 0%, transparent 56%),
            radial-gradient(ellipse at 50% 72%, rgba(40,120,255,0.28) 0%, transparent 60%)
          `,
          filter: "blur(80px)",
          willChange: "transform, border-radius",
        }}
        animate={{
          x: [0, 32, -18, 20, 0],
          y: [0, 18, 30, -18, 0],
          scale: [1, 1.04, 0.98, 1.02, 1],
          borderRadius: [
            "55% 45% 62% 38% / 60% 44% 56% 40%",
            "48% 52% 55% 45% / 52% 55% 45% 48%",
            "60% 40% 48% 52% / 44% 60% 52% 40%",
            "52% 48% 58% 42% / 58% 42% 60% 40%",
            "55% 45% 62% 38% / 60% 44% 56% 40%",
          ],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
 
      {/* ── Cyan depth layer ── */}
    
 
      {/* ── Dissolving edge blob ── */}

 
      {/* ── SVG curvy dissolving tail ── */}
  

      {/* Secondary depth layer */}
      <motion.div
        className="absolute -top-20 left-40 w-125 h-125 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 40% 40%, rgba(0,212,255,0.25), transparent 70%)
          `,
          filter: "blur(100px)",
          borderRadius: "60% 40% 50% 50% / 40% 60% 40% 60%",
        }}
        animate={{
          x: [0, -20, 20, 0],
          y: [0, 15, -15, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      </div>

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div
        className="relative flex-1 flex items-center px-4 sm:px-8 lg:px-14 xl:px-20 pt-24 pb-16"
        style={{ zIndex: 10 }}
      >
        <div className="w-full max-w-350 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-12 xl:gap-16 items-center">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-7">



         
         

            {/* Headline */}
            <motion.div {...fadeUp(0.07)} className="flex flex-col gap-0.5">
              <h1
                className="text-[3.2rem] sm:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.8rem] font-bold tracking-tight leading-[1.07]"
                style={{ color: P.ink }}
              >
                We build
              </h1>
              <h1
                className="text-[3.2rem] sm:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.8rem] font-bold tracking-tight leading-[1.07]"
                style={GRAD_TEXT}
              >
                digital products
              </h1>
              <h1
                className="text-[3.2rem] sm:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.8rem] font-bold tracking-tight leading-[1.07]"
                style={{ color: P.inkMid }}
              >
                that outlast trends.
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              {...fadeUp(0.14)}
              className="text-lg sm:text-xl leading-relaxed max-w-140"
              style={{ color: P.inkMid }}
            >
              DigiTreak is a{" "}
              <strong style={{ color: P.ink, fontWeight: 600 }}>full-service web agency</strong>{" "}
              crafting enterprise-grade digital experiences on open-source tech —{" "}
              <strong style={{ color: P.ink, fontWeight: 600 }}>WordPress, MERN, Webflow</strong>{" "}
              and beyond. You own everything.
            </motion.p>

            {/* Service pills with dot indicators */}
            <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-2">
              {SERVICE_PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center border-2 shadow-md gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    border: `1px solid ${P.purple}`,
                    background: P.darkBgDeep,
                    color: P.inkMid,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: pill.dot, boxShadow: `0 0 6px ${pill.dot}88` }}
                  />
                  {pill.label}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(0.27)} className="flex flex-col sm:flex-row gap-3 mt-1">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-4xl
                           text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-85"
                style={{ background: GRAD, boxShadow: `0 8px 32px -6px ${P.pink}55` }}
              >
                <PhoneCall size={15} />
                Start a Project
              </Link>
              <Link
                href="/our-work"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-4xl
                           text-sm font-bold tracking-wide transition-all hover:bg-white/5"
                style={{ color: P.inkMid, border: `1px solid ${P.primary}` }}
              >
                <Play size={13} />
                View Our Work
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div {...fadeUp(0.34)} className="flex items-center gap-4 pt-1">
              {/* Stacked avatars */}
              <div className="flex items-center -space-x-2.5">
                {AVATARS.map((init, i) => (
                  <div
                    key={init}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${P.purple}55, ${P.violet}55)`,
                      borderColor: "#0d0b14",
                      color: P.ink,
                      zIndex: AVATARS.length - i,
                    }}
                  >
                    {init}
                  </div>
                ))}
              </div>
              {/* Stars + label */}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={11} fill={P.pink} color={P.pink} />
                  ))}
                </div>
                <span
                  className="text-xs"
                  style={{ color: P.inkMid, fontFamily: "var(--font-space-mono), monospace" }}
                >
                  100+ clients trust DigiTreak
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* macOS-style service card */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                ...cardGlassElevated,
                background : P.mutedFill,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {/* Accent top-edge glow */}
              <div
                aria-hidden
                className="absolute top-0 left-8 right-8 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${P.pink}70, ${P.violet}70, transparent)` }}
              />

              {/* Card titlebar */}
              <div
                className="flex items-center justify-between px-5 py-3.5 border-b"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-center gap-2">
                  {/* Traffic-light dots */}
                  <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
                </div>
                <span
                  className="text-[11px] font-medium"
                  style={{ color: P.inkMid, fontFamily: "var(--font-space-mono), monospace" }}
                >
                  our_services.exe
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(40,200,64,0.12)",
                    color: "#28C840",
                    border: "1px solid rgba(40,200,64,0.25)",
                    fontFamily: "var(--font-space-mono), monospace",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28C840] animate-pulse" />
                  Active
                </span>
              </div>

              {/* 2×2 service grid */}
              <div className="grid grid-cols-2 gap-px p-px" style={{ background: "rgba(255,255,255,0.06)" }}>
                {RIGHT_SERVICES.map((svc) => (
                  <div
                    key={svc.label}
                    className="flex flex-col gap-2.5 p-5 group cursor-default transition-colors duration-200 shadow-sm rounded-lg"
                    style={{ background: "rgba(255,255,255,0.03)" , border : P.primary}}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${svc.color}1a`, color: svc.color }}
                    >
                      {svc.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-tight" style={{ color: P.ink }}>
                        {svc.label}
                      </p>
                      <p
                        className="text-[11px] mt-0.5 font-mono text-gray-400"
                     
                       
                      
                      >
                        {svc.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Projects stat */}
              <div
                className="flex flex-col gap-3 rounded-2xl p-5"
                style={cardGlass}
              >
                <div className="flex items-end justify-between">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: P.ink, fontFamily: "var(--font-space-mono), monospace" }}
                  >
                    500+
                  </span>
                  <span className="text-xs mb-1" style={{ color: P.inkMid }}>Projects</span>
                </div>
                {/* Progress bar */}
                <div
                  className="w-full h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: "92%", background: GRAD }}
                  />
                </div>
                <p className="text-[11px]" style={{ color: P.inkMid }}>
                  Across 18+ industries
                </p>
              </div>

              {/* Satisfaction stat */}
              <div
                className="flex flex-col gap-3 rounded-2xl p-5"
                style={cardGlass}
              >
                <div className="flex items-end justify-between">
                  <span
                    className="text-3xl font-bold"
                    style={{ fontFamily: "var(--font-space-mono), monospace" }}
                  >
                    98%
                  </span>
                  <span className="text-xs mb-1" style={{ color: P.inkMid }}>Satisfaction</span>
                </div>
                {/* Progress bar */}
                <div
                  className="w-full h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: "98%", background: GRAD }}
                  />
                </div>
                <p className="text-[11px]" style={{ color: P.inkMid }}>
                  Client retention score
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    <div className="mx-auto"><Featured /></div>
      


     
    </section>
  );
}
