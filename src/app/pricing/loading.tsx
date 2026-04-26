import { Skeleton } from "@/components/ui/skeleton";

function LabelSkeleton() {
  return <Skeleton className="h-6 w-28 rounded-full" />;
}

// ── Pricing page skeleton ─────────────────────────────────────────────────────
export default function PricingLoading() {
  return (
    <div className="min-h-screen bg-[#0d0b14] px-4 sm:px-6 lg:px-10 py-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* Page header */}
        <div className="flex flex-col items-center gap-4 text-center max-w-3xl mx-auto">
          <LabelSkeleton />
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-14 w-72 rounded-xl" />
            <Skeleton className="h-14 w-56 rounded-xl" />
          </div>
          <div className="flex flex-col items-center gap-2 mt-2">
            <Skeleton className="h-5 w-96 rounded-lg" />
            <Skeleton className="h-5 w-80 rounded-lg" />
          </div>

          {/* Billing toggle */}
          <div className="mt-4 flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            <Skeleton className="h-10 w-28 rounded-full" />
            <Skeleton className="h-10 w-28 rounded-full" />
          </div>
        </div>

        {/* Plan cards — 3 col */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {[false, true, false].map((highlight, i) => (
            <div
              key={i}
              className={`relative flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-white/5 ${
                highlight ? "lg:-mt-4 border-white/20" : ""
              }`}
            >
              {/* Most popular badge */}
              {highlight && (
                <div className="flex justify-center pt-4">
                  <Skeleton className="h-6 w-32 rounded-full" />
                </div>
              )}

              <div className="p-7 sm:p-8 flex flex-col gap-6">
                {/* Plan name + tagline */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-7 w-24 rounded-lg" />
                  <Skeleton className="h-4 w-48 rounded" />
                </div>

                {/* Price block */}
                <div className="flex items-end gap-2">
                  <Skeleton className="h-12 w-28 rounded-lg" />
                  <Skeleton className="h-5 w-16 rounded mb-1" />
                </div>

                {/* CTA button */}
                <Skeleton className="h-12 w-full rounded-xl" />

                {/* Divider */}
                <div className="h-px bg-white/8" />

                {/* Feature list */}
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-4 w-32 rounded mb-1" />
                  {[...Array(highlight ? 8 : 6)].map((_, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <Skeleton className="w-4 h-4 rounded-sm flex-shrink-0" />
                      <Skeleton
                        className="h-4 rounded"
                        style={{ width: `${60 + (j % 4) * 15}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature comparison table header */}
        <div className="flex flex-col items-center gap-3 text-center mt-4">
          <LabelSkeleton />
          <Skeleton className="h-10 w-64 rounded-xl" />
          <Skeleton className="h-5 w-80 rounded-lg" />
        </div>

        {/* Comparison table */}
        <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-4 border-b border-white/8 p-5 gap-4">
            <Skeleton className="h-5 w-24 rounded" />
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-20 rounded mx-auto" />
            ))}
          </div>

          {/* Table rows */}
          {[...Array(8)].map((_, row) => (
            <div
              key={row}
              className="grid grid-cols-4 p-5 gap-4 border-b border-white/5 last:border-0 items-center"
            >
              <Skeleton className="h-4 rounded" style={{ width: `${50 + (row % 4) * 15}%` }} />
              {[...Array(3)].map((_, col) => (
                <div key={col} className="flex justify-center">
                  <Skeleton className="w-5 h-5 rounded-sm" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* FAQ section */}
        <div className="flex flex-col gap-5 max-w-3xl mx-auto w-full">
          <div className="flex flex-col items-center gap-3 text-center mb-4">
            <LabelSkeleton />
            <Skeleton className="h-10 w-48 rounded-xl" />
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="rounded-2xl p-5 border border-white/10 bg-white/5 flex items-center justify-between gap-4">
              <Skeleton className="h-5 rounded" style={{ width: `${55 + (i % 3) * 12}%` }} />
              <Skeleton className="w-5 h-5 rounded flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
