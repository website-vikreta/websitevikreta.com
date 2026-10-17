# Image & Asset Standards — Website Vikreta

## The Thesis
Images are most of the bytes on this site, and **nothing optimizes them for us**. `next.config.ts` sets
`images.unoptimized: true`, so `next/image` ships every file **byte-for-byte**: no resizing, no
AVIF/WebP conversion, no responsive `srcset`. The file you commit to `public/` is exactly the file every
visitor downloads on every device. The asset itself is the optimization.

> If `images.unoptimized` is ever turned off, revisit §3 budgets and §5 (`sizes` becomes load-bearing).

Related rules live elsewhere — this file owns the image-specific detail:
- `next/image` only, never `<img>` → `code-standards.md`
- Image SEO snippet → `seo-geo.md` · Image reveal animation (`RevealImage`) → `motion-system.md`

---

## 1. Asset Classes → Format

| Class | Examples | Format | Notes |
|---|---|---|---|
| **Content image** | Photos, illustrations, screenshots, diagrams, before/after panels, hero art, blog/gallery images | **`.webp`** | The default. PNG/JPG only as local edit sources, never referenced by the app. |
| **Identity mark** | Our logo, client logos, tool logos | **`.svg`** (PNG only if no vector exists) | Exempt from the WebP rule. |
| **UI icon** | Arrows, chevrons, menu, social glyphs | **`lucide-react` / inline SVG** | Never an image file. |
| **Favicon / app icon** | Tab icon | `.png` / `.svg` in `public/logo/` | Wired via `metadata.icons` in `app/layout.tsx`. |
| **Social share (OG/Twitter)** | Link-preview cards | **`.png` or `.jpg`**, 1200×630 | Exempt from WebP: several crawlers (LinkedIn, WhatsApp, older Slack/Facebook scrapers) don't reliably render WebP. |
| **CMS image (Sanity)** | Blog featured image, author photo | Served by `cdn.sanity.io` | Sized and format-negotiated via `urlFor` (§6), never downloaded into `public/`. |

---

## 2. File Naming & Location

**Names: lowercase `kebab-case`, descriptive, ASCII only.**
`team-strategy-meeting.webp` ✅ · `IMG_2041.webp` ❌ · `01-Discovery Call.jpeg` ❌ · `WebsiteVikreta.svg` ❌

- **No uppercase, ever.** macOS ignores filename case, Linux does not. A file named `WebsiteVikreta.svg`
  referenced as `/logo/websitevikreta.svg` works in `npm run dev` on a Mac and **404s in the production
  build and on Vercel** (this has already shipped once — see §10).
- No spaces, `&`, `#`, `%`, `?`, or accents — they break URLs or need encoding.
- Name describes the content (helps image SEO and grep): `vanity-metrics-chaos.webp`, not `section-2-img.webp`.
- Ordered sequences use a zero-padded prefix: `01-listen.webp`, `02-diagnose.webp`.

**Location: by route, mirroring `app/`.**

```
public/
  about/                         /about content images
  services/<service-slug>/       one folder per service page (+ subfolders per section)
  services/landing/              home page service cards
  our-work/                      case study / project imagery
  client-logos/  tools-logos/    identity marks (SVG preferred)
  logo/                          our brand marks + favicon
  og-image.png                   default social card
```

- One asset, one file. Reuse the same path across components; never copy it into a second folder.
- **Delete images with the component that used them.** Unreferenced files still bloat the repo and
  every clone (see §10 — several MB are currently orphaned).
- Never commit OS junk: `.DS_Store`, `Thumbs.db` (`.DS_Store` is already in `.gitignore`).
- **Only shippable assets go in `public/`.** Every file there is publicly downloadable at its URL —
  briefs, notes, `.md` docs, and source/PSD/Figma exports belong outside `public/`.

---

## 3. Dimensions & Byte Budgets

Because nothing resizes on the fly, **export at the size it is displayed, ×2 for retina — no larger.**

| Slot | Max export width | Target size | Hard cap |
|---|---|---|---|
| Full-bleed hero / LCP image | 2400 px | ≤ 200 KB | 300 KB |
| Half-width section image | 1600 px | ≤ 150 KB | 250 KB |
| Card / grid thumbnail | 1000 px | ≤ 80 KB | 150 KB |
| Avatar / small photo | 2× rendered size (e.g. 160 px for 80 px) | ≤ 30 KB | 60 KB |
| Logo SVG | — | ≤ 15 KB | 40 KB |
| OG image | 1200×630 exactly | ≤ 200 KB | 300 KB |

