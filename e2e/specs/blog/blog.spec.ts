import type { Page } from '@playwright/test';
import { test, expect } from '../../fixtures/test';
import { PRODUCTION_VIEWPORTS } from '../../helpers/responsive-viewports';
import { expectAllLinksWork, expectCleanFullScroll } from '../../helpers/page-checks';

/**
 * Blog (/blog, posts, /blog/search, taxonomies): the main things only, same approach as the other pages.
 * Posts come live from Sanity, so nothing is hardcoded: posts are discovered from the listing.
 * Likes and comments write to Sanity, so tests only check they are present and NEVER click/submit them
 * (the shared fixture also blocks every server action as a safety net).
 */

const OVERFLOW_WIDTHS = [320, 768, 1440];
const POST_HREF = /^\/blog\/(?!tags\/|categories\/|authors\/|labels\/|search)[^/?#]+\/[^/?#]+$/;
const TAXONOMIES = ['categories', 'tags', 'authors', 'labels'];

const cards = (page: Page) => page.locator('main article');

/** href of the first post linked from the current page. */
async function firstPostHref(page: Page): Promise<string> {
  const hrefs = await page.locator('a[href^="/blog/"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
  const href = hrefs.find((h) => POST_HREF.test(h));
  expect(href, 'No blog post link found on the page').toBeTruthy();
  return href!;
}

async function openFirstPost(page: Page): Promise<string> {
  await page.goto('/blog');
  const href = await firstPostHref(page);
  await page.goto(href);
  return href;
}

test.describe('Blog: Structure & Health', { tag: '@critical' }, () => {
  test('scrolling /blog throws no JS errors and no same-origin request fails', async ({ page, basePage, baseURL }) => {
    await expectCleanFullScroll(page, basePage, '/blog', baseURL!);
  });

  for (const path of ['/blog', '/blog/search']) {
    test(`every link on ${path} works`, async ({ page, basePage }) => {
      await basePage.navigate(path);
      await expectAllLinksWork(page);
    });
  }

  test('every link on a blog post works (share, tags, author, table of contents, related)', async ({ page, basePage }) => {
    await openFirstPost(page);
    await basePage.waitForStability();
    await expectAllLinksWork(page);
  });
});

test.describe('Blog: Index (/blog)', () => {
  test.beforeEach(async ({ blogPage }) => {
    await blogPage.gotoBlog();
  });

  test('featured carousel: Next, Previous and the dots switch the active article', async ({ page }) => {
    const carousel = page.getByRole('group', { name: 'Featured articles' });
    const dot = (n: number) => carousel.getByRole('button', { name: new RegExp(`^Show featured article ${n} of`) });
    await expect(dot(1)).toHaveAttribute('aria-current', 'true');

    await carousel.getByRole('button', { name: 'Next featured article' }).click();
    await expect(dot(2)).toHaveAttribute('aria-current', 'true');

    await dot(3).click();
    await expect(dot(3)).toHaveAttribute('aria-current', 'true');

    await carousel.getByRole('button', { name: 'Previous featured article' }).click();
    await expect(dot(2)).toHaveAttribute('aria-current', 'true');
  });

  test('a category link opens search filtered to that category, with results', async ({ page }) => {
    const link = page.locator('a[href^="/blog/search?category="]').first();
    const href = await link.getAttribute('href');
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${href!.replace(/[?]/g, '\\?')}$`));
    await expect(cards(page).first()).toBeVisible();
  });

  test('clicking a post opens it', async ({ page }) => {
    // The last card is in the static "All Blogs" grid — the featured carousel at the top
    // auto-rotates, so its links can change under the cursor.
    const link = cards(page).last().locator('h3 a');
    const href = await link.getAttribute('href');
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Blog: Post Page', () => {
  test('shows its key parts: title, breadcrumb, share, like, contents, tags, comments, related', async ({ page }) => {
    await openFirstPost(page);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Breadcrumb' })).toBeVisible();

    for (const name of ['Post on LinkedIn', 'Post on X', 'Share on Facebook', 'Share on WhatsApp']) {
      const share = page.getByRole('link', { name });
      await expect(share, `Missing share link "${name}"`).toHaveAttribute('target', '_blank');
      await expect(share).toHaveAttribute('rel', /noopener/);
    }
    await expect(page.getByRole('button', { name: 'Copy link' })).toBeVisible();
    // Present only — clicking would write a real like to Sanity.
    await expect(page.getByRole('button', { name: /^(Like|Unlike) this post/ })).toBeVisible();

    await expect(page.getByRole('navigation', { name: 'Table of contents' }).first()).toBeAttached();
    await expect(page.getByRole('heading', { name: 'Tags' })).toBeAttached();
    await expect(page.getByRole('heading', { name: 'Comments' })).toBeAttached();
    await expect(page.getByRole('heading', { name: 'Related reads' })).toBeAttached();
  });

  test('a table-of-contents link jumps to its section', async ({ page }) => {
    await openFirstPost(page);
    const entry = page.getByRole('navigation', { name: 'Table of contents' }).locator('a[href^="#"]:visible').first();
    const target = page.locator(`[id="${(await entry.getAttribute('href'))!.slice(1)}"]`);
    await entry.click();
    await expect(target).toBeInViewport();
  });

  for (const [what, prefix] of [['author', '/blog/authors/'], ['tag', '/blog/tags/'], ['category', '/blog/categories/']] as const) {
    test(`the ${what} link opens the ${what} page, which lists posts`, async ({ page }) => {
      await openFirstPost(page);
      const link = page.locator(`main a[href^="${prefix}"]`).first();
      const href = await link.getAttribute('href');
      await link.scrollIntoViewIfNeeded();
      await link.click();
      await expect(page).toHaveURL(new RegExp(`${href}$`));
      await expect(page.locator('h1')).toBeVisible();
      await expect(cards(page).first()).toBeVisible();
    });
  }
});

test.describe('Blog: Search (/blog/search)', () => {
  test.beforeEach(async ({ blogPage }) => {
    await blogPage.gotoSearch();
    // The filters stream in under Suspense after the header; wait until they are interactive.
    await blogPage.waitForHydrated(blogPage.searchInput);
  });

  test('typing a query updates the URL (debounced) and shows matching results', async ({ page, blogPage }) => {
    await blogPage.search('AI');
    await expect(cards(page).first()).toBeVisible();
  });

  test('a query with no matches shows the empty state, and "Clear filters" resets it', async ({ page, blogPage }) => {
    await blogPage.search('zzqxplaywrightnomatch');
    await expect(page.getByText('No results found')).toBeVisible();
    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(page).toHaveURL(/\/blog\/search$/);
    await expect(cards(page).first()).toBeVisible();
  });

  test('the category filter narrows results and is reflected in the URL', async ({ page }) => {
    const select = page.getByRole('combobox', { name: 'Filter by category' });
    const value = await select.locator('option').nth(1).getAttribute('value');
    await select.selectOption(value!);
    await expect(page).toHaveURL(new RegExp(`category=${value}`));
    await expect(cards(page).first()).toBeVisible();
  });

  test('sorting "Oldest first" is reflected in the URL', async ({ page }) => {
    await page.getByRole('combobox', { name: 'Sort results' }).selectOption({ label: 'Oldest first' });
    await expect(page).toHaveURL(/sortOrder=asc/);
    await expect(cards(page).first()).toBeVisible();
  });

  test('pagination: page 2 shows different posts than page 1', async ({ page }) => {
    const firstOnPage1 = await cards(page).first().locator('h3').innerText();
    const pager = page.getByRole('navigation', { name: 'Search results pages' });
    await pager.getByRole('link', { name: '2', exact: true }).click();
    await expect(page).toHaveURL(/page=2/);
    await expect(cards(page).first().locator('h3')).not.toHaveText(firstOnPage1);
  });
});

test.describe('Blog: Legacy /search', () => {
  test('/search permanently (308) redirects to /blog/search, keeping its filters', async ({ page }) => {
    const res = await page.request.get('/search?query=AI&category=ai-and-automation', { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    const location = new URL(res.headers()['location'], 'http://x');
    expect(location.pathname).toBe('/blog/search');
    expect(Object.fromEntries(location.searchParams)).toMatchObject({ query: 'AI', category: 'ai-and-automation' });

    // And a real visit lands on the working search page.
    await page.goto('/search');
    await expect(page).toHaveURL(/\/blog\/search$/);
    await expect(page.getByRole('searchbox', { name: 'Search articles' }).or(page.locator('input[aria-label="Search articles"]'))).toBeVisible();
  });
});

test.describe('Blog: Taxonomies', () => {
  for (const taxonomy of TAXONOMIES) {
    test(`/blog/${taxonomy} lists entries, and the first one shows its posts`, async ({ page, basePage }) => {
      const response = await page.goto(`/blog/${taxonomy}`);
      expect(response?.status()).toBe(200);
      await basePage.waitForStability();
      await expect(page.locator('h1')).toBeVisible();

      const entry = page.locator(`main a[href^="/blog/${taxonomy}/"]`).first();
      const href = await entry.getAttribute('href');
      await entry.click();
      await expect(page).toHaveURL(new RegExp(`${href}$`));
      await expect(cards(page).first()).toBeVisible();
    });
  }
});

test.describe('Blog: Responsive', () => {
  for (const vp of PRODUCTION_VIEWPORTS.filter((v) => OVERFLOW_WIDTHS.includes(v.width))) {
    test(`no horizontal overflow on /blog and a post at ${vp.name}`, async ({ page, basePage }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await basePage.navigate('/blog');
      await basePage.verifyNoHorizontalOverflow();
      await basePage.navigate(await firstPostHref(page));
      await basePage.verifyNoHorizontalOverflow();
    });
  }
});
