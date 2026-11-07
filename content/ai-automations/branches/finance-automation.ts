import type { Branch } from '@/content/ai-automations/types'

export const branch: Branch = {
  slug: 'finance-automation',
  name: 'Finance Automation',
  navLabel: 'Finance',
  persona: 'arjun',
  title: 'Finance Automation for Small Business | Website Vikreta',
  description:
    'Send invoices on time, chase late payers and keep your books tidy. We run it in QuickBooks or Xero. You approve any payment.',
  h1: ['Get paid', 'without chasing.'],
  usp: 'Invoices and reminders go out until paid. You approve every payment.',
  heroSub: 'Invoices out on time, polite reminders on schedule. You approve payments and write-offs.',
  scenarios: [
    // TODO(owner): real photo
    { industry: 'Clinics', photo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=70&auto=format&fit=crop', alt: 'A modern dental office with a chair and equipment', line: 'A clinic\'s overdue invoices get a polite nudge on day 7, then day 14, through [payment reminder automation](/services/ai-automations/finance-automation/payment-reminder-automation).' },
    // TODO(owner): real photo
    { industry: 'Agencies', photo: 'https://images.unsplash.com/photo-1629184510982-cf91280c1d53?w=1200&q=70&auto=format&fit=crop', alt: 'A person using a laptop at a wooden table', line: 'An agency sends 30 client invoices on the 1st without opening QuickBooks.' },
    // TODO(owner): real photo
    { industry: 'Restaurants and catering', photo: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=1200&q=70&auto=format&fit=crop', alt: 'A barista using a tablet at a coffee shop counter', line: 'A caterer\'s deposit invoice goes out the hour the booking confirms.' },
  ],
  shifts: [
    { before: 'Invoices sent when you remember', after: 'Sent the day work ends' },
    { before: 'Awkward check-in emails', after: 'Reminders sent for you' },
    { before: 'Month-end number hunt', after: 'Outstanding total, always live' },
  ],
  // TODO(owner): youtubeId once recorded
  video: { title: 'Watch us collect an invoice (60s)', poster: '/wv/personas/arjun-three-quarter.webp' },
  tools: ['quickbooks', 'xero', 'stripe', 'zoho', 'googlesheets', 'gmail', 'slack'],
  clients: ['ap-cleanco', 'carelift', 'smart-physio-plus'],
  pairsWith: ['proposal-automation', 'workflow-automation'],
  reading: ['/blog/business-growth/ai-automation-roi', '/blog/educational/ai-agent-api-security'],
  lead: 'Your automation sends the invoice, nudges late payers and pulls the numbers. You approve every payment and write-off.',
  answerQ: 'What is finance automation?',
  answer:
    'Finance automation uses software to do routine money tasks: send invoices, remind late payers, read receipts and build reports. It runs inside your accounting tool, like QuickBooks or Xero. A person approves any payment or write-off. We are not accountants, and we give no tax advice. See [invoice automation](/services/ai-automations/finance-automation/invoice-automation) and [payment reminder automation](/services/ai-automations/finance-automation/payment-reminder-automation).',
  demo: {
    kind: 'timeline',
    title: 'One invoice, start to paid',
    events: [
      { at: 'Day 0', label: 'Job done. Invoice sent in 5 minutes.', state: 'done' },
      { at: 'Due date', label: 'Invoice is due. No payment yet.', state: 'pending' },
      { at: '+3 days', label: 'Friendly nudge by email.', state: 'pending' },
      { at: '+7 days', label: 'Second nudge. You get a Slack alert.', state: 'pending' },
      { at: 'Paid', label: 'Payment lands. Books update on their own.', state: 'paid' },
    ],
  },
  stats: [
    {
      value: '43%',
      label: 'of B2B invoice value in the US was paid late',
      // TODO(owner): unverified — Atradius 2025 US report page not reachable (atradius.us 2025 URL 404s) and 43% not confirmed; verify in the PDF before publish
      placeholder: true,
      source: { name: 'Atradius Payment Practices Barometer, US', year: 2025, url: 'https://atradius.us/knowledge-and-research/reports' },
    },
    {
      value: '56%',
      label: 'of US small businesses are owed money from unpaid invoices, about $17.5k on average',
      source: { name: 'Intuit QuickBooks Small Business Late Payments Report', year: 2025, url: 'https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2025/' },
    },
    { value: '5 min', label: 'from job done to invoice sent', placeholder: true },
  ],
  steps: [
    { title: 'Map how you bill', body: 'We learn your jobs, rates, terms and who pays late.' },
    { title: 'Connect your books', body: 'We link QuickBooks, Xero or Zoho Books. Read-only bank access where possible.' },
    { title: 'Build and test', body: 'We run it on a few real invoices first, with you watching.' },
    { title: 'You stay in charge', body: 'Nothing is paid or written off until you approve it.' },
  ],
  integrations: ['QuickBooks', 'Xero', 'Stripe', 'Zoho Books', 'Google Sheets', 'Gmail'],
  industries: ['Agencies', 'B2B services', 'Finance firms', 'Recruiting agencies', 'Clinics'],
  compliance:
    'Read-only bank access where possible. A person on your team approves every payment and write-off. Your data stays in your accounting tool. We are not accountants, we do not give tax advice, and we do not file taxes.',
  proof: { client: 'Website Vikreta', result: 'We run invoice generation in Make for our own client billing today.' },
  faqs: [
    {
      q: 'How to automate invoice reminders?',
      a: 'Set rules in your accounting tool or a workflow tool: nudge a few days after the due date, again a few days later, and stop when paid. Keep the tone polite. We build it and test it on your real invoices first.',
    },
    {
      q: 'What do QuickBooks reminders do, and what do you add?',
      a: 'QuickBooks sends up to 3 reminders, by email only, and only for invoices you already emailed. We add WhatsApp or SMS nudges where the client has consented, escalation to you, promised-date tracking and a weekly receivables summary.',
    },
    {
      q: 'What is accounts receivable automation for small business?',
      a: 'It is software that sends invoices, tracks who owes you, and reminds late payers for you. It saves the weekly chase. It works with QuickBooks, Xero and similar tools, so your books stay the source of truth.',
    },
    {
      q: 'Can I automate invoicing in QuickBooks?',
      a: 'Yes. QuickBooks has recurring invoices, and a workflow tool can create one when a job closes. We connect the two, check the amounts, and send the invoice from your account.',
    },
    {
      q: 'Is it safe to give AI access to my accounting data?',
      a: 'It can be, with limits. We ask for read-only bank access where possible. Data stays in your accounting tool. Any payment or write-off needs your approval. You can revoke access at any time.',
    },
    {
      q: 'Will automated payment reminders annoy my clients?',
      a: 'Not if they are short, polite and timed well. We write them in your voice and set the pace. Long-time clients can get a softer track. You can pause any client with one message.',
    },
    {
      q: 'Can AI pull data from receipts and bills?',
      a: 'Yes. It reads the vendor, date, amount and tax line, then suggests a category. A person reviews anything unclear. It saves typing, but it does not replace your bookkeeper or accountant.',
    },
    {
      q: 'Do you replace my accountant or bookkeeper?',
      a: 'No. We are not accountants. We remove the routine tasks, like sending invoices and reminders. Your accountant still owns tax, filings and advice. Many accountants like the cleaner data.',
    },
    {
      q: 'How long does finance automation take to set up?',
      a: 'Invoice flows often go live in about a week. Reminders take a few more days to tune. Timing depends on your accounting tool, how many invoice types you have, and how fast you can approve the first drafts.',
    },
    {
      q: 'What affects the cost of finance automation?',
      a: 'Scope: how many invoice types you have, which accounting tools connect, how many reminder tracks you want, and whether you add receipts or reports. See [AI automation ROI](/blog/business-growth/ai-automation-roi), then [book a call](/contact).',
    },
  ],
  products: [
    {
      slug: 'invoice-automation',
      name: 'Invoice automation',
      keyword: 'invoice automation',
      oneLiner: 'Job done, invoice sent. No retyping.',
      answer:
        'Invoice automation creates and sends an invoice when a job closes, a deal is won or a milestone is hit. It pulls client, rate and terms from your data, then posts to QuickBooks or Xero. We run invoice generation in Make for our own work today.',
      persona: 'arjun',
      channels: ['Email'],
      kpi: { value: '5 min', label: 'from job done to invoice sent', placeholder: true }, // TODO(owner): confirm real timing
      timeToLive: 'Live in ~7 days',
      caseStudy: {
        client: 'ap-cleanco',
        title: 'AP Cleanco: invoices sent the day the job ends',
        problem: 'Invoices went out days late, whenever someone found the time.',
        built: 'Invoices built from closed jobs and posted to the accounting tool.',
        result: 'Invoice sent [N] minutes after the job closes.',
        placeholder: true,
      }, // TODO(owner): confirm client and real result
      reading: ['/blog/business-growth/ai-automation-roi', '/blog/ai-and-automation/ai-automation-connecting-tools'],
      includes: [
        'Invoice created from a deal, form or sheet row',
        'Your logo, terms and numbering',
        'Posted to QuickBooks, Xero or Zoho Books',
        'Sent by email with a pay link',
        'Review step for large or new clients',
      ],
      excludes: [
        'We do not set your rates or tax rules',
        'No tax advice',
        'Does not approve payments',
      ],
      page: {
        title: 'Invoice Automation for Small Business | Website Vikreta',
        description:
          'Invoice automation that creates and sends invoices when a job closes, inside QuickBooks, Xero or Zoho Books. We run it ourselves in Make. Built for you.',
        h1: ['Invoice automation', 'that just runs.'],
        heroSub: 'Invoices created from closed jobs and sent from your QuickBooks or Xero.',
        demo: {
          kind: 'doc',
          title: 'An invoice builds itself',
          docTitle: 'Invoice #1042',
          fields: [
            { label: 'Client', value: 'Northwind Logistics' },
            { label: 'Work', value: 'Dispatch dashboard, milestone 2 of 3' },
            { label: 'Terms', value: 'Net 15' },
            { label: 'Send to', value: 'accounts@northwind.example' },
            { label: 'Books', value: 'Posted to QuickBooks' },
          ],
          status: ['Job marked done', 'Invoice drafted', 'Posted to your books', 'Sent with pay link'],
        },
        steps: [
          { title: 'Trigger', body: 'A job closes, a deal is won or a milestone is hit.' },
          { title: 'Build', body: 'Client, work, rate and terms fill in from your data.' },
          { title: 'Check', body: 'New or large invoices wait for your quick approval.' },
          { title: 'Send and record', body: 'The invoice emails out and posts to your books.' },
        ],
        faqs: [
          {
            q: 'How to automate invoice generation?',
            a: 'Pick the trigger, like a closed job or won deal. A workflow tool then fills an invoice from your data and posts it to your accounting tool. We build this in Make, the same way we bill our own clients.',
          },
          {
            q: 'Which accounting tools does invoice automation work with?',
            a: 'QuickBooks, Xero, Zoho Books and Stripe invoicing, plus Google Sheets for simple setups. If you use something else, ask. Most tools with an API or a Make connector can work.',
          },
          {
            q: 'Can invoice automation handle different rates and clients?',
            a: 'Yes. We store rates and terms per client or per service. The flow picks the right ones each time. New clients can go through a quick review first so nothing odd goes out.',
          },
          {
            q: 'Is invoice automation worth it for a few invoices a month?',
            a: 'If you send under ten a month, a recurring invoice in your accounting tool may be enough. It pays off when invoices vary, come from many sources, or slip because someone forgets.',
          },
          {
            q: 'Does it handle sales tax?',
            a: 'It uses the tax settings already in your accounting tool. We do not decide what tax applies and give no tax advice. Confirm tax rules with your accountant.',
          },
        ],
        related: ['finance-automation/payment-reminder-automation', 'workflow-automation/crm-automation'],
      },
    },
    {
      slug: 'payment-reminder-automation',
      name: 'Payment reminder automation',
      keyword: 'automate invoice reminders',
      oneLiner: 'Polite nudges for late invoices, until they are paid.',
      answer:
        'Payment reminder automation checks your open invoices each day. When one is late, it sends a short, polite nudge in your voice, then another a few days later. It stops the moment the invoice is paid. You decide the pace and who gets a softer track.',
      persona: 'arjun',
      channels: ['Email', 'SMS', 'WhatsApp'],
      kpi: { value: '0', label: 'late invoices nobody chased', placeholder: true }, // TODO(owner): set real KPI
      timeToLive: 'Live in ~7 days',
      caseStudy: {
        client: 'carelift',
        title: 'Carelift: late invoices chased without awkward emails',
        problem: 'Staff avoided chasing overdue invoices, so they sat for weeks.',
        built: 'Scheduled reminders in the practice voice, with alerts for large balances.',
        result: 'Average days to pay down from [N] to [N].',
        placeholder: true,
      }, // TODO(owner): confirm client and real result
      reading: ['/blog/business-growth/ai-automation-roi', '/blog/ai-and-automation/establishing-human-oversight-automation'],
      includes: [
        'Daily check of open invoices',
        'Nudges at due, +3 days and +7 days',
        'Your tone, with a softer track for key clients',
        'Stops when payment lands',
        'Weekly list of overdue invoices',
      ],
      excludes: [
        'No collections or legal action',
        'No write-offs without your approval',
        'No SMS or WhatsApp without client consent',
      ],
      page: {
        title: 'Automate Invoice Reminders for Late Payers | Website Vikreta',
        description:
          'Automate invoice reminders that nudge late payers at due, +3 and +7 days and stop when paid. Works with QuickBooks and Xero. You approve any write-off.',
        h1: ['Automate invoice', 'reminders.'],
        heroSub: 'Short, polite reminders on a schedule. They stop the moment you are paid.',
        demo: {
          kind: 'timeline',
          title: 'Nudges that stop when paid',
          events: [
            { at: 'Due date', label: 'Invoice is due. Quiet check.', state: 'done' },
            { at: '+3 days', label: 'Nudge 1: short and friendly.', state: 'done' },
            { at: '+7 days', label: 'Nudge 2: asks for a date. You get an alert.', state: 'pending' },
            { at: 'Paid', label: 'Reminders stop. Invoice marked paid.', state: 'paid' },
          ],
        },
        steps: [
          { title: 'Read your open invoices', body: 'We sync with QuickBooks, Xero or Zoho Books each day.' },
          { title: 'Nudge on schedule', body: 'Short emails go out at due, +3 and +7 days.' },
          { title: 'Alert you', body: 'Slow or large payers get flagged to you in Slack or email.' },
          { title: 'Stop on payment', body: 'The moment it is paid, reminders end and the books update.' },
        ],
        faqs: [
          {
            q: 'How to automate invoice reminders in QuickBooks or Xero?',
            a: 'Both have basic reminders. For more control, a workflow tool reads open invoices and sends your own message at set days. We connect it, write the messages, and make sure it stops once paid.',
          },
          {
            q: 'How often should I send payment reminders?',
            a: 'A common pattern is on the due date, then three days and seven days after. Keep each message short and clear. We set the pace with you, and you can slow it for key clients.',
          },
          {
            q: 'What should a late payment reminder say?',
            a: 'State the invoice number, amount and due date, add the pay link, and ask for a date. Stay polite. We write drafts in your voice and you approve the wording before launch.',
          },
          {
            q: 'Can I stop reminders for one client?',
            a: 'Yes. Message us or tag the client in your accounting tool, and reminders pause. This is handy when you have already spoken with them or agreed a new date.',
          },
          {
            q: 'Do you handle collections or write-offs?',
            a: 'No. We send reminders and alert you. Any write-off, payment plan or legal step is your call. Nothing is written off without your approval.',
          },
        ],
        related: ['finance-automation/invoice-automation', 'whatsapp-automation/whatsapp-lead-follow-up'],
      },
    },
    {
      slug: 'receipt-and-expense-extraction',
      name: 'Receipt and expense extraction',
      keyword: 'receipt scanning and expense extraction',
      oneLiner: 'Snap a receipt. Vendor, date and amount fill in.',
      answer:
        'Receipt and expense extraction reads receipts and bills from email, photos or PDFs. It pulls the vendor, date, amount and tax line, suggests a category, and adds a draft entry to your books. A person reviews anything unclear. It saves typing, not judgment.',
      persona: 'arjun',
      channels: ['Email', 'Slack'],
      kpi: { value: '0', label: 'receipts typed by hand', placeholder: true }, // TODO(owner): set real KPI
      timeToLive: 'Live in ~10 days',
      includes: [
        'Receipts from email, photo or PDF',
        'Vendor, date, amount and tax fields',
        'Suggested category from your chart of accounts',
        'Draft entry in QuickBooks, Xero or a sheet',
        'Review queue for unclear receipts',
      ],
      excludes: [
        'We are not accountants',
        'No tax advice or deduction rulings',
        'No payments or approvals on your behalf',
      ],
    },
    {
      slug: 'automated-financial-reports',
      name: 'Automated financial reports',
      keyword: 'automated financial reports',
      oneLiner: 'Weekly cash and overdue summaries in your inbox.',
      answer:
        'Automated financial reports pull numbers from your accounting tool on a schedule and send a short summary. You see cash in, what is overdue, and what is coming due. It reads your books and does not change them. Your accountant still owns filings and advice.',
      persona: 'arjun',
      channels: ['Email', 'Slack'],
      kpi: { value: '1 hr', label: 'a week saved on reporting', placeholder: true }, // TODO(owner): confirm real number
      timeToLive: 'Live in ~7 days',
      includes: [
        'Weekly summary by email or Slack',
        'Overdue invoices and who owes what',
        'Cash in and out for the period',
        'Pulled from QuickBooks, Xero or Sheets',
        'Plain-English notes on what changed',
      ],
      excludes: [
        'Not a replacement for your accountant',
        'No tax advice or filings',
        'Read-only: it does not edit your books',
      ],
    },
  ],
}
