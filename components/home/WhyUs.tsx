import type { HeadingPart, IconCard } from '@/content/home'
import { Section } from './Section'
import { SectionHeading } from './Heading'

export function WhyUs({ heading, items }: { heading: HeadingPart[]; items: IconCard[] }) {
  return (
    <Section id="why" labelledBy="why-h">
      <SectionHeading id="why-h" parts={heading} />
      <ul className="home-grid-2">
        {items.map((it, i) => (
          <li key={it.title} className="home-panel home-card">
            <span className="home-badge">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="home-h3-sm">{it.title}</h3>
            <p className="home-body">{it.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
