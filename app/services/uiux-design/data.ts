import type { FaqItem } from '@/lib/faq-data'
import type { AuditModalConfig } from '@/components/ui/AuditModalProvider'

export interface UiUxCta {
  label: string
  href: string
}

export interface UiUxPopupCta {
  label: string
  hash: '#book-uiux-call' | '#get-uiux-quote'
}

export interface HeroVisualAsset {
  src: string
  width: number
  height: number
  alt: string
  brief: string
}

export interface HeroVisualFrame {
  id: string
  caption: string
  title: string
  description: string
  image: HeroVisualAsset
}

export const UI_UX_HERO = {
  sectionLabel: 'UI/UX design services',
  line1: 'Pretty screens',
  line2: "don't fix",
  line3Accent: 'broken flows.',
  subhead:
    'We map where people quit, prototype what to change, and hand dev a system — not a pile of PNGs.',
  primaryCta: { label: 'See the proof', href: '#proof' } satisfies UiUxCta,
  secondaryCta: { label: 'Book a call', hash: '#book-uiux-call' } satisfies UiUxPopupCta,
}

export const UI_UX_WORKFLOW = {
  sectionLabel: 'How it looks in the work',
  heading: 'Map the flow. Ship the system.',
  subhead: 'We document where users stall, then frame the UI your team can implement.',
  frames: [
    {
      id: 'flow-map',
      caption: 'Journey map · discover',
      title: 'Journey map',
      description:
        'Steps from first visit to conversion — with drop-offs and sentiment marked before we change a single screen.',
      image: {
        src: '/services/uiux-design/workflow/flow-map.webp',
        width: 1200,
        height: 900,
        alt: 'Monochrome user journey map with connected steps and one highlighted path.',
        brief:
          'FlowMapp-style journey: 5–7 nodes left-to-right, grey wires, one path in #FFD600, no people icons.',
      },
    },
    {
      id: 'design-canvas',
      caption: 'Canvas · system frames',
      title: 'System canvas',
      description:
        'Breakpoints, components, and states on one board — so design, dev, and QA are looking at the same product.',
      image: {
        src: '/services/uiux-design/workflow/design-canvas.webp',
        width: 1440,
        height: 960,
        alt: 'Design canvas with multiple artboards and a single yellow selection frame.',
        brief:
          'Figma-like top-down canvas: 2–3 artboards (dashboard + mobile), dot grid, yellow selection on one frame — no cursors.',
      },
    },
  ] satisfies HeroVisualFrame[],
}

export type PainMicroScene = 'scroll-depth' | 'funnel-leak' | 'spec-drift'

export interface OptionalSectionImage {
  src: string
  width: number
  height: number
  alt: string
  brief: string
}

export interface JourneyFrictionCard {
  id: string
  title: string
  /** Qualitative symptom — no negative % stats in UI */
  symptom: string
  problem: string
  microScene: PainMicroScene
  image?: OptionalSectionImage
}

export const UI_UX_PAIN = {
  sectionLabel: 'Your UI problems',
  heading: 'Users are leaving for reasons your analytics already named.',
  subhead:
    'Unclear hierarchy, bloated flows, and specs that never survived build — we start where session replay stops.',
  cards: [
    {
      id: 'landing-bounce',
      title: 'Landing never earns the scroll',
      symptom: 'Traffic lands, then backs out',
      problem:
        'Hero says everything and nothing. No clear next step, so mobile users never reach the first meaningful action.',
      microScene: 'scroll-depth',
      image: {
        src: '/services/uiux-design/pain/landing-friction.webp',
        width: 1600,
        height: 1000,
        alt: 'Mobile landing heatmap with clicks stuck on the hero and shallow scroll depth.',
        brief: '',
      },
    },
    {
      id: 'checkout-knot',
      title: 'Checkout asks too much, too late',
      symptom: 'Cart abandons mid-flow',
      problem:
        'Extra fields and surprise shipping show up after intent is highest. The deck version of the flow is not what people experience.',
      microScene: 'funnel-leak',
      image: {
        src: '/services/uiux-design/pain/checkout-friction.webp',
        width: 1600,
        height: 1000,
        alt: 'Checkout funnel replay with a stall on the shipping step.',
        brief: '',
      },
    },
    {
      id: 'handoff-gap',
      title: 'Handoff that dev can’t trust',
      symptom: 'Build drifts from the spec',
      problem:
        'Spacing tokens, states, and edge cases never made it into the file. Engineering guesses; QA logs design debt as bugs.',
      microScene: 'spec-drift',
      image: {
        src: '/services/uiux-design/pain/handoff-friction.webp',
        width: 1600,
        height: 1000,
        alt: 'Design spec beside implementation with misaligned spacing and missing button states.',
        brief: '',
      },
    },
  ] satisfies JourneyFrictionCard[],
}

