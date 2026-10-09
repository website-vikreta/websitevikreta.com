import { Page } from '@playwright/test';

/**
 * Intercepts EmailJS HTTP API requests and returns a mock 200 OK response.
 * Prevents test runs from sending real emails while fully validating the UI
 * submission flow, loading state, and success message banner.
 */
export async function setupEmailJSMock(page: Page): Promise<void> {
  await page.route('https://api.emailjs.com/**', async (route) => {
    console.log(`[Playwright Mock]: Intercepted EmailJS call to ${route.request().url()}`);
    await route.fulfill({
      status: 200,
      contentType: 'text/plain',
      body: 'OK',
    });
  });
}
