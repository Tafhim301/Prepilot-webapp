import { Skeleton } from "@/components/ui/skeleton";

function LabelSkeleton() {
  return <Skeleton className="h-6 w-28 rounded-full" />;
}

// ── Our Work page (ProjectsShowCase) skeleton ─────────────────────────────────
export default function OurWorkLoading() {
  return (
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24 bg-[#0e0b18] min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <LabelSkeleton />
            <Skeleton className="h-12 w-80 rounded-xl" />
            <div className="flex flex-col gap-2 mt-1">
              <Skeleton className="h-5 w-full rounded-lg" />
              <Skeleton className="h-5 w-[78%] rounded-lg" />
            </div>
          </div>
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {[56, 72, 80, 64].map((w, i) => (
              <Skeleton key={i} className="h-8 rounded-full" style={{ width: w }} />
            ))}
          </div>
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-3xl p-8 lg:p-12 border border-white/10 bg-white/5
                         grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-center"
            >
              {/* Left: stacked image preview */}
              <div className="flex items-end justify-center gap-3 min-h-[200px]">
                <Skeleton className="w-[100px] h-[165px] rounded-xl flex-shrink-0" />
                <Skeleton className="w-[120px] h-[195px] rounded-xl flex-shrink-0" />
                <Skeleton className="w-[100px] h-[165px] rounded-xl flex-shrink-0" />
              </div>

              {/* Right: content */}
              <div className="flex flex-col gap-4">
                {/* Client + category */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3 w-24 rounded" />
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>

                {/* Title */}
                <Skeleton className="h-8 w-64 rounded-lg" />

                {/* Description lines */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-[88%] rounded" />
                  <Skeleton className="h-4 w-[72%] rounded" />
                </div>

                {/* Stat chips */}
                <div className="flex gap-4 mt-1">
                  {[...Array(2)].map((_, j) => (
                    <div key={j} className="flex flex-col gap-1.5">
                      <Skeleton className="h-3 w-16 rounded" />
                      <Skeleton className="h-5 w-24 rounded" />
                    </div>
                  ))}
                </div>

                {/* Tag pills */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {[64, 72, 56, 80, 60].map((w, k) => (
                    <Skeleton key={k} className="h-6 rounded-full" style={{ width: w }} />
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-3 mt-2">
                  <Skeleton className="h-10 w-36 rounded-full" />
                  <Skeleton className="w-10 h-10 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
