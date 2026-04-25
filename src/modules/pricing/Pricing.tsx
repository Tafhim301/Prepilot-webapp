"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, X, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import pricingData from "@/data/pricing.json";
import type { PricingData, PricingPlan } from "@/types/pricing.types";
import {
  P, GRAD, GRAD_TEXT, GRAD_SECTION_PRICING,
  cardGlass, cardGlassElevated, cardDark, cardHoverShadow,
  labelLight,
} from "@/lib/ds";

const data = pricingData as PricingData;

// ── Billing Toggle ────────────────────────────────────────────────────────────
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
      
    >
       <div
        className="absolute top-0 left-0 w-125 h-125 
        bg-linear-to-br from-[#6a00ff] via-[#a100ff] to-[#ff3c7e] 
        opacity-30 blur-[120px] pointer-events-none"
      />
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute top-1 bottom-1 rounded-full"
        style={{
          background: annual ? GRAD : "rgba(255,255,255,0.12)",
          left:  annual ? "calc(50% + 2px)" : "4px",
          right: annual ? "4px" : "calc(50% + 2px)",
        }}
      />
      <button
        onClick={() => onChange(false)}
        className="relative z-10 px-6 sm:px-7 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200"
        style={{ color: !annual ? P.ink : P.inkMid }}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange(true)}
        className="relative z-10 px-6 sm:px-7 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200 flex items-center gap-2"
        style={{ color: annual ? "#fff" : P.inkMid }}
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
              style={{ background: "rgba(161,0,255,0.25)", color: "#d090f0" }}
            >
              −{discount}%
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

