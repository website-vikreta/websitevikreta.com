import type { Hub } from './types'

export const HUB: Hub = {
  // 58 chars
  title: 'AI Automation Agency for Small Businesses | Website Vikreta',
  description:
    'Missed calls, slow replies, late invoices, hiring paperwork. We build AI automations in your accounts, live in about 14 days.',
  h1: ['AI automation that', 'takes the busywork', 'off your team.'],
  usp: 'Done-for-you AI automations for sales, HR, content and finance. Live in weeks, built in your accounts.',
  // Plain definition up top: AI answers quote mostly from the first part of a page.
  heroSub: 'AI automation is software that does your repeat work, like calls, offer letters, posts and invoices, inside your own accounts. You just message it.',
  // Bump when the page content changes. Shown on the page and sent as dateModified.
  updated: '2026-11-10',
  scenarios: [
    // TODO(owner): real photo
    { industry: 'Dental clinic', photo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=70&auto=format&fit=crop', alt: 'Dental office with a chair and equipment', line: '7:40 pm call to a dental clinic. Thursday 3:30 was booked by an [AI receptionist](/services/ai-automations/ai-voice-agents/ai-receptionist).' },
    // TODO(owner): real photo
    { industry: 'D2C brand', photo: 'https://images.unsplash.com/photo-1770013413878-2530e2c3d82b?w=1200&q=70&auto=format&fit=crop', alt: 'Woman checking a package with her phone near a laptop and boxes', line: 'Order question at 11 pm on WhatsApp. Answered in six seconds.' },
    // TODO(owner): real photo
    { industry: 'Recruiting firm', photo: 'https://images.unsplash.com/photo-1686771416537-bf4a4f263d88?w=1200&q=70&auto=format&fit=crop', alt: 'A man and a woman sitting across a table at a job interview', line: 'Neel\'s offer letter: one line to the assistant, signed by lunch. See [HR automation](/services/ai-automations/hr-automation).' },
    // TODO(owner): real photo
    { industry: 'Finance firm', photo: 'https://images.unsplash.com/photo-1735825764485-93a381fd5779?w=1200&q=70&auto=format&fit=crop', alt: 'Person at a desk with a laptop and invoice papers', line: 'Invoice 30 days late. The second reminder, from [finance automation](/services/ai-automations/finance-automation), got it paid Friday.' },
    // TODO(owner): real photo
    { industry: 'Agency', photo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=70&auto=format&fit=crop', alt: 'Man presenting to a team seated at laptops', line: 'Monday brief from one call. A month of posts queued.' },
    // TODO(owner): real photo
    { industry: 'Edtech', photo: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=70&auto=format&fit=crop', alt: 'Person studying online on a laptop', line: 'Course lead asked about the March cohort. Replied in eight seconds.' },
  ],
  lead:
    'We build AI automations for sales, HR, content and finance. Done for you, live in about 14 days. You own every workflow. We run our own company on these automations.',
  teamChat: {
    kind: 'chat',
    channel: 'team',
    title: '#ops',
    messages: [
      { from: 'Shubham', text: 'Meher, offer letter for Neel. Frontend dev, starts Dec 1.' },
      {
        from: 'meher',
        text: 'Done. Drafted from our template and checked the start date.',
        attachment: { kind: 'pdf', label: 'Offer letter · Neel.pdf', meta: 'Sent for e-sign' },
      },
      { from: 'Priya', text: 'Ira, LinkedIn post for tomorrow 10am about the Blancora launch.' },
      {
        from: 'ira',
        text: 'Written and queued. Want to see the draft first?',
        attachment: { kind: 'card', label: 'Scheduled · Tue 10:00 AM', meta: 'LinkedIn · Blancora launch' },
      },
      { from: 'Priya', text: 'Looks good, ship it.' },
      { from: 'Shubham', text: "Arjun, where's the SBP deal?" },
      {
        from: 'arjun',
        text: 'Call went well. Summary is in the CRM. They asked for a revised scope, and I sent the invoice for phase one.',
        attachment: { kind: 'card', label: 'Invoice sent · SBP phase 1', meta: 'Call summary saved' },
      },
      { from: 'Shubham', text: 'Perfect. Thanks, all.' },
    ],
  },
  problems: [
    { id: 'missed-calls', label: 'Missed calls', persona: 'arjun', branch: 'ai-voice-agents', fix: 'Calls get answered and booked automatically, with a summary in your CRM.' },
    { id: 'slow-replies', label: 'Slow lead replies', persona: 'arjun', branch: 'whatsapp-automation', fix: 'Leads get a WhatsApp reply in seconds, and the warm ones come to you.' },
    { id: 'chasing-invoices', label: 'Chasing invoices', persona: 'arjun', branch: 'finance-automation', fix: 'Invoices go out on time and late ones are chased until paid.' },
    { id: 'hiring-paperwork', label: 'Hiring paperwork', persona: 'meher', branch: 'hr-automation', fix: 'Offer letters and contracts are written, sent for e-sign and filed for you.' },
    { id: 'content-backlog', label: 'Content backlog', persona: 'ira', branch: 'content-automation', fix: 'One idea becomes a blog, posts and a newsletter, scheduled for you.' },
    { id: 'ad-creatives', label: 'Ad creatives', persona: 'ira', branch: 'ai-ugc-ads', fix: 'UGC-style ad variants made for you, so you test more and wait less.' },
    { id: 'slow-proposals', label: 'Proposals take days', persona: 'arjun', branch: 'proposal-automation', fix: 'Proposals are drafted from your call notes, so you review instead of write.' },
    { id: 'copy-paste', label: 'Copy-paste data', persona: 'meher', branch: 'workflow-automation', fix: 'Your apps are connected so data moves on its own and nobody retypes it.' },
  ],
  stats: [
    {
      value: '7x',
      label: 'more likely to qualify a lead when you reply within an hour',
      source: { name: 'Harvard Business Review', year: 2011, url: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads' },
    },
    {
      value: '43%',
      label: 'of US B2B invoice value is paid late',
      // TODO(owner): unverified — Atradius 2025 US report page not reachable (atradius.us 2025 URL 404s) and 43% not confirmed; verify in the PDF before publish
      placeholder: true,
      source: { name: 'Atradius Payment Practices Barometer', year: 2025, url: 'https://group.atradius.com/knowledge-and-research/reports' },
    },
    {
      value: '56%',
      label: 'of US small businesses are owed money, about $17.5k on average',
      source: { name: 'Intuit QuickBooks Small Business Late Payments Report', year: 2025, url: 'https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2025/' },
    },
    { value: '11 hrs', label: 'Saved per week at Simpli Home by automating bulk media generation' },
  ],
  steps: [
    { title: 'Talk', body: 'A 20-minute call. You tell us what eats your week.' },
    { title: 'Map', body: 'We write down the steps, the tools and who approves what. You sign off.' },
    { title: 'Build', body: 'We build your automation and test it on your real cases.' },
    { title: 'Run', body: 'It runs in your accounts. You own it. We watch it and fix what breaks.' },
  ],
  trust: [
    'GDPR and CCPA ready. Your data stays in your accounts.',
    'Calling follows TCPA rules, with consent captured first.',
    'Our AI agents always say they are AI.',
    'A human approves sensitive actions, like payments and contracts.',
    'You own every workflow we build.',
  ],
  proof: [
    { client: 'Simpli Home', result: 'Saved about 11 hours a week by automating bulk media generation in Figma Buzz.' },
    // TODO(owner): real SBP result and permission
    { client: 'SBP', result: 'Placeholder: result to come from owner.', placeholder: true },
    // TODO(owner): real Blancora result and permission
    { client: 'Blancora', result: 'Placeholder: result to come from owner.', placeholder: true },
  ],
  faqs: [
    {
      q: 'How much does AI automation cost?',
      a: 'It depends on scope: how many tools we connect, how many processes, and whether calls or chats are involved. A single flow is a smaller job than a full sales and finance setup. We quote one number after a [20-minute call](/contact). Tool subscriptions are separate.',
    },
    {
      q: 'How long does it take to build an AI automation?',
      a: 'Most projects go live in about 14 days. Single flows like [offer letter automation](/services/ai-automations/hr-automation/offer-letter-automation) take about a week. Bigger setups with many tools take longer. You get a date after the mapping step.',
    },
    {
      q: 'What tools does AI automation work with?',
      a: 'Most tools you already use: Gmail, Google Workspace, Slack, WhatsApp, HubSpot, Salesforce, QuickBooks, Stripe and Notion. If a tool has an API or connector, we can plug it in. See [workflow automation](/services/ai-automations/workflow-automation).',
    },
    {
      q: 'Do I need a tech team to use AI automation?',
      a: 'No. You message your automations in plain words, like a group chat. We build, test and monitor everything. You do not write code or touch settings.',
    },
    {
      q: 'Is my business data safe with AI automation?',
      a: 'Yes. Workflows run in your own accounts, so your data is not copied into ours. We follow GDPR and CCPA, use least-access permissions and keep sensitive steps behind human approval. You can revoke access any time.',
    },
    {
      q: 'Can AI talk to my customers?',
      a: 'Yes, on [calls](/services/ai-automations/ai-voice-agents), [WhatsApp and chat](/services/ai-automations/whatsapp-automation). It always says it is AI. Under the FCC\'s 2024 ruling, AI voices are "artificial" under the TCPA, so calls need consent. It hands off to a person when a case gets tricky.',
    },
    {
      q: 'What happens if the automation breaks?',
      a: 'We get alerted on failures, and risky steps pause and ask a human. Most fixes land before you notice. If an app changes its API, we update the workflow.',
    },
    {
      q: 'Who owns the automations, and what is not included?',
      a: 'You do. Everything runs in your accounts, with no lock-in. Not included: legal advice, payroll decisions, fake reviews, and calls or messages to people who have not opted in.',
    },
  ],
}
