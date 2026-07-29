'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import { WorkHeroSection } from '@/components/sections/work/WorkHeroSection'
import { WorkCaseStudiesSection } from '@/components/sections/work/WorkCaseStudiesSection'
import { WorkWebsitesSection } from '@/components/sections/work/WorkWebsitesSection'
import { WorkOutcomesSection } from '@/components/sections/work/WorkOutcomesSection'
import { WorkCTASection } from '@/components/sections/work/WorkCTASection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'

export function WorkPageContent() {
  return (
    <main>
      <DotGrid global />
      <WorkHeroSection />
      <WorkCaseStudiesSection />
      <WorkWebsitesSection />
      <WorkOutcomesSection />
      <TestimonialsSection />
      <WorkCTASection />
    </main>
  )
}
