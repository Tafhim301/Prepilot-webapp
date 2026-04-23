import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    <section className="w-full max-w-6xl px-4 sm:px-8 pb-8 pt-4">
      {/* Glassmorphic card with gradient border */}
      <div
        className="relative rounded-[28px] p-[1.5px]"
        style={{ background: GRAD }}
      >
        {/* Inner frosted glass surface */}
        <div
          className="relative rounded-[26px] px-6 py-5 flex items-center gap-6 overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.62)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        >
          {/* Top gradient glow line */}
          <div
            className="absolute top-0 left-[10%] right-[10%] h-[2px] rounded-full pointer-events-none"
            style={{ background: GRAD_H }}
          />

          {/* Shine overlay */}
          <div
            className="absolute inset-0 rounded-[26px] pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
            }}
          />

          {/* Left label */}
          <div className="hidden sm:flex flex-col items-center gap-0.5 flex-shrink-0 text-center select-none">
            <span
              className="text-[9px] font-bold uppercase tracking-[.16em]"
              style={{ color: P.inkMid }}
            >
              Trusted by
            </span>
            <span className="text-[15px] font-extrabold leading-none" style={GRAD_TEXT}>
              500+
            </span>
            <span
              className="text-[9px] font-bold uppercase tracking-[.16em]"
              style={{ color: P.inkMid }}
            >
              brands
            </span>
          </div>

          {/* Vertical divider */}
          <div
            className="hidden sm:block w-px self-stretch flex-shrink-0"
            style={{ background: P.border }}
          />

          {/* Logo grid */}
          <div
            className="grid grid-cols-4 md:grid-cols-8 flex-1"
            style={{ borderLeft: "none" }}
          >
            {brands.map((brand, i) => (
              <div
                key={brand.alt}
                className="flex items-center justify-center px-3 py-1.5 group"
                style={i > 0 ? { borderLeft: `1px solid ${P.borderMid}` } : undefined}
              >
                <Image
                  src={brand.src}
                  alt={brand.alt}
                  width={90}
                  height={32}
                  className="object-contain grayscale opacity-55 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>

          {/* Vertical divider */}
          <div
            className="hidden md:block w-px self-stretch flex-shrink-0"
            style={{ background: P.border }}
          />

          {/* CTA */}
          <Link
            href="/our-work"
            className="hidden md:inline-flex items-center gap-2 flex-shrink-0 px-5 py-2.5 rounded-full text-[11px] font-bold tracking-[.12em] uppercase text-white transition-all duration-200 hover:opacity-85 hover:-translate-y-px"
            style={{
              background: GRAD,
              boxShadow: `0 6px 20px -4px ${P.red}50`,
            }}
          >
            Our Work <ArrowRightIcon size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
