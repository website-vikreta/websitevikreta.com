import { test, expect } from '../../fixtures/test';
import { PRODUCTION_VIEWPORTS } from '../../helpers/responsive-viewports';
import { expectAllLinksWork, expectCleanFullScroll, expectSectionOrder } from '../../helpers/page-checks';

/** About page: the main things only, same approach as home.spec and work.spec. */

// Regexes match only the start: the reveal animation splits some headings into one element per line.
const ABOUT_HEADINGS = [
  /^A creative studio for everything digital/,
  /^The road/,
  /^The numbers/,
  /^What we/,
  /^How we work/,
  /^How we decide/,
  /^Got something/,
];

const OVERFLOW_WIDTHS = [320, 768, 1440];

test.describe('About Page: Structure & Health', { tag: '@critical' }, () => {
  test('every section heading renders, in the designed top-to-bottom order', async ({ page, basePage }) => {
    await basePage.navigate('/about');
    await expectSectionOrder(page, ABOUT_HEADINGS);
  });

  test('scrolling the whole page throws no JS errors and no same-origin request fails', async ({ page, basePage, baseURL }) => {
    await expectCleanFullScroll(page, basePage, '/about', baseURL!);
  });

  test('every link on the page works: internal links load, external links are well-formed', async ({ page, basePage }) => {
    await basePage.navigate('/about');
    await expectAllLinksWork(page);
  });
});

test.describe('About Page: Buttons & Sections', () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigate('/about');
  });

  test('"Talk to us" opens the contact page', async ({ page }) => {
    await page.getByRole('link', { name: /Talk to us/ }).click();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test('roadmap runs 2020 to 2026 and ends on infinity', async ({ page }) => {
    const road = page.getByRole('region', { name: 'Roadmap' });
    await expect(road.locator('article')).toHaveCount(6);
    for (const id of ['y2020', 'y2021', 'y2022', 'y2025', 'y2026', 'inf']) {
      await expect(road.locator(`#${id}`)).toBeAttached();
    }
  });

  test('what-we-do links to all six service pages', async ({ page }) => {
    const links = page.getByRole('region', { name: 'What we do' }).getByRole('link');
    await expect(links).toHaveCount(7); // six services + "See the work"
  });
});

test.describe('About Page: Responsive', () => {
  for (const vp of PRODUCTION_VIEWPORTS.filter((v) => OVERFLOW_WIDTHS.includes(v.width))) {
    test(`no horizontal overflow at ${vp.name}`, async ({ page, basePage }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await basePage.navigate('/about');
      await basePage.verifyNoHorizontalOverflow();
    });
  }
});
