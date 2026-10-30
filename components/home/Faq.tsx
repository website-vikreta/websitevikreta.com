import type { FaqItem } from '@/lib/faq-data'
import type { HeadingPart, HomeLink } from '@/content/home'
import { Section } from './Section'
import { SectionHeading } from './Heading'
import { HomeCta } from './HomeCta'

export function Faq({ heading, items, cta }: { heading: HeadingPart[]; items: FaqItem[]; cta: HomeLink }) {
  return (
    <Section id="faq" labelledBy="faq-h">
      <SectionHeading id="faq-h" parts={heading} />
      <div className="home-faqs">
        {items.map((f) => (
          <details key={f.id} className="home-panel home-faq">
            <summary>
              <span>{f.question}</span>
              <span className="home-badge home-faq-i" aria-hidden="true" />
            </summary>
            <p className="home-body">{f.answer}</p>
          </details>
        ))}
      </div>
      <div className="home-center">
        <HomeCta link={cta} variant="ghost" />
      </div>
    </Section>
  )
}
