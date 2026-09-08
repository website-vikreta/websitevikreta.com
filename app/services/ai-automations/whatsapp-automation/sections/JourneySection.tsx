'use client'

import { useRef } from 'react'
import { ArrowLeft } from 'lucide-react'
import {
  revealLines,
  revealFadeUp,
  useGsapSection,
} from '@/lib/gsap/reveals'

const STAGES = [
  { step: '01', title: 'Pre-purchase & enquiries', feature: 'AI chatbot + live chat widget' },
  { step: '02', title: 'Product recommendations', feature: 'Catalog in WhatsApp + AI agent' },
  { step: '03', title: 'Cart & checkout', feature: 'Abandoned cart recovery sequence' },
  { step: '04', title: 'Order management & tracking', feature: 'Automated order + shipping updates' },
  { step: '05', title: 'Returns & refunds', feature: 'AI support agent + human handoff' },
  { step: '06', title: 'Warranty & post-purchase', feature: 'Automated follow-up workflows' },
  { step: '07', title: 'Reviews & feedback', feature: 'Re-engagement campaigns (opt-in)' },
  { step: '08', title: 'Retention & re-engagement', feature: 'Win-back flows + bulk messaging' },
]

const TOP = STAGES.slice(0, 4)
const BOTTOM = STAGES.slice(4).toReversed()

function StageNode({
  item,
  index,
}: {
  item: (typeof STAGES)[number]
  index: number
}) {
  const titleOnTop = index % 2 === 0
  const title = (
    <h3 className="font-sans text-sm font-bold leading-tight text-(--color-text)">
      <span className="sr-only">{`Step ${item.step}: `}</span>
      {item.title}
    </h3>
  )
  const feature = (
    <p className="text-xs leading-snug text-(--color-text-muted)">{item.feature}</p>
  )

  return (
    <li className="flex min-w-0 flex-col items-center px-1">
      <div className="flex min-h-28 w-full items-end justify-center pb-4 text-center">
        {titleOnTop ? title : feature}
      </div>
      <span
        aria-hidden="true"
        className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--color-accent) font-mono text-sm font-bold leading-none tracking-[-0.05em] text-(--color-text)"
      >
        {item.step}
      </span>
      <div className="flex min-h-28 w-full items-start justify-center pt-4 text-center">
        {titleOnTop ? feature : title}
      </div>
    </li>
  )
}

export default function JourneySection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#journey-heading', { trigger: scope.current })
    revealFadeUp('.journey-intro', { y: 20, trigger: scope.current })
    revealFadeUp('.journey-map', { y: 24, trigger: scope.current })
  })

  return (
    <section
      ref={scope}
      id="journey"
      className="scroll-mt-32 py-16 md:py-20"
      aria-labelledby="journey-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="journey-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            From first enquiry to repeat purchase
          </h2>
          <p className="journey-intro mt-6 text-body-lg leading-relaxed text-(--color-text-muted)">
            Eight stages. One platform. Cart recovery is one stage. The rest of
            the customer lifecycle runs on WhatsApp too.
          </p>
        </div>

        <div className="journey-map overflow-x-auto pb-2">
          <div className="relative min-w-[48rem]">
            <div
              aria-hidden="true"
              className="absolute top-[8.375rem] right-[12.5%] left-[12.5%] h-4 -translate-y-1/2 bg-(--color-accent)"
            />
            <div
              aria-hidden="true"
              className="absolute top-[8.375rem] left-[87.5%] h-[19.75rem] w-4 -translate-x-1/2 bg-(--color-accent)"
            />
            <div
              aria-hidden="true"
              className="absolute top-[28.125rem] right-[12.5%] left-[12.5%] h-4 -translate-y-1/2 bg-(--color-accent)"
            />
            <span
              aria-hidden="true"
              className="absolute top-[28.125rem] left-[12.5%] z-10 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-(--color-text)"
            >
              <ArrowLeft size={14} strokeWidth={2} className="text-(--color-bg)" />
            </span>

            <ol className="grid grid-cols-4">
              {TOP.map((item, i) => (
                <StageNode key={item.step} item={item} index={i} />
              ))}
            </ol>
            <div className="h-12" aria-hidden="true" />
            <ol className="grid grid-cols-4">
              {BOTTOM.map((item) => (
                <StageNode
                  key={item.step}
                  item={item}
                  index={STAGES.indexOf(item)}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
