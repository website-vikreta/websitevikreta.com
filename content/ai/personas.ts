import type { Persona, PersonaId } from './types'

const img = (id: string, who: string) => ({
  front: `/wv/personas/${id}-front.webp`,
  threeQuarter: `/wv/personas/${id}-three-quarter.webp`,
  alt: `${who}, an AI persona built by Website Vikreta`,
})

export const PERSONAS: Record<PersonaId, Persona> = {
  meher: {
    id: 'meher',
    name: 'Meher',
    role: 'AI agent for HR',
    short: 'Offer letters, contracts, onboarding and the paperwork around every hire.',
    does: [
      'Writes offer letters and contracts from one message',
      'Sends them for e-sign and files the signed copy',
      'Runs onboarding and day-to-day ops tasks',
    ],
    hello: "Hi, I'm Meher, an AI teammate. Tell me who you're hiring and I'll sort the paperwork.",
    img: img('meher', 'Meher'),
    // TODO(owner): voice clip
    voice: undefined,
    branches: ['hr-automation', 'workflow-automation'],
  },
  ira: {
    id: 'ira',
    name: 'Ira',
    role: 'AI agent for content and UGC',
    short: 'Posts, blogs and UGC-style ad creatives, ready to publish.',
    does: [
      'Drafts and schedules posts across your channels',
      'Turns one idea into a blog, a thread and a newsletter',
      'Makes UGC-style ad variants to test',
    ],
    hello: "Hi, I'm Ira, an AI teammate. Give me a topic and a time, and I'll have it live.",
    img: img('ira', 'Ira'),
    // TODO(owner): voice clip
    voice: undefined,
    branches: ['ai-ugc-ads', 'content-automation'],
  },
  arjun: {
    id: 'arjun',
    name: 'Arjun',
    role: 'AI agent for sales and finance',
    short: 'Answers calls and chats, writes proposals, sends invoices, chases payments.',
    does: [
      'Picks up calls and WhatsApp chats, 24/7',
      'Drafts proposals from your call notes',
      'Sends invoices and follows up on late ones',
    ],
    hello: "Hi, I'm Arjun, an AI teammate. Ask me about any deal, call or invoice.",
    img: img('arjun', 'Arjun'),
    // TODO(owner): voice clip
    voice: undefined,
    branches: ['ai-voice-agents', 'whatsapp-automation', 'proposal-automation', 'finance-automation'],
  },
}
