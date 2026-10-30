import { BlogCard } from "@/components/blog/BlogCard"
import { RevealFade, RevealText } from "@/components/ui/Reveal"
import type { DisplayPost } from "@/sanity/types"

export function BlogPreviewSectionClient({ posts }: { posts: DisplayPost[] }) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg)]">
      <div className="container py-20 md:py-28">

        {/* Heading */}
        <div className="mb-10 md:mb-14 max-w-3xl mx-auto text-center">
          <RevealText as="h2" className="text-h2 font-bold tracking-tight text-[var(--color-text)]">
            The{" "}
            <span style={{ color: "var(--color-accent)" }}>thinking</span>
            {" "}behind the work.
          </RevealText>
        </div>

        {/* 3-column card grid — same BlogCard used on /blog */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-16 md:gap-y-14">
          {posts.map((post, i) => (
            <RevealFade key={post._id} delay={0.15 + i * 0.1} className="h-full">
              <BlogCard post={post} className="h-full" />
            </RevealFade>
          ))}
        </div>

      </div>
    </section>
  )
}
