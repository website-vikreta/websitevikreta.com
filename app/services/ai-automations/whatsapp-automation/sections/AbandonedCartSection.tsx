'use client'

import { useRef, useState } from 'react'
import { revealFadeUp, revealLines, useGsapSection } from '@/lib/gsap/reveals'
import AbandonedCartDemo from '../components/AbandonedCartDemo'

const STEPS = [
  {
    title: 'They add to cart, then close the app',
    body: 'The item is in the cart. The app shuts before payment. You have no email and no account to follow up with.',
  },
  {
    title: 'Your store tells us the cart was left',
    body: 'Shopify or WooCommerce sends us the cart the moment it goes quiet, with the product, size, and price already on it.',
  },
  {
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
  // Follows the phone demo, so the step being acted out on screen is the one lit up here
  const [step, setStep] = useState(0)

  useGsapSection(scope, () => {
    revealLines('#abandon-heading', { trigger: scope.current })
    revealFadeUp('.abandon-intro',  { y: 20, trigger: scope.current })
    // Reveal the list as one block: per-step reveals would pin an inline opacity that fights the step highlight
    revealFadeUp('.abandon-steps',  { y: 20, trigger: scope.current })
    revealFadeUp('.abandon-phone',  { y: 30, trigger: scope.current })
  })

  return (
    <section
      ref={scope}
      id="abandoned-cart"
      className="scroll-mt-32 py-16 md:py-20"
      aria-labelledby="abandon-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl lg:mb-8">
          <h2
            id="abandon-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            They did not say no. They got interrupted.
          </h2>
          <p className="abandon-intro mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            Someone picks a size, adds it to the cart, and then the day gets in the way.
            The order is still there. Nobody has asked for it again. That is the job we
            give WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <ol className="abandon-steps">
            {STEPS.map(({ title, body }, i) => (
              <li
                key={title}
                className={`py-4 transition-opacity duration-500 ${
                  step === i ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <h3 className="text-xl font-bold leading-snug tracking-tight text-(--color-text)">{title}</h3>
                <p className="mt-2 text-base leading-relaxed text-(--color-text-muted)">{body}</p>
              </li>
            ))}
          </ol>

          <div className="abandon-phone flex justify-center">
            <AbandonedCartDemo messages={REMINDER} onStep={setStep} />
          </div>
        </div>
      </div>
    </section>
  )
}
