import type { Branch } from '@/content/ai-automations/types'

const hbr = { name: 'Harvard Business Review, "The Short Life of Online Sales Leads"', year: 2011, url: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads' }

export const branch: Branch = {
  slug: 'whatsapp-automation',
  name: 'WhatsApp & Chat Automation',
  navLabel: 'WhatsApp & Chat',
  persona: 'arjun',
  title: 'WhatsApp & SMS Automation | Website Vikreta',
  description:
    'Reply to every lead in seconds on WhatsApp, SMS and website chat. Qualify, book and remind automatically. Built for US, UK and EU small businesses.',
  h1: ['Reply to every lead', 'in seconds.'],
  usp: 'Leads get a WhatsApp reply in seconds, qualifies the lead, books the call.',
  heroSub: 'Web form, WhatsApp, SMS and chat. Your team steps in when it counts.',
  scenarios: [
    // TODO(owner): real photo
    { industry: 'D2C brand', photo: 'https://images.unsplash.com/photo-1770013413878-2530e2c3d82b?w=1200&q=70&auto=format&fit=crop', alt: 'Woman checking a package with her phone near a laptop and boxes', line: 'Where is my order? Asked at 11 pm. [Order updates](/services/ai-automations/whatsapp-automation/order-updates) answered in six seconds.' },
    // TODO(owner): real photo
    { industry: 'Salon or clinic', photo: 'https://images.unsplash.com/photo-1653762379954-8943c787e78b?w=1200&q=70&auto=format&fit=crop', alt: 'Woman at a table looking at her phone', line: 'Reminder went out the day before. Two clients rescheduled by text, no calls.' },
    // TODO(owner): real photo
    { industry: 'Edtech', photo: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=70&auto=format&fit=crop', alt: 'Person studying online on a laptop', line: 'Course lead filled the form at 9:02. [WhatsApp lead follow-up](/services/ai-automations/whatsapp-automation/whatsapp-lead-follow-up) replied at 9:02.' },
  ],
  shifts: [
    { before: 'Leads wait hours for a reply', after: 'Reply in six seconds' },
    { before: 'No-shows forget the appointment', after: 'Reminder lands the day before' },
    { before: 'Reviews never get asked for', after: 'Review request after every job' },
  ],
  // TODO(owner): youtubeId once recorded
  video: { title: 'Watch us reply to a lead (60s)', poster: '/wv/personas/arjun-front.webp' },
  tools: ['whatsapp', 'twilio', 'hubspot', 'googlesheets', 'googlecalendar', 'shopify', 'typeform', 'instagram', 'slack', 'make'],
  clients: ['simpli-home', 'blancora', 'sustainable-bitcoin-protocol'],
  pairsWith: ['ai-voice-agents', 'finance-automation'],
  reading: ['/blog/ai-and-automation/ai-automation-connecting-tools', '/blog/business-growth/ai-automation-roi'],
  lead: 'Your automation answers new leads on WhatsApp, SMS and your website chat, qualifies them and books the call. Your team steps in when it counts.',
  answerQ: 'What is WhatsApp and chat automation?',
  answer:
    'WhatsApp and chat automation uses AI to reply to customers in the apps they already use: WhatsApp, SMS and website chat. It answers questions, qualifies new leads, books appointments and sends reminders. It works with opt-in contacts and approved message templates, and hands off to your team when a person is needed. Start with [WhatsApp lead follow-up](/services/ai-automations/whatsapp-automation/whatsapp-lead-follow-up) or [appointment reminders](/services/ai-automations/whatsapp-automation/appointment-reminders).',
  demo: {
    kind: 'chat',
    channel: 'whatsapp',
    title: 'Lead to booked call in under a minute',
    messages: [
      { from: 'user', text: 'Hi, I filled in the form about a kitchen remodel.' },
      { from: 'arjun', text: 'Hi Sam, thanks for reaching out to Oak & Stone. I am Arjun, an AI assistant. What size is the kitchen, roughly?' },
      { from: 'user', text: 'About 150 sq ft. We want to start in spring.' },
      { from: 'arjun', text: 'Nice. Do you have a budget range in mind? A rough number is fine.' },
      { from: 'user', text: 'Around 40 to 50k.' },
      { from: 'arjun', text: 'That fits our remodels. Our designer has a free consult slot Wed 2 PM or Thu 10 AM. Which one?' },
      { from: 'user', text: 'Thursday.' },
      { from: 'arjun', text: 'Booked for Thu 10 AM. I will send a reminder the day before.', attachment: { kind: 'card', label: 'Design consult · Thu 10:00 AM', meta: 'Added to Google Calendar' } },
    ],
  },
  stats: [
    {
      value: '7x',
      label: 'more likely to qualify a lead when you reply within one hour than after two.',
      source: hbr,
    },
    // TODO(owner): confirm on a live account
    { value: '<10 sec', label: 'to the first reply, any hour', placeholder: true },
    // TODO(owner): replace with measured no-show change from first live client
    { value: '[N]%', label: 'fewer no-shows with automatic reminders', placeholder: true },
  ],
  steps: [
    { title: 'Pick your channels', body: 'WhatsApp for UK, EU, LatAm and the Gulf. SMS for the US. Web chat for your site.' },
    { title: 'Write the flows', body: 'We script the questions, answers and handoffs with you. You approve every message.' },
    { title: 'Get approved and connected', body: 'We handle the WhatsApp Business API, template approval and US SMS registration.' },
    { title: 'Launch and improve', body: 'We watch real chats for two weeks, fix weak replies and tune the follow-ups.' },
  ],
  integrations: ['WhatsApp Business API', 'Twilio', 'HubSpot', 'GoHighLevel', 'Google Calendar', 'Calendly', 'Shopify', 'Zapier'],
  industries: ['Clinics', 'Gyms', 'Restaurants', 'Home services', 'Agencies', 'Ecommerce'],
  compliance:
    'WhatsApp requires opt-in before you message first. Messages outside the 24-hour window must use Meta-approved templates. US business texting needs A2P 10DLC registration and STOP handling. For UK and EU contacts we follow GDPR and PECR. Last reviewed November 2026.',
  faqs: [
    {
      q: 'Is WhatsApp automation allowed?',
      a: 'Yes, through the official WhatsApp Business API. Tools that automate the regular consumer app break WhatsApp rules and risk a ban. Customers must opt in, and your first message outside the 24-hour window must be an approved template.',
    },
    {
      q: 'What does Meta charge per message?',
      a: 'Since July 1, 2025, Meta bills per delivered template message. The rate depends on the category and the recipient country. Replies inside the 24-hour customer window are free. Meta fees are separate from ours. Check Meta\'s current rate card.',
    },
    {
      q: 'Do customers have to opt in?',
      a: 'Yes. They need to agree to hear from you on WhatsApp, for example through a form tick-box or by messaging you first. We store the proof of opt-in and honor opt-outs right away.',
    },
    {
      q: 'Can I keep my existing number?',
      a: 'Usually, with one catch. A number on the API cannot run in the regular WhatsApp app at the same time. You can move it or use a new number. We check this on the first call.',
    },
    {
      q: 'What are message templates?',
      a: 'Templates are messages Meta approves in advance. You need one to start a chat or reply after the 24-hour window closes. Examples are reminders and order updates. We write them, submit them and handle rejections. Approval usually takes days.',
    },
    {
      q: 'Does this work in the US?',
      a: 'Yes, but most US customers expect SMS. Business SMS needs A2P 10DLC registration, which can take days to approve, and clear STOP handling. We set up both channels from one flow. See [AI website chat agent](/services/ai-automations/whatsapp-automation/ai-website-chat-agent) too.',
    },
    {
      q: 'How long until it goes live?',
      a: 'Appointment reminders, order updates and broadcasts take about 1 week. Lead follow-up, support and the website chat agent take about 2 weeks. Template approval can add a few days. We confirm a date after mapping.',
    },
    {
      q: 'What does it cost, and what is not included?',
      a: 'Cost depends on message volume, channels, how many systems we connect and how many flows you want. We quote after a [short call](/contact). Meta fees and SMS carrier fees are separate. We do not message purchased lists or run refunds without approval.',
    },
  ],
  products: [
    {
      slug: 'whatsapp-lead-follow-up',
      name: 'WhatsApp lead follow-up',
      keyword: 'WhatsApp chatbot for lead follow-up',
      oneLiner: 'Replies to new leads in seconds and books the call.',
      answer:
        'WhatsApp lead follow-up sends a reply within seconds of a new inquiry from your form, ad or website. The AI asks your qualifying questions, answers basic questions and books a call or visit. Qualified leads reach your team with the full chat and details attached.',
      persona: 'arjun',
      channels: ['WhatsApp', 'SMS', 'Web chat'],
      // TODO(owner): replace with measured result
      kpi: { value: '<10 sec', label: 'to the first reply, any hour', placeholder: true },
      timeToLive: 'Live in ~2 weeks', // TODO(owner): confirm
      includes: [
        'Instant reply to form, ad and site leads',
        'Your qualifying questions and scoring',
        'Books on your calendar from the chat',
        'Follow-up nudges for leads that go quiet',
        'Handoff to your team with full chat history',
        'Lead and chat synced to your CRM',
      ],
      excludes: [
        'Messaging people who have not opted in',
        'Closing sales or negotiating',
        'Bulk blasts to cold lists',
      ],
      // TODO(owner): replace placeholder case study with a real client result
      caseStudy: {
        client: 'simpli-home',
        title: 'Leads answered in seconds, not hours',
        problem: 'New leads sat unanswered for hours, so many went to a competitor.',
        built: 'Your automation replies on WhatsApp within seconds, asks three questions and hands warm leads to the team.',
        result: 'Sample: first reply in under 10 seconds.',
        placeholder: true,
      },
      reading: ['/blog/ai-and-automation/ai-automation-connecting-tools'],
      page: {
        title: 'WhatsApp Lead Follow-Up Automation | Website Vikreta',
        description:
          'Reply to every new lead on WhatsApp or SMS in seconds. AI qualifies them, books the call and syncs to your CRM. Opt-in and template compliant.',
        h1: ['Follow up leads', 'in seconds'],
        heroSub: 'A form fill gets a WhatsApp reply in seconds, then a booked call.',
        demo: {
          kind: 'chat',
          channel: 'whatsapp',
          title: 'Ad lead to booked consult',
          messages: [
            { from: 'user', text: 'Hi, saw your ad for teeth whitening.' },
            { from: 'arjun', text: 'Hi Lena, thanks for getting in touch with Brightside Dental. I am Arjun, an AI assistant. Are you after whitening only, or a full check-up too?' },
            { from: 'user', text: 'Just whitening.' },
            { from: 'arjun', text: 'Great. Have you had whitening done before?' },
            { from: 'user', text: 'No, first time.' },
            { from: 'arjun', text: 'Then we start with a quick consult. Free slots: Tue 5 PM or Fri 9 AM.' },
            { from: 'user', text: 'Tuesday works.' },
            { from: 'arjun', text: 'Booked for Tue 5 PM. See you then.', attachment: { kind: 'card', label: 'Whitening consult · Tue 5:00 PM', meta: 'Synced to HubSpot' } },
          ],
        },
        steps: [
          { title: 'Connect lead sources', body: 'Forms, Meta and Google ads, and your site send each lead to the agent the moment it lands.' },
          { title: 'Set the questions', body: 'You pick what makes a lead good. Your automation asks it in a natural chat, not a form.' },
          { title: 'Book or hand over', body: 'Good leads get a calendar slot. Tricky ones go to your team with the chat attached.' },
          { title: 'Nudge the quiet ones', body: 'If a lead stops replying, your automation follows up at the times you set, then stops.' },
        ],
        faqs: [
          {
            q: 'How fast should I reply to a new lead?',
            a: 'Within minutes. Harvard Business Review found that replying within one hour made a firm about seven times more likely to qualify a lead than waiting longer. An AI reply goes out in seconds at 2 AM, so speed no longer depends on who is at their desk.',
          },
          {
            q: 'Does WhatsApp lead follow-up work for the US?',
            a: 'Yes, through SMS. Most US customers use text, so we run the same flow over SMS with A2P 10DLC registration. For UK, EU, LatAm and Gulf customers we use WhatsApp. One setup can cover both, depending on where your leads live.',
          },
          {
            q: 'Can I message a lead first on WhatsApp?',
            a: 'Only if they opted in, and the first message must be a Meta-approved template. Once the lead replies you have a 24-hour window for normal chat. We collect opt-in on your form and set up the templates for you.',
          },
          {
            q: 'What WhatsApp chatbot tools does this work with?',
            a: 'We build on the official WhatsApp Business API through providers like Twilio, and connect to HubSpot, GoHighLevel, Google Calendar and Calendly. If you already use another CRM, we can usually connect it with Zapier or its API.',
          },
          {
            q: 'What does the chat cost per message?',
            a: 'Costs depend on your provider and the message type, and Meta changes its rates. We explain the likely monthly cost on your plan call so there are no surprises. For most small businesses, message fees are a small part of the total.',
          },
        ],
        related: [
          'whatsapp-automation/appointment-reminders',
          'workflow-automation/speed-to-lead',
          'ai-voice-agents/outbound-lead-qualification',
        ],
      },
    },
    {
      slug: 'appointment-reminders',
      name: 'Appointment reminders',
      keyword: 'automate appointment reminders',
      oneLiner: 'Cuts no-shows with timed reminders and easy rescheduling.',
      answer:
        'Appointment reminders send a text or WhatsApp message before each booking. The customer can confirm, reschedule or cancel with one reply, and the calendar updates itself. Freed slots can go to a waitlist. Fewer empty chairs, and nobody on your team sends a single reminder by hand.',
      persona: 'arjun',
      channels: ['WhatsApp', 'SMS'],
      // TODO(owner): replace with measured no-show change
      kpi: { value: '[N]%', label: 'fewer no-shows', placeholder: true },
      timeToLive: 'Live in ~1 week', // TODO(owner): confirm
      includes: [
        'Reminders at times you choose, such as 48 hours and 2 hours before',
        'Reply to confirm, reschedule or cancel',
        'Calendar and CRM updated automatically',
        'Waitlist fill for canceled slots',
        'Review request after the visit',
      ],
      excludes: [
        'Reminders to people who have not opted in',
        'Changing your cancellation policy',
        'Taking deposits or payments',
      ],
      // TODO(owner): replace placeholder case study with a real client result
      caseStudy: {
        client: 'blancora',
        title: 'Fewer no-shows from reminders',
        problem: 'No-shows left a clinic with empty slots every week.',
        built: 'Approved reminder templates go out the day before, with a one-tap reschedule.',
        result: 'Sample: fewer no-shows, with rescheduling handled by text.',
        placeholder: true,
      },
      reading: ['/blog/business-growth/ai-automation-roi'],
      page: {
        title: 'Appointment Reminders on SMS & WhatsApp | Website Vikreta',
        description:
          'Automate appointment reminders by SMS and WhatsApp. Confirm, reschedule and fill canceled slots for clinics, gyms, salons and home services.',
        h1: ['Fewer no-shows', 'on autopilot'],
        heroSub: 'Reminders go out the day before. Replies reschedule the slot automatically.',
        demo: {
          kind: 'chat',
          channel: 'sms',
          title: 'Reminder, reschedule, slot refilled',
          messages: [
            { from: 'arjun', text: 'Hi Jordan, this is Peak Physio (AI assistant). Reminder: appointment Thu 4:00 PM. Reply 1 to confirm, 2 to reschedule.' },
            { from: 'user', text: '2' },
            { from: 'arjun', text: 'No problem. Open times: Fri 9:30 AM, Fri 1:00 PM, Mon 4:00 PM. Which works?' },
            { from: 'user', text: 'Fri 9:30' },
            { from: 'arjun', text: 'Done. You are booked for Fri 9:30 AM. Reply STOP to opt out of texts.', attachment: { kind: 'card', label: 'Rescheduled · Fri 9:30 AM', meta: 'Thu 4:00 PM slot offered to waitlist' } },
          ],
        },
        steps: [
          { title: 'Connect your calendar', body: 'Your automation reads bookings from Google Calendar, Calendly or your booking tool.' },
          { title: 'Set the timing', body: 'Pick when reminders go out and what each one says. You approve the wording.' },
          { title: 'Let customers reply', body: 'One reply confirms, moves or cancels the visit, and your calendar updates.' },
          { title: 'Refill the gap', body: 'A canceled slot goes to your waitlist or to the next person who asked.' },
        ],
        faqs: [
          {
            q: 'How do I automate appointment reminders?',
            a: 'Connect your calendar or booking tool to a messaging flow. Each new booking triggers reminders at set times, by SMS or WhatsApp. Customers reply to confirm or reschedule, and the calendar updates itself. We build and test the whole flow for you.',
          },
          {
            q: 'Do appointment reminders really reduce no-shows?',
            a: 'Usually yes, because most no-shows are forgetting, not refusing. A reminder with an easy reschedule reply fixes forgetting. Results vary by business, so we measure your no-show rate before and after launch instead of promising a number.',
          },
          {
            q: 'Do I need consent to text appointment reminders?',
            a: 'Yes. Collect opt-in when the customer books, and include STOP instructions. In the US, register your texting under A2P 10DLC. For WhatsApp, use opt-in and approved templates. In the EU and UK, GDPR applies too. This is not legal advice.',
          },
          {
            q: 'What is the best time to send a reminder?',
            a: 'Most businesses send two: one around 24 to 48 hours before, and one a few hours before. We start there and adjust using your data, since a clinic and a restaurant behave differently.',
          },
          {
            q: 'Does it work with my booking software?',
            a: 'It works with Google Calendar, Calendly and most tools that have an API or a Zapier connection. Tell us what you use on the first call. If it cannot connect, we say so before you spend anything.',
          },
        ],
        related: [
          'whatsapp-automation/whatsapp-lead-follow-up',
          'ai-voice-agents/ai-receptionist',
          'finance-automation/payment-reminder-automation',
        ],
      },
    },
    {
      slug: 'whatsapp-customer-support',
      name: 'WhatsApp customer support',
      keyword: 'WhatsApp customer support automation',
      oneLiner: 'Answers common questions instantly and escalates the rest.',
      answer:
        'WhatsApp customer support automation lets an AI answer the questions your team gets every day, such as hours, order status, policies and how-tos, from your own knowledge base. Anything it cannot answer goes to a person with the full chat attached, so customers never repeat themselves.',
      persona: 'arjun',
      channels: ['WhatsApp', 'SMS', 'Web chat'],
      // TODO(owner): replace with measured result
      kpi: { value: '[N]%', label: 'of questions answered without a human', placeholder: true },
      timeToLive: 'Live in ~2 weeks', // TODO(owner): confirm
      includes: [
        'Answers from your own help docs and policies',
        'Escalation to your team with chat history',
        'Business-hours and after-hours rules',
        'Tickets logged in your help desk',
      ],
      excludes: ['Refunds or account changes without approval', 'Answers outside your documents'],
    },
    {
      slug: 'ai-website-chat-agent',
      name: 'AI website chat agent',
      keyword: 'AI chat agent for website',
      oneLiner: 'Talks to visitors, qualifies them and books the call.',
      answer:
        'An AI website chat agent greets visitors on your site, answers questions from your content and asks qualifying questions. It books a call on your calendar or captures contact details for follow-up. It runs day and night, tells visitors it is AI and passes live chats to your team.',
      persona: 'arjun',
      channels: ['Web chat'],
      // TODO(owner): replace with measured result
      kpi: { value: '[N]%', label: 'more visitor conversations turned into leads', placeholder: true },
      timeToLive: 'Live in ~2 weeks', // TODO(owner): confirm
      includes: [
        'Trained on your site and approved documents',
        'Lead capture and calendar booking',
        'Handoff to a person or WhatsApp',
        'Chat transcripts in your CRM',
      ],
      excludes: ['Answers beyond your approved content', 'Redesigning your website'],
    },
    {
      slug: 'order-updates',
      name: 'Order updates',
      keyword: 'automated order update messages',
      oneLiner: 'Sends order, shipping and delivery updates by text or WhatsApp.',
      answer:
        'Order updates send customers a message when their order is confirmed, shipped or delivered. They can ask "where is my order?" in the chat and get the live status. This cuts support tickets and keeps customers calm, without your team looking up tracking numbers.',
      persona: 'arjun',
      channels: ['WhatsApp', 'SMS'],
      // TODO(owner): replace with measured result
      kpi: { value: '[N]%', label: 'fewer "where is my order" tickets', placeholder: true },
      timeToLive: 'Live in ~1 week', // TODO(owner): confirm
      includes: [
        'Confirmation, shipped and delivered messages',
        'Live status on request in chat',
        'Shopify and WooCommerce connection',
        'Opt-in and approved templates',
      ],
      excludes: ['Handling returns or refunds', 'Carrier delays you do not control'],
    },
    {
      slug: 'review-collection',
      name: 'Review collection',
      keyword: 'automate customer review requests',
      oneLiner: 'Asks happy customers for a review at the right moment.',
      answer:
        'Review collection sends a short message after a visit or purchase asking how it went. Happy customers get a link to leave a public review on Google. Unhappy ones are routed to your team first, so you can fix the issue privately. More reviews with almost no effort.',
      persona: 'arjun',
      channels: ['WhatsApp', 'SMS'],
      // TODO(owner): replace with measured result
      kpi: { value: '[N]x', label: 'more reviews per month', placeholder: true },
      timeToLive: 'Live in ~1 week', // TODO(owner): confirm
      includes: [
        'Request sent after the visit or delivery',
        'Link to your Google review page',
        'Private route for unhappy customers',
        'Monthly review count in your report',
      ],
      excludes: ['Buying or faking reviews', 'Offering rewards in exchange for positive reviews'],
    },
    {
      slug: 'broadcast-campaigns',
      name: 'Broadcast campaigns',
      keyword: 'WhatsApp broadcast campaigns',
      oneLiner: 'Sends offers and news to opted-in customers, with replies handled.',
      answer:
        'Broadcast campaigns send an offer, a launch or an update to customers who agreed to hear from you, by WhatsApp or SMS. Replies are answered by the AI and bookings are made in the chat. Lists are segmented, templates are approved and opt-outs are respected every time.',
      persona: 'arjun',
      channels: ['WhatsApp', 'SMS'],
      // TODO(owner): replace with measured result
      kpi: { value: '[N]%', label: 'reply rate on broadcasts', placeholder: true },
      timeToLive: 'Live in ~1 week', // TODO(owner): confirm
      includes: [
        'Segmented lists of opted-in contacts',
        'Meta-approved templates',
        'AI handles replies and bookings',
        'Opt-out handling on every send',
      ],
      excludes: ['Sending to purchased or scraped lists', 'Unapproved promotional templates'],
    },
  ],
}
