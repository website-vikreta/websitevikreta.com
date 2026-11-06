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

  const questions = (page: import('@playwright/test').Page) => page.locator('main button[aria-expanded]');

  test('all questions start closed; opening one closes the previous; clicking again collapses it', async ({ page }) => {
    const q = questions(page);
    await expect(q).toHaveCount(11);
    for (const button of await q.all()) await expect(button).toHaveAttribute('aria-expanded', 'false');

    await q.nth(0).click();
    await expect(q.nth(0)).toHaveAttribute('aria-expanded', 'true');

    // Single-open accordion: opening the second closes the first.
    await q.nth(1).click();
    await expect(q.nth(1)).toHaveAttribute('aria-expanded', 'true');
    await expect(q.nth(0)).toHaveAttribute('aria-expanded', 'false');

    await q.nth(1).click();
    await expect(q.nth(1)).toHaveAttribute('aria-expanded', 'false');
  });

  test('every question opens to a non-empty answer', async ({ page }) => {
    const q = questions(page);
    for (let i = 0; i < (await q.count()); i++) {
      await q.nth(i).click();
      const answer = page.locator(`[id="${await q.nth(i).getAttribute('aria-controls')}"]`);
      await expect(answer, `Question ${i + 1} has no visible answer`).toBeVisible();
      await expect(answer).not.toBeEmpty();
    }
  });

  test('FAQPage JSON-LD lists exactly the questions shown on the page', async ({ page }) => {
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    const faq = schemas.map((s) => JSON.parse(s)).find((d) => d['@type'] === 'FAQPage');
    expect(faq, 'No FAQPage JSON-LD on /faq').toBeTruthy();

    const inSchema = faq.mainEntity.map((e: { name: string }) => e.name.trim());
    // Visible labels are "01 Question? +": strip the number prefix and the +/− icon.
    const onPage = (await questions(page).allInnerTexts()).map((t) =>
      t.replace(/\s+/g, ' ').replace(/^\d+\s*/, '').replace(/\s*[+−-]\s*$/, '').trim(),
    );
    expect(inSchema).toEqual(onPage);
  });

  test('the contact link at the bottom opens /contact', async ({ page }) => {
    const link = page.locator('main a[href="/contact"]');
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