export const UI_UX_SOLUTION_AUTO_MS = 4800

export type DesignSystemTabId = 'typography' | 'spacing' | 'auto-layout'

export interface DesignSystemPropertyRow {
  label: string
  value: string
}

export interface DesignSystemCanvasHint {
  showTypeScale?: boolean
  showSpacingGuides?: boolean
  showAutoLayoutAxes?: boolean
  spacingLabels?: { id: string; x: number; y: number; text: string }[]
}

export interface DesignSystemTab {
  id: DesignSystemTabId
  panelTitle: string
  description: string
  properties: DesignSystemPropertyRow[]
  canvas: DesignSystemCanvasHint
}

export const UI_UX_SOLUTION = {
  sectionLabel: 'What we ship',
  heading: 'A system your dev team can actually build.',
  subhead:
    'Typography, spacing, and layout rules live in one file — not scattered across Slack screenshots.',
  defaultTabId: 'typography' as DesignSystemTabId,
  tabs: [
    {
      id: 'typography',
      panelTitle: 'Typography',
      description: 'Type scale tied to real content lengths — not one-off hero sizes.',
      properties: [
        { label: 'Display', value: 'clamp(2.5rem, 6vw, 4.5rem) / 1.05' },
        { label: 'Body', value: '1.125rem / 1.6' },
        { label: 'Label', value: '0.75rem / 1.2 · semibold' },
      ],
      canvas: { showTypeScale: true },
    },
    {
      id: 'spacing',
      panelTitle: 'Spacing variables',
      description: '4px base grid — margins and gutters named, not eyeballed.',
      properties: [
        { label: 'space-2', value: '8px' },
        { label: 'space-4', value: '16px' },
        { label: 'space-6', value: '24px' },
        { label: 'section-y', value: '64px · 80px md' },
      ],
      canvas: {
        showSpacingGuides: true,
        spacingLabels: [
          { id: 'gutter', x: 12, y: 40, text: '24px' },
          { id: 'stack', x: 52, y: 58, text: '16px' },
        ],
      },
    },
    {
      id: 'auto-layout',
      panelTitle: 'Auto-layout',
      description: 'Flex direction, gap, and alignment — specified so build matches design.',
      properties: [
        { label: 'Direction', value: 'column → row @ md' },
        { label: 'Gap', value: 'var(--space-4)' },
        { label: 'Align', value: 'stretch / center cross-axis' },
      ],
      canvas: { showAutoLayoutAxes: true },
    },
  ] satisfies DesignSystemTab[],
  cta: { label: 'Talk through your design system', hash: '#get-uiux-quote' } satisfies UiUxPopupCta,
}

export interface UiUxProofProject {
  id: string
  title: string
  skills: string
  catchphrase: string
  href: string
  thumbnail: { src: string; width: number; height: number; alt: string }
}

