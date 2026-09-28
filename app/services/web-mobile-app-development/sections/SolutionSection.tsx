'use client'

/**
 * `AutoExpandingCards` below is a page-local adaptation of
 * `components/ui/expanding-cards.tsx` — same grid-column-resize mechanic and
 * the same token-colored/black-to-transparent-scrim styling, but with an
 * autoplay timer driving the active card instead of requiring hover/click.
 * `expanding-cards.tsx` only exposes `defaultActiveIndex` (uncontrolled
 * internal state), so there's no way to drive it externally without forking
 * it — same "copy, don't mutate the shared scaffold" precedent as
 * ProofSection.tsx. Hover/click still work as a manual override; they just
 * aren't required to see all three systems.
 */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { LayoutDashboard, ShoppingBag, Users, type LucideIcon } from 'lucide-react'
import { useGsapSection, revealLines, revealFadeUp } from '@/lib/gsap/reveals'

interface System {
  id: string
  title: string
  description: string
  imgSrc: string
  icon: LucideIcon
}

const SYSTEMS: System[] = [
  {
    id: 'custom-crms',
    title: 'Custom CRMs & internal tools',
    description: 'Leads, orders, and ops dashboards in one place your team already understands.',
    imgSrc: '/services/crm-dashboard-overview.webp',
    icon: LayoutDashboard,
  },
  {
    id: 'customer-portals',
    title: 'Customer & partner portals',
    description: 'Your customers log in, check their own status, and stop emailing you for it.',
    imgSrc: '/services/customer-portal-overview.webp',
    icon: Users,
  },
  {
    id: 'ecommerce-apps',
    title: 'E-commerce & mobile apps',
    description: 'Storefront, stock, and checkout wired as one system. The app follows when you need it.',
    imgSrc: '/services/ecommerce-storefront-overview.webp',
    icon: ShoppingBag,
  },
]

const CYCLE_MS = 3800

function AutoExpandingCards() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const paused = useRef(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      if (paused.current) return
      setActiveIndex((prev) => (prev + 1) % SYSTEMS.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  const select = (index: number) => {
    setActiveIndex(index)
    paused.current = true
  }

  const gridStyle = isDesktop
    ? { gridTemplateColumns: SYSTEMS.map((_, i) => (i === activeIndex ? '8fr' : '1fr')).join(' ') }
    : { gridTemplateRows: SYSTEMS.map((_, i) => (i === activeIndex ? '8fr' : '1fr')).join(' ') }

  return (
    <ul
      className="solution-cards grid h-[600px] w-full gap-2 transition-[grid-template-columns,grid-template-rows] duration-500 ease-out md:h-[58svh] md:max-h-[480px] md:min-h-[380px]"
      style={gridStyle}
      onMouseLeave={() => {
        paused.current = false
      }}
    >
      {SYSTEMS.map((system, index) => {
        const isActive = index === activeIndex
        const Icon = system.icon
        return (
          <li
            key={system.id}
            className="group relative min-h-0 min-w-0 cursor-pointer overflow-hidden border border-(--color-border) bg-(--color-surface) md:min-w-[80px]"
            onMouseEnter={() => select(index)}
            onFocus={() => select(index)}
            onClick={() => select(index)}
            tabIndex={0}
            data-active={isActive}
          >
            <Image
              src={system.imgSrc}
              alt={system.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="scale-110 object-cover grayscale transition-all duration-300 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            <article className="absolute inset-0 flex flex-col justify-end gap-3 p-5 md:p-6">
              <h3 className="hidden origin-left rotate-90 text-base font-medium uppercase tracking-wider text-white/85 opacity-100 transition-all duration-300 ease-out md:block group-data-[active=true]:opacity-0">
                {system.title}
              </h3>
              <Icon
                size={30}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-white opacity-0 transition-all duration-300 delay-75 ease-out group-data-[active=true]:opacity-100"
              />
              <h3 className="text-2xl font-bold text-white opacity-0 transition-all duration-300 delay-150 ease-out group-data-[active=true]:opacity-100 sm:text-3xl">
                {system.title}
              </h3>
              <p className="w-full max-w-xs text-base text-white/90 opacity-0 transition-all duration-300 delay-225 ease-out group-data-[active=true]:opacity-100">
                {system.description}
              </p>
            </article>
          </li>
        )
      })}
    </ul>
  )
}

export default function SolutionSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#solution-heading', { trigger: scope.current })
    revealFadeUp('.solution-cards', { y: 24, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="solution-heading">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="solution-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            Three Systems We Build Most Often
          </h2>
        </div>

        <AutoExpandingCards />
      </div>
    </section>
  )
}
