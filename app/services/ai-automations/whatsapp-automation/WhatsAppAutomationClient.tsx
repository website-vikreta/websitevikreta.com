'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { FaqSection } from '@/components/sections/FaqSection'
import { WHATSAPP_FAQS } from './faqs'
import dynamic from 'next/dynamic'
import Hero from './sections/Hero'
import PainSection, { RtoSection } from './sections/PainSection'
import ProductRevealSection from './sections/ProductRevealSection'
const CartRecoverySection = dynamic(() => import('./sections/CartRecoverySection'))
const ConversationalAISection = dynamic(() => import('./sections/ConversationalAISection'))
const PackagesSection = dynamic(() => import('./sections/PackagesSection'))
const OnboardingSection = dynamic(() => import('./sections/OnboardingSection'))
const ProofSection = dynamic(() => import('./sections/ProofSection'))
const ResultsSection = dynamic(() => import('./sections/ResultsSection'))
const ContactSection = dynamic(() => import('./sections/ContactSection'))
import StickyMobileCta from './components/StickyMobileCta'

export default function WhatsAppAutomationClient() {
  return (
    <>
      <DotGrid global />
      <main id="main-content" className="relative z-10">
        <Hero />
        <PainSection />
        <ProductRevealSection />
        <ConversationalAISection />
        <CartRecoverySection />
        <RtoSection />
        <ProofSection />
        <PackagesSection />
        <OnboardingSection />
        <ResultsSection />
        <FaqSection
          items={WHATSAPP_FAQS}
          heading="WhatsApp automation FAQs"
          ariaLabel="WhatsApp automation frequently asked questions"
        />
        <ContactSection />
      </main>
      <StickyMobileCta />
      <ScrollToTop />
    </>
  )
}
