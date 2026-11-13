'use client'

import { useRef, type ReactNode } from 'react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import { useInView } from '../components/useInView'
import CommerceInbox from '../components/CommerceInbox'
import CrmBoard from '../components/CrmBoard'
import FlowBoard from '../components/FlowBoard'
import StoreBoard from '../components/StoreBoard'
import OptInPhone from '../components/OptInPhone'

/* Bento grid on a 6-column track: two wide cards on top, three narrow ones below.
   `wide` cards show most of their board; narrow cards show its left part, cropped by the card edge. */
const FEATURES: {
  label: string
  detail: string
  tint: 'accent' | 'muted'
  wide?: boolean
  /** Shows a half phone, centred and cropped at the bottom, instead of a board bleeding off the right */
  phone?: boolean
  board: (active: boolean) => ReactNode
}[] = [
  {
    label: 'One inbox for every channel',
    detail: 'WhatsApp, Instagram, Facebook, RCS, and website chats land in one shared inbox. Nobody replies twice and nobody gets missed.',
    tint: 'accent',
    wide: true,
    board: (active) => <CommerceInbox active={active} />,
  },
  {
    label: 'A CRM that fills itself',
    detail: 'Leads from Meta Ads, IndiaMART, Justdial, and your website land on one board. Assign, remind, and move them to a paid order.',
    tint: 'muted',
    wide: true,
    board: (active) => <CrmBoard active={active} />,
  },
  {
    label: 'Chat flows without code',
    detail: 'Open a menu on "hi", collect an address, take a payment, or book a slot. Drag blocks, no code.',
    tint: 'muted',
    board: (active) => <FlowBoard active={active} />,
  },
  {
    label: 'Broadcasts that follow Meta rules',
    detail: 'Send offers and restock alerts to opted-in customers, with delivery and read counts.',
    tint: 'accent',
    phone: true,
    board: (active) => <OptInPhone active={active} />,
  },
  {
    label: 'Your store messages for you',
    detail: 'Connect Shopify or WooCommerce once. Every order event sends its own update with the tracking link.',
    tint: 'muted',
    board: (active) => <StoreBoard active={active} />,
  },
]

function FeatureCard({ label, detail, tint, wide, phone, board }: (typeof FEATURES)[number]) {
  // Boards play only while their card is on screen, so five demos never run at once
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <article
      ref={ref}
      className={`feature-card group relative top-0 flex flex-col overflow-hidden border border-(--color-border) bg-(--color-surface) motion-safe:transition-[top,box-shadow,border-color] motion-safe:duration-300 motion-safe:ease-out hover:border-(--color-border-strong) hover:shadow-[0_24px_48px_-24px_rgba(18,18,18,0.3)] motion-safe:hover:-top-1 ${wide ? 'lg:col-span-3' : 'lg:col-span-2'}`}
    >
      <div className="p-6 pb-5 md:p-8 md:pb-6">
        <h3 className="text-2xl font-bold leading-tight md:text-[1.75rem] tracking-tight text-(--color-text)">{label}</h3>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-(--color-text-muted)">{detail}</p>
      </div>
      <div
        aria-hidden
        className={`relative mt-auto h-72 overflow-hidden ${wide ? 'md:h-96' : 'md:h-80'} ${tint === 'accent' ? 'bg-(--color-accent)' : 'bg-(--color-bg-muted)'}`}
      >
        {/* The board starts inside the panel and runs off its right and bottom edges */}
        <div
          className={`origin-top motion-safe:transition-[scale] motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.04] ${
            phone
              ? 'absolute left-1/2 top-8 h-[34rem] w-[18.5rem] -translate-x-1/2'
              : `absolute left-6 top-6 md:left-8 md:top-8 ${wide ? 'h-[30rem] w-full' : 'h-[26rem] w-[170%]'}`
          }`}
        >
          {board(inView)}
        </div>
      </div>
    </article>
  )
}

export default function ProductRevealSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#reveal-heading', { trigger: scope.current })
    revealFadeUp('.reveal-copy',   { y: 20, trigger: scope.current })
    revealFadeUp('.feature-card',  { y: 24, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section ref={scope} id="product" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="reveal-heading">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="reveal-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            One WhatsApp platform for every customer conversation.
          </h2>
          <p className="reveal-copy mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            Leads, support, campaigns, store updates, and bookings run from
            one dashboard. Your team stops switching between five tabs, and
            nothing waits for someone to remember it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 md:gap-5">
          {FEATURES.map((f) => (
            <FeatureCard key={f.label} {...f} />
          ))}
        </div>
      </div>
    </section>
  )
}
