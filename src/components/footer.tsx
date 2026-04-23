"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FacebookLogoIcon,
  LinkedinLogoIcon,
  BehanceLogo,
  DribbbleLogoIcon,
} from "@phosphor-icons/react";
import { P, GRAD, GRAD_H, GRAD_TEXT } from "@/lib/ds";

// ── Data ──────────────────────────────────────────────────────────────────────
const navLinks = [
  { title: "Home",       href: "/"          },
  { title: "Services",   href: "/#services" },
  { title: "Our Work",   href: "/our-work"  },
  { title: "Pricing",    href: "/pricing"   },
  { title: "About Us",   href: "/about"     },
  { title: "Contact",    href: "/contact"   },
];

const legalLinks = [
  { title: "Privacy Policy",    href: "#" },
  { title: "Terms & Conditions", href: "#" },
  { title: "Cookie Policy",     href: "#" },
];

const socialLinks = [
  { title: "LinkedIn",  href: "#", icon: <LinkedinLogoIcon  size={17} weight="fill" /> },
  { title: "Behance",   href: "#", icon: <BehanceLogo        size={17} weight="fill" /> },
  { title: "Dribbble",  href: "#", icon: <DribbbleLogoIcon   size={17} weight="fill" /> },
  { title: "Facebook",  href: "#", icon: <FacebookLogoIcon   size={17} weight="fill" /> },
];

const offices = [
  { country: "United States", flag: "🇺🇸", address: "30 N Gould St Ste R, Sheridan, WY 82801", phone: "+1 307 459 1578" },
  { country: "Bangladesh",    flag: "🇧🇩", address: "House-2/1A, Post Office Road, Mirpur-11, Dhaka-1216", phone: "+880 9611 656798" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ background: P.darkBg }}
    >
      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: GRAD_H }} />

      {/* Ambient blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-18"
          style={{ background: `radial-gradient(circle, ${P.amber}, transparent 65%)` }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full blur-[100px] opacity-14"
          style={{ background: `radial-gradient(circle, ${P.red}, transparent 65%)` }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-14">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5"
          >
            <Link href="/" className="w-fit">
              <span
                className="text-xl font-bold tracking-tight"
                style={GRAD_TEXT}
              >
                DigiTreak
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs" style={{ color: P.onDarkMid }}>
              Full-service digital agency delivering enterprise-grade web experiences on
              open-source tech. Full ownership. No lock-in. Since 2015.
            </p>

            {/* Social links */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: P.onDarkDim }}>
                Follow Us
              </p>
              <div className="flex gap-2">
                {socialLinks.map((s) => (
                  <Link
                    key={s.title}
                    href={s.href}
                    aria-label={s.title}
                    className="w-9 h-9 rounded-full flex items-center justify-center
                               transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border:     "1px solid rgba(255,255,255,0.10)",
                      color:      P.onDarkMid,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = GRAD;
                      (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)";
                      (e.currentTarget as HTMLElement).style.color = P.onDarkMid;
                    }}
                  >
                    {s.icon}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Navigation column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: P.onDarkDim }}>
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:opacity-100"
                    style={{ color: P.onDarkMid }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = P.onDark}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = P.onDarkMid}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Offices column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: P.onDarkDim }}>
              Our Offices
            </p>
            <div className="flex flex-col gap-5">
              {offices.map((office) => (
                <div key={office.country}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-base">{office.flag}</span>
                    <p className="text-sm font-semibold" style={{ color: P.onDark }}>
                      {office.country}
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: P.onDarkMid }}>
                    {office.address}
                  </p>
                  <p className="text-xs font-medium mt-1" style={{ color: P.amber }}>
                    {office.phone}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-5"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: P.onDarkDim }}>
              Start a Project
            </p>

            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border:     "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-sm font-semibold mb-1.5" style={{ color: P.onDark }}>
                Ready to build together?
              </p>
              <p className="text-xs leading-relaxed mb-4" style={{ color: P.onDarkMid }}>
                Tell us about your project and we&apos;ll respond within 24 hours.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl
                           text-xs font-bold tracking-wide text-white transition-opacity hover:opacity-85 w-full justify-center"
                style={{ background: GRAD, boxShadow: `0 6px 20px -4px ${P.red}55` }}
              >
                Get in Touch
              </Link>
            </div>

            <div
              className="flex items-center gap-2.5 rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border:     "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <p className="text-xs" style={{ color: P.onDarkMid }}>
                <span className="font-semibold" style={{ color: P.onDark }}>Currently accepting</span>{" "}
                new partnerships
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-center sm:text-left" style={{ color: P.onDarkDim }}>
            © {new Date().getFullYear()} DigiTreak. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {legalLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-xs transition-colors duration-200 hover:opacity-100"
                style={{ color: P.onDarkDim }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = P.onDarkMid}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = P.onDarkDim}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
