import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Scroll to CTA section
    await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      const ctaSection = Array.from(sections).find(s => s.textContent.includes('Ready when you are'));
      if (ctaSection) ctaSection.scrollIntoView({ behavior: 'smooth' });
    });

    await page.waitForTimeout(1500);

    // Verify content
    const badge = await page.locator('text=Ready when you are').first().isVisible();
    const title = await page.locator('text=Let\'s build something intelligent together').isVisible();
    const button = await page.getByRole('link', { name: /^Book a Call$/ }).first().isVisible();

    // Get button styles
    const buttonClasses = await page.getByRole('link', { name: /^Book a Call$/ }).first().evaluate(el => el.className);

    // Check glow element
    const glowDiv = await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      const ctaSection = Array.from(sections).find(s => s.textContent.includes('Ready when you are'));
      if (ctaSection) {
        const glow = ctaSection.querySelector('div[class*="bg-gradient"]');
        if (glow) {
          const style = window.getComputedStyle(glow);
          return {
            exists: true,
            background: style.backgroundImage || style.background,
            opacity: style.opacity,
            display: style.display,
          };
        }
      }
      return { exists: false };
    });

    console.log('CTA Section Verification:');
    console.log('========================');
    console.log('✓ Badge visible:', badge);
    console.log('✓ Title visible:', title);
    console.log('✓ Button visible:', button);
    console.log('✓ Button has accent styling:', buttonClasses.includes('btn-accent') || buttonClasses.includes('accent'));
    console.log('✓ Glow effect exists:', glowDiv.exists);

    if (glowDiv.exists) {
      console.log('  Glow background:', glowDiv.background);
      console.log('  Glow opacity:', glowDiv.opacity);
    }

    // Take screenshot
    await page.screenshot({ path: 'cta-verification.png', fullPage: true });
    console.log('\n✓ Screenshot saved: cta-verification.png');

  } finally {
    await browser.close();
  }
})();
