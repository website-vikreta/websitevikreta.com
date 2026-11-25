import { CLIENT_LOGOS } from '@/components/wv/data'

export type LogoItem = { src: string; alt: string; h?: number }
const t = (name: string, file: string) => ({ name, src: `/tools-logos/${file}` })

export const TOOL_LOGOS: Record<string, { name: string; src: string }> = {
  openai: t('OpenAI', '01-OpenAI.svg'), claude: t('Claude', '02-Claude.svg'), figma: t('Figma', '03-Figma.svg'),
  github: t('GitHub', '11-GitHub.svg'), office365: t('Microsoft 365', '13-Office365.svg'), n8n: t('n8n', '15-n8n.svg'),
  make: t('Make', '16-MakeDotCom.svg'), gemini: t('Gemini', '17-Gemini.svg'), elevenlabs: t('ElevenLabs', '18-ElevenLabs.svg'),
  wordpress: t('WordPress', '19-WordPress.svg'), shopify: t('Shopify', '20-Shopify.svg'), squarespace: t('Squarespace', '21-Squarespace.svg'),
  canva: t('Canva', '22-Canva.svg'), sora: t('Sora', '23-Sora.svg'), midjourney: t('Midjourney', '24-Midjourney.svg'),
  linkedin: t('LinkedIn', '25-LinkedIn.svg'), meta: t('Meta', '26-Meta.svg'), google: t('Google', '27-GoogleLabs(GoogleLogo).svg'),
  kling: t('Kling AI', '28-KlingAI.svg'), flux: t('Flux', '30-Flux.svg'), langchain: t('LangChain', '33-LangChain.svg'),
  hubspot: t('HubSpot', '34-HubSpot.svg'), vercel: t('Vercel', '35-Vercel.svg'), upwork: t('Upwork', 'brands-upwork.svg'),
  slack: t('Slack', 'slack.svg'), whatsapp: t('WhatsApp', 'whatsapp.svg'), gmail: t('Gmail', 'gmail.svg'),
  googlesheets: t('Google Sheets', 'googlesheets.svg'), googlecalendar: t('Google Calendar', 'googlecalendar.svg'),
  googledrive: t('Google Drive', 'googledrive.svg'), quickbooks: t('QuickBooks', 'quickbooks.svg'), xero: t('Xero', 'xero.svg'),
  stripe: t('Stripe', 'stripe.svg'), zoho: t('Zoho', 'zoho.svg'), airtable: t('Airtable', 'airtable.svg'), notion: t('Notion', 'notion.svg'),
  calendly: t('Calendly', 'calendly.svg'), twilio: t('Twilio', 'twilio.svg'), instagram: t('Instagram', 'instagram.svg'),
  x: t('X', 'x.svg'), tiktok: t('TikTok', 'tiktok.svg'), youtube: t('YouTube', 'youtube.svg'), typeform: t('Typeform', 'typeform.svg'),
  salesforce: t('Salesforce', 'salesforce.svg'), intercom: t('Intercom', 'intercom.svg'), zapier: t('Zapier', 'zapier.svg'),
  wix: t('Wix', 'wix.svg'), woocommerce: t('WooCommerce', 'woocommerce.svg'), mailchimp: t('Mailchimp', 'mailchimp.svg'),
  // docusign: not in Simple Icons v13, skipped
}

const slug = (src: string) => src.split('/').pop()!.replace(/\.\w+$/, '')
/** keys = file slugs from /client-logos (simpli-home, blancora, sustainable-bitcoin-protocol, ...). `sbp` is an alias. */
export const CLIENTS: Record<string, LogoItem> = Object.fromEntries(
  CLIENT_LOGOS.map((l) => [slug(l.src), { src: l.src, alt: l.alt, h: l.h }]),
)
CLIENTS.sbp = CLIENTS['sustainable-bitcoin-protocol']

export const toolLogos = (keys: string[]): LogoItem[] =>
  keys.flatMap((k) => (TOOL_LOGOS[k] ? [{ src: TOOL_LOGOS[k].src, alt: TOOL_LOGOS[k].name, h: 30 }] : []))
export const clientLogos = (keys: string[]): LogoItem[] => keys.flatMap((k) => (CLIENTS[k] ? [CLIENTS[k]] : []))
