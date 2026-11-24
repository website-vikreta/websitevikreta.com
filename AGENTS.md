# Website Vikreta — AGENTS.md

Entry point for every AI session. Canonical, tool-agnostic instructions live in `.ai/`; this file holds the repo-specific commands, quirks, and gotchas an agent would likely miss without help. Load `.ai/context/session.md` + `.ai/context/brand.md` first, then one `.ai/agents/*` + one `.ai/standards/*` for the task.

## Commands (run from repo root)

- `npm run dev` — Next.js dev on `http://localhost:3000`. One dev server per project dir; playwright reuses an existing one via `.next/dev/lock`.
- `npm run build` — `next build`. Verifies static params + OG image tracing (`outputFileTracingIncludes` for `/services/ai/**/opengraph-image*`).
- `npm run start` — `next start` (production server; not for dev).
- `npx tsc --noEmit` (`npm run typecheck`) — strict TS, no `any`. Run before handoff.
- `npx eslint <touched files>` (`npm run lint`) — eslint-config-next; `react-hooks/set-state-in-effect` / `refs` are warnings only. Run before handoff.
- `npm run test` — vitest, jsdom, `{app,components,lib,hooks}/**/*.test.{ts,tsx}`.
- `npm run test:e2e` — playwright, headless CI-safe, against existing dev server or spawns `npm run dev -- -p ${PORT}` (PORT default 3005). Filter: `npm run test:e2e -- <grep>` (e.g. `-- work`, `-- e2e/specs/forms`, `-- --grep @critical`).
  - Tags: `@critical` (page health + lead capture; run before deploy), `@forms` (EmailJS always mocked), `@smoke` (every route loads 200 + h1).
  - `npm run test:e2e:headed` — watch in Chrome; `SLOWMO=500` to pace.
- `npm run test:visual-qa` — `npx tsx e2e/capture-visual-qa.ts`
- Verification order before handoff: `tsc --noEmit` → `eslint <touched files>` → `npm run test` (and `npm run build` if routes or `next.config.ts` changed).

## Architecture & quirks (verified)

- Next.js 16.2.9 + React 19, `reactCompiler: true` in `next.config.ts`. Breaking changes vs older training data — read `node_modules/next/dist/docs/` before using an unsure API.
- `trailingSlash: false`, `poweredByHeader: false`, `images.unoptimized: true`.
- Middleware (`middleware.ts`): sets `X-Robots-Tag: noindex, nofollow` on every host except `www.websitevikreta.com` (includes localhost/stage). It does not 404 routes; it only noindexes.
- `next.config.ts` redirects (reconcile before touching):
  - `/services` → `/services/ai` (temporary, until the `/services` hub ships — restore its sitemap entry + breadcrumb level then).
  - `/services/ai-automations/:path*` → `/services/ai/:path*` (permanent; renamed 2026-11-10).
- Dynamic AI routes: `app/services/ai/[branch]/page.tsx` + `[branch]/[product]/page.tsx` use `dynamicParams = true` with `generateStaticParams`. A product with no `page` block, or an unknown branch/product slug, returns `notFound()` (404). Content: `content/ai/branches/<branch>.ts`; helpers in `content/ai/index.ts` (`getBranch`, `getProduct`, `BRANCHES`).
- `@/*` alias → repo root (tsconfig `paths` + vitest alias). Import components as `@/components/wv/...`.
- Design language: `wv` only — `app/wv.css`, `components/wv/*`. Spec: `.ai/standards/design-system.md`. Canvas `#f6f4ee`, ink `#121212`, yellow `#fac800` (fill only on light). Anton (display) + Inter Tight (text). Nothing else.
- Legacy UI is never extended: `components/sections`, `components/ui`, GSAP, Utile, `--color-*` tokens. `components/home/*` + `.home-*` CSS are an abandoned draft, unused.
- No raw hex in TSX — `var(--color-*)` tokens only. `'use client'` only on files using hooks/motion; Server Components by default.
- Motion: `components/ui/Reveal.tsx` primitives (`RevealText`, `RevealFade`, `RevealImage`, `Counter`) + `motion/react` + Lenis; ease `[0.16, 1, 0.3, 1]`. No new GSAP. `useReducedMotion()` is `null` on the server — never branch `initial`/render on it (hydration mismatch).
- Images: WebP only for content/photographic (convert via `sharp .webp({ quality: 82 })`); PNG kept only for `og-image.png`, favicon, and small third-party brand logos in `public/client-logos/`. No `.jpg`/`.jpeg`/`.png` in `<Image src>` for page content.
- Content CMS: Sanity (`sanity/` studio, `next-sanity`, `sanity/lib/{queries,fetch}.ts`). Blog URLs via `lib/blog-url.ts` `postHref(categorySlug, slug)` — never hardcode `/blog/${slug}`.
- Lead form: single `AuditForm` (`components/ui/AuditForm.tsx`, EmailJS) mounted inline + in `AuditModal` (`AuditModalProvider` in `app/layout.tsx`); `href="#book-audit"` opens the popup.
- `.next/` is generated build cache — never lint/commit it (eslint `globalIgnores` covers it).
- No `opencode.json`; no `.cursor/` rules.

## Conventions worth preserving

- Conventional commits (`feat(scope):`, `fix`, `perf`, `seo`, `style`, `docs(ai)`), only when the user asks. No commit/push without the user.
- `.ai/learning.md`: conventions log — read before building, add one entry per new reusable rule/invented component, follow or explicitly update on conflict.
- Copy: human + anti-slop pass mandatory (`.ai/context/ai-slop-stop-skill.md`, `.ai/commands/macro/humanize.md`) before any copy ships. Real proof only, human copy only.

## Where the deep standards live (`.ai/`)

`agents/` (Storyteller → Builder → Critic pipeline), `context/` (brand, business, users, vision, session), `standards/` (design-system, code-standards, motion-system, seo-geo, image-asset-standards), `commands/` (macro/micro recipes), `briefs/` (per-page asset briefs). `.ai/README.md` has the full tree.
