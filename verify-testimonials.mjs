import { chromium } from 'playwright';

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Scroll down to bottom to find testimonials
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
    
    // Take full page screenshot to see what's rendered
    await page.screenshot({ path: 'testimonial-cards.png' });
    
    // Also log page height to understand layout
    const height = await page.evaluate(() => document.body.scrollHeight);
    console.log(`Page height: ${height}px`);
    
    // Check for elements with black background in the DOM
    const result = await page.evaluate(() => {
      const allDivs = document.querySelectorAll('div');
      let blackBgCount = 0;
      allDivs.forEach(div => {
        const bg = window.getComputedStyle(div).backgroundColor;
        if (bg === 'rgb(0, 0, 0)') {
          blackBgCount++;
        }
      });
      return { blackBgCount, totalDivs: allDivs.length };
    });
    
    console.log(`Found ${result.blackBgCount} divs with black background`);
    console.log('✅ Screenshot captured: testimonial-cards.png');
    
    await browser.close();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
