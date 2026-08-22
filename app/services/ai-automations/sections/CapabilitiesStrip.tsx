'use client'

import { useRef } from 'react'
import { LightningFill, ClockFill, ShieldFillCheck, BarChartFill } from 'react-bootstrap-icons'
import { useGsapSection, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'

interface Capability {
  icon:  typeof LightningFill
  title: string
  line:  string
}

const CAPABILITIES: Capability[] = [
  { icon: LightningFill,   title: 'Automate Anything',  line: 'Connect apps, APIs and data sources' },
  { icon: ClockFill,       title: 'Save Time',          line: 'Eliminate repetitive tasks and manual work' },
  { icon: ShieldFillCheck, title: 'Reliable & Secure',  line: 'Enterprise-grade security and data protection' },
  { icon: BarChartFill,    title: 'Scalable Workflows', line: 'Build once, scale without limits' },
]

/** Divider rules: dashed top border on mobile stack, dashed left border once
 *  the grid reaches 2 (sm) or 4 (lg) columns — see [Section] comment below. */
function itemClass(i: number) {
  const isFirst = i === 0
  const isRightCol = i % 2 === 1 // sm: 2-col grid, right column

  return [
    'flex items-start gap-4',
    isFirst ? 'pt-0' : 'mt-8 border-t border-dashed border-(--color-border) pt-8',
    i === 1 && 'sm:mt-0 sm:border-t-0 sm:pt-0',
    isRightCol && 'sm:border-l sm:border-dashed sm:border-(--color-border) sm:pl-8',
    'lg:mt-0 lg:border-t-0 lg:pt-0',
    !isFirst && 'lg:border-l lg:border-dashed lg:border-(--color-border) lg:pl-8',
    isFirst && 'lg:border-l-0 lg:pl-0',
  ].filter(Boolean).join(' ')
}

export default function CapabilitiesStrip() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealFadeUp('.capability-item', { y: 20, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-label="What our automation gives you">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-4">
          {CAPABILITIES.map(({ icon: Icon, title, line }, i) => (
            <div key={title} className={`capability-item group ${itemClass(i)}`}>
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-(--color-accent) bg-(--color-surface) md:size-16">
                <Icon size={22} aria-hidden="true" className="text-(--color-accent) transition-transform duration-300 ease-out group-hover:scale-130" />
              </div>
              <div>
                <h3 className="font-sans text-base font-bold leading-tight text-(--color-text) md:text-lg">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-snug text-(--color-text-muted)">
                  {line}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
