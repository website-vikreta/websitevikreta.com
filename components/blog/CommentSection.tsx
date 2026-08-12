import { CommentComposer } from '@/components/blog/CommentComposer'
import { CommentThread } from '@/components/blog/CommentThread'
import type { Comment } from '@/sanity/types'

interface CommentSectionProps {
  postId: string
  comments: Comment[]
}

// No background block — sits on the same page background as the article,
// separated from it by a single hairline rule instead of a colored panel.
// Top spacing is already carried by the mt-16/md:mt-20 on this component's
// wrapper in the post detail page, so the rule only needs bottom margin.
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
    <div>
      <hr className="mb-10 border-(--color-border)" />

      <h2 className="mb-8 text-h3 font-bold tracking-tight text-(--color-text)">
        Comments{comments.length > 0 && (
          <span className="text-(--color-text-faint)"> ({comments.length})</span>
        )}
      </h2>

      {/* Composer sits right under the heading, not after every existing
          comment — on a post with a long thread it used to be scrolled
          past and easy to miss entirely. */}
      <div className="mb-10">
        <CommentComposer postId={postId} />
      </div>

      {topLevel.length > 0 ? (
        <ul className="flex flex-col gap-8">
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
        <p className="text-sm text-(--color-text-faint)">Be the first to comment.</p>
      )}
    </div>
  )
}
