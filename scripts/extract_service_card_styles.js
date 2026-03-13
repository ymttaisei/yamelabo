// Phase 2.5: BOXIL service-summary カードの computed style 完全抽出
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'https://boxil.jp/mag/a2543/';

const props = [
  'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
  'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
  'width', 'height', 'maxWidth', 'minHeight',
  'fontSize', 'fontWeight', 'fontFamily', 'lineHeight', 'letterSpacing', 'color',
  'backgroundColor', 'backgroundImage',
  'borderTop', 'borderBottom', 'borderLeft', 'borderRight', 'borderRadius',
  'borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor',
  'borderTopWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth',
  'borderTopStyle', 'borderBottomStyle', 'borderLeftStyle', 'borderRightStyle',
  'display', 'flexDirection', 'justifyContent', 'alignItems', 'gap', 'flexWrap',
  'position', 'top', 'bottom', 'left', 'right',
  'boxShadow', 'textAlign', 'overflow', 'textDecoration',
];

function getStyles(el, props) {
  const cs = getComputedStyle(el);
  const vals = {};
  for (const p of props) { vals[p] = cs[p]; }
  const rect = el.getBoundingClientRect();
  vals._rect = {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    top: Math.round(rect.top),
    left: Math.round(rect.left),
  };
  vals._tag = el.tagName.toLowerCase();
  vals._class = el.className.toString().substring(0, 200);
  return vals;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: 'load', timeout: 60000 });

  // lazy load
  await page.evaluate(async () => {
    const delay = ms => new Promise(r => setTimeout(r, ms));
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await delay(100);
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(3000);

  // service-summary カードの完全な構造と computed style を抽出
  const result = await page.evaluate((props) => {
    function getStyles(el) {
      const cs = getComputedStyle(el);
      const vals = {};
      for (const p of props) { vals[p] = cs[p]; }
      const rect = el.getBoundingClientRect();
      vals._rect = {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top),
        left: Math.round(rect.left),
      };
      vals._tag = el.tagName.toLowerCase();
      vals._class = el.className.toString().substring(0, 200);
      vals._text = el.textContent.trim().substring(0, 100);
      return vals;
    }

    // body基本スタイル
    const bodyStyles = getStyles(document.body);

    // service-summary カードを全て取得
    const cards = document.querySelectorAll('.service-summary');
    const cardData = [];

    for (const card of cards) {
      const cardResult = {
        // カード全体のスタイル
        card: getStyles(card),
        // カード内の各コンポーネント
        components: {},
      };

      // service-summary__heading (H3)
      const heading = card.querySelector('.service-summary__heading, h3');
      if (heading) cardResult.components.heading = getStyles(heading);

      // service-summary__content (メインコンテンツラッパー)
      const content = card.querySelector('.service-summary__content');
      if (content) cardResult.components.content = getStyles(content);

      // service-summary__info-wrapper
      const infoWrapper = card.querySelector('.service-summary__info-wrapper');
      if (infoWrapper) cardResult.components.infoWrapper = getStyles(infoWrapper);

      // service-summary__logo
      const logo = card.querySelector('.service-summary__logo');
      if (logo) cardResult.components.logo = getStyles(logo);
      const logoImg = card.querySelector('.service-summary__logo img');
      if (logoImg) cardResult.components.logoImg = getStyles(logoImg);

      // service-summary__info
      const info = card.querySelector('.service-summary__info');
      if (info) cardResult.components.info = getStyles(info);

      // service-summary__service-name
      const serviceName = card.querySelector('.service-summary__service-name');
      if (serviceName) cardResult.components.serviceName = getStyles(serviceName);

      // service-summary__vendor-name
      const vendorName = card.querySelector('.service-summary__vendor-name');
      if (vendorName) cardResult.components.vendorName = getStyles(vendorName);

      // service-summary__rating_container
      const ratingContainer = card.querySelector('.service-summary__rating_container');
      if (ratingContainer) cardResult.components.ratingContainer = getStyles(ratingContainer);

      // service-summary__rating
      const rating = card.querySelector('.service-summary__rating');
      if (rating) cardResult.components.rating = getStyles(rating);

      // service-summary__stars
      const stars = card.querySelector('.service-summary__stars');
      if (stars) cardResult.components.stars = getStyles(stars);

      // service-summary__rating-score
      const ratingScore = card.querySelector('.service-summary__rating-score');
      if (ratingScore) cardResult.components.ratingScore = getStyles(ratingScore);

      // service-summary__rating-count
      const ratingCount = card.querySelector('.service-summary__rating-count');
      if (ratingCount) cardResult.components.ratingCount = getStyles(ratingCount);

      // service-summary__details (dl リスト)
      const details = card.querySelector('.service-summary__details');
      if (details) {
        cardResult.components.details = getStyles(details);
        // dt/dd ペア
        const dts = details.querySelectorAll('dt');
        const dds = details.querySelectorAll('dd');
        if (dts.length > 0) cardResult.components.detailDt = getStyles(dts[0]);
        if (dds.length > 0) cardResult.components.detailDd = getStyles(dds[0]);
        // 全dtのテキスト
        cardResult.components.detailLabels = [...dts].map(dt => dt.textContent.trim());
        cardResult.components.detailValues = [...dds].map(dd => dd.textContent.trim().substring(0, 60));
      }

      // service-summary__screenshot
      const screenshot = card.querySelector('.service-summary__screenshot');
      if (screenshot) cardResult.components.screenshot = getStyles(screenshot);

      // CTA リンク/ボタン
      const serviceLink = card.querySelector('.service-summary__service-link');
      if (serviceLink) cardResult.components.serviceLink = getStyles(serviceLink);
      const ctaButton = card.querySelector('.wp-block-boxil-blocks-flex-button a, .service-summary__link a');
      if (ctaButton) cardResult.components.ctaButton = getStyles(ctaButton);

      // 口コミリンク
      const reviewLink = card.querySelector('.service-summary__write-review-link');
      if (reviewLink) cardResult.components.reviewLink = getStyles(reviewLink);

      // カードのouterHTML構造（最初のカードのみ、デバッグ用）
      if (cardData.length === 0) {
        // 最初のカードのHTML構造を取得（内容は短縮）
        const clone = card.cloneNode(true);
        // テキストを短縮
        clone.querySelectorAll('p, dd, span').forEach(el => {
          if (el.textContent.length > 50) {
            el.textContent = el.textContent.substring(0, 50) + '...';
          }
        });
        cardResult.html = clone.outerHTML;
      }

      cardData.push(cardResult);
    }

    // CTA ボタンのスタイルを記事全体からも抽出
    const flexButtons = document.querySelectorAll('.wp-block-boxil-blocks-flex-button');
    const flexButtonStyles = [];
    for (const btn of flexButtons) {
      const a = btn.querySelector('a');
      if (a) {
        flexButtonStyles.push({
          wrapper: getStyles(btn),
          link: getStyles(a),
          text: a.textContent.trim().substring(0, 80),
        });
      }
      if (flexButtonStyles.length >= 3) break;
    }

    return {
      bodyStyles,
      cardCount: cards.length,
      cards: cardData,
      flexButtons: flexButtonStyles,
    };
  }, props);

  fs.writeFileSync(
    path.join(__dirname, '..', 'html', 'service_card_computed.json'),
    JSON.stringify(result, null, 2)
  );

  console.log(`Extracted computed styles for ${result.cardCount} service-summary cards`);
  console.log(`First card components: ${Object.keys(result.cards[0]?.components || {}).join(', ')}`);

  // 最初のカードのサービス名を表示
  for (const card of result.cards.slice(0, 3)) {
    const name = card.components.serviceName?._text || 'N/A';
    console.log(`  Service: ${name}`);
    console.log(`    Card size: ${card.card._rect?.width}x${card.card._rect?.height}`);
    console.log(`    Border: ${card.card.borderTop}`);
    console.log(`    Padding: ${card.card.padding}`);
    console.log(`    Background: ${card.card.backgroundColor}`);
    console.log(`    Shadow: ${card.card.boxShadow}`);
    console.log(`    Border-radius: ${card.card.borderRadius}`);
  }

  // カードのスクリーンショットを個別に撮影
  console.log('\nTaking individual card screenshots...');
  const cardElements = await page.$$('.service-summary');
  for (let i = 0; i < Math.min(cardElements.length, 3); i++) {
    try {
      await cardElements[i].scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await cardElements[i].screenshot({
        path: path.join(__dirname, '..', 'screenshots', 'ref', `service_card_${i}.png`),
      });
      console.log(`Captured service card ${i}`);
    } catch (e) {
      console.log(`Failed to capture card ${i}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('\nDone!');
})();
