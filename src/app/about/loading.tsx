import { Skeleton } from "@/components/ui/skeleton";

function LabelSkeleton() {
  return <Skeleton className="h-6 w-28 rounded-full" />;
}

// ── Hero skeleton ─────────────────────────────────────────────────────────────
function AboutHeroSkeleton() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#0d0b14] px-4 sm:px-6 lg:px-10">
      <div className="relative z-10 max-w-7xl mx-auto py-24 w-full">
        <div className="max-w-4xl flex flex-col gap-6">
          <LabelSkeleton />

          {/* Headline — 3 lines */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-[72px] w-72 rounded-xl" />
            <Skeleton className="h-[72px] w-80 rounded-xl" />
            <Skeleton className="h-[72px] w-56 rounded-xl" />
          </div>

          {/* Sub-copy */}
          <div className="flex flex-col gap-2 max-w-2xl mt-2">
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-6 w-[90%] rounded-lg" />
            <Skeleton className="h-6 w-[75%] rounded-lg" />
          </div>

          {/* CTAs */}
          <div className="flex gap-4 mt-2">
            <Skeleton className="h-12 w-44 rounded-full" />
            <Skeleton className="h-12 w-36 rounded-full" />
          </div>
        </div>

        {/* Floating stat chips — desktop */}
        <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/5">
              <Skeleton className="w-4 h-4 rounded" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-6 w-14 rounded" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Story skeleton ─────────────────────────────────────────────────────────────
function StorySkeleton() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10 bg-[#110e1e]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">

        {/* Left text */}
        <div className="flex flex-col gap-5">
          <LabelSkeleton />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-11 w-80 rounded-xl" />
            <Skeleton className="h-11 w-64 rounded-xl" />
          </div>
          <div className="flex flex-col gap-2.5 mt-2">
            {[100, 95, 88, 100, 90, 82, 100, 78].map((w, i) => (
              <Skeleton key={i} className="h-5 rounded" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>

        {/* Right quote card */}
        <div className="rounded-3xl p-8 sm:p-10 border border-white/10 bg-white/5 flex flex-col gap-6">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-full rounded" />
            <Skeleton className="h-6 w-[95%] rounded" />
            <Skeleton className="h-6 w-[88%] rounded" />
            <Skeleton className="h-6 w-[72%] rounded" />
          </div>
          <div className="flex items-center gap-4 pt-4 border-t border-white/8">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-36 rounded" />
              <Skeleton className="h-3 w-44 rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Values skeleton ───────────────────────────────────────────────────────────
function ValuesSkeleton() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10 bg-[#0f0c1d]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <LabelSkeleton />
          <Skeleton className="h-12 w-72 rounded-xl" />
          <Skeleton className="h-12 w-48 rounded-xl" />
          <div className="flex flex-col items-center gap-2 mt-2 max-w-xl">
            <Skeleton className="h-5 w-full rounded-lg" />
            <Skeleton className="h-5 w-[84%] rounded-lg" />
          </div>
        </div>

        {/* 3×2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl p-7 border border-white/10 bg-white/5 flex flex-col gap-5">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-44 rounded-lg" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-[88%] rounded" />
                <Skeleton className="h-4 w-[72%] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Timeline skeleton ─────────────────────────────────────────────────────────
function TimelineSkeleton() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10 bg-[#0d0b14]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <LabelSkeleton />
          <Skeleton className="h-12 w-64 rounded-xl" />
          <Skeleton className="h-12 w-56 rounded-xl" />
        </div>

        {/* Timeline items */}
        <div className="relative flex flex-col gap-0 pl-10 lg:pl-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`relative flex items-center py-8 gap-8 ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              <div className={`flex-1 lg:${i % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                <div
                  className={`inline-block rounded-2xl p-6 border border-white/10 bg-white/5 ${
                    i % 2 === 0 ? "" : "text-left"
                  } max-w-sm`}
                >
                  <Skeleton className="h-3 w-12 rounded mb-3" />
                  <Skeleton className="h-5 w-48 rounded-lg mb-2" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-[80%] rounded mt-1" />
                </div>
              </div>
              <div className="hidden lg:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Team skeleton ─────────────────────────────────────────────────────────────
function TeamSkeleton() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-10 bg-[#110e1e]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <LabelSkeleton />
          <Skeleton className="h-12 w-60 rounded-xl" />
          <Skeleton className="h-12 w-52 rounded-xl" />
          <Skeleton className="h-5 w-72 rounded-lg mt-2" />
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl p-7 border border-white/10 bg-white/5 flex flex-col gap-5">
              <div className="flex items-start justify-between">
                <Skeleton className="w-14 h-14 rounded-2xl" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-5 w-40 rounded-lg" />
                <Skeleton className="h-3.5 w-28 rounded" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-[85%] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About page loading ────────────────────────────────────────────────────────
export default function AboutLoading() {
  return (
    <main>
      <AboutHeroSkeleton />
      <StorySkeleton />
      <ValuesSkeleton />
      <TimelineSkeleton />
      <TeamSkeleton />
    </main>
  );
}
