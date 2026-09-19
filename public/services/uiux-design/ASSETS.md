# UI/UX page — image assets

Monochrome UI screenshots/diagrams only. Max one `#FFD600` accent per image. WebP preferred.

## Pain section (`pain/`)

| File | Ratio | Used on |
|------|-------|---------|
| `landing-friction.webp` | 16:10 | Pinboard note 1 + scroll-depth micro overlay |
| `checkout-friction.webp` | 16:10 | Pinboard note 2 + funnel micro overlay |
| `handoff-friction.webp` | 16:10 | Pinboard note 3 + spec-drift micro overlay |

Import from `D:\Downloads` via `node scripts/import-uiux-downloads.mjs`.

## Workflow gallery (`workflow/`)

| File | Ratio | Size | Description |
|------|-------|------|-------------|
| `flow-map.webp` | **4:3** | 1200×900 | FlowMapp-style journey map, one yellow path, no cursors. |
| `design-canvas.webp` | **3:2** | 1440×960 | Figma-like canvas, 2–3 artboards, one yellow selection frame. |

Used in the workflow section after Solution (not in hero).

## Design system panel
## Design system panel (`system/`)

**No image assets** — live preview is built from motion + UI tokens in `SolutionMicroCanvas.tsx`.
| File | Ratio | Size | Used on |
|------|-------|------|---------|
| `system/spacing/space-card-01.webp` | **1:1** | 600×600 | Spacing tab — nested card 1 (Studio Pod) |
| `system/spacing/space-card-02.webp` | **1:1** | 600×600 | Spacing tab — nested card 2 (Deck Pad) |
| `system/spacing/space-card-03.webp` | **1:1** | 600×600 | Spacing tab — nested card 3 (Focus Key) |
| `system/auto-layout/product-card.webp` | **3:2 / 4:3** | 800×533 | Auto-layout tab — dynamic responsive product card |

