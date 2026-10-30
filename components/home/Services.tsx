import Link from 'next/link'
import { Bot, Globe, Layers, PenTool, TrendingUp } from 'lucide-react'
import type { HeadingPart, HomeLink, ServiceItem } from '@/content/home'
import { Section } from './Section'
import { SectionHeading } from './Heading'
import { HomeCta } from './HomeCta'

const ICONS = { bot: Bot, globe: Globe, layers: Layers, pen: PenTool, chart: TrendingUp }

export function Services({ heading, items, cta }: { heading: HeadingPart[]; items: ServiceItem[]; cta: { title: string; cta: HomeLink } }) {
  return (
    <Section id="services" labelledBy="services-h">
      <SectionHeading id="services-h" parts={heading} />
      <ul className="home-grid-3">
        {items.map((s, i) => {
          const Icon = ICONS[s.icon]
          return (
            <li key={s.href}>
              <Link href={s.href} className="home-panel home-card home-card-link">
                <span className="home-card-top">
                  <span className="home-badge">{String(i + 1).padStart(2, '0')}</span>
                  <span className="home-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={2} />
                  </span>
                </span>
                <h3 className="home-h3-sm">{s.title}</h3>
                <p className="home-body">{s.description}</p>
              </Link>
            </li>
          )
        })}
        <li>
          <div className="home-panel home-panel-y home-card">
            <h3 className="home-h3-sm">{cta.title}</h3>
            <HomeCta link={cta.cta} variant="ghost" />
          </div>
        </li>
      </ul>
    </Section>
  )
}
