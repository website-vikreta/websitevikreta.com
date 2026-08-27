'use client'

import { useRef } from 'react'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'

interface Term {
  label:       string
  description: string
}

const TERMS: Term[] = [
  {
    label:       'SEO',
    description:
      'Getting your page to rank on Google’s results page, so a person searching finds and clicks you.',
  },
  {
    label:       'GEO',
    description:
      'Getting your business named directly inside an AI-generated answer, on ChatGPT, Perplexity, or Google’s AI Overview, before a list of links even shows up.',
  },
]

export default function GeoExplainerSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#geo-heading', { trigger: scope.current })
    revealFadeUp('.geo-row', { y: 20, stagger: STAGGER.loose, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="geo-heading">
      <div className="container">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <h2 id="geo-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            SEO and GEO Aren&rsquo;t the Same Thing
          </h2>
        </div>

        <div className="border-t border-(--color-border)">
          {TERMS.map((term) => (
            <div
              key={term.label}
              className="geo-row grid grid-cols-1 gap-3 border-b border-(--color-border) py-10 md:grid-cols-12 md:gap-8 md:py-12"
            >
              <span
                className={`text-2xl font-bold leading-[1.1] md:col-span-2 ${
                  term.label === 'GEO' ? 'text-(--color-accent)' : 'text-(--color-text)'
                }`}
              >
                {term.label}
              </span>
              <p className="text-body-lg leading-relaxed text-(--color-text-muted) md:col-span-10">
                {term.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