- Over the hard cap = must be fixed before merge. Over target = fix it unless it's a deliberate,
  commented exception (e.g. a detailed diagram that loses legibility).
- Never upscale a small source to hit a size — re-source it.
- Crop to the aspect ratio of the slot before export; don't rely on `object-cover` to hide a wrong ratio
  (you still download the cropped-away pixels).

---

## 4. Converting & Checking (use these, not ad-hoc tools)

**WebP quality:** `80` for photos · `88` for illustrations/screenshots with text or sharp edges.

`sharp` is already in `node_modules` (via Next), so no install is needed:

```bash
# Resize to ≤1600px wide and convert one file (edit SRC / WIDTH / Q)
SRC=public/services/digital-marketing/vanity-metrics-chaos.png WIDTH=1600 Q=80 \
node -e 'const s=require("sharp");const {SRC,WIDTH,Q}=process.env;
s(SRC).resize({width:+WIDTH,withoutEnlargement:true}).webp({quality:+Q})
.toFile(SRC.replace(/\.(png|jpe?g)$/i,".webp")).then(i=>console.log(i))'
```

Alternative if installed: `cwebp -q 80 -resize 1600 0 in.png -o out.webp`.

**After converting:** update the `src` to the `.webp` path, delete the PNG/JPG if nothing else references
it, and check:

```bash
# Dimensions + size of one file (macOS)
sips -g pixelWidth -g pixelHeight public/path/file.webp && du -k public/path/file.webp

# Repo-wide audit: rasters still shipped as content, and anything over 300 KB
find public -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) | grep -viE 'logo|og-image|favicon'
find public -type f -size +300k

# Filenames that will break on case-sensitive servers
find public -type f | grep -E '/[^/]*[A-Z &#%?][^/]*$'

# Is this asset referenced anywhere? (empty output = orphan, delete it)
grep -rn "file-name-here" app components lib
```

Then `npm run build` and run the e2e health checks against the production build
(`PROD=1 npm run test:e2e -- --grep @critical`): they fail on any 404'd image, which catches
case-mismatched and deleted-but-still-referenced paths that `npm run dev` on macOS hides.

---

## 5. Using Images in Code

```tsx
import Image from 'next/image'

// Fixed-size image — explicit width/height = intrinsic size of the file (prevents CLS)
<Image src="/about/team-strategy-meeting.webp" alt="Website Vikreta team mapping a client's workflow"
  width={1600} height={1600} />

// Fills a sized container — the parent sets the aspect ratio
<div className="relative aspect-video">
  <Image src="/services/landing/web-development.webp" alt="Website Development" fill
    sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
</div>
```

- **No layout shift:** every image has `width`+`height`, or `fill` inside a parent with a fixed
  aspect ratio/height. No exceptions.
- **`priority` on exactly one image per page: the LCP image** (usually the hero). Everything else
  stays lazy (the default). Never `priority` on below-the-fold or carousel images.
- **`sizes` on every `fill` image.** It's inert while the optimizer is off, but costs nothing and is
  correct the day it's turned on.
- **Don't add per-component `unoptimized`** — the global flag already covers it. Exception: SVGs, which
  must stay `unoptimized` if the optimizer is ever re-enabled.
- Reveal animation: wrap in `RevealImage` (`motion-system.md`), don't hand-roll it.
- Remote images only from hosts in `next.config.ts` `remotePatterns` (`cdn.sanity.io`,
  `images.unsplash.com`). Adding a host is a reviewed config change.

### Alt text

