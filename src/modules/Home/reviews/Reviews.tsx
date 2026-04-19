"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import reviews from "@/data/reviews.json";

const avatarImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
];

const enriched = reviews.map((r, i) => ({
  ...r,
  avatar: avatarImages[i % avatarImages.length],
}));

function ReviewCard({ review }: { review: (typeof enriched)[0] }) {
  const [clicked, setClicked] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 600);
      }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="relative flex-shrink-0 w-[300px] mx-3 cursor-pointer select-none"
    >
      {/* Click burst */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        animate={{ opacity: clicked ? 1 : 0, scale: clicked ? 1.06 : 1 }}
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(53.78% 0.1561 3.111 / 0.2) 0%, transparent 65%)",
        }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10 rounded-2xl bg-card/70 backdrop-blur-md border border-white/10 shadow-md hover:shadow-xl transition-shadow duration-300 p-5 h-full flex flex-col gap-3 overflow-hidden">
        {/* Top shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Stars */}
        <div className="flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed flex-1 line-clamp-4">
          &ldquo;{review.review}&rdquo;
        </p>

        <div className="flex items-center gap-3 pt-3 border-t border-border/30">
          <div className="relative">
            <Avatar className="w-9 h-9">
              <AvatarImage src={review.avatar} alt={review.name} />
              <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                {review.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-card" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-none mb-0.5">{review.name}</p>
            <p className="text-xs text-muted-foreground">{review.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
  duration = 40,
}: {
  items: (typeof enriched);
  reverse?: boolean;
  duration?: number;
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-2 group">
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    </div>
  );
}

export default function Reviews() {
  return (
    <>
      {/* CSS keyframes injected once */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee var(--marquee-duration, 40s) linear infinite;
          will-change: transform;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse var(--marquee-duration, 40s) linear infinite;
          will-change: transform;
        }
        /* Pause on hover for the whole row */
        .group:hover .animate-marquee,
        .group:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
      `}</style>

      <section className="py-10 bg-background overflow-hidden relative">
        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-400/5 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[80px]" />
        </div>

        {/* Header */}
        <motion.div
          className="text-center mb-16 px-6 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-widest uppercase mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Wall of Love
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Trusted by creatives
            <br />
            <span className="italic font-light text-muted-foreground">and leaders</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
            Join thousands of teams who prepare smarter with PrePilot every day.
          </p>
        </motion.div>

        {/* Marquee rows */}
        <div className="flex flex-col gap-4 relative z-10">
          <MarqueeRow items={enriched} reverse={false} duration={35} />
          <MarqueeRow items={[...enriched].reverse()} reverse={true} duration={42} />
        </div>
      </section>
    </>
  );
}