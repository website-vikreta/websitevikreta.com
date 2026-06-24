import type { Metadata } from 'next'
import AIAutomationsClient from './AIAutomationsClient'

export const metadata: Metadata = {
  title: 'AI Automations | Website Vikreta',
  description: 'We build intelligent AI automation systems that eliminate repetitive work, connect your tools, and let your team focus on what matters. Custom workflows built for your business.',
  openGraph: {
    title: 'AI Automations | Website Vikreta',
    description: 'Intelligent automation systems built for real businesses. From lead capture to client delivery — fully automated.',
    url: 'https://stage.websitevikreta.com/services/ai-automations',
    siteName: 'Website Vikreta',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automations | Website Vikreta',
    description: 'Intelligent automation systems built for real businesses.',
  },
  alternates: {
    canonical: 'https://stage.websitevikreta.com/services/ai-automations',
  },
}

export default function AIAutomationsPage() {
  return <AIAutomationsClient />
}
