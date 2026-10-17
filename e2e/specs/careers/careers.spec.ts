import type { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/test';
import { TEST_LEAD } from '../../fixtures/test-data';
import { PRODUCTION_VIEWPORTS } from '../../helpers/responsive-viewports';
import { expectAllLinksWork, expectCleanFullScroll } from '../../helpers/page-checks';

/**
 * Careers (/careers, /careers/[slug]): the main things only, same approach as home/work/about.
 * Openings come live from Sanity and change often, so nothing is hardcoded: active/closed roles are
 * discovered from the listing, and a test skips if the data has no such role right now.
 * The Apply endpoint is mocked in the shared fixture — no test can create a real application or email HR.
 */

const OVERFLOW_WIDTHS = [320, 768, 1440];

const openingLinks = (page: Page) => page.locator('a[href^="/careers/"]');
const hrefsOf = async (page: Page) =>
  [...new Set(await openingLinks(page).evaluateAll((as) => as.map((a) => a.getAttribute('href')!)))];

/** Active roles are the default "Active Roles" filter; closed = everything under "All" minus those. */
async function findRoles(page: Page): Promise<{ active: string[]; closed: string[] }> {
  await page.goto('/careers');
  const active = await hrefsOf(page);
  const all = page.getByRole('button', { name: 'All', exact: true });
  if (!(await all.count())) return { active, closed: [] }; // no filters → no closed roles
  await all.click();
  await expect(all).toHaveAttribute('aria-pressed', 'true');
  return { active, closed: (await hrefsOf(page)).filter((h) => !active.includes(h)) };
}

test.describe('Careers: Structure & Health', { tag: '@critical' }, () => {
  test('scrolling /careers throws no JS errors and no same-origin request fails', async ({ page, basePage, baseURL }) => {
    await expectCleanFullScroll(page, basePage, '/careers', baseURL!);
  });

  test('every link on /careers works', async ({ page, basePage }) => {
    await basePage.navigate('/careers');
    await expectAllLinksWork(page);
  });

  test('every link on an open role page works', async ({ page, basePage }) => {
    const { active } = await findRoles(page);
    test.skip(!active.length, 'No active openings in Sanity right now');
    await basePage.navigate(active[0]);
    await expectAllLinksWork(page);
  });
});

test.describe('Careers: Listing', () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigate('/careers');
  });

  test('every filter button works, and "All" shows at least as many roles as any other', async ({ page }) => {
    const filters = page.getByRole('group', { name: 'Filter openings' }).getByRole('button');
    test.skip(!(await filters.count()), 'Only one category of openings, so no filters are shown');

    const counts: Record<string, number> = {};
    for (const name of await filters.allInnerTexts()) {
      const button = page.getByRole('button', { name, exact: true });
      await button.click();
      await expect(button, `"${name}" did not become the selected filter`).toHaveAttribute('aria-pressed', 'true');
      // Either roles are listed, or the empty-state message is shown — never a blank section.
      await expect(openingLinks(page).first().or(page.getByText('No openings in this category right now.'))).toBeVisible();
      counts[name] = (await hrefsOf(page)).length;
    }
    test.info().annotations.push({ type: 'actual', description: JSON.stringify(counts) });
    expect(counts.All).toBeGreaterThanOrEqual(Math.max(...Object.values(counts)));
  });

  test('clicking a role opens its detail page', async ({ page }) => {
    const first = openingLinks(page).first();
    const href = await first.getAttribute('href');
    await first.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Careers: Role Detail & Apply Form', () => {
  test('an open role shows its details and links back to /careers', async ({ page, basePage }) => {
    const { active } = await findRoles(page);
    test.skip(!active.length, 'No active openings in Sanity right now');
    await basePage.navigate(active[0]);
    await expect(page.locator('h1')).toBeVisible();
    for (const name of ['Prerequisites', 'Skills You Will Work With', 'Apply now!']) {
      await expect(page.getByRole('heading', { name }), `Missing "${name}"`).toBeVisible();
    }
    await page.getByRole('link', { name: 'Back to careers' }).click();
    await expect(page).toHaveURL(/\/careers$/);
  });

  test('Apply form: submitting it empty shows every required-field error', { tag: '@forms' }, async ({ page, basePage }) => {
    const { active } = await findRoles(page);
    test.skip(!active.length, 'No active openings in Sanity right now');
    await basePage.navigate(active[0]);
    await page.getByRole('button', { name: /Submit Application/ }).click();
    await expect(page.getByText('Required', { exact: true })).toBeVisible();
    await expect(page.getByText('Valid email required')).toBeVisible();
    await expect(page.getByText('Please upload your resume')).toBeVisible();
  });

  test(
    'Apply form: submits with the fake test identity and a dummy PDF (mocked, nothing reaches HR or Sanity)',
    { tag: ['@forms', '@critical'] },
    async ({ page, basePage }) => {
      const { active } = await findRoles(page);
      test.skip(!active.length, 'No active openings in Sanity right now');
      await basePage.navigate(active[0]);

      await page.locator('input[name="name"]').fill(TEST_LEAD.name);
      await page.locator('input[name="email"]').fill(TEST_LEAD.email);
      await page.locator('input[name="phone"]').fill(TEST_LEAD.phone);
      await page.locator('textarea[name="notes"]').fill(TEST_LEAD.message);
      await page.locator('input[type="file"]').setInputFiles({
        name: 'playwright-tester-1-resume.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('%PDF-1.4\n% [PLAYWRIGHT TEST] dummy resume, please ignore\n'),
      });

      const sent = page.waitForRequest('**/api/careers/apply');
      await page.getByRole('button', { name: /Submit Application/ }).click();
      await expect(page.getByText(/Thanks for applying/)).toBeVisible();

      const request = await sent;
      expect(await (await request.response())?.json(), 'Apply endpoint was not mocked').toMatchObject({ mocked: true });
      const body = request.postDataBuffer()!.toString();
      for (const value of [TEST_LEAD.name, TEST_LEAD.email, active[0].split('/').pop()!]) {
        expect(body, `Application payload is missing "${value}"`).toContain(value);
      }
    },
  );

  test('a closed role shows "Applications closed" instead of the form', async ({ page, basePage }) => {
    const { closed } = await findRoles(page);
    test.skip(!closed.length, 'No closed openings in Sanity right now');
    await basePage.navigate(closed[0]);
    await expect(page.getByRole('heading', { name: 'Applications closed' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Submit Application/ })).toHaveCount(0);
    await page.getByRole('link', { name: /Browse open roles/ }).click();
    await expect(page).toHaveURL(/\/careers$/);
  });

  test('an unknown role returns HTTP 404', async ({ page }) => {
    const response = await page.goto('/careers/this-role-does-not-exist');
    expect(response?.status()).toBe(404);
  });
});

test.describe('Careers: Responsive', () => {
  for (const vp of PRODUCTION_VIEWPORTS.filter((v) => OVERFLOW_WIDTHS.includes(v.width))) {
    test(`no horizontal overflow at ${vp.name}`, async ({ page, basePage }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await basePage.navigate('/careers');
      await basePage.verifyNoHorizontalOverflow();
    });
  }
});
