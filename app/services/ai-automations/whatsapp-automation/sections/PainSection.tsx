'use client'

import { useMemo, useRef, useState } from 'react'
import { IndianRupee, MailX, PackageX, ShoppingCart } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import RtoCalculator from '../components/RtoCalculator'
import CodConfirmDemo from '../components/CodConfirmDemo'
import SolutionStep from '../components/SolutionStep'
import { ProofCard } from '../components/ProofCard'

const PAINS = [
  {
    icon: ShoppingCart,
    stat: '70%',
    title: 'Carts abandoned before purchase',
    line: 'Seven in ten checkouts never complete. You can win some back if you reach buyers where they read messages.',
  },
  {
    icon: MailX,
    stat: '~8%',
    title: 'Email recovery rate',
    line: 'Cart recovery emails land in Promotions. WhatsApp messages get opened 98% of the time.',
  },
  {
    icon: PackageX,
    stat: '₹250+',
    title: 'Per COD return, minimum',
    line: 'Shipping out, shipping back, QC. One confirmation message before dispatch cuts returns by about a third.',
  },
]

export default function PainSection() {
  const painScope = useRef<HTMLElement>(null)

  useGsapSection(painScope, () => {
    revealLines('#pain-heading', { trigger: painScope.current })
    revealFadeUp('.pain-intro', { y: 20, trigger: painScope.current })
    revealFadeUp('.pain-card', { y: 20, stagger: STAGGER.base, trigger: painScope.current })
  })

  return (
    <section ref={painScope} id="pain" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="pain-heading">
      <div className="container">
        {/* Challenge layout: centred heading and one-line intro, then three centred columns with no cards */}
        <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
          <h2
            id="pain-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            Where buyers drop off
          </h2>
          <p className="pain-intro mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            Three leaks between a paid click and a delivered order.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
          {PAINS.map(({ icon: Icon, stat, title, line }) => (
            <article key={title} className="pain-card flex flex-col items-center text-center">
              <Icon size={36} strokeWidth={1.75} aria-hidden className="text-(--color-accent)" />
              <p className="mt-5 text-h2 font-bold leading-none tracking-tight text-(--color-text)">{stat}</p>
              <h3 className="mt-4 text-xl font-bold leading-snug text-(--color-text)">{title}</h3>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-(--color-text-muted)">{line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const COD_STEPS = [
  {
    tag: 'In seconds',
    title: 'A COD order comes in',
    body: 'The buyer gets a WhatsApp within seconds: the item, the amount, and two buttons.',
  },
  {
    tag: 'One tap',
    title: 'They tap confirm or cancel',
    body: 'One tap. Nobody on your team has to call them.',
  },
  {
    tag: 'Before dispatch',
    title: 'Only real orders ship',
    body: 'Confirmed orders get packed. Cancelled ones never leave the warehouse, so you never pay to ship them both ways.',
  },
]

/* The RTO cost calculator. Sits right before Packages so the owner sees what returns cost them,
   in their own numbers, immediately before the price. */
export function RtoSection() {
  const mathScope = useRef<HTMLElement>(null)
  // Follows the phone demo, so the step being acted out on screen is the one lit up here
  const [step, setStep] = useState(0)
  // The demo ticks every couple of seconds; the calculator must not re-render with it
  const calculator = useMemo(() => <RtoCalculator />, [])

  useGsapSection(mathScope, () => {
    revealLines('#step-cod', { trigger: mathScope.current })
    revealFadeUp('.cod-intro', { y: 20, trigger: mathScope.current })
    revealLines('#math-heading', { trigger: mathScope.current })
    revealFadeUp('.math-copy',  { y: 20, trigger: mathScope.current })
    // One reveal for the list: per-step reveals would pin an inline opacity that fights the highlight
    revealFadeUp('.cod-steps',  { y: 20, trigger: mathScope.current })
    revealFadeUp('.cod-phone',  { y: 30, trigger: mathScope.current })
    revealFadeUp('.math-calc',  { y: 30, delay: STAGGER.base, trigger: mathScope.current })
  })

  return (
      <section ref={mathScope} id="rto-math" className="scroll-mt-32 pb-16 md:pb-20" aria-labelledby="math-heading">
        <div className="container">
          {/* Step 04 of the flow: same layout as the steps above, text left, phone right */}
          <div className="mb-16 grid grid-cols-1 gap-12 md:mb-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div className="lg:order-2">
              <SolutionStep
                id="step-cod"
                introClassName="cod-intro"
                title={<>Confirm COD orders <span className="text-(--color-accent)">before they ship.</span></>}
                intro="One automated WhatsApp message before dispatch filters out uncommitted buyers before a shipping label is created."
              />

              {/* Timeline: the dot on the line follows the step the phone is showing */}
              <ol className="cod-steps relative mt-8 pl-8">
                <span aria-hidden className="absolute bottom-6 left-[6px] top-6 w-px bg-(--color-border-strong)" />
                {COD_STEPS.map(({ tag, title, body }, i) => {
                  const on = step === i
                  return (
                    <li key={title} className={`relative py-4 transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-40'}`}>
                      <span
                        aria-hidden
                        className={`absolute -left-8 top-[1.6rem] h-3.5 w-3.5 rounded-full border-2 border-(--color-surface) transition-colors duration-500 ${on ? 'bg-(--color-accent)' : 'bg-(--color-border-strong)'}`}
                      />
                      <span className="rounded-full bg-(--color-bg-muted) px-2.5 py-0.5 font-mono text-xs font-semibold tracking-wider text-(--color-text)">{tag}</span>
                      <h4 className="mt-2 text-xl font-bold leading-snug tracking-tight text-(--color-text)">{title}</h4>
                      <p className="mt-1 text-base leading-relaxed text-(--color-text-muted)">{body}</p>
                    </li>
                  )
                })}
              </ol>

              <div className="mt-6 flex items-start gap-3.5 border border-(--color-border) bg-(--color-surface) px-5 py-4">
                <IndianRupee size={22} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-(--color-text)" />
                <p className="text-sm leading-relaxed text-(--color-text-muted)">
                  <span className="block text-base font-semibold text-(--color-text)">A returned COD parcel costs ₹250 or more.</span>
                  One confirmation message before dispatch avoids it.
                </p>
              </div>
            </div>

            <div className="cod-phone flex items-center justify-center lg:order-1">
              <div className="relative h-[620px] w-[330px] sm:w-[680px] lg:max-xl:[zoom:0.82]">
                <div className="absolute left-1/2 top-8 hidden h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-(--color-bg-muted)/70 sm:block" />
                <div className="absolute left-1/2 top-12 w-[330px] -translate-x-1/2">
                  <CodConfirmDemo onStep={setStep} />
                </div>
                <ProofCard side="left" top={130} show time="11:42">
                  COD order #1042<br />Block Print Kurta · ₹1,299
                </ProofCard>
                <ProofCard side="right" top={210} delay={0.6} show={step >= 1} time="11:43">
                  Buyer confirmed the order
                </ProofCard>
                <ProofCard side="right" top={380} delay={1.2} show={step >= 2} time="11:43">
                  Packed. Ships today with a tracking link.
                </ProofCard>
              </div>
            </div>
          </div>

          {/* Closing block: what returns cost, then the calculator */}
          <div className="border-t border-(--color-border) pt-16 md:pt-20">
            <div className="mb-10 grid grid-cols-1 gap-6 md:mb-14 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
              <h2 id="math-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
                Calculate what returned COD orders cost <span className="text-(--color-accent)">your store.</span>
              </h2>
              <p className="math-copy text-body-lg leading-relaxed text-(--color-text-muted)">
                Every returned parcel costs forward freight, return freight and packaging. Drag the sliders to your own
                numbers and see what that adds up to each month, and how much a WhatsApp confirmation saves.
              </p>
            </div>
            <div className="math-calc">
              {calculator}
            </div>
          </div>
        </div>
      </section>
  )
}
