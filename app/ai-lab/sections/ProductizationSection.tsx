'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'

const BRANCHES = [
  'AI UGC Automation',
  'Voice Agent',
  'WhatsApp Automation',
  'HR Automation',
  'Proposal Writing',
  'Content Generation',
  'AI Automation',
]

export default function ProductizationSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#product-heading', { trigger: scope.current })
    revealFadeUp('.product-body', { y: 20, stagger: STAGGER.base, trigger: scope.current })
    revealFadeUp('.branch-item', { y: 14, stagger: STAGGER.tight, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20 bg-(--color-surface)" aria-labelledby="product-heading">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">

          {/* Left */}
          <div>
            <h2
              id="product-heading"
              className="text-h3 font-bold tracking-tight text-(--color-text)"
            >
              What started as internal tooling is becoming a product portfolio.
            </h2>
            <p className="product-body mt-6 text-body-lg leading-relaxed text-(--color-text-muted)">
              Every system on this page began as a problem we needed to solve for ourselves.
              We are packaging these as commercial products — individual automations,
              functional bundles, and full-suite implementations any business can run.
            </p>

            {/* Placeholder — replace with a product portfolio diagram or brochure image */}
            <div className="product-body relative mt-8 aspect-[4/3] w-full overflow-hidden border border-(--color-border) bg-(--color-bg-muted)">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-(--color-text-faint)">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
                  <rect x="1" y="1" width="38" height="38" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3"/>
                  <rect x="9" y="14" width="9" height="14" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                  <rect x="22" y="9" width="9" height="19" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                <p className="text-xs font-medium uppercase tracking-widest">Image placeholder</p>
                <p className="max-w-[180px] text-center text-[11px]">Product portfolio diagram or packaging visual</p>
              </div>
            </div>

            <div className="product-body mt-8">
              <Button href="/contact" variant="primary" size="md" showArrow>
                Build this for my business
              </Button>
            </div>
            <p className="product-body mt-5 text-sm text-(--color-text-faint)">
              Or explore our{' '}
              <Link
                href="/services/ai-automations"
                className="inline-flex items-center gap-0.5 underline underline-offset-3 hover:text-(--color-text) transition-colors duration-150"
              >
                AI Automations service
                <ArrowUpRight size={12} strokeWidth={2} aria-hidden />
              </Link>
            </p>
          </div>

          {/* Right — branch list */}
          <div>
            <ul className="flex flex-col divide-y divide-(--color-border) border-t border-(--color-border)">
              {BRANCHES.map((name, i) => (
                <li key={name} className="branch-item flex items-center gap-4 py-4">
                  <span className="font-mono text-xs text-(--color-text-faint) tracking-[0.06em]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-semibold text-(--color-text)">{name}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
