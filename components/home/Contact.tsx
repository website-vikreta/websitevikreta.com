import Link from 'next/link'
import { AuditForm } from '@/components/ui/AuditForm'
import type { HeadingPart, HomeLink } from '@/content/home'
import { Section } from './Section'
import { SectionHeading } from './Heading'

export function Contact({ heading, details, location }: { heading: HeadingPart[]; details: HomeLink[]; location: string }) {
  return (
    <Section id="contact" labelledBy="contact-h">
      <SectionHeading id="contact-h" parts={heading} />
      <div className="home-contact">
        <ul className="home-details">
          {details.map((d) => (
            <li key={d.href}>
              {d.external ? (
                <a href={d.href} className="home-chip" target="_blank" rel="noopener noreferrer">
                  {d.label}
                </a>
              ) : (
                <Link href={d.href} className="home-chip">
                  {d.label}
                </Link>
              )}
            </li>
          ))}
          <li className="home-body">{location}</li>
        </ul>
        <div className="home-panel home-form" role="region" aria-labelledby="contact-h">
          <AuditForm formName="home_contact" heading="" subjectPlaceholder="What's slowing you down?" messagePlaceholder="Tell us what you're doing by hand today…" />
        </div>
      </div>
    </Section>
  )
}
