import { test, expect } from '../../fixtures/test';

/** Smoke coverage for routes the feature specs don't visit: each must return 200 and render an h1. */
const STATIC_ROUTES = [
  '/about',
  '/careers',
  '/faq',
  '/work',
  '/work/case-studies',
  '/blog/labels',
  '/legal/privacy-policy',
  '/legal/terms-and-conditions',
  '/legal/disclaimer',
  '/search',
];

/** Dynamic routes: open the listing, follow its first detail link. Slugs come from live content, so nothing is hardcoded. */
const DETAIL_ROUTES = [
  { listing: '/work', detail: /^\/work\/(?!case-studies)[^/?#]+$/ },
  { listing: '/careers', detail: /^\/careers\/[^/?#]+$/ },
  { listing: '/blog', detail: /^\/blog\/[^/?#]+\/[^/?#]+$/ }, // /blog/{category}/{post}
  { listing: '/blog/categories', detail: /^\/blog\/categories\/[^/?#]+$/ },
  { listing: '/blog/tags', detail: /^\/blog\/tags\/[^/?#]+$/ },
  { listing: '/blog/authors', detail: /^\/blog\/authors\/[^/?#]+$/ },
  { listing: '/blog/labels', detail: /^\/blog\/labels\/[^/?#]+$/ },
];

async function firstDetailHref(page: import('@playwright/test').Page, listing: string, detail: RegExp) {
  await page.goto(listing);
  const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href') ?? ''));
  const href = hrefs.find((h) => detail.test(h));
  expect(href, `No link matching ${detail} on ${listing}`).toBeTruthy();
  return href!;
}

test.describe('Smoke: every remaining route loads', { tag: '@smoke' }, () => {
  for (const route of STATIC_ROUTES) {
    test(`"${route}" renders with HTTP 200 and H1`, async ({ page, basePage }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      await basePage.waitForStability();
      await expect(basePage.getH1()).toBeVisible();
    });
  }

  test('"/coming-soon" renders with HTTP 200 (no h1 by design)', async ({ page }) => {
    const response = await page.goto('/coming-soon');
    expect(response?.status()).toBe(200);
  });

  for (const { listing, detail } of DETAIL_ROUTES) {
    test(`First detail page linked from "${listing}" renders with HTTP 200 and H1`, async ({ page, basePage }) => {
      const href = await firstDetailHref(page, listing, detail);
      test.info().annotations.push({ type: 'expected', description: `${href} renders with HTTP 200 and H1` });

      const response = await page.goto(href);
      expect(response?.status()).toBe(200);

      await basePage.waitForStability();
      await expect(basePage.getH1()).toBeVisible();
    });
  }

  test('Legacy flat blog URL /blog/{post} permanently redirects to /blog/{category}/{post}', async ({
    page,
    servicesPage,
  }) => {
    const canonical = await firstDetailHref(page, '/blog', DETAIL_ROUTES[2].detail);
    const legacy = `/blog/${canonical.split('/').pop()}`;
    await servicesPage.verifyPermanentRedirect(legacy, canonical);
  });

  test('Unknown route returns HTTP 404', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response?.status()).toBe(404);
  });
});
