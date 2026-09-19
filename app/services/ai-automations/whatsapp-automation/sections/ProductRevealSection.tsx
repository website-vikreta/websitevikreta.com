'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { revealLines, revealFadeUp, revealClipImage, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import PhoneDemo from '../components/PhoneDemo'

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

const COD_STEPS = [
  {
    n: '01',
    title: 'Order received on your storefront',
    body: 'A cash on delivery order drops into your Shopify or WooCommerce backend. Our system detects it instantly without manual input.',
  },
  {
    n: '02',
    title: 'Instant WhatsApp verification',
    body: 'The buyer receives a personalized message with order details and quick reply buttons to confirm or decline the order. No typing needed.',
  },
  {
    n: '03',
    title: 'Approved orders move to fulfillment',
    body: 'A confirmation click instantly tags the order for shipping. A cancellation tap automatically updates your store inventory.',
  },
]

export default function ProductRevealSection() {
  const platformScope = useRef<HTMLElement>(null)
  const codScope      = useRef<HTMLElement>(null)

  useGsapSection(platformScope, () => {
    revealLines('#reveal-heading',    { trigger: platformScope.current })
    revealFadeUp('.reveal-copy',      { y: 20, trigger: platformScope.current })
    revealFadeUp('.reveal-feature',   { y: 16, stagger: STAGGER.tight, trigger: platformScope.current })
    revealClipImage('.reveal-visual', { scale: true, trigger: platformScope.current })
  })

  useGsapSection(codScope, () => {
    revealLines('#cod-heading', { trigger: codScope.current })
    revealFadeUp('.cod-intro',  { y: 20, trigger: codScope.current })
    revealFadeUp('.cod-step',   { y: 20, stagger: STAGGER.base, trigger: codScope.current })
    revealFadeUp('.cod-phone',  { y: 30, trigger: codScope.current })
  })

  return (
    <>
      {/* ── Platform overview ── */}
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
                      <span className="text-sm font-bold text-(--color-text)">{label}.</span>{' '}
                      <span className="text-sm leading-relaxed text-(--color-text-muted)">{detail}.</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal-visual relative overflow-hidden border border-(--color-border) bg-(--color-surface)">
              <Image
                src="/services/whatsapp-commerce-hub.webp"
                alt="All sales channels feeding into a single WhatsApp Business dashboard: catalog, automated flows, live chat support, and a unified team inbox."
                width={1448}
                height={1086}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── COD confirmation: How it works ── */}
      <section
        ref={codScope}
        id="cod-confirmation"
        className="scroll-mt-32 border-y border-(--color-border) bg-(--color-bg-muted) py-16 md:py-20"
        aria-labelledby="cod-heading"
      >
        <div className="container">
          <div className="mb-10 max-w-3xl md:mb-14">
            <h2
              id="cod-heading"
              className="text-h2 font-bold tracking-tight text-(--color-text)"
              style={{ lineHeight: 1.05, marginBottom: '1.25rem' }}
            >
              Every COD order gets a quick yes or no.
            </h2>
            <p className="text-body-lg leading-relaxed text-(--color-text-muted)">
              As soon as a cash on delivery order lands, WhatsApp asks the customer to confirm it. Your team gets a clear answer before the package leaves. Try both outcomes on the phone.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <ol className="divide-y divide-(--color-border) border-y border-(--color-border) lg:self-center">
              {COD_STEPS.map(({ n, title, body }) => (
                <li key={n} className="cod-step flex gap-5 py-6 first:pt-0 last:pb-0">
                  <span className="font-mono text-lg font-bold tracking-tight text-(--color-text-faint)">{n}</span>
                  <div>
                    <h3 className="text-xl font-bold leading-snug tracking-tight text-(--color-text)">{title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-(--color-text-muted)">{body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="cod-phone flex items-center justify-center lg:justify-start">
              <PhoneDemo />
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