| Image | `alt` |
|---|---|
| Content image | What it shows + why it's there, in plain words. ≤ ~125 chars. Keyword only where natural. |
| Logo (ours or a client's) | The company name: `alt="Simpli Home"` |
| Decorative (texture, divider, duplicate of adjacent text) | `alt=""` (and `aria-hidden="true"` if wrapping a link that already has text) |
| Image inside a link | Describe the destination, not the pixels, unless the link has its own text |

- Never: `alt="image"`, `alt="photo of…"`, a filename, or keyword lists.
- Duplicated marquee/loop copies keep the same alt; screen-reader duplication is handled by
  `aria-hidden` on the loop copy, not by emptying alt.
- Run user-facing alt text through `/humanize` like any other copy.

---

## 6. Sanity (CMS) Images

Never download a CMS image into `public/`. Request it from the CDN at the exact size it renders:

```ts
urlFor(post.featuredImage).width(1200).height(675).fit('crop').auto('format').quality(80).url()
```

- **Always `.width()` + `.height()`** at the rendered size ×2 (cards ~800 px, post hero 1200 px,
  avatars 2× display).
- **Always `.auto('format')`** — the Sanity CDN then serves AVIF/WebP to browsers that support it.
  This is our only automatic format negotiation, since `next/image` optimization is off.
- **Always fill the `alt` field** in the Studio (posts, openings, authors). Render it as the `alt` prop;
  fall back to the post title, never to empty, for content images.
- OG images from Sanity: `.width(1200).height(630).fit('crop')` and **no** `.auto('format')` — crawlers
  need JPG/PNG (§7).

---

## 7. Social Share (OG / Twitter) Images

- **1200×630**, PNG or JPG, ≤ 200 KB, important text inside the central ~1000×520 safe area.
- The `width`/`height` in `metadata.openGraph.images` must match the real file.
- Default card: `public/og-image.png`. Page-specific cards: `public/og/<page>.jpg` (`seo-geo.md`).
- After changing one, validate with the LinkedIn Post Inspector and a WhatsApp/Slack link paste.

---

## 8. SVG Rules (logos, marks)

- Has a `viewBox`; no fixed `width`/`height` inside the file (size it in code).
- Vector only — no embedded base64 rasters (that's a PNG wearing a costume; it defeats the point).
- No `<script>`, external references, or event handlers. Run through SVGO before committing.
- Recolour via CSS (`currentColor`, or the `brightness-0 invert` filter pattern used by `Logo.tsx`),
  not by keeping colour variants as separate files.

---

## 9. Merge Checklist

A PR that adds or changes an image passes all of these:

- [ ] Content images are `.webp`; no PNG/JPG content image is referenced by the app
- [ ] Filename is lowercase kebab-case, descriptive, ASCII, in the route's folder
- [ ] Exported at ≤ 2× display size; under the §3 hard cap
- [ ] `width`/`height` or `fill` + sized parent + `sizes`; `priority` only on the LCP image
- [ ] Meaningful `alt` (or `alt=""` if decorative); Sanity `alt` field filled
- [ ] Old/unused source files deleted; no `.DS_Store`
- [ ] `npm run build` passes and `PROD=1 npm run test:e2e -- --grep @critical` shows no 404'd image

**Planned automation** (not built yet): a pre-commit check (`husky` + `lint-staged`) that blocks staged
PNG/JPG under content folders (logos, `og-image`, favicons allowlisted), filenames with uppercase/spaces,
and files over the hard cap. Until it exists, the checklist above is enforced in review.

---

## 10. Current Known Violations (audit: 2026-10-14)

Tracked, not yet fixed. Remove a row when it's resolved.

| Issue | Where | Impact |
|---|---|---|
| Case mismatch: code says `/logo/websitevikreta.svg`, file is `WebsiteVikreta.svg` | `components/ui/Logo.tsx:37` | **Logo wordmark 404s** in navbar + footer on every page in production/Linux. Tracked as a known bug in the e2e health checks (`e2e/helpers/page-checks.ts`). |
| Orphaned assets (component unused) | `public/our-process/*.jpeg` (5, ~3.3 MB), `public/preloader/*` (21, ~5 MB) — only used by unused `rolling-list.tsx` / `scroll-morph-hero.tsx` | ~8 MB of dead weight in the repo |
| Orphaned asset | `public/images/careers-banner.png` (2.3 MB, 1672×931, PNG) | Unreferenced; also violates format + budget |
| Filenames with spaces + uppercase | `public/preloader/*` (e.g. `01-Discovery Call.jpeg`) | Break on case-sensitive hosts if ever used |
| Uppercase filenames (work today, fragile) | `public/tools-logos/*` (38, e.g. `01-OpenAI.svg`), `public/our-work/testimonials/*` (10, e.g. `Fiona_Li.webp`) | Code currently matches the exact case, so they load; any lowercase reference 404s in production. Rename to kebab-case together with their references when next touched. |
| Internal docs inside `public/` | `public/services/uiux-design/ASSETS.md`, `public/services/uiux-design/hero/IMAGE-BRIEFS.md` | Everything in `public/` is publicly downloadable at its URL. Move working notes out of `public/`. |
| OG image ratio | `public/og-image.png` is 1200×675 (metadata matches) | Standard is 1200×630; some platforms crop. The `TODO: add public/og-image.png` comment in `app/page.tsx` is stale — the file exists. |
| No `.auto('format')` on Sanity URLs | `app/blog/**` `urlFor(...)` calls | CMS images served in original format, no AVIF/WebP |

For scale: converting the orphaned `careers-banner.png` with the §4 command (1600 px, q80) takes it from
**2.3 MB to 115 KB** (−95%). That is the size of the win this standard is protecting.
