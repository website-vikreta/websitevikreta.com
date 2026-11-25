import type { HeadingPart, StatItem } from '@/content/home'
import { Section } from './Section'
import { SectionHeading } from './Heading'
import { CountUp } from './Kinetic'

export function Numbers({ heading, stats }: { heading: HeadingPart[]; stats: StatItem[] }) {
  return (
    <Section id="numbers" labelledBy="numbers-h">
      <div className="home-panel home-panel-y home-numbers">
        <SectionHeading id="numbers-h" parts={heading} still />
        <ul className="home-grid-3">
          {stats.map((s) => (
            <li key={s.label} className="home-stat">
              <p className="home-big">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="home-body">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
