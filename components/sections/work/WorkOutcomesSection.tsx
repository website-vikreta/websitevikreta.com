'use client'

import { RevealText, RevealFade, Counter } from '@/components/ui/Reveal'
import { WORK_OUTCOMES } from '@/lib/work-data'

export function WorkOutcomesSection() {
  return (
    <section className="relative py-16 md:py-20" aria-label="Work Outcomes">
      <div className="container">
        <RevealText as="h2" className="text-h2 font-bold text-(--color-text) mb-10 md:mb-14">
          What the work adds up to
        </RevealText>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
          {WORK_OUTCOMES.map((item, index) => (
            <RevealFade
              key={item.id}
              delay={0.15 + index * 0.1}
              className="flex flex-col border-l border-(--color-border) pl-5 pr-8 py-2"
            >
              <div className="mb-2 flex h-12 items-center font-bold font-mono leading-none text-(--color-text) md:h-[3.75rem]">
                <span className="text-5xl md:text-6xl">
                  {item.useCounter ? (
                    <>
                      <Counter value={item.counterValue} />
                      {'suffix' in item && item.suffix ? (
                        <span className="ml-1 text-3xl md:text-4xl">{item.suffix}</span>
                      ) : null}
                    </>
                  ) : (
                    item.display
                  )}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-(--color-text-muted) md:text-base">
                {item.label}
              </p>
            </RevealFade>
          ))}
        </div>
      </div>
    </section>
  )
}
