'use client'

import { useRef, useState } from 'react'
import { revealLines, revealFadeUp, useGsapSection } from '@/lib/gsap/reveals'
import AbandonedCartDemo from '../components/AbandonedCartDemo'
import CheckoutHotspots from '../components/CheckoutHotspots'

type MessageCard = {
  timing: string
  clockTime: string
  label: string
  purpose: string
  badge: string
  preview: string
  hasOffer?: boolean
  offerText?: string
}

const MESSAGES: MessageCard[] = [
  {
    timing: '+15 min',
    clockTime: '10:15',
    label: 'Bring them back',
    purpose: 'A simple reminder while the cart is still fresh.',
    badge: 'Utility',
    preview: 'Hi Priya, you left something in your cart. Your Block Print Kurta (M) is still available. Tap to complete your order.',
  },
  {
    timing: '+4 hrs',
    clockTime: '14:00',
    label: 'Build confidence',
    purpose: 'Show that other customers are buying too.',
    badge: 'Marketing',
    preview: '12 people bought this kurta in the last 24 hours. Sizes are going fast. Your cart is saved. Complete your order now.',
  },
  {
    timing: '+24 hrs',
    clockTime: '10:00',
    label: 'Give one last reason',
    purpose: 'Make one clear offer before the cart expires.',
    badge: 'Marketing',
    preview: 'Final reminder. Use code SAVE10 for 10% off your order. This offer expires tonight at midnight.',
    hasOffer: true,
    offerText: 'SAVE10 · 10% off · Expires tonight',
  },
]

const BADGE: Record<string, string> = {
  Utility: 'bg-[#e7f6ec] text-[#1a7a3a]',
  Marketing: 'bg-[#fdf1e3] text-[#9a4a07]',
}

export default function CartRecoverySection() {
  const scope = useRef<HTMLElement>(null)
  // Follows the phone: the message currently on screen is the one lit up in the timeline
  const [current, setCurrent] = useState(0)

  useGsapSection(scope, () => {
    revealLines('#cart-heading',  { trigger: scope.current })
    revealFadeUp('.cart-intro',   { y: 20, trigger: scope.current })
    // One reveal for the whole timeline: per-item reveals would pin an inline opacity that fights the highlight
    revealFadeUp('.cart-msgs',    { y: 20, trigger: scope.current })
    revealFadeUp('.cart-phone',   { y: 30, trigger: scope.current })
  })

  return (
    <section ref={scope} id="cart-recovery" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="cart-heading">
      <div className="container">

        {/* Heading */}
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="cart-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            Fix checkout first. Recover the carts that still leave.
          </h2>
          <p className="cart-intro mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            Six reasons customers leave their carts, and all of them are fixable. We improve checkout before sending a single
            message. Then WhatsApp abandoned cart recovery picks up the people who still leave, with three messages.
          </p>
        </div>

        <div className="mb-14 md:mb-20">
          <CheckoutHotspots />
        </div>

        {/* 3-message sequence */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">

          <div className="cart-phone order-2 flex items-center justify-center">
            <AbandonedCartDemo messages={MESSAGES} onMessage={setCurrent} />
          </div>

          <div className="order-1 flex flex-col justify-center">
            <h3 className="text-2xl font-bold tracking-tight text-(--color-text) md:text-3xl">
              Three messages. Three reasons to return.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-(--color-text-muted)">
              They did not say no. They got interrupted. The moment a cart goes quiet, your store tells us, and
              WhatsApp asks for the order again: a reminder first, then confidence, and only then one offer.
              A discount in message one teaches buyers to wait for it.
            </p>
            
            <ol className="cart-msgs mt-8">
              {MESSAGES.map((msg, i) => (
                <li
                  key={msg.timing}
                  className={`py-4 transition-opacity duration-500 ${
                    current === i ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-sm font-semibold tracking-wider text-(--color-text-faint)">{msg.timing}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${BADGE[msg.badge]}`}>{msg.badge}</span>
                  </div>
                  <p className="mt-1.5 text-xl font-bold leading-snug tracking-tight text-(--color-text)">{msg.label}</p>
                  <p className="mt-1 text-base leading-relaxed text-(--color-text-muted)">{msg.purpose}</p>
                </li>
              ))}
            </ol>

            <p className="mt-6 text-sm leading-relaxed text-(--color-text-muted)">
              Explicit WhatsApp opt-in required before any message is sent.
              Compliant with India&apos;s DPDP Act and Meta&apos;s WhatsApp Business policy.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
