/** Shape of one Web Design & Development leaf page. Rendered by components/wv/web/LeafPage.tsx. */
export type LeafContent = {
  crumb: string
  /** Breadcrumb parent. Defaults to Web Design & Development. */
  parent?: { label: string; href: string }
  /** Primary button label. Defaults to 'Get a free website audit'. */
  cta?: string
  /** Proof section title, two lines. Defaults to 'Sites we / have shipped'. */
  proofTitle?: [string, string]
  /** Client quotes to show, by name from QUOTES. Defaults to the web set. */
  quotes?: { tab: string; name: string }[]
  /** Which STATS to show (indexes into STATS). Defaults to the first three. */
  stats?: number[]
  h1: [string, string]
  hero: {
    lead: string
    words: string[]
    proof: string
    tag: string
    /** Lead-in for the rotating word, e.g. "Built to" or "We" */
    rot: string
    /** 'shot' = real AP Cleanco screenshot, 'wire' = generic landing-page wireframe, 'ba' = old vs new cards, 'vitals' = three speed measures, 'checklist' = upkeep checklist */
    art: 'shot' | 'wire' | 'ba' | 'vitals' | 'checklist' | 'store' | 'headless' | 'audit'
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
  /** Optional "which one fits" table (e-commerce pages). `on` marks the column this page is about. */
  compare?: { aside: string; cols: { t: string; on?: boolean }[]; rows: { k: string; v: string[] }[] }
  /** Optional "what it connects to" grid (e-commerce pages). */
  connects?: { aside: string; items: { t: string; d: string }[] }
  build: { aside: string; /** Section title, two lines. Defaults to 'What you / get'. */ title?: [string, string]; rows: { t: string; href: string; d: string; pop: string[] }[] }
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
