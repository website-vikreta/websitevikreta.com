// One-off: reset every post's like count back to 0 (clearing out test-click data).
// Run: npx sanity exec scripts/reset-post-likes.ts
import { writeClient as client } from '@/sanity/lib/write-client'

async function resetPostLikes() {
  const ids: string[] = await client.fetch(`*[_type == "post"]._id`)
  const tx = ids.reduce((tx, id) => tx.patch(id, (p) => p.set({ likes: 0 })), client.transaction())
  await tx.commit()
  console.log(`Reset likes to 0 on ${ids.length} post(s).`)
}

resetPostLikes().catch((err) => {
  console.error(err)
  process.exit(1)
})
