import Link from 'next/link'

const RE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g

/** `[text](/internal/path)` becomes a next/link; everything else stays text. Internal paths only. */
export function RichText({ text }: { text: string }) {
  const out: React.ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(RE)) {
    if (m.index > last) out.push(text.slice(last, m.index))
    out.push(<Link key={m.index} href={m[2]} className="wv-ax-inl">{m[1]}</Link>)
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}

/** Plain text for JSON-LD. */
export const stripLinks = (text: string) => text.replace(RE, '$1')
