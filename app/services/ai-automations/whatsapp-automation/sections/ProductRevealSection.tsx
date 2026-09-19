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
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              id="reveal-heading"
              className="text-h2 font-bold tracking-tight text-(--color-text)"
              style={{ marginBottom: '1.25rem', lineHeight: 1.05 }}
            >
              Not a chatbot. Your entire WhatsApp commerce stack.
            </h2>
            <p className="reveal-copy text-body-lg leading-relaxed text-(--color-text-muted)" style={{ marginBottom: '1.5rem' }}>
              Every lead from every channel lands in one WhatsApp CRM. Cart
              recovery, COD confirmation, and order updates run automatically.
              Your team works from one dashboard instead of five tabs.
            </p>

            <ul className="space-y-3.5">
              {FEATURES.map(({ label, detail }) => (
                <li key={label} className="reveal-feature flex items-start gap-3">
                  <span
                    aria-hidden
                    style={{
                      width: '7px', height: '7px', borderRadius: '50%',
                      background: 'var(--color-text)',
                      flexShrink: 0, marginTop: '7px',
                    }}
                  />
                  <span>
                    <span className="text-base font-bold text-(--color-text)">{label}.</span>{' '}
                    <span className="text-base leading-relaxed text-(--color-text-muted)">{detail}.</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal-visual">
            <CommerceInbox />
          </div>
        </div>
      </div>
    </section>
  )
}
