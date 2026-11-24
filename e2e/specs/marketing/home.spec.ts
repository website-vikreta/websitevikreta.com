import { test, expect } from '../../fixtures/test';
import { PRODUCTION_VIEWPORTS } from '../../helpers/responsive-viewports';
import { expectAllLinksWork, expectCleanFullScroll, expectSectionOrder } from '../../helpers/page-checks';

/**
 * Landing page: the main things only. Details live elsewhere —
 * title/meta/JSON-LD in seo.spec, per-section markup in the component unit tests,
 * and broken images are caught by the full-page health check below.
 */

/** Every landing section heading, in the order they must appear top to bottom (text match is case-insensitive). */
const SECTION_HEADINGS = [
  'What we build',
  'Small team. Real results.',
  'Featured projects',
  'How we work',
  'Got something worth building?',
];

const STATS = [
  ['6+', 'Years working with founders across the globe'],
  ['68+', 'Projects shipped: sites, apps, automations'],
  ['6,360+', 'Hours saved for clients since going AI-first'],
  ['100%', 'Job Success on Upwork, Top Rated'],
];

const SERVICE_HREFS = [
  '/services/ai',
  '/services/web-development',
  '/services/apps-crm',
  '/services/uiux-design',
  '/services/digital-marketing',
];

const OVERFLOW_WIDTHS = [320, 768, 1440];

test.describe('Landing Page: Structure & Health', { tag: '@critical' }, () => {
  test('every section heading renders, in the designed top-to-bottom order', async ({ page, homePage }) => {
    await homePage.goto();
    await expectSectionOrder(page, SECTION_HEADINGS);
  });

  test('scrolling the whole page throws no JS errors and no same-origin request fails', async ({ page, homePage, baseURL }) => {
    await expectCleanFullScroll(page, homePage, '/', baseURL!);
  });

  test('every link on the page works: internal links load, external links are well-formed', async ({ page, homePage }) => {
    await homePage.goto();
    await expectAllLinksWork(page);
  });
});

test.describe('Landing Page: Hero & Lead Journey', () => {
  test('"Book a free Consultation" goes to the contact form, not a popup', { tag: ['@forms', '@critical'] }, async ({ page, homePage }) => {
    await homePage.goto();
    await homePage.waitForHeroReveal();
    await homePage.primaryCta.click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.locator('form.wv-ct-form')).toBeVisible();
  });

  test('"See the work" navigates to /work', async ({ page, homePage }) => {
    await homePage.goto();
    await homePage.waitForHeroReveal();
    await homePage.secondaryCta.click();
    await expect(page).toHaveURL(/\/work$/);
  });

  test('on a phone (390px) the hero CTAs are visible and tappable', async ({ page, homePage }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await homePage.goto();
    await homePage.waitForHeroReveal();
    await expect(homePage.getH1()).toBeVisible();
    await expect(homePage.primaryCta).toBeInViewport();
    await homePage.primaryCta.click();
    await expect(page).toHaveURL(/\/contact$/);
  });
});

test.describe('Landing Page: Sections', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('results tiles show the right values', async ({ homePage }) => {
    await homePage.stats.scrollIntoViewIfNeeded();
    for (const [value, label] of STATS) {
      const stat = homePage.stats.locator('.wv-stat').filter({ hasText: label });
      await expect(stat, `Missing stat "${label}"`).toBeVisible();
      await expect(stat).toContainText(value);
    }
  });

  test('services: five rows link to the right service pages', async ({ homePage }) => {
    await expect(homePage.serviceRows).toHaveCount(5);
    for (const href of SERVICE_HREFS) {
      await expect(homePage.serviceRows.and(homePage.page.locator(`a[href="${href}"]`)), `No row links to ${href}`).toHaveCount(1);
    }
  });

  test('services: a row actually navigates', async ({ page, homePage }) => {
    const link = homePage.serviceRows.and(page.locator('a[href="/services/web-development"]'));
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await expect(page).toHaveURL(/\/services\/web-development$/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('case studies: clicking one opens it', async ({ page, homePage }) => {
    const links = homePage.featuredWork.locator('a[href^="/work/"]');
    expect(await links.count(), 'Expected a featured + 2 case study links').toBeGreaterThanOrEqual(3);
    const link = links.first();
    await link.scrollIntoViewIfNeeded();
    const href = await link.getAttribute('href');
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('process: four numbered steps render', async ({ homePage }) => {
    await homePage.processSteps.first().scrollIntoViewIfNeeded();
    await expect(homePage.processSteps).toHaveCount(5); // 4 text steps + 1 image step
    for (const title of ['Watch', 'Find', 'Build', 'Hand over']) {
      await expect(homePage.processSteps.filter({ hasText: title }).first()).toBeVisible();
    }
  });

  test('testimonials: each tab swaps in its quote and author', async ({ homePage }) => {
    const tabs = homePage.testimonials.getByRole('tab');
    await expect(tabs).toHaveCount(6);
    await expect(homePage.testimonials.locator('blockquote')).toHaveCount(1);
    for (const name of ['Sang Hyun Han', 'Darcy McGilvery', 'Brad van Voorhees', 'John Kim', 'Rudra Ghodke', 'Abhinav Singh']) {
      await homePage.testimonials.getByRole('tab', { name }).click();
      await expect(homePage.testimonials.locator('blockquote')).toContainText(name);
    }
  });

  test('closing CTA: consultation, email and phone are present', async ({ homePage }) => {
    await expect(homePage.ctaSection.getByRole('link', { name: /Book a free Consultation/i })).toHaveAttribute('href', '/contact');
    await expect(homePage.ctaSection.locator('a[href^="mailto:"]')).toBeAttached();
    await expect(homePage.ctaSection.locator('a[href^="tel:"]')).toBeAttached();
  });
});

test.describe('Landing Page: Responsive', () => {
  for (const vp of PRODUCTION_VIEWPORTS.filter((v) => OVERFLOW_WIDTHS.includes(v.width))) {
    test(`no horizontal overflow at ${vp.name}`, async ({ page, homePage }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await homePage.goto();
      await homePage.verifyNoHorizontalOverflow();
    });
  }
});
