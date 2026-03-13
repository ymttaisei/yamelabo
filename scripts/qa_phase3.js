// Phase 3 QA: Top page full + sections comparison
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const outDir = path.join(__dirname, '..', 'mock', 'qa', 'phase3');

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Desktop full page
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3099/', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Hero section
  await page.screenshot({
    path: path.join(outDir, 'hero_desktop.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  // Full page
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({ width: 1440, height: Math.min(pageHeight + 100, 32000) });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outDir, 'top_full_desktop.png'),
    fullPage: true,
  });

  // Ranking cards area (scroll past hero)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outDir, 'ranking_cards_desktop.png'),
  });

  // Mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:3099/', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: path.join(outDir, 'hero_mobile.png'),
  });

  // Mobile full page
  const mobileHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({ width: 375, height: Math.min(mobileHeight + 100, 32000) });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outDir, 'top_full_mobile.png'),
    fullPage: true,
  });

  await browser.close();
  console.log(`Done! Screenshots saved to ${outDir}`);
})();
