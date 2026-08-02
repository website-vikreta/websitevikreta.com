// Fallback for the Suspense boundary around a single <FeaturedLabelCarousel>.
export function LabelCarouselSkeleton() {
  return (
    <div className="mb-10 md:mb-14 animate-pulse" aria-hidden="true">
      <div className="mb-6 flex items-end justify-between md:mb-8">
        <div className="h-7 w-40 bg-(--color-bg-muted)" />
        <div className="h-5 w-16 bg-(--color-bg-muted)" />
      </div>
      <div className="flex flex-row gap-6 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-72 shrink-0 sm:w-80">
            <div className="mb-3 aspect-video w-full bg-(--color-bg-muted)" />
            <div className="h-4 w-4/5 bg-(--color-bg-muted)" />
          </div>
        ))}
      </div>
    </div>
  )
}
