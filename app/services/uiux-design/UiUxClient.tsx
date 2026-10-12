'use client'

import dynamic from 'next/dynamic'
import { DotGrid } from '@/components/ui/DotGrid'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { UiUxHero } from '@/components/sections/ui-ux/UiUxHero'
import { JourneyFrictionGrid } from '@/components/sections/ui-ux/JourneyFrictionGrid'
import { UI_UX_FAQS } from './data'

const ComponentSystemToggle = dynamic(() =>
  import('@/components/sections/ui-ux/ComponentSystemToggle').then((m) => ({
    default: m.ComponentSystemToggle,
  })),
)
const WorkflowGallery = dynamic(() =>
  import('@/components/sections/ui-ux/HeroVisualStack').then((m) => ({
    default: m.WorkflowGallery,
  })),
)
const NodeTreeScroll = dynamic(() =>
  import('@/components/sections/ui-ux/NodeTreeScroll').then((m) => ({
    default: m.NodeTreeScroll,
  })),
)
const MetricReportSection = dynamic(() =>
  import('@/components/sections/ui-ux/MetricReportCard').then((m) => ({
    default: m.MetricReportSection,
  })),
)
const UiUxProjectsSection = dynamic(() =>
  import('@/components/sections/ui-ux/UiUxProjectsSection').then((m) => ({
    default: m.UiUxProjectsSection,
  })),
)
const UiUxTestimonialsSection = dynamic(() =>
  import('@/components/sections/ui-ux/UiUxTestimonialsSection').then((m) => ({
    default: m.UiUxTestimonialsSection,
  })),
)
const ContactSection = dynamic(() => import('./sections/ContactSection'))
const FaqSection = dynamic(() =>
  import('@/components/sections/FaqSection').then((mod) => ({ default: mod.FaqSection })),
)

export default function UiUxClient() {
  return (
    <>
      <DotGrid global />
      <main id="main-content" className="relative z-10">
        <UiUxHero />
        <JourneyFrictionGrid />
        <ComponentSystemToggle />
        <WorkflowGallery />
        <NodeTreeScroll />
        <MetricReportSection />
        <UiUxProjectsSection />
        <UiUxTestimonialsSection />
        <FaqSection items={UI_UX_FAQS} ariaLabel="UI/UX design FAQs" />
        <ContactSection />
      </main>
      <ScrollToTop />
    </>
  )
}
