"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { P, GRAD, GRAD_H, GRAD_TEXT } from "@/lib/ds";

const brands = [
  { src: "/assets/brand1.png", alt: "Brand 1" },
  { src: "/assets/brand2.png", alt: "Brand 2" },
  { src: "/assets/brand3.png", alt: "Brand 3" },
  { src: "/assets/brand4.png", alt: "Brand 4" },
  { src: "/assets/brand5.png", alt: "Brand 5" },
  { src: "/assets/brand6.png", alt: "Brand 6" },
  { src: "/assets/brand7.png", alt: "Brand 7" },
  { src: "/assets/brand8.png", alt: "Brand 8" },
];

export default function Featured() {
  return (
    <section className="w-full max-w-6xl px-4 sm:px-8 pb-8 pt-4 relative z-10">

      {/* ── Ambient glow behind card ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-3xl blur-[60px] opacity-30 pointer-events-none"
        style={{ background: GRAD }}
      />

      {/* ── Gradient border wrapper — matches navbar style ───────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[28px] p-[1.5px]"
        style={{
          background: GRAD,
          boxShadow: `0 0 0 1px rgba(161,0,255,0.18), 0 8px 40px -8px rgba(161,0,255,0.45), 0 0 60px -10px rgba(106,0,255,0.3)`,
        }}
      >
        {/* Traveling light — same as navbar */}
        <div aria-hidden className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none z-10">
          <div
            className="absolute top-0"
            style={{
              width: "120px",
              height: "4px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), rgba(255,255,255,0.5), transparent)",
              filter: "blur(1.5px)",
              animation: "navTravelLight 12s linear infinite",
            }}
          />
        </div>

        {/* ── Inner card surface ───────────────────────────────────────── */}
        <div
          className="relative rounded-[26px] px-6 py-5 flex items-center gap-6 overflow-hidden"
          style={{
            background: "rgba(14,10,28,0.96)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* Top gradient glow line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-full pointer-events-none"
            style={{ background: GRAD_H, opacity: 0.7 }}
          />

          {/* Shine overlay */}
          <div
            className="absolute inset-0 rounded-[26px] pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)" }}
          />

          {/* Inner corner glows */}
          <div aria-hidden className="absolute top-[-60%] right-[-3%] w-[200px] h-[200px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, rgba(161,0,255,0.18), transparent 65%)`, filter: "blur(30px)" }} />
          <div aria-hidden className="absolute top-[-60%] left-[-3%] w-[140px] h-[140px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, rgba(255,60,126,0.14), transparent 65%)`, filter: "blur(30px)" }} />

          {/* Left label — "Trusted by 500+ brands" */}
          <div className="hidden sm:flex flex-col items-center gap-0.5 flex-shrink-0 text-center select-none">
            <span className="text-[9px] font-bold uppercase tracking-[.16em]" style={{ color: P.inkMid }}>
              Trusted by
            </span>
            <span className="text-[15px] font-extrabold leading-none" style={GRAD_TEXT}>
              500+
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[.16em]" style={{ color: P.inkMid }}>
              brands
            </span>
          </div>

          {/* Vertical divider */}
          <div className="hidden sm:block w-px self-stretch flex-shrink-0" style={{ background: P.border }} />

          {/* Logo grid — invert makes dark logos white, grayscale keeps them neutral */}
          <div className="grid grid-cols-4 md:grid-cols-8 flex-1">
            {brands.map((brand, i) => (
              <div
                key={brand.alt}
                className="flex items-center justify-center px-3 py-1.5 group transition-colors duration-200"
                style={i > 0 ? { borderLeft: `1px solid ${P.borderMid}` } : undefined}
              >
                <Image
                  src={brand.src}
                  alt={brand.alt}
                  width={90}
                  height={32}
                  className="object-contain transition-all duration-300
                             invert brightness-75 opacity-50 grayscale
                             group-hover:opacity-100 group-hover:brightness-100 group-hover:grayscale-0 group-hover:invert-0"
                />
              </div>
            ))}
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block w-px self-stretch flex-shrink-0" style={{ background: P.border }} />

          {/* CTA */}
          <Link
            href="/our-work"
            className="hidden md:inline-flex items-center gap-2 flex-shrink-0 px-5 py-2.5 rounded-full
                       text-[11px] font-bold tracking-[.12em] uppercase text-white
                       transition-all duration-200 hover:opacity-85 hover:-translate-y-px"
            style={{ background: GRAD, boxShadow: `0 6px 20px -4px rgba(255,60,126,0.5)` }}
          >
            Our Work <ArrowRightIcon size={13} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
