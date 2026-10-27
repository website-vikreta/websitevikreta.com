'use client'

import { ScrollToTop } from '@/components/ui/ScrollToTop'
import Hero from './sections/Hero'
import PivotStorySection from './sections/PivotStorySection'
import SystemsGridSection from './sections/SystemsGridSection'
import MeherSpotlightSection from './sections/MeherSpotlightSection'
import ProductizationSection from './sections/ProductizationSection'
import { FaqSection } from '@/components/sections/FaqSection'
import ContactSection from './sections/ContactSection'

const AI_LAB_FAQS = [
  {
    id: 'al-1',
    question: 'Is Meher available as a product for other businesses?',
    answer:
      'Yes — Meher is part of our HR Automation product line. We can build and deploy a version configured for your hiring workflow, employment types, and team. Reach out to discuss scope.',
  },
  {
    id: 'al-2',
    question: 'What tools power your automation stack?',
    answer:
      'Make.com is the orchestration layer for all our workflows. Sanity handles content and application forms. Telegram is the interface for Meher. Microsoft Excel and OneDrive hold the structured HR data. We use AI models (GPT-4o and others) for document generation and intent parsing.',
  },
  {
    id: 'al-3',
    question: 'Can you build something like this for my business?',
    answer:
      'That is exactly what we do. Every system shown here started as a real problem we had or a client had. We scope it, build it on Make.com, test it, and hand it over documented. See our AI Automations service for the full picture.',
  },
  {
    id: 'al-4',
    question: 'How long did it take to build Meher?',
    answer:
      'The core HR pipeline — application intake through hiring decision — took about three weeks to build and test end-to-end. The Telegram bot layer and conversational UX improvements have been iterated on continuously since. Most automation systems like this are live within four to six weeks.',
  },
  {
    id: 'al-5',
    question: 'Do these systems require technical knowledge to operate?',
    answer:
      'No. The whole point is that the HR team runs Meher through Telegram using plain language. No one needs to touch Make.com or the underlying data directly. The same principle applies to every system we build — the person who uses it should not need to understand how it works.',
  },
]

export default function AiLabClient() {
  return (
    <>
      <Hero />
      <PivotStorySection />
      <SystemsGridSection />
      <MeherSpotlightSection />
      <ProductizationSection />
      <FaqSection
        items={AI_LAB_FAQS}
        heading="Questions about our stack"
        viewAllHref="/contact"
        ariaLabel="AI Lab frequently asked questions"
        emitSchema={true}
      />
      <ContactSection />
      <ScrollToTop />
    </>
  )
}
