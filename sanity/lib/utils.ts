// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PortableBlock = any

export interface Heading {
  _key: string
  text: string
  slug: string
  level: number
}

/** Plain text of a Portable Text block — concatenated span text, ignoring marks. */
export function getBlockText(block: PortableBlock): string {
  return (block?.children ?? [])
    .filter((c: PortableBlock) => c._type === 'span')
    .map((c: PortableBlock) => c.text ?? '')
    .join('')
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Pulls h2/h3 blocks out of a post body for the Table of Contents. Slug must match the id injected by `ptComponents` in PortableTextContent.tsx. */
export function extractHeadings(body: PortableBlock[]): Heading[] {
  if (!Array.isArray(body)) return []
  return body
    .filter((block) => block._type === 'block' && (block.style === 'h2' || block.style === 'h3'))
    .map((block) => {
      const text = getBlockText(block)
      return {
        _key: block._key,
        text,
        slug: slugify(text),
        level: block.style === 'h2' ? 2 : 3,
      }
    })
    .filter((h) => h.text)
}
