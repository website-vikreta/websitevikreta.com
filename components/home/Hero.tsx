import Link from 'next/link'
import type { HeroContent } from '@/content/home'
import { HeadingParts } from './Heading'
import { Kinetic } from './Kinetic'
import { HomeCta } from './HomeCta'
import { Asterisk } from './Asterisk'

export function Hero({ data }: { data: HeroContent }) {
  return (
    <section id="main-content" aria-labelledby="hero-h" className="home-section home-hero">
      <div className="container">
        <div className="home-head-main">
          <Kinetic as="h1" id="hero-h" mode="hero" className="home-h home-h1">
            <HeadingParts parts={data.heading} />
          </Kinetic>
          <Asterisk className="home-asterisk home-asterisk-lg" />
        </div>
        <p className="home-lead">{data.sub}</p>
        <ul className="home-chips" aria-label="Services">
          {data.chips.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="home-chip">
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="home-actions">
          <HomeCta link={data.primaryCta} />
          <HomeCta link={data.secondaryCta} variant="ghost" />
        </div>
        <ul className="home-trust" aria-label="Proof">
          {data.trust.map((t) => (
            <li key={t.label}>
              {t.external ? (
                <a href={t.href} className="home-trust-item" target="_blank" rel="noopener noreferrer">
                  {t.label}
                </a>
              ) : (
                <Link href={t.href} className="home-trust-item">
                  {t.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
