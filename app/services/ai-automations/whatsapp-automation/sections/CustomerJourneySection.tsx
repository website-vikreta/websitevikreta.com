'use client'

import { useRef } from 'react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Pre-Purchase & Enquiries',
    detail: 'Answer questions about fit, fabric, and availability instantly via AI agents.',
  },
  {
    step: '02',
    title: 'Product Recommendations',
    detail: 'Guide customers to the right product using hot keywords and browsing history.',
  },
  {
    step: '03',
    title: 'Cart & Checkouts',
    detail: 'Recover abandoned carts and let customers complete purchases directly.',
  },
  {
    step: '04',
    title: 'Order Management',
    detail: 'Send payment links, COD confirmation, and real-time tracking updates.',
  },
  {
    step: '05',
    title: 'Returns & Refunds',
    detail: 'Automate return requests and provide instant resolution updates.',
  },
  {
    step: '06',
    title: 'Warranty & Support',
    detail: 'Register warranties and handle post-purchase queries effortlessly.',
  },
  {
    step: '07',
    title: 'Reviews & Feedback',
    detail: 'Collect valuable reviews and ratings after successful deliveries.',
  },
  {
    step: '08',
    title: 'Re-engagement',
    detail: 'Send personalized offers and restock reminders to build loyalty.',
  },
]

export default function CustomerJourneySection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#journey-heading', { trigger: scope.current })
    revealFadeUp('.journey-intro', { y: 20, trigger: scope.current })
    revealFadeUp('.journey-step', { y: 24, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section ref={scope} id="customer-journey" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="journey-heading">
      <div className="container max-w-4xl">
        <div className="mb-10 md:mb-14">
          <p className="mb-4 text-sm text-(--color-text-muted)">
            The Virtual In-Store Experience
          </p>
          <h2 id="journey-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            Selling on WhatsApp. It can be anything.
          </h2>
          <p className="journey-intro mt-5 max-w-2xl text-body-lg leading-relaxed text-(--color-text-muted)">
            Because your customers are already there, the entire customer lifecycle from
            initial enquiry to post-purchase retention happens in a single chat thread.
          </p>
        </div>

        <div className="mt-16 flex flex-col">
          {JOURNEY_STEPS.map((item) => (
            <article
              key={item.step}
              className="journey-step relative flex items-center justify-between border-t border-(--color-border) py-8 md:py-12"
            >
              <div className="relative z-10 max-w-xl">
                <h3 className="font-sans text-xl font-bold tracking-tight text-(--color-text) md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-(--color-text-muted)">
                  {item.detail}
                </p>
              </div>
              
              {/* Large watermark number */}
              <div
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-mono font-bold leading-none tracking-tighter text-(--color-bg-muted) select-none"
                style={{ fontSize: 'clamp(5rem, 15vw, 9rem)', color: 'var(--color-bg-muted)' }}
                aria-hidden="true"
              >
                {item.step}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
