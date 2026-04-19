"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, X, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import pricingData from "@/data/pricing.json";
import type { PricingData, PricingPlan } from "@/types/pricing.types";

const data = pricingData as PricingData;

/* ─────────────────────────────────────────────────────────────────────
   Palette — every value lifted directly from globals.css.
   All strings are valid CSS color values used via style={{}}.
   Nothing touches a Tailwind CSS variable inside a highlighted card.
   ───────────────────────────────────────────────────────────────────── */
const P = {
  // Page
  page:        "#f4f1ec",   // ≈ oklch(95.53% 0.0029 84.56) — warm cream
  card:        "#fdfcfb",   // ≈ oklch(99.2% 0.001 84.56)   — near white

  // Borders & muted fills
  border:      "rgba(0,0,0,0.08)",
  borderMid:   "rgba(0,0,0,0.06)",
  mutedFill:   "rgba(0,0,0,0.03)",

  // Text on light
  ink:         "#1f1a14",   // ≈ oklch(20% 0.01 84.56)      — deep brown
  inkMid:      "#7a6e62",   // ≈ oklch(55% 0.02 84.56)      — mid warm grey

  // Highlighted card base — rich dark
  darkBg:      "#1a1208",   // ≈ oklch(18% 0.012 54.56)     — very dark warm brown
  darkBgDeep:  "#110d05",   // ≈ slightly deeper for shadow

  // Text on dark card — pure legible values, no opacity tricks
  onDark:      "#f4f1ec",   // same as page cream — fully opaque
  onDarkMid:   "#c4bdb4",   // mid-light warm grey — readable secondary text
  onDarkDim:   "#7a7168",   // dimmed tertiary text

  // Brand gradient stops
  red:         "#8b3a2a",   // ≈ oklch(53.78% 0.1561 3.111)
  mid:         "#9b4a28",   // ≈ oklch(57.76% 0.1648 17.71)
  amber:       "#a85e26",   // ≈ oklch(61.73% 0.1786 28.24)

  // Primary accent (light surfaces)
  primary:     "#4a3018",   // ≈ oklch(36% 0.072 54.56)
} as const;

const GRAD = `linear-gradient(135deg, ${P.red} 0%, ${P.mid} 50%, ${P.amber} 100%)`;

/* ─────────────────────────────────────────────────────────────────────
   Billing Toggle — clean segmented pill
   ───────────────────────────────────────────────────────────────────── */
