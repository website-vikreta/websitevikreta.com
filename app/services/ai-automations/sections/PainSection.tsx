'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { TextLink } from '@/components/ui/TextLink'
import { revealLines, revealFadeUp, revealClipImage, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

interface Pain {
  id:     string
  /** Tab label — short enough to scan in a row. */
  label:  string
  today:  string
  withUs: string
  /** Only real, already-published figures. Omitted when we don't have one. */
  figure?: string
  /** Anchors to the matching panel in FixesSection, so the section hands off. */
  fixHref: string
  fixCta:  string
}

const PAINS: Pain[] = [
  {
    id:      'product-content',
    label:   'Product content',
    today:   'A team rebuilding the same product image twenty ways, every single collection.',
    withUs:  'One spreadsheet, one template, one run — and the whole collection comes out the other side.',
    figure:  '20 hours → 1 hour per collection',
    fixHref: '#bulk-content',
    fixCta:  'See how we fix it',
  },
  {
    id:      'customer-replies',
    label:   'Customer replies',
    today:   'A founder answering the same five customer questions by hand, every day, forever.',
    withUs:  'An agent that answers in your voice, tracks the order and takes the payment inside the chat.',
    fixHref: '#whatsapp-agents',
    fixCta:  'See how we fix it',
  },
  {
    id:      'photo-shoots',
    label:   'Photo shoots',
    today:   'A shoot that costs two weeks and a small fortune, every season, before anything ships.',
    withUs:  'Your real product, any setting, production quality — without the studio or the wait.',
    fixHref: '#ai-ugc',
    fixCta:  'See how we fix it',
  },
]

export default function PainSection() {
  const scope = useRef<HTMLElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const active = PAINS[activeIndex]

  useGsapSection(scope, () => {
    revealLines('.pain-h2', { trigger: scope.current })
    revealFadeUp('.pain-intro', { y: 20, delay: 0.1, trigger: scope.current })
    revealClipImage('.pain-image', { trigger: '.pain-image' })
    revealFadeUp('.pain-ui', { y: 20, stagger: STAGGER.base, trigger: '.pain-image' })
  })

  // Standard tablist keyboard contract: arrows move selection AND focus, so the
  // control is operable without a mouse.
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    event.preventDefault()
    const next = (activeIndex + delta + PAINS.length) % PAINS.length
    setActiveIndex(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section
      ref={scope}
      className="pb-16 md:pb-20"
      aria-labelledby="pain-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">

          {/* Left: the scene — manual grind vs. the same business running
              itself. Half-width on desktop so it reads as an illustration
              beside the copy, not a full-bleed hero graphic. Sticky so it
              stays in view while the pain selector on the right is worked. */}
          <div className="pain-image relative overflow-hidden border border-(--color-border) bg-(--color-surface) lg:sticky lg:top-28">
            <Image
              src="/services/manual-work-vs-automated.webp"
              alt="Left: a team buried in manual work — rebuilding the same product images by hand, answering repeat customer messages, running a studio photo shoot and packing boxes. Right: the same business running on automation, with one person watching a dashboard while an AI assistant, analytics, email and order fulfilment run themselves."
              width={1672}
              height={941}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>

          {/* Right: heading, intro, and the pain selector — self-identification
              beats a paragraph of examples: the visitor picks their own pain
              and the transformation appears directly beneath it. */}
          <div>
            <h2
              id="pain-heading"
              className="pain-h2 text-h3 font-bold tracking-tight text-(--color-text)"
            >
              The Part of the Job Nobody Talks About
            </h2>
            <p className="pain-intro mt-4 text-body-lg leading-relaxed text-(--color-text-muted)">
              Every business has one. The task that&apos;s just &ldquo;how it&apos;s done&rdquo; —
              and it&apos;s quietly costing you hours and money that should go toward
              the work only your team can do.
            </p>

            <div className="pain-ui mt-8 border-t border-(--color-border) pt-6">
              <p className="text-sm text-(--color-text-muted)">
                Which one sounds like your week?
              </p>
              <div role="tablist" aria-label="Common repetitive work" className="mt-4 flex flex-wrap gap-2">
                {PAINS.map((pain, i) => {
                  const isActive = i === activeIndex
                  return (
                    <button
                      key={pain.id}
                      ref={(el) => { tabRefs.current[i] = el }}
                      type="button"
                      role="tab"
                      id={`pain-tab-${pain.id}`}
                      aria-selected={isActive}
                      aria-controls="pain-panel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveIndex(i)}
                      onKeyDown={onTabKeyDown}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text) ${
                        isActive
                          ? 'border-(--color-text) bg-(--color-text) font-medium text-(--color-bg)'
                          : 'border-(--color-border) text-(--color-text) hover:border-(--color-text) hover:bg-(--color-bg-muted)'
                      }`}
                    >
                      {pain.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Outer div is GSAP's scroll-reveal target (part of `.pain-ui`),
                inner carries the swap animation — both on one node would fight
                over `opacity` since a CSS animation outranks GSAP's inline
                style, and the panel would paint before its reveal ever fired. */}
            <div
              id="pain-panel"
              role="tabpanel"
              aria-labelledby={`pain-tab-${active.id}`}
              className="pain-ui mt-6 border-t border-(--color-border) pt-6"
            >
              <div key={active.id} className="pain-swap">
                <p className="text-sm text-(--color-text-faint)">Today</p>
                <p className="mt-2 text-body-lg leading-relaxed text-(--color-text-muted)">
                  {active.today}
                </p>

                <div className="mt-6 border-t border-dashed border-(--color-border) pt-6">
                  <p className="flex items-center gap-2 text-sm text-(--color-text-faint)">
                    <ArrowRight size={14} aria-hidden="true" className="shrink-0" />
                    With us
                  </p>
                  <p className="mt-2 text-body-lg leading-relaxed text-(--color-text)">
                    {active.withUs}
                  </p>
                  {active.figure && (
                    <p className="mt-4 inline-block bg-(--color-text) px-3 py-1.5 text-sm font-bold text-(--color-bg)">
                      {active.figure}
                    </p>
                  )}
                  <div className="mt-5">
                    <TextLink href={active.fixHref}>{active.fixCta}</TextLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
