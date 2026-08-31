'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { revealLines, revealFadeUp, revealClipImage, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

export default function PainSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, (reduce) => {
    if (reduce) return
    revealLines('.pain-h2', { trigger: scope.current })
    revealFadeUp('.pain-p', { y: 20, stagger: STAGGER.loose, delay: 0.1, trigger: scope.current })
    // Image animates with section but on its own trigger for proper clip timing
    revealClipImage('.pain-image', { trigger: '.pain-image' })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="pain-heading">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">

          <div className="pain-image relative overflow-hidden border border-(--color-border) bg-(--color-surface)">
            <Image
              src="/services/website-losing-customers.webp"
              alt="A visitor walking away through a door from a slow, outdated, poorly-ranking website, versus a fast, polished, well-ranked site that keeps them"
              width={1448}
              height={1086}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>

          <div>
            <h2 id="pain-heading" className="pain-h2 text-h3 font-bold tracking-tight text-(--color-text)">
              The Website That&rsquo;s Quietly Losing You Customers
            </h2>

            <p className="pain-p mt-6 text-body-lg text-(--color-text-muted) leading-relaxed mb-5">
              Every business has one. A site that&rsquo;s &ldquo;good enough,&rdquo; so nobody questions it.
            </p>
            <p className="pain-p text-body-lg text-(--color-text-muted) leading-relaxed mb-5">
              It loads slow on mobile. It doesn&rsquo;t rank. The design still looks like 2019. Visitors notice before you do.
            </p>
            <p className="pain-p text-body-lg text-(--color-text-muted) leading-relaxed mb-5">
              They don&rsquo;t complain. They just leave, and go to whoever showed up first.
            </p>
            <p className="pain-p text-body-lg text-(--color-text-muted) leading-relaxed">
              That&rsquo;s where we come in.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
