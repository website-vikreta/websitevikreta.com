# Command Recipe: test

> Run the Playwright E2E suite: the whole app (`/test-e2e`) or one page / area (`/test-page <name>`), then report pass / fail / known bugs in plain language.

## Trigger

`/test-e2e [flags]` — whole app, headless (background). `/test-e2e-headed [flags]` — whole app in visible Chrome (same as `/test-e2e headed`). `/test-page <name> [flags]` — one page or area.

## Load

- Nothing from the design pipeline. Config + run filters are documented at the top of `playwright.config.ts`.

## Rules

- **Report, don't fix.** A failing test means a site bug or a test bug — explain which, never change site code. Edit a test only if the user asks.
- **Never commit** anything from this recipe.
- Emails / Sanity writes are already mocked by `e2e/fixtures/test.ts` — never remove those mocks to "make a test real".
- User says **stop / pause** → stop the run immediately (kill the background task and the server it started).

## Flags (both commands)

| Flag | Effect |
|------|--------|
| *(none)* | Production build (`npm run build`, then `PROD=1`) — stable, recommended |
| `headed` | Visible Chrome so the user can watch (`test:e2e:headed`) |
| `dev` | Skip the build, use the running `npm run dev` (faster, can be flaky under load) |
| `critical` | Only `--grep @critical` (page health + lead capture, ~3–4 min) |
| `all` | `/test-e2e` only: also run `npm run typecheck`, `npm run lint`, `npm test` first; stop at the first failure |

## Mapping `<name>` → filter (`/test-page`)

| User types | Run with |
|------------|----------|
| a spec file name: `home`, `work`, `about`, `faq`, `blog`, `careers`, `contact`, `audit-modal`, `services`, `navigation`, `seo`, `smoke` | `-- <name>` (file filter) |
| an area folder: `marketing`, `forms`, `site-wide` | `-- e2e/specs/<area>` |
| one service page, e.g. `uiux-design`, `ai-automations` | `-- services --grep "/services/<slug>"` |
| a tag: `@forms`, `@smoke`, `@critical` | `-- --grep <tag>` |
| anything else | `ls e2e/specs/*` and pick the closest; if nothing fits, say there are no tests for it yet |

No name given → list the options above and ask.

## Execution Checklist

1. Unless `dev`: `npm run build` (STOP and report if it fails).
2. Build the command: `[PROD=1] npm run test:e2e[:headed] -- <filter> [--grep @critical]`.
3. Run it **in the background** (full suite ≈ 15 min); tell the user what is running and how many tests (`--list` count).
4. When done, read `test-results/qa-report.json` and report:
   - One line: `total / passed / failed / known bugs / skipped`.
   - **Failed** table: module · test · expected · actual · screenshot path. For each, one line: site bug or test problem (flaky/timeout).
   - **Known bugs** still open (just the names).
   - `npx playwright show-report` to open the HTML report.
