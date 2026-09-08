'use client'

import { useRef } from 'react'
import { FeatureSteps } from '@/components/ui/feature-steps'
import { revealLines, useGsapSection } from '@/lib/gsap/reveals'
import { WEB_DEV_SUPPORT } from '../data'

export default function SupportSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#support-heading', { trigger: scope.current })
  })

  return (
    <section
      ref={scope}
      className="border-t border-(--color-border) py-16 md:py-20"
      aria-labelledby="support-heading"
    >
      <div className="container">
        <h2
          id="support-heading"
          className="mb-10 max-w-2xl text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text) md:mb-14"
        >
          {WEB_DEV_SUPPORT.headingBefore}
          <br />
          {WEB_DEV_SUPPORT.headingMid}
          <br />
          <span style={{ color: 'var(--color-accent)' }}>{WEB_DEV_SUPPORT.headingAccent}</span>
        </h2>

        <FeatureSteps
          autoPlayInterval={WEB_DEV_SUPPORT.autoPlayInterval}
          imageTransition={0.35}
          features={WEB_DEV_SUPPORT.items.map((item) => ({
            step: item.step,
            title: item.title,
            content: item.body,
            image: item.image,
            imageAlt: item.imageAlt,
          }))}
        />
      </div>
    </section>
  )
}
