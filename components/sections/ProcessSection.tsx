'use client'

import { NetworkGeometry } from '@/components/ui/NetworkGeometry'
import { RollingTextList } from '@/components/ui/rolling-list'

export function ProcessSection() {
  return (
    <section
      className="relative py-[var(--section-y)] bg-(--color-bg) overflow-hidden"
      aria-label="Process"
    >
      {/* Decorative background geometry */}
      <NetworkGeometry />

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
