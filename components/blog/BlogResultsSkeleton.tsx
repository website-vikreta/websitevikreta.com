import { LabelCarouselSkeleton } from './LabelCarouselSkeleton'

// Fallback for the Suspense boundary around <BlogResults> — mirrors that
// component's shape (hero, carousel row, category pills, card grid) so the
// layout doesn't jump once real content streams in. Reuses
// LabelCarouselSkeleton for the carousel row rather than duplicating its markup.
export function BlogResultsSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      {/* Hero — placeholder blocks carry the exact same font-size/leading/height
          classes as the real title/description in FeaturedBlogHero(Carousel), so
          the em-based fixed heights resolve identically and swapping in real
          content never shifts the layout. */}
      <div className="mb-10 md:mb-14">
        <div className="border border-(--color-border) lg:grid lg:grid-cols-2 lg:items-stretch lg:aspect-[32/9]">
          <div className="aspect-video lg:aspect-auto bg-(--color-bg-muted)" />
          <div className="flex flex-col justify-center overflow-hidden p-6 sm:p-8 lg:px-12 lg:py-8">
            <div className="h-4 w-32 bg-(--color-bg-muted) mb-4" />
            <div className="h-[3.3em] text-3xl sm:text-4xl leading-[1.1] mb-4">
              <div className="h-full w-3/4 bg-(--color-bg-muted)" />
            </div>
            <div className="h-[5.1em] text-base leading-[1.7] mb-6 max-w-[52ch]">
              <div className="h-full w-full bg-(--color-bg-muted)" />
            </div>
            <div className="h-4 w-28 bg-(--color-bg-muted)" />
          </div>
        </div>

        {/* Carousel dot/arrow controls — mt-4 + h-9. Without this row the
            skeleton is 52px shorter than the real FeaturedBlogHeroCarousel and
            everything below jumps when the hero streams in. */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-6 rounded-full bg-(--color-border-strong)" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-full bg-(--color-border-strong)" />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="h-9 w-9 border border-(--color-border)" />
            <div className="h-9 w-9 border border-(--color-border)" />
          </div>
        </div>
      </div>

      {/* Carousel row */}
      <LabelCarouselSkeleton />

      {/* Heading */}
      <div className="mb-10 md:mb-14 h-9 w-48 bg-(--color-bg-muted)" />

      {/* Category pills */}
      <div className="mb-10 md:mb-14 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-20 shrink-0 rounded-full border border-(--color-border)" />
        ))}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 md:gap-x-[3.125rem] md:gap-y-[6.25rem]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <div className="mb-5 aspect-video w-full bg-(--color-bg-muted)" />
            <div className="mb-3 h-5 w-4/5 bg-(--color-bg-muted)" />
            <div className="mb-2 h-4 w-full bg-(--color-bg-muted)" />
            <div className="h-4 w-2/3 bg-(--color-bg-muted)" />
          </div>
        ))}
      </div>
    </div>
  )
}
