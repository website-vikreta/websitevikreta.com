import type { Branch, Demo } from '../types'

const fanout: Demo = {
  kind: 'fanout',
  title: 'One idea, five posts',
  source: 'Idea: Why founders should stop writing proposals from scratch',
  outputs: [
    { channel: 'Blog', text: 'Why founders should stop writing proposals from scratch. 1,200-word draft with sources, ready for review.' },
    { channel: 'LinkedIn', text: 'You wrote the same proposal four times this month. Here is what to reuse, and what to change each time.' },
    { channel: 'X', text: 'Stop rewriting proposals. Keep a base. Change the problem, the scope, the proof. Done in 15 minutes.' },
    { channel: 'Instagram', text: 'Carousel: 5 slides. Slide 1: "Your proposals repeat themselves." Slides 2 to 5: what to reuse.' },
    { channel: 'Newsletter', text: 'Subject: The 15-minute proposal. Short intro, three tips, one link to the full post.' },
  ],
}

export const branch: Branch = {
  slug: 'content-automation',
  name: 'Content Automation',
  navLabel: 'Content',
  persona: 'ira',
  title: 'AI Content Automation for Business | Website Vikreta',
  description:
    'AI content automation for blogs, social and email. Your automation drafts, schedules and repurposes content. A human checks every claim before it ships.',
  h1: ['One brief.', 'A month of posts.'],
  usp: 'One brief becomes a month of posts you approve.',
  heroSub: 'Blog, LinkedIn, Instagram, X and email, drafted and scheduled. You approve each one.',
  scenarios: [
    // TODO(owner): real photo
    { industry: 'Agencies', photo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=70&auto=format&fit=crop', alt: 'A presenter at a table of people with laptops', line: 'An agency drops one client call recording. Your automation returns 20 posts through [content repurposing](/services/ai-automations/content-automation/content-repurposing).' },
    // TODO(owner): real photo
    { industry: 'B2B and SaaS', photo: 'https://images.unsplash.com/photo-1690378820474-b468b8ee64d3?w=1200&q=70&auto=format&fit=crop', alt: 'A group of people around a table with laptops at a startup', line: 'A SaaS founder posts the changelog to four channels by lunch.' },
    // TODO(owner): real photo
    { industry: 'Restaurants', photo: 'https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?w=1200&q=70&auto=format&fit=crop', alt: 'A chef chopping vegetables in a restaurant kitchen', line: 'A restaurant owner texts one menu photo. Your automation plans the week.' },
  ],
  shifts: [
    { before: 'Sunday nights writing posts', after: 'Approve a month on Monday' },
    { before: 'Same idea, rewritten five times', after: 'One idea, five channels' },
    { before: 'Posting when you remember', after: 'Scheduled to your calendar' },
  ],
  // TODO(owner): youtubeId once recorded
  video: { title: 'Watch us plan a month of posts (60s)', poster: '/wv/personas/ira-three-quarter.webp' },
  tools: ['wordpress', 'linkedin', 'instagram', 'x', 'mailchimp', 'notion', 'slack', 'canva'],
  clients: ['blancora', 'sustainable-bitcoin-protocol', 'simpli-home'],
  pairsWith: ['ai-ugc-ads', 'workflow-automation'],
  reading: ['/blog/educational/google-ai-search-optimization-guide', '/blog/ai-and-automation/ai-strategy-real-world-outcomes'],
  lead: 'Your automation researches, drafts and schedules your blog and social posts. You approve. We run our own content this way.',
  answerQ: 'What is content automation?',
  answer:
    'Content automation uses AI to do the slow parts of content: research, first drafts, resizing for each channel, and scheduling. A person still sets the idea, checks the facts, and approves the voice. You publish more, with less time spent on each piece. Start with [SEO blog content](/services/ai-automations/content-automation/seo-blog-content) or [social media content](/services/ai-automations/content-automation/social-media-content).',
  demo: fanout,
  stats: [
    {
      value: '~4 hrs',
      label: 'is the average time to write one blog post.',
      // TODO(owner): unverified — Orbit page now says ~3h20m average (peak 4h10m in 2022); update value or keep as 2022-era
      placeholder: true,
      source: { name: 'Orbit Media blogging statistics', year: 2024, url: 'https://www.orbitmedia.com/blog/blogging-statistics/' },
    },
    {
      value: 'Most',
      label: 'companies now use AI in at least one business function.',
      source: { name: 'McKinsey, The State of AI', year: 2025, url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai' },
    },
    // TODO(owner): confirm real draft time
    { value: '~20 min', label: 'to a researched first draft with the automation.', placeholder: true },
  ],
  steps: [
    { title: 'Set the voice', body: 'Share past posts and your rules. We write a voice guide you approve.' },
    { title: 'Plan the topics', body: 'We build a calendar from your keywords, customers and sales questions.' },
    { title: 'Draft and repurpose', body: 'Your automation drafts the post, then turns it into social, email and carousel copy.' },
    { title: 'Review and publish', body: 'You approve. Your automation schedules it. Facts are checked by a person first.' },
  ],
  integrations: ['WordPress', 'Webflow', 'LinkedIn', 'X', 'Instagram', 'Mailchimp', 'Notion', 'Slack'],
  industries: ['Agencies', 'D2C and ecommerce', 'Edtech', 'B2B and SaaS'],
  compliance:
    'A person checks every factual claim and approves the brand voice before anything goes live. The writer is disclosed as AI where a platform asks for an AI-content label. We do not copy other writers. Drafts are checked for originality, and sources are linked where we cite them.',
  proof: {
    client: 'Website Vikreta',
    // TODO(owner): add real numbers, e.g. posts per month and hours saved.
    result: 'Your automation writes and schedules our own blogs and social posts. We review each one before it goes out.',
    placeholder: true,
  },
  faqs: [
    {
      q: 'Can AI write blog posts that rank on Google?',
      a: 'Yes, if the post is useful, accurate and written for a real search need. Google does not ban AI content. It ranks quality. We add research, sources and a human edit. See our [Google AI search guide](/blog/educational/google-ai-search-optimization-guide) for the details.',
    },
    {
      q: 'Is AI-generated content bad for SEO?',
      a: 'Not by itself. Thin, copied or wrong content is bad for SEO, whoever writes it. We aim for original structure, real facts with links, and a human review on every post.',
    },
    {
      q: 'How do I keep AI content from sounding generic?',
      a: 'Give it a voice guide, real examples, and your own opinions. We build that first. Then a person edits for tone. Without those steps, AI drafts read the same as everyone else.',
    },
    {
      q: 'How long does it take to write a blog post with AI?',
      a: 'A researched first draft can take about 20 minutes. Review and edits add more. Bloggers report about four hours per post on average (Orbit Media, 2024), so the saving is mostly in the draft.', // TODO(owner): confirm timing
    },
    {
      q: 'Can AI schedule my social media posts?',
      a: 'Yes. Your automation can draft posts, wait for your approval, then schedule them to LinkedIn, X and Instagram. You can message it in Slack, like "schedule the LinkedIn post for tomorrow 10am".',
    },
    {
      q: 'Who owns the content and the workflow?',
      a: 'You do. It runs in your accounts. You keep every draft, post and automation if you leave.', // TODO(owner): confirm policy
    },
    {
      q: 'What affects the cost of content automation?',
      a: 'Scope: posts per month, channels, how much research each piece needs, and how many review rounds you want. Tool subscriptions are separate. [Book a call](/contact) and we size a monthly plan to your goal.',
    },
    {
      q: 'How long until the first post goes live?',
      a: 'Most setups publish a first post in about five days: voice guide, topic plan, then a draft you approve. Timing depends on how fast you review.', // TODO(owner): confirm
    },
    {
      q: 'Will you publish without my approval?',
      a: 'No. Nothing goes live until you approve it, unless you set a rule for low-risk posts. Facts and claims always get a human check.',
    },
  ],
  products: [
    {
      slug: 'seo-blog-content',
      name: 'SEO blog content',
      keyword: 'AI SEO blog content',
      oneLiner: 'Researched blog posts that answer real search questions.',
      answer:
        'SEO blog content automation finds the questions your buyers search, then drafts posts that answer them. Your automation handles keyword research, outline, draft, images, and scheduling. A person checks facts and voice before publishing. You get steady posts without a writer on payroll.',
      persona: 'ira',
      channels: ['WordPress', 'Webflow', 'Notion', 'Slack'],
      kpi: { value: '~20 min', label: 'to a researched first draft', placeholder: true }, // TODO(owner)
      timeToLive: 'First post in ~5 days', // TODO(owner)
      caseStudy: {
        client: 'blancora',
        title: 'Blancora: a steady blog without a full-time writer',
        problem: 'The blog went quiet for weeks between posts.',
        built: 'Researched, fact-checked SEO posts, scheduled to the site.',
        result: '[N] posts a month, each checked by a person.',
        placeholder: true,
      }, // TODO(owner): confirm client and real result
      reading: ['/blog/educational/google-ai-search-optimization-guide', '/blog/ai-and-automation/ai-strategy-real-world-outcomes'],
      includes: [
        'Keyword and question research',
        'Outline, draft and meta tags',
        'Source links for every stat',
        'Human fact check and voice edit',
        'Scheduling to your CMS',
      ],
      excludes: ['Guaranteed rankings', 'Link building', 'Posts with no human review'],
      page: {
        title: 'AI SEO Blog Content Service for Business | Website Vikreta',
        description:
          'AI SEO blog content for business. Your automation researches, drafts and schedules posts that answer real searches. A person checks every fact before it ships.',
        h1: ['AI SEO blog content.', 'Facts checked.'],
        heroSub: 'Researched posts that answer real searches. A person checks every fact.',
        demo: {
          kind: 'doc',
          title: 'From keyword to scheduled post',
          docTitle: 'Blog post brief',
          fields: [
            { label: 'Keyword', value: 'automate invoice reminders' },
            { label: 'Search intent', value: 'How-to' },
            { label: 'Length', value: '1,200 words' },
            { label: 'Sources', value: '3 linked' },
          ],
          status: ['Researched', 'Drafted', 'Fact check', 'Approved', 'Scheduled'],
        },
        steps: [
          { title: 'Pick topics', body: 'We find the questions your buyers search and rank them by fit.' },
          { title: 'Draft', body: 'Your automation writes an outline, then a draft, with links to every source.' },
          { title: 'Check', body: 'A person checks facts, tone and originality. You get the final say.' },
          { title: 'Publish', body: 'Your automation schedules the post to your site and shares it on your socials.' },
        ],
        faqs: [
          {
            q: 'Can AI write SEO blog posts that actually rank?',
            a: 'It can, when the post is accurate, useful and matched to a real search. Ranking depends on your site and competition too. We cannot promise positions. We make the content good and consistent.',
          },
          {
            q: 'Will Google penalize AI-written blog posts?',
            a: 'Google says it rewards helpful content however it is made. Spam and copied text get hit. We add original structure, linked sources and a human edit to every post.',
          },
          {
            q: 'How do you check facts in AI blog posts?',
            a: 'Every stat gets a source link. A person opens each source and confirms the number and year before we publish. If we cannot verify it, we cut it.',
          },
          {
            q: 'How many posts can I get per month?',
            a: 'It depends on your plan and your review speed. Most teams start with a few posts a week. Send us your goal on the call and we will size it.',
          },
          {
            q: 'Do you plagiarize or copy competitors?',
            a: 'No. We write fresh from sources and run an originality check. Quotes are short, credited and linked.',
          },
        ],
        related: ['content-automation/social-media-content', 'ai-ugc-ads/ai-spokesperson-videos'],
      },
    },
    {
      slug: 'social-media-content',
      name: 'Social media content',
      keyword: 'AI social media content automation',
      oneLiner: 'Posts drafted and scheduled by message.',
      answer:
        'Social media content automation drafts posts for LinkedIn, X and Instagram, then schedules them after you approve. You can message it in Slack: "schedule a LinkedIn post tomorrow at 10am". It writes the post, shows you a card, and queues it. Nothing posts without your yes.',
      persona: 'ira',
      channels: ['LinkedIn', 'X', 'Instagram', 'Slack'],
      kpi: { value: '[N]', label: 'posts per week, scheduled', placeholder: true }, // TODO(owner)
      timeToLive: 'Live in ~5 days', // TODO(owner)
      caseStudy: {
        client: 'sustainable-bitcoin-protocol',
        title: 'Sustainable Bitcoin Protocol: posts by message',
        problem: 'Social posts depended on one busy founder remembering to write.',
        built: 'Your automation drafts in Slack, the founder approves, and posts schedule themselves.',
        result: '[N] posts a week, scheduled after approval.',
        placeholder: true,
      }, // TODO(owner): confirm client and real result
      reading: ['/blog/ai-and-automation/establishing-human-oversight-automation', '/blog/ai-and-automation/ai-automation-connecting-tools'],
      includes: [
        'Post drafts in your voice',
        'Scheduling to LinkedIn, X and Instagram',
        'Approve-first flow in Slack or WhatsApp',
        'Carousel and image copy',
      ],
      excludes: ['Paid social management', 'Replying to comments as you', 'Auto-posting without approval'],
      page: {
        title: 'AI Social Media Content Automation | Website Vikreta',
        description:
          'AI social media content for LinkedIn, X and Instagram. Message your automation to draft and schedule posts. You approve each one. Run in your own accounts.',
        h1: ['AI social media content.', 'Schedule by message.'],
        heroSub: 'Draft in chat, approve, and it posts to LinkedIn, X and Instagram.',
        demo: {
          kind: 'chat',
          channel: 'team',
          title: 'Schedule a post by message a post',
          messages: [
            { from: 'Shubham', text: 'Ira, schedule a LinkedIn post tomorrow 10am about our new AI HR page.' },
            { from: 'ira', text: 'Draft is ready. Short hook, three bullets, one link. Want a different tone?' },
            { from: 'Shubham', text: 'Perfect. Schedule it.' },
            {
              from: 'ira',
              text: 'Scheduled for tomorrow, 10:00 AM.',
              attachment: { kind: 'card', label: 'LinkedIn post, scheduled', meta: 'Tomorrow 10:00 AM' },
            },
          ],
        },
        steps: [
          { title: 'Connect', body: 'Link your social accounts and pick where you chat with it.' },
          { title: 'Brief by message', body: 'Give the topic and time. We draft it.' },
          { title: 'Approve', body: 'You edit or approve. Nothing posts until you do.' },
          { title: 'Schedule', body: 'Your automation queues it and tells you when it is live.' },
        ],
        faqs: [
          {
            q: 'Can AI schedule social media posts for me?',
            a: 'Yes. Your automation drafts the post, you approve it, and it schedules it to LinkedIn, X or Instagram. You can ask in Slack in plain English, like a teammate.',
          },
          {
            q: 'Will AI posts sound like me?',
            a: 'They can, with a voice guide built from your past posts. We tune it in the first week. You still approve every post, so tone stays yours.',
          },
          {
            q: 'Is it safe to automate LinkedIn posting?',
            a: 'Scheduling through approved tools is fine. Mass auto-comments and fake engagement are not, and we do not build them. Check each platform\'s terms. We follow them.',
          },
          {
            q: 'Can the automation reply to comments for me?',
            a: 'Not by default. She can draft replies for you to approve. We avoid auto-replies that could say the wrong thing in your name.',
          },
        ],
        related: ['content-automation/seo-blog-content', 'workflow-automation/ai-teammates'],
      },
    },
    {
      slug: 'content-repurposing',
      name: 'Content repurposing',
      keyword: 'AI content repurposing',
      oneLiner: 'One post becomes five, across every channel.',
      answer:
        'Content repurposing turns one blog, call, or video into posts for each channel. Your automation pulls the key points and rewrites them for LinkedIn, X, Instagram, and email. Each version is made for its channel, not copy-pasted. You approve, then it schedules.',
      persona: 'ira',
      channels: ['LinkedIn', 'X', 'Instagram', 'Email'],
      kpi: { value: '[N]', label: 'assets from each source piece', placeholder: true }, // TODO(owner)
      timeToLive: 'Live in ~3 days', // TODO(owner)
      includes: [
        'Key-point extraction',
        'Channel-specific rewrites',
        'Carousel and short-form copy',
        'Approval and scheduling',
      ],
      excludes: ['Video editing', 'Transcribing poor audio'],
    },
    {
      slug: 'newsletter-automation',
      name: 'Newsletter automation',
      keyword: 'AI newsletter automation',
      oneLiner: 'A weekly newsletter drafted from your best content.',
      answer:
        'Newsletter automation gathers your latest posts and updates and drafts the weekly email. Your automation writes the subject lines, the intro, and the links. You review and send from your own email tool. Open and click data comes back so the next issue gets better.',
      persona: 'ira',
      channels: ['Mailchimp', 'Email'],
      kpi: { value: '[N]', label: 'minutes to draft each issue', placeholder: true }, // TODO(owner)
      timeToLive: 'Live in ~4 days', // TODO(owner)
      includes: [
        'Issue template in your brand',
        'Subject line options',
        'Pulls from your latest content',
        'Send-ready draft in your email tool',
      ],
      excludes: ['List building', 'Buying email lists'],
    },
    {
      slug: 'content-calendar',
      name: 'Content calendar',
      keyword: 'AI content calendar',
      oneLiner: 'A month of topics planned from real customer questions.',
      answer:
        'An AI content calendar plans your month of posts. Your automation starts from your keywords, sales questions, and product launches, then maps each topic to a channel and date. You move or cut anything. Approved items flow straight into drafting and scheduling.',
      persona: 'ira',
      channels: ['Notion', 'Google Sheets', 'Slack'],
      kpi: { value: '[N]', label: 'days to plan a full month', placeholder: true }, // TODO(owner)
      timeToLive: 'Live in ~3 days', // TODO(owner)
      includes: [
        'Topic research from search and sales',
        'Calendar in Notion or Sheets',
        'Channel and date mapping',
        'Monthly refresh',
      ],
      excludes: ['Strategy for new brands with no data', 'Paid campaign planning'],
    },
  ],
}
