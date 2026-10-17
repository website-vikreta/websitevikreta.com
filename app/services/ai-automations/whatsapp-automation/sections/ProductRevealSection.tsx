'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { revealLines, revealFadeUp, useGsapSection } from '@/lib/gsap/reveals'
import CommerceInbox from '../components/CommerceInbox'
import CampaignBoard from '../components/CampaignBoard'
import CrmBoard from '../components/CrmBoard'
import FlowBoard from '../components/FlowBoard'
import StoreBoard from '../components/StoreBoard'

const FEATURES: { label: string; detail: string[]; board: (active: boolean) => ReactNode }[] = [
  {
    label: 'One inbox for every channel',
    detail: [
      'WhatsApp, Instagram, Facebook, and RCS chats land in one shared inbox, along with every lead from the chat widget on your website.',
      'Your team sees the full conversation, who is handling each chat, and which ones the AI already answered. Nobody replies twice and nobody gets missed.',
    ],
    board: (active) => <CommerceInbox active={active} />,
  },
  {
    label: 'A CRM that fills itself',
    detail: [
      'Leads from Meta Ads, IndiaMART, Justdial, and your website go straight onto a board, tagged with where they came from.',
      'Assign each lead to someone on your team, set a follow-up reminder, and move it from new enquiry to paid order. You always know what is pending and with whom.',
    ],
    board: (active) => <CrmBoard active={active} />,
  },
  {
    label: 'Chat flows without code',
    detail: [
      'A customer says "hi" and your menu opens. They type a product word like "kurta" or "black t-shirts" and the matching collection opens instead.',
      'The same flows collect an address, take a payment, fill a WhatsApp form, or book an appointment with an automatic reminder. You build them by dragging blocks, not by writing code.',
    ],
    board: (active) => <FlowBoard active={active} />,
  },
  {
    label: 'Broadcasts that follow Meta rules',
    detail: [
      'Send new collections, offers, and restock alerts to customers who opted in, using templates Meta has already approved.',
      'You see how many messages were delivered, read, and replied to. Order updates go out as utility messages, which cost a fraction of marketing ones.',
    ],
    board: (active) => <CampaignBoard active={active} />,
  },
  {
    label: 'Your store messages for you',
    detail: [
      'Connect Shopify or WooCommerce once. Every order event then sends its own WhatsApp message: order placed, payment received, shipped, out for delivery, delivered.',
      'Each message carries the order number, the amount, and a tracking link, so customers stop messaging you to ask where their parcel is.',
    ],
    board: (active) => <StoreBoard active={active} />,
  },
]

export default function ProductRevealSection() {
  const platformScope = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  // Boards build the first time they're reached and then stay built, so scrolling back up
  // swaps to a finished board instead of an empty frame that rebuilds piece by piece
  const [seen, setSeen] = useState<boolean[]>(() => FEATURES.map((_, i) => i === 0))

  useGsapSection(platformScope, () => {
    revealLines('#reveal-heading', { trigger: platformScope.current })
    revealFadeUp('.reveal-copy',   { y: 20, trigger: platformScope.current })
  })

  // Scroll-spy: whichever text block crosses the middle band of the viewport owns the sticky board
  useEffect(() => {
    const items = platformScope.current?.querySelectorAll<HTMLElement>('[data-feature]')
    if (!items?.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (!hit) return
        const i = Number((hit.target as HTMLElement).dataset.feature)
        setActive(i)
        setSeen((prev) => (prev[i] ? prev : prev.map((v, j) => v || j === i)))
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={platformScope} id="product" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="reveal-heading">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="reveal-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            One platform for every customer conversation.
          </h2>
          <p className="reveal-copy mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            Leads, support, campaigns, store updates, and bookings run from
            one dashboard. Your team stops switching between five tabs, and
            nothing waits for someone to remember it.
          </p>
        </div>

        {/* Zoho-style: text blocks scroll on the left, the board sticks on the right and swaps with them.
            Below lg there's no sticky column — each board sits under its own text instead. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
          <div>
            {FEATURES.map(({ label, detail, board }, i) => (
              <div
                key={label}
                data-feature={i}
                className={`py-10 transition-opacity duration-500 lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center lg:py-0 ${
                  active === i ? 'lg:opacity-100' : 'lg:opacity-30'
                }`}
              >
                <h3 className="text-h3 font-bold leading-tight tracking-tight text-(--color-text)">{label}</h3>
                {detail.map((para) => (
                  <p key={para} className="mt-4 max-w-md text-body-lg leading-relaxed text-(--color-text-muted)">{para}</p>
                ))}
                <div className="mt-8 min-h-[26rem] lg:hidden [&>*]:h-full">{board(seen[i])}</div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-17rem)] grid min-h-[34rem]">
              {FEATURES.map(({ label, board }, i) => (
                <div
                  key={label}
                  aria-hidden={active !== i}
                  /* Boards above the active one wait just above, boards below wait just below, so the
                     swap always moves with the scroll: down brings the next board up, up brings it down */
                  className={`[grid-area:1/1] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    active === i ? 'translate-y-0 opacity-100' : `pointer-events-none opacity-0 ${i < active ? '-translate-y-4' : 'translate-y-4'}`
                  }`}
                >
                  {board(seen[i])}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
