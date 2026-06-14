import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Scroll to Technologies section
await page.evaluate(() => {
  const heading = Array.from(document.querySelectorAll('h2')).find(h => 
    h.textContent.includes('Powered by AI')
  );
  if (heading) {
    heading.scrollIntoView({ behavior: 'instant', block: 'center' });
  }
});

await page.waitForTimeout(500);

// Get layout info
const info = await page.evaluate(() => {
  // Find the motion.div with logo cloud (full-width wrapper)
  const sliderDiv = Array.from(document.querySelectorAll('div')).find(div => {
    return div.querySelector('svg') && div.className.includes('w-full');
  });
  
  // Find the constrained content div
  const contentDiv = Array.from(document.querySelectorAll('div')).find(div => {
    const text = div.textContent;
    return text.includes('Powered by AI') && text.includes('Hear it from');
  });
  
  return {
    sliderWidth: sliderDiv ? sliderDiv.offsetWidth : 'NOT FOUND',
    sliderLeft: sliderDiv ? sliderDiv.getBoundingClientRect().left : null,
    contentWidth: contentDiv ? contentDiv.offsetWidth : 'NOT FOUND',
    viewportWidth: window.innerWidth,
  };
});

console.log('Layout Check:');
console.log('- Viewport width:', info.viewportWidth);
console.log('- Slider width:', info.sliderWidth);
console.log('- Content width:', info.contentWidth);
console.log('- Slider full-width?', info.sliderWidth === info.viewportWidth ? '✓ YES' : '✗ NO');

// Take screenshot
await page.screenshot({ path: 'tech-section.png' });
console.log('Screenshot saved: tech-section.png');

await browser.close();