function BillingToggle({
  annual,
  onChange,
  discount,
}: {
  annual: boolean;
  onChange: (v: boolean) => void;
  discount: number;
}) {
  return (
    <div
      className="relative inline-flex items-center p-1 rounded-full"
      style={{
        background: "rgba(255,255,255,0.7)",
        border: `1px solid ${P.border}`,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Sliding pill */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute top-1 bottom-1 rounded-full"
        style={{
          background: annual ? GRAD : P.ink,
          left: annual ? "calc(50% + 2px)" : "4px",
          right: annual ? "4px" : "calc(50% + 2px)",
        }}
      />

      <button
        onClick={() => onChange(false)}
        className="relative z-10 px-7 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200"
        style={{ color: !annual ? P.onDark : P.inkMid }}
      >
        Monthly
      </button>

      <button
        onClick={() => onChange(true)}
        className="relative z-10 px-7 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200 flex items-center gap-2"
        style={{ color: annual ? P.onDark : P.inkMid }}
      >
        Annual
        <AnimatePresence>
          {!annual && (
            <motion.span
              key="badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: `${P.amber}22`, color: P.amber }}
            >
              −{discount}%
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Plan Card
   ───────────────────────────────────────────────────────────────────── */
function PlanCard({
  plan,
  annual,
  index,
}: {
  plan: PricingPlan;
  annual: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const H = plan.highlight;
  const price = annual ? plan.annualPrice : plan.monthlyPrice;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col rounded-3xl overflow-hidden ${H ? "lg:-mt-4 lg:mb-0 z-10" : ""}`}
      style={
        H
          ? {
              background: P.darkBg,
              border: `1px solid rgba(255,255,255,0.07)`,
              boxShadow: `0 32px 64px -16px rgba(0,0,0,0.45), 0 8px 24px -8px ${P.red}30`,
            }
          : {
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: `1px solid rgba(255,255,255,0.8)`,
              boxShadow: `0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)`,
            }
      }
    >
      {/* Highlighted card — subtle top-corner warm glow */}
      {H && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 10% 0%, ${P.red}28 0%, transparent 55%)`,
          }}
        />
      )}

      {/* Badge */}
      {plan.badge && (
        <div
          className="absolute top-5 right-5 z-10 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
          style={
            H
              ? { background: GRAD, color: P.onDark, boxShadow: `0 4px 12px ${P.red}40` }
              : { background: `${P.primary}12`, color: P.primary, border: `1px solid ${P.primary}20` }
          }
        >
          {H && <Sparkles className="w-3 h-3" />}
          {plan.badge}
        </div>
      )}

      {/* ── Header ── */}
      <div className="px-8 pt-8 pb-6 relative z-10">
        {/* Plan name */}
        <p
          className="text-[11px] font-bold uppercase tracking-[0.18em] mb-5"
          style={{ color: H ? P.amber : P.primary }}
        >
          {plan.name}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-xl font-medium"
            style={{ color: H ? P.onDarkMid : P.inkMid }}
          >
            $
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={price}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="text-6xl font-extrabold tracking-tight tabular-nums"
              style={{ color: H ? P.onDark : P.ink }}
            >
              {price.toLocaleString()}
            </motion.span>
          </AnimatePresence>
          <span
            className="text-sm font-medium pb-1"
            style={{ color: H ? P.onDarkMid : P.inkMid }}
          >
            /mo
          </span>
        </div>

        {/* Billing note */}
        <AnimatePresence mode="wait">
          <motion.p
            key={annual ? "a" : "m"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-xs mt-2"
            style={{ color: H ? P.onDarkDim : P.inkMid }}
          >
            {annual
              ? `Billed $${(plan.annualPrice * 12).toLocaleString()} / year`
              : "Billed monthly · cancel anytime"}
          </motion.p>
        </AnimatePresence>

        {/* Tagline */}
        <p
          className="text-sm mt-5 leading-relaxed"
          style={{ color: H ? P.onDarkMid : P.inkMid }}
        >
          {plan.tagline}
        </p>
      </div>

      {/* ── Deliverables strip ── */}
      <div
        className="grid grid-cols-2 gap-x-4 gap-y-3 px-8 py-5 text-xs font-medium relative z-10"
        style={{
          borderTop: `1px solid ${H ? "rgba(255,255,255,0.07)" : P.borderMid}`,
          borderBottom: `1px solid ${H ? "rgba(255,255,255,0.07)" : P.borderMid}`,
          background: H ? "rgba(255,255,255,0.03)" : P.mutedFill,
        }}
      >
        {[
          { label: plan.deliverables.pages ? `${plan.deliverables.pages} pages` : "Unlimited pages" },
          { label: plan.deliverables.revisions ? `${plan.deliverables.revisions} revisions` : "Unlimited revisions" },
          { label: `${plan.deliverables.teamSize}-person team` },
          { label: `${plan.deliverables.responseTime} response` },
        ].map((d) => (
          <div
            key={d.label}
            className="flex items-center gap-1.5"
            style={{ color: H ? P.onDarkMid : P.ink }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: H ? P.amber : P.primary }}
            />
            {d.label}
          </div>
        ))}
      </div>

      {/* ── Features ── */}
      <div className="flex-1 px-8 py-7 space-y-4 relative z-10">
        {plan.features.map((f) => (
          <div key={f.label} className="flex items-start gap-3">
            <div
              className="mt-0.5 flex-shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center"
              style={
                f.included
                  ? { background: H ? GRAD : `${P.primary}15` }
                  : {
                      background: "transparent",
                      border: `1.5px dashed ${H ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
                    }
              }
            >
              {f.included ? (
                <Check
                  className="w-2.5 h-2.5"
                  strokeWidth={3}
                  style={{ color: H ? P.onDark : P.primary }}
                />
              ) : (
                <X
                  className="w-2.5 h-2.5"
                  strokeWidth={2.5}
                  style={{ color: H ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
                />
              )}
            </div>
            <span
              className={`text-sm leading-relaxed ${!f.included ? "line-through" : ""}`}
              style={{
                color: f.included
                  ? H ? P.onDark : P.ink
                  : H ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.28)",
              }}
            >
              {f.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="px-8 pb-8 relative z-10">
        <Link
          href={plan.ctaUrl}
          className="group flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-bold tracking-wide transition-opacity duration-200 hover:opacity-85"
          style={
            H
              ? { background: GRAD, color: P.onDark, boxShadow: `0 8px 24px -6px ${P.red}50` }
              : { background: P.ink, color: P.onDark }
          }
        >
          {plan.cta}
          <ArrowRight
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Add-ons
   ───────────────────────────────────────────────────────────────────── */
function Addons() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mt-24 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <p
          className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2"
          style={{ color: P.primary }}
        >
          Extend your scope
        </p>
        <h3 className="text-3xl font-bold" style={{ color: P.ink }}>
          Optional add-ons
        </h3>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.addons.map((addon, i) => (
          <motion.div
            key={addon.name}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex flex-col gap-2 p-5 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            <span className="text-sm font-semibold" style={{ color: P.ink }}>
              {addon.name}
            </span>
            <span className="text-xl font-extrabold" style={{ color: P.primary }}>
              +${addon.price.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   FAQ
   ───────────────────────────────────────────────────────────────────── */
function FaqItem({
  faq,
  index,
}: {
  faq: { question: string; answer: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: open ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
        border: `1px solid ${open ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)"}`,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        transition: "background 0.2s, border 0.2s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 px-6 text-left"
      >
        <span className="text-sm font-semibold" style={{ color: P.ink }}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4" style={{ color: P.inkMid }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 px-6 text-sm leading-relaxed"
              style={{ color: P.inkMid }}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Main Section
   ───────────────────────────────────────────────────────────────────── */
export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      className="relative py-28 px-4 sm:px-6 lg:px-10 overflow-hidden"
      style={{ background: P.page }}
    >
      {/* Soft ambient glow — barely visible, sets warmth */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] opacity-30"
          style={{ background: `radial-gradient(ellipse, ${P.red} 0%, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20"
          style={{ background: P.amber }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-6 border"
            style={{
              background: `${P.primary}0a`,
              borderColor: `${P.primary}20`,
              color: P.primary,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: P.primary }} />
            Transparent Pricing
          </div>

          <h2
            className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.06]"
            style={{ color: P.ink }}
          >
            Simple, honest pricing.
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
              No surprises.
            </span>
          </h2>

          <p
            className="mt-5 text-lg max-w-lg mx-auto leading-relaxed"
            style={{ color: P.inkMid }}
          >
            Pick the engagement that matches your ambition. Upgrade or cancel anytime.
          </p>

          <div className="mt-10">
            <BillingToggle annual={annual} onChange={setAnnual} discount={data.billing.annualDiscount} />
          </div>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-center">
          {data.plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} annual={annual} index={i} />
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
          style={{ color: P.inkMid }}
        >
          {["No setup fees", "Cancel anytime", "30-day money-back", "SOC 2 compliant"].map(
            (item) => (
              <span key={item} className="flex items-center gap-1.5 text-sm font-medium">
                <Check className="w-3.5 h-3.5" style={{ color: P.primary }} strokeWidth={2.5} />
                {item}
              </span>
            )
          )}
        </motion.div>

        {/* Add-ons */}
        <Addons />

        {/* ── FAQ ── */}
        <div className="mt-24 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-3xl font-bold" style={{ color: P.ink }}>
              Frequently asked questions
            </h3>
          </motion.div>

          <div className="space-y-2">
            {data.faqs.map((faq, i) => (
              <FaqItem key={faq.question} faq={faq} index={i} />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-20 relative rounded-3xl p-10 md:p-14 overflow-hidden"
          style={{
            background: P.darkBg,
            boxShadow: `0 24px 60px -12px rgba(0,0,0,0.4), 0 8px 24px -8px ${P.red}20`,
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 80% at 90% 10%, ${P.red}25 0%, transparent 50%)`,
            }}
          />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-3xl font-bold tracking-tight" style={{ color: P.onDark }}>
                Not sure which plan fits?
              </h4>
              <p
                className="mt-3 text-base leading-relaxed max-w-sm"
                style={{ color: P.onDarkMid }}
              >
                Book a free 30-minute discovery call. We'll scope your project and recommend the
                right engagement — no pressure, no pitch.
              </p>
            </div>

            <Link
              href="/contact"
              className="group flex-shrink-0 flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-bold transition-opacity duration-200 hover:opacity-85 whitespace-nowrap"
              style={{
                background: GRAD,
                color: P.onDark,
                boxShadow: `0 8px 24px -6px ${P.red}60`,
              }}
            >
              Book a Free Call
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}