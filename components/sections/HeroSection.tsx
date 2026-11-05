import { Fragment, type CSSProperties } from 'react'
import { Button } from '@/components/ui/Button'
import { UpworkBadge } from '@/components/ui/UpworkBadge'

const HEADLINE = 'We don\'t just execute. We think first.'
const WORDS = HEADLINE.split(' ')

// Desktop line-break index: break before second "We" — two clean lines
const BREAK_BEFORE = new Set([4])

// Word index to accent — "think" = 5
const ACCENT_INDEX = 5

// Entrance is pure CSS (.hero-word / .hero-fade in globals.css): it plays on first paint, so the
// hero text no longer waits for hydration + GSAP, which was holding LCP at ~9s on mobile.
export function HeroSection() {
  return (
    <section
      id="main-content"
      className="relative flex flex-col justify-center min-h-svh overflow-x-clip"
      aria-label="Hero Website Vikreta"
    >
      {/* ── Content ──────────────────────────────────────────── */}
      <div className="container relative z-10 pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28">

        {/* Headline — display scale, word-masked reveal */}
        <h1
          className="text-display font-semibold text-(--color-text) font-sans mb-12 lg:mb-14"
          aria-label={HEADLINE}
        >
          {WORDS.map((word, i) => (
            <Fragment key={i}>
              {BREAK_BEFORE.has(i) && <br className="hidden lg:block" />}
              <span className="word-wrapper" aria-hidden="true">
                <span
                  className="word-inner hero-word"
                  style={{
                    '--i': i,
                    ...(i === ACCENT_INDEX ? { color: 'var(--color-accent)' } : null),
                  } as CSSProperties}
                >
                  {word}
                </span>
              </span>
              {i < WORDS.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </h1>

        {/* Subheadline — constrained width for ideal line length */}
        <p
          className="hero-fade text-body-lg text-(--color-text-muted) max-w-lg leading-relaxed mb-10 lg:mb-12"
          style={{ '--d': '0.45s' } as CSSProperties}
        >
          Website Vikreta works with businesses that want to go digital properly, or want to figure out where AI fits in what they already do. Websites, apps, automation, design. We use every relevant tool available. And we listen before we touch anything.
        </p>

        {/* CTAs */}
        <div
          className="hero-fade flex flex-wrap gap-3 items-center"
          style={{ '--d': '0.65s' } as CSSProperties}
        >
          <Button href="/contact" variant="primary" size="lg" showArrow>
            Talk to Us, it&apos;s Free
          </Button>
          <Button href="/work" variant="ghost" size="lg" showArrow>
            See our work
          </Button>
        </div>

      </div>

      {/* Upwork badge — mobile: bottom-right corner of hero. md+: straddles fold,
          right edge aligned to container content edge. Overlaps section below. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 md:top-[100vh] md:bottom-auto z-20">
        <div className="container relative">
          <div className="pointer-events-auto absolute -bottom-10 right-8 md:right-(--section-x) md:-translate-y-[80%] md:translate-y-0">
            <div className="w-[110px] h-[110px] md:w-auto md:h-auto">
              <UpworkBadge />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
