'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import { WorkHeroSection } from '@/components/sections/work/WorkHeroSection'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWorkSection'
import { WorkWebsitesSection } from '@/components/sections/work/WorkWebsitesSection'
import { WorkCTASection } from '@/components/sections/work/WorkCTASection'
import { WorkTestimonialsSection } from '@/components/sections/work/WorkTestimonialsSection'
import { StatsCounters } from '@/components/sections/StatsCounters'
import { FaqSection } from '@/components/sections/FaqSection'
import { WORK_FAQS } from '@/lib/work-data'

export function WorkPageContent() {
  return (
    <main>
      <DotGrid global />
      <WorkHeroSection />
      <FeaturedWorkSection
        id="case-studies"
        heading="Case studies"
        subheading="Real client work with measurable outcomes — not mockups, not concept decks."
        ariaLabel="Case Studies"
      />
      <WorkWebsitesSection />
      {/* No bg — every section on this page sits on the page ground. */}
      <StatsCounters bgClassName="" />
      <WorkTestimonialsSection />
      <FaqSection items={WORK_FAQS} />
      <WorkCTASection />
    </main>
  )
}
