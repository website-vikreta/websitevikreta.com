import { Page } from '@playwright/test';

/**
 * Intercepts EmailJS HTTP API requests and returns a mock 200 OK response.
 * Prevents test runs from sending real emails while fully validating the UI
 * submission flow, loading state, and success message banner.
 */
/**
 * The careers "Apply" form posts to our own /api/careers/apply, which (server-side, out of reach of the
 * EmailJS mock above) uploads the resume to Sanity, creates a real submission record AND emails HR.
 * Intercept it in the browser so no test can ever create a real application. `mocked: true` lets
 * tests prove the reply came from here.
 */
export async function setupCareersApplyMock(page: Page): Promise<void> {
  await page.route('**/api/careers/apply', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, mocked: true }) });
  });
}

/**
 * Next.js server actions (POST with a `Next-Action` header) are how blog likes and comments are
 * written to Sanity (actions/like-post.ts, actions/submit-comment.ts). Tests never click those,
 * but as a safety net any server action is aborted in the browser, so no test can bump a real like
 * count or publish a real comment. Every other request passes through untouched.
 */
export async function blockServerActions(page: Page): Promise<void> {
  await page.route('**/*', async (route) => {
    const request = route.request();
    if (request.method() === 'POST' && (await request.headerValue('next-action'))) {
      console.warn(`[Playwright Guard]: blocked a server action on ${request.url()}`);
      return route.abort();
    }
    return route.fallback();
  });
}

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
