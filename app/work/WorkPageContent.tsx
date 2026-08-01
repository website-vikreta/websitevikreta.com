'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import { WorkHeroSection } from '@/components/sections/work/WorkHeroSection'
import { WorkCaseStudiesSection } from '@/components/sections/work/WorkCaseStudiesSection'
import { WorkWebsitesSection } from '@/components/sections/work/WorkWebsitesSection'
import { WorkCTASection } from '@/components/sections/work/WorkCTASection'
import { WorkTestimonialsSection } from '@/components/sections/work/WorkTestimonialsSection'
import { ClientLogosSection } from '@/components/sections/ClientLogosSection'
import { StatsCounters } from '@/components/sections/StatsCounters'
import { FaqSection } from '@/components/sections/FaqSection'
import { WORK_FAQS } from '@/lib/work-data'

export function WorkPageContent() {
  return (
    <main>
      <DotGrid global />
      <WorkHeroSection />
      <WorkCaseStudiesSection />
      <ClientLogosSection />
      <WorkWebsitesSection />
      <StatsCounters />
      <WorkTestimonialsSection />
      <FaqSection items={WORK_FAQS} />
      <WorkCTASection />
    </main>
  )
}
