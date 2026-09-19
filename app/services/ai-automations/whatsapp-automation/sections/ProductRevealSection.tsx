'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { revealLines, revealFadeUp, revealClipImage, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import PhoneDemo from '../components/PhoneDemo'

const JOURNEY_STAGES = [
  'Pre-purchase questions',
  'Product recommendations',
  'Cart & checkout',
  'Order tracking',
  'Returns & refunds',
  'Warranty & support',
  'Reviews & feedback',
  'Win-back offers',
]

const FEATURES = [
  {
    label: 'WhatsApp CRM',
    detail: 'Every lead from Shopify, Instagram, Meta Ads, and IndiaMART in one unified dashboard',
  },
  {
    label: 'Abandoned Cart Recovery',
    detail: 'Three message WhatsApp sequence sent automatically when a customer drops off at checkout',
  },
  {
    label: 'COD Order Confirmation',
    detail: 'One WhatsApp message before dispatch. Customer confirms or cancels with no manual follow up',
  },
  {
    label: 'Order Status Notifications',
    detail: 'Automated WhatsApp updates for order confirmation, dispatch, and delivery',
  },
  {
    label: 'Omnichannel Inbox',
    detail: 'WhatsApp, Instagram DMs, and Facebook Messenger managed from one team inbox',
  },
  {
    label: 'Returns and Refunds',
    detail: 'Return requests and refund status updates automated over WhatsApp, no support ticket needed',
  },
  {
    label: 'Review Collection',
    detail: 'Automatic WhatsApp request for a rating and review once an order is delivered',
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

const TIMELINE = [
  { at: 'Under 5 minutes', title: 'Verification message delivered', body: 'The WhatsApp prompt is sent out as soon as the checkout is completed. Your team does nothing.' },
  { at: '3 hours', title: 'Automated follow up sent', body: 'If the buyer has not replied, the system sends one final nudge to get their attention.' },
  { at: '24 hours', title: 'Order automatically voided', body: 'No response means no shipment. The order is seamlessly cancelled in your system to prevent RTO losses.' },
]

/* Singleton keyframes — safe from re-injection */
const TL_STYLE_ID = 'wa-cod-timeline-styles'
if (typeof document !== 'undefined' && !document.getElementById(TL_STYLE_ID)) {
  const s = document.createElement('style')
  s.id = TL_STYLE_ID
  s.textContent = `
    .wa-cod-line {
      transform: scaleY(0); transform-origin: top;
      transition: transform 1400ms cubic-bezier(0.16,1,0.3,1);
    }
    .wa-cod-timeline.wa-shown .wa-cod-line { transform: scaleY(1); }
    .wa-cod-node { opacity:0; transform:translateY(12px); transition:opacity 0.6s ease, transform 0.6s ease; }
    .wa-cod-timeline.wa-shown .wa-cod-node:nth-child(2) { opacity:1; transform:none; transition-delay:350ms; }
    .wa-cod-timeline.wa-shown .wa-cod-node:nth-child(3) { opacity:1; transform:none; transition-delay:670ms; }
    .wa-cod-timeline.wa-shown .wa-cod-node:nth-child(4) { opacity:1; transform:none; transition-delay:990ms; }
    @media (prefers-reduced-motion:reduce) {
      .wa-cod-line  { transition:none!important; transform:scaleY(1)!important; }
      .wa-cod-node  { opacity:1!important; transform:none!important; transition:none!important; }
    }
  `
  document.head.appendChild(s)
}

export default function ProductRevealSection() {
  const platformScope = useRef<HTMLElement>(null)
  const codScope      = useRef<HTMLElement>(null)
  const timelineRef   = useRef<HTMLOListElement>(null)

  useGsapSection(platformScope, () => {
    revealLines('#reveal-heading',    { trigger: platformScope.current })
    revealFadeUp('.reveal-copy',      { y: 20, trigger: platformScope.current })
    revealFadeUp('.reveal-stages',    { y: 16, trigger: platformScope.current })
    revealFadeUp('.reveal-feature',   { y: 16, stagger: STAGGER.tight, trigger: platformScope.current })
    revealClipImage('.reveal-visual', { scale: true, trigger: platformScope.current })
  })

  useGsapSection(codScope, () => {
    revealLines('#cod-heading', { trigger: codScope.current })
    revealFadeUp('.cod-intro',  { y: 20, trigger: codScope.current })
    revealFadeUp('.cod-step',   { y: 20, stagger: STAGGER.base, trigger: codScope.current })
    revealFadeUp('.cod-phone',  { y: 30, trigger: codScope.current })
  })

  useEffect(() => {
    const el = timelineRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('wa-shown'); io.disconnect() } },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

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

              <div className="reveal-stages mb-8 flex flex-wrap gap-2">
                {JOURNEY_STAGES.map(stage => (
                  <span
                    key={stage}
                    className="border border-(--color-border) px-2.5 py-1 text-xs font-semibold text-(--color-text-muted)"
                  >
                    {stage}
                  </span>
                ))}
              </div>

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

      {/* ── COD confirmation: The 24-hour rule ── */}
      <section className="bg-(--color-surface) py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2
                className="text-h2 font-bold tracking-tight text-(--color-text)"
                style={{ lineHeight: 1.05, maxWidth: '14ch', marginBottom: '1.25rem' }}
              >
                No answer in 24 hours is an answer.
              </h2>
              <p className="mt-5 text-body-lg leading-relaxed text-(--color-text-muted)" style={{ maxWidth: '44ch' }}>
                Someone who ordered at 2am on impulse won&apos;t reply. Someone who typed a fake number can&apos;t. And the person who ordered the same shoes from three stores to compare prices will only answer one of you.
              </p>
            </div>

            <div className="lg:pt-2">
              <ol
                ref={timelineRef}
                className="wa-cod-timeline"
                style={{ position: 'relative', paddingLeft: '44px', listStyle: 'none' }}
              >
                <span
                  aria-hidden="true"
                  className="wa-cod-line"
                  style={{ position: 'absolute', left: '13px', top: '8px', bottom: '24px', width: '1px', background: 'var(--color-border)' }}
                />
                {TIMELINE.map((item, i) => (
                  <li
                    key={item.at}
                    className="wa-cod-node"
                    style={{ position: 'relative', marginBottom: i < TIMELINE.length - 1 ? '32px' : 0 }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute', left: '-44px', top: '2px',
                        display: 'grid', height: '27px', width: '27px',
                        placeItems: 'center', borderRadius: '50%',
                        border: `2px solid ${i === TIMELINE.length - 1 ? 'var(--color-text)' : 'var(--color-border)'}`,
                        background: i === TIMELINE.length - 1 ? 'var(--color-text)' : 'var(--color-bg)',
                      }}
                    >
                      <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: i === TIMELINE.length - 1 ? '#25d366' : 'var(--color-text-faint)' }} />
                    </span>
                    <p className="mb-1 text-sm text-(--color-text-muted)">{item.at}</p>
                    <h3 className="text-base font-bold tracking-tight text-(--color-text)">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-(--color-text-muted)" style={{ maxWidth: '40ch' }}>{item.body}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-sm leading-relaxed text-(--color-text-muted)" style={{ maxWidth: '42ch' }}>
                You can set the window to whatever suits your dispatch. Most stores leave it at 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
