export type PersonaId = 'meher' | 'ira' | 'arjun'

export type Persona = {
  id: PersonaId
  name: string
  role: string
  short: string
  does: string[]
  hello: string
  img: { front: string; threeQuarter: string; alt: string }
  voice?: string
  branches: string[]
}

export type Source = { name: string; year: number; url: string }
export type Stat = { value: string; label: string; source?: Source; placeholder?: boolean }
export type Faq = { q: string; a: string }
export type Step = { title: string; body: string }

export type ChatMessage = {
  from: PersonaId | 'user' | string
  text: string
  attachment?: { kind: 'pdf' | 'image' | 'card'; label: string; meta?: string }
}

export type Demo =
  | { kind: 'chat'; channel: 'whatsapp' | 'sms' | 'web' | 'team'; title: string; messages: ChatMessage[] }
  | { kind: 'call'; title: string; caller: string; lines: { who: 'agent' | 'caller'; text: string }[]; outcome: string; audio?: string }
  | { kind: 'doc'; title: string; docTitle: string; fields: { label: string; value: string }[]; status: string[] }
  | { kind: 'timeline'; title: string; events: { at: string; label: string; state: 'done' | 'pending' | 'paid' }[] }
  | { kind: 'flow'; title: string; nodes: { id: string; label: string; app?: string }[]; edges: [string, string][] }
  | { kind: 'fanout'; title: string; source: string; outputs: { channel: string; text: string }[] }
  | { kind: 'beforeAfter'; title: string; before: { src: string; alt: string }; after: { src: string; alt: string; video?: string }; caption: string }

export type Scenario = { industry: string; photo: string; alt: string; line: string }
export type Shift = { before: string; after: string }
export type CaseStudy = { client: string; title: string; problem: string; built: string; result: string; placeholder?: boolean }
export type Video = { title: string; poster: string; youtubeId?: string } // TODO(owner): youtubeId

export type ProductPage = {
  heroSub: string
  shifts?: Shift[]
  title: string
  description: string
  h1: string[]
  demo: Demo
  steps: Step[]
  faqs: Faq[]
  related: string[]
}

export type Product = {
  slug: string
  name: string
  keyword: string
  oneLiner: string
  answer: string
  persona: PersonaId
  channels?: string[]
  kpi: Stat
  timeToLive: string
  includes: string[]
  excludes: string[]
  page?: ProductPage
  caseStudy?: CaseStudy
  reading?: string[]
}

export type Branch = {
  slug: string
  name: string
  navLabel: string
  persona: PersonaId
  title: string
  description: string
  h1: string[]
  lead: string
  answerQ: string
  answer: string
  demo: Demo
  stats: Stat[]
  steps: Step[]
  integrations: string[]
  industries: string[]
  compliance: string
  proof?: { client: string; result: string; placeholder?: boolean }
  faqs: Faq[]
  products: Product[]
  usp: string
  heroSub: string
  scenarios: Scenario[]
  shifts: Shift[]
  video: Video
  tools: string[]
  clients: string[]
  pairsWith?: string[]
  reading?: string[]
}

export type Problem = { id: string; label: string; persona: PersonaId; fix: string; branch: string }

export type Hub = {
  title: string; description: string
  h1: string[]; lead: string
  teamChat: Extract<Demo, { kind: 'chat' }>
  problems: Problem[]
  stats: Stat[]
  steps: Step[]
  trust: string[]
  proof: { client: string; result: string; placeholder?: boolean }[]
  faqs: Faq[]
  usp: string
  heroSub: string
  scenarios: Scenario[]
}
