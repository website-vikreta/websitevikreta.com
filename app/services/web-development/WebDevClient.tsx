'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ENSURE_HASH_TARGET_EVENT } from '@/lib/scroll-to-hash'
import { DotGrid } from '@/components/ui/DotGrid'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { WEB_DEV_FAQS } from './data'
import Hero from './sections/Hero'
import PainSection from './sections/PainSection'
import ProofSection from './sections/ProofSection'

const SolutionSection = dynamic(() => import('./sections/SolutionSection'))
const HowWeWork = dynamic(() => import('./sections/HowWeWork'))
const SupportSection = dynamic(() => import('./sections/SupportSection'))
const StatsRail = dynamic(() => import('./sections/StatsRail'))
const WorkTestimonialsSection = dynamic(() =>
  import('@/components/sections/work/WorkTestimonialsSection').then((mod) => ({
    default: mod.WorkTestimonialsSection,
  })),
)
const ContactSection = dynamic(() => import('./sections/ContactSection'))
const FaqSection = dynamic(() =>
  import('@/components/sections/FaqSection').then((mod) => ({ default: mod.FaqSection })),
)

/** Mount every lazy section up to and including this anchor when hash-navigating. */
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

export default function WebDevClient() {
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
        <Hero />
        <PainSection />
        <LazySection index={1} minMountedIndex={minMountedIndex}>
          <SolutionSection />
        </LazySection>
        <LazySection index={2} minMountedIndex={minMountedIndex}>
          <HowWeWork />
        </LazySection>
        <LazySection index={3} minMountedIndex={minMountedIndex}>
          <SupportSection />
        </LazySection>
        <LazySection index={4} minMountedIndex={minMountedIndex}>
          <StatsRail />
        </LazySection>
        <LazySection index={5} minMountedIndex={minMountedIndex}>
          <ProofSection />
        </LazySection>
        <LazySection index={6} minMountedIndex={minMountedIndex}>
          <WorkTestimonialsSection />
        </LazySection>
        <LazySection index={7} minMountedIndex={minMountedIndex}>
          <FaqSection items={WEB_DEV_FAQS} heading="FAQ" ariaLabel="Web Development FAQs" />
        </LazySection>
        <LazySection index={8} minMountedIndex={minMountedIndex}>
          <ContactSection />
        </LazySection>
      </main>
      <ScrollToTop />
    </>
  )
}