export const UI_UX_PROJECTS: UiUxProofProject[] = [
  {
    id: 'sustainable-bitcoin-protocol',
    title: 'Sustainable Bitcoin Protocol',
    skills: 'UI/UX · design system',
    catchphrase: 'Still the first call.',
    href: 'https://www.sustainablebtc.org/',
    thumbnail: {
      src: '/services/web-development/proof/sustainable-bitcoin-protocol.webp',
      width: 1440,
      height: 810,
      alt: 'Sustainable Bitcoin Protocol website homepage',
    },
  },
  {
    id: 'archmodal',
    title: 'Archmodal',
    skills: 'UI/UX · web',
    catchphrase: 'A polished studio home page.',
    href: 'https://www.archmodal.com/',
    thumbnail: {
      src: '/services/web-development/proof/archmodal.webp',
      width: 1440,
      height: 810,
      alt: 'Archmodal website homepage',
    },
  },
  {
    id: 'earth-by-blancora',
    title: 'Earth by Blancora',
    skills: 'UI/UX · e-commerce',
    catchphrase: 'A storefront built to sell.',
    href: 'https://blancoraclothing.com/shop',
    thumbnail: {
      src: '/services/web-development/proof/earth-by-blancora.webp',
      width: 1440,
      height: 810,
      alt: 'Earth by Blancora storefront',
    },
  },
  {
    id: 'tocal',
    title: 'Tocal',
    skills: 'UI/UX · product site',
    catchphrase: 'Clean, modern product presentation.',
    href: 'https://tocal.in/',
    thumbnail: {
      src: '/services/web-development/proof/tocal.webp',
      width: 1440,
      height: 810,
      alt: 'Tocal website homepage',
    },
  },
]

export const UI_UX_FEATURED_PROJECTS = UI_UX_PROJECTS.slice(0, 3)

export const UI_UX_PROJECTS_COPY = {
  sectionLabel: 'Selected work',
  heading: 'UI/UX we have shipped.',
}

export const UI_UX_TESTIMONIAL_SLUGS = [
  'fiona-li',
  'stacey-bae',
  'abhinav-singh',
  'john-kim',
  'benoit-marcell',
] as const

export const UI_UX_BOOK_MODAL_CONFIG: AuditModalConfig = {
  formName: 'book_uiux_call_modal',
  heading: 'Book a UX review call',
  subjectPlaceholder: 'What product or flow needs UX work?',
  messagePlaceholder: 'Where do users drop off? Share a URL, recording, or analytics…',
  dialogDescription: 'Tell us about your UI/UX challenge — we reply within 24 hours.',
}

export const UI_UX_QUOTE_MODAL_CONFIG: AuditModalConfig = {
  formName: 'get_uiux_quote_modal',
  heading: 'Get a UX project quote',
  subjectPlaceholder: 'What are you designing or redesigning?',
  messagePlaceholder: 'Flows, platforms, timelines, and what success looks like…',
  dialogDescription: 'Share your UI/UX scope — we reply with an honest timeline and quote.',
}

export interface UiUxProcessNode {
  id: string
  title: string
  mapLabel: string
  summary: string
  deliverables: string[]
}

export const UI_UX_PROCESS = {
  sectionLabel: 'How we work',
  heading: 'Four nodes. One continuous line.',
  subhead: 'Research and handoff aren’t side quests — they’re on the same map as the UI.',
  nodes: [
    {
      id: 'discover',
      mapLabel: 'Discover',
      title: 'Discover',
      summary:
        'Analytics, support tickets, and session patterns — we find where people stall before we sketch.',
      deliverables: ['Audit summary', 'Journey map', 'Priority friction list'],
    },
    {
      id: 'architect',
      mapLabel: 'Architect',
      title: 'Architect',
      summary:
        'Information hierarchy, key flows, and component inventory — structure before pixels.',
      deliverables: ['Sitemap + flows', 'Wireframes', 'Content model'],
    },
    {
      id: 'prototype',
      mapLabel: 'Prototype',
      title: 'Prototype',
      summary:
        'Clickable paths on real breakpoints — test with stakeholders before engineering commits.',
      deliverables: ['Interactive prototype', 'State matrix', 'Accessibility notes'],
    },
    {
      id: 'handoff',
      mapLabel: 'Handoff',
      title: 'Handoff',
      summary:
        'Tokens, specs, and redlines in dev-ready format — fewer “can you check Figma again?” loops.',
      deliverables: ['Design tokens', 'Component specs', 'QA checklist'],
    },
  ] satisfies UiUxProcessNode[],
}

export type MetricChartKind = 'bar' | 'line'

export interface MetricReportSeriesPoint {
  label: string
  value: number
}

