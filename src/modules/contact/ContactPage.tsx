"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Loader2, Mail, MapPin, Phone, Clock, AlertCircle,
} from "lucide-react";
import {
  P, GRAD, GRAD_TEXT, GRAD_SECTION_CONTACT, cardGlass, labelLight,
} from "@/lib/ds";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  fullName: string; email: string; organization: string; phone: string;
  budget: string; service: string; message: string;
}
interface FieldError {
  fullName?: string; email?: string; budget?: string; message?: string;
}
type Status = "idle" | "loading" | "success" | "error";

// ─── Constants ────────────────────────────────────────────────────────────────
const BUDGETS = [
  "Under $5,000", "$5,000 – $15,000", "$15,000 – $50,000",
  "$50,000 – $100,000", "$100,000+", "Not sure yet",
];

const SERVICES = [
  "UI/UX Design", "MERN Stack Development", "Custom Web Architecture",
  "WordPress Development", "Webflow Development", "E-commerce Solutions",
  "Other / Not sure",
];

const TRUST_STATS = [
  { value: "500+", label: "Projects delivered" },
  { value: "12+",  label: "Years in business"  },
  { value: "98%",  label: "Client satisfaction" },
  { value: "24h",  label: "Response time"       },
];

const CONTACT_INFO = [
  { icon: Mail,   label: "hello@digitreak.com"          },
  { icon: Phone,  label: "+1 307 459 1578"               },
  { icon: MapPin, label: "Sheridan, WY · Dhaka, BD"      },
  { icon: Clock,  label: "Mon–Fri, 9am–6pm EST"          },
];

const ERROR_COLOR = "#FF5572";

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(data: FormData): FieldError {
  const errors: FieldError = {};
  if (!data.fullName.trim()) errors.fullName = "Name is required.";
  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email.";
  if (!data.budget) errors.budget = "Please select a budget.";
  if (!data.message.trim()) errors.message = "Tell us about your project.";
  return errors;
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: P.inkMid }}>
      {children}
      {required && <span className="ml-1" style={{ color: ERROR_COLOR }}>*</span>}
    </label>
  );
}

