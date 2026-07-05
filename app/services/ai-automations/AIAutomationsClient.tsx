'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import Hero from './sections/Hero'
import PainSection from './sections/PainSection'
import FixesSection from './sections/FixesSection'
import HowWeWork from './sections/HowWeWork'
import WhySection from './sections/WhySection'
import ContactSection from './sections/ContactSection'

export default function AIAutomationsClient() {

  return (
    <>
      <DotGrid global />
      <main id="main-content" className="relative z-10">
        <Hero />
        <PainSection />
        <FixesSection />
        <HowWeWork />
        <WhySection />
        <ContactSection />
      </main>
    </>
  )
}
