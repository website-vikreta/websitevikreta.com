import type { ReactNode } from 'react'
import type { HeadingPart } from '@/content/home'
import { Asterisk } from './Asterisk'
import { Kinetic } from './Kinetic'

export function Words({ text }: { text: string }) {
  const words = text.split(' ')
  return words.map((w, i) => (
    <span key={i}>
      {w && (
        <span className="kw">
          <span className="kwi">{w}</span>
        </span>
      )}
      {i < words.length - 1 ? ' ' : ''}
    </span>
  ))
}

/** Plain text runs plus yellow-highlight runs, each word wrapped for Kinetic. */
export function HeadingParts({ parts }: { parts: HeadingPart[] }) {
  return parts.map((p, i) =>
    typeof p === 'string' ? (
      <Words key={i} text={p} />
    ) : (
      <span key={i} className="hl">
        <Words text={p.hl} />
      </span>
    ),
  )
}

export function SectionHeading({
  id,
  parts,
  still,
  children,
}: {
  id: string
  parts: HeadingPart[]
  /** Static heading: no kinetic motion (for sections that animate something else). */
  still?: boolean
  /** Optional right-aligned slot (e.g. a section CTA). */
  children?: ReactNode
}) {
  return (
    <div className="home-head">
      <div className="home-head-main">
        {still ? (
          <h2 id={id} className="home-h">
            <HeadingParts parts={parts} />
          </h2>
        ) : (
          <Kinetic as="h2" id={id} className="home-h">
            <HeadingParts parts={parts} />
          </Kinetic>
        )}
        <Asterisk className="home-asterisk" />
      </div>
      {children}
    </div>
  )
}
