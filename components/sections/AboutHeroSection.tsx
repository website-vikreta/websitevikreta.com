'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { REVEAL_EASE, RevealFade, RevealText } from '@/components/ui/Reveal'

const META = [
  'Pune, India',
  'Five years in',
  '68 projects shipped',
  '6,360 hours given back',
]

export function AboutHeroSection() {
  const reduced = useReducedMotion()

  return (
    <section
      id="main-content"
      className="relative flex min-h-svh flex-col justify-center overflow-x-clip pt-32 pb-12 md:pt-36 md:pb-16"
      aria-label="About Hero"
    >
      <div className="container">
        <h1 className="text-(--color-text)">
          {/* Past tense, struck through — the model we killed. Light weight against
              the display line below so the size AND weight jump carry the pivot. */}
          <RevealText as="span" className="block text-h1 font-normal text-(--color-text-faint)">
            We used to build{' '}
            <span className="relative inline-block">
              pages
              <motion.span
                aria-hidden="true"
                // top-[0.56em] sits on the lowercase x-height centre, not the line box
                // centre (top-1/2), which reads visibly high on a strikethrough.
                className="absolute left-0 top-[0.56em] h-[0.045em] w-full origin-left bg-(--color-text)"
                initial={{ scaleX: reduced ? 1 : 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.55, ease: REVEAL_EASE, delay: reduced ? 0 : 0.75 }}
              />
            </span>
            .
          </RevealText>

          {/* Present tense, full display scale — the model we run now. */}
          <RevealText
            as="span"
            className="block text-display font-bold mt-3 md:mt-5"
            delay={0.15}
          >
            Now <span className="text-(--color-accent)">we build systems</span>.
          </RevealText>
        </h1>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-12 lg:mt-16">
          <RevealFade delay={0.4} className="lg:col-span-6">
            <p className="text-body-lg text-(--color-text-muted) leading-(--leading-body)">
              A year ago we became the AI automation agency businesses call
              first. You&apos;re not hiring us for a nicer homepage.
              You&apos;re hiring us to stop the hours your team is quietly
              bleeding.
            </p>
          </RevealFade>

          <RevealFade
            delay={0.5}
            className="lg:col-span-6 flex flex-wrap items-end gap-3 lg:justify-end"
          >
            <Button href="/contact" variant="primary" size="lg" showArrow>
              Get in Touch
            </Button>
            <Button href="#vision" variant="ghost" size="lg" showArrow>
              Learn More
            </Button>
          </RevealFade>
        </div>
      </div>

      {/* Proof band — quiet, real numbers only. */}
      <div className="container mt-16 lg:mt-24">
        <RevealFade delay={0.6}>
          <ul className="flex flex-wrap gap-x-10 gap-y-2">
            {META.map((item) => (
              <li key={item} className="text-sm text-(--color-text-muted)">
                {item}
              </li>
            ))}
          </ul>
        </RevealFade>
      </div>
    </section>
  )
}
