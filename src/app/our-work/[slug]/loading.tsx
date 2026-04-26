import { Skeleton } from "@/components/ui/skeleton";

// ── Project detail page skeleton ──────────────────────────────────────────────
export default function ProjectDetailLoading() {
  return (
    <article className="min-h-screen bg-[#0d0b14]">

      {/* Hero banner */}
      <section className="relative w-full min-h-[56vh] flex items-end pb-12 overflow-hidden bg-[#0e0c1a]">
        {/* Breadcrumb */}
        <div className="absolute top-8 left-4 sm:left-10 flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="w-3 h-3 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
          <Skeleton className="w-3 h-3 rounded" />
          <Skeleton className="h-3 w-28 rounded" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col gap-5">
          {/* Category tag */}
          <Skeleton className="h-6 w-32 rounded-full" />

          {/* Title */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-14 w-[70%] rounded-xl" />
            <Skeleton className="h-14 w-[50%] rounded-xl" />
          </div>

          {/* Excerpt */}
          <div className="flex flex-col gap-2 max-w-2xl">
            <Skeleton className="h-5 w-full rounded-lg" />
            <Skeleton className="h-5 w-[85%] rounded-lg" />
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-6 mt-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-5 w-28 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

        {/* Left: article body */}
        <div className="flex flex-col gap-8">

          {/* Cover image */}
          <Skeleton className="w-full aspect-video rounded-2xl" />

          {/* Content blocks */}
          {[...Array(3)].map((_, sec) => (
            <div key={sec} className="flex flex-col gap-4">
              <Skeleton className="h-8 w-56 rounded-lg" />
              <div className="flex flex-col gap-2.5">
                <Skeleton className="h-5 w-full rounded" />
                <Skeleton className="h-5 w-full rounded" />
                <Skeleton className="h-5 w-[92%] rounded" />
                <Skeleton className="h-5 w-[78%] rounded" />
              </div>

              {/* Occasional list */}
              {sec === 1 && (
                <div className="flex flex-col gap-2.5 mt-1 pl-2">
                  {[...Array(4)].map((_, li) => (
                    <div key={li} className="flex items-center gap-3">
                      <Skeleton className="w-2 h-2 rounded-full flex-shrink-0" />
                      <Skeleton className="h-4 rounded" style={{ width: `${120 + li * 24}px` }} />
                    </div>
                  ))}
                </div>
              )}

              {/* Occasional quote block */}
              {sec === 2 && (
                <div className="rounded-r-xl py-5 px-6 border-l-4 border-white/20 bg-white/5 my-2">
                  <Skeleton className="h-5 w-full rounded mb-2" />
                  <Skeleton className="h-5 w-[88%] rounded mb-4" />
                  <Skeleton className="h-3 w-36 rounded" />
                </div>
              )}
            </div>
          ))}

          {/* Second image */}
          <Skeleton className="w-full aspect-video rounded-2xl" />

          {/* More content */}
          <div className="flex flex-col gap-2.5">
            <Skeleton className="h-8 w-64 rounded-lg mb-2" />
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-[90%] rounded" />
            <Skeleton className="h-5 w-[82%] rounded" />
          </div>

          {/* Navigation: prev / next */}
          <div className="flex justify-between gap-4 pt-8 mt-4 border-t border-white/8">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-5 w-40 rounded" />
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-5 w-40 rounded" />
            </div>
          </div>
        </div>

        {/* Right: sticky sidebar */}
        <div className="flex flex-col gap-6">

          {/* Project info card */}
          <div className="rounded-2xl p-6 border border-white/10 bg-white/5 flex flex-col gap-4">
            <Skeleton className="h-5 w-28 rounded-lg" />
            <div className="flex flex-col gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-4 w-28 rounded" />
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-full rounded-xl mt-2" />
          </div>

          {/* Tags card */}
          <div className="rounded-2xl p-6 border border-white/10 bg-white/5 flex flex-col gap-3">
            <Skeleton className="h-5 w-20 rounded-lg" />
            <div className="flex flex-wrap gap-2">
              {[64, 72, 56, 80, 60, 68].map((w, i) => (
                <Skeleton key={i} className="h-6 rounded-full" style={{ width: w }} />
              ))}
            </div>
          </div>

          {/* CTA card */}
          <div className="rounded-2xl p-6 border border-white/10 bg-white/5 flex flex-col gap-3">
            <Skeleton className="h-5 w-48 rounded-lg" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-[80%] rounded" />
            <Skeleton className="h-10 w-full rounded-xl mt-1" />
          </div>
        </div>
      </div>
    </article>
  );
}
