'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { FaqSection } from '@/components/sections/FaqSection'
import type { FaqItem } from '@/lib/faq-data'
import Hero from './sections/Hero'
import PainSection from './sections/PainSection'
import SolutionSection from './sections/SolutionSection'
import HowWeWork from './sections/HowWeWork'
import ProofSection from './sections/ProofSection'
import ContactSection from './sections/ContactSection'

// Page-specific — none of the sitewide ALL_FAQS cover SEO/GEO timelines or
// how paid and organic split, so these are new rather than a filtered subset.
const digitalMarketingFaqs: FaqItem[] = [
  {
    id: 'dm-1',
    question: 'How long until we see SEO results?',
    answer:
      "Most sites see movement in 3 to 6 months, with the first few months spent on technical fixes and content that hasn't had time to rank yet. Anyone promising page-one rankings in 30 days is selling you something that won't hold up.",
  },
  {
    id: 'dm-2',
    question: 'What is GEO, and do I actually need it?',
    answer:
      "GEO is optimizing so AI tools like ChatGPT, Perplexity, and Gemini cite your business when someone asks for a recommendation, not just Google. More people are asking AI those questions instead of searching. If your competitors show up in those answers and you don't, that's lost business you'll never see in a Google Analytics report.",
  },
  {
    id: 'dm-3',
    question: 'Do you run paid ads, or just SEO and content?',
    answer:
      'Both, planned together instead of separately. Paid gets you leads while SEO and content are still building. Once organic traffic ramps up, we shift budget out of paid rather than running both at full spend indefinitely.',
  },
  {
    id: 'dm-4',
    question: 'How do you report on results?',
    answer:
      "Leads, cost per lead, and revenue where we can trace it, not impressions or keyword positions with no context. You'll know what a ranking or a piece of content is actually worth to your business.",
  },
]

export default function DigitalMarketingClient() {
  return (
    <>
      <DotGrid global />
      <main id="main-content" className="relative z-10">
        <Hero />
        <PainSection />
        <SolutionSection />
        <HowWeWork />
        <ProofSection />
        <FaqSection items={digitalMarketingFaqs} ariaLabel="Digital Marketing FAQs" />
        <ContactSection />
      </main>
      <ScrollToTop />
    </>
  )
}
