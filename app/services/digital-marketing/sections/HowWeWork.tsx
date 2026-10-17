'use client'

import { useRef } from 'react'
import { BarChart3, CircleCheck, Users } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { useGsapSection, revealLines, revealFadeUp, STAGGER, DUR, EASE } from '@/lib/gsap/reveals'

interface Step {
  title: string
  num: string
  body: string
  chips: string[]
}

const STEPS: Step[] = [
  {
    num: '01', title: 'Audit & Opportunity Map',
    body: 'We go through your site, rankings, traffic, ads, and lead numbers to find what’s costing you conversions.',
    chips: ['SEO audit', 'Competitor check', 'Lead review'],
  },
  {
    num: '02', title: 'Strategy & Plan',
    body: 'One plan for SEO, GEO, content, and paid ads, with a single budget split across them.',
    chips: ['Keyword plan', 'Channel mix', 'Goals you approve'],
  },
  {
    num: '03', title: 'Content & Campaigns',
    body: 'We publish content, fix technical SEO, and launch campaigns in stages.',
    chips: ['Blog & landing pages', 'Paid campaigns', 'Technical fixes'],
  },
  {
    num: '04', title: 'Compounding Growth',
    body: 'Each month we move budget toward the channels that bring in leads.',
    chips: ['Monthly report', 'Budget shifts', 'Cost per lead'],
  },
]

const VALUES = [
  { Icon: BarChart3,   label: 'Clear stages' },
  { Icon: Users,       label: 'You approve each one' },
  { Icon: CircleCheck, label: 'Judged by leads' },
]

// Desktop stagger, as in a slightly zig-zagging stack. Full literal classes for Tailwind.
const OFFSET = ['lg:ml-[8%]', 'lg:ml-[16%]', 'lg:ml-0', 'lg:ml-[12%]']

export default function HowWeWork() {
  const scope = useRef<HTMLElement>(null)
  useGsapSection(scope, (reduce) => {
    revealLines('#process-heading', { trigger: scope.current, start: 'top 75%' })
    revealFadeUp('.hww-copy', { y: 20, stagger: STAGGER.base, trigger: scope.current, start: 'top 75%' })
    if (reduce) return
    // Steps land one after another, alternating the side they slide in from.
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.hww-track', start: 'top 70%' } })
    gsap.utils.toArray<HTMLElement>('.hww-card').forEach((card, i) => {
      tl.from(card, { opacity: 0, x: i % 2 ? 24 : -24, duration: DUR.fast, ease: EASE.out }, i ? '-=0.15' : 0)
        .from(card.querySelector('.hww-num'), { opacity: 0, scale: 0.8, duration: DUR.fast, ease: EASE.out }, '<0.1')
    })
  })

  return (
    <section ref={scope} id="process" className="scroll-mt-32 overflow-x-clip py-16 md:py-20" aria-labelledby="process-heading">
      <div className="container">
        <div className="grid grid-cols-1 gap-14 xl:grid-cols-12 xl:items-center xl:gap-10">
          <div className="xl:col-span-5">
            <h2 id="process-heading" className="text-h2 font-bold tracking-tight text-(--color-text)">
              From Strategy <span className="xl:block">To <span className="text-(--color-accent)">Real Growth.</span></span>
            </h2>
            <p className="hww-copy mt-6 max-w-lg text-body-lg leading-relaxed text-(--color-text-muted)">
              SEO, GEO, content, and paid ads, planned together and rolled out
              in four stages.
            </p>
            <div className="hww-copy mt-8">
              <Button href="#marketing-audit" variant="primary" size="lg" showArrow>
                Book a Free Marketing Audit
              </Button>
            </div>
            <ul className="hww-copy mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {VALUES.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-(--color-text-muted)">
                  <Icon className="h-4 w-4 text-(--color-text)" strokeWidth={2} />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="xl:col-span-7">
            <ol className="hww-track relative flex flex-col gap-8 lg:gap-6" aria-label="Digital marketing process">
              {STEPS.map((step, i) => (
                <li
                  key={step.num}
                  className={`hww-card relative flex items-center gap-5 md:gap-7 lg:w-[84%] ${OFFSET[i]}`}
                >
                  <span
                    aria-hidden="true"
                    className="hww-num w-16 shrink-0 font-mono text-5xl font-bold leading-none tracking-[-0.05em] text-(--color-accent) md:w-24 md:text-7xl"
                  >
                    {step.num}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-snug text-(--color-text) md:text-xl">
                      <span className="sr-only">{`Step ${step.num}: `}</span>
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-(--color-text-muted)">{step.body}</p>
                    <p className="hww-chip mt-3 text-xs font-medium text-(--color-text-faint)">{step.chips.join(' · ')}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
