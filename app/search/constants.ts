// Shared between the server page (initial fetch) and the server action
// (subsequent "Load more" fetches) — kept out of actions.ts because a
// 'use server' file may only export async functions.
export const SEARCH_PAGE_SIZE = 12
