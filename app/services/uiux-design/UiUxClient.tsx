'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ENSURE_HASH_TARGET_EVENT } from '@/lib/scroll-to-hash'
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

const HASH_MOUNT_LEVEL: Record<string, number> = {
  proof: 5,
  'get-quote': 8,
}

function LazySection({
  index,
  minMountedIndex,
  children,
}: {
  index: number
  minMountedIndex: number
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const mounted = inView || minMountedIndex >= index

  useEffect(() => {
    if (mounted) return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '320px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [mounted])

  return <div ref={ref}>{mounted ? children : null}</div>
}

export default function UiUxClient() {
  const [minMountedIndex, setMinMountedIndex] = useState(0)

  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.slice(1)
      const level = HASH_MOUNT_LEVEL[id]
      if (level) setMinMountedIndex((prev) => Math.max(prev, level))
    }

    syncFromHash()

    const onEnsure = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail?.id
      if (!id) return
      const level = HASH_MOUNT_LEVEL[id]
      if (level) setMinMountedIndex((prev) => Math.max(prev, level))
    }

    window.addEventListener(ENSURE_HASH_TARGET_EVENT, onEnsure)
    window.addEventListener('hashchange', syncFromHash)
    return () => {
      window.removeEventListener(ENSURE_HASH_TARGET_EVENT, onEnsure)
      window.removeEventListener('hashchange', syncFromHash)
    }
  }, [])

  return (
    <>
      <DotGrid global />
      <main id="main-content" className="relative z-10">
        <UiUxHero />
        <JourneyFrictionGrid />
        <LazySection index={1} minMountedIndex={minMountedIndex}>
          <ComponentSystemToggle />
        </LazySection>
        <LazySection index={2} minMountedIndex={minMountedIndex}>
          <WorkflowGallery />
        </LazySection>
        <LazySection index={3} minMountedIndex={minMountedIndex}>
          <NodeTreeScroll />
        </LazySection>
        <LazySection index={4} minMountedIndex={minMountedIndex}>
          <MetricReportSection />
        </LazySection>
        <LazySection index={5} minMountedIndex={minMountedIndex}>
          <UiUxProjectsSection />
        </LazySection>
        <LazySection index={6} minMountedIndex={minMountedIndex}>
          <UiUxTestimonialsSection />
        </LazySection>
        <LazySection index={7} minMountedIndex={minMountedIndex}>
          <FaqSection items={UI_UX_FAQS} heading="FAQ" ariaLabel="UI/UX design FAQs" />
        </LazySection>
        <LazySection index={8} minMountedIndex={minMountedIndex}>
          <ContactSection />
        </LazySection>
      </main>
      <ScrollToTop />
    </>
  )
}
