import { test, expect } from '../../fixtures/test';
import { PRODUCTION_VIEWPORTS } from '../../helpers/responsive-viewports';
import { expectAllLinksWork, expectCleanFullScroll } from '../../helpers/page-checks';

/** FAQ page (/faq): the main things only — the accordion works and Google gets a matching FAQ schema. */

const OVERFLOW_WIDTHS = [320, 768, 1440];

test.describe('FAQ Page: Structure & Health', { tag: '@critical' }, () => {
  test('scrolling the whole page throws no JS errors and no same-origin request fails', async ({ page, basePage, baseURL }) => {
    await expectCleanFullScroll(page, basePage, '/faq', baseURL!);
  });

  test('every link on the page works', async ({ page, basePage }) => {
    await basePage.navigate('/faq');
    await expectAllLinksWork(page);
  });
});

test.describe('FAQ Page: Accordion & Schema', () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigate('/faq');
  });

  // The wv FAQ page (app/faq/page.tsx) uses native <details>/<summary> grouped by topic.
  const questions = (page: import('@playwright/test').Page) => page.locator('.wv-faq-item');

  test('all questions start closed; each opens and collapses again', async ({ page }) => {
    const q = questions(page);
    expect(await q.count()).toBeGreaterThan(11);
    for (const item of await q.all()) await expect(item).not.toHaveAttribute('open', '');

    await q.first().locator('summary').click();
    await expect(q.first()).toHaveAttribute('open', '');

    // Native <details> is multi-open: a second question does not close the first.
    await q.nth(1).locator('summary').click();
    await expect(q.nth(1)).toHaveAttribute('open', '');
    await expect(q.first()).toHaveAttribute('open', '');

    await q.nth(1).locator('summary').click();
    await expect(q.nth(1)).not.toHaveAttribute('open', '');
  });

  test('every question opens to a non-empty answer', async ({ page }) => {
    const q = questions(page);
    for (let i = 0; i < (await q.count()); i++) {
      const item = q.nth(i);
      await item.locator('summary').click();
      const answer = item.locator('.wv-faq-a');
      await expect(answer, `Question ${i + 1} has no visible answer`).toBeVisible();
      await expect(answer).not.toBeEmpty();
    }
  });

  test('FAQPage JSON-LD includes every question shown on the page', async ({ page }) => {
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faq = schemas.map((s) => JSON.parse(s)).find((d) => d['@type'] === 'FAQPage');
    expect(faq, 'No FAQPage JSON-LD on /faq').toBeTruthy();

    const inSchema = faq.mainEntity.map((e: { name: string }) => e.name.trim());
    const onPage = await page.locator('.wv-faq-item summary h3').allInnerTexts();
    expect(onPage.length).toBeGreaterThan(0);
    for (const question of onPage) expect(inSchema).toContain(question.trim());
  });

  test('the contact link at the bottom opens /contact', async ({ page }) => {
    const link = page.locator('.wv-faq-cta a[href="/contact"]');
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await expect(page).toHaveURL(/\/contact$/);
  });
});

test.describe('FAQ Page: Responsive', () => {
  for (const vp of PRODUCTION_VIEWPORTS.filter((v) => OVERFLOW_WIDTHS.includes(v.width))) {
    test(`no horizontal overflow at ${vp.name}`, async ({ page, basePage }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await basePage.navigate('/faq');
      await basePage.verifyNoHorizontalOverflow();
    });
  }
});
