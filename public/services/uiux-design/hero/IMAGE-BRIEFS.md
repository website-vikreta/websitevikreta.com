# UI/UX hero — image drop folder

Hero uses a **static two-frame stack** beside the headline (no floating panels, no multiplayer cursors). Monochrome + one `#FFD600` accent max per image.

| File | Ratio | Export size | What to show |
|------|-------|-------------|--------------|
| `flow-map.webp` | **4:3** | 1200×900 px | **FlowMapp-style** journey map: nodes + connectors on warm off-white, grey lines, **one path highlighted yellow** (happy path vs drop-off). No avatars, no cursors. |
| `design-canvas.webp` | **3:2** | 1440×960 px | **Figma-style canvas** from above: dot grid, 2–3 artboards (e.g. dashboard + mobile checkout), thin borders, **one artboard with yellow selection outline**. No collaborator cursors or name tags. |

Format: **WebP**. Alt text in `app/services/uiux-design/data.ts` → `UI_UX_HERO.visualStack`.
