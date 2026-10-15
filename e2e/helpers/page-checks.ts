import { expect, test, type Locator, type Page } from '@playwright/test';
import type { BasePage } from '../pages/BasePage';
import { TEST_LEAD } from '../fixtures/test-data';

/** Page-agnostic "main things" checks shared by the per-page specs. */

/**
 * Each heading exists, and they appear top-to-bottom in the given order.
 * Matched by text, not accessible role: scroll-reveal sections keep below-the-fold headings
 * out of the accessibility tree until revealed. Use a RegExp for headings the reveal
 * animation splits across several elements by line.
 */
export async function expectSectionOrder(page: Page, headings: (string | RegExp)[]): Promise<void> {
  const tops: number[] = [];
  for (const name of headings) {
    const heading = page.locator('h1, h2, h3', { hasText: name }).first();
    await expect(heading, `Missing section heading "${name}"`).toBeAttached();
    tops.push(await heading.evaluate((el) => el.getBoundingClientRect().top + window.scrollY));
  }
  expect(tops, 'Section headings are out of order').toEqual([...tops].sort((a, b) => a - b));
}

/**
 * Known site bugs that are tracked, not fixed (we are only setting up testing). A failed request to
 * one of these paths does not fail the health check, but is recorded as a `known-bug` annotation so it
 * stays visible in the reports. Delete the entry once the bug is fixed.
 */
const KNOWN_BROKEN_PATHS: Record<string, string> = {
  '/logo/websitevikreta.svg':
    'components/ui/Logo.tsx:37 points at /logo/websitevikreta.svg but the file is public/logo/WebsiteVikreta.svg — ' +
    '404 on case-sensitive servers (production build, Linux/Vercel); hidden in `npm run dev` on macOS. Navbar + footer, every page.',
};

/**
 * Opens `path` and scrolls to the footer in viewport-sized steps (so every lazy image and
 * scroll-triggered reveal fires); no uncaught JS error and no failed same-origin request allowed.
 */
export async function expectCleanFullScroll(page: Page, basePage: BasePage, path: string, baseURL: string): Promise<void> {
  const jsErrors: string[] = [];
  const failed: string[] = [];
  page.on('pageerror', (e) => jsErrors.push(e.message));
  page.on('response', (r) => {
    if (r.url().startsWith(baseURL) && r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
  });

  await basePage.navigate(path);
  await basePage.scrollThroughPage();
  await expect(page.getByRole('region', { name: 'Footer' })).toBeVisible();

  const known = failed.filter((f) => new URL(f.split(' ')[1]).pathname in KNOWN_BROKEN_PATHS);
  for (const f of known) {
    test.info().annotations.push({ type: 'known-bug', description: `${f} — ${KNOWN_BROKEN_PATHS[new URL(f.split(' ')[1]).pathname]}` });
  }

  expect(jsErrors, `Uncaught JS errors on ${path}`).toEqual([]);
  expect(
    failed.filter((f) => !known.includes(f)),
    `Same-origin requests that failed on ${path} (broken images, assets, APIs)`,
  ).toEqual([]);
}

/**
 * `#hash` hrefs that open the lead popup instead of scrolling (components/ui/AuditModalProvider.tsx
 * AUDIT_MODAL_CONFIGS). They need no matching id on the page. Keep in sync when a popup is added.
 */
const POPUP_HASHES = new Set(['#book-audit', '#start-project', '#get-quote', '#marketing-audit', '#book-uiux-call', '#get-uiux-quote']);

/**
 * Every link in the current page's DOM (nav, drawer, main, footer — hidden ones too):
 * internal links are requested and must load; same-page anchors must hit an id (or open a popup);
 * external links are never opened, only shape-checked. On pages with lazy sections, call
 * `basePage.scrollThroughPage()` first so their links are in the DOM.
 */
export async function expectAllLinksWork(page: Page): Promise<void> {
  test.setTimeout(180_000); // the dev server compiles each route on first hit
  const hrefs = [...new Set(await page.locator('a[href]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!)))];
  const internal = [...new Set(hrefs.filter((h) => h.startsWith('/') && !h.startsWith('//')).map((h) => h.split('#')[0] || '/'))];
  const anchors = hrefs.filter((h) => h.startsWith('#') && h.length > 1 && !POPUP_HASHES.has(h));
  const external = hrefs.filter((h) => !h.startsWith('#') && (!h.startsWith('/') || h.startsWith('//')));
  test.info().annotations.push({
    type: 'expected',
    description: `${internal.length} internal links return 200, ${anchors.length} same-page anchors hit an id, ${external.length} external links are well-formed`,
  });

  const broken: string[] = [];
  for (const href of internal) {
    const res = await page.request.get(href);
    if (!res.ok()) broken.push(`${res.status()} ${href}`);
  }
  expect.soft(broken, 'Internal links that do not load').toEqual([]);

  // Same-page anchors (e.g. "#vision"): the target section must exist on this page.
  const missingTargets: string[] = [];
  for (const a of anchors) if ((await page.locator(`[id="${a.slice(1)}"]`).count()) === 0) missingTargets.push(a);
  expect.soft(missingTargets, 'Same-page anchor links pointing at a missing id').toEqual([]);

  const malformed = external.filter(
    (h) =>
      !/^https?:\/\/[^\s/]+\.[^\s/]+/.test(h) &&
      !/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(h) &&
      !/^tel:\+?\d{7,15}$/.test(h),
  );
  expect(malformed, 'External links with a malformed href').toEqual([]);
}

/**
 * The testimonial carousel (WorkTestimonialsSection, reused on several pages) drifts on its own at
 * ~40px/s, so a Next/Previous press must move its track much further than that.
 */
export async function expectCarouselButtonsMove(section: Locator): Promise<void> {
  await section.scrollIntoViewIfNeeded();
  const track = section.locator('[aria-roledescription="carousel"] > div').first();
  const x = () => track.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
  for (const name of ['Next testimonial', 'Previous testimonial']) {
    const before = await x();
    await section.getByRole('button', { name }).click();
    await expect
      .poll(async () => Math.abs((await x()) - before), { message: `"${name}" did not move the carousel` })
      .toBeGreaterThan(150);
  }
}

/**
 * Fills an inline AuditForm ("Book a Free Call") inside `root` with the fake test identity,
 * submits it, and checks the success message plus the (mocked) EmailJS payload.
 */
export async function submitInlineAuditForm(page: Page, root: Locator): Promise<void> {
  const fields = { firstName: TEST_LEAD.firstName, lastName: TEST_LEAD.lastName, email: TEST_LEAD.email, phone: TEST_LEAD.phone, subject: TEST_LEAD.subject };
  for (const [name, value] of Object.entries(fields)) await root.locator(`input[name="${name}"]`).fill(value);
  await root.locator('textarea[name="message"]').fill(TEST_LEAD.message);

  const sent = page.waitForRequest(/api\.emailjs\.com/);
  await root.locator('button[type="submit"]').click();
  await expect(root.getByText("Thanks, we'll get back to you within 24 hours.")).toBeVisible();

  const request = await sent;
  expect(await (await request.response())?.text(), 'EmailJS was not mocked').toBe('OK');
  expect(request.postDataJSON().template_params).toMatchObject({
    name: TEST_LEAD.name,
    email: TEST_LEAD.email,
    mobile: TEST_LEAD.phone,
    service_type: TEST_LEAD.subject,
    message: TEST_LEAD.message,
  });
}
