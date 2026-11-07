import type { Branch, Demo } from '../types'

// TODO(owner): swap both beforeAfter images for Simpli Home assets (product still + Ira ad frame/video).
const ugcDemo: Demo = {
  kind: 'beforeAfter',
  title: 'Product still to UGC-style ad',
  before: {
    src: '/our-services/ai-automation/ai-generated-ugc-content-automation.webp',
    alt: 'A plain product still before it becomes a video ad',
  },
  after: {
    src: '/wv/personas/ira-front.webp',
    alt: 'Ira, our AI presenter, ready to present the product on camera',
  },
  caption: 'One product still in. A presenter-led ad out. Every presenter is labeled AI on every cut.',
}

export const branch: Branch = {
  slug: 'ai-ugc-ads',
  name: 'AI UGC Ads',
  navLabel: 'AI UGC Ads',
  persona: 'ira',
  title: 'AI UGC Ads for Ecommerce and D2C Brands | Website Vikreta',
  description:
    'AI UGC video ads for D2C and ecommerce. Get 10 ad variants in days, with a disclosed AI presenter. Test more hooks without booking creators. Done for you.',
  h1: ['Ad creatives by the dozen.', 'Not by the week.'],
  usp: 'One product still becomes 24 ad variants by Monday.', // TODO(owner): confirm turnaround ('24 variants by Monday')
  heroSub: 'Send a product link. Get disclosed AI-presenter ads to test on Meta and TikTok.',
  scenarios: [
    // TODO(owner): real photo
    { industry: 'D2C skincare', photo: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&q=70&auto=format&fit=crop', alt: 'Skincare bottles and a jade roller on a striped towel', line: 'Monday 9am: 24 ad variants ready for a skincare launch, from one [AI UGC video ads](/services/ai-automations/ai-ugc-ads/ai-ugc-video-ads) brief.' }, // TODO(owner): confirm turnaround,
    // TODO(owner): real photo
    { industry: 'Gyms', photo: 'https://images.unsplash.com/photo-1722925541142-5db2668ca492?w=1200&q=70&auto=format&fit=crop', alt: 'A woman lifting a barbell in a gym', line: 'A gym owner tests six hooks for the new-year offer by Friday.' },
    // TODO(owner): real photo
    { industry: 'Edtech', photo: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=1200&q=70&auto=format&fit=crop', alt: 'A person typing on a laptop at a desk', line: 'An edtech founder gets eight course-launch ads without booking one creator.' },
  ],
  shifts: [
    { before: '2 weeks for 3 creator videos', after: '24 variants by Monday' }, // TODO(owner): confirm turnaround
    { before: 'One hook, guessed', after: 'Ten hooks, tested' },
    { before: 'Reshoot to change a line', after: 'Edit the script, re-render' },
  ],
  // TODO(owner): youtubeId once recorded
  video: { title: 'Watch us make 10 ad variants (60s)', poster: '/our-services/ai-automation/ai-generated-ugc-content-automation.webp' },
  tools: ['shopify', 'meta', 'tiktok', 'youtube', 'canva', 'elevenlabs', 'kling', 'slack'],
  clients: ['simpli-home', 'boompanda', 'blancora'],
  pairsWith: ['content-automation', 'workflow-automation'],
  reading: ['/blog/ai-and-automation/establishing-human-oversight-automation', '/blog/business-growth/ai-automation-roi'],
  lead: 'An AI presenter presents your product on camera. You get a batch of ad variants to test, labeled as AI, without waiting on creators.',
  answerQ: 'What are AI UGC ads?',
  answer:
    'AI UGC ads are short, creator-style videos made with an AI presenter instead of a hired creator. You send a product and a brief. We write the hooks, generate the video, and cut variants for Meta and TikTok. The presenter is disclosed as AI. Nobody is posed as a real customer. See [AI UGC video ads](/services/ai-automations/ai-ugc-ads/ai-ugc-video-ads) for what is included.',
  demo: ugcDemo,
  stats: [
    {
      value: '79%',
      label: 'of shoppers say user-generated content affects what they buy.',
      source: { name: 'Stackla (Nosto) consumer survey', year: 2019, url: 'https://www.nosto.com/blog/' },
    },
    // TODO(owner): confirm delivery SLA
    { value: '10 in 48h', label: 'ad variants, delivered in 48 hours.', placeholder: true },
    { value: '20 to 1', label: 'hours a week of manual work at Simpli Home, using AI UGC ads and content automation.' },
  ],
  steps: [
    { title: 'Brief', body: 'Send the product, the offer, and who you sell to. A 20-minute call is enough.' },
    { title: 'Hooks and scripts', body: 'We write a batch of hooks. You pick the ones that sound like your brand.' },
    { title: 'Generate', body: 'Our AI presenter, or your own, delivers each script. We cut each one for the right format.' },
    { title: 'Test and learn', body: 'You run the ads. We send new variants based on what held attention.' },
  ],
  integrations: ['Meta Ads Manager', 'TikTok Ads', 'Shopify', 'Google Drive', 'Canva', 'Slack'],
  industries: ['D2C and ecommerce', 'Agencies', 'Edtech', 'Local businesses'],
  compliance:
    'The FTC rule on fake reviews and testimonials (16 CFR 465, in force since October 2024) covers AI personas posing as customers. Our presenter is always disclosed as AI and never shown as a customer. We add the AI-content labels Meta and TikTok ask for, and we make no claims you cannot back up.',
  proof: {
    client: 'Simpli Home',
    // TODO(owner): add a second metric (views, CTR, cost per creative) when approved.
    result: 'Simpli Home cut 20 hours a week of manual work to 1, using AI UGC ads and content automation.',
  },
  faqs: [
    {
      q: 'Are AI UGC ads effective?',
      a: 'They can be, if the hook and offer are good. The video format matters less than the first three seconds. The real gain is volume: you test many hooks fast and keep the winners. We do not promise a lift. We promise more tests per week.',
    },
    {
      q: 'AI UGC vs real creators: which is better?',
      a: 'Real creators win on trust and real use of your product. AI wins on speed, volume, and cost of testing. Many brands use both: AI to find the hook, a creator to shoot the winner. We build the AI side.',
    },
    {
      q: 'Is it legal to use an AI presenter in ads?',
      a: 'Yes, if you disclose it and do not mislead. The FTC 2024 rule on fake reviews covers AI personas posing as customers, so the presenter is always shown as AI, never a customer. We also follow Meta and TikTok AI-content rules.',
    },
    {
      q: 'Do I have to label AI ads on Meta and TikTok?',
      a: 'Often, yes. Both platforms ask advertisers to label realistic AI-generated video, and the rules change. We set the label for you at upload and check the current policy before each batch.',
    },
    {
      q: 'Can I use my own face or brand character?',
      a: 'Yes. Use our presenter, or your own presenter built with written consent through our [AI spokesperson videos](/services/ai-automations/ai-ugc-ads/ai-spokesperson-videos). We never clone anyone without a signed release.',
    },
    {
      q: 'What do you need from me to start?',
      a: 'A product link, a few photos, your offer, and your target buyer. If you have old ads that worked, send those too. We handle scripts, video, and cuts.',
    },
    {
      q: 'How many ad variants do I get?',
      a: 'A typical first batch is about 10 variants, built from a few hooks and cuts. It usually goes live in about two days, depending on the brief and your approvals.', // TODO(owner): confirm SLA
    },
    {
      q: 'What drives the cost of AI UGC ads?',
      a: 'Scope: the number of variants, video length, presenter styles, revision rounds and formats. Ad spend is separate and paid to the platform. [Book a call](/contact) and we size a first batch around your goal.',
    },
  ],
  products: [
    {
      slug: 'ai-ugc-video-ads',
      name: 'AI UGC video ads',
      keyword: 'AI UGC video ads',
      oneLiner: 'Creator-style video ads, made fast, labeled AI.',
      answer:
        'AI UGC video ads are short vertical videos where an AI presenter talks to camera about your product, like a creator would. We write the script, generate the video, and cut it for Meta and TikTok. The presenter is disclosed as AI. You get files ready to upload.',
      persona: 'ira',
      channels: ['Meta', 'TikTok', 'YouTube Shorts'],
      // TODO(owner): confirm number
      kpi: { value: '10 in 48h', label: 'ad variants delivered', placeholder: true },
      timeToLive: 'First batch in ~2 days', // TODO(owner): confirm
      caseStudy: {
        client: 'simpli-home',
        title: 'Simpli Home: ad creative without the weekly grind',
        problem: 'Making ad creative and posts by hand took about 20 hours a week.',
        built: 'AI UGC video ads and content automation, with a disclosed AI presenter.',
        result: 'Manual work dropped from 20 hours a week to 1.',
      },
      reading: ['/blog/ai-and-automation/establishing-human-oversight-automation', '/blog/business-growth/ai-automation-roi'],
      includes: [
        'Hooks and scripts in your brand voice',
        'AI presenter video in 9:16 and 1:1',
        'Captions and on-screen text',
        'Platform AI-content labeling',
        'Revisions on each batch',
      ],
      excludes: [
        'Ad spend or media buying',
        'Real customer testimonials',
        'Claims we cannot verify',
      ],
      page: {
        title: 'AI UGC Video Ads for Shopify and D2C | Website Vikreta',
        description:
          'AI UGC video ads for Shopify and D2C brands. A disclosed AI presenter, scripts, and 10 variants ready for Meta and TikTok. Done for you by Website Vikreta.',
        h1: ['AI UGC video ads.', 'Made in days.'],
        heroSub: 'Creator-style video ads from a product link. The presenter is disclosed as AI.',
        demo: ugcDemo,
        steps: [
          { title: 'Send the product', body: 'A link, photos, and your offer. Tell us who buys it and why.' },
          { title: 'Pick hooks', body: 'We write a batch of hooks and scripts. You approve or edit them.' },
          { title: 'We generate', body: 'The AI presenter delivers each script. We cut every file for Meta and TikTok.' },
          { title: 'You test', body: 'Upload, run, and send us results. We make the next batch from what worked.' },
        ],
        faqs: [
          {
            q: 'Are AI UGC video ads effective for ecommerce?',
            a: 'They work when the hook is sharp and the offer is clear. The tool is not the point. Speed is: you can test ten angles in the time one creator shoot takes. Keep the winners and drop the rest.',
          },
          {
            q: 'How are AI UGC ads different from real UGC?',
            a: 'Real UGC comes from real customers or paid creators. AI UGC uses a disclosed AI presenter. It is faster and cheaper to test, but it is not a customer review, and we never present it as one.',
          },
          {
            q: 'Will Meta or TikTok reject AI-made ads?',
            a: 'Not for being AI, but both ask you to label realistic AI video, and ads must still follow normal policy. We set the labels and avoid banned claims. Policies change, so we check before each batch.',
          },
          {
            q: 'What formats do I get?',
            a: 'Vertical 9:16 for Reels, TikTok and Shorts, plus square 1:1 where needed. Captions are burned in. Send other sizes in your brief.',
          },
          {
            q: 'Can the presenter look like my brand?',
            a: 'You can use our presenter, or an AI presenter built for you with signed consent. We style the setting, wardrobe and voice to fit your brand.',
          },
        ],
        related: ['ai-ugc-ads/ai-spokesperson-videos', 'content-automation/social-media-content'],
      },
    },
    {
      slug: 'ai-spokesperson-videos',
      name: 'AI spokesperson videos',
      keyword: 'AI spokesperson video for business',
      oneLiner: 'One AI face for your explainers, launches, and updates.',
      answer:
        'An AI spokesperson is a digital presenter that reads your script on camera. Use it for product demos, onboarding clips, launch news, and ads. You can use our presenter or your own AI presenter. It is always disclosed as AI. Update a line, and the video is remade without a reshoot. Pair it with [ad hooks and scripts](/services/ai-automations/ai-ugc-ads/ad-hooks-and-scripts) for ads.',
      persona: 'ira',
      channels: ['Web', 'Email', 'Social', 'Sales decks'],
      kpi: { value: '[N]', label: 'videos per month, no reshoots', placeholder: true }, // TODO(owner)
      timeToLive: 'Live in ~5 days', // TODO(owner): confirm
      caseStudy: {
        client: 'boompanda',
        title: 'Boompanda: one AI face for product explainers',
        problem: 'Every product update meant a new shoot and a long wait.',
        built: 'An AI spokesperson template, disclosed as AI, with scripts the team approves.',
        result: '[N] videos a month, no reshoots.',
        placeholder: true,
      }, // TODO(owner): confirm client and real result
      reading: ['/blog/ai-and-automation/ai-strategy-real-world-outcomes', '/blog/ai-and-automation/establishing-human-oversight-automation'],
      includes: [
        'Presenter set up (ours or your own, with consent)',
        'Script writing and review',
        'Video renders in the sizes you need',
        'Voice and language options',
        'Simple template for repeat videos',
      ],
      excludes: [
        'Cloning anyone without a signed release',
        'Live video calls',
        'Legal or medical claims without your sign-off',
      ],
      page: {
        title: 'AI Spokesperson Videos for Business | Website Vikreta',
        description:
          'AI spokesperson videos for your product, onboarding, and ads. Use our presenter or build your own, disclosed as AI. Scripts, edits, and updates handled.',
        h1: ['AI spokesperson videos.', 'One face, every video.'],
        heroSub: 'One AI face for explainers, launches and updates. Change a line, skip the reshoot.',
        demo: {
          kind: 'chat',
          channel: 'team',
          title: 'Brief us, get a video',
          messages: [
            { from: 'Shubham', text: 'Ira, make a 30-second launch video for the new plan. Friendly tone.' },
            { from: 'ira', text: 'Script is ready. Three lines, one call to action. Want to review before I render?' },
            { from: 'Shubham', text: 'Looks good. Go.' },
            {
              from: 'ira',
              text: 'Done. 9:16 and 1:1 are in the folder. I marked it as AI-presented.',
              attachment: { kind: 'card', label: 'Launch video, 30s', meta: '9:16 and 1:1' },
            },
          ],
        },
        steps: [
          { title: 'Choose a face', body: 'Use our presenter, or we build your own AI presenter. Your own needs written consent.' },
          { title: 'Write the script', body: 'Send bullets. We write the script in your voice and you approve it.' },
          { title: 'Render', body: 'The presenter reads it on camera. We add captions and cut each size.' },
          { title: 'Update anytime', body: 'Change a line, and we remake the video. No reshoot, no studio.' },
        ],
        faqs: [
          {
            q: 'What is an AI spokesperson?',
            a: 'It is a digital presenter that delivers your script on video. It looks and sounds like a person but it is AI, and it is labeled that way. Teams use it for demos, onboarding, and ads without filming each time.',
          },
          {
            q: 'Do I have to disclose that it is AI?',
            a: 'Yes, and we do it for you. The FTC expects honesty in endorsements, and platforms ask for AI labels. The presenter is never shown as a real customer or a real employee.',
          },
          {
            q: 'Can you make an AI version of me or my founder?',
            a: 'Yes, with a signed release and your approval of every output. We do not build a likeness of anyone who has not agreed in writing.',
          },
          {
            q: 'AI spokesperson vs hiring a presenter: which should I pick?',
            a: 'Hire a person for brand films and high-trust moments. Use an AI spokesperson for repeat, fast-changing content like updates, how-tos and ad tests. Many teams do both.',
          },
        ],
        related: ['ai-ugc-ads/ai-ugc-video-ads', 'workflow-automation/ai-teammates'],
      },
    },
    {
      slug: 'ad-hooks-and-scripts',
      name: 'Ad hooks and scripts',
      keyword: 'AI ad hooks and scripts',
      oneLiner: 'A batch of hooks and scripts to test, in your voice.',
      answer:
        'Ad hooks and scripts are the first lines and short scripts that decide if someone keeps watching. We write a batch of angles from your product, reviews, and past winners. You approve the ones you like. A human reads every line before it ships.',
      persona: 'ira',
      channels: ['Meta', 'TikTok', 'YouTube Shorts'],
      kpi: { value: '[N]', label: 'hooks tested per month', placeholder: true }, // TODO(owner)
      timeToLive: 'First batch in ~2 days', // TODO(owner)
      includes: [
        'Research on your product and buyer',
        '20+ hooks per round',
        'Short scripts for the best angles',
        'Brand voice check',
      ],
      excludes: ['Video production (see AI UGC video ads)', 'Medical or income claims'],
    },
    {
      slug: 'bulk-ad-variations',
      name: 'Bulk ad variations',
      keyword: 'bulk ad creative variations',
      oneLiner: 'Swap hooks, faces, and offers to make many ads fast.',
      answer:
        'Bulk ad variations take one winning ad and remix it. We change the hook, the presenter, the offer, and the cut to make many versions. You test them against each other and keep what works. It is how you beat ad fatigue without starting over each time.',
      persona: 'ira',
      channels: ['Meta', 'TikTok'],
      kpi: { value: '[N]', label: 'variants per winning ad', placeholder: true }, // TODO(owner)
      timeToLive: 'Live in ~3 days', // TODO(owner)
      includes: [
        'Hook and offer swaps',
        'Format cuts for each placement',
        'Naming system so results are easy to read',
        'Weekly refresh option',
      ],
      excludes: ['Media buying', 'Landing page changes'],
    },
    {
      slug: 'product-image-to-video',
      name: 'Product image to video',
      keyword: 'product image to video ad',
      oneLiner: 'Turn product photos into short video ads.',
      answer:
        'Product image to video turns your still photos into short motion ads. We add movement, text, and a voiceover or presenter. It suits catalogs with many items and little video. Product details stay accurate: we check color, shape, and text against your photos.',
      persona: 'ira',
      channels: ['Meta', 'TikTok', 'Shopify'],
      kpi: { value: '[N]', label: 'products turned into video', placeholder: true }, // TODO(owner)
      timeToLive: 'Live in ~3 days', // TODO(owner)
      includes: [
        'Motion and camera moves from stills',
        'Text overlays and captions',
        'Optional AI presenter or voiceover',
        'Checks that the product looks right',
      ],
      excludes: ['Product photography', 'Changing how the product looks'],
    },
  ],
}
