'use server'

import { fetchPaginatedPosts } from '@/sanity/lib/fetch'
import { SEARCH_PAGE_SIZE } from './constants'
import type { DisplayPost } from '@/sanity/types'

export interface LoadMorePostsResult {
  posts: DisplayPost[]
  hasMore: boolean
}

/** Fetches the next newest-first batch of posts starting at `offset`. Client-side filters/sort in SearchClient apply on top of whatever's been loaded — this action only ever paginates the unfiltered pool. `hasMore` is derived from a full batch coming back, so no separate count query is needed. */
export async function loadMorePosts(offset: number): Promise<LoadMorePostsResult> {
  const posts = await fetchPaginatedPosts(offset, SEARCH_PAGE_SIZE)
  return { posts, hasMore: posts.length === SEARCH_PAGE_SIZE }
}
