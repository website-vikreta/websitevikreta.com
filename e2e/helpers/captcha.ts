import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Waits for Cloudflare's native Turnstile widget to finish before a form is submitted.
 * With no site key (CI) the widget does not render, so there is nothing to wait for.
 */
export async function waitForCaptcha(scope: Page | Locator): Promise<void> {
  const widget = scope.locator('.wv-turnstile');
  if (!(await widget.count())) return;
  // Cloudflare does not run a challenge for a widget that is off screen, so bring it into view first.
  await widget.scrollIntoViewIfNeeded();
  await expect(widget).toHaveAttribute('data-status', 'success', { timeout: 30_000 });
}
