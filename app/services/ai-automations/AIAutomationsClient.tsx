'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { StatsCounters } from '@/components/sections/StatsCounters'
import { ClientLogosSection } from '@/components/sections/ClientLogosSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { ALL_FAQS } from '@/lib/faq-data'
import Hero from './sections/Hero'
import PainSection from './sections/PainSection'
import PillarsSection from './sections/PillarsSection'
import FixesSection from './sections/FixesSection'
import CalendlyCTABanner from './sections/CalendlyCTABanner'
import HowWeWork from './sections/HowWeWork'
import CapabilitiesStrip from './sections/CapabilitiesStrip'
import WhySection from './sections/WhySection'
import ContactSection from './sections/ContactSection'

/**
 * Automation-relevant subset of the shared FAQ list, per the [Component]
 * shared-FaqSection rule — real published answers only, filtered by id rather
 * than re-written here, so /faq stays the single source of truth.
 * Ids: 3 timeline · 4 automation scope · 5 process · 7 after launch ·
 *      9 existing tools · 11 maintenance.
 */
const AUTOMATION_FAQ_IDS = ['3', '4', '5', '7', '9', '11']
const automationFaqs = ALL_FAQS.filter((faq) => AUTOMATION_FAQ_IDS.includes(faq.id))

export default function AIAutomationsClient() {
  return (
    <>
      <DotGrid global />
      <main id="main-content" className="relative z-10">
        {/* TENSION */}
        <Hero />
        <PainSection />
        {/* SHIFT */}
        <PillarsSection />
        {/* RESOLUTION */}
        <FixesSection />
        {/* Proof — real, already-published numbers and real client logos.
            Reuses the existing sitewide sections rather than forking a
            page-local variant (see the ONE-case-study-section rule). */}
        <StatsCounters bgClassName="" />
        <CalendlyCTABanner />
        <ClientLogosSection />
        <HowWeWork />
        <CapabilitiesStrip />
        <WhySection />
        {/* emitSchema={false}: these Q&As are verbatim from ALL_FAQS, which
            /faq already emits as FAQPage — two blocks for the same Q&As is
            duplicate content. */}
        <FaqSection
          items={automationFaqs}
          viewAllHref="/faq"
          ariaLabel="AI automation frequently asked questions"
          emitSchema={false}
        />
        {/* INVITATION */}
        <ContactSection />
      </main>
      <ScrollToTop />
    </>
  )
}
