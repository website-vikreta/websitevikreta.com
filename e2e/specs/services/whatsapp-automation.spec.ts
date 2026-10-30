import { test, expect } from '../../fixtures/test';

const PATH = '/services/ai-automations/whatsapp-automation';

// Deliberately small: a health check, the section outline and the structured data. A fuller suite
// follows once the page copy and layout settle after team review.
test.describe('WhatsApp Automation page', () => {
  test('renders with HTTP 200, one H1 and the right title', { tag: '@smoke' }, async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toContainText('WhatsApp automation');
    await expect(page).toHaveTitle(/WhatsApp Automation/i);
  });

  test('has every main section in the page', async ({ page }) => {
    await page.goto(PATH);

    for (const heading of [
      /Where buyers drop off/i,
      /Plug every leak/i,
      /Calculate what returned COD orders cost/i,
      /Why WhatsApp outperforms email and SMS/i,
      /Live in 7 to 14 days/i,
      /What D2C brands report/i,
    ]) {
      await expect(page.getByRole('heading', { name: heading })).toHaveCount(1);
    }
  });

  test('exposes Service and HowTo structured data', async ({ page }) => {
    await page.goto(PATH);

    const graph = await page.$$eval('script[type="application/ld+json"]', (nodes) =>
      nodes.flatMap((n) => {
        const json = JSON.parse(n.textContent ?? '{}');
        return (json['@graph'] ?? [json]).map((item: { '@type': string }) => item['@type']);
      }),
    );
    expect(graph).toEqual(expect.arrayContaining(['Service', 'HowTo', 'BreadcrumbList']));
  });
});
