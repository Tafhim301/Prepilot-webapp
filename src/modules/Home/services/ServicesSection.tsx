"use client";

import { Check, ArrowUpRight } from "lucide-react";
import { motion, cubicBezier } from "framer-motion";

const services = [
  {
    icon: "🎨",
    title: "Strategic UI/UX Design",
    description:
      "User-centric interfaces that optimize conversion rates and drive meaningful engagement.",
    tags: ["Figma", "Prototyping", "User Research", "Design Systems"],
    href: "#",
  },
  {
    icon: "⚛️",
    title: "MERN Stack Development",
    description:
      "Full-stack JavaScript applications built with MongoDB, Express, React, and Node.js.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    href: "#",
  },
  {
    icon: "🌐",
    title: "Custom Web Architecture",
    description:
      "Secure, high-performance web applications tailored to complex business logic.",
    tags: ["Next.js", "React", "Node.js", "REST & GraphQL"],
    href: "#",
  },
  {
    icon: "🔷",
    title: "WordPress Development",
    description:
      "Custom themes, plugins, and headless WordPress setups for content-driven sites.",
    tags: ["Custom Themes", "Plugins", "WooCommerce", "Headless CMS"],
    href: "#",
  },
  {
    icon: "💧",
    title: "Webflow Development",
    description:
      "Pixel-perfect Webflow builds with CMS, animations, and full client handoff.",
    tags: ["Webflow CMS", "Interactions", "E-commerce", "SEO"],
    href: "#",
  },
  {
    icon: "🛒",
    title: "E-commerce Solutions",
    description:
      "Conversion-optimized storefronts with seamless checkout and payment integrations.",
    tags: ["Shopify", "WooCommerce", "Stripe", "Headless"],
    href: "#",
  },
];

const summaryText = [
  "Custom Web Development",
  "Front-end Development",
  "Back-end Development",
  "Full-stack Development",
  "E-commerce Solutions",
  "WordPress Development",
  "API Integrations",
  "Web Application",
  "Webflow Development",
  "E-commerce Development",
  "Web Interactions & Animations",
  "Technical Planning",
  "CMS Implementation",
  "Landing Page Development",
  "Hosting & Domain Setup",
  "Accessibility Audits",
  "Quality Assurance",
  "And More...",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

function ServiceCard({
  icon,
  title,
  description,
  tags,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col gap-5 bg-white border border-gray-200 rounded-2xl p-7 cursor-pointer overflow-hidden"
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl transition-opacity duration-300" />

      <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-2xl select-none z-10">
        {icon}
      </div>

      <div className="flex flex-col gap-2 z-10">
        <h3 className="text-xl font-bold text-gray-950 tracking-tight">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2 z-10">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-600 bg-gray-50 group-hover:border-gray-300 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={href}
        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mt-auto z-10 w-fit"
      >
        See More
        <motion.span
          className="inline-flex"
          whileHover={{ x: 2, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUpRight size={15} />
        </motion.span>
      </a>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-16 flex flex-col gap-16 scroll-mt-20"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3 max-w-xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          What We Do
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950">
          Services built for scale
        </h2>
        <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
          End-to-end digital solutions for teams that want to own their stack —
          no lock-in, no compromises.
        </p>
      </motion.div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* In Summary — sticky sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) }}
          className="lg:sticky lg:top-24 w-full lg:w-[300px] xl:w-[340px] flex-shrink-0 flex flex-col gap-6"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-950">In Summary</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              We keep things neat behind the scenes — making it easy to update,
              maintain and get the most out of your website.
            </p>
          </div>

          <motion.ul
            className="flex flex-col gap-2"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {summaryText.map((text, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                className="flex items-center gap-2.5 group/item"
              >
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 group-hover/item:text-gray-950 transition-colors">
                  {text}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <div className="inline-flex flex-wrap items-center gap-2 bg-gray-950 text-white rounded-full px-4 py-2.5 text-xs font-medium w-fit mt-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            Accepting New Partnerships
            <span className="text-gray-500">|</span>
            <a
              href="#"
              className="font-semibold hover:text-gray-300 transition-colors inline-flex items-center gap-1"
            >
              Contact Us <ArrowUpRight size={12} />
            </a>
          </div>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}