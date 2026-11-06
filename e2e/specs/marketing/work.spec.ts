import { test, expect } from '../../fixtures/test';
import { PRODUCTION_VIEWPORTS } from '../../helpers/responsive-viewports';
import { expectAllLinksWork, expectCarouselButtonsMove, expectCleanFullScroll, expectSectionOrder, submitInlineAuditForm } from '../../helpers/page-checks';

/**
 * Work pages (/work, /work/case-studies, /work/[slug]): the main things only,
 * same approach as home.spec. Shared section components (stats, FAQ markup) are not re-tested in depth.
 */

const WORK_HEADINGS = [
  'Proof over promises.',
  'Case studies',
  'Selected websites',
  'The Numbers So Far',
  'What clients say',
  'Frequently Asked Questions',
  'Have a problem like these?',
];

const CASE_STUDIES = [
  { slug: 'simpli-home', liveSite: null },
  { slug: 'sustainable-bitcoin-protocol', liveSite: 'https://www.sustainablebtc.org/' },
  { slug: 'ap-cleanco', liveSite: null },
];

const OVERFLOW_WIDTHS = [320, 768, 1440];

test.describe('Work Page: Structure & Health', { tag: '@critical' }, () => {
  test('every section heading renders, in the designed top-to-bottom order', async ({ page, basePage }) => {
    await basePage.navigate('/work');
    await expectSectionOrder(page, WORK_HEADINGS);
  });

  test('scrolling the whole page throws no JS errors and no same-origin request fails', async ({ page, basePage, baseURL }) => {
    await expectCleanFullScroll(page, basePage, '/work', baseURL!);
  });

  for (const path of ['/work', '/work/case-studies']) {
    test(`every link on ${path} works: internal links load, external links are well-formed`, async ({ page, basePage }) => {
      await basePage.navigate(path);
      await expectAllLinksWork(page);
    });
  }
});

test.describe('Work Page: Sections', () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigate('/work');
  });

  test('case studies: all three are linked, and clicking one opens it', async ({ page }) => {
    const section = page.getByRole('region', { name: 'Case Studies' });
    for (const { slug } of CASE_STUDIES) {
      await expect(section.locator(`a[href="/work/${slug}"]`), `No link to /work/${slug}`).toHaveCount(1);
    }
    const link = section.locator(`a[href="/work/${CASE_STUDIES[0].slug}"]`);
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await expect(page).toHaveURL(new RegExp(`/work/${CASE_STUDIES[0].slug}$`));
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('selected websites: every project links out to its live site in a new, safe tab', async ({ page }) => {
    // SlopeProjectGrid renders the list twice (mobile grid + desktop columns, one CSS-hidden), so count unique hrefs.
    const links = page.getByRole('region', { name: 'Selected Websites' }).locator('a[href^="http"]');
    const hrefs = await links.evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(new Set(hrefs).size).toBe(6);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
  });

  test('testimonials: Next and Previous buttons move the carousel', async ({ page }) => {
    await expectCarouselButtonsMove(page.getByRole('region', { name: 'Client testimonials' }));
  });

  test('FAQ: clicking a question expands its answer', async ({ page }) => {
    const question = page.getByRole('button', { name: 'How long does a typical project take?' });
    await question.scrollIntoViewIfNeeded();
    await expect(question).toHaveAttribute('aria-expanded', 'false');
    await question.click();
    await expect(question).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('region', { name: 'How long does a typical project take?' })).toBeVisible();
  });

  test('"Book a Free Call" form submits with the fake test identity (mocked email)', { tag: '@forms' }, async ({ page }) => {
    const form = page.locator('#work-cta');
    await form.scrollIntoViewIfNeeded();
    await submitInlineAuditForm(page, form);
  });
});

test.describe('Case Studies Page (/work/case-studies)', () => {
  test('lists all three case studies, and "View all work" goes back to /work', async ({ page, basePage }) => {
    await basePage.navigate('/work/case-studies');
    await expect(page.getByRole('heading', { level: 1, name: 'Case studies' })).toBeVisible();
    const list = page.getByRole('region', { name: 'All Case Studies' });
    for (const { slug } of CASE_STUDIES) {
      await expect(list.locator(`a[href="/work/${slug}"]`), `No link to /work/${slug}`).toHaveCount(1);
    }
    const viewAll = page.getByRole('link', { name: /View all work/ });
    await viewAll.scrollIntoViewIfNeeded();
    await viewAll.click();
    await expect(page).toHaveURL(/\/work$/);
  });
});

test.describe('Case Study Detail (/work/[slug])', () => {
  for (const { slug, liveSite } of CASE_STUDIES) {
    test(`/work/${slug} shows the full story and links back to /work`, async ({ page, basePage }) => {
      await basePage.navigate(`/work/${slug}`);
      await expect(page.locator('h1').first()).toBeVisible();
      for (const name of ['The problem', 'What we did', 'What changed']) {
        await expect(page.getByRole('heading', { name }), `Missing "${name}"`).toBeAttached();
      }
      if (liveSite) {
        const visit = page.getByRole('link', { name: /Visit live site/ });
        await expect(visit).toHaveAttribute('href', liveSite);
        await expect(visit).toHaveAttribute('target', '_blank');
        await expect(visit).toHaveAttribute('rel', /noopener/);
      }
      await page.getByRole('link', { name: 'Back to work' }).click();
      await expect(page).toHaveURL(/\/work$/);
    });
  }

  test('an unknown case study returns HTTP 404', async ({ page }) => {
    const response = await page.goto('/work/this-case-study-does-not-exist');
    expect(response?.status()).toBe(404);
  });
});

test.describe('Work Page: Responsive', () => {
  for (const vp of PRODUCTION_VIEWPORTS.filter((v) => OVERFLOW_WIDTHS.includes(v.width))) {
    test(`no horizontal overflow at ${vp.name}`, async ({ page, basePage }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await basePage.navigate('/work');
      await basePage.verifyNoHorizontalOverflow();
    });
  }
});
