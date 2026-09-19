'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import { RevealText } from '@/components/ui/Reveal'
import { useGsapSection } from '@/lib/gsap/reveals'
import { UI_UX_WORKFLOW, type HeroVisualAsset, type HeroVisualFrame } from '@/app/services/uiux-design/data'

const EASE_IN = 'power3.out'

function FrameImage({ image, priority }: { image: HeroVisualAsset; priority?: boolean }) {
  const [missing, setMissing] = useState(false)

  if (missing) {
    return (
      <div
        className="flex min-h-[160px] w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-(--color-border-strong) bg-(--color-bg) p-4 text-center"
        role="img"
        aria-label={image.alt}
      >
        <p className="text-xs font-semibold text-(--color-text-muted)">{image.alt}</p>
      </div>
    )
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      priority={priority}
      className="h-full w-full object-cover object-top"
      sizes="(max-width: 1024px) 100vw, 45vw"
      onError={() => setMissing(true)}
    />
  )
}

function WorkflowFrame({
  frame,
  priority,
  className,
}: {
  frame: HeroVisualFrame
  priority?: boolean
  className?: string
}) {
  return (
    <figure
      data-workflow-frame
      className={`opacity-0 overflow-hidden rounded-sm border border-(--color-border) bg-(--color-surface) ${className ?? ''}`}
    >
      <div className="border-b border-(--color-border) px-3.5 py-2.5 sm:px-4 sm:py-3 2xl:px-5 2xl:py-5">
        <h3 className="text-base font-bold text-(--color-text) sm:text-lg md:text-xl 2xl:text-2xl">{frame.title}</h3>
        <p className="mt-0.5 text-xs leading-relaxed text-(--color-text-muted) sm:text-sm 2xl:text-base">{frame.description}</p>
      </div>
      <div className="relative aspect-[16/10] 2xl:aspect-4/3 max-h-[220px] sm:max-h-[250px] lg:max-h-[270px] xl:max-h-[300px] 2xl:max-h-none w-full border-t border-(--color-border) overflow-hidden">
        <FrameImage image={frame.image} priority={priority} />
      </div>
    </figure>
  )
}

/** Workflow imagery — after Solution; not part of hero copy block. */
export function WorkflowGallery() {
  const scope = useRef<HTMLElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const frames = UI_UX_WORKFLOW.frames
  const [primary, secondary] = frames

  useGsapSection(scope, (reduce) => {
    const items = stackRef.current?.querySelectorAll<HTMLElement>('[data-workflow-frame]')
    if (!items?.length) return
    if (reduce) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }
    gsap.fromTo(
      items,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: EASE_IN },
    )
  })

  return (
    <section ref={scope} className="py-8 sm:py-10 md:py-12 2xl:py-20" aria-labelledby="uiux-workflow-heading">
      <div className="container">
        <header className="mb-4 max-w-2xl md:mb-5 2xl:mb-8">
          <RevealText as="h2" className="text-xl font-bold text-(--color-text) sm:text-2xl md:text-3xl 2xl:text-h3">
            <span id="uiux-workflow-heading">{UI_UX_WORKFLOW.heading}</span>
          </RevealText>
          <RevealText as="p" className="mt-1.5 text-xs text-(--color-text-muted) sm:text-sm md:text-base 2xl:text-body-lg" delay={0.08}>
            {UI_UX_WORKFLOW.subhead}
          </RevealText>
        </header>

        <div ref={stackRef} className="grid gap-3.5 sm:gap-4 lg:grid-cols-2 lg:items-start lg:gap-6 2xl:gap-8">
          {primary && <WorkflowFrame frame={primary} priority />}
          {secondary && <WorkflowFrame frame={secondary} className="lg:mt-4 2xl:mt-8" />}
        </div>
      </div>
    </section>
  )
}

/** @deprecated use WorkflowGallery */
export const HeroVisualStack = WorkflowGallery
