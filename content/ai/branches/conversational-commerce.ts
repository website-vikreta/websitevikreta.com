import type { Branch } from '@/content/ai/types'

const baymard = { name: 'Baymard Institute, Cart Abandonment Rate Statistics', year: 2024, url: 'https://baymard.com/lists/cart-abandonment-rate' }

export const branch: Branch = {
  slug: 'conversational-commerce',
  name: 'Conversational Commerce',
  navLabel: 'Conversational Commerce',
  persona: 'arjun',
  title: 'Conversational Commerce: Sell on WhatsApp | Website Vikreta',
  description:
    'Sell inside WhatsApp, Instagram DM and website chat. AI recommends products, sends payment links and recovers abandoned carts. For Shopify and WooCommerce.',
  h1: ['Sell inside', 'the chat.'],
  usp: 'Customers ask, get a recommendation, and pay with a link, all in the chat.',
  heroSub: 'Product help, checkout and cart recovery on WhatsApp, Instagram and your site.',
  scenarios: [
    // TODO(owner): real photo
    { industry: 'D2C skincare', photo: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&q=70&auto=format&fit=crop', alt: 'Skincare bottles and a jade roller on a striped towel', line: 'Which serum for dry skin? Asked on Instagram at 10 pm. The [AI shopping assistant](/services/ai/conversational-commerce/ai-shopping-assistant) picked one and sent the link.' },
    // TODO(owner): real photo
    { industry: 'Online store', photo: 'https://images.unsplash.com/photo-1770013413878-2530e2c3d82b?w=1200&q=70&auto=format&fit=crop', alt: 'Woman checking a package with her phone near a laptop and boxes', line: 'Cart left at checkout on a Tuesday. [Abandoned cart recovery](/services/ai/conversational-commerce/abandoned-cart-recovery) sent one message, and the order went through.' },
    // TODO(owner): real photo
    { industry: 'Coffee and food brand', photo: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=1200&q=70&auto=format&fit=crop', alt: 'A barista using a tablet at a coffee shop counter', line: 'Beans run out in about five weeks. A reorder nudge arrives in week four, with a one-tap link.' },
  ],
  shifts: [
    { before: 'Shoppers leave with questions unanswered', after: 'Answers and picks in the chat' },
    { before: 'Carts sit abandoned', after: 'One message brings them back' },
    { before: 'Repeat orders depend on luck', after: 'A nudge lands before they run out' },
  ],
  // TODO(owner): youtubeId once recorded
  video: { title: 'Watch a cart get recovered (60s)', poster: '/wv/personas/arjun-front.webp' },
  tools: ['whatsapp', 'instagram', 'shopify', 'woocommerce', 'stripe', 'twilio', 'googlesheets', 'slack', 'make'],
  clients: ['simpli-home', 'blancora'],
  pairsWith: ['whatsapp-automation', 'finance-automation'],
  reading: ['/blog/ai-and-automation/ai-automation-connecting-tools', '/blog/business-growth/ai-automation-roi'],
  lead: 'Your store sells inside WhatsApp, Instagram DM and website chat. The AI helps shoppers choose, sends a payment link and brings back abandoned carts.',
  answerQ: 'What is conversational commerce?',
  answer:
    'Conversational commerce means selling through chat instead of only through web pages. A shopper asks about a product on WhatsApp, Instagram DM or your site, gets a recommendation, and pays with a link in the same thread. AI handles the routine questions and hands off to your team when needed. Start with [abandoned cart recovery](/services/ai/conversational-commerce/abandoned-cart-recovery) or an [AI shopping assistant](/services/ai/conversational-commerce/ai-shopping-assistant).',
  demo: {
    kind: 'chat',
    channel: 'whatsapp',
    title: 'Question to paid order in one thread',
    messages: [
      { from: 'user', text: 'Hi, do you have a moisturizer for dry, sensitive skin?' },
      { from: 'arjun', text: 'Hi Dana, I am Arjun, an AI assistant for Fieldhouse Skin. Is it for day or night use?' },
      { from: 'user', text: 'Mostly night.' },
      { from: 'arjun', text: 'Then I would pick the Overnight Barrier Cream. No fragrance, made for sensitive skin. Want the 50 ml or the 100 ml?', attachment: { kind: 'card', label: 'Overnight Barrier Cream', meta: '50 ml or 100 ml' } },
      { from: 'user', text: '50 ml, please.' },
      { from: 'arjun', text: 'Added. Here is your secure checkout link. It holds your cart for 24 hours.', attachment: { kind: 'card', label: 'Checkout link · 1 item', meta: 'Opens your store checkout' } },
      { from: 'user', text: 'Paid, thanks!' },
      { from: 'arjun', text: 'Got it. Your order is confirmed. I will message you when it ships.' },
    ],
  },
  stats: [
    {
      value: '~70%',
      label: 'of online shopping carts are abandoned, on average across studies.',
      source: baymard,
    },
    // TODO(owner): replace with measured recovery rate from first live store
    { value: '[N]%', label: 'of abandoned carts recovered by chat', placeholder: true },
    // TODO(owner): confirm on a live account
    { value: '<10 sec', label: 'to the first reply on a product question', placeholder: true },
  ],
  steps: [
    { title: 'Connect your store', body: 'We link Shopify or WooCommerce so the AI sees your products, stock and carts.' },
    { title: 'Teach it your catalog', body: 'You approve product rules, bundles and what it may recommend or say.' },
    { title: 'Get approved and connected', body: 'We handle the WhatsApp Business API, template approval and Instagram DM access.' },
    { title: 'Launch and tune', body: 'We read real chats for two weeks, fix weak replies and adjust the nudge timing.' },
  ],
  integrations: ['Shopify', 'WooCommerce', 'WhatsApp Business API', 'Instagram DM', 'Stripe', 'Klaviyo', 'Twilio', 'Zapier'],
  industries: ['D2C brands', 'Ecommerce', 'Beauty and skincare', 'Food and beverage', 'Fashion', 'Subscription boxes'],
  compliance:
    'WhatsApp requires opt-in before you message first, and cart or promotional messages outside the 24-hour window need Meta-approved templates. Meta bills per delivered template. Customers can opt out at any time and we honor it at once. Payments run through your own checkout or payment provider. Last reviewed November 2026.',
  faqs: [
    {
      q: 'What is conversational commerce?',
      a: 'It is selling through chat apps like WhatsApp, Instagram DM and website chat. A shopper asks a question, gets a product pick and pays through a link without leaving the thread. AI handles the routine part and your team steps in for anything tricky.',
    },
    {
      q: 'Can I sell on WhatsApp?',
      a: 'Yes, through the official WhatsApp Business API. Customers browse, ask questions and get a checkout link in the chat. You need customer opt-in and Meta-approved templates for first messages. We set up the API, templates and store connection for you.',
    },
    {
      q: 'How does abandoned cart recovery work on WhatsApp?',
      a: 'When a shopper who opted in leaves checkout, your store sends us the cart. The AI messages them with an approved template, answers questions and sends a checkout link. If they ignore it, it stops after your set limit. It never messages people who did not opt in.',
    },
    {
      q: 'What is an AI shopping assistant?',
      a: 'It is a chat agent that knows your catalog. It asks a few questions, recommends products, checks stock and sends the checkout link. It works on WhatsApp, Instagram DM and your site, says it is AI, and passes complex questions to your team.',
    },
    {
      q: 'Does it work with Shopify and WooCommerce?',
      a: 'Yes. We connect to Shopify and WooCommerce for products, stock, carts and orders. Other platforms usually work through an API or Zapier. Tell us your platform on the first call, and we say upfront if something cannot connect.',
    },
    {
      q: 'How do customers pay inside the chat?',
      a: 'They tap a secure payment or checkout link sent in the chat. It opens your own store checkout or a Stripe payment page, so card details never pass through the chat. Your existing payment setup and tax rules stay the same.',
    },
    {
      q: 'How long until it goes live?',
      a: 'Abandoned cart recovery and reorder reminders take about 1 to 2 weeks. The AI shopping assistant takes about 2 to 3 weeks, since it needs your catalog rules. Template approval can add a few days. We confirm a date after mapping your store.',
    },
    {
      q: 'What does it cost, and what is not included?',
      a: 'Cost depends on message volume, channels, catalog size and the systems we connect. We quote after a [short call](/contact). Meta fees and payment fees are separate. We do not message purchased lists, set prices or run refunds without your approval.',
    },
  ],
  products: [
    {
      slug: 'abandoned-cart-recovery',
      name: 'Abandoned cart recovery',
      keyword: 'abandoned cart recovery WhatsApp',
      oneLiner: 'Brings back shoppers who left at checkout, by WhatsApp.',
      answer:
        'Abandoned cart recovery on WhatsApp messages shoppers who left items in their cart and agreed to hear from you. The AI sends a short reminder, answers questions about the product or shipping, and shares a checkout link. It follows your timing and stops after your limit, so it never spams.',
      persona: 'arjun',
      channels: ['WhatsApp', 'SMS'],
      // TODO(owner): replace with measured recovery rate
      kpi: { value: '[N]%', label: 'of abandoned carts recovered', placeholder: true },
      timeToLive: 'Live in ~1 to 2 weeks', // TODO(owner): confirm
      includes: [
        'Cart pulled from Shopify or WooCommerce',
        'Reminder at the times you choose',
        'Replies to shipping, size and stock questions',
        'Checkout link with the cart pre-filled',
        'Stops after your limit or when they buy',
        'Recovered orders tracked in your report',
      ],
      excludes: [
        'Messaging shoppers who have not opted in',
        'Discounts you have not approved',
        'Bulk blasts to cold lists',
      ],
      // TODO(owner): replace placeholder case study with a real client result
      caseStudy: {
        client: 'simpli-home',
        title: 'Carts recovered by one message',
        problem: 'Shoppers left at checkout and never came back.',
        built: 'A short WhatsApp reminder goes out after the cart is left, with the checkout link ready.',
        result: 'Sample: abandoned carts recovered by chat.',
        placeholder: true,
      },
      reading: ['/blog/ai-and-automation/ai-automation-connecting-tools'],
      page: {
        title: 'Abandoned Cart Recovery on WhatsApp | Website Vikreta',
        description:
          'Recover abandoned carts with WhatsApp. AI sends an opt-in reminder, answers questions and shares a checkout link. For Shopify and WooCommerce stores.',
        h1: ['Win back', 'abandoned carts'],
        heroSub: 'A cart left at checkout gets one helpful WhatsApp message, then a paid order.',
        demo: {
          kind: 'chat',
          channel: 'whatsapp',
          title: 'Left cart to paid order',
          messages: [
            { from: 'arjun', text: 'Hi Maya, this is Fieldhouse Skin (AI assistant). You left the Overnight Barrier Cream in your cart. Want me to hold it for you?' },
            { from: 'user', text: 'Does it ship to Canada?' },
            { from: 'arjun', text: 'Yes. Standard shipping to Canada takes 5 to 8 business days. Here is your cart.', attachment: { kind: 'card', label: 'Checkout link · 1 item', meta: 'Cart held for 24 hours' } },
            { from: 'user', text: 'Great, ordering now.' },
            { from: 'arjun', text: 'Thank you. Your order is confirmed and I will message you when it ships.' },
          ],
        },
        steps: [
          { title: 'Connect your store', body: 'Shopify or WooCommerce sends each abandoned cart to the agent, with the shopper\'s opt-in status.' },
          { title: 'Set the timing', body: 'You pick when the message goes out, how many follow-ups are allowed and any approved offer.' },
          { title: 'Answer and send the link', body: 'The AI answers shipping, stock and size questions, then shares the checkout link.' },
          { title: 'Stop at the right time', body: 'It stops when they buy, opt out or hit your limit. Tricky chats go to your team.' },
        ],
        faqs: [
          {
            q: 'Does WhatsApp abandoned cart recovery work?',
            a: 'It can, because chat gets read faster than email and shoppers can reply with a question. About 70 percent of carts are abandoned, per Baymard Institute, so even a small recovery rate adds revenue. Results vary, so we measure recovered orders on your store instead of promising a number.',
          },
          {
            q: 'Is it legal to message abandoned carts on WhatsApp?',
            a: 'Only with consent. The shopper must opt in to WhatsApp messages, for example at checkout, and the first message must be a Meta-approved template. Always include an easy opt-out. In the EU and UK, GDPR and PECR also apply. This is not legal advice.',
          },
          {
            q: 'When should I send an abandoned cart message?',
            a: 'Most stores send the first message within an hour or two of the abandonment, then at most one or two follow-ups over a few days. We start there and adjust using your data, since a $20 item and a $400 item behave differently.',
          },
          {
            q: 'Can I offer a discount in the message?',
            a: 'Yes, if you approve the offer and the limit. We do not add discounts on our own, because constant discounts train shoppers to abandon carts on purpose. Many stores test a message with no discount first.',
          },
          {
            q: 'Does it work with Shopify and WooCommerce?',
            a: 'Yes. Both pass cart data to the agent, and the checkout link opens your normal store checkout. Other platforms usually connect through an API or Zapier. Tell us what you run on the first call.',
          },
        ],
        related: [
          'conversational-commerce/ai-shopping-assistant',
          'whatsapp-automation/whatsapp-lead-follow-up',
          'finance-automation/payment-reminder-automation',
        ],
      },
    },
    {
      slug: 'ai-shopping-assistant',
      name: 'AI shopping assistant',
      keyword: 'AI shopping assistant',
      oneLiner: 'Recommends products and sends the checkout link in chat.',
      answer:
        'An AI shopping assistant answers product questions in WhatsApp, Instagram DM or website chat. It asks what the shopper needs, recommends items from your catalog, checks stock and sends a checkout link. It works day and night, says it is AI and passes tricky questions to your team.',
      persona: 'arjun',
      channels: ['WhatsApp', 'Instagram DM', 'Web chat'],
      // TODO(owner): replace with measured result
      kpi: { value: '[N]%', label: 'of product chats ending in an order', placeholder: true },
      timeToLive: 'Live in ~2 to 3 weeks', // TODO(owner): confirm
      includes: [
        'Trained on your catalog and approved content',
        'Asks needs, then recommends products',
        'Live stock and variant checks',
        'Checkout link with the cart pre-filled',
        'Handoff to your team with the chat attached',
        'Works on WhatsApp, Instagram DM and web chat',
      ],
      excludes: [
        'Claims beyond your approved product info',
        'Medical or legal advice',
        'Changing prices or running refunds',
      ],
      // TODO(owner): replace placeholder case study with a real client result
      caseStudy: {
        client: 'blancora',
        title: 'Product questions answered at any hour',
        problem: 'Shoppers asked which product to pick and left when no one replied.',
        built: 'The assistant asks two questions, recommends a product and sends the checkout link.',
        result: 'Sample: product questions answered in seconds, day and night.',
        placeholder: true,
      },
      reading: ['/blog/ai-and-automation/ai-automation-connecting-tools', '/blog/business-growth/ai-automation-roi'],
      page: {
        title: 'AI Shopping Assistant for WhatsApp & Instagram | Website Vikreta',
        description:
          'An AI shopping assistant that answers product questions, recommends items and sends checkout links on WhatsApp, Instagram DM and your website.',
        h1: ['An AI shopping', 'assistant'],
        heroSub: 'Shoppers ask on WhatsApp or Instagram and get a pick and a checkout link.',
        demo: {
          kind: 'chat',
          channel: 'whatsapp',
          title: 'Question to checkout link',
          messages: [
            { from: 'user', text: 'Hi, I need a gift for my sister. She likes hiking.' },
            { from: 'arjun', text: 'Hi Chris, I am Arjun, an AI assistant for Trailside Goods. Roughly what budget do you have in mind?' },
            { from: 'user', text: 'Under $60.' },
            { from: 'arjun', text: 'Two good picks: the insulated bottle or the merino trail socks set. Both are in stock.', attachment: { kind: 'card', label: 'Bottle or socks set', meta: 'Both in stock' } },
            { from: 'user', text: 'Socks. Size M.' },
            { from: 'arjun', text: 'Size M is in stock. Here is your checkout link.', attachment: { kind: 'card', label: 'Checkout link · 1 item', meta: 'Opens your store checkout' } },
          ],
        },
        steps: [
          { title: 'Load your catalog', body: 'Products, variants, stock and sizing guides sync from your store.' },
          { title: 'Set the rules', body: 'You pick what it may recommend, bundle or say. You approve the tone and the limits.' },
          { title: 'Go live on your channels', body: 'WhatsApp, Instagram DM and website chat share the same brain and catalog.' },
          { title: 'Hand off when needed', body: 'Complaints, custom orders and edge cases go to your team with the full chat.' },
        ],
        faqs: [
          {
            q: 'What is an AI shopping assistant?',
            a: 'It is a chat agent that knows your catalog and helps shoppers choose. It asks a few questions, suggests products, checks stock and sends a checkout link. It runs on WhatsApp, Instagram DM or your website, and tells shoppers it is AI.',
          },
          {
            q: 'Can an AI chatbot recommend products on Instagram?',
            a: 'Yes, through Instagram DM using Meta\'s official messaging tools. It answers product questions from your catalog and sends links. Instagram has its own messaging window and rules, so we set that up and keep the replies within them.',
          },
          {
            q: 'Will it make up product details?',
            a: 'It is built to answer only from your catalog and approved content. If the answer is not there, it says so and hands the chat to your team. We test it against your real questions before launch and review live chats for the first two weeks.',
          },
          {
            q: 'How is this different from a normal chatbot?',
            a: 'A basic chatbot follows a fixed menu. An AI shopping assistant understands a free-text question like "something for dry skin under $40", checks live stock and builds the cart. You still set the rules, and a person can take over any time.',
          },
          {
            q: 'Does it replace my support team?',
            a: 'No. It takes the repeat pre-sale questions so your team can focus on complex ones. For order status, returns and help after the sale, see WhatsApp customer support.',
          },
        ],
        related: [
          'conversational-commerce/abandoned-cart-recovery',
          'whatsapp-automation/whatsapp-lead-follow-up',
          'workflow-automation/crm-automation',
        ],
      },
    },
    {
      slug: 'checkout-in-chat',
      name: 'Checkout in chat',
      keyword: 'WhatsApp payment link checkout',
      oneLiner: 'Builds the cart and sends a secure payment link in the thread.',
      answer:
        'Checkout in chat lets a shopper confirm their cart and pay without leaving WhatsApp or Instagram. The AI builds the order, then sends a secure checkout or payment link from your own store or Stripe. Card details stay on the payment page, and the paid order lands in your store as usual.',
      persona: 'arjun',
      channels: ['WhatsApp', 'Instagram DM', 'Web chat'],
      // TODO(owner): replace with measured result
      kpi: { value: '[N]%', label: 'of chat carts paid within an hour', placeholder: true },
      timeToLive: 'Live in ~2 weeks', // TODO(owner): confirm
      includes: [
        'Cart built from the chat',
        'Secure checkout or Stripe payment link',
        'Order created in your store on payment',
        'Payment confirmation message',
        'Shipping and address collection',
      ],
      excludes: ['Taking card numbers inside the chat', 'Changing your tax or shipping rules'],
    },
    {
      slug: 'reorder-reminders',
      name: 'Reorder reminders',
      keyword: 'replenishment reminders WhatsApp',
      oneLiner: 'Nudges repeat buyers just before they run out.',
      answer:
        'Reorder reminders message customers who agreed to hear from you when a product is likely running low. The nudge is timed to how long the item usually lasts, and one tap sends a checkout link. Good for coffee, skincare, supplements, pet food and anything bought again and again.',
      persona: 'arjun',
      channels: ['WhatsApp', 'SMS'],
      // TODO(owner): replace with measured result
      kpi: { value: '[N]%', label: 'of nudges turned into repeat orders', placeholder: true },
      timeToLive: 'Live in ~1 to 2 weeks', // TODO(owner): confirm
      includes: [
        'Timing set per product from order history',
        'One-tap reorder link',
        'Skip, snooze or change quantity by reply',
        'Opt-in and approved templates',
      ],
      excludes: ['Messaging customers who have not opted in', 'Running subscription billing'],
    },
    {
      slug: 'post-purchase-upsell',
      name: 'Post-purchase upsell',
      keyword: 'post-purchase upsell WhatsApp',
      oneLiner: 'Suggests the right add-on after an order, in the chat.',
      answer:
        'Post-purchase upsell sends a helpful add-on suggestion after an order, such as a matching product, a refill or care items. The message is tied to what the customer bought, not a blast. One tap adds it to a new order, and shoppers can say no with one reply.',
      persona: 'arjun',
      channels: ['WhatsApp', 'SMS'],
      // TODO(owner): replace with measured result
      kpi: { value: '[N]%', label: 'of orders adding a second item', placeholder: true },
      timeToLive: 'Live in ~1 to 2 weeks', // TODO(owner): confirm
      includes: [
        'Suggestions based on the order',
        'Sent after delivery, not before',
        'One-tap add-on checkout link',
        'Frequency cap per customer',
      ],
      excludes: ['Offers you have not approved', 'Blasting every customer the same message'],
    },
  ],
}
