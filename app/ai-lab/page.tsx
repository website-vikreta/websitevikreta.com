import type { Metadata } from 'next'
import AiLabClient from './AiLabClient'

export const metadata: Metadata = {
  title: 'AI Lab — Website Vikreta',
  description:
    'The AI and automation systems we built and run internally: Meher HR automation, UGC pipelines, proposal generation, and more. The same stack we sell, proved on ourselves.',
  openGraph: {
    title: 'AI Lab — Website Vikreta',
    description:
      'We automate ourselves first. Meher, our HR automation system, UGC pipelines, voice agents, and proposal tools — all built on Make.com, all live.',
    type: 'website',
  },
}

export default function AiLabPage() {
  return <AiLabClient />
}
