import { BRANCHES } from './index'

export const BLOG: { href: string; title: string }[] = [
  { href: '/blog/business-growth/ai-automation-roi', title: 'AI automation ROI: what to measure and when it pays back' },
  { href: '/blog/ai-and-automation/make-vs-n8n-vs-custom-code', title: 'Make vs n8n vs custom code: which to build on' },
  { href: '/blog/educational/ai-agent-api-security', title: 'AI agent API security: keeping automations safe' },
  { href: '/blog/ai-and-automation/mcp-explained-direct-ai-tool-integration', title: 'MCP explained: connecting AI directly to your tools' },
  { href: '/blog/ai-and-automation/ai-automation-connecting-tools', title: 'AI automation: connecting the tools you already use' },
  { href: '/blog/ai-and-automation/establishing-human-oversight-automation', title: 'Human oversight in automation: where people stay in the loop' },
  { href: '/blog/ai-and-automation/ai-strategy-real-world-outcomes', title: 'AI strategy that delivers real-world outcomes' },
  { href: '/blog/educational/google-ai-search-optimization-guide', title: 'Google AI search optimization guide' },
]

export const blog = (href: string) => BLOG.find((b) => b.href === href)
export const blogList = (hrefs: string[] = []) => hrefs.flatMap((h) => blog(h) ?? [])
/** Fallback picks so every page links to at least two posts even before content fills `reading`. */
export const readingFor = (hrefs: string[] | undefined, seed: number) =>
  blogList(hrefs?.length ? hrefs : [BLOG[seed % BLOG.length].href, BLOG[(seed + 3) % BLOG.length].href])

export const pairsWithOf = (slug: string, pairs?: string[]) => {
  const list = (pairs ?? []).flatMap((s) => BRANCHES.find((b) => b.slug === s) ?? [])
  if (list.length >= 2) return list
  const i = BRANCHES.findIndex((b) => b.slug === slug)
  return [BRANCHES[(i + 1) % BRANCHES.length], BRANCHES[(i + 2) % BRANCHES.length]]
}
