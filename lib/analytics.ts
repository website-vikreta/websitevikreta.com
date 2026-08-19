import { sendGAEvent } from '@next/third-parties/google'

type ClickEventName =
  | 'whatsapp_click'
  | 'call_click'
  | 'email_click'
  | 'linkedin_click'
  | 'instagram_click'
  | 'external_link_click'

/**
 * Classifies an outbound href into its GA4 click-event name. Known platforms
 * (WhatsApp/tel/mailto/LinkedIn/Instagram) get a specific event; any other
 * off-site http(s) link (Upwork, client project sites, author socials, ...)
 * falls back to `external_link_click` so it still counts instead of
 * silently no-oping. Same-origin links return null — internal nav isn't a
 * click-to-leave event.
 */
function getClickEventName(href: string): ClickEventName | null {
  if (href.startsWith('https://wa.me/')) return 'whatsapp_click'
  if (href.startsWith('tel:')) return 'call_click'
  if (href.startsWith('mailto:')) return 'email_click'
  if (href.includes('linkedin.com/')) return 'linkedin_click'
  if (href.includes('instagram.com/')) return 'instagram_click'
  if (/^https?:\/\//.test(href) && !href.includes(window.location.hostname)) return 'external_link_click'
  return null
}

/** Fires the matching GA4 click event for an outbound link. No-ops for internal/unrecognized hrefs. */
export function trackLinkClick(href: string, buttonLocation: string) {
  if (typeof window === 'undefined') return
  const event = getClickEventName(href)
  if (!event) return
  sendGAEvent('event', event, {
    button_location: buttonLocation,
    link_domain: event === 'external_link_click' ? new URL(href, window.location.href).hostname : undefined,
    page_location: window.location.href,
  })
}

/** Fires contact_form_submit after a lead-gen form's API call succeeds. */
export function trackFormSubmit(formName: string) {
  if (typeof window === 'undefined') return
  sendGAEvent('event', 'contact_form_submit', {
    form_name: formName,
    page_location: window.location.href,
  })
}

/** Fires `share_click` when a visitor uses one of the UTM-tagged social share buttons (see components/ui/SocialShare.tsx). */
export function trackShareClick(platform: string, campaign: string) {
  if (typeof window === 'undefined') return
  sendGAEvent('event', 'share_click', {
    platform,
    campaign,
    page_location: window.location.href,
  })
}

/** Fires `job_application_submit` after a careers application's API call succeeds. */
export function trackJobApplicationSubmit(openingSlug: string) {
  if (typeof window === 'undefined') return
  sendGAEvent('event', 'job_application_submit', {
    opening_slug: openingSlug,
    page_location: window.location.href,
  })
}

/** Fires `comment_submit` after a blog comment or reply posts successfully. */
export function trackCommentSubmit(postId: string, isReply: boolean) {
  if (typeof window === 'undefined') return
  sendGAEvent('event', 'comment_submit', {
    post_id: postId,
    comment_type: isReply ? 'reply' : 'comment',
    page_location: window.location.href,
  })
}

/** Fires `post_like` when a visitor likes (not unlikes) a blog post. */
export function trackPostLike(postId: string) {
  if (typeof window === 'undefined') return
  sendGAEvent('event', 'post_like', {
    post_id: postId,
    page_location: window.location.href,
  })
}

/** Fires `blog_search` when a visitor runs a non-empty search query on /blog/search. */
export function trackBlogSearch(query: string) {
  if (typeof window === 'undefined' || !query.trim()) return
  sendGAEvent('event', 'blog_search', {
    search_term: query,
    page_location: window.location.href,
  })
}

/** Fires `toc_link_click` when a visitor jumps via the blog Table of Contents. */
export function trackTocClick(headingText: string) {
  if (typeof window === 'undefined') return
  sendGAEvent('event', 'toc_link_click', {
    heading: headingText,
    page_location: window.location.href,
  })
}

/** Fires `faq_expand` when an FAQ accordion item is opened (not on close). */
export function trackFaqExpand(question: string) {
  if (typeof window === 'undefined') return
  sendGAEvent('event', 'faq_expand', {
    question,
    page_location: window.location.href,
  })
}

/** Fires `scroll_to_top_click` when the floating scroll-to-top button is used. */
export function trackScrollToTop() {
  if (typeof window === 'undefined') return
  sendGAEvent('event', 'scroll_to_top_click', {
    page_location: window.location.href,
  })
}
