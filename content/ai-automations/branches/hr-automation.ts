import type { Branch } from '@/content/ai-automations/types'

const SHRM = { name: 'SHRM Benchmarking', year: 2022, url: 'https://www.shrm.org/content/dam/en/shrm/research/2025-recruiting-benchmarking-report.pdf' }

export const branch: Branch = {
  slug: 'hr-automation',
  name: 'HR Automation',
  navLabel: 'HR',
  persona: 'meher',
  title: 'HR Automation for Small Business | Website Vikreta',
  description:
    'Offer letters, onboarding, NDAs and contracts done by our AI HR agent. A person approves every offer. Built in your accounts, live in about 14 days.',
  h1: ['Type one line.', 'The offer goes out.'],
  usp: 'One line in chat. Offer letter drafted, approved, sent for e-sign.',
  heroSub: 'Your template is filled, a person approves, and it goes out for e-sign.',
  scenarios: [
    // TODO(owner): real photo
    { industry: 'Recruiting firm', photo: 'https://images.unsplash.com/photo-1686771416537-bf4a4f263d88?w=1200&q=70&auto=format&fit=crop', alt: 'A man and a woman sitting across a table at a job interview', line: 'Friday 4 pm: three offers out before the weekend with [offer letter automation](/services/ai-automations/hr-automation/offer-letter-automation). One line each.' },
    // TODO(owner): real photo
    { industry: 'Agency', photo: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=70&auto=format&fit=crop', alt: 'Man signing a document at a desk', line: 'Contractor NDA signed and filed in Drive. Nobody opened a template.' },
    // TODO(owner): real photo
    { industry: 'Growing startup', photo: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=1200&q=70&auto=format&fit=crop', alt: 'Small team in a meeting room', line: 'Monday start: [onboarding automation](/services/ai-automations/hr-automation/employee-onboarding-automation) had accounts, welcome email and week-one plan ready Friday.' },
  ],
  shifts: [
    { before: '45 min per offer letter', after: 'One line in chat' },
    { before: 'Contracts lost in email threads', after: 'Signed copy filed automatically' },
    { before: 'Chasing candidates for signatures', after: 'Reminders go out on their own' },
  ],
  // TODO(owner): youtubeId once recorded
  video: { title: 'Watch us send an offer letter (60s)', poster: '/wv/personas/meher-front.webp' },
  tools: ['make', 'n8n', 'googlesheets', 'gmail', 'slack', 'airtable', 'notion', 'googledrive', 'openai', 'claude'],
  clients: ['simpli-home', 'blancora', 'sustainable-bitcoin-protocol'],
  pairsWith: ['workflow-automation', 'finance-automation'],
  reading: ['/blog/ai-and-automation/ai-strategy-real-world-outcomes', '/blog/ai-and-automation/establishing-human-oversight-automation'],
  lead: 'Offer letters, NDAs, onboarding and completion letters, filled and sent in minutes. A person on your team approves every offer.',
  answerQ: 'What is HR automation?',
  answer:
    'HR automation hands the repeat paperwork of hiring to software. Offer letters, contracts, NDAs, onboarding steps and completion certificates fill themselves from your data and go out on time. People still make the decisions. We automate the typing, sending and chasing. Start with [offer letter automation](/services/ai-automations/hr-automation/offer-letter-automation) or [employee onboarding automation](/services/ai-automations/hr-automation/employee-onboarding-automation).',
  demo: {
    kind: 'doc',
    title: 'Offer letter, filled in seconds',
    docTitle: 'Offer letter',
    fields: [
      { label: 'Candidate', value: 'Neel Shah' },
      { label: 'Role', value: 'Frontend Developer' },
      { label: 'Start date', value: 'Dec 1' },
      { label: 'Type', value: 'Full-time' },
      { label: 'Approved by', value: 'Shubham' },
    ],
    status: ['Filled from your template', 'Approved by a person', 'Sent for e-sign', 'Saved to the candidate folder'],
  },
  stats: [
    // TODO(owner): unverified — SHRM 44 days / $4.7k only found on vendor blogs; SHRM's own pages show median cost per hire ~$1.2k-$1.3k nonexec, ~$4.1k avg in older report. Verify in the SHRM benchmarking PDF
    {
      value: '~44 days',
      label: 'Average time to fill a US job. Slow paperwork adds to it.',
      source: SHRM,
      placeholder: true,
    },
    {
      value: '~$4.7k',
      label: 'Average cost per hire in the US.',
      source: SHRM,
      placeholder: true,
    },
    // TODO(owner): replace with real Meher timing once measured
    { value: '< 2 min', label: 'Offer letter out (was about 45)', placeholder: true },
  ],
  steps: [
    { title: 'Call', body: 'We walk through how you hire today and pick the paperwork that eats the most time.' },
    { title: 'Map', body: 'We copy your templates, approvers and tools into one plain flow you can read.' },
    { title: 'Build', body: 'We build it in your accounts and test it on real candidates with a person approving.' },
    { title: 'Run', body: 'The automation handles the repeat work. We watch it, fix it and tune it as you grow.' },
  ],
  integrations: ['Make', 'n8n', 'Google Workspace', 'Slack', 'Airtable', 'Notion', 'OpenAI', 'Claude'],
  industries: ['HR & recruiting agencies', 'Agencies', 'B2B companies', 'Edtech', 'Small businesses'],
  compliance:
    'NYC Local Law 144 covers automated tools that screen or rank candidates for NYC jobs. It does not cover generating offer letters. A person approves every offer and every hire decision. Candidate data is handled under GDPR and CCPA. Last reviewed November 2026. This is not legal advice.',
  proof: {
    client: 'Website Vikreta',
    // TODO(owner): confirm wording and add a real count
    result: 'We run our own offer letters, completion certificates and contractor NDAs through these automations.',
    placeholder: true,
  },
  faqs: [
    {
      q: 'Can you automate offer letters?',
      a: 'Yes. The automation fills your approved template from candidate details, sends it to you to approve, then sends it for e-signature and files the signed copy. See [offer letter automation](/services/ai-automations/hr-automation/offer-letter-automation). A person approves every offer before it leaves.',
    },
    {
      q: 'Are e-signed offer letters legally valid?',
      a: 'In the US, the ESIGN Act and UETA make e-signatures valid for most employment documents. Your lawyer still owns the template wording and any state rules. We are not a law firm and we do not write legal terms.',
    },
    {
      q: 'Does NYC Local Law 144 apply to my small business?',
      a: 'It applies to automated tools that screen or rank candidates for NYC jobs. It needs an annual bias audit and notice to candidates. It does not apply to offer-letter generation. The employer, not the vendor, is responsible. [Resume screening](/services/ai-automations/hr-automation/resume-screening) is the part it touches.',
    },
    {
      q: 'Which tools does HR automation work with?',
      a: 'Google Workspace, Airtable, Notion, Slack, Make and n8n, plus the e-signature tool you already use. We do not ask you to switch. For wider setups, see [workflow automation](/services/ai-automations/workflow-automation).',
    },
    {
      q: 'How long does HR automation take to set up?',
      a: 'One offer template goes live in about 7 days. Contractor NDAs take about 7, onboarding about 10, and resume screening or the HR assistant about 14. We confirm a date after the mapping call.',
    },
    {
      q: 'What does HR automation cost?',
      a: 'It depends on how many document types you have, how many tools we connect and how many approval steps you want. We quote one number after a [short call](/contact). Your own e-sign and software subscriptions are separate.',
    },
    {
      q: 'What is not included?',
      a: 'Hiring decisions, legal wording, payroll setup, tax forms and background checks. We do not replace your ATS or e-signature tool. We connect to them. Auto-rejecting candidates is off the table.',
    },
    {
      q: 'Where is candidate data stored?',
      a: 'In your own accounts, such as Google Drive, Airtable or your HR system. We build inside your tools, so you own the workflows and the data. You can leave anytime and keep everything.',
    },
  ],
  products: [
    {
      slug: 'offer-letter-automation',
      name: 'Offer letter automation',
      keyword: 'automate offer letters',
      oneLiner: 'Offer letters filled, approved and sent in minutes.',
      answer:
        'Offer letter automation fills your offer template from candidate details, sends it to you for approval, then out for e-signature. No copy and paste, no wrong salary in the wrong place. The automation does the typing and chasing. You stay in charge of every offer that leaves your company.',
      persona: 'meher',
      channels: ['Email', 'Slack'],
      // TODO(owner): replace with measured timing
      kpi: { value: '< 2 min', label: 'Offer letter out (was about 45)', placeholder: true },
      timeToLive: 'Live in ~7 days', // TODO(owner): confirm
      includes: [
        'Your offer template, set up once',
        'Auto-fill from your hiring sheet or form',
        'Approval step with you or your hiring lead',
        'E-signature and a copy saved to the candidate folder',
        'Reminder if the offer is still unsigned',
      ],
      excludes: [
        'Deciding who to hire or what to offer',
        'Writing your legal terms (your lawyer owns those)',
        'Switching your e-signature tool',
      ],
      // TODO(owner): replace placeholder case study with a real client result
      caseStudy: {
        client: 'blancora',
        title: 'Offer letters for a hiring-heavy agency',
        problem: 'Each offer took about 45 minutes of copy and paste, and wrong start dates slipped through.',
        built: 'The template is filled from the hiring sheet, a person approves, and it goes out for e-sign.',
        result: 'Sample: under 2 minutes per offer, approved by a person every time.',
        placeholder: true,
      },
      reading: ['/blog/ai-and-automation/establishing-human-oversight-automation'],
      page: {
        title: 'Offer Letter Automation for Small Business | Website Vikreta',
        description:
          'Automate offer letters: fill, approve and send in minutes. We automate the typing. You approve every offer. Built in your own accounts.',
        h1: ['Offer letter', 'automation'],
        heroSub: 'Give the name, role and start date. The letter is ready to sign.',
        demo: {
          kind: 'doc',
          title: 'Fill an offer letter',
          docTitle: 'Offer letter',
          fields: [
            { label: 'Candidate', value: 'Neel Shah' },
            { label: 'Role', value: 'Frontend Developer' },
            { label: 'Start date', value: 'Dec 1' },
            { label: 'Type', value: 'Full-time' },
            { label: 'Manager', value: 'Shubham' },
          ],
          status: ['Filled from template', 'Waiting for your approval', 'Approved', 'Sent for e-sign'],
        },
        steps: [
          { title: 'Add the details', body: 'Type "Offer letter for Neel" in chat, or fill a short form.' },
          { title: 'Template filled', body: 'Your template is filled with the role, pay, start date and terms.' },
          { title: 'You approve', body: 'You get a message with the draft. Approve, or send it back with a note.' },
          { title: 'Sent and saved', body: 'It goes out for signature. The signed copy lands in the candidate folder.' },
        ],
        faqs: [
          {
            q: 'How do I automate offer letters?',
            a: 'Put your offer template into a tool like Make, map the fields (name, role, pay, start date), and add an approval step before sending. We do this for you: fills it, asks you to approve, then sends it for signature.',
          },
          {
            q: 'Can the AI send an offer without my approval?',
            a: 'No. Every offer waits for a person to approve it. We build it that way on purpose. It drafts and sends only after you say yes.',
          },
          {
            q: 'What tools does offer letter automation work with?',
            a: 'Google Docs and Drive, Make, n8n, Slack, Airtable, Notion and most e-signature tools. We build in the tools you already pay for, so you own the flow.',
          },
          {
            q: 'How long until offer letter automation is live?',
            a: 'Usually about a week for one template. More templates, such as interns or contractors, add a few days. We confirm on the first call.',
          },
          {
            q: 'What if my offer terms change by role?',
            a: 'We build one template per type, such as full-time, intern or contractor. It picks the right one from the role and fills the right clauses.',
          },
        ],
        related: ['hr-automation/employee-onboarding-automation', 'hr-automation/contractor-nda-and-contracts', 'finance-automation/invoice-automation'],
      },
    },
    {
      slug: 'employee-onboarding-automation',
      name: 'Employee onboarding automation',
      keyword: 'employee onboarding automation',
      oneLiner: 'Day-one setup runs itself, from the welcome to the checklist.',
      answer:
        'Employee onboarding automation runs the steps after "yes": welcome email, paperwork, account requests, first-week schedule and check-ins. Each step fires on time and tells the right person. New hires know what happens next, and your team stops chasing a checklist by hand.',
      persona: 'meher',
      channels: ['Email', 'Slack'],
      // TODO(owner): replace with measured value
      kpi: { value: '0 missed steps', label: 'Checklist items dropped in week one', placeholder: true },
      timeToLive: 'Live in ~10 days', // TODO(owner): confirm
      includes: [
        'Welcome email with first-day details',
        'Paperwork and NDA sent for signature',
        'Task list for IT, your manager and the new hire',
        'Day 1, 7 and 30 check-in messages',
        'Hired interns and contractors added to your sheet automatically',
      ],
      excludes: [
        'Creating accounts in tools we cannot reach by API',
        'Payroll setup and tax forms',
        'Training content',
      ],
      // TODO(owner): replace placeholder case study with a real client result
      caseStudy: {
        client: 'sbp',
        title: 'Onboarding that runs from one signature',
        problem: 'New hires waited days for accounts, and the checklist lived in one manager\'s head.',
        built: 'One signed offer now triggers the welcome email, NDA, task lists and day 1, 7 and 30 check-ins.',
        result: 'Sample: no missed checklist items in week one.',
        placeholder: true,
      },
      reading: ['/blog/ai-and-automation/ai-strategy-real-world-outcomes'],
      page: {
        title: 'Employee Onboarding Automation | Website Vikreta',
        description:
          'Employee onboarding automation for small teams. Welcome, paperwork, tasks and check-ins run on time, handled by our AI HR agent. Built in your tools.',
        h1: ['Employee onboarding', 'automation'],
        heroSub: 'New hire signs, gets accounts and a first-week plan. No checklist chasing.',
        demo: {
          kind: 'timeline',
          title: 'A new hire\'s first 30 days',
          events: [
            { at: 'Offer signed', label: 'Welcome email and paperwork sent', state: 'done' },
            { at: 'Day -2', label: 'IT and manager get their task list', state: 'done' },
            { at: 'Day 1', label: 'Intro in Slack, first-week plan shared', state: 'done' },
            { at: 'Day 7', label: 'Check-in message to the new hire', state: 'pending' },
            { at: 'Day 30', label: 'Review reminder to the manager', state: 'pending' },
          ],
        },
        steps: [
          { title: 'Offer is signed', body: 'That one event starts the whole flow. Nobody has to remember.' },
          { title: 'Paperwork goes out', body: 'The new hire gets the welcome email, NDA and forms in one message.' },
          { title: 'Tasks reach the right people', body: 'IT, your manager and the hire each get their own short list.' },
          { title: 'Check-ins run', body: 'It asks how it is going on day 1, 7 and 30, and flags problems to you.' },
        ],
        faqs: [
          {
            q: 'What is employee onboarding automation?',
            a: 'It is software that runs the steps after an offer is signed: welcome email, paperwork, account requests, schedules and check-ins. Each step fires on time and notifies the right person, so nothing gets missed.',
          },
          {
            q: 'How do I automate onboarding for a small team?',
            a: 'List your steps, mark who owns each, then trigger them from one event, such as a signed offer. Tools like Make or n8n can run it. We build and run that flow for you.',
          },
          {
            q: 'Does this work for interns and contractors?',
            a: 'Yes. Interns and contractors get their own paths, with the right NDA or contract. We run hired-intern and hired-contractor flows for our own team.',
          },
          {
            q: 'Can I keep a personal touch?',
            a: 'Yes. The messages sound like you, and your manager still gets a prompt to say hello. Automation handles the reminders, not the welcome itself.',
          },
          {
            q: 'What do I need to start?',
            a: 'Your current checklist, your templates and access to the tools you use, such as Google Workspace or Slack. We map the rest on the first call.',
          },
        ],
        related: ['hr-automation/offer-letter-automation', 'hr-automation/completion-letters', 'workflow-automation/ai-teammates'],
      },
    },
    {
      slug: 'resume-screening',
      name: 'Resume screening',
      keyword: 'automated resume screening',
      oneLiner: 'Sort a pile of resumes into a short list for a person to review.',
      answer:
        'Automated resume screening reads applications against the job brief and sorts them for a person to review. It does not reject anyone. We follow NYC Local Law 144 guidance, keep a human on every decision, and flag what needs a bias audit for your market.',
      persona: 'meher',
      channels: ['Email'],
      // TODO(owner): replace with measured value
      kpi: { value: '[N] hrs', label: 'Screening time saved per role', placeholder: true },
      timeToLive: 'Live in ~14 days', // TODO(owner): confirm
      includes: [
        'Job brief turned into a clear scoring guide',
        'Resumes read and summarized in one sheet',
        'Short list sent to you with reasons',
        'Candidate data stored in your own accounts',
      ],
      excludes: [
        'Auto-rejecting candidates',
        'A formal bias audit (we point you to auditors)',
        'Sourcing candidates from job boards',
      ],
    },
    {
      slug: 'interview-scheduling',
      name: 'Interview scheduling',
      keyword: 'automated interview scheduling',
      oneLiner: 'Candidates pick a slot. Calendars and reminders sort themselves.',
      answer:
        'Interview scheduling automation offers candidates open slots from your calendar, books the one they pick, sends the invite and reminds both sides. No back and forth over email. It handles the whole email thread and tells you about any no-show, so you never chase a candidate for a time.',
      persona: 'meher',
      channels: ['Email', 'Slack'],
      // TODO(owner): replace with measured value
      kpi: { value: '[N] emails', label: 'Back-and-forth emails removed per interview', placeholder: true },
      timeToLive: 'Live in ~7 days', // TODO(owner): confirm
      includes: [
        'Slots read from Google Calendar',
        'Candidate picks a time from one link',
        'Invite with meeting link sent to everyone',
        'Reminders before the interview',
      ],
      excludes: ['Running the interview', 'Video calling software', 'Panel rotas across many teams'],
    },
    {
      slug: 'contractor-nda-and-contracts',
      name: 'Contractor NDA and contracts',
      keyword: 'automate freelancer NDA and contracts',
      oneLiner: 'NDAs and contractor contracts generated and sent for signature.',
      answer:
        'This fills your NDA or contractor contract from a short form, routes it for approval and sends it for e-signature. The signed copy is saved to the right folder. We run freelancer NDAs and contractor contracts this way inside our own company.',
      persona: 'meher',
      channels: ['Email', 'Slack'],
      // TODO(owner): replace with measured value
      kpi: { value: '< 5 min', label: 'Contract ready to sign', placeholder: true },
      timeToLive: 'Live in ~7 days', // TODO(owner): confirm
      includes: [
        'NDA and contract templates set up once',
        'Auto-fill from a short form',
        'Approval before anything is sent',
        'Signed copies filed by name and date',
      ],
      excludes: ['Writing legal terms (your lawyer owns those)', 'Contract review or legal advice', 'Invoicing the contractor'],
    },
    {
      slug: 'completion-letters',
      name: 'Completion letters',
      keyword: 'automate internship completion certificate',
      oneLiner: 'Completion certificates and letters made and emailed on the end date.',
      answer:
        'Completion letter automation creates internship or contract completion certificates from your records and emails them on the end date. The right name, dates and role appear every time, with no manual typing. We generate and send our own completion certificates this way.',
      persona: 'meher',
      channels: ['Email'],
      // TODO(owner): replace with measured value
      kpi: { value: '[N] hrs', label: 'Admin time saved per cohort', placeholder: true },
      timeToLive: 'Live in ~5 days', // TODO(owner): confirm
      includes: [
        'Certificate and letter templates in your brand',
        'Data pulled from your intern or contractor sheet',
        'Auto-send to the person on the end date',
        'Copy saved to their file',
      ],
      excludes: ['Performance reviews', 'Reference letters written from scratch', 'Verifying credentials with third parties'],
    },
    {
      slug: 'hr-assistant',
      name: 'HR assistant',
      keyword: 'AI HR assistant',
      oneLiner: 'Answers HR requests in your chat, like a teammate.',
      answer:
        'An HR assistant is an AI teammate you message in Slack or WhatsApp. Ask it for an offer letter, a policy answer or a job post, and it does the task or asks you one question. We run our own this way and build yours the same way.',
      persona: 'meher',
      channels: ['Slack', 'WhatsApp', 'Web chat'],
      // TODO(owner): replace with measured value
      kpi: { value: '[N]', label: 'HR requests handled without a person typing', placeholder: true },
      timeToLive: 'Live in ~14 days', // TODO(owner): confirm
      includes: [
        'AI HR assistant in your Slack, WhatsApp or Teams',
        'Asks for missing details before acting',
        'Answers from your own HR policies',
        'Hands off to a person for anything sensitive',
      ],
      excludes: ['Legal or medical advice', 'Handling grievances or disputes', 'Payroll decisions'],
    },
  ],
}
