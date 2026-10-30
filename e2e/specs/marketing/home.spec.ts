import { test, expect } from '../../fixtures/test';
import { PRODUCTION_VIEWPORTS } from '../../helpers/responsive-viewports';
import { TEST_LEAD } from '../../fixtures/test-data';
import { expectAllLinksWork, expectCleanFullScroll, expectSectionOrder } from '../../helpers/page-checks';

/**
 * Landing page: the main things only. Details live elsewhere —
 * title/meta/JSON-LD in seo.spec, per-section markup in the component unit tests,
 * and broken images are caught by the full-page health check below.
 */

/** Every landing section heading, in the order they must appear top to bottom. */
const SECTION_HEADINGS = [
  "We don't just execute. We think first.",
  'The Numbers So Far',
  "We don't build pages.",
  "Who we've built for",
  'Proof over promises.',
  'The AI stack we actually use.',
  'Work that moved numbers.',
  'The thinking behind the work.',
];

const STATS = [
  { label: 'Years working with founders and teams across the globe: 5+', value: '5' },
  { label: 'Projects shipped: websites, apps, automation, design: 68+', value: '68' },
  { label: 'Saved for clients since we went AI-first: 6360+hrs', value: '6360' },
  { label: 'Tools we can use: no limitation, only solutions: unlimited', value: null },
];

const SERVICE_HREFS = [
  '/services/ai-automations',
  '/services/web-development',
  '/services/uiux-design',
  '/services/web-mobile-app-development',
  '/services/digital-marketing',
];

const TESTIMONIALS = [
  { metric: '11 hrs', quote: 'Our team finally does the work we hired them for.', role: 'Darcy McGilvery, Simpli Home' },
  { metric: '3 weeks', quote: 'Fastest turnaround we had.', role: 'Co-founder, AP Cleanco' },
  { metric: '3+ yrs', quote: 'They shaped our entire product from the ground up', role: 'Co-founder, Sustainable Bitcoin Protocol' },
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

test.describe('Landing Page: Hero & Lead Journey (mocked email)', () => {
  test('Talk to Us → contact form → submit sends the fake test identity, never a real lead', { tag: ['@forms', '@critical'] }, async ({
    page,
    homePage,
    contactPage,
  }) => {
    await homePage.goto();
    await homePage.waitForHeroReveal();
    await homePage.primaryCta.click();
    await expect(page).toHaveURL(/\/contact$/);

    const { name, jobOrWebsite, email, phone } = TEST_LEAD;
    await contactPage.fillForm({ name, jobOrWebsite, email, phone });

    const sent = page.waitForRequest(/api\.emailjs\.com/);
    await contactPage.submit();
    await contactPage.verifySuccessState();

    const request = await sent;
    expect(await (await request.response())?.text(), 'EmailJS was not mocked').toBe('OK');
    expect(request.postDataJSON().template_params).toMatchObject({ name, email, mobile: phone, service: jobOrWebsite });
  });

  test('secondary CTA navigates to /work', async ({ page, homePage }) => {
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

  test('stats show the right values', async ({ homePage }) => {
    await homePage.stats.scrollIntoViewIfNeeded();
    for (const { label, value } of STATS) {
      const stat = homePage.stats.getByRole('region', { name: label, exact: true });
      await expect(stat, `Missing stat "${label}"`).toBeVisible();
      if (value) await expect(stat).toContainText(value);
    }
  });

  test('services: all five cards link to the right service pages', async ({ homePage }) => {
    await expect(homePage.serviceCards).toHaveCount(5);
    for (const href of SERVICE_HREFS) {
      // A card has a click-through overlay plus its "Explore More" button; the button is the real link.
      await expect(
        homePage.serviceCards.locator(`a[href="${href}"]`).filter({ hasText: 'Explore More' }),
        `No card links to ${href}`,
      ).toHaveCount(1);
    }
  });

  test('services: "Explore More" actually navigates', async ({ page, homePage }) => {
    const link = homePage.serviceCards.locator('a[href="/services/web-development"]').filter({ hasText: 'Explore More' });
    await link.scrollIntoViewIfNeeded();
    // The bento card grows on hover and carries a full-size click-through overlay, so a mouse click can land
    // mid-reflow or on the overlay. Activating the real link from the keyboard is what tabbing onto a card does.
    await link.press('Enter');
    await expect(page).toHaveURL(/\/services\/web-development$/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('featured work: clicking a case study opens it', async ({ page, homePage }) => {
    const link = homePage.featuredWork.locator('a[href^="/work/"]').first();
    await link.scrollIntoViewIfNeeded();
    const href = await link.getAttribute('href');
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('testimonials: each button shows its own metric, quote and author', async ({ homePage }) => {
    await homePage.testimonials.scrollIntoViewIfNeeded();
    // Visit in reverse so every click is a real change (index 0 is already active).
    for (const t of [...TESTIMONIALS].reverse()) {
      await homePage.testimonials.getByRole('button', { name: `View ${t.role} testimonial` }).click();
      await expect(homePage.testimonials).toContainText(t.metric);
      await expect(homePage.testimonials).toContainText(t.quote);
      await expect(homePage.testimonials).toContainText(`— ${t.role}`);
    }
  });

  test('blog preview: clicking a post title opens that post', async ({ page, homePage }) => {
    const link = homePage.blogPreviewCards.first().getByRole('heading', { level: 3 }).getByRole('link');
    await link.scrollIntoViewIfNeeded();
    const href = await link.getAttribute('href');
    expect(href).toMatch(/^\/blog\/[^/]+\/[^/]+$/);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator('h1').first()).toBeVisible();
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
