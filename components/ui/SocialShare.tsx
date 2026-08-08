'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Linkedin, TwitterX, Facebook, Whatsapp } from 'react-bootstrap-icons'
import { SITE_URL } from '@/config/site'
import { trackShareClick } from '@/lib/analytics'

/** Tags a path with utm_source/medium/campaign so clicks from shared links are attributable in GA4. */
function withUtm(path: string, source: string, campaign: string): string {
  const url = new URL(path, SITE_URL)
  url.searchParams.set('utm_source', source)
  url.searchParams.set('utm_medium', 'social')
  url.searchParams.set('utm_campaign', campaign)
  return url.toString()
}

const PLATFORMS = [
  {
    key: 'linkedin',
    tooltip: 'Post on LinkedIn',
    Icon: Linkedin,
    shareUrl: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    key: 'twitter',
    tooltip: 'Post on X',
    Icon: TwitterX,
    shareUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    key: 'facebook',
    tooltip: 'Share on Facebook',
    Icon: Facebook,
    shareUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    key: 'whatsapp',
    tooltip: 'Share on WhatsApp',
    Icon: Whatsapp,
    shareUrl: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
] as const

const ICON_BUTTON =
  'group relative flex h-9 w-9 items-center justify-center border border-(--color-border) text-(--color-text) transition-colors duration-300 hover:bg-(--color-accent)'

const TOOLTIP =
  'pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-(--color-text) px-2 py-1 text-xs text-(--color-bg) opacity-0 transition-opacity duration-200 group-hover:opacity-100'

/** UTM-tagged social share row. `path` is the page's canonical path (e.g. `/careers/frontend-intern`); `campaign` groups clicks by content type in GA4 (e.g. `careers`, `blog`). */
export function SocialShare({ path, title, campaign }: { path: string; title: string; campaign: string }) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    await navigator.clipboard.writeText(withUtm(path, 'copy_link', campaign))
    trackShareClick('copy_link', campaign)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-3">
      {PLATFORMS.map(({ key, tooltip, Icon, shareUrl }) => (
        <a
          key={key}
          href={shareUrl(withUtm(path, key, campaign), title)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShareClick(key, campaign)}
          aria-label={tooltip}
          className={ICON_BUTTON}
        >
          <span className={TOOLTIP}>{tooltip}</span>
          <Icon size={15} />
        </a>
      ))}
      <button type="button" onClick={copyLink} aria-label="Copy link" className={ICON_BUTTON}>
        <span className={TOOLTIP}>{copied ? 'Copied!' : 'Copy link'}</span>
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </button>
    </div>
  )
}
