'use client'

import { useRef } from 'react'
import { revealLines, revealFadeUp, revealClipImage, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import CommerceInbox from '../components/CommerceInbox'

const FEATURES = [
  {
    label: 'WhatsApp CRM',
    detail: 'Every lead from Shopify, Instagram, Meta Ads, and IndiaMART in one dashboard',
  },
  {
    label: 'Abandoned Cart Recovery',
    detail: 'A three message sequence when a customer drops off at checkout',
  },
  {
    label: 'COD Order Confirmation',
    detail: 'One message before dispatch. The customer confirms or cancels',
  },
  {
    label: 'Order Status Notifications',
    detail: 'Automatic updates for confirmation, dispatch, and delivery',
  },
]

export default function ProductRevealSection() {
  const platformScope = useRef<HTMLElement>(null)

  useGsapSection(platformScope, () => {
    revealLines('#reveal-heading',    { trigger: platformScope.current })
    revealFadeUp('.reveal-copy',      { y: 20, trigger: platformScope.current })
    revealFadeUp('.reveal-feature',   { y: 16, stagger: STAGGER.tight, trigger: platformScope.current })
    revealClipImage('.reveal-visual', { scale: false, trigger: platformScope.current })
  })

  return (
    <section ref={platformScope} id="product" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="reveal-heading">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="reveal-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            Not a chatbot. Your entire WhatsApp commerce stack.
          </h2>
          <p className="reveal-copy mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            Every lead from every channel lands in one WhatsApp CRM. Cart
            recovery, COD confirmation, and order updates run automatically.
            Your team works from one dashboard instead of five tabs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <ol>
            {FEATURES.map(({ label, detail }, i) => (
              <li key={label} className="reveal-feature flex gap-5 py-5 first:pt-0 last:pb-0">
                <span className="w-7 shrink-0 font-mono text-lg font-bold tabular-nums tracking-tight text-(--color-text-faint)">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl font-bold leading-snug tracking-tight text-(--color-text)">{label}</h3>
                  <p className="mt-2 text-base leading-relaxed text-(--color-text-muted)">{detail}.</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="reveal-visual">
            <CommerceInbox />
          </div>
        </div>
      </div>
    </section>
  )
}
