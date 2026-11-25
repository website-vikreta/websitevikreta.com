import Image from 'next/image'
import Link from 'next/link'
import type { CaseStudy } from '@/lib/work-data'
import type { HeadingPart, HomeLink } from '@/content/home'
import { Section } from './Section'
import { SectionHeading, Words } from './Heading'
import { Kinetic } from './Kinetic'
import { HomeCta } from './HomeCta'

interface Featured {
  study: CaseStudy
  big: string
  label: string
  secondary: { value: string; label: string }
}

export function CaseStudies({ heading, featured, others, cta }: { heading: HeadingPart[]; featured: Featured; others: CaseStudy[]; cta: HomeLink }) {
  const f = featured.study
  return (
    <Section id="work" labelledBy="work-h">
      <SectionHeading id="work-h" parts={heading} still />

      <article className="home-panel home-panel-y home-feature" aria-labelledby="feature-t">
        <div>
          <span className="home-badge">01</span>
          <Image src={f.logo} alt={f.company} width={160} height={48} unoptimized className="home-case-logo" />
          <Kinetic as="h3" id="feature-t" className="home-h home-h3">
            <Words text={f.title} />
          </Kinetic>
          <p className="home-body">{f.excerpt}</p>
          <Link href={`/work/${f.slug}`} className="home-link">
            Read the case study
          </Link>
        </div>
        <div className="home-result">
          <p className="home-big">{featured.big}</p>
          <p className="home-result-label">{featured.label}</p>
          <p className="home-result-2">
            <strong>{featured.secondary.value}</strong> {featured.secondary.label}
          </p>
        </div>
      </article>

      <div className="home-grid-2">
        {others.map((s, i) => (
          <article key={s.slug} className="home-panel home-card" aria-labelledby={`${s.slug}-t`}>
            <span className="home-badge">{String(i + 2).padStart(2, '0')}</span>
            <Image src={s.logo} alt={s.company} width={160} height={48} unoptimized className="home-case-logo" />
            <Kinetic as="h3" id={`${s.slug}-t`} className="home-h home-h3">
              <Words text={s.title} />
            </Kinetic>
            <p className="home-body">{s.excerpt}</p>
            {s.metric && (
              <p className="home-metric">
                <strong>{s.metric.value}</strong> {s.metric.label}
              </p>
            )}
            <Link href={`/work/${s.slug}`} className="home-link">
              Read the case study
            </Link>
          </article>
        ))}
      </div>
      <div className="home-center">
        <HomeCta link={cta} />
      </div>
    </Section>
  )
}
