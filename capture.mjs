import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to desktop size
  await page.setViewportSize({ width: 1440, height: 900 });

  // Navigate to the page
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Wait for Services section to be visible
  await page.waitForSelector('section[aria-label="Services"]');

  // Scroll to Services section
  await page.evaluate(() => {
    document.querySelector('section[aria-label="Services"]').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  await page.waitForTimeout(1000);

  // Take screenshot of the Services section area
  const section = await page.$('section[aria-label="Services"]');
  if (section) {
    await section.screenshot({ path: '/tmp/services-section.png' });
    console.log('Screenshot saved');
  }

  await browser.close();
})();
