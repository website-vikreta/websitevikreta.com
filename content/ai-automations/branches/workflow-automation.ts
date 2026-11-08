import type { Branch } from '@/content/ai-automations/types'

const HBR = { name: 'Harvard Business Review, The Short Life of Online Sales Leads', year: 2011, url: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads' }
const MCK = {
  name: 'McKinsey, The economic potential of generative AI',
  year: 2023,
  url: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier',
}

export const branch: Branch = {
  slug: 'workflow-automation',
  name: 'Workflow Automation',
  navLabel: 'Workflows',
  persona: 'meher',
  title: 'AI Workflow Automation for Small Business | Website Vikreta',
  description:
    'Stop copy and paste. We connect your CRM, inbox, forms and docs so work moves on its own, with AI teammates you brief in plain English. Live in about 14 days.',
  h1: ['Your apps,', 'finally talking.'],
  usp: 'Your apps wired together. Data moves on its own.',
  heroSub: 'Form to HubSpot to Slack to Gmail. Built in your accounts, no retyping.',
  scenarios: [
    // TODO(owner): real photo
    { industry: 'Online store', photo: 'https://images.unsplash.com/photo-1783115259399-3a5a3e0e4592?w=1200&q=70&auto=format&fit=crop', alt: 'Hands typing on a laptop showing a spreadsheet', line: 'Tuesday: 40 new orders copied into the sheet automatically. Nobody typed.' },
    // TODO(owner): real photo
    { industry: 'Accounting firm', photo: 'https://images.unsplash.com/photo-1735825764485-93a381fd5779?w=1200&q=70&auto=format&fit=crop', alt: 'Person at a desk with a laptop and invoice papers', line: 'Client invoices read, coded and filed by [document data extraction](/services/ai-automations/workflow-automation/document-data-extraction). Month-end took one afternoon.' },
    // TODO(owner): real photo
    { industry: 'Agency', photo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=70&auto=format&fit=crop', alt: 'Man presenting to a team seated at laptops', line: 'New lead in HubSpot, ping in Slack, intro email sent in eleven seconds with [speed to lead](/services/ai-automations/workflow-automation/speed-to-lead).' },
  ],
  shifts: [
    { before: 'Retyping leads into the CRM', after: 'Lead lands in HubSpot, tagged' },
    { before: 'Invoice data typed from PDFs', after: 'Fields read and filed automatically' },
    { before: 'Weekly report built by hand', after: 'Report in Slack every Monday' },
  ],
  // TODO(owner): youtubeId once recorded
  video: { title: 'Watch us connect five apps (60s)', poster: '/wv/personas/meher-front.webp' },
  tools: ['make', 'n8n', 'hubspot', 'slack', 'gmail', 'googlesheets', 'airtable', 'notion', 'quickbooks', 'zoho'],
  clients: ['simpli-home', 'blancora', 'sustainable-bitcoin-protocol'],
  pairsWith: ['hr-automation', 'proposal-automation'],
  reading: ['/blog/ai-and-automation/make-vs-n8n-vs-custom-code', '/blog/ai-and-automation/mcp-explained-direct-ai-tool-integration'],
  lead: 'We connect your CRM, inbox, forms and docs so work moves on its own. Then add AI teammates you message like people.',
  answerQ: 'What is workflow automation?',
  answer:
    'Workflow automation connects the tools you already use so a task in one starts the next step in another. A form fills the CRM, a PDF becomes clean data, a new lead gets a reply in seconds. AI adds the reading and writing. You stay in charge of every decision that matters. Start with [CRM automation](/services/ai-automations/workflow-automation/crm-automation), [document data extraction](/services/ai-automations/workflow-automation/document-data-extraction) or an [AI teammate](/services/ai-automations/workflow-automation/ai-teammates).',
  demo: {
    kind: 'flow',
    title: 'A lead comes in, and everything follows',
    nodes: [
      { id: 'form', label: 'Form submitted', app: 'Website' },
      { id: 'crm', label: 'Contact and deal created', app: 'HubSpot' },
      { id: 'ai', label: 'AI reads and scores the lead', app: 'OpenAI' },
      { id: 'slack', label: 'Team alerted', app: 'Slack' },
      { id: 'mail', label: 'Reply drafted for approval', app: 'Gmail' },
    ],
    edges: [
      ['form', 'crm'],
      ['crm', 'ai'],
      ['ai', 'slack'],
      ['ai', 'mail'],
    ],
  },
  stats: [
    {
      value: '7x',
      label: 'More likely to qualify a lead when you reply within an hour.',
      source: HBR,
    },
    {
      value: '60-70%',
      label: 'Of employee time is in work generative AI could automate.',
      source: MCK,
    },
    // TODO(owner): confirm figure and source before publish
    { value: '5-10 hrs', label: 'Back per founder, per week', placeholder: true },
  ],
  steps: [
    { title: 'Call', body: 'You show us the work that eats your week. We pick the one or two flows that pay back first.' },
    { title: 'Map', body: 'We draw the flow in plain words: what starts it, what happens, who approves.' },
    { title: 'Build', body: 'We build it in your accounts and test it with real data before it goes live.' },
    { title: 'Run', body: 'We watch it, fix breaks and add the next flow when you are ready.' },
  ],
  integrations: ['Make', 'n8n', 'HubSpot', 'Zoho', 'Google Workspace', 'Slack', 'Airtable', 'Notion', 'OpenAI', 'Claude'],
  industries: ['Agencies', 'B2B companies', 'Ecommerce and D2C', 'Edtech', 'Finance firms', 'HR & recruiting agencies'],
  compliance:
    'Customer and lead data stays in your own accounts, handled under GDPR, UK GDPR and CCPA. AI drafts and sorts. A person approves anything sensitive. You own every workflow and can leave anytime. Last reviewed November 2026.',
  proof: {
    client: 'Simpli Home',
    result: 'Cut a weekly manual task from 20 hours to 1.',
  },
  faqs: [
    {
      q: 'How much does AI automation cost for a small business?',
      a: 'It depends on how many tools we connect, how many steps the process has, how much AI reading or writing it needs and how it handles errors. CRM connections are the usual driver. We quote one number after a [short call](/contact). Tool subscriptions are separate.',
    },
    {
      q: 'How long does setup take?',
      a: 'A form to CRM to Slack flow takes about a week. [CRM automation](/services/ai-automations/workflow-automation/crm-automation) and document extraction take about 10 days. An AI teammate or knowledge base takes about 14. Custom agents take about 3 weeks.',
    },
    {
      q: 'Do I need to change my tools?',
      a: 'No. We connect what you have, such as HubSpot, Zoho, Google Workspace, Slack, Airtable or Notion. If a tool has no API or connector, we say so up front.',
    },
    {
      q: 'Who owns the automations?',
      a: 'You do. Everything runs in your accounts, under your logins. If you stop working with us, the workflows stay with you, documented. No lock-in.',
    },
    {
      q: 'Zapier, Make, n8n or a custom build?',
      a: 'Make and n8n suit most small teams: more control, lower cost at volume. Zapier is simple but gets pricey. Custom code is for odd cases. We pick by volume and tools. See [Make vs n8n vs custom code](/blog/ai-and-automation/make-vs-n8n-vs-custom-code).',
    },
    {
      q: 'What cannot be automated?',
      a: 'Judgment calls, sensitive replies and anything with unclear rules. Payments, contracts and legal answers wait for a person to approve. If a person would hesitate, the automation pauses. See [human oversight in automation](/blog/ai-and-automation/establishing-human-oversight-automation).',
    },
    {
      q: 'Is my data safe?',
      a: 'It stays in your accounts, and AI only sees the fields it needs. We follow GDPR and CCPA, use least-access permissions and keep a run log of every step. You can revoke access any time.',
    },
    {
      q: 'What happens if a step fails?',
      a: 'We get an alert, and the run pauses instead of sending bad data. Most fixes land before you notice. If an app changes its API, we update the flow. We do the monitoring that a plain Zapier subscription does not.',
    },
  ],
  products: [
    {
      slug: 'crm-automation',
      name: 'CRM automation',
      keyword: 'CRM automation for small business',
      oneLiner: 'Leads, notes and next steps land in your CRM on their own.',
      answer:
        'CRM automation fills and updates your CRM without anyone typing. New leads become contacts, calls and emails are logged, deals move stages, and quiet deals get a nudge. Your pipeline stays true, so you spend time selling, not editing records.',
      persona: 'meher',
      channels: ['Email', 'Slack', 'Web chat'],
      // TODO(owner): replace with measured value
      kpi: { value: '[N] hrs', label: 'Data entry removed per rep, per week', placeholder: true },
      timeToLive: 'Live in ~10 days', // TODO(owner): confirm
      includes: [
        'Form, email and chat leads sent to HubSpot or Zoho',
        'Duplicate check before a record is made',
        'Deal stages updated from real activity',
        'Alerts in Slack for hot leads and quiet deals',
        'Weekly clean-up of stale records',
      ],
      excludes: [
        'Moving to a new CRM (a separate project)',
        'Writing your sales process for you',
        'Cold outreach lists',
      ],
      // TODO(owner): replace placeholder case study with a real client result
      caseStudy: {
        client: 'sbp',
        title: 'Leads in the CRM in seconds',
        problem: 'Form leads were copied into the CRM by hand, often a day late.',
        built: 'Forms, inbox and CRM connected: record created, owner assigned, Slack alert sent.',
        result: 'Sample: new lead in the CRM in under 15 seconds.',
        placeholder: true,
      },
      reading: ['/blog/ai-and-automation/make-vs-n8n-vs-custom-code'],
      page: {
        title: 'CRM Automation for Small Business | Website Vikreta',
        description:
          'CRM automation that logs leads, calls and next steps for you. Works with HubSpot, Zoho, Slack and Gmail. Built in your accounts, live in days.',
        h1: ['CRM', 'automation'],
        heroSub: 'Every lead lands in your CRM, tagged and assigned. Nobody retypes anything.',
        demo: {
          kind: 'flow',
          title: 'Form to CRM to follow-up',
          nodes: [
            { id: 'form', label: 'Lead fills your form', app: 'Website' },
            { id: 'dup', label: 'Duplicate check', app: 'Make' },
            { id: 'crm', label: 'Contact and deal created', app: 'HubSpot' },
            { id: 'slack', label: 'Owner pinged', app: 'Slack' },
            { id: 'mail', label: 'Follow-up drafted', app: 'Gmail' },
          ],
          edges: [
            ['form', 'dup'],
            ['dup', 'crm'],
            ['crm', 'slack'],
            ['crm', 'mail'],
          ],
        },
        steps: [
          { title: 'Capture', body: 'Every lead source feeds one place: forms, email, chat and calls.' },
          { title: 'Clean', body: 'We check for duplicates and fill missing fields before saving.' },
          { title: 'Update', body: 'Deals move stage when something real happens, not when someone remembers.' },
          { title: 'Nudge', body: 'Your team gets a Slack alert for hot leads and deals gone quiet.' },
        ],
        faqs: [
          {
            q: 'What is CRM automation?',
            a: 'It is software that creates and updates CRM records for you. Leads, emails and calls get logged, deals change stage, and reminders fire. Nobody has to type it in, so your pipeline stays accurate.',
          },
          {
            q: 'Does CRM automation work with HubSpot and Zoho?',
            a: 'Yes. We build on HubSpot and Zoho through Make or n8n, and connect Gmail, Slack and your forms. If you use another CRM, we check its connection on the first call.',
          },
          {
            q: 'Can AI write follow-up emails in the CRM?',
            a: 'Yes. AI drafts the follow-up from the deal notes and your past emails. You approve it, or let routine ones go out on their own once you trust them.',
          },
          {
            q: 'Will it create duplicate contacts?',
            a: 'No, we check by email and company before creating a record. Existing duplicates can be cleaned in a one-time pass.',
          },
          {
            q: 'How do I keep my CRM clean without a full-time admin?',
            a: 'Automate the entry and the weekly clean-up. Records fill from real activity, stale ones get flagged, and a short report lands in Slack. We run this loop for you.',
          },
        ],
        related: ['workflow-automation/speed-to-lead', 'workflow-automation/ai-teammates', 'whatsapp-automation/whatsapp-lead-follow-up'],
      },
    },
    {
      slug: 'document-data-extraction',
      name: 'Document data extraction',
      keyword: 'document data extraction AI',
      oneLiner: 'Read invoices, forms and PDFs. Send clean data where it belongs.',
      answer:
        'Document data extraction uses AI to read PDFs, scans, invoices and forms and pull out the fields you need, like names, dates and totals. The data lands in a sheet, CRM or accounting tool. Anything unclear is flagged for a person to check before it moves on.',
      persona: 'meher',
      channels: ['Email', 'Slack'],
      // TODO(owner): replace with measured value
      kpi: { value: '[N]%', label: 'Documents processed with no typing', placeholder: true },
      timeToLive: 'Live in ~10 days', // TODO(owner): confirm
      includes: [
        'Documents picked up from email or a shared folder',
        'AI reads the fields you choose',
        'Data sent to Google Sheets, Airtable or your CRM',
        'Low-confidence items flagged for review',
        'Original file saved next to the data',
      ],
      excludes: [
        'Handwriting that is hard for a person to read',
        'Legal or medical document review',
        'Approving payments',
      ],
      // TODO(owner): replace placeholder case study with a real client result
      caseStudy: {
        client: 'blancora',
        title: 'Month-end data entry, gone',
        problem: 'Invoices and forms were retyped into spreadsheets at month end.',
        built: 'AI reads each PDF, checks required fields and writes clean rows to the sheet.',
        result: 'Sample: month-end data entry cut from days to hours.',
        placeholder: true,
      },
      reading: ['/blog/educational/ai-agent-api-security'],
      page: {
        title: 'Document Data Extraction with AI | Website Vikreta',
        description:
          'Document data extraction with AI: read invoices, forms and PDFs, send clean data to your sheet or CRM. Doubtful items go to a person. Built in your tools.',
        h1: ['Document data', 'extraction'],
        heroSub: 'Invoices and forms get read, checked and filed into your sheet or CRM.',
        demo: {
          kind: 'doc',
          title: 'An invoice, read in seconds',
          docTitle: 'Supplier invoice (PDF)',
          fields: [
            { label: 'Vendor', value: 'Northline Supplies' },
            { label: 'Invoice no.', value: 'INV-20418' },
            { label: 'Date', value: 'Nov 3' },
            { label: 'Due', value: 'Dec 3' },
            { label: 'Total', value: '$1,284.00' },
          ],
          status: ['File received', 'Fields read', 'Checked against rules', 'Saved to your sheet'],
        },
        steps: [
          { title: 'Files arrive', body: 'Email attachments or folder uploads trigger the flow.' },
          { title: 'AI reads', body: 'It pulls the fields you picked and scores how sure it is.' },
          { title: 'Rules check', body: 'Totals, dates and duplicates are tested. Odd ones go to a person.' },
          { title: 'Data lands', body: 'Clean rows appear in your sheet, CRM or accounting tool.' },
        ],
        faqs: [
          {
            q: 'What is document data extraction?',
            a: 'It is using AI to read documents like invoices, forms and PDFs and turn them into structured data. You get fields such as vendor, date and total in a sheet or CRM, with no typing.',
          },
          {
            q: 'How accurate is AI data extraction?',
            a: 'Good on clean, typed documents; weaker on messy scans. We test on your real files, set rules for totals and dates, and send low-confidence items to a person. We will tell you the real error rate.',
          },
          {
            q: 'Can it read scanned PDFs and photos?',
            a: 'Yes, if the text is legible. Blurry photos and handwriting are less reliable, so those get flagged for a quick check.',
          },
          {
            q: 'Where does the extracted data go?',
            a: 'Google Sheets, Airtable, Notion, your CRM or accounting tool. We connect to the system you already use.',
          },
          {
            q: 'Is it safe to send documents to AI?',
            a: 'We only send what is needed, use business API terms that do not train on your data, and keep files in your own storage. Sensitive documents can use a stricter setup.',
          },
        ],
        related: ['finance-automation/receipt-and-expense-extraction', 'finance-automation/invoice-automation', 'workflow-automation/reporting-dashboards'],
      },
    },
    {
      slug: 'ai-teammates',
      name: 'AI teammates',
      keyword: 'AI teammates for business',
      oneLiner: 'Your own AI assistants in your team chat.',
      answer:
        'AI teammates are agents that live in your Slack, WhatsApp or Teams group. You brief them in plain English, like "send the offer to Neel" or "summarize this week\'s leads". They do the work and reply with the result. We run Website Vikreta this way.',
      persona: 'meher',
      channels: ['Slack', 'WhatsApp', 'Teams'],
      // TODO(owner): replace with measured value
      kpi: { value: '[N]', label: 'Team requests handled by AI each week', placeholder: true },
      timeToLive: 'Live in ~14 days', // TODO(owner): confirm
      includes: [
        'One or more AI teammates in your team chat',
        'A job and a name for each, such as HR, content or sales',
        'Connected to the tools they need, in your accounts',
        'Approval step on anything sensitive',
        'A short playbook so your team knows what to ask',
      ],
      excludes: [
        'Replacing your people or their decisions',
        'Acting on tools we cannot connect to',
        'Unlimited custom jobs (new jobs are scoped)',
      ],
      // TODO(owner): replace placeholder case study with a real client result
      caseStudy: {
        client: 'simpli-home',
        title: 'One teammate for routine requests',
        problem: 'Routine ops requests lived in one person\'s inbox and spreadsheets.',
        built: 'It takes requests in Slack, runs the workflows and reports back in the thread.',
        result: 'Sample: routine requests handled with nobody retyping.',
        placeholder: true,
      },
      reading: ['/blog/ai-and-automation/mcp-explained-direct-ai-tool-integration', '/blog/ai-and-automation/establishing-human-oversight-automation'],
      page: {
        title: 'AI Teammates in Slack and WhatsApp | Website Vikreta',
        description:
          'AI teammates you brief in plain English, inside your Slack, WhatsApp or Teams group. We run our own company this way. Built in your accounts, live in ~14 days.',
        h1: ['Your own', 'AI assistant'],
        heroSub: 'A named teammate in your Slack that does real work. Built in your accounts.',
        demo: {
          kind: 'chat',
          channel: 'team',
          title: 'Our team chat, on a Tuesday',
          messages: [
            { from: 'Shubham', text: 'Meher, offer letter for Neel. Frontend Developer, starts Dec 1.' },
            { from: 'meher', text: 'Done. Draft is ready for your approval.', attachment: { kind: 'pdf', label: 'Offer letter - Neel Shah', meta: 'Waiting for approval' } },
            { from: 'Shubham', text: 'Approved. Send it.' },
            { from: 'meher', text: 'Sent for e-sign. I will remind him in 2 days if it is still open.' },
          ],
        },
        steps: [
          { title: 'Pick the jobs', body: 'We choose the 3 to 5 tasks you want off your plate first.' },
          { title: 'Name the teammate', body: 'Each gets a name, a role and a clear list of what it may do.' },
          { title: 'Add to your chat', body: 'We put them in your Slack, WhatsApp or Teams group and connect your tools.' },
          { title: 'Brief them', body: 'You ask in plain English. They reply with the result or one question.' },
        ],
        faqs: [
          {
            q: 'What is an AI teammate?',
            a: 'An AI teammate is an agent that sits in your team chat and does tasks when you ask, like drafting a document, updating a CRM or posting a summary. You talk to it like a coworker. It is always labeled as AI.',
          },
          {
            q: 'How is this different from ChatGPT?',
            a: 'ChatGPT answers questions. An AI teammate does work in your tools: it fills the offer letter, updates the deal, sends the message. It is connected to your accounts and follows your rules.',
          },
          {
            q: 'Can an AI teammate work in Slack or WhatsApp?',
            a: 'Yes. We set teammates up in Slack, WhatsApp and Teams groups. People message them in the same thread they already use.',
          },
          {
            q: 'Can it do things without asking me?',
            a: 'Only what you allow. Routine tasks can run on their own. Anything sensitive, such as sending an offer or spending money, waits for a person to approve.',
          },
          {
            q: 'Do you really run your company with AI teammates?',
            a: 'Yes. Our team chat has four people and our AI teammates. We ask for offer letters, content and sales updates in chat. We build yours the same way.',
          },
          {
            q: 'Who owns the AI teammate?',
            a: 'You do. It runs in your accounts and your workflows are yours. If you leave, you keep everything.',
          },
        ],
        related: ['hr-automation/offer-letter-automation', 'workflow-automation/custom-ai-agents', 'workflow-automation/crm-automation'],
      },
    },
    {
      slug: 'speed-to-lead',
      name: 'Speed to lead',
      keyword: 'speed to lead automation',
      oneLiner: 'Every new lead gets a reply in under a minute.',
      answer:
        'Speed to lead means answering a new inquiry within about a minute. When a form, ad or email arrives, the system replies, asks one useful question and alerts your team. HBR research found a reply inside an hour made a lead about seven times likelier to qualify.',
      persona: 'meher',
      channels: ['Email', 'SMS', 'WhatsApp', 'Slack'],
      // TODO(owner): replace with measured value
      kpi: { value: '< 60 sec', label: 'First reply to a new lead', placeholder: true },
      timeToLive: 'Live in ~7 days', // TODO(owner): confirm
      includes: [
        'All lead sources connected: forms, ads, email',
        'Instant first reply in your voice',
        'One question to qualify the lead',
        'Hot-lead alert to your team in Slack',
      ],
      excludes: [
        'Buying leads or running ads',
        'Outbound calling (see Voice Agents)',
        'Replying to leads who have not opted in where consent is required',
      ],
    },
    {
      slug: 'email-triage-and-drafting',
      name: 'Email triage and drafting',
      keyword: 'AI email triage',
      oneLiner: 'Inbox sorted, drafts ready. You approve and send.',
      answer:
        'Email triage sorts incoming mail by type and urgency, then drafts replies from your past answers. You see what needs you, review the drafts and send. Nothing goes out without your say unless you approve a rule for routine messages.',
      persona: 'meher',
      channels: ['Email', 'Slack'],
      // TODO(owner): replace with measured value
      kpi: { value: '[N] hrs', label: 'Inbox time saved per week', placeholder: true },
      timeToLive: 'Live in ~7 days', // TODO(owner): confirm
      includes: [
        'Labels and priority set in Gmail',
        'Drafts written in your voice',
        'Daily summary of what needs you',
        'Routine replies you pre-approve',
      ],
      excludes: ['Sending sensitive replies on its own', 'Reading mail without your consent', 'Replacing a shared support desk'],
    },
    {
      slug: 'reporting-dashboards',
      name: 'Reporting dashboards',
      keyword: 'automated reporting dashboard',
      oneLiner: 'Weekly numbers pulled together for you, no spreadsheet marathon.',
      answer:
        'Automated reporting pulls numbers from your CRM, ads, sales and finance tools into one dashboard or weekly summary. The numbers refresh on a schedule you set. AI adds a short note on what changed. You read the results instead of building the report each week.',
      persona: 'meher',
      channels: ['Email', 'Slack'],
      // TODO(owner): replace with measured value
      kpi: { value: '[N] hrs', label: 'Reporting time saved per week', placeholder: true },
      timeToLive: 'Live in ~10 days', // TODO(owner): confirm
      includes: [
        'Data pulled from up to 4 of your tools',
        'One dashboard in Google Sheets or Looker Studio',
        'Weekly summary in Slack or email',
        'Plain-English note on what moved',
      ],
      excludes: ['Fixing messy source data', 'Custom BI platform builds', 'Forecasting models'],
    },
    {
      slug: 'custom-ai-agents',
      name: 'Custom AI agents',
      keyword: 'custom AI agent development',
      oneLiner: 'An AI agent built for one job only you do.',
      answer:
        'A custom AI agent is software that does a specific job end to end: read, decide within your rules, act, and report. We build agents with OpenAI or Claude, connect them to your tools and keep a person in the loop for anything risky.',
      persona: 'meher',
      channels: ['Slack', 'Email', 'Web chat'],
      // TODO(owner): replace with measured value
      kpi: { value: '[N] hrs', label: 'Manual work removed per week', placeholder: true },
      timeToLive: 'Live in ~21 days', // TODO(owner): confirm
      includes: [
        'A written spec of the job and its limits',
        'Agent built on OpenAI or Claude APIs',
        'Connected to your tools in your accounts',
        'Test run on real cases before launch',
        'Run log you can read',
      ],
      excludes: ['Open-ended research tasks with no clear rules', 'Acting without approval on high-risk steps', 'Training your own model'],
    },
    {
      slug: 'knowledge-base-assistant',
      name: 'Knowledge base assistant',
      keyword: 'internal knowledge base AI assistant',
      oneLiner: 'Your team asks a question. It answers from your own docs.',
      answer:
        'A knowledge base assistant answers questions from your own documents, such as policies, playbooks and past projects. Your team asks in Slack and gets an answer with the source. If the answer is not in your docs, it says so.',
      persona: 'meher',
      channels: ['Slack', 'Web chat'],
      // TODO(owner): replace with measured value
      kpi: { value: '[N]', label: 'Team questions answered without interrupting someone', placeholder: true },
      timeToLive: 'Live in ~14 days', // TODO(owner): confirm
      includes: [
        'Your docs from Google Drive or Notion indexed',
        'Answers with a link to the source',
        '"Not in the docs" reply instead of a guess',
        'Update flow when documents change',
      ],
      excludes: ['Writing your documentation', 'Access beyond what each person may see', 'Answers outside your own docs'],
    },
  ],
}
