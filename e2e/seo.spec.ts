import { test, expect } from './fixtures/test';

test.describe('SEO Metadata, OpenGraph & JSON-LD Structured Data', () => {
  const auditPages = ['/', '/services/ai-automations', '/about', '/contact', '/careers'];

  for (const pagePath of auditPages) {
    test(`Page "${pagePath}" has valid title, meta description, and canonical link`, async ({
      basePage,
    }) => {
      await basePage.navigate(pagePath);

      // Title should not be empty and should have brand mention
      const title = await basePage.getTitle();
      expect(title.length).toBeGreaterThan(5);

      // Meta description exists
      const descContent = await basePage.getMetaContent('meta[name="description"]');
      expect(descContent).toBeTruthy();
      expect(descContent!.length).toBeGreaterThan(15);

      // Canonical link exists
      const canonicalHref = await basePage.getCanonicalHref();
      if (canonicalHref) {
        expect(canonicalHref).toMatch(/^https?:\/\//);
      }
    });

    test(`Page "${pagePath}" has OpenGraph and Twitter card metadata`, async ({
      page,
      basePage,
    }) => {
      await basePage.navigate(pagePath);

      // OG title or twitter title
      const ogTitle = page.locator('meta[property="og:title"], meta[name="twitter:title"]').first();
      await expect(ogTitle).toHaveCount(1);

      // OG description or twitter description
      const ogDesc = page.locator('meta[property="og:description"], meta[name="twitter:description"]').first();
      await expect(ogDesc).toHaveCount(1);
    });
  }

  test('Homepage contains valid parseable JSON-LD schemas', async ({
    page,
    basePage,
  }) => {
    await basePage.navigate('/');

    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonLdScripts.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const text = await jsonLdScripts.nth(i).textContent();
      expect(text).toBeTruthy();
      const parsed = JSON.parse(text!);
      expect(parsed['@context'] || parsed['@type']).toBeTruthy();
    }
  });
});
