// One-off migration: give existing posts a real `likes: 0` instead of relying
// on the GROQ coalesce() fallback at read time. Safe to re-run — only touches
// documents where `likes` is still undefined.
// Run: npx sanity exec scripts/backfill-post-likes.ts
import { writeClient as client } from '@/sanity/lib/write-client'

async function backfillPostLikes() {
  const ids: string[] = await client.fetch(`*[_type == "post" && !defined(likes)]._id`)

  if (ids.length === 0) {
    console.log('No posts need backfilling.')
    return
  }

  const tx = ids.reduce((tx, id) => tx.patch(id, (p) => p.setIfMissing({ likes: 0 })), client.transaction())
  await tx.commit()
  console.log(`Backfilled likes on ${ids.length} post(s).`)
}

backfillPostLikes().catch((err) => {
  console.error(err)
  process.exit(1)
})
