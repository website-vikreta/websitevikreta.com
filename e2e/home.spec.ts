import { test, expect } from './fixtures/test';
import { PRODUCTION_VIEWPORTS } from './helpers/responsive-viewports';

const HEADLINE = "We don't just execute. We think first.";

test.describe('Landing Page: Hero & CTAs', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('renders the headline as a single accessible h1', async ({ homePage }) => {
    await expect(homePage.getH1()).toHaveAttribute('aria-label', HEADLINE);
  });

  test('primary CTA navigates to /contact', async ({ page, homePage }) => {
    await homePage.waitForHeroReveal();
    await homePage.primaryCta.click();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test('secondary CTA navigates to /work', async ({ page, homePage }) => {
    await homePage.waitForHeroReveal();
    await homePage.secondaryCta.click();
    await expect(page).toHaveURL(/\/work$/);
  });

  test('document title and meta description are set', async ({ basePage }) => {
    await expect(basePage.page).toHaveTitle('Website Vikreta | AI-First Web Agency');
    expect(await basePage.getMetaContent('meta[name="description"]')).toContain('AI-first web agency');
  });

  test('exposes ProfessionalService JSON-LD', async ({ page }) => {
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw!);
    expect(data['@type']).toBe('ProfessionalService');
    expect(data.name).toBe('Website Vikreta');
  });
});

test.describe('Landing Page: Content Sections', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('stats section shows all four figures', async ({ homePage }) => {
    await homePage.stats.scrollIntoViewIfNeeded();
    await expect(homePage.stats.getByRole('heading', { name: 'The Numbers So Far' })).toBeVisible();
    await expect(homePage.stats.getByRole('region')).toHaveCount(4);
  });

  test('services stack lists five cards linking to each service page', async ({ homePage }) => {
    await expect(homePage.serviceCards).toHaveCount(5);
    for (const href of [
      '/services/ai-automations',
      '/services/web-development',
      '/services/uiux-design',
      '/services/web-mobile-app-development',
      '/services/digital-marketing',
    ]) {
      await expect(homePage.serviceCards.locator(`a[href="${href}"]`)).toHaveCount(1);
    }
  });

  test('"Explore More" opens the matching service page', async ({ page, homePage }) => {
    const link = homePage.serviceCards.locator('a[href="/services/web-development"]');
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await expect(page).toHaveURL(/\/services\/web-development$/);
  });

  test('client logo marquee loads every image', async ({ page, homePage }) => {
    // The marquee never settles, so scroll its heading instead of a (moving) logo.
    await page.getByRole('heading', { name: "Who we've built for" }).scrollIntoViewIfNeeded();
    await expect(homePage.clientLogos.first()).toBeVisible();
    const broken = await homePage.clientLogos.evaluateAll(
      (imgs) => (imgs as HTMLImageElement[]).filter((i) => i.complete && i.naturalWidth === 0).length,
    );
    expect(broken).toBe(0);
  });

  test('featured work links to case studies', async ({ homePage }) => {
    await homePage.featuredWork.scrollIntoViewIfNeeded();
    await expect(homePage.featuredWork.locator('a[href^="/work/"]').first()).toBeVisible();
  });

  test('tech stack heading is rendered', async ({ homePage }) => {
    await expect(homePage.techStack.getByRole('heading', { name: 'The AI stack we actually use.' })).toBeAttached();
  });

  test('testimonial switcher changes the active quote', async ({ page, homePage }) => {
    await homePage.testimonialSwitcher.first().scrollIntoViewIfNeeded();
    await expect(homePage.testimonialSwitcher).toHaveCount(3);
    await expect(page.getByText('11 hrs')).toBeVisible();
    await homePage.testimonialSwitcher.nth(1).click();
    await expect(page.getByText('3 weeks')).toBeVisible();
  });

  test('blog preview shows three posts', async ({ homePage }) => {
    await homePage.blogPreviewCards.first().scrollIntoViewIfNeeded();
    await expect(homePage.blogPreviewCards).toHaveCount(3);
  });
});

test.describe('Landing Page: Responsive', () => {
  for (const vp of PRODUCTION_VIEWPORTS) {
    test(`no horizontal overflow at ${vp.name}`, async ({ page, homePage }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await homePage.goto();
      await homePage.verifyNoHorizontalOverflow();
    });
  }
});