export interface MetricReportCardData {
  id: string
  client: string
  engagement: string
  metric: string
  metricDescriptor: string
  context: string
  chart: {
    kind: MetricChartKind
    series: MetricReportSeriesPoint[]
  }
  href?: string
  verified: boolean
}

export const UI_UX_PROOF = {
  sectionLabel: 'Proof',
  heading: 'Outcomes we can put on a chart.',
  subhead: 'Direct benchmarks from production handoffs and live conversion flows.',
  cards: [
    {
      id: 'dev-handoff',
      client: 'Frontend handoff speed',
      engagement: 'Design tokens · component specs',
      metric: '3x',
      metricDescriptor: 'faster frontend implementation',
      context: 'Explicit tokens, interactive states, and responsive rules eliminate guesswork and back-and-forth QA loops.',
      chart: {
        kind: 'bar',
        series: [
          { label: 'Legacy', value: 0.35 },
          { label: 'Tokens', value: 0.68 },
          { label: 'System', value: 0.95 },
        ],
      },
      verified: false,
    },
    {
      id: 'funnel-conversion',
      client: 'Checkout & lead funnels',
      engagement: 'Friction audits · flow redesign',
      metric: '+38%',
      metricDescriptor: 'average completion rate',
      context: 'Streamlined steps and mobile-first layouts reduce drop-offs across purchase and registration flows.',
      chart: {
        kind: 'line',
        series: [
          { label: 'Baseline', value: 0.42 },
          { label: 'Wireframe', value: 0.60 },
          { label: 'Live UI', value: 0.82 },
        ],
      },
      verified: false,
    },
    {
      id: 'state-coverage',
      client: 'Production readiness',
      engagement: 'Design systems · responsive states',
      metric: '100%',
      metricDescriptor: 'breakpoint & state coverage',
      context: 'Every screen includes hover, focus, error, and empty states across mobile, tablet, and desktop viewports.',
      chart: {
        kind: 'bar',
        series: [
          { label: 'Mobile', value: 1.0 },
          { label: 'Tablet', value: 1.0 },
          { label: 'Desktop', value: 1.0 },
        ],
      },
      verified: false,
    },
  ] satisfies MetricReportCardData[],
}

export const UI_UX_CONTACT = {
  heading: 'Show us where users quit.',
  subhead:
    'Share analytics, a recording, or a live URL. We’ll reply with what we’d test first — no deck required.',
  formHeading: 'Get a UX review call',
}

export const UI_UX_FAQS: FaqItem[] = [
  {
    id: 'uiux-deliverable',
    question: 'What do we actually get at the end?',
    answer:
      'Flows, high-fidelity UI, a component library in your stack (Figma or code), and handoff docs — spacing, states, and breakpoints included. Not just mockups.',
  },
  {
    id: 'uiux-research',
    question: 'Do you run user tests?',
    answer:
      'When the budget and timeline allow, yes — moderated or unmoderated, plus analytics review either way. If testing isn’t in scope, we still design from your data and support tickets.',
  },
  {
    id: 'uiux-dev',
    question: 'We already have developers. Do you only design?',
    answer:
      'We design for buildability. Your team implements, or we partner on front-end — either way specs are meant to survive contact with production.',
  },
  {
    id: 'uiux-timeline',
    question: 'How long does a typical UI/UX engagement take?',
    answer:
      'A focused flow (e.g. checkout or onboarding) often runs 3–5 weeks. Full product UI with a system is usually 6–10 weeks depending on surface area and review cycles.',
  },
  {
    id: 'uiux-existing-brand',
    question: 'Can you work inside our existing brand?',
    answer:
      'Yes. We extend what you have — tokens, type, and components — rather than throwing away recognizable equity unless you ask for a reset.',
  },
]

export const UI_UX_PAGE_META = {
  slug: 'uiux-design',
  serviceName: 'UI/UX Design Services',
  title: 'UI/UX Design Agency | Website Vikreta',
  description:
    'Research-driven UI/UX for web and mobile: fix drop-off, ship design systems, and hand off specs dev teams can build.',
}
