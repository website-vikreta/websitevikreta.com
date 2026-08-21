'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'

const STEPS = [
  {
    n:     '01',
    title: 'Audit',
    body:  'We map what you’re actually doing today — every tool, every spreadsheet, every workaround — before we design anything.',
  },
  {
    n:     '02',
    title: 'Design',
    body:  'The system gets designed around your process, not a template’s. You see it before a line of code gets written.',
  },
  {
    n:     '03',
    title: 'Build & integrate',
    body:  'We build in the open and connect it to the tools you already use, checking in at every stage — not one big reveal at the end.',
  },
  {
    n:     '04',
    title: 'Launch & train',
    body:  'We launch with your team, not at them. Everyone knows how to use it before we hand over the keys.',
  },
  {
    n:     '05',
    title: 'Support',
    body:  'Software needs tuning once real usage starts. We stay on to fix what comes up.',
  },
]

export default function ProcessSection() {
  return (
    <section className="py-16 md:py-20" aria-label="How We Work">
      <div className="container">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <RevealText as="h2" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            How We Work
          </RevealText>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-(--color-border)">
          {STEPS.map((step, i) => (
            <RevealFade
              key={step.n}
              delay={i * 0.08}
              className="group border-r border-b border-(--color-border) p-5 sm:p-6"
            >
              <span className="font-mono font-bold leading-none text-3xl tracking-[-0.05em] text-(--color-border-strong) transition-colors duration-300 group-hover:text-(--color-accent)">
                {step.n}
              </span>
              <h3 className="mt-4 font-bold text-lg text-(--color-text)">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">{step.body}</p>
            </RevealFade>
          ))}
        </div>
      </div>
    </section>
  )
}
