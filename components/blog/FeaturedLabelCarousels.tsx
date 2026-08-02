import { Suspense } from 'react'
import { fetchLabelsWithPosts } from '@/sanity/lib/fetch'
import { FeaturedLabelCarousel } from './FeaturedLabelCarousel'
import { LabelCarouselSkeleton } from './LabelCarouselSkeleton'

interface FeaturedLabelCarouselsProps {
  /** Slug of the post already shown as the page hero — dropped from every row so it isn't duplicated. */
  excludeSlug?: string
}

/** Server Component — one snap-scrolling row per Sanity label that has posts (e.g. "Top Reads", "WV Recommendations"). Each row streams in independently via its own Suspense boundary. Renders nothing if no labels have posts yet. */
export async function FeaturedLabelCarousels({ excludeSlug }: FeaturedLabelCarouselsProps) {
  const labels = await fetchLabelsWithPosts()
  if (labels.length === 0) return null

  return (
    <>
      {labels.map((label) => (
        <Suspense key={label._id} fallback={<LabelCarouselSkeleton />}>
          <FeaturedLabelCarousel
            title={label.title}
            labelSlug={label.slug.current}
            excludeSlug={excludeSlug}
          />
        </Suspense>
      ))}
    </>
  )
}
