# Image Asset Standards

## WebP is the default shipping format for all site-delivered images

- All final site-delivered images in the app, including marketing visuals, illustrations, comparison panels, editorial assets, and route-level/content imagery, must be shipped as `.webp`.
- PNG is allowed only as an intermediate source file while editing or generating an image; it must not be the runtime asset path in the app.
- Do not introduce new `.png` references for page visuals, comparison sliders, illustrations, product mockups, editorial assets, or any image that is shown on the site.
- This rule does not apply to brand logos, third-party client logos, favicons, or other identity assets that are intentionally stored as PNG/JPG/SVG for brand or compatibility reasons.

## Strict rules

1. Use `.webp` for all final image assets in `public/services/**` and similar marketing image folders.
2. Update the component `src` field to the `.webp` path before merging.
3. Delete the unused `.png` source after conversion if it is no longer referenced.
4. Never ship a page with both `.png` and `.webp` for the same asset unless the PNG is intentionally kept as an edit source and clearly documented.
5. If an image is used for comparison/slider logic, ensure both layers use the same format and same crop framing.
6. If a source file is large or a visual is reused across multiple components, optimize once and reuse the generated `.webp` file instead of creating duplicates.
7. No "temporary PNG until later" exceptions. If the app is using the image, it must use the WebP path.

## Required conversion workflow (manual)

Use this pattern when converting a PNG image to WebP by hand:

```bash
python3 - <<'PY'
from PIL import Image
src = 'public/services/digital-marketing/vanity-metrics-chaos.png'
dst = src.replace('.png', '.webp')
img = Image.open(src)
img.save(dst, format='WEBP', quality=88)
print(f'converted {src} -> {dst}')
PY
```

Then verify:

```bash
ls -l public/services/digital-marketing | grep -E 'vanity|real'
```

And confirm the app still builds:

```bash
npm run build
```

## Automated enforcement (pre-commit)

The manual workflow above is not self-enforcing — nothing stops a `.png`/`.jpg`/`.jpeg` from being committed by mistake. To make this rule automatic rather than just documented, wire up a pre-commit hook (via `husky` + `lint-staged`, or any Git hook manager your repo uses) that runs on every commit:

**What the hook should do:**

1. Inspect staged files for new or modified `.png`, `.jpg`, `.jpeg` files under the protected paths (e.g. `public/services/**`, other marketing/content image folders).
2. Skip anything matching the logo/identity allowlist (e.g. `**/logos/**`, `**/brand/**`, `favicon.*`, files explicitly tagged as identity assets).
3. For everything else, either:
   - **Block mode (recommended default):** fail the commit and print the offending file paths plus a pointer to the conversion script — a human reviews and converts.
   - **Auto-convert mode:** run the Pillow/`sharp`/`cwebp` conversion inline, `git add` the generated `.webp`, remove the raster file from the stage, and continue the commit.
4. Fail the commit if a component still references a `.png`/`.jpg` path under a protected folder, even if a `.webp` sibling already exists (catches the "forgot to update `src`" case).

**Suggested stack:** `husky` for the git hook, `lint-staged` to scope it to staged files only, and a small Node or Python script implementing steps 1–4.

Say the word and I'll write that script (Node or Python, whichever matches your repo) plus the `husky`/`lint-staged` config to drop in.

## Do not do this

- Do not leave a component pointing to `/services/.../*.png` or `*.jpg` in a final page.
- Do not keep unused PNGs around after the WebP swap is complete.
- Do not create a second duplicate image file in the same folder for a different format when one optimized WebP file already exists.
- Do not rely on browser fallbacks for final marketing images when the project already standardizes on WebP.

## Enforcement

If a PR introduces marketing imagery in PNG or JPG, it is considered a formatting regression and must be fixed before merge. Once the pre-commit hook above is in place, this becomes a commit-time check rather than a review-time catch.

This standard applies globally to:
- comparison sliders
- hero illustrations
- before/after modules
- product visuals
- service page screens and diagrams
- blog/feature images
- gallery imagery
- any image meant for delivery on the site as content

This standard does not apply to:
- brand logos
- third-party/client logos
- favicon and icon assets
- any asset specifically used as a logo or identity mark

## Approved exceptions

The WebP rule is intentionally not enforced for logo/identity assets, including third-party client logotypes and brand marks. Those files may remain PNG/JPG/SVG when they are serving a logo function rather than a page-illustration function.

If an image is meant to be shown as content on the site, the final path is `.webp` unless there is a specific, documented exception.