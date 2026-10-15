'use client'

import dynamic from 'next/dynamic'
import { DotGrid } from '@/components/ui/DotGrid'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { WEB_DEV_FAQS } from './data'
import Hero from './sections/Hero'
import PainSection from './sections/PainSection'
import ProofSection from './sections/ProofSection'

const SolutionSection = dynamic(() => import('./sections/SolutionSection'))
const HowWeWork = dynamic(() => import('./sections/HowWeWork'))
const SupportSection = dynamic(() => import('./sections/SupportSection'))
const StatsRail = dynamic(() => import('./sections/StatsRail'))
const WorkTestimonialsSection = dynamic(() =>
  import('@/components/sections/work/WorkTestimonialsSection').then((mod) => ({
    default: mod.WorkTestimonialsSection,
  })),
)
const ContactSection = dynamic(() => import('./sections/ContactSection'))
const FaqSection = dynamic(() =>
  import('@/components/sections/FaqSection').then((mod) => ({ default: mod.FaqSection })),
)

export default function WebDevClient() {
  return (
    <>
      <DotGrid global />
      <main id="main-content" className="relative z-10">
        <Hero />
        <PainSection />
        <SolutionSection />
        <HowWeWork />
        <SupportSection />
        <StatsRail />
        <ProofSection />
        <WorkTestimonialsSection />
        <FaqSection items={WEB_DEV_FAQS} ariaLabel="Web Development FAQs" />
        <ContactSection />
      </main>
      <ScrollToTop />
    </>
  )
}
