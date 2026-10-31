'use client'

import { useRef } from 'react'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'

export default function PivotStorySection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#pivot-heading', { trigger: scope.current })
    revealFadeUp('.pivot-body', { y: 20, stagger: STAGGER.base, trigger: scope.current })
    revealFadeUp('.pivot-stat', { y: 16, stagger: STAGGER.tight, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="pivot-heading">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">

          {/* Left — heading + story */}
          <div>
            <h2
              id="pivot-heading"
              className="text-h3 font-bold tracking-tight text-(--color-text)"
            >
              Five years building websites. Then we stopped doing it the old way.
            </h2>
            <p className="pivot-body mt-6 text-body-lg leading-relaxed text-(--color-text-muted)">
              Website Vikreta started as a web development agency. We were good at the craft —
              and spending 60% of our week on work a system could do: scheduling, emails,
              proposals, moving candidate data between spreadsheets.
            </p>
            <p className="pivot-body mt-4 text-body-lg leading-relaxed text-(--color-text-muted)">
              So we automated it. Every system we built for ourselves became a system we
              could hand to a client. That&apos;s the pivot. The proof is on this page.
            </p>

            <div className="pivot-stat mt-10 grid grid-cols-3 gap-6 border-t border-(--color-border) pt-8">
              {[
                { n: '5+', label: 'Years operating' },
                { n: '6', label: 'Internal systems' },
                { n: '100%', label: 'Make.com orchestrated' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <p className="text-3xl font-bold text-(--color-text)">{n}</p>
                  <p className="mt-1 text-sm text-(--color-text-faint)">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — placeholder image/video: agency before/after visual */}
          <div className="relative order-first aspect-[4/3] w-full overflow-hidden border border-(--color-border) bg-(--color-bg-muted) lg:order-last">
            {/* ↓ Replace with actual screenshot/video of the team or the Make.com dashboard */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-(--color-text-faint)">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
                <rect x="1" y="1" width="38" height="38" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3"/>
                <path d="M16 20l5-4 5 4M20 16v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className="text-xs font-medium uppercase tracking-widest">Image placeholder</p>
              <p className="text-[11px] text-center max-w-[180px]">Make.com scenario overview or team working photo</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
