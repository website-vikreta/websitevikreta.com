import Image from 'next/image'
import type { HeadingPart } from '@/content/home'
import { Section } from './Section'
import { SectionHeading } from './Heading'

export function ClientLogos({ heading, logos }: { heading: HeadingPart[]; logos: readonly { src: string; alt: string }[] }) {
  return (
    <Section id="clients" labelledBy="clients-h">
      <SectionHeading id="clients-h" parts={heading} />
      <ul className="home-logos">
        {logos.map((l) => (
          <li key={l.src}>
            <Image src={l.src} alt={l.alt} width={160} height={56} unoptimized className="home-logo" />
          </li>
        ))}
      </ul>
    </Section>
  )
}
