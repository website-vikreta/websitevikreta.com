'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { revealLines, revealFadeUp, revealClipImage, useGsapSection } from '@/lib/gsap/reveals'

export default function PainSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('.pain-h2', { trigger: scope.current })
    revealFadeUp('.pain-intro', { y: 20, delay: 0.1, trigger: scope.current })
    revealClipImage('.pain-image', { trigger: '.pain-image' })
  })

  return (
    <section
      ref={scope}
      className="py-16 md:py-20"
      aria-labelledby="pain-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* Left: the scene — manual grind vs. the same business running
              itself. Half-width on desktop so it reads as an illustration
              beside the copy, not a full-bleed hero graphic. */}
          <div className="pain-image relative overflow-hidden border border-(--color-border) bg-(--color-surface)">
            <Image
              src="/services/manual-work-vs-automated.webp"
              alt="Left: a team buried in manual work, rebuilding the same product images by hand, answering repeat customer messages, running a studio photo shoot and packing boxes. Right: the same business running on automation, with one person watching a dashboard while an AI assistant, analytics, email and order fulfilment run themselves."
              width={1672}
              height={941}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>

          <div>
            <h2
              id="pain-heading"
              className="pain-h2 text-h3 font-bold tracking-tight text-(--color-text)"
            >
              The part of the job nobody talks about
            </h2>
            <p className="pain-intro mt-6 text-body-lg leading-relaxed text-(--color-text-muted)">
              Every business has one. Editing the same product photo twenty times
              for every new collection. Answering the same five customer questions
              by hand, every day. Booking a photo shoot that eats two weeks and a
              lot of money, every season. It&apos;s just how it&apos;s always been
              done, so nobody counts the hours it takes away from the work only
              your team can do.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
