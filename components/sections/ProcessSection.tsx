'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import { RollingTextList } from '@/components/ui/rolling-list'

export function ProcessSection() {
  return (
    <section
      className="relative py-[var(--section-y)] bg-(--color-bg) overflow-hidden"
      aria-label="Process"
    >
      {/* Decorative background geometry */}
      <div className="absolute inset-0">
        <DotGrid />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-h2 font-bold text-[var(--color-text)]">
            Our Process
          </h2>
        </div>

        {/* Rolling text list */}
        <RollingTextList />
      </div>
    </section>
  )
}
