'use client'

import { useRef } from 'react'
import { Search, Sparkles, FileText, BarChart3 } from 'lucide-react'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'

interface Pillar {
  icon: typeof Search
  title: string
  line: string
}

const PILLARS: Pillar[] = [
  {
    icon:  Search,
    title: 'Rank on Google',
    line:  'Technical SEO, keyword strategy, and on-page fixes that move you up for terms people actually search.',
  },
  {
    icon:  Sparkles,
    title: 'Get cited by AI',
    line:  'GEO — structuring your content so ChatGPT, Perplexity, and AI Overviews quote you as the source.',
  },
  {
    icon:  FileText,
    title: 'Convert the traffic',
    line:  'Content and landing pages written for the person reading, not just the crawler indexing.',
  },
  {
    icon:  BarChart3,
    title: 'Know what worked',
    line:  'Reporting tied to leads and revenue, not vanity traffic numbers nobody can act on.',
  },
]

export default function PillarsSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#pillars-heading', { trigger: scope.current })
    revealFadeUp('.pillar', { y: 24, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="pillars-heading">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="pillars-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            What a campaign with us covers
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
          {PILLARS.map(({ icon: Icon, title, line }) => (
            <div key={title} className="pillar">
              <Icon
                size={40}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-(--color-accent)"
              />
              <h3 className="mt-5 font-sans text-2xl font-bold leading-[1.15] text-(--color-text)">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-(--color-text-muted)">
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
