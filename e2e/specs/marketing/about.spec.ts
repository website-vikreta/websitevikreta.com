import { test, expect } from '../../fixtures/test';
import { PRODUCTION_VIEWPORTS } from '../../helpers/responsive-viewports';
import { expectAllLinksWork, expectCleanFullScroll, expectSectionOrder, submitInlineAuditForm } from '../../helpers/page-checks';

/** About page: the main things only, same approach as home.spec and work.spec. */

// Regexes match only the start: the reveal animation splits some headings into one element per line.
const ABOUT_HEADINGS = [
  /^We used to build pages/,
  /^We start with your bottleneck/,
  'How we decide what to build',
  /^The people and process behind/,
  'The Numbers So Far',
  "Who we've built for",
  /^What working with us actually/,
  "Tell Us What's Broken",
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

  test('"Get in Touch" opens the contact page', async ({ page }) => {
    await page.getByRole('link', { name: /Get in Touch/ }).click();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test('"Learn More" scrolls down to the vision section', async ({ page }) => {
    const vision = page.getByRole('region', { name: 'Our Vision' });
    await expect(vision).not.toBeInViewport();
    await page.getByRole('link', { name: /Learn More/ }).click();
    await expect(page).toHaveURL(/\/about#vision$/);
    await expect(vision).toBeInViewport();
  });

  test('core values list all six principles and "How we work" shows all three cards', async ({ page }) => {
    await expect(page.getByRole('region', { name: 'Core Values' }).getByRole('heading', { level: 3 })).toHaveCount(6);
    await expect(page.getByRole('region', { name: 'How We Work' }).getByRole('heading', { level: 3 })).toHaveCount(3);
  });

  test('"Book a Free Call" form submits with the fake test identity (mocked email)', { tag: '@forms' }, async ({ page }) => {
    const form = page.locator('#book-a-call');
    await form.scrollIntoViewIfNeeded();
    await submitInlineAuditForm(page, form);
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
