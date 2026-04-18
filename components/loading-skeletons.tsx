import { cn } from "@/lib/utils"

// Shimmer effect component
function Shimmer() {
  return (
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}

// Base skeleton component
function SkeletonBase({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-md bg-muted/50", className)}>
      <Shimmer />
    </div>
  )
}

// Hero Skeleton
export function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="flex justify-center">
            <SkeletonBase className="h-9 w-48 rounded-full" />
          </div>

          {/* Title */}
          <div className="space-y-4">
            <SkeletonBase className="h-12 md:h-20 w-full max-w-3xl mx-auto" />
            <SkeletonBase className="h-12 md:h-20 w-full max-w-2xl mx-auto" />
          </div>

          {/* Description */}
          <div className="space-y-3 max-w-2xl mx-auto pt-4">
            <SkeletonBase className="h-6 w-full" />
            <SkeletonBase className="h-6 w-4/5 mx-auto" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <SkeletonBase className="h-12 w-40 rounded-full" />
            <SkeletonBase className="h-12 w-40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <SkeletonBase className="absolute top-1/4 left-10 w-20 h-20 rounded-full" />
      <SkeletonBase className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full" />
    </section>
  )
}

// Project Card Skeleton
export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden border border-border bg-card/50 backdrop-blur-sm rounded-lg">
      {/* Image */}
      <SkeletonBase className="h-48 w-full rounded-none" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Badge and Year */}
        <div className="flex items-center justify-between">
          <SkeletonBase className="h-5 w-20 rounded-full" />
          <SkeletonBase className="h-4 w-12" />
        </div>

        {/* Title */}
        <SkeletonBase className="h-7 w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-2/3" />
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          <SkeletonBase className="h-6 w-16 rounded-full" />
          <SkeletonBase className="h-6 w-20 rounded-full" />
          <SkeletonBase className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// Projects Grid Skeleton (6 cards)
export function ProjectsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Service Card Skeleton
export function ServiceCardSkeleton() {
  return (
    <div className="border border-border/50 bg-card/50 backdrop-blur-sm rounded-lg p-8 space-y-6">
      {/* Icon */}
      <SkeletonBase className="h-16 w-16 rounded-2xl" />

      {/* Title */}
      <SkeletonBase className="h-8 w-3/4" />

      {/* Description */}
      <div className="space-y-2">
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-5/6" />
        <SkeletonBase className="h-4 w-4/5" />
      </div>

      {/* Hover indicator */}
      <SkeletonBase className="h-5 w-40" />
    </div>
  )
}

// Services Grid Skeleton (4 cards)
export function ServicesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Admin Table Row Skeleton
function TableRowSkeleton() {
  return (
    <tr className="border-b border-border">
      <td className="p-4">
        <SkeletonBase className="h-12 w-20 rounded-md" />
      </td>
      <td className="p-4">
        <div className="space-y-2 max-w-[300px]">
          <SkeletonBase className="h-5 w-3/4" />
          <SkeletonBase className="h-4 w-full" />
        </div>
      </td>
      <td className="p-4">
        <SkeletonBase className="h-6 w-20 rounded-full" />
      </td>
      <td className="p-4">
        <div className="flex gap-1 max-w-[200px]">
          <SkeletonBase className="h-5 w-14 rounded-full" />
          <SkeletonBase className="h-5 w-16 rounded-full" />
          <SkeletonBase className="h-5 w-12 rounded-full" />
        </div>
      </td>
      <td className="p-4">
        <SkeletonBase className="h-5 w-12" />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <SkeletonBase className="h-8 w-8 rounded-md" />
          <SkeletonBase className="h-8 w-8 rounded-md" />
        </div>
      </td>
    </tr>
  )
}

// Admin Dashboard Table Skeleton
export function AdminTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center gap-4">
        <SkeletonBase className="h-10 w-full max-w-sm" />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="p-4 text-left">
                <SkeletonBase className="h-4 w-12" />
              </th>
              <th className="p-4 text-left">
                <SkeletonBase className="h-4 w-16" />
              </th>
              <th className="p-4 text-left">
                <SkeletonBase className="h-4 w-20" />
              </th>
              <th className="p-4 text-left">
                <SkeletonBase className="h-4 w-24" />
              </th>
              <th className="p-4 text-left">
                <SkeletonBase className="h-4 w-12" />
              </th>
              <th className="p-4 text-left">
                <SkeletonBase className="h-4 w-16" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Stats Counter Skeleton
export function StatsCounterSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="text-center space-y-2">
          <SkeletonBase className="h-12 w-24 mx-auto" />
          <SkeletonBase className="h-5 w-32 mx-auto" />
        </div>
      ))}
    </div>
  )
}

// Timeline Skeleton
export function TimelineSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-6">
          <div className="flex flex-col items-center">
            <SkeletonBase className="h-12 w-12 rounded-full" />
            {i < 3 && <SkeletonBase className="h-24 w-0.5 mt-2" />}
          </div>
          <div className="flex-1 space-y-3 pb-8">
            <SkeletonBase className="h-6 w-32" />
            <SkeletonBase className="h-5 w-48" />
            <div className="space-y-2">
              <SkeletonBase className="h-4 w-full" />
              <SkeletonBase className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Testimonial Card Skeleton
export function TestimonialCardSkeleton() {
  return (
    <div className="border border-border/50 bg-card/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-4">
        <SkeletonBase className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <SkeletonBase className="h-5 w-32" />
          <SkeletonBase className="h-4 w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-4 w-3/4" />
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBase key={i} className="h-4 w-4" />
        ))}
      </div>
    </div>
  )
}
