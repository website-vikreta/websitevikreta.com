'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { FaqSection } from '@/components/sections/FaqSection'
import ContactSection from '@/app/services/ai-automations/sections/ContactSection'
import type { FaqItem } from '@/lib/faq-data'
import Hero from './sections/Hero'
import PainSection from './sections/PainSection'
import ProductRevealSection from './sections/ProductRevealSection'
import CartRecoverySection from './sections/CartRecoverySection'
import PackagesSection from './sections/PackagesSection'
import OnboardingSection from './sections/OnboardingSection'
import ProofSection from './sections/ProofSection'

const WHATSAPP_FAQS: FaqItem[] = [
  {
    id: 'wa-1',
    question: 'Is this a chatbot or a full platform?',
    answer:
      'A full platform. CRM, WhatsApp messaging, cart recovery, order updates, chatbots, AI agents, and automation workflows. All in one dashboard, deployed on your brand.',
  },
  {
    id: 'wa-2',
    question: 'Do I need Shopify, or does it work with other stores?',
    answer:
      'Shopify has the deepest integration. Cart recovery, COD confirmation, and order sync are built for it. WooCommerce and custom stores work too; we wire the webhooks to match your stack.',
  },
  {
    id: 'wa-3',
    question: 'How long until cart recovery is live?',
    answer:
      'Most clients go live in 7 to 14 days. That includes Meta verification, template approval, and connecting your store. We handle the setup; you approve and go.',
  },
  {
    id: 'wa-4',
    question: 'What about WhatsApp opt-in and compliance?',
    answer:
      'Explicit opt-in is required. A checkout phone field alone does not count. We set up an unticked consent checkbox, one-click opt-out, and DPDP-compliant data handling before any message goes out.',
  },
  {
    id: 'wa-5',
    question: 'What is included in setup vs monthly cost?',
    answer:
      'Setup covers platform configuration, Meta verification, template approval, and store wiring. Monthly covers the platform subscription; Meta per-message charges (Utility and Marketing) are billed separately based on usage.',
  },
  {
    id: 'wa-6',
    question: 'Can you fix my checkout too, or just WhatsApp?',
    answer:
      'Both. We audit checkout friction: pricing transparency, guest checkout, UPI placement, page speed. Then we layer WhatsApp recovery on top. Fixing checkout first often lifts recovery more than messaging alone.',
  },
  {
    id: 'wa-7',
    question: 'What happens if Meta rejects a message template?',
    answer:
      'We revise and resubmit. Template approval is part of onboarding. Most templates clear in 24 to 48 hours; rejections usually mean wording or category issues we fix before resubmitting.',
  },
]

export default function WhatsAppAutomationClient() {
  return (
    <>
      <DotGrid global />
      <main id="main-content" className="relative z-10">
        <Hero />
        <PainSection />
        <ProductRevealSection />
        <CartRecoverySection />
        <PackagesSection />
        <OnboardingSection />
        <ProofSection />
        <FaqSection
          items={WHATSAPP_FAQS}
          ariaLabel="WhatsApp automation frequently asked questions"
          emitSchema={false}
        />
        <ContactSection />
      </main>
      <ScrollToTop />
    </>
  )
}
