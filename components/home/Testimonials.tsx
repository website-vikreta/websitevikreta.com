import Image from 'next/image'
import type { HeadingPart, TestimonialItem } from '@/content/home'
import { Section } from './Section'
import { SectionHeading } from './Heading'

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('')
}

export function Testimonials({ heading, items }: { heading: HeadingPart[]; items: TestimonialItem[] }) {
  return (
    <Section id="testimonials" labelledBy="testimonials-h">
      <SectionHeading id="testimonials-h" parts={heading} />
      <ul className="home-quotes" tabIndex={0} aria-label="Client testimonials">
        {items.map((t) => (
          <li key={t.name} className="home-panel home-card home-quote">
            <span className="home-qmark" aria-hidden="true">&ldquo;</span>
            <blockquote className="home-body home-quote-text">{t.quote}</blockquote>
            <div className="home-who">
              {t.image ? (
                <Image src={t.image} alt="" width={56} height={56} className="home-avatar" />
              ) : (
                <span className="home-avatar home-avatar-i" aria-hidden="true">{initials(t.name)}</span>
              )}
              <p>
                <strong>{t.name}</strong>
                <br />
                <span className="home-muted">{t.role}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
