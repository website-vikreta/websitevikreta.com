'use client'

import { useRef } from 'react'
import {
  revealLines,
  revealFadeUp,
  useGsapSection,
  STAGGER,
} from '@/lib/gsap/reveals'
import PainMetricsReveal from './PainMetricsReveal'

export default function PainSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('.pain-h2', { trigger: scope.current })
    revealFadeUp('.pain-p', { y: 20, stagger: STAGGER.loose, delay: 0.1, trigger: scope.current })
    revealFadeUp('.pain-panel', { y: 20, delay: STAGGER.loose * 2, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="pain-heading">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          
          <PainMetricsReveal />

          <div>
            <h2
              id="pain-heading"
              className="pain-h2 text-h3 font-bold tracking-tight text-(--color-text)"
            >
              Vanity Metrics Don&rsquo;t Pay Rent
            </h2>

            <p className="pain-p mt-6 text-body-lg text-(--color-text-muted) leading-relaxed mb-5">
              Your last agency sent a monthly report full of keyword
              positions and impression counts. None of it explained why the
              phone stopped ringing.
            </p>

            <p className="pain-p text-body-lg text-(--color-text-muted) leading-relaxed">
              Paid ads work while you&rsquo;re paying for them and stop the
              day you turn them off. Content sits unpublished because nobody
              owns it. SEO becomes a line item nobody can explain.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