// ── Plan Card ─────────────────────────────────────────────────────────────────
function PlanCard({ plan, annual, index }: { plan: PricingPlan; annual: boolean; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const H      = plan.highlight;
  const price  = annual ? plan.annualPrice : plan.monthlyPrice;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col rounded-3xl overflow-hidden ${H ? "lg:-mt-4 z-10" : ""}`}
      style={
        H
          ? { ...cardGlassElevated, boxShadow: `0 32px 64px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(161,0,255,0.35), 0 8px 24px -8px ${P.pink}40` }
          : { ...cardGlass }
      }
      onMouseEnter={(e) => {
        if (!H) (e.currentTarget as HTMLElement).style.boxShadow = cardHoverShadow;
      }}
      onMouseLeave={(e) => {
        if (!H) (e.currentTarget as HTMLElement).style.boxShadow = cardGlass.boxShadow as string;
      }}
    >
      {/* Highlighted plan — gradient glow wash */}
      {H && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 50% at 10% 0%, ${P.pink}22 0%, ${P.violet}10 55%, transparent 80%)` }}
        />
      )}

      {/* Top accent line for highlighted */}
      {H && (
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${P.pink}, ${P.purple}, ${P.violet})` }}
        />
      )}

      {plan.badge && (
        <div
          className="absolute top-5 right-5 z-10 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
          style={
            H
              ? { background: GRAD, color: "#fff", boxShadow: `0 4px 12px ${P.pink}40` }
              : { background: "rgba(161,0,255,0.15)", color: "#d090f0", border: "1px solid rgba(161,0,255,0.28)" }
          }
        >
          {H && <Sparkles className="w-3 h-3" />}
          {plan.badge}
        </div>
      )}

      {/* Header */}
      <div className="px-8 pt-8 pb-6 relative z-10">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.18em] mb-5"
          style={H ? GRAD_TEXT : { color: "#d090f0" }}
        >
          {plan.name}
        </p>

        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-medium" style={{ color: P.inkMid }}>$</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={price}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="text-6xl font-extrabold tracking-tight tabular-nums"
              style={{ color: P.ink }}
            >
              {price.toLocaleString()}
            </motion.span>
          </AnimatePresence>
          <span className="text-sm font-medium pb-1" style={{ color: P.inkMid }}>/mo</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={annual ? "a" : "m"}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-xs mt-2"
            style={{ color: P.inkLight }}
          >
            {annual
              ? `Billed $${(plan.annualPrice * 12).toLocaleString()} / year`
              : "Billed monthly · cancel anytime"}
          </motion.p>
        </AnimatePresence>

        <p className="text-base mt-5 leading-relaxed" style={{ color: P.inkMid }}>
          {plan.tagline}
        </p>
      </div>

      {/* Deliverables strip */}
      <div
        className="grid grid-cols-2 gap-x-4 gap-y-3 px-8 py-5 text-xs font-medium relative z-10"
        style={{
          borderTop:    `1px solid ${P.border}`,
          borderBottom: `1px solid ${P.border}`,
          background:    P.mutedFill,
        }}
      >
        {[
          { label: plan.deliverables.pages     ? `${plan.deliverables.pages} pages`         : "Unlimited pages"     },
          { label: plan.deliverables.revisions ? `${plan.deliverables.revisions} revisions` : "Unlimited revisions" },
          { label: `${plan.deliverables.teamSize}-person team`  },
          { label: `${plan.deliverables.responseTime} response` },
        ].map((d) => (
          <div key={d.label} className="flex items-center gap-1.5" style={{ color: P.inkMid }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: H ? P.purple : P.inkLight }} />
            {d.label}
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="flex-1 px-8 py-7 space-y-4 relative z-10">
        {plan.features.map((f) => (
          <div key={f.label} className="flex items-start gap-3">
            <div
              className="mt-0.5 flex-shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center"
              style={
                f.included
                  ? { background: H ? GRAD : "rgba(161,0,255,0.2)" }
                  : { background: "transparent", border: `1.5px dashed ${P.borderMid}` }
              }
            >
              {f.included
                ? <Check className="w-2.5 h-2.5" strokeWidth={3} style={{ color: "#fff" }} />
                : <X     className="w-2.5 h-2.5" strokeWidth={2.5} style={{ color: P.inkLight }} />
              }
            </div>
            <span
              className={`text-sm leading-relaxed ${!f.included ? "line-through" : ""}`}
              style={{ color: f.included ? P.ink : P.inkLight }}
            >
              {f.label}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-8 pb-8 relative z-10">
        <Link
          href={plan.ctaUrl}
          className="group flex items-center justify-center gap-2 w-full py-4 rounded-2xl
                     text-sm font-bold tracking-wide transition-opacity duration-200 hover:opacity-85"
          style={
            H
              ? { background: GRAD, color: "#fff", boxShadow: `0 8px 24px -6px ${P.pink}55` }
              : { background: "rgba(255,255,255,0.08)", color: P.ink, border: `1px solid ${P.border}` }
          }
        >
          {plan.cta}
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

// ── Add-ons ───────────────────────────────────────────────────────────────────
function Addons() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mt-24 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: "#d090f0" }}>
          Extend your scope
        </p>
        <h3 className="text-3xl font-bold" style={{ color: P.ink }}>Optional add-ons</h3>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.addons.map((addon, i) => (
          <motion.div
            key={addon.name}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex flex-col gap-2 p-5 rounded-2xl transition-shadow duration-200 hover:shadow-lg"
            style={cardGlass}
          >
            <span className="text-sm font-semibold" style={{ color: P.inkMid }}>{addon.name}</span>
            <span className="text-xl font-extrabold" style={GRAD_TEXT}>
              +${addon.price.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FaqItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        ...cardGlass,
        boxShadow: open ? cardHoverShadow : cardGlass.boxShadow,
        border: open ? "1px solid rgba(161,0,255,0.28)" : cardGlass.border,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 px-6 text-left"
      >
        <span className="text-sm font-semibold" style={{ color: P.ink }}>{faq.question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }} className="flex-shrink-0">
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
            <p className="pb-5 px-6 text-base leading-relaxed" style={{ color: P.inkMid }}>
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-10 overflow-hidden"
      style={{ background: GRAD_SECTION_PRICING }}
    >
      {/* Ambient blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary gradient — top-center */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[820px] h-[520px] rounded-full bg-linear-to-b from-[#6a00ff] via-[#a100ff] to-[#ff3c7e] opacity-18 blur-[130px]" />
        {/* Primary gradient — bottom-right */}
        <div className="absolute bottom-0 -right-10 w-[520px] h-[520px] rounded-full bg-linear-to-tl from-[#6a00ff] via-[#a100ff] to-[#ff3c7e] opacity-14 blur-[120px]" />
        {/* Primary gradient — mid-left */}
        <div className="absolute top-1/2 -left-10 w-[420px] h-[420px] rounded-full bg-linear-to-br from-[#6a00ff] to-[#a100ff] opacity-10 blur-[110px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 sm:mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold
                       uppercase tracking-[0.18em] mb-6 border"
            style={labelLight}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: P.primary }} />
            Transparent Pricing
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.06]"
            style={{ color: P.ink }}
          >
            Simple, honest pricing.
            <br />
            <span style={{ ...GRAD_TEXT, fontStyle: "italic", fontWeight: 300 }}>
              No surprises.
            </span>
          </h2>

          <p className="mt-5 text-xl max-w-lg mx-auto leading-relaxed" style={{ color: P.inkMid }}>
            Pick the engagement that matches your ambition. Upgrade or cancel anytime.
          </p>

          <div className="mt-10">
            <BillingToggle annual={annual} onChange={setAnnual} discount={data.billing.annualDiscount} />
          </div>
        </motion.div>

        {/* Plan cards */}
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
        >
          {["No setup fees", "Cancel anytime", "30-day money-back", "SOC 2 compliant"].map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: P.inkMid }}>
              <Check className="w-3.5 h-3.5" style={{ color: P.purple }} strokeWidth={2.5} />
              {item}
            </span>
          ))}
        </motion.div>

        <Addons />

        {/* FAQ */}
        <div className="mt-24 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-3xl font-bold" style={{ color: P.ink }}>Frequently asked questions</h3>
          </motion.div>
          <div className="space-y-2">
            {data.faqs.map((faq, i) => (
              <FaqItem key={faq.question} faq={faq} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-20 relative rounded-3xl p-8 sm:p-10 md:p-14 overflow-hidden"
          style={{ ...cardDark, boxShadow: `0 24px 60px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(161,0,255,0.2)` }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 80% at 90% 10%, ${P.violet}25 0%, ${P.pink}10 50%, transparent 75%)` }}
          />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: P.ink }}>
                Not sure which plan fits?
              </h4>
              <p className="mt-3 text-lg leading-relaxed max-w-sm" style={{ color: P.inkMid }}>
                Book a free 30-minute discovery call. We&rsquo;ll scope your project and recommend
                the right engagement — no pressure, no pitch.
              </p>
            </div>
            <Link
              href="/contact"
              className="group flex-shrink-0 flex items-center gap-2 px-8 py-4 rounded-2xl
                         text-sm font-bold transition-opacity duration-200 hover:opacity-85 whitespace-nowrap"
              style={{ background: GRAD, color: "#fff", boxShadow: `0 8px 24px -6px ${P.pink}55` }}
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
