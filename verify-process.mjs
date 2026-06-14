import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
page.setViewportSize({ width: 1280, height: 2000 });

try {
  // Navigate to home
  console.log('📍 Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Scroll to see full page (to ensure ProcessSection is visible)
  console.log('📜 Scrolling to view ProcessSection...');
  await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
  await page.waitForTimeout(500);

  // Take full page screenshot
  await page.screenshot({ path: 'verify-full-page.png', fullPage: true });
  console.log('✅ Full page screenshot: verify-full-page.png');

  // Locate ProcessSection
  const processHeading = page.locator('h2:has-text("Our Process")');
  const isVisible = await processHeading.isVisible();

  if (!isVisible) {
    console.log('❌ ProcessSection not visible');
    process.exit(1);
  }

  console.log('✅ ProcessSection found and visible');

  // Get all rolling text items
  const items = page.locator('[role="region"]:has-text("Research"), [role="region"]:has-text("Experience"), [role="region"]:has-text("Engineering"), [role="region"]:has-text("Launch")');
  const itemCount = await items.count();
  console.log(`✅ Found ${itemCount} process items`);

  // Test hover on first item
  console.log('🖱️  Testing hover on first item...');
  const firstItem = page.locator('.group').first();
  await firstItem.hover();
  await page.waitForTimeout(600); // wait for hover animation

  await page.screenshot({ path: 'verify-hover-state.png', fullPage: false });
  console.log('✅ Hover state screenshot: verify-hover-state.png');

  // Verify all item titles are visible
  const titles = ['Discover', 'Design', 'Develop', 'Deploy'];
  for (const title of titles) {
    const elem = page.locator(`text=${title}`).first();
    const vis = await elem.isVisible();
    console.log(`  ${vis ? '✅' : '❌'} ${title}`);
    if (!vis) process.exit(1);
  }

  // Verify categories are visible
  const categories = ['Research', 'Experience', 'Engineering', 'Launch'];
  for (const cat of categories) {
    const elem = page.locator(`text=${cat}`).first();
    const vis = await elem.isVisible();
    console.log(`  ${vis ? '✅' : '❌'} ${cat} (category)`);
    if (!vis) process.exit(1);
  }

  console.log('\n🎉 All verifications passed!');

} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
} finally {
  await browser.close();
}
