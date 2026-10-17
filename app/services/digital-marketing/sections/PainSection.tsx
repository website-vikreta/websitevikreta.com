'use client'

import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { scrollToHash } from '@/lib/scroll-to-hash'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import PainCollage from './PainCollage'

export default function PainSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('.pain-h2', { trigger: scope.current })
    revealFadeUp('.pain-p', { y: 20, stagger: STAGGER.loose, delay: 0.1, trigger: scope.current })
  })

  // Side-by-side only from xl: at lg the collage needs the full container
  // width, or its absolutely-placed cards collide.
  return (
    <section ref={scope} className="overflow-x-clip py-16 md:py-20" aria-labelledby="pain-heading">
      <div className="container">
        <div className="grid grid-cols-1 gap-14 xl:grid-cols-12 xl:items-center xl:gap-10">
          <div className="xl:col-span-5">
            <h2
              id="pain-heading"
              className="pain-h2 text-h2 font-bold tracking-tight text-(--color-text)"
            >
              Your Marketing <span className="xl:block">Looks Active,</span>{' '}
              <span className="block text-(--color-accent)">But Nothing Is Happening.</span>
            </h2>

            <p className="pain-p mt-6 max-w-lg text-body-lg leading-relaxed text-(--color-text-muted)">
              Rankings, reports, ad spend, a content calendar. Plenty of
              activity, and still the phone doesn&rsquo;t ring.
            </p>

            <div className="pain-p mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="#marketing-audit" variant="primary" size="lg" showArrow>
                Book a Free Marketing Audit
              </Button>
              <a
                href="#problems"
                onClick={(e) => scrollToHash(e, '#problems')}
                className="group inline-flex items-center gap-2 border-b-2 border-(--color-accent) pb-1 text-base font-medium text-(--color-text)"
              >
                See how we fix this
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="xl:col-span-7">
            <PainCollage />
          </div>
        </div>
      </div>
    </section>
  )
}