function FieldWrap({ error, children }: { error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1 text-xs font-medium"
            style={{ color: ERROR_COLOR }}
          >
            <AlertCircle className="w-3 h-3" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function getInputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    fontSize: "14px",
    background: "rgba(255,255,255,0.05)",
    border: hasError ? `1px solid ${ERROR_COLOR}55` : "1px solid rgba(255,255,255,0.10)",
    color: P.ink,
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
  };
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    fullName: "", email: "", organization: "", phone: "",
    budget: "", service: "", message: "",
  });
  const [errors, setErrors]   = useState<FieldError>({});
  const [status, setStatus]   = useState<Status>("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [charCount, setCharCount] = useState(0);

  const formRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(formRef, { once: true, margin: "-60px" });

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const val = e.target.value;
    setForm((p) => ({ ...p, [field]: val }));
    if (field === "message") setCharCount(val.length);
    if (touched[field]) setErrors((p) => ({ ...p, ...validate({ ...form, [field]: val }) }));
  };

  const blur = (field: keyof FormData) => () => {
    setTouched((p) => ({ ...p, [field]: true }));
    setErrors((p) => ({ ...p, ...validate({ ...form }) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTouched({ fullName: true, email: true, budget: true, message: true });
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20" style={{ background: GRAD_SECTION_CONTACT }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
            style={{ background: GRAD }}
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4" style={{ color: P.ink }}>Message received!</h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: P.inkMid }}>
            Thanks for reaching out,{" "}
            <strong style={{ color: P.ink }}>{form.fullName.split(" ")[0]}</strong>.
            We&apos;ll review your enquiry and get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setStatus("idle");
              setForm({ fullName:"", email:"", organization:"", phone:"", budget:"", service:"", message:"" });
              setCharCount(0); setTouched({}); setErrors({});
            }}
            className="text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-60"
            style={{ color: P.primary }}
          >
            Send another message
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: GRAD_SECTION_CONTACT }}>

      {/* Ambient blobs */}
      <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Primary gradient — top-left */}
        <div className="absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full bg-linear-to-br from-[#6a00ff] via-[#a100ff] to-[#ff3c7e] opacity-16 blur-[130px]" />
        {/* Primary gradient — bottom-right */}
        <div className="absolute bottom-0 -right-20 w-[540px] h-[540px] rounded-full bg-linear-to-tl from-[#6a00ff] via-[#a100ff] to-[#ff3c7e] opacity-12 blur-[120px]" />
        {/* Mid accent */}
        <div className="absolute top-1/2 right-1/4 w-[380px] h-[380px] rounded-full bg-linear-to-bl from-[#a100ff] to-[#ff3c7e] opacity-8 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-5 border" style={labelLight}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: P.primary }} />
            Get In Touch
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.06]" style={{ color: P.ink }}>
            Let&apos;s build something
            <br />
            <span style={{ ...GRAD_TEXT, fontStyle: "italic", fontWeight: 300 }}>remarkable.</span>
          </h1>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 xl:gap-16 items-start">

          {/* LEFT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28 flex flex-col gap-8"
          >
            {/* Tag line */}
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: P.inkMid }}>Let&apos;s connect</p>
              <p className="text-3xl font-bold leading-snug" style={{ color: P.ink }}>
                You&apos;re in{" "}<span style={GRAD_TEXT}>good hands</span>
              </p>
              <p className="mt-4 text-base leading-relaxed" style={{ color: P.inkMid }}>
                Serving global brands with enterprise-grade solutions on open-source tech.
                No lock-in. Full ownership. Since 2015.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {TRUST_STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                  className="rounded-2xl p-4"
                  style={cardGlass}
                >
                  <p className="text-2xl font-extrabold" style={GRAD_TEXT}>{s.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: P.inkMid }}>{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              {CONTACT_INFO.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.06, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(161,0,255,0.15)" }}>
                    <c.icon className="w-3.5 h-3.5" style={{ color: P.purple }} />
                  </div>
                  <span className="text-sm" style={{ color: P.ink }}>{c.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 rounded-2xl px-5 py-4" style={cardGlass}>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold" style={{ color: P.ink }}>Currently accepting new projects</p>
                <p className="text-xs mt-0.5" style={{ color: P.inkMid }}>Typical response within 24 hours</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL — Form */}
          <div ref={formRef}>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
              style={cardGlass}
            >
              {/* Top accent line */}
              <div aria-hidden className="absolute top-0 left-8 right-8 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${P.pink}80, ${P.violet}80, transparent)` }} />
              {/* Inner glow */}
              <div aria-hidden className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />

              {/* Form heading */}
              <div className="mb-8 relative z-10">
                <h2 className="text-2xl font-bold" style={{ color: P.ink }}>Tell us about your project</h2>
                <p className="mt-1 text-sm" style={{ color: P.inkMid }}>
                  Fields marked <span style={{ color: ERROR_COLOR }}>*</span> are required.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 relative z-10">

                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FieldWrap error={touched.fullName ? errors.fullName : undefined}>
                    <Label required>Full Name</Label>
                    <input
                      type="text" placeholder="Jane Smith" value={form.fullName}
                      onChange={set("fullName")} onBlur={blur("fullName")}
                      style={getInputStyle(!!touched.fullName && !!errors.fullName)}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = `${P.purple}80`; }}
                     
                    />
                  </FieldWrap>

                  <FieldWrap error={touched.email ? errors.email : undefined}>
                    <Label required>Email Address</Label>
                    <input
                      type="email" placeholder="jane@company.com" value={form.email}
                      onChange={set("email")} onBlur={blur("email")}
                      style={getInputStyle(!!touched.email && !!errors.email)}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = `${P.purple}80`; }}
                    />
                  </FieldWrap>
                </div>

                {/* Row 2: Org + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FieldWrap>
                    <Label>Organisation</Label>
                    <input
                      type="text" placeholder="Acme Inc." value={form.organization}
                      onChange={set("organization")} style={getInputStyle(false)}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = `${P.purple}80`; }}
                      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.10)"; }}
                    />
                  </FieldWrap>

                  <FieldWrap>
                    <Label>Phone (Optional)</Label>
                    <input
                      type="tel" placeholder="+1 555 000 0000" value={form.phone}
                      onChange={set("phone")} style={getInputStyle(false)}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = `${P.purple}80`; }}
                      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.10)"; }}
                    />
                  </FieldWrap>
                </div>

                {/* Row 3: Budget + Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FieldWrap error={touched.budget ? errors.budget : undefined}>
                    <Label required>Project Budget</Label>
                    <div className="relative">
                      <select
                        value={form.budget} onChange={set("budget")} onBlur={blur("budget")}
                        className="appearance-none pr-10 cursor-pointer w-full"
                        style={{ ...getInputStyle(!!touched.budget && !!errors.budget), color: form.budget ? P.ink : P.inkLight }}
                      >
                        <option value="" disabled style={{ background: "#0d0b14", color: P.inkMid }}>Select a range</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b} style={{ background: "#0d0b14", color: P.ink }}>{b}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: P.inkMid }}>
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </FieldWrap>

                  <FieldWrap>
                    <Label>Service Needed</Label>
                    <div className="relative">
                      <select
                        value={form.service} onChange={set("service")} className="appearance-none pr-10 cursor-pointer w-full"
                        style={{ ...getInputStyle(false), color: form.service ? P.ink : P.inkLight }}
                      >
                        <option value="" disabled style={{ background: "#0d0b14", color: P.inkMid }}>Choose a service</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s} style={{ background: "#0d0b14", color: P.ink }}>{s}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: P.inkMid }}>
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </FieldWrap>
                </div>

                {/* Message */}
                <FieldWrap error={touched.message ? errors.message : undefined}>
                  <div className="flex items-center justify-between mb-2">
                    <Label required>Project Details</Label>
                    <span className="text-[11px]" style={{ color: charCount > 20 ? P.inkMid : P.inkLight }}>
                      {charCount} chars
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project, goals, timeline, and anything else that will help us understand what you need..."
                    value={form.message} onChange={set("message")} onBlur={blur("message")}
                    className="resize-none leading-relaxed"
                    style={getInputStyle(!!touched.message && !!errors.message)}
                    onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = `${P.purple}80`; }}
                  />
                </FieldWrap>

                {/* Error banner */}
                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{ background: `${ERROR_COLOR}10`, border: `1px solid ${ERROR_COLOR}25` }}
                    >
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ERROR_COLOR }} />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: ERROR_COLOR }}>Something went wrong</p>
                        <p className="text-xs mt-0.5" style={{ color: P.inkMid }}>
                          Please try again or email us directly at hello@digitreak.com
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: status === "loading" ? 1 : 1.015 }}
                  whileTap={{ scale: status === "loading" ? 1 : 0.985 }}
                  className="group relative w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-bold tracking-wide overflow-hidden disabled:opacity-80 disabled:cursor-not-allowed"
                  style={{ background: GRAD, color: "#fff", boxShadow: `0 8px 24px -6px ${P.pink}50` }}
                >
                  <motion.div
                    className="absolute inset-0 -translate-x-full"
                    animate={{ translateX: ["−100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }}
                  />
                  {status === "loading" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending your message…</>
                  ) : (
                    <>Send Message<ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" /></>
                  )}
                </motion.button>

                <p className="text-center text-xs" style={{ color: P.inkMid }}>
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
