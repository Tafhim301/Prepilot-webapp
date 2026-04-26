import { Skeleton } from "@/components/ui/skeleton";

function LabelSkeleton() {
  return <Skeleton className="h-6 w-28 rounded-full" />;
}

// ── Service page skeleton ─────────────────────────────────────────────────────
export default function ServiceLoading() {
  return (
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 flex flex-col gap-16 bg-[#0d0c18]">

      {/* Page header */}
      <div className="flex flex-col gap-3 max-w-xl">
        <LabelSkeleton />
        <Skeleton className="h-10 w-72 rounded-xl" />
        <div className="flex flex-col gap-2 mt-1">
          <Skeleton className="h-5 w-full rounded-lg" />
          <Skeleton className="h-5 w-[80%] rounded-lg" />
        </div>
      </div>

      {/* Two-column layout: sidebar + card grid */}
      <div className="grid lg:grid-cols-[320px_1fr] gap-10 items-start">

        {/* Sidebar skeleton */}
        <div className="rounded-2xl p-7 border border-white/10 bg-white/5 flex flex-col gap-5">
          {/* Title + body */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-7 w-36 rounded-lg" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-[90%] rounded" />
            <Skeleton className="h-4 w-[75%] rounded" />
          </div>

          {/* Checklist items */}
          <div className="flex flex-col gap-3 mt-1">
            {[
              "Custom Web Development", "Front-end Development", "Back-end Development",
              "Full-stack Development", "E-commerce Solutions", "WordPress Development",
              "API Integrations", "Web Application", "Webflow Development",
              "E-commerce Development", "Web Interactions & Animations",
              "Technical Planning", "CMS Implementation", "Landing Page Development",
              "Hosting & Domain Setup", "Accessibility Audits", "Quality Assurance", "And More…",
            ].map((_, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <Skeleton className="w-4 h-4 rounded-sm flex-shrink-0" />
                <Skeleton className="h-4 rounded" style={{ width: `${60 + (i % 5) * 12}px` }} />
              </div>
            ))}
          </div>

          {/* CTA pill */}
          <Skeleton className="h-9 w-full rounded-full mt-2" />
        </div>

        {/* Card grid skeleton — 2×3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-7 border border-white/10 bg-white/5 flex flex-col gap-5"
            >
              {/* Icon */}
              <Skeleton className="w-14 h-14 rounded-xl" />

              {/* Title + description */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-52 rounded-lg" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-[85%] rounded" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {[72, 60, 80, 56].map((w, j) => (
                  <Skeleton key={j} className="h-6 rounded-full" style={{ width: w }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
