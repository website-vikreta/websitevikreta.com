import { test, expect } from './fixtures/test';
import { SERVICE_ROUTES } from './pages/ServicesPage';

test.describe('Services Directory, Sub-Pages & 308 Permanent Redirects', () => {
  for (const { path } of SERVICE_ROUTES) {
    test(`Service route "${path}" renders with HTTP 200 and H1`, async ({
      page,
      servicesPage,
    }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      await servicesPage.waitForStability();
      await expect(servicesPage.getH1()).toBeVisible();
    });
  }

  test('Services overview "/services" renders with HTTP 200 (coming-soon page, no h1)', async ({ page }) => {
    const response = await page.goto('/services');
    expect(response?.status()).toBe(200);
  });

  test('Legacy slug /services/apps-crm permanently redirects to /services/web-mobile-app-development', async ({
    servicesPage,
  }) => {
    await servicesPage.verifyPermanentRedirect(
      '/services/apps-crm',
      '/services/web-mobile-app-development'
    );
  });

  test('Legacy slug /services/web-and-mobile-apps permanently redirects to /services/web-mobile-app-development', async ({
    servicesPage,
  }) => {
    await servicesPage.verifyPermanentRedirect(
      '/services/web-and-mobile-apps',
      '/services/web-mobile-app-development'
    );
  });
});
