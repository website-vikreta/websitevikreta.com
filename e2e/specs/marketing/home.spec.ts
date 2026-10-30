import { test, expect } from '../../fixtures/test';
import { PRODUCTION_VIEWPORTS } from '../../helpers/responsive-viewports';
import { TEST_LEAD } from '../../fixtures/test-data';
import { expectAllLinksWork, expectCleanFullScroll, expectSectionOrder } from '../../helpers/page-checks';

/**
 * Landing page: the main things only. Details live elsewhere —
 * title/meta/JSON-LD in seo.spec, per-section markup in the component unit tests,
 * and broken images are caught by the full-page health check below.
 */

/** Every landing section heading, in the order they must appear top to bottom (text match is case-insensitive). */
const SECTION_HEADINGS = [
  'We automate the busywork',
  "WHO WE'VE BUILT FOR",
  'RESULTS, NOT PROMISES',
  'WHAT WE DO',
  'HOW WE WORK',
  'WHY WEBSITE VIKRETA',
  'THE NUMBERS SO FAR',
  'WHAT CLIENTS SAY',
  'BOOK A FREE CALL',
  'QUESTIONS, ANSWERED',
  'FROM THE BLOG',
  "TELL US WHAT'S SLOWING YOU DOWN",
];

const STATS = [
  ['5+', 'Years working with founders and teams across the globe'],
  ['68+', 'Projects shipped: websites, apps, automation, design'],
  ['6,360+', 'Hours saved for clients since we went AI-first'],
];

const SERVICE_HREFS = [
  '/services/ai-automations',
  '/services/web-development',
  '/services/web-mobile-app-development',
  '/services/uiux-design',
  '/services/digital-marketing',
];

const TESTIMONIAL_NAMES = ['Darcy McGilvery', 'John Kim', 'Stacey Bae', 'Rudra Ghodke', 'Sang Hyun Han', 'Benoit Marcell'];

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
  test('Book a free audit → audit modal → submit sends the fake test identity, never a real lead', { tag: ['@forms', '@critical'] }, async ({
    page,
    homePage,
    auditModal,
  }) => {
    await homePage.goto();
    await homePage.waitForHeroReveal();
    await auditModal.openViaTrigger(homePage.primaryCta);
    await auditModal.fillForm(TEST_LEAD);

    const sent = page.waitForRequest(/api\.emailjs\.com/);
    await auditModal.submit();
    await auditModal.verifySuccessState();

    const request = await sent;
    expect(await (await request.response())?.text(), 'EmailJS was not mocked').toBe('OK');
    expect(request.postDataJSON().template_params).toMatchObject({ name: TEST_LEAD.name, email: TEST_LEAD.email, mobile: TEST_LEAD.phone });
  });

  test('"See our work" navigates to /work', async ({ page, homePage }) => {
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
    await expect(page.locator('.audit-modal-content')).toBeVisible();
  });
});

test.describe('Landing Page: Sections', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('stats show the right values', async ({ homePage }) => {
    await homePage.stats.scrollIntoViewIfNeeded();
    for (const [value, label] of STATS) {
      const stat = homePage.stats.getByRole('listitem').filter({ hasText: label });
      await expect(stat, `Missing stat "${label}"`).toBeVisible();
      await expect(stat).toContainText(value);
    }
  });

  test('services: five cards link to the right service pages', async ({ homePage }) => {
    await expect(homePage.serviceCards).toHaveCount(5);
    for (const href of SERVICE_HREFS) {
      await expect(homePage.serviceCards.and(homePage.page.locator(`a[href="${href}"]`)), `No card links to ${href}`).toHaveCount(1);
    }
  });

  test('services: a card actually navigates', async ({ page, homePage }) => {
    const link = homePage.serviceCards.and(page.locator('a[href="/services/web-development"]'));
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

  test('testimonials: quotes and author names render', async ({ homePage }) => {
    await expect(homePage.testimonials.locator('blockquote').first()).toBeAttached();
    for (const name of TESTIMONIAL_NAMES) await expect(homePage.testimonials).toContainText(name);
  });

  test('FAQ: answers expand and collapse', async ({ homePage }) => {
    await expect(homePage.faqs).toHaveCount(6);
    const first = homePage.faqs.first();
    await first.scrollIntoViewIfNeeded();
    await first.locator('summary').click();
    await expect(first).toHaveAttribute('open', '');
    await first.locator('summary').click();
    await expect(first).not.toHaveAttribute('open', '');
  });

  test('contact: inline form is on the page', async ({ homePage }) => {
    await expect(homePage.contactSection.locator('form')).toBeAttached();
  });

  test('book a call: Calendly embed when configured, contact fallback otherwise', async ({ homePage }) => {
    if ((await homePage.bookCall.locator('iframe').count()) > 0) {
      await expect(homePage.bookCall.locator('iframe[title*="Book a free call"]')).toBeAttached();
    } else {
      await expect(homePage.bookCall.getByRole('link', { name: 'Contact us' })).toHaveAttribute('href', '/contact');
    }
  });

  test('blog preview: clicking a post title opens that post', async ({ page, homePage }) => {
    const link = homePage.blogCards.first().getByRole('heading', { level: 3 }).getByRole('link');
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
