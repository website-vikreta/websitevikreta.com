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
          <div key={i} className="flex w-72 shrink-0 flex-col sm:w-80">
            <div className="mb-5 aspect-video w-full bg-(--color-bg-muted)" />
            <div className="mb-3 h-5 w-4/5 bg-(--color-bg-muted)" />
            <div className="mb-2 h-4 w-full bg-(--color-bg-muted)" />
            <div className="mb-5 h-4 w-2/3 bg-(--color-bg-muted)" />
            <div className="flex items-center justify-between border-t border-(--color-border) pt-4">
              <div className="h-3 w-20 bg-(--color-bg-muted)" />
              <div className="h-3 w-16 bg-(--color-bg-muted)" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
