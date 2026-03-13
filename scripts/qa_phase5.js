// Phase 5 QA: All pages desktop + mobile screenshots
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const PAGES = [
  { name: 'top', url: 'http://localhost:3099/' },
  { name: 'tenshoku', url: 'http://localhost:3099/tenshoku' },
  { name: 'column_list', url: 'http://localhost:3099/column' },
  { name: 'column_article', url: 'http://localhost:3099/column/bengoshi-osusume' },
  { name: 'taishoku_daikou', url: 'http://localhost:3099/taishoku-daikou' },
  { name: 'tool_unemployment', url: 'http://localhost:3099/tools/unemployment-insurance' },
  { name: 'tool_tax', url: 'http://localhost:3099/tools/retirement-tax' },
  { name: 'tool_leave', url: 'http://localhost:3099/tools/paid-leave' },
  { name: 'about', url: 'http://localhost:3099/about' },
];

const outDir = path.join(__dirname, '..', 'mock', 'qa', 'phase5');

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

    const dHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width: 1440, height: Math.min(dHeight + 100, 32000) });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(outDir, `${pg.name}_desktop.png`),
      fullPage: true,
    });

    // Mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(pg.url, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(1500);

    const mHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width: 375, height: Math.min(mHeight + 100, 32000) });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(outDir, `${pg.name}_mobile.png`),
      fullPage: true,
    });
  }

  await browser.close();
  console.log(`\nDone! ${PAGES.length * 2} screenshots saved to ${outDir}`);
})();
