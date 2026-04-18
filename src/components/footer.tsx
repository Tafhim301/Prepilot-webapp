"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  FacebookLogoIcon,
  LinkedinLogoIcon,
  BehanceLogo,
  DribbbleLogoIcon,
} from "@phosphor-icons/react";
import Logo from "./Logo";
import Link from "next/link";

type FooterLink = { title: string; href: string };

const usefulLinks: FooterLink[] = [
  { title: "Home", href: "#" },
  { title: "Blog", href: "#" },
  { title: "About Us", href: "#" },
  { title: "Partnership", href: "#" },
  { title: "Works", href: "#" },
  { title: "Affiliate", href: "#" },
  { title: "Pricing", href: "#" },
  { title: "Terms & Conditions", href: "#" },
  { title: "", href: "" },
  { title: "Privacy Policy", href: "#" },
];

const socialLinks = [
  { title: "Facebook", href: "#", icon: <FacebookLogoIcon size={18} /> },
  { title: "LinkedIn", href: "#", icon: <LinkedinLogoIcon size={18} /> },
  { title: "Instagram", href: "#", icon: <DribbbleLogoIcon size={18} /> },
  { title: "X", href: "#", icon: <BehanceLogo size={18} /> },
];

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const shouldReduceMotion = useReducedMotion();

  return shouldReduceMotion ? (
    <div className={className}>{children}</div>
  ) : (
    <motion.div
      className={className}
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
    >
      {children}
    </motion.div>
  );
}



export function Footer() {
  return (
    <footer className="relative w-full border-t overflow-hidden">
  
   
      

      <div className="w-full mx-auto px-10 md:px-16 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand Column */}
        <AnimatedContainer delay={0.1} className="space-y-5">
          <Logo />
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
            Reestify helps B2B companies grow, with exceptional user experiences
            to make it stand out in the market.
          </p>
          <div>
            <p className="font-bold text-sm text-gray-800 mb-3">Follow Us</p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <Link
                  key={s.title}
                  href={s.href}
                  aria-label={s.title}
                  className="w-9 h-9 rounded-full bg-[#0d3d30] text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>
        </AnimatedContainer>

 
        <AnimatedContainer delay={0.2} className="space-y-5">
          <h3 className="font-bold text-sm text-gray-800">Useful Links</h3>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
            {usefulLinks.map((link, i) =>
              link.title ? (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ) : (
                <li key={`spacer-${i}`} />
              )
            )}
          </ul>
        </AnimatedContainer>

        {/* Location Column */}
        <AnimatedContainer delay={0.3} className="space-y-5">
          <h3 className="font-bold text-sm text-gray-800">Location</h3>
          <div>
            <p className="text-sm font-semibold text-primary mb-1">
              United States
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              30 N Gould St Ste R
              <br />
              Sheridan, WY 82801
              <br />
              +1 307 459 1578
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary mb-1">
              Bangladesh
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              House-2/1A, Post Office Road,
              <br />
              Mirpur-11, Dhaka-1216
              <br />
              +880 9611 656798
            </p>
          </div>
        </AnimatedContainer>
      </div>

      {/* Bottom bar */}
      <div className="border-t py-4 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Reestify All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

