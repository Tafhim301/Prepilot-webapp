import { Skeleton } from "@/components/ui/skeleton";

// ── Contact page skeleton ─────────────────────────────────────────────────────
export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-[#0c0b17] px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* Page header */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-28 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-16 w-80 rounded-xl" />
            <Skeleton className="h-16 w-56 rounded-xl" />
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10 xl:gap-16 items-start">

          {/* LEFT: sidebar info */}
          <div className="flex flex-col gap-8">

            {/* Tagline */}
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-8 w-52 rounded-lg" />
              <div className="flex flex-col gap-2 mt-1">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-[88%] rounded" />
                <Skeleton className="h-4 w-[72%] rounded" />
              </div>
            </div>

            {/* Trust stats — 2×2 grid */}
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-2xl p-4 border border-white/10 bg-white/5 flex flex-col gap-1.5">
                  <Skeleton className="h-8 w-16 rounded" />
                  <Skeleton className="h-3 w-28 rounded" />
                </div>
              ))}
            </div>

            {/* Contact info rows */}
            <div className="flex flex-col gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
                  <Skeleton className="h-4 rounded" style={{ width: `${120 + i * 20}px` }} />
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="rounded-2xl px-5 py-4 border border-white/10 bg-white/5 flex items-center gap-3">
              <Skeleton className="w-2.5 h-2.5 rounded-full flex-shrink-0" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-52 rounded" />
                <Skeleton className="h-3 w-40 rounded" />
              </div>
            </div>
          </div>

          {/* RIGHT: form card */}
          <div className="relative rounded-3xl p-8 md:p-10 border border-white/10 bg-white/5">

            {/* Form heading */}
            <div className="mb-8 flex flex-col gap-2">
              <Skeleton className="h-7 w-64 rounded-lg" />
              <Skeleton className="h-4 w-48 rounded" />
            </div>

            <div className="flex flex-col gap-6">

              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <Skeleton className="h-3.5 w-24 rounded" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                ))}
              </div>

              {/* Row 2: Org + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <Skeleton className="h-3.5 w-28 rounded" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                ))}
              </div>

              {/* Row 3: Budget + Service dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <Skeleton className="h-3.5 w-32 rounded" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                ))}
              </div>

              {/* Message textarea */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3.5 w-28 rounded" />
                  <Skeleton className="h-3 w-14 rounded" />
                </div>
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>

              {/* Submit button */}
              <Skeleton className="h-14 w-full rounded-2xl" />

              {/* Privacy note */}
              <Skeleton className="h-3.5 w-56 rounded mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
