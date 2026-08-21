'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWorkSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { ContactCTASection } from '@/components/sections/ContactCTASection'
import Hero from './sections/Hero'
import PainSection from './sections/PainSection'
import FixesSection from './sections/FixesSection'
import ProcessSection from './sections/ProcessSection'
import type { FaqItem } from '@/lib/faq-data'

const appsCrmFaqs: FaqItem[] = [
  {
    id: 'apps-crm-1',
    question: 'Do you build on top of a CRM like HubSpot or Zoho, or from scratch?',
    answer:
      'Either, depending on what you actually need. If an off-the-shelf CRM covers 80% of your process, we configure and integrate that instead of billing you for a custom rebuild. If your workflow genuinely doesn\'t fit any of them, we build a custom system. We\'ll tell you honestly which one you need.',
  },
  {
    id: 'apps-crm-2',
    question: 'How is this different from just buying an off-the-shelf CRM?',
    answer:
      'Off-the-shelf tools are built for the average business, so you end up reshaping your process to fit the software — or bolting on spreadsheets for the parts it can\'t handle. A custom build goes the other way: the system fits how you already work, and every screen does something your team actually needs.',
  },
  {
    id: 'apps-crm-3',
    question: 'Will my team need training to use it?',
    answer:
      'We build every launch around your team using it on day one — walkthroughs, documentation, and a training session before we hand over the keys. If it needs a manual to figure out, we consider that a build problem, not a training problem.',
  },
  {
    id: 'apps-crm-4',
    question: 'Can you migrate our existing data?',
    answer:
      'Yes. Customer records, past orders, tickets — whatever is currently living in spreadsheets or an old system gets migrated over as part of the build, not left behind for someone to re-enter by hand.',
  },
  {
    id: 'apps-crm-5',
    question: 'Do you build mobile apps for iOS and Android, or just web apps?',
    answer:
      'Both. Most internal tools and customer portals we build are web-based since that\'s faster to ship and update. When a real native app is the right call — App Store presence, offline use, device features — we build for iOS and Android too.',
  },
  {
    id: 'apps-crm-6',
    question: 'What happens if something breaks after launch?',
    answer:
      'We stay on. Launch is when real usage starts, and that\'s when the actual edge cases show up. We offer ongoing support and maintenance so it keeps running as your business changes, not just for the first 30 days.',
  },
]

export default function AppsCrmClient() {
  return (
    <>
      <DotGrid global />
      <main id="main-content" className="relative z-10">
        <Hero />
        <PainSection />
        <FixesSection />
        <ProcessSection />
        <FeaturedWorkSection
          heading="Built, Shipped, and Still Running"
          subheading="Here's what we've built for other businesses, and what changed once it shipped."
          ariaLabel="Apps & CRM Work"
        />
        <FaqSection items={appsCrmFaqs} ariaLabel="Apps & CRM FAQs" />
        <ContactCTASection
          id="book-audit"
          heading="Tell Us What's Held Together by Spreadsheets"
          subheading="Book a free systems audit. We'll tell you honestly what's worth building custom and what isn't, before you spend anything."
          formHeading="Book a Free Systems Audit"
          subjectPlaceholder="What system are you trying to fix?"
          messagePlaceholder="Describe the tools or spreadsheets you're currently stitching together…"
        />
      </main>
    </>
  )
}
