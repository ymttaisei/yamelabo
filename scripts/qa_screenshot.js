// Phase 5 QA: ヤメラボ記事のサービスカード部分をスクリーンショット
const { chromium } = require('playwright');
const path = require('path');

const TARGET_URL = 'http://localhost:3099/column/bengoshi-osusume';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);

  // フルページスクリーンショット
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({
    width: 1440,
    height: Math.min(Math.ceil(pageHeight) + 100, 32000),
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(__dirname, '..', 'mock', 'qa', 'yamelabo_full.png'),
    fullPage: true,
  });
  console.log(`Full page: ${pageHeight}px`);

  // ビューポートリセット
  await page.setViewportSize({ width: 1440, height: 900 });

  // サービスカード部分（subSections）を個別キャプチャ
  // subSectionsのH3を探す
  const h3Elements = await page.$$('h3');
  let cardCount = 0;
  for (const h3 of h3Elements) {
    const text = await h3.textContent();
    // サービス名のH3を特定（弁護士法人みやび, ガイア等）
    if (text && (text.includes('弁護士法人') || text.includes('ガイア') || text.includes('退職110番') || text.includes('フォーゲル'))) {
      // H3の親要素（カードラッパー）を取得
      const parent = await h3.evaluateHandle(el => el.parentElement);
      if (parent) {
        await h3.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await parent.asElement().screenshot({
          path: path.join(__dirname, '..', 'mock', 'qa', `yamelabo_card_${cardCount}.png`),
        });
        console.log(`Captured card ${cardCount}: ${text.trim()}`);
        cardCount++;
      }
    }
  }

  await browser.close();
  console.log('Done!');
})();
