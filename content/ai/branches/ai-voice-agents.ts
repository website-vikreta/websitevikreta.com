import type { Branch } from '@/content/ai-automations/types'

const callRail = { name: 'CallRail consumer survey', year: 2025, url: 'https://www.callrail.com/blog/missed-calls-cost-businesses-more-than-ever' }
const hbr = { name: 'Harvard Business Review, "The Short Life of Online Sales Leads"', year: 2011, url: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads' }

export const branch: Branch = {
  slug: 'ai-voice-agents',
  name: 'AI Voice Agents',
  navLabel: 'Voice Agents',
  persona: 'arjun',
  title: 'AI Voice Agents for Small Business | Website Vikreta',
  description:
    'AI voice agents answer your calls, qualify leads and book appointments into your calendar, day and night. Built for clinics, gyms, restaurants and agencies.',
  h1: ['Every call answered.', 'Every lead booked.'],
  usp: 'Every call gets answered and books the visit into your calendar.',
  heroSub: 'Day, night, weekends. A summary lands in your CRM after each call.',
  scenarios: [
    // TODO(owner): real photo
    { industry: 'Dental clinic', photo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=70&auto=format&fit=crop', alt: 'Dental office with a chair and equipment', line: '7:40 pm call to a dental clinic. The [AI receptionist](/services/ai-automations/ai-voice-agents/ai-receptionist) booked Thursday 3:30.' },
    // TODO(owner): real photo
    { industry: 'Restaurant', photo: 'https://images.unsplash.com/photo-1551529563-fce9529e67ac?w=1200&q=70&auto=format&fit=crop', alt: 'Man in a cap standing across from a restaurant menu board', line: 'Saturday rush, phone ringing. The agent took six table bookings. Staff never stopped.' },
    // TODO(owner): real photo
    { industry: 'Real estate', photo: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?w=1200&q=70&auto=format&fit=crop', alt: 'Man holding a model house at a desk with a calculator', line: 'Sunday 9 pm: buyer called about the listing. The agent booked Monday\'s showing through [appointment booking calls](/services/ai-automations/ai-voice-agents/appointment-booking-calls).' },
  ],
  shifts: [
    { before: 'Missed calls go to voicemail', after: 'Calls answered on ring one' },
    { before: 'Callbacks the next morning', after: 'Booked before the caller hangs up' },
    { before: 'Notes lost on sticky pads', after: 'Summary saved in your CRM' },
  ],
  // TODO(owner): youtubeId once recorded
  video: { title: 'Hear the AI answer a clinic call (60s)', poster: '/wv/personas/arjun-front.webp' },
  tools: ['googlecalendar', 'hubspot', 'slack', 'twilio', 'gmail', 'googlesheets', 'zoho', 'openai', 'elevenlabs', 'make'],
  clients: ['simpli-home', 'blancora', 'sustainable-bitcoin-protocol'],
  pairsWith: ['whatsapp-automation', 'workflow-automation'],
  reading: ['/blog/ai-and-automation/establishing-human-oversight-automation', '/blog/business-growth/ai-automation-roi'],
  lead: 'Every call gets answered, asks the right questions and books the job into your calendar. Day, night and weekends.',
  answerQ: 'What is an AI voice agent?',
  answer:
    'An AI voice agent is software that talks on the phone like a person. It picks up when a customer calls, answers common questions, collects details and books an appointment in your calendar. It can also call new leads back within minutes. It tells callers it is AI, and hands off to you when needed. Start with an [AI receptionist](/services/ai-automations/ai-voice-agents/ai-receptionist) or [outbound lead qualification](/services/ai-automations/ai-voice-agents/outbound-lead-qualification).',
  demo: {
    kind: 'call',
    title: 'A missed call that became a booking',
    caller: 'New patient · (415) 555-0142',
    lines: [
      { who: 'agent', text: 'Thanks for calling Bright Smile Dental. This is Arjun, an AI assistant. How can I help?' },
      { who: 'caller', text: 'Hi, I need a cleaning, and my tooth hurts a bit.' },
      { who: 'agent', text: 'Sorry to hear that. I can fit you in this week. Do mornings or afternoons work better?' },
      { who: 'caller', text: 'Afternoon. Thursday maybe?' },
      { who: 'agent', text: 'Thursday at 3:30 PM is open. Can I get your name and best number for a text confirmation?' },
      { who: 'caller', text: 'Dana Ruiz, same number I am calling from.' },
      { who: 'agent', text: 'Booked, Dana. You will get a text in a minute. If the pain gets worse, call us and press 1 to reach the team.' },
    ],
    outcome: 'Booked · Thu 3:30 PM · added to HubSpot',
    // TODO(owner): record persona call audio and set demo.audio (e.g. '/wv/audio/arjun-call.mp3')
    audio: undefined,
  },
  stats: [
    {
      value: '~42%',
      label: 'of callers leave a voicemail when nobody picks up. Most hang up and call someone else.',
      source: callRail,
    },
    {
      value: '7x',
      label: 'more likely to qualify a lead when you reply within one hour than after two.',
      source: hbr,
    },
    // TODO(owner): confirm after pilot on a live line
    { value: '100%', label: 'of calls answered, 24/7', placeholder: true },
  ],
  steps: [
    { title: 'Map your calls', body: 'We list why people call, what you say back and which calls must reach a human.' },
    { title: 'Build the script', body: 'We teach it your services, hours, service area and booking calendar.' },
    { title: 'Test on real calls', body: 'You call it, try to break it, and we tighten every answer before launch.' },
    { title: 'Go live and tune', body: 'We watch the first two weeks of calls and fix anything that sounds off.' },
  ],
  integrations: ['Google Calendar', 'Calendly', 'HubSpot', 'Salesforce', 'GoHighLevel', 'Twilio', 'Zapier', 'Slack'],
  industries: ['Clinics', 'Gyms', 'Restaurants', 'Home services', 'Agencies'],
  compliance:
    'In February 2024 the FCC ruled that AI-generated voices are "artificial" under the TCPA. That is not a ban. Marketing calls need prior express written consent, and non-marketing calls to cell phones need prior express consent. The agent says it is AI and honors opt-outs. Recording follows state consent rules. Last reviewed November 2026.',
  faqs: [
    {
      q: 'Is an AI receptionist legal under the TCPA?',
      a: 'Yes, with consent. The FCC ruled in February 2024 that AI voices count as "artificial" under the TCPA. It is not a ban. Outbound marketing calls need prior express written consent. Inbound calls are simpler. The agent says it is AI at the start of every call. Not legal advice.',
    },
    {
      q: 'Can an AI voice agent book into my calendar?',
      a: 'Yes. It checks your live calendar, offers open slots, confirms the time and writes the booking back to Google Calendar, Calendly or your CRM. The caller gets a text confirmation. See [appointment booking calls](/services/ai-automations/ai-voice-agents/appointment-booking-calls).',
    },
    {
      q: 'What happens when it cannot answer?',
      a: 'It says so, takes a message and flags the call. You choose the rule: warm transfer in business hours, a booked callback, or a text to you. Every call has a transcript. [After-hours answering](/services/ai-automations/ai-voice-agents/after-hours-answering) follows the same rules.',
    },
    {
      q: 'Is it HIPAA compliant?',
      a: 'We do not claim HIPAA compliance. Without a signed business associate agreement, the agent only books visits and answers hours and services. It takes no health details. Ask on the call if your clinic needs a BAA.',
    },
    {
      q: 'How long does setup take?',
      a: 'Appointment booking and after-hours answering go live in about 1 week. A full receptionist or outbound qualification takes about 2 weeks. A custom CRM can add time. We confirm a date after the mapping call.',
    },
    {
      q: 'Can it make outbound calls?',
      a: 'Yes, to people who gave consent. Your automation calls new leads within minutes, asks your qualifying questions and books a call. No consent means no call. See [outbound lead qualification](/services/ai-automations/ai-voice-agents/outbound-lead-qualification).',
    },
    {
      q: 'What does an AI voice agent cost?',
      a: 'It depends on call volume, how many systems we connect, the languages you need and whether it also calls out. We quote one number after a [short call](/contact). Phone and AI usage fees are separate and billed at cost.',
    },
    {
      q: 'What is not included?',
      a: 'No live human operators, emergency dispatch, medical advice or card payments by phone. It is not a staffed answering service. It is a faster first line, with a person behind it.',
    },
  ],
  products: [
    {
      slug: 'ai-receptionist',
      name: 'AI receptionist',
      keyword: 'AI receptionist for small business',
      oneLiner: 'Answers every call, handles questions and books the job.',
      answer:
        'An AI receptionist answers your business phone, replies to common questions, takes messages and books appointments into your calendar. It works around the clock, on your current number. You see a transcript and summary of every call, and urgent ones go straight to your phone or team.',
      persona: 'arjun',
      channels: ['Phone', 'SMS'],
      // TODO(owner): replace with measured result from first live client
      kpi: { value: '100%', label: 'of calls answered, 24/7', placeholder: true },
      timeToLive: 'Live in ~2 weeks', // TODO(owner): confirm average
      includes: [
        'Answers on your existing business number',
        'Services, hours and FAQ answers you approve',
        'Books into Google Calendar, Calendly or your CRM',
        'Text confirmation to the caller',
        'Transcript and summary for every call',
        'Warm transfer or callback for urgent calls',
      ],
      excludes: [
        'Medical advice or diagnosis',
        'Taking card payments over the phone',
        'Calls in languages we have not tested together',
      ],
      // TODO(owner): replace placeholder case study with a real client result
      caseStudy: {
        client: 'blancora',
        title: 'Evening calls no longer go to voicemail',
        problem: 'A clinic missed evening calls and lost bookings to voicemail.',
        built: 'The agent answers on the existing number, books into Google Calendar and texts a confirmation.',
        result: 'Sample: every after-hours call answered, with a transcript.',
        placeholder: true,
      },
      reading: ['/blog/business-growth/ai-automation-roi'],
      page: {
        title: 'AI Receptionist for Small Business | Website Vikreta',
        description:
          'An AI receptionist that answers every call, answers questions and books appointments for clinics, gyms, restaurants, home services and agencies.',
        h1: ['AI receptionist', 'for your business'],
        heroSub: 'Your automation picks up on ring one, answers questions and books the visit.',
        demo: {
          kind: 'call',
          title: 'Receptionist call, start to booked',
          caller: 'New client · (212) 555-0188',
          lines: [
            { who: 'agent', text: 'Thanks for calling Peak Fitness. This is Arjun, an AI assistant. How can I help?' },
            { who: 'caller', text: 'Do you do personal training? What are your hours on Saturday?' },
            { who: 'agent', text: 'Yes, we do. Saturday we are open 8 AM to 2 PM. Want a free intro session?' },
            { who: 'caller', text: 'Sure. Saturday at 10?' },
            { who: 'agent', text: 'Saturday at 10 AM is open. What is your name?' },
            { who: 'caller', text: 'Marcus Lee.' },
            { who: 'agent', text: 'You are booked, Marcus. A text with the address is on its way.' },
          ],
          outcome: 'Booked · Sat 10:00 AM · added to HubSpot',
          // TODO(owner): record persona call audio and set demo.audio
          audio: undefined,
        },
        steps: [
          { title: 'We map your calls', body: 'We list the top reasons people call and the answer you want to give for each.' },
          { title: 'We set up your business', body: 'Services, hours, service area and booking rules go into its script. You approve every line.' },
          { title: 'Connect your calendar', body: 'He reads open slots and writes bookings back, so there are no double bookings.' },
          { title: 'Test, launch, tune', body: 'You call it first. After launch we review real calls for two weeks and fix gaps.' },
        ],
        faqs: [
          {
            q: 'AI receptionist vs answering service: what is the difference?',
            a: 'An answering service takes a message and you chase the caller later. An AI receptionist answers the question and books the slot on the same call, any hour. A live service is better for sensitive or emotional calls. Many businesses run both: AI first, human for escalations.',
          },
          {
            q: 'Can an AI receptionist book appointments?',
            a: 'Yes. It reads your real calendar, offers open times, confirms with the caller and writes the booking back. The caller gets a text confirmation. It works with Google Calendar, Calendly and most booking tools. Double bookings are blocked because it checks availability live.',
          },
          {
            q: 'Do I need to change my phone number?',
            a: 'No. We forward your current number to the AI, or forward only after-hours and busy calls. You can change the setting any time. Callers see the same number they always called, so nothing changes on your side.',
          },
          {
            q: 'What happens with urgent or angry calls?',
            a: 'You set the rules. Words like "emergency" or "speak to a person" can transfer the call to your cell, or text you a summary right away. Anything the AI is unsure about is flagged, logged and handed to a human rather than guessed.',
          },
          {
            q: 'Does an AI receptionist work for a small clinic or gym?',
            a: 'Yes, that is the best fit. Clinics, gyms, restaurants and home service firms get repeat questions and many booking calls. The AI handles these in seconds. It does not give medical advice, and sensitive health details stay within your privacy rules.',
          },
        ],
        related: [
          'ai-voice-agents/outbound-lead-qualification',
          'whatsapp-automation/appointment-reminders',
          'workflow-automation/crm-automation',
        ],
      },
    },
    {
      slug: 'outbound-lead-qualification',
      name: 'Outbound lead qualification',
      keyword: 'AI outbound lead qualification calls',
      oneLiner: 'Calls new leads within minutes and books the good ones.',
      answer:
        'Outbound lead qualification means an AI agent calls people who just asked for a quote or filled your form. It confirms interest, asks your qualifying questions and books a call with your team. It only calls people who gave consent, says it is AI, and logs every answer in your CRM.',
      persona: 'arjun',
      channels: ['Phone', 'SMS'],
      // TODO(owner): replace with measured result from first live client
      kpi: { value: 'Under 2 min', label: 'from form fill to first call', placeholder: true },
      timeToLive: 'Live in ~2 weeks', // TODO(owner): confirm average
      includes: [
        'Calls within minutes of a form or ad lead',
        'Your qualifying questions and scoring rules',
        'Books qualified leads on your team calendar',
        'Retries at set times, then switches to text',
        'Consent check before every call',
        'Full answers and recording note in your CRM',
      ],
      excludes: [
        'Cold calling lists with no consent',
        'Closing or negotiating a sale',
        'Calls outside permitted calling hours',
      ],
      // TODO(owner): replace placeholder case study with a real client result
      caseStudy: {
        client: 'sbp',
        title: 'Web leads called back in minutes',
        problem: 'Web leads waited hours for a call back, and many went cold.',
        built: 'Your automation calls consented leads within minutes, qualifies them and books a call with a salesperson.',
        result: 'Sample: first call placed in under 5 minutes.',
        placeholder: true,
      },
      reading: ['/blog/ai-and-automation/establishing-human-oversight-automation'],
      page: {
        title: 'AI Outbound Lead Qualification Calls | Website Vikreta',
        description:
          'AI calls your new leads within minutes, asks your qualifying questions and books the best ones with your team. Consent-first and logged in your CRM.',
        h1: ['Call every lead', 'within minutes'],
        heroSub: 'Your automation calls new leads within minutes, only those who agreed, and books the call.',
        demo: {
          kind: 'call',
          title: 'Lead called two minutes after the form',
          caller: 'Form lead · Priya N. · roofing quote',
          lines: [
            { who: 'agent', text: 'Hi Priya, this is Arjun, an AI assistant calling for Summit Roofing. You asked for a quote a minute ago. Is now OK?' },
            { who: 'caller', text: 'Sure, go ahead.' },
            { who: 'agent', text: 'Is it a repair or a full replacement?' },
            { who: 'caller', text: 'Replacement. We have leaks in two places.' },
            { who: 'agent', text: 'Got it. How soon do you want it done?' },
            { who: 'caller', text: 'Within a month.' },
            { who: 'agent', text: 'I can book a free on-site estimate. Does Tuesday at 11 AM work?' },
          ],
          outcome: 'Qualified · estimate Tue 11:00 AM · synced to Salesforce',
          // TODO(owner): record persona call audio and set demo.audio
          audio: undefined,
        },
        steps: [
          { title: 'Connect lead sources', body: 'Your web form, ad forms or CRM send each new lead to the agent the moment it arrives.' },
          { title: 'Set your questions', body: 'You choose what makes a lead good: budget, timing, location. Your automation scores each answer.' },
          { title: 'Call, retry, text', body: 'He calls, retries at set times, then sends a text if there is no answer.' },
          { title: 'Hand over the good ones', body: 'Qualified leads land on your calendar with the full call notes in your CRM.' },
        ],
        faqs: [
          {
            q: 'Is it legal to use AI voice agents for outbound calls?',
            a: 'Yes, with prior express consent. The FCC ruled in 2024 that AI voices are "artificial" under the TCPA, so every person called must have agreed to be contacted. We call only form leads who opted in, and the AI says it is AI. This is not legal advice.',
          },
          {
            q: 'How fast should you call a new lead?',
            a: 'As fast as you can. Harvard Business Review found firms that replied within one hour were about seven times more likely to qualify the lead than those that waited longer. An AI agent can place the first call within minutes, any time of day.',
          },
          {
            q: 'Can AI qualify leads over the phone?',
            a: 'Yes. It asks the questions you pick, such as budget, timing and location, and scores the answers by your rules. Good leads go to your calendar. The rest get a follow-up text or email. You review the transcript if you disagree with a score.',
          },
          {
            q: 'What if the lead does not pick up?',
            a: 'Your automation retries at times you set, within legal calling hours, then sends a text with a booking link. After the last attempt the lead is tagged in your CRM so your team can decide whether to call by hand.',
          },
          {
            q: 'Can I use it for cold outreach to purchased lists?',
            a: 'No. We do not run AI calls to people who have not agreed to be contacted. It breaks TCPA rules and gets numbers blocked. We build for inbound leads, past customers who opted in, and form fills from your ads.',
          },
        ],
        related: [
          'ai-voice-agents/ai-receptionist',
          'whatsapp-automation/whatsapp-lead-follow-up',
          'workflow-automation/speed-to-lead',
        ],
      },
    },
    {
      slug: 'appointment-booking-calls',
      name: 'Appointment booking calls',
      keyword: 'AI appointment booking calls',
      oneLiner: 'Fills your calendar from inbound and callback calls.',
      answer:
        'Appointment booking calls let an AI agent take the call, check your calendar and lock in a time. It also handles reschedules and cancellations by phone. The booking appears in your calendar and the caller gets a text confirmation, with no one on your team picking up.',
      persona: 'arjun',
      channels: ['Phone', 'SMS'],
      // TODO(owner): replace with measured result
      kpi: { value: '100%', label: 'of booking calls handled, 24/7', placeholder: true },
      timeToLive: 'Live in ~1 week', // TODO(owner): confirm
      includes: [
        'New bookings, reschedules and cancellations by phone',
        'Live calendar check, no double booking',
        'Text confirmation and reminder link',
        'Service and staff rules you set',
      ],
      excludes: ['Taking payments by phone', 'Complex multi-visit quotes'],
    },
    {
      slug: 'after-hours-answering',
      name: 'After-hours answering',
      keyword: 'AI after hours answering service',
      oneLiner: 'Picks up nights and weekends so no lead goes cold.',
      answer:
        'After-hours answering covers the calls that come when you are closed. The AI answers, tells callers your hours, handles urgent triage by your rules and books the next open slot. You wake up to a list of calls with summaries, not a full voicemail box.',
      persona: 'arjun',
      channels: ['Phone', 'SMS'],
      // TODO(owner): replace with measured result
      kpi: { value: '0', label: 'calls sent to voicemail after hours', placeholder: true },
      timeToLive: 'Live in ~1 week', // TODO(owner): confirm
      includes: [
        'Answers only outside your set hours',
        'Urgent-call rules: text or ring your on-call person',
        'Books the next open slot',
        'Morning summary of every call',
      ],
      excludes: ['Emergency dispatch services', 'Replacing a staffed on-call line'],
    },
    {
      slug: 'call-summaries-to-crm',
      name: 'Call summaries to CRM',
      keyword: 'AI call summary to CRM',
      oneLiner: 'Every call logged in your CRM, with next steps.',
      answer:
        'Call summaries to CRM turns each phone call into a short note: who called, what they wanted and what happens next. It writes the note, tags the contact and creates a follow-up task in your CRM. Your team stops typing notes and starts following up.',
      persona: 'arjun',
      channels: ['Phone'],
      // TODO(owner): replace with measured result
      kpi: { value: 'Under 1 min', label: 'from hang-up to CRM note', placeholder: true },
      timeToLive: 'Live in ~1 week', // TODO(owner): confirm
      includes: [
        'Transcript and short summary per call',
        'Contact matched or created in your CRM',
        'Follow-up task with a due date',
        'Works on calls the AI takes or your team takes',
      ],
      excludes: ['Recording calls where consent is missing', 'Rebuilding your CRM fields'],
    },
  ],
}
