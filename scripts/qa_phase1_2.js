// Phase 1-2 QA: globals.css + Header + Footer comparison screenshots
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const PAGES = [
  { name: 'top', url: 'http://localhost:3099/' },
  { name: 'ranking', url: 'http://localhost:3099/taishoku-daikou' },
  { name: 'column', url: 'http://localhost:3099/column' },
  { name: 'tenshoku', url: 'http://localhost:3099/tenshoku' },
  { name: 'about', url: 'http://localhost:3099/about' },
];

const outDir = path.join(__dirname, '..', 'mock', 'qa', 'phase1_2');

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const pg of PAGES) {
    console.log(`Capturing: ${pg.name}`);

    // Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(pg.url, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(1500);

    // Header area
    await page.screenshot({
      path: path.join(outDir, `${pg.name}_header_desktop.png`),
      clip: { x: 0, y: 0, width: 1440, height: 100 },
    });

    // Full page
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({
      width: 1440,
      height: Math.min(pageHeight + 100, 32000),
    });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(outDir, `${pg.name}_full_desktop.png`),
      fullPage: true,
    });

    // Footer area (scroll to bottom)
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(500);
    await page.setViewportSize({ width: 1440, height: 900 });
    const footerEl = await page.$('footer');
    if (footerEl) {
      await footerEl.screenshot({
        path: path.join(outDir, `${pg.name}_footer_desktop.png`),
      });
    }

    // Mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(pg.url, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(outDir, `${pg.name}_header_mobile.png`),
      clip: { x: 0, y: 0, width: 375, height: 100 },
    });
  }

  await browser.close();
  console.log(`\nDone! Screenshots saved to ${outDir}`);
})();
