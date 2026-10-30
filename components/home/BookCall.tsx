import type { HeadingPart, HomeLink } from '@/content/home'
import { Section } from './Section'
import { SectionHeading } from './Heading'
import { HomeCta } from './HomeCta'

export function BookCall({ heading, copy, embedUrl, pageUrl, fallback }: { heading: HeadingPart[]; copy: string; embedUrl: string; pageUrl: string; fallback: HomeLink }) {
  return (
    <Section id="book-call" labelledBy="book-h">
      <SectionHeading id="book-h" parts={heading} />
      <p className="home-lead">{copy}</p>
      {embedUrl ? (
        <>
          <div className="home-panel home-embed">
            <iframe src={embedUrl} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Book a free call with Website Vikreta" />
          </div>
          <p className="home-body">
            <a href={pageUrl} target="_blank" rel="noopener noreferrer" className="home-link">
              Open in Calendly
            </a>
          </p>
        </>
      ) : (
        <HomeCta link={fallback} />
      )}
    </Section>
  )
}
