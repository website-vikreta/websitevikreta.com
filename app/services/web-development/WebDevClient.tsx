'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FaqSection } from '@/components/sections/FaqSection'
import type { FaqItem } from '@/lib/faq-data'
import Hero from './sections/Hero'
import PainSection from './sections/PainSection'
import WhatWeBuildSection from './sections/WhatWeBuildSection'
import ProjectsSection from './sections/ProjectsSection'
import HowWeWork from './sections/HowWeWork'
import WhySection from './sections/WhySection'
import ContactSection from './sections/ContactSection'

const webDevFaqs: FaqItem[] = [
  {
    id: 'webdev-1',
    question: 'How long does it take to build a website?',
    answer:
      'Most business websites take 3 to 6 weeks from kickoff to launch, depending on the number of pages, content readiness, and how quickly feedback comes back during review. Larger builds with custom features or CMS integration can take longer. We\'ll give you a realistic timeline upfront, not an aggressive one we can\'t hit.',
  },
  {
    id: 'webdev-2',
    question: 'Do you build custom websites or use templates?',
    answer:
      'Every site we build is custom-coded from scratch using Next.js and Tailwind CSS, not a theme with your logo swapped in. That means your site is built around your brand and goals, not squeezed into someone else\'s layout, and it\'s faster and more flexible to extend later.',
  },
  {
    id: 'webdev-3',
    question: 'Will my website be optimized for SEO and mobile from day one?',
    answer:
      'Yes. Every site we ship includes proper metadata, sitemaps, semantic HTML, fast load times, and mobile-first responsive design as standard, not as an add-on. SEO isn\'t something we bolt on after launch; it\'s part of how the site is built.',
  },
  {
    id: 'webdev-4',
    question: 'How much does a custom website cost?',
    answer:
      'Pricing depends on scope. Number of pages, custom functionality, and CMS needs all factor in. We\'ll give you a clear, itemized quote after understanding your requirements, with no hidden costs added later.',
  },
  {
    id: 'webdev-5',
    question: 'Do I own the code and content after the project is delivered?',
    answer:
      'Yes, completely. Once the project is delivered, the code and content are yours. No licensing fees, no lock-in, and no dependency on us to keep the site running.',
  },
  {
    id: 'webdev-6',
    question: 'Do you offer support or maintenance after launch?',
    answer:
      'Yes. We offer post-launch support for bug fixes, content updates, and ongoing maintenance, so your site keeps running smoothly as your business grows. We can walk you through options once your site is live.',
  },
]

export default function WebDevClient() {
  return (
    <>
      <DotGrid global />
      <main id="main-content" className="relative z-10">
        <Hero />
        {/* SHIFT — capability up front, then the problem it solves, then how it happens */}
        <WhatWeBuildSection />
        <PainSection />
        <HowWeWork />
        {/* RESOLUTION — proof, back to back, then trust + objections */}
        <ProjectsSection />
        <TestimonialsSection />
        <WhySection />
        {/* INVITATION */}
        <ContactSection />
        <FaqSection items={webDevFaqs} ariaLabel="Web Development FAQs" />
      </main>
      <ScrollToTop />
    </>
  )
}
