import type { Branch } from '@/content/ai-automations/types'

export const branch: Branch = {
  slug: 'proposal-automation',
  name: 'Proposal Automation',
  navLabel: 'Proposals',
  persona: 'arjun',
  title: 'Proposal Automation for Small Teams | Website Vikreta',
  description:
    'Turn discovery notes into a client-ready proposal or RFP response in minutes. We draft it. You approve price, terms and scope. Built in your own tools.',
  h1: ['Proposal out the same day', 'as the call.'],
  usp: 'The proposal is drafted from your call notes. You approve price.',
  heroSub: 'Call notes in, client-ready proposal out. Nothing sends until you approve price and terms.',
  scenarios: [
    // TODO(owner): real photo
    { industry: 'Agencies', photo: 'https://images.unsplash.com/photo-1672380135241-c024f7fbfa13?w=1200&q=70&auto=format&fit=crop', alt: 'Two people shaking hands in front of a laptop', line: 'An agency lead hangs up at 3pm. The draft is ready by 3:20, then [proposal follow-up](/services/ai-automations/proposal-automation/proposal-follow-up) starts.' },
    // TODO(owner): real photo
    { industry: 'Recruiting', photo: 'https://images.unsplash.com/photo-1698047682091-782b1e5c6536?w=1200&q=70&auto=format&fit=crop', alt: 'Two women shaking hands across a table after an interview', line: 'A recruiting agency answers a new client brief the same afternoon.' },
    // TODO(owner): real photo
    { industry: 'Finance firms', photo: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=1200&q=70&auto=format&fit=crop', alt: 'A person in a suit jacket holding a tablet', line: 'A finance firm turns an intake call into a scoped engagement letter.' },
  ],
  shifts: [
    { before: 'Two days to write a proposal', after: 'Draft ready after the call' },
    { before: 'Copy-pasting old case studies', after: 'Best-fit proof pulled in' },
    { before: 'Chasing quiet prospects', after: 'Follow-up queued for you' },
  ],
  // TODO(owner): youtubeId once recorded
  video: { title: 'Watch us write a proposal (60s)', poster: '/wv/personas/arjun-three-quarter.webp' },
  tools: ['hubspot', 'gmail', 'notion', 'googledrive', 'slack', 'googlesheets', 'claude', 'make'],
  clients: ['blancora', 'raicoon', 'yeto-holidays'],
  pairsWith: ['workflow-automation', 'finance-automation'],
  reading: ['/blog/ai-and-automation/ai-automation-connecting-tools', '/blog/ai-and-automation/establishing-human-oversight-automation'],
  lead: 'We turn your discovery notes into a finished proposal, scope and follow-up. You approve price and terms before anything goes out.',
  answerQ: 'What is proposal automation?',
  answer:
    'Proposal automation is software that drafts your proposals, scopes and RFP answers from notes, past wins and your own templates. You review and approve. It sends nothing on its own. We build it for you, inside your tools, so a first draft takes minutes instead of days. See [proposal generation](/services/ai-automations/proposal-automation/proposal-generation) and [RFP response automation](/services/ai-automations/proposal-automation/rfp-response-automation).',
  demo: {
    kind: 'doc',
    title: 'Notes in, proposal out',
    docTitle: 'Proposal: Northwind Logistics',
    fields: [
      { label: 'Problem', value: 'Dispatch runs on spreadsheets. Two late deliveries a week.' },
      { label: 'Scope', value: 'Dispatch dashboard, driver app, daily report.' },
      { label: 'Timeline', value: '8 weeks, 3 milestones.' },
      { label: 'Team', value: 'Project lead, 2 engineers, 1 designer.' },
      { label: 'Price and terms', value: 'Waiting for your approval.' },
    ],
    status: ['Reading discovery notes', 'Matching past proposals', 'Drafting sections', 'Ready for your review'],
  },
  stats: [
    {
      value: '43%',
      label: 'average RFP win rate in 2024',
      source: { name: 'Loopio RFP statistics', year: 2024, url: 'https://www.loopio.com/blog/rfp-statistics-win-rates' },
    },
    {
      value: '153',
      label: 'RFPs the average team answers each year',
      // TODO(owner): unverified — could not find 153 RFPs/year in any Loopio report (2020 report says 100+)
      placeholder: true,
      source: { name: 'Loopio', year: 2025, url: 'https://www.loopio.com/blog/rfp-statistics-win-rates' },
    },
    { value: '< 15 min', label: 'to a first draft', placeholder: true },
  ],
  steps: [
    { title: 'Share your best work', body: 'Send past proposals, case studies and price rules. We learn how you sell.' },
    { title: 'We map the flow', body: 'Notes, form or call transcript in. A draft in your template out.' },
    { title: 'We build and test', body: 'We run it on real deals until the drafts need only light edits.' },
    { title: 'You approve, then it sends', body: 'You check price, terms and scope. Only then does it go to the client.' },
  ],
  integrations: ['Google Docs', 'Google Drive', 'HubSpot', 'Gmail', 'Notion', 'DocuSign', 'Slack'],
  industries: ['Agencies', 'B2B services', 'Software firms', 'Recruiting agencies', 'Finance firms'],
  compliance:
    'A person on your team approves price, legal terms and scope before anything is sent. Your automation drafts and never sends alone. Drafts stay in your Google or Microsoft account. We do not give legal advice, and we do not train public models on your deals.',
  faqs: [
    {
      q: 'What is proposal automation software?',
      a: 'It is a tool that writes the first draft of a proposal for you. It pulls from your notes, past wins and templates, then fills each section. A person still reviews it. The result is a draft in minutes, not a blank page.',
    },
    {
      q: 'Proposal automation software vs service: which is better?',
      a: 'Software gives you a template tool and you do the setup. A service builds the flow around how you already sell, then runs it. If you have no time to configure tools, pick the service. We do the second one.',
    },
    {
      q: 'Can AI write a business proposal?',
      a: 'Yes, a good first draft. It handles structure, scope text and past case studies well. It should not set price or legal terms alone, so a person approves both. Read how in [human oversight in automation](/blog/ai-and-automation/establishing-human-oversight-automation).',
    },
    {
      q: 'How long does it take to set up proposal automation?',
      a: 'Most flows go live in about one to two weeks. The time goes to collecting your best past proposals and testing drafts on real deals. Exact timing depends on how many templates and tools you use.',
    },
    {
      q: 'What affects the cost of proposal automation?',
      a: 'Scope: how many templates you use, how many tools connect, how big your answer library is, and how many test rounds you want. [Book a call](/contact) and we size it to how you sell.',
    },
    {
      q: 'Will the AI send a proposal without my approval?',
      a: 'No. Every flow has a stop before send. You approve price, terms and scope. Built in your own tools. Nothing leaves your account until a person says yes. Follow-up reminders are also queued for your review at first.',
    },
    {
      q: 'Does proposal automation work with my CRM?',
      a: 'It works with HubSpot, Google Sheets and most tools with an API or a Make connector. The draft can start from a deal stage, a form or a call note. Tell us your stack and we confirm on the first call.',
    },
    {
      q: 'Can you automate RFP responses for a small team?',
      a: 'Yes. We build a library from your past answers, match each new question to the best one, and draft the rest. Your team reviews every answer. It cuts the copy-paste, not the judgment.',
    },
    {
      q: 'Is it safe to put client details into an AI proposal tool?',
      a: 'It can be, if set up right. Your drafts stay in your own accounts. We limit what the AI sees, and we do not use your deals to train public models. Ask us for the data flow in writing.',
    },
  ],
  products: [
    {
      slug: 'proposal-generation',
      name: 'Proposal generation',
      keyword: 'proposal automation software',
      oneLiner: 'Discovery notes in, client-ready proposal out.',
      answer:
        'Proposal generation turns your discovery call notes into a full proposal in your template. It writes the problem, scope, timeline and team sections, and adds matching case studies. Price and terms wait for you. You review, edit and approve before the client sees anything.',
      persona: 'arjun',
      channels: ['Email', 'Slack'],
      kpi: { value: '< 15 min', label: 'to a first draft', placeholder: true },
      timeToLive: 'Live in ~10 days',
      caseStudy: {
        client: 'raicoon',
        title: 'Raicoon: proposals out the day of the call',
        problem: 'Each proposal took a day or two to write from scratch.',
        built: 'A notes-to-draft flow in the team template, with a price approval step.',
        result: 'First drafts in [N] minutes. Price stays with the lead.',
        placeholder: true,
      }, // TODO(owner): confirm client and real result
      reading: ['/blog/ai-and-automation/ai-automation-connecting-tools', '/blog/ai-and-automation/establishing-human-oversight-automation'],
      includes: [
        'Draft from call notes, form or transcript',
        'Your template, your tone, your case studies',
        'Pricing table filled from your rules',
        'Approval step before send',
        'Saved to Google Docs or your CRM',
      ],
      excludes: [
        'We do not set your prices',
        'No legal review of your terms',
        'Does not sign or send without approval',
      ],
      page: {
        title: 'Proposal Automation Software and Service | Website Vikreta',
        description:
          'Proposal generation that turns discovery notes into a client-ready draft in minutes. You approve price and terms first. Built for you in your own tools.',
        h1: ['Proposal automation', 'built for you.'],
        heroSub: 'Discovery notes in, a proposal in your template out. You set price and terms.',
        demo: {
          kind: 'doc',
          title: 'Watch a proposal fill in',
          docTitle: 'Proposal: Brightside Dental',
          fields: [
            { label: 'Client goal', value: 'More new-patient bookings from the website.' },
            { label: 'Approach', value: 'New booking page, reminders, review requests.' },
            { label: 'Deliverables', value: '5 pages, 2 automations, monthly report.' },
            { label: 'Case study', value: 'Matched from your library: a clinic booking-page project.' },
            { label: 'Price and terms', value: 'Held for your approval.' },
          ],
          status: ['Notes read', 'Sections drafted', 'Case study matched', 'Waiting on you'],
        },
        steps: [
          { title: 'Capture the call', body: 'Notes, a form or a transcript from your call tool feeds the flow.' },
          { title: 'Draft each section', body: 'Your automation writes the problem, scope and timeline in your template.' },
          { title: 'You approve', body: 'You edit text and confirm price, terms and scope.' },
          { title: 'Send and track', body: 'The proposal goes out from your email. The deal updates in your CRM.' },
        ],
        faqs: [
          {
            q: 'How to automate proposal writing?',
            a: 'Capture discovery notes in one place, then let a flow draft each section from a template and past wins. Add a human check on price and terms before send. We build and run that flow in your own tools.',
          },
          {
            q: 'Can AI generate a proposal from meeting notes?',
            a: 'Yes. It reads the notes, finds the client goal and pain, and fills your template. Expect a solid first draft, then a short edit. Anything on price or legal terms stays with you.',
          },
          {
            q: 'What does a proposal automation service include?',
            a: 'Template setup, a case study library, a draft flow, an approval step and CRM sync. We test it on your real deals before launch, then adjust it as you learn what wins.',
          },
          {
            q: 'Will proposals sound like us?',
            a: 'They can. We train the flow on your best past proposals and your own phrasing. You still review each draft, and your edits sharpen the next one.',
          },
          {
            q: 'Do you build the pricing table?',
            a: 'We fill it from rules you give us, like rate cards or package tiers. You approve the final number every time. We do not decide your price.',
          },
        ],
        related: ['proposal-automation/rfp-response-automation', 'finance-automation/invoice-automation'],
      },
    },
    {
      slug: 'rfp-response-automation',
      name: 'RFP response automation',
      keyword: 'RFP response automation',
      oneLiner: 'Answer RFP questions from your past wins, then review.',
      answer:
        'RFP response automation reads a new RFP, splits it into questions, and drafts each answer from your past responses and docs. Your team reviews every answer and fills the gaps. It cuts the copy-paste work so you can answer more RFPs with the same people.',
      persona: 'arjun',
      channels: ['Email', 'Slack'],
      kpi: { value: '< 15 min', label: 'to a first draft', placeholder: true },
      timeToLive: 'Live in ~14 days',
      caseStudy: {
        client: 'yeto-holidays',
        title: 'Yeto Holidays: RFP answers from past work',
        problem: 'Replies to tender requests repeated the same answers by hand.',
        built: 'An answer library from past responses, with a team review step.',
        result: '[N] RFPs answered in a quarter, each reviewed by a person.',
        placeholder: true,
      }, // TODO(owner): confirm client and real result
      reading: ['/blog/ai-and-automation/establishing-human-oversight-automation', '/blog/educational/ai-agent-api-security'],
      includes: [
        'Answer library built from your past RFPs',
        'Question matching and first-draft answers',
        'Flags for gaps and low-confidence answers',
        'Review and approval in a shared doc',
        'Export to Word, Google Docs or PDF',
      ],
      excludes: [
        'We do not promise a higher win rate',
        'No legal or compliance sign-off',
        'We do not write answers about work you have not done',
      ],
      page: {
        title: 'RFP Response Automation for Small Teams | Website Vikreta',
        description:
          'RFP response automation that drafts answers from your past wins. Your team reviews every line and approves price and terms before you submit.',
        h1: ['RFP response', 'automation.'],
        heroSub: 'Match each RFP question to your best past answer. Your team reviews every line.',
        demo: {
          kind: 'flow',
          title: 'From RFP to reviewed draft',
          nodes: [
            { id: 'rfp', label: 'New RFP arrives', app: 'Gmail' },
            { id: 'split', label: 'Split into questions' },
            { id: 'match', label: 'Match to past answers', app: 'Google Drive' },
            { id: 'draft', label: 'Draft answers' },
            { id: 'review', label: 'Team reviews', app: 'Slack' },
            { id: 'approve', label: 'You approve price and terms' },
          ],
          edges: [
            ['rfp', 'split'],
            ['split', 'match'],
            ['match', 'draft'],
            ['draft', 'review'],
            ['review', 'approve'],
          ],
        },
        steps: [
          { title: 'Build the library', body: 'We load your past RFPs, case studies and policy docs.' },
          { title: 'Read the new RFP', body: 'Your automation splits it into questions and matches each to your best answer.' },
          { title: 'Draft and flag', body: 'It drafts answers and flags any it cannot back with your docs.' },
          { title: 'Review and submit', body: 'Your team edits. You approve price, terms and scope, then submit.' },
        ],
        faqs: [
          {
            q: 'How to automate RFP responses?',
            a: 'Build a library of your past answers, then match each new question to the closest one and draft from it. A person reviews everything. We set up the library, the matching and the review step for you.',
          },
          {
            q: 'Is RFP automation worth it for a small business?',
            a: 'If you answer more than a few RFPs a year, usually yes. Loopio puts the average team at about 153 a year. Even a smaller load repeats the same answers. Automation cuts that repeat work.',
          },
          {
            q: 'Will RFP automation raise my win rate?',
            a: 'We make no win-rate claim. It saves time on drafts so you can answer more RFPs and review each one better. Wins still depend on fit, price and how well you know the buyer.',
          },
          {
            q: 'What is the difference between RFP software and an RFP service?',
            a: 'Software is a tool you load and maintain. A service builds the library, runs the flow and tunes it for you. If your team has no one to own the tool, a service is faster.',
          },
          {
            q: 'Can it fill security questionnaires?',
            a: 'It can draft answers from your policy docs. Your security owner must review each one before it is sent. We do not certify or attest anything for you.',
          },
        ],
        related: ['proposal-automation/proposal-generation', 'workflow-automation/document-data-extraction'],
      },
    },
    {
      slug: 'scope-of-work-generation',
      name: 'Scope of work generation',
      keyword: 'scope of work generator',
      oneLiner: 'Clear scope, deliverables and timeline from a short brief.',
      answer:
        'Scope of work generation turns a short brief or call note into a written scope. It lists deliverables, timeline, what is in, what is out, and what the client must provide. You edit and approve it. It cuts scope creep by putting the limits in writing early.',
      persona: 'arjun',
      channels: ['Email'],
      kpi: { value: '< 15 min', label: 'to a first draft', placeholder: true }, // TODO(owner): confirm real timing
      timeToLive: 'Live in ~7 days',
      includes: [
        'Deliverables and timeline from your brief',
        'In-scope and out-of-scope lists',
        'Client responsibilities section',
        'Your template and wording',
        'Approval step before it is shared',
      ],
      excludes: ['No legal review of terms', 'We do not set price or hours', 'Does not replace a signed contract'],
    },
    {
      slug: 'upwork-proposal-automation',
      name: 'Upwork proposal automation',
      keyword: 'Upwork proposal automation',
      oneLiner: 'Job posts in, tailored cover letters out. We run this ourselves.',
      answer:
        'Upwork proposal automation reads a new job post, checks it against your profile and past work, and drafts a tailored cover letter. We run this flow in Make for our own Upwork agency profile. You review each letter before it goes out.',
      persona: 'arjun',
      channels: ['Email', 'Slack'],
      kpi: { value: '< 15 min', label: 'to a first draft', placeholder: true }, // TODO(owner): confirm real timing
      timeToLive: 'Live in ~7 days',
      includes: [
        'Job post screening against your fit rules',
        'Tailored cover letter drafts',
        'Matching samples from your past work',
        'Slack alert with the draft to approve',
        'Built on Make, the same setup we use',
      ],
      excludes: [
        'Does not auto-submit bids',
        'No fake reviews or profile edits',
        'Follows Upwork terms of use, so a person stays in the loop',
      ],
    },
    {
      slug: 'proposal-follow-up',
      name: 'Proposal follow-up',
      keyword: 'proposal follow up automation',
      oneLiner: 'Polite nudges after you send, until they reply.',
      answer:
        'Proposal follow-up sends short, timed nudges after a proposal goes out. It stops when the client replies, signs or says no. Messages are drafted in your voice and queued for your approval at first. Fewer deals go quiet because nobody remembered to ask.',
      persona: 'arjun',
      channels: ['Email', 'WhatsApp'],
      kpi: { value: '0', label: 'proposals forgotten after send', placeholder: true }, // TODO(owner): set real KPI
      timeToLive: 'Live in ~5 days',
      includes: [
        'Timed nudges after send',
        'Stops on reply, signature or decline',
        'Drafts in your voice',
        'CRM stage updates',
        'Weekly list of open proposals',
      ],
      excludes: ['No WhatsApp messages without opt-in', 'Does not chase after a clear no', 'No change to price or terms'],
    },
  ],
}
