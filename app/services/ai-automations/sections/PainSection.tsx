'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { revealLines, revealFadeUp, revealClipImage, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

export default function PainSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('.pain-h2', { trigger: scope.current })
    revealFadeUp('.pain-p', { y: 20, stagger: STAGGER.loose, delay: 0.1, trigger: scope.current })
    revealClipImage('.pain-image', { trigger: '.pain-image' })
  })

  return (
    <section ref={scope} className="pb-16 md:pb-20" aria-label="The Part of the Job Nobody Talks About">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="max-w-2xl">
            <h2 className="pain-h2 text-h3 font-bold tracking-tight text-(--color-text) mb-6">
              The Part of the Job Nobody Talks About
            </h2>

            <p className="pain-p text-body-lg text-(--color-text-muted) leading-relaxed mb-5">
              Every business has one. The task that&apos;s just &ldquo;how it&apos;s done.&rdquo;
            </p>

            <p className="pain-p text-body-lg text-(--color-text-muted) leading-relaxed mb-5">
              A team rebuilding the same product image twenty ways. A founder buried in the same customer questions every day. A shoot that costs two weeks and a small fortune, every season.
            </p>

            <p className="pain-p text-body-lg text-(--color-text-muted) leading-relaxed mb-5">
              It works. It&apos;s just slow, and it&apos;s eating hours from people who are worth more than that.
            </p>

            <p className="pain-p text-body-lg text-(--color-text-muted) leading-relaxed">
              That&apos;s where we come in.
            </p>
          </div>

          <div className="pain-image relative w-full aspect-[4/3] overflow-hidden bg-(--color-bg-muted) order-first md:order-last">
            <Image
              src="/our-services/ai-automation/ai-business-process-automation-diagram.webp"
              alt="AI-powered business process automation connecting products, servers, and dashboards"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
