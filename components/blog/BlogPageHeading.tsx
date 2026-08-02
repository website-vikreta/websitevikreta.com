'use client'

import { RevealText } from '@/components/ui/Reveal'

// Extracted from BlogListingClient so it renders in the static page shell —
// outside the Suspense boundary around the Sanity-backed results — instead
// of waiting on the posts fetch to resolve.
export function BlogPageHeading() {
  return (
    <div className="mb-10 md:mb-14">
      <RevealText
        as="h1"
        className="text-h2 font-bold leading-[1.1] tracking-tight text-(--color-text)"
      >
        Blogs
      </RevealText>
    </div>
  )
}
