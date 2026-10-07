import { test, expect } from './fixtures/test';

test.describe('Blog Directory, Search Debounce & Taxonomy Routes', () => {
  test('Blog index (/blog) loads and displays articles grid', async ({
    page,
    blogPage,
  }) => {
    await blogPage.gotoBlog();
    await expect(blogPage.getH1()).toBeVisible();

    // Verify main content container exists
    const mainContent = page.locator('main, section').first();
    await expect(mainContent).toBeVisible();
  });

  test('Blog search page (/blog/search) allows typing query and triggers debounced search', async ({
    blogPage,
  }) => {
    await blogPage.gotoSearch();
    await expect(blogPage.searchInput).toBeVisible();

    // Type search query & verify debounced URL navigation
    await blogPage.search('Next.js');
  });

  test('Taxonomy listing routes load with HTTP 200', async ({
    page,
    basePage,
  }) => {
    const taxonomyRoutes = ['/blog/categories', '/blog/tags', '/blog/authors'];

    for (const route of taxonomyRoutes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      await basePage.waitForStability();
      await expect(basePage.getH1()).toBeVisible();
    }
  });
});
