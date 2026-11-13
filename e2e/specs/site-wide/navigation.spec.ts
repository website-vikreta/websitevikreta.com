import { test, expect } from '../../fixtures/test';

test.describe('Global Navigation, Scroll States & Mobile Drawer', () => {
  test('Footer renders all key links and legal navigation', async ({
    page,
    basePage,
  }) => {
    await basePage.navigate('/');

    const footer = page.getByRole('contentinfo');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    // Check legal links
    await expect(footer.locator('a[href*="/legal/privacy-policy"]').first()).toBeVisible();
    await expect(footer.locator('a[href*="/legal/terms-and-conditions"]').first()).toBeVisible();
    await expect(footer.locator('a[href*="/legal/disclaimer"]').first()).toBeVisible();
  });
});
