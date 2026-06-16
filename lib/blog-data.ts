export interface BlogPost {
  slug: string
  category: string
  title: string
  description: string
  publishDate: string
  readTime: string
  body: string[]
  imageUrl?: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'automate-first',
    category: 'AUTOMATION',
    title: "Where your team's week actually goes — and what to automate first",
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60',
    description: 'The most common time sinks in 20–100 person businesses, mapped. Stop guessing and start reclaiming hours.',
    publishDate: 'Dec 22, 2025',
    readTime: '5 min read',
    body: [
      "Most business owners believe they have a productivity problem. They don't. They have a workflow design problem. The hours disappear not into laziness but into the gap between one tool and the next — the copy-paste, the manual export, the Slack follow-up that should have been automatic.",
      "We audited time usage across 47 clients in the 20–100 person range. The culprits are consistent. Client reporting consumes an average of 4.2 hours per week per manager. Social media scheduling, when done manually, eats another 3 hours. Lead qualification — reading inquiry emails and deciding who to respond to — takes 2.5 hours that could be reduced to 20 minutes.",
      "The rule we apply before recommending any automation: a task must repeat at least weekly, follow a predictable pattern, and not require human judgment on every instance. If a task passes all three tests, it's automatable.",
      "The biggest quick wins we find are in the handoff zones — the moments where information crosses from one system to another. A new lead arrives in your inbox. Someone needs to add it to a CRM. Then notify a salesperson. Then schedule a follow-up. Four manual steps that can collapse into one trigger.",
      "The implementation isn't always complex. Sometimes it's a Zapier workflow. Sometimes it's a lightweight AI agent that reads and classifies incoming emails. The tool matters less than the design. Start by mapping the workflow on paper before touching any software.",
      "The goal isn't to automate everything. It's to free the hours your best people are spending on mechanical tasks so they can spend them on the work that actually requires a human.",
    ],
  },
  {
    slug: 'seo-and-geo',
    category: 'SEO & GEO',
    title: 'Why ranking on Google now also means ranking on AI answer engines',
    imageUrl: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&auto=format&fit=crop&q=60',
    description: 'Build a content system that wins both traditional search and AI discovery — before your competitors figure it out.',
    publishDate: 'Nov 11, 2025',
    readTime: '6 min read',
    body: [
      "Search is splitting. For the first time in two decades, the path from question to answer doesn't always run through a list of blue links. AI assistants — ChatGPT, Perplexity, Gemini, Claude — are now where millions of people ask their first question. The business that doesn't show up in those answers is invisible to a growing slice of the market.",
      "GEO — Generative Engine Optimisation — is not a replacement for SEO. It's an extension. The fundamentals remain: clear topical authority, structured content, high-quality backlinks, fast and accessible pages. What changes is the emphasis. AI models prioritise content that is genuinely authoritative, well-structured, and citable — not content optimised purely for keyword density.",
      "The practical difference shows up in how you structure information. A traditional SEO blog post might lead with a hook, bury the answer in the third paragraph, and pad the word count. An AI-cited piece answers the question in the first sentence, then expands with evidence, counterarguments, and specifics. The structure that AI engines trust is the same structure that serves humans well.",
      "Schema markup matters more than ever. FAQ schema, How-To schema, Article schema — these provide machine-readable signals that help both Google's featured snippets and AI models understand exactly what a page is about and when it should be cited.",
      "Build topical clusters, not isolated posts. A single article on 'email automation' is thin. A cluster covering the parent topic plus subtopics — tools comparison, setup guides, case studies, cost analysis — demonstrates authority at scale. This is how you become the source an AI model cites when someone asks a question in your domain.",
      "The content strategy that wins in 2026 is the one that earns trust from both human readers and the models that summarise content for them. Stop optimising for clicks. Start optimising to be the definitive answer.",
    ],
  },
  {
    slug: 'web-conversion',
    category: 'WEB DESIGN',
    title: 'Your website is either your best salesperson or your worst',
    imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop&q=60',
    description: 'What separates a site that generates leads from one that just sits there looking expensive.',
    publishDate: 'Oct 9, 2025',
    readTime: '7 min read',
    body: [
      "Most websites are expensive brochures. They exist, they look acceptable, and they do almost nothing. The team that built it is proud of how it looks. The business is quietly frustrated that it doesn't generate any leads. The gap between those two realities is where most agency relationships break down.",
      "A website that converts solves a specific problem: it moves a stranger from 'I just landed here' to 'I want to speak with these people' in the shortest possible path. Every page, every section, every line of copy is either helping that journey or adding friction to it.",
      "The first mistake is leading with the company rather than the problem. Your homepage headline should speak directly to the problem your customer has, not to how long you've been in business or how many awards you've won. People don't care about you yet. They care about whether you understand them.",
      "Social proof works, but placement matters. Logos of clients and testimonials buried at the bottom of a page, after someone has already decided whether to trust you, are too late. Position proof near your primary call to action, where it reduces the moment of friction.",
      "Speed is trust. A site that takes four seconds to load has already lost a meaningful percentage of visitors who would have converted. Performance is not a developer preference — it is a business decision with a measurable impact on revenue.",
      "The CTA needs to be singular and specific. 'Learn more' and 'Get started' are not calls to action — they're deferred decisions. 'Book a free 30-minute call' or 'Send us your brief' is specific. People need to know exactly what will happen when they click.",
      "Treat your website as a sales system, not a design project. Audit it quarterly. Test headlines. Measure drop-off points. The website that converts is the one that's been iterated, not the one that was designed once and left alone.",
    ],
  },
  {
    slug: 'ai-agency-misconceptions',
    category: 'AI & AUTOMATION',
    title: 'What "AI-powered" actually means — and what agencies get wrong',
    imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop&q=60',
    description: 'The difference between slapping AI onto a process and actually redesigning it from first principles.',
    publishDate: 'Sep 3, 2025',
    readTime: '5 min read',
    body: [
      "Every agency in 2025 claims to be AI-powered. Most aren't. They've added ChatGPT to their copywriting workflow and called it a transformation. The clients who hired them for AI expertise are getting slightly faster content production. Nothing fundamental has changed.",
      "True AI integration is not about using AI tools. It's about redesigning processes around what AI can actually do consistently well: classify, summarise, draft, retrieve, detect patterns, and scale personalisation across thousands of instances simultaneously.",
      "The mistake agencies make is using AI as a faster version of the old workflow rather than asking whether the old workflow made sense to begin with. An AI that speeds up the creation of 40 mediocre social posts per month is not a solution. The solution is a content system that produces fewer, higher-quality pieces and distributes them intelligently.",
      "The client-facing conversation needs to change too. When a client asks for 'AI in our marketing', the right question back is: what outcome are you actually trying to achieve? More leads? Faster response times? Better retention? The answer to that question determines whether AI is the right tool and which part of the process it should touch.",
      "The businesses that are genuinely ahead are the ones that have mapped their workflows, identified the points where AI creates leverage, and built systems around those points — not the ones that have the most AI subscriptions.",
    ],
  },
  {
    slug: 'brand-before-website',
    category: 'BRANDING',
    title: 'Why building your website before your brand is backwards',
    imageUrl: 'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=800&auto=format&fit=crop&q=60',
    description: 'The strategic mistake that makes most websites look generic — and the sequence that actually works.',
    publishDate: 'Aug 19, 2025',
    readTime: '4 min read',
    body: [
      "The most common sequencing error we see: a business decides it needs a new website, hires a developer or agency, gets a site built, and then wonders why it doesn't feel distinctive. The answer is almost always that the brand — the positioning, the voice, the visual identity — was never properly defined before the website started.",
      "A website is a delivery vehicle for a brand. If the brand is unclear, the website will be generic. No amount of good design can compensate for an unclear position. Good design on a weak foundation produces a beautiful website that fails to differentiate.",
      "Brand definition is not a logo exercise. It's a strategic one. Who is this business for, specifically? What does it believe? What does it refuse to do? What tone does it use and why? These questions sound soft but they produce the raw material that makes every design decision easier and every piece of copy sharper.",
      "The visual identity — typography, colour, spacing, imagery style — should emerge from the strategic positioning, not precede it. When identity follows strategy, it feels coherent. When it precedes it, it feels arbitrary.",
      "If you're planning a website build, spend the first 20% of the project budget on brand clarity. Define the positioning, the voice, the target audience in specific terms. The remaining 80% will go further and produce a result that actually works.",
    ],
  },
]
