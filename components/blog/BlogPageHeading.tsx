// Extracted from BlogListingClient so it renders in the static page shell —
// outside the Suspense boundary around the Sanity-backed results — instead
// of waiting on the posts fetch to resolve.
//
// Server Component, no scroll reveal: this is the /blog H1 and a prime FCP
// candidate, so it paints with the shell rather than waiting on hydration and
// an IntersectionObserver. See the [Anti-pattern] entry in .ai/learning.md.
export function BlogPageHeading() {
  return (
    <h1 className="mb-10 text-h2 font-bold leading-[1.1] tracking-tight text-(--color-text) md:mb-14">
      All Blogs
    </h1>
  )
}
