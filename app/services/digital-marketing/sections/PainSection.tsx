'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  revealLines,
  revealFadeUp,
  revealClipImage,
  useGsapSection,
  STAGGER,
} from '@/lib/gsap/reveals'

export default function PainSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('.pain-h2', { trigger: scope.current })
    revealFadeUp('.pain-p', { y: 20, stagger: STAGGER.loose, delay: 0.1, trigger: scope.current })
    revealClipImage('.pain-diagram', { scale: false, trigger: '.pain-diagram' })
  })

  return (
    <section ref={scope} className="pb-16 md:pb-20" aria-labelledby="pain-heading">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="max-w-xl">
            <h2
              id="pain-heading"
              className="pain-h2 text-h3 font-bold tracking-tight text-(--color-text) mb-6"
            >
              Page One on Google. Zero Calls From It.
            </h2>

            <p className="pain-p text-body-lg text-(--color-text-muted) leading-relaxed mb-5">
              You&rsquo;re ranking for a phrase nobody buys on. Or you&rsquo;re
              getting traffic that lands, reads, and leaves — because the page
              was written for the algorithm, not the person who needed it.
            </p>

            <p className="pain-p text-body-lg text-(--color-text-muted) leading-relaxed">
              And now there&rsquo;s a second problem: the people asking ChatGPT
              or Perplexity instead of Google never see you at all. Most
              agencies still aren&rsquo;t optimizing for that.
            </p>
          </div>

          <div className="pain-diagram order-first md:order-last relative overflow-hidden border border-(--color-border) bg-(--color-surface)">
            <Image
              src="/our-services/digital-marketing-systems.webp"
              alt="A search results page and an AI chat answer shown side by side, illustrating the gap between ranking on Google and being cited in an AI-generated answer"
              width={1448}
              height={1086}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
