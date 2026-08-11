// Remembers a commenter's name/email in this browser after their first post,
// so returning commenters get a one-field "just type your message" form
// instead of re-entering name/email every time. No accounts, no server
// state — purely a local convenience.
const STORAGE_KEY = 'commentIdentity'

export interface CommentIdentity {
  name: string
  email: string
}

export function getCommentIdentity(): CommentIdentity | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CommentIdentity) : null
  } catch {
    return null
  }
}

export function setCommentIdentity(identity: CommentIdentity) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(identity))
}

export function clearCommentIdentity() {
  localStorage.removeItem(STORAGE_KEY)
}
