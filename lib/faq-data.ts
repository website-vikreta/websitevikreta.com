export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const ALL_FAQS: FaqItem[] = [
  {
    id: '1',
    question: 'What does Website Vikreta actually do?',
    answer:
      'We build AI automations, optimize workflows, and design and develop websites, web apps, and mobile apps. We also handle digital marketing and stay on to maintain what we build. One team, start to finish.',
  },
  {
    id: '2',
    question: 'How much does a project cost?',
    answer:
      "Depends on scope. A marketing site and a full automation system aren't priced the same, so we won't quote you a number until we know what you're actually building. Most projects land between [$X and $Y]. You'll get a real figure after a short call, not a \"starting from\" line that never holds up.",
  },
  {
    id: '3',
    question: 'How long does a typical project take?',
    answer:
      "A focused website usually takes 2 to 4 weeks. Automation projects move differently. One image production pipeline we built cut a client's process from 20 hours to 1 hour per collection, and getting there took about [X weeks] of build and testing. We'll give you a real timeline once we know the scope.",
  },
  {
    id: '4',
    question: 'Do you only build websites, or do you handle AI automation too?',
    answer:
      'Both, same team. We build the site, then we build what runs behind it: workflow automation, AI product visuals, WhatsApp agents that handle customer replies. No handoff to a second agency halfway through.',
  },
  {
    id: '5',
    question: "What's your process like?",
    answer:
      "Discovery first, then design, then build, then launch. We work stage by stage so you're approving pieces along the way, not waiting weeks for one big reveal.",
  },
  {
    id: '6',
    question: 'Do I need to know exactly what I want before reaching out?',
    answer:
      "No. Most people who reach out have a problem, not a spec sheet. We'll ask the right questions and shape the solution with you.",
  },
  {
    id: '7',
    question: 'What happens after the site or system launches?',
    answer:
      "We stick around. Launch is when the real work of monitoring and fixing starts, and AI systems especially need tuning once actual usage kicks in.",
  },
  {
    id: '8',
    question: 'What industries or business sizes do you work with?',
    answer:
      "Funded startups, SMBs going digital, and international or high-end clients who need work that holds up. We've built for furniture e-commerce, garage services, and one design partnership that's run three years and counting.",
  },
  {
    id: '9',
    question: 'Can you work with our existing tools and tech stack?',
    answer:
      "Yes. We've built on Shopify, WhatsApp Business API, and delivery-partner integrations, and we work with what you already have instead of asking you to start over.",
  },
  {
    id: '10',
    question: 'How do we get started?',
    answer:
      "Book a call. We'll talk through what you need, and if it's a fit, you'll have a scope and timeline within a few days.",
  },
  {
    id: '11',
    question: 'Do you offer ongoing maintenance, or just one-time builds?',
    answer:
      'Both. Some clients want a one-time build and walk away. Others keep us on for updates and support long-term. Your call.',
  },
]
