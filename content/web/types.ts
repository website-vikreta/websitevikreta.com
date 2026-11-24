/** Shape of one Web Design & Development leaf page. Rendered by components/wv/web/LeafPage.tsx. */
export type LeafContent = {
  crumb: string
  h1: [string, string]
  hero: {
    lead: string
    words: string[]
    proof: string
    tag: string
    /** Lead-in for the rotating word, e.g. "Built to" or "We" */
    rot: string
    /** 'shot' = real AP Cleanco screenshot, 'wire' = generic landing-page wireframe, 'ba' = old vs new cards, 'vitals' = three speed measures, 'checklist' = upkeep checklist */
    art: 'shot' | 'wire' | 'ba' | 'vitals' | 'checklist'
    url: string
  }
  band: [string[], string[]]
  friction: {
    statement: string
    /** g picks the glyph: 0 lines, 1 no-entry, 2 lock, 3 funnel */
    items: { t: string; d: string; g: 0 | 1 | 2 | 3 }[]
    photo: string
    alt: string
  }
  build: { aside: string; rows: { t: string; href: string; d: string; pop: string[] }[] }
  steps: { aside: string; items: { n: string; t: string; d: string }[] }
  proof: {
    aside: string
    slugs: string[]
    metric: Record<string, string>
    /** Closing card in the stack, shown instead of an invented case study. */
    invite?: { t: string; d: string; cta: string; href: string }
  }
  fit: { good: string[]; notFit: { t: string; link: string; href: string }[] }
  faqs: { q: string; a: string }[]
  related: { t: string; d: string; href?: string }[]
}
