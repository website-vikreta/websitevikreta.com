import { MessageCircle } from 'lucide-react'
import { CommentComposer } from '@/components/blog/CommentComposer'
import { CommentThread } from '@/components/blog/CommentThread'
import type { Comment } from '@/sanity/types'

interface CommentSectionProps {
  postId: string
  comments: Comment[]
}

export function CommentSection({ postId, comments }: CommentSectionProps) {
  const topLevel = comments.filter((c) => !c.parentId)
  const repliesByParent = new Map<string, Comment[]>()
  for (const c of comments) {
    if (!c.parentId) continue
    const list = repliesByParent.get(c.parentId) ?? []
    list.push(c)
    repliesByParent.set(c.parentId, list)
  }

  return (
    <div className="border-t border-(--color-border) pt-10">
      <h2 className="mb-8 flex items-center gap-2 text-h3 font-bold tracking-tight text-(--color-text)">
        <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
        Comments{comments.length > 0 && (
          <span className="text-(--color-text-faint)">({comments.length})</span>
        )}
      </h2>

      {topLevel.length > 0 ? (
        <ul className="mb-10 flex flex-col gap-8">
          {topLevel.map((comment) => (
            <li key={comment._id}>
              <CommentThread
                postId={postId}
                comment={comment}
                replies={repliesByParent.get(comment._id) ?? []}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-10 text-sm text-(--color-text-faint)">Be the first to comment.</p>
      )}

      <CommentComposer postId={postId} />
    </div>
  )
}
