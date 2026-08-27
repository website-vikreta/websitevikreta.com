'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { WorkTestimonialsSection } from '@/components/sections/work/WorkTestimonialsSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { ALL_FAQS } from '@/lib/faq-data'
import Hero from './sections/Hero'
import PainSection from './sections/PainSection'
import SolutionSection from './sections/SolutionSection'
import PrinciplesSection from './sections/PrinciplesSection'
import HowWeWork from './sections/HowWeWork'
import ProofSection from './sections/ProofSection'
import ContactSection from './sections/ContactSection'

// Reuses the sitewide FAQ list — only the questions relevant to a design engagement.
const uiUxFaqs = ALL_FAQS.filter((f) => ['5', '6', '11'].includes(f.id))

export default function UiUxClient() {
  return (
    <>
      <DotGrid global />
      <main id="main-content" className="relative z-10">
        <Hero />
        <PainSection />
        <SolutionSection />
        <PrinciplesSection />
        <HowWeWork />
        <ProofSection />
        <WorkTestimonialsSection />
        {/* emitSchema={false}: these Q&As are verbatim from ALL_FAQS, which
            /faq already emits as FAQPage — two blocks for the same Q&As is
            duplicate content. */}
        <FaqSection items={uiUxFaqs} viewAllHref="/faq" ariaLabel="UI/UX design FAQs" emitSchema={false} />
        <ContactSection />
      </main>
      <ScrollToTop />
    </>
  )
}
