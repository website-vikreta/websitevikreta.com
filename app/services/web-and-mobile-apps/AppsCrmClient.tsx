'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import { FaqSection } from '@/components/sections/FaqSection'
import { ALL_FAQS } from '@/lib/faq-data'
import Hero from './sections/Hero'
import PainSection from './sections/PainSection'
import SolutionSection from './sections/SolutionSection'
import HowWeWork from './sections/HowWeWork'
import ProofSection from './sections/ProofSection'
import ContactSection from './sections/ContactSection'

// Reuses the sitewide FAQ list — only the questions relevant to an apps/CRM build.
const appsCrmFaqs = ALL_FAQS.filter((f) => ['1', '9', '11'].includes(f.id))

export default function AppsCrmClient() {
  return (
    <>
      <DotGrid global />
      <main id="main-content" className="relative z-10">
        <Hero />
        <PainSection />
        <SolutionSection />
        <HowWeWork />
        <ProofSection />
        <FaqSection items={appsCrmFaqs} ariaLabel="Apps & CRM FAQs" />
        <ContactSection />
      </main>
    </>
  )
}
