'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

export function NewsletterSection() {
  return (
    <section
      className="relative py-16 md:py-20"
      aria-label="Newsletter"
    >
      <div className="container">
        <div className="bg-(--color-bg-muted) border border-(--color-border) rounded-sm p-8 md:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-3xl">
            <RevealText>
              <span className="text-meta-label font-bold uppercase tracking-(--tracking-meta) text-(--color-text-faint) block mb-4">
                Newsletter
              </span>
            </RevealText>
            <RevealText>
              <h2 className="text-h2 font-bold text-(--color-text) mb-6">
                Good Design Starts With Our Newsletter
              </h2>
            </RevealText>
            <RevealFade delay={0.2}>
              <p className="text-body-lg text-(--color-text-muted) leading-(--leading-body) mb-8">
                Subscribe to the Website Vikreta newsletter and get the best of research, UX writing, product psychology, CX, and design systems, right in your inbox.
              </p>
            </RevealFade>
            <RevealFade delay={0.3}>
              <form className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="flex-1">
                  <label htmlFor="email" className="text-sm font-medium text-(--color-text) mb-2 block">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your Email Address"
                    className="w-full px-4 py-3 rounded-sm border border-(--color-border) bg-(--color-surface) text-(--color-text) placeholder:text-(--color-text-faint) focus:outline-none focus:ring-2 focus:ring-(--color-accent) transition-all"
                    required
                  />
                </div>
                <div className="sm:pt-7">
                  <Button type="submit" variant="accent" size="lg">
                    Join Our Newsletter
                  </Button>
                </div>
              </form>
            </RevealFade>
          </div>
        </div>
      </div>
    </section>
  )
}
