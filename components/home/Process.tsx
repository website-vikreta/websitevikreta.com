import type { HeadingPart, IconCard } from '@/content/home'
import { Section } from './Section'
import { SectionHeading } from './Heading'

export function Process({ heading, steps }: { heading: HeadingPart[]; steps: IconCard[] }) {
  return (
    <Section id="process" labelledBy="process-h">
      <SectionHeading id="process-h" parts={heading} />
      <ol className="home-steps">
        {steps.map((s, i) => (
          <li key={s.title} className="home-step">
            <span className="home-badge">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="home-h3-sm">{s.title}</h3>
            <p className="home-body">{s.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
