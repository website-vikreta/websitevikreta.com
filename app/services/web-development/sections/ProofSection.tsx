'use client'

import { useRef } from 'react'
import { ExternalProjectLink } from '@/components/sections/work/CaseStudyCard'
import { SlopeProjectGrid } from '@/components/sections/work/SlopeProjectGrid'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'
import { WEB_DEV_PROOF_CARDS, WEB_DEV_PROOF_COPY } from '../data'

export default function ProofSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#proof-heading', { trigger: scope.current })
    revealFadeUp('.proof-card', { y: 16, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section
      ref={scope}
      id="proof"
      className="scroll-mt-32 py-16 md:py-20"
      aria-labelledby="proof-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="proof-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            {WEB_DEV_PROOF_COPY.heading}
          </h2>
        </div>

        <SlopeProjectGrid
          items={WEB_DEV_PROOF_CARDS.map((card) => (
            <div key={card.id} className="proof-card h-full">
              <ExternalProjectLink
                title={card.title}
                description={card.catchphrase}
                href={card.href}
                logo={card.thumbnail.kind === 'logo' ? card.thumbnail.src : ''}
                image={card.thumbnail.kind === 'screenshot' ? card.thumbnail.src : undefined}
                imageAlt={card.thumbnail.alt}
                skills={card.stat ?? card.skills ?? ''}
                className="h-full"
              />
            </div>
          ))}
        />
      </div>
    </section>
  )
}
