'use client'

import { useRef } from 'react'
import { revealFadeUp, revealLines, STAGGER, useGsapSection } from '@/lib/gsap/reveals'
import AbandonedCartDemo from '../components/AbandonedCartDemo'

const STEPS = [
  {
    n: '01',
    title: 'They add to cart, then close the app',
    body: 'The item is in the cart. The app shuts before payment. You have no email and no account to follow up with.',
  },
  {
    n: '02',
    title: 'Your store tells us the cart was left',
    body: 'Shopify or WooCommerce sends us the cart the moment it goes quiet, with the product, size, and price already on it.',
  },
  {
    n: '03',
    title: 'A WhatsApp message brings them back',
    body: 'It names the item they left and links straight back to the cart. It arrives as a WhatsApp notification, not as an email nobody opens.',
  },
]

const REMINDER = [
  {
    timing: '+15 min',
    clockTime: '10:15',
    preview: 'Hi Priya, your Block Print Kurta (M) is still in your cart. Tap below to finish your order.',
  },
]

export default function AbandonedCartSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#abandon-heading', { trigger: scope.current })
    revealFadeUp('.abandon-intro',  { y: 20, trigger: scope.current })
    revealFadeUp('.abandon-step',   { y: 20, stagger: STAGGER.base, trigger: scope.current })
    revealFadeUp('.abandon-phone',  { y: 30, trigger: scope.current })
  })

  return (
    <section
      ref={scope}
      id="abandoned-cart"
      className="scroll-mt-32 border-y border-(--color-border) bg-(--color-bg-muted) py-16 md:py-20"
      aria-labelledby="abandon-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-3xl md:mb-14">
          <h2
            id="abandon-heading"
            className="text-h2 font-bold tracking-tight text-(--color-text)"
            style={{ lineHeight: 1.05, marginBottom: '1.25rem' }}
          >
            They did not say no. They got interrupted.
          </h2>
          <p className="abandon-intro text-body-lg leading-relaxed text-(--color-text-muted)">
            Someone picks a size, adds it to the cart, and then the day gets in the way.
            The order is still there. Nobody has asked for it again. That is the job we
            give WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <ol className="divide-y divide-(--color-border) border-y border-(--color-border)">
            {STEPS.map(({ n, title, body }) => (
              <li key={n} className="abandon-step flex gap-5 py-6 first:pt-0 last:pb-0">
                <span className="font-mono text-lg font-bold tracking-tight text-(--color-text-faint)">{n}</span>
                <div>
                  <h3 className="text-xl font-bold leading-snug tracking-tight text-(--color-text)">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-(--color-text-muted)">{body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="abandon-phone flex items-center justify-center lg:justify-end">
            <AbandonedCartDemo messages={REMINDER} />
          </div>
        </div>
      </div>
    </section>
  )
}
