'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { StatsCounters } from '@/components/sections/StatsCounters'
import { ClientLogosSection } from '@/components/sections/ClientLogosSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { ALL_FAQS } from '@/lib/faq-data'
import Hero from './sections/Hero'
import PainSection from './sections/PainSection'
import GeoExplainerSection from './sections/GeoExplainerSection'
import PillarsSection from './sections/PillarsSection'
import HowWeWork from './sections/HowWeWork'
import ProofSection from './sections/ProofSection'
import ContactSection from './sections/ContactSection'

// Reuses the sitewide FAQ list — only the questions relevant to a marketing engagement.
const digitalMarketingFaqs = ALL_FAQS.filter((f) => ['2', '3', '5', '9', '11'].includes(f.id))

export default function DigitalMarketingClient() {
  return (
    <>
      <DotGrid global />
      <main id="main-content" className="relative z-10">
        {/* TENSION */}
        <Hero />
        <PainSection />
        {/* SHIFT — the concept most competitors don't explain */}
        <GeoExplainerSection />
        {/* RESOLUTION */}
        <PillarsSection />
        <HowWeWork />
        {/* PROOF — real, already-published numbers, real client logos, one real case study. */}
        <StatsCounters bgClassName="" />
        <ClientLogosSection />
        <ProofSection />
        {/* emitSchema={false}: these Q&As are verbatim from ALL_FAQS, which
            /faq already emits as FAQPage — two blocks for the same Q&As is
            duplicate content. */}
        <FaqSection
          items={digitalMarketingFaqs}
          viewAllHref="/faq"
          ariaLabel="Digital marketing and SEO frequently asked questions"
          emitSchema={false}
        />
        {/* INVITATION */}
        <ContactSection />
      </main>
      <ScrollToTop />
    </>
  )
}
