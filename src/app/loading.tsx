import { Skeleton } from "@/components/ui/skeleton";

// ── Reusable section label skeleton ──────────────────────────────────────────
function LabelSkeleton() {
  return <Skeleton className="h-6 w-28 rounded-full" />;
}

// ── Hero section skeleton ─────────────────────────────────────────────────────
function HeroSkeleton() {
  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#0d0b14]">
      <div className="flex-1 flex items-center px-4 sm:px-8 lg:px-14 xl:px-20 pt-24 pb-16">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 xl:gap-16 items-center">

          {/* Left column */}
          <div className="flex flex-col gap-7">
            {/* Tag row */}
            <div className="flex gap-2.5">
              <Skeleton className="h-7 w-28 rounded-full" />
              <Skeleton className="h-7 w-36 rounded-full" />
              <Skeleton className="h-7 w-32 rounded-full" />
            </div>
            {/* Headline — 3 lines */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-16 w-48 rounded-xl" />
              <Skeleton className="h-16 w-80 rounded-xl" />
              <Skeleton className="h-16 w-72 rounded-xl" />
            </div>
            {/* Subheading */}
            <div className="flex flex-col gap-2 max-w-[540px]">
              <Skeleton className="h-5 w-full rounded-lg" />
              <Skeleton className="h-5 w-[90%] rounded-lg" />
              <Skeleton className="h-5 w-[75%] rounded-lg" />
            </div>
            {/* Service pills */}
            <div className="flex flex-wrap gap-2">
              {[80, 96, 88, 92, 80, 112].map((w, i) => (
                <Skeleton key={i} className="h-8 rounded-full" style={{ width: w }} />
              ))}
            </div>
            {/* CTA row */}
            <div className="flex gap-3">
              <Skeleton className="h-12 w-44 rounded-xl" />
              <Skeleton className="h-12 w-36 rounded-xl" />
            </div>
            {/* Social proof */}
            <div className="flex items-center gap-4 pt-1">
              <div className="flex -space-x-2.5">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-8 h-8 rounded-full border-2 border-[#0d0b14]" />
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-3 w-36 rounded" />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="hidden lg:flex flex-col gap-5">
            {/* macOS card */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              {/* Titlebar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/7">
                <div className="flex gap-2">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <Skeleton className="w-3 h-3 rounded-full" />
                </div>
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              {/* 2×2 service grid */}
              <div className="grid grid-cols-2 gap-px bg-white/5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-2.5 p-5 bg-white/[0.03]">
                    <Skeleton className="w-9 h-9 rounded-lg" />
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-3 w-32 rounded" />
                  </div>
                ))}
              </div>
            </div>
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="rounded-2xl p-5 border border-white/10 bg-white/5 flex flex-col gap-3">
                  <div className="flex justify-between items-end">
                    <Skeleton className="h-9 w-16 rounded-lg" />
                    <Skeleton className="h-3 w-16 rounded" />
                  </div>
                  <Skeleton className="h-1.5 w-full rounded-full" />
                  <Skeleton className="h-3 w-28 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stat strip */}
      <div className="border-t border-white/7">
        <div className="max-w-[1400px] mx-auto grid grid-cols-3 sm:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 py-5 px-6">
              <Skeleton className="h-5 w-12 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Services section skeleton ─────────────────────────────────────────────────
function ServicesSkeleton() {
  return (
    <section className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 bg-[#110e1e]">
      <div className="flex flex-col gap-5 max-w-xl mb-16">
        <LabelSkeleton />
        <Skeleton className="h-10 w-72 rounded-xl" />
        <Skeleton className="h-5 w-full rounded-lg" />
        <Skeleton className="h-5 w-[80%] rounded-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl p-7 border border-white/10 bg-white/5 flex flex-col gap-5">
            <Skeleton className="w-14 h-14 rounded-xl" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-48 rounded-lg" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-[85%] rounded" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[60, 72, 56, 80].map((w, j) => (
                <Skeleton key={j} className="h-6 rounded-full" style={{ width: w }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Our Work section skeleton ─────────────────────────────────────────────────
function OurWorkSkeleton() {
  return (
    <section className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 bg-[#0e0b18]">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <LabelSkeleton />
            <Skeleton className="h-10 w-64 rounded-xl" />
            <Skeleton className="h-5 w-80 rounded-lg" />
          </div>
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
        {/* Project cards */}
        <div className="flex flex-col gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl p-6 border border-white/10 bg-white/5 flex flex-col sm:flex-row gap-6 items-center">
              {/* Image stack */}
              <div className="flex items-end gap-2 flex-shrink-0">
                <Skeleton className="w-[90px] h-[148px] rounded-xl" />
                <Skeleton className="w-[110px] h-[175px] rounded-xl" />
                <Skeleton className="w-[90px] h-[148px] rounded-xl" />
              </div>
              {/* Content */}
              <div className="flex flex-col gap-3 flex-1">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-7 w-64 rounded-lg" />
                <div className="flex gap-5">
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-3 w-16 rounded" />
                    <Skeleton className="h-5 w-28 rounded" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-3 w-16 rounded" />
                    <Skeleton className="h-5 w-24 rounded" />
                  </div>
                </div>
                <Skeleton className="h-4 w-28 rounded" />
              </div>
              {/* Arrow */}
              <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Reviews section skeleton ──────────────────────────────────────────────────
function ReviewsSkeleton() {
  return (
    <section className="py-16 sm:py-20 bg-[#100d1c]">
      <div className="text-center mb-14 px-4">
        <div className="flex justify-center mb-5"><LabelSkeleton /></div>
        <Skeleton className="h-12 w-72 rounded-xl mx-auto mb-2" />
        <Skeleton className="h-12 w-56 rounded-xl mx-auto mb-4" />
        <Skeleton className="h-5 w-64 rounded-lg mx-auto" />
      </div>
      {/* Marquee rows placeholder */}
      <div className="flex flex-col gap-4 overflow-hidden">
        {[...Array(2)].map((_, row) => (
          <div key={row} className="flex gap-5 px-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[300px] rounded-2xl p-5 border border-white/10 bg-white/5 flex flex-col gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, s) => <Skeleton key={s} className="w-3.5 h-3.5 rounded" />)}
                </div>
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-[90%] rounded" />
                <Skeleton className="h-4 w-[75%] rounded" />
                <div className="flex items-center gap-3 pt-3 border-t border-white/7">
                  <Skeleton className="w-9 h-9 rounded-full" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-3.5 w-24 rounded" />
                    <Skeleton className="h-3 w-20 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Home page loading ─────────────────────────────────────────────────────────
export default function HomeLoading() {
  return (
    <main>
      <HeroSkeleton />
      <ServicesSkeleton />
      <OurWorkSkeleton />
      <ReviewsSkeleton />
    </main>
  );
}
