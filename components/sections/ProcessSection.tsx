'use client'

import { Button } from '@/components/ui/Button'
import { RollingTextList } from '@/components/ui/rolling-list'

export function ProcessSection() {
  return (
    <section
      className="relative py-16 md:py-20 bg-[var(--color-bg)]"
      aria-label="Process"
    >
      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-10 md:mb-12 flex items-center justify-between gap-6">
          <h2 className="text-h2 font-bold text-[var(--color-text)]">
            Our Process
          </h2>
          <div className="hidden md:block flex-shrink-0">
            <Button href="/work" variant="ghost" size="sm" showArrow>
              Explore our work
            </Button>
          </div>
        </div>

        {/* Rolling text list */}
        <RollingTextList />
      </div>
    </section>
  )
}
