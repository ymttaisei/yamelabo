// Phase 1+2: BOXIL Magazine サービス比較カードのキャプチャ＋computed style抽出
// Reference: https://boxil.jp/mag/a2543/
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'https://boxil.jp/mag/a2543/';

// 抽出するCSSプロパティ
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
  'display', 'flexDirection', 'justifyContent', 'alignItems', 'gap',
  'position', 'top', 'bottom', 'left', 'right',
  'boxShadow', 'textAlign', 'overflow', 'textDecoration',
  'whiteSpace', 'wordBreak',
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('Navigating to BOXIL Magazine...');
  await page.goto(TARGET_URL, { waitUntil: 'load', timeout: 60000 });

  // lazy load強制読み込み
  await page.evaluate(async () => {
    const delay = ms => new Promise(r => setTimeout(r, ms));
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await delay(100);
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(3000);

  // === Phase 1: 偵察 ===
  console.log('Phase 1: Reconnaissance...');
  const siteInfo = await page.evaluate(() => {
    return {
      title: document.title,
      bodyFont: getComputedStyle(document.body).fontFamily,
      bodyLineHeight: getComputedStyle(document.body).lineHeight,
      bodyFontSize: getComputedStyle(document.body).fontSize,
      bodyColor: getComputedStyle(document.body).color,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      pageHeight: document.documentElement.scrollHeight,
      // サービスカードのセレクタ候補を探索
      cardCandidates: (() => {
        // h2/h3見出しの後に続くサービスカード的な要素を探す
        const allElements = document.querySelectorAll('*');
        const cardPatterns = [];

        // BOXILの記事ではサービスカードは特定のクラスで囲まれている
        // まずページ内のクラス名パターンを確認
        const classNames = new Set();
        for (const el of allElements) {
          for (const cls of el.classList) {
            if (cls.includes('service') || cls.includes('card') || cls.includes('product')
                || cls.includes('item') || cls.includes('box') || cls.includes('compare')
                || cls.includes('review') || cls.includes('recommend')) {
              classNames.add(cls);
            }
          }
        }
        return [...classNames];
      })(),
      // ページ内のH2見出し一覧
      h2Headings: [...document.querySelectorAll('h2')].map(h => ({
        text: h.textContent.trim().substring(0, 80),
        className: h.className,
        id: h.id,
      })),
      // ページ内のH3見出し一覧（最初の20件）
      h3Headings: [...document.querySelectorAll('h3')].slice(0, 20).map(h => ({
        text: h.textContent.trim().substring(0, 80),
        className: h.className,
        parentClass: h.parentElement ? h.parentElement.className : '',
      })),
    };
  });

  fs.writeFileSync(
    path.join(__dirname, '..', 'html', 'site_info.json'),
    JSON.stringify(siteInfo, null, 2)
  );
  console.log('Site info saved.');
  console.log('Card candidate classes:', siteInfo.cardCandidates);
  console.log('H2 headings:', siteInfo.h2Headings.map(h => h.text));
  console.log('H3 headings:', siteInfo.h3Headings.map(h => h.text));

  // === Phase 2: サービスカードの特定と抽出 ===
  console.log('\nPhase 2: Identifying service cards...');

  // BOXILのサービスカード構造を詳しく調査
  const cardAnalysis = await page.evaluate(() => {
    // サービスカードは通常 H3 見出し + 説明 + CTA の組み合わせ
    // まず全体のDOM構造を確認
    const h3Elements = document.querySelectorAll('h3');
    const serviceCards = [];

    for (const h3 of h3Elements) {
      // サービス名のH3を含む親要素をカード候補とする
      let card = h3.parentElement;
      // 上に3レベルまで遡って適切なカード要素を探す
      for (let i = 0; i < 3; i++) {
        if (!card) break;
        const rect = card.getBoundingClientRect();
        const style = getComputedStyle(card);
        // カード的な要素の判定: border, background, boxShadow, 一定の高さがある
        const hasBorder = style.borderTopWidth !== '0px' || style.borderBottomWidth !== '0px';
        const hasBg = style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent';
        const hasShadow = style.boxShadow !== 'none';
        const hasMinHeight = rect.height > 100;

        if ((hasBorder || hasBg || hasShadow) && hasMinHeight) {
          serviceCards.push({
            h3Text: h3.textContent.trim().substring(0, 60),
            cardTag: card.tagName,
            cardClass: card.className,
            cardRect: {
              width: Math.round(rect.width),
              height: Math.round(rect.height),
              top: Math.round(rect.top),
            },
            cardBorder: style.border,
            cardBg: style.backgroundColor,
            cardShadow: style.boxShadow,
            cardBorderRadius: style.borderRadius,
            cardPadding: style.padding,
            childCount: card.children.length,
            childTags: [...card.children].map(c => `${c.tagName}.${c.className.split(' ')[0]}`),
          });
          break;
        }
        card = card.parentElement;
      }
    }

    return serviceCards;
  });

  fs.writeFileSync(
    path.join(__dirname, '..', 'html', 'card_analysis.json'),
    JSON.stringify(cardAnalysis, null, 2)
  );
  console.log(`Found ${cardAnalysis.length} potential service cards`);
  for (const card of cardAnalysis.slice(0, 5)) {
    console.log(`  - "${card.h3Text}" (${card.cardTag}.${card.cardClass.substring(0, 40)}) ${card.cardRect.width}x${card.cardRect.height}`);
  }

  // === Phase 2.5: サービスカードの詳細構造を抽出 ===
  console.log('\nExtracting detailed card structure...');

  const detailedCards = await page.evaluate((props) => {
    // BOXILのサービスカードのパターンを詳しく調べる
    // まず記事本文エリア内のカード的要素を全て見つける
    const articleBody = document.querySelector('article') || document.querySelector('.article-body')
      || document.querySelector('[class*="article"]') || document.querySelector('main');

    if (!articleBody) return { error: 'Could not find article body' };

    // カード的要素（border + padding + 一定サイズ）を全て収集
    const allCards = [];
    const allElements = articleBody.querySelectorAll('*');

    for (const el of allElements) {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      // カードの判定条件
      const hasBorder = parseFloat(style.borderTopWidth) > 0;
      const hasBgColor = style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent';
      const hasShadow = style.boxShadow !== 'none';
      const isWideEnough = rect.width > 400;
      const isTallEnough = rect.height > 150;
      const hasPadding = parseFloat(style.paddingTop) > 10;

      if ((hasBorder || hasShadow) && isWideEnough && isTallEnough && hasPadding) {
        // この要素の内部構造を調べる
        const innerElements = [];
        for (const child of el.querySelectorAll('*')) {
          const childStyle = getComputedStyle(child);
          const childRect = child.getBoundingClientRect();
          if (childRect.height > 0 && childRect.width > 0) {
            innerElements.push({
              tag: child.tagName.toLowerCase(),
              class: child.className.toString().substring(0, 80),
              text: child.textContent.trim().substring(0, 100),
              role: child.tagName === 'H3' ? 'heading'
                : child.tagName === 'A' && childStyle.display.includes('block') ? 'cta-button'
                : child.tagName === 'A' ? 'link'
                : child.tagName === 'IMG' ? 'image'
                : child.tagName === 'TABLE' || child.tagName === 'DL' ? 'data-list'
                : 'other',
              styles: {
                fontSize: childStyle.fontSize,
                fontWeight: childStyle.fontWeight,
                color: childStyle.color,
                backgroundColor: childStyle.backgroundColor,
                padding: childStyle.padding,
                margin: childStyle.margin,
                borderRadius: childStyle.borderRadius,
                display: childStyle.display,
              },
              rect: {
                width: Math.round(childRect.width),
                height: Math.round(childRect.height),
              },
            });
          }
        }

        // カードのcomputed style全取得
        const cardStyles = {};
        for (const p of props) {
          cardStyles[p] = style[p];
        }
        cardStyles._rect = {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          top: Math.round(rect.top),
          left: Math.round(rect.left),
        };

        allCards.push({
          tag: el.tagName.toLowerCase(),
          class: el.className.toString().substring(0, 100),
          firstH3: el.querySelector('h3') ? el.querySelector('h3').textContent.trim().substring(0, 60) : null,
          hasImage: !!el.querySelector('img'),
          hasTable: !!el.querySelector('table'),
          hasDL: !!el.querySelector('dl'),
          hasButton: !!el.querySelector('a[class*="btn"], a[class*="button"], button'),
          styles: cardStyles,
          directChildren: [...el.children].map(child => ({
            tag: child.tagName.toLowerCase(),
            class: child.className.toString().substring(0, 60),
            height: Math.round(child.getBoundingClientRect().height),
          })),
          innerElementsSummary: innerElements.filter(ie =>
            ie.role !== 'other' || ie.tag === 'h3' || ie.tag === 'h4' || ie.tag === 'p'
          ).slice(0, 15),
        });
      }
    }

    return allCards;
  }, props);

  fs.writeFileSync(
    path.join(__dirname, '..', 'html', 'detailed_cards.json'),
    JSON.stringify(detailedCards, null, 2)
  );
  console.log(`Found ${detailedCards.length || 0} detailed card elements`);

  // === スクリーンショット: サービスカード領域を個別キャプチャ ===
  console.log('\nTaking screenshots...');

  // フルページスクリーンショット
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.setViewportSize({
    width: 1440,
    height: Math.min(Math.ceil(pageHeight) + 100, 32000),
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(__dirname, '..', 'screenshots', 'ref', 'boxil_full.png'),
    fullPage: true,
  });
  console.log(`Full page screenshot: ${pageHeight}px`);

  // ビューポートをリセットしてカード部分のスクリーンショット
  await page.setViewportSize({ width: 1440, height: 900 });

  // 最初の5つのH3サービスカード付近をキャプチャ
  const h3s = await page.$$('h3');
  let cardScreenshotCount = 0;
  for (let i = 0; i < Math.min(h3s.length, 10); i++) {
    try {
      // H3の親要素（カード）を探す
      const cardInfo = await h3s[i].evaluate((h3) => {
        let el = h3.parentElement;
        for (let j = 0; j < 5; j++) {
          if (!el) return null;
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          if (rect.height > 150 && rect.width > 400 &&
              (parseFloat(style.borderTopWidth) > 0 || style.boxShadow !== 'none')) {
            return {
              text: h3.textContent.trim().substring(0, 40),
              rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
            };
          }
          el = el.parentElement;
        }
        return null;
      });

      if (cardInfo && cardInfo.rect.height > 100) {
        await page.evaluate((y) => window.scrollTo(0, y - 50), cardInfo.rect.y);
        await page.waitForTimeout(300);

        // 見つかったカード付近のスクリーンショット
        const clip = {
          x: Math.max(0, cardInfo.rect.x - 20),
          y: 0,
          width: Math.min(cardInfo.rect.width + 40, 1440),
          height: Math.min(cardInfo.rect.height + 100, 900),
        };

        // full page screenshot中のクリップだとうまくいかないので、スクロール後にビューポートショット
        await page.screenshot({
          path: path.join(__dirname, '..', 'screenshots', 'ref', `card_${cardScreenshotCount}.png`),
        });
        console.log(`Card screenshot ${cardScreenshotCount}: "${cardInfo.text}" (${Math.round(cardInfo.rect.height)}px)`);
        cardScreenshotCount++;
        if (cardScreenshotCount >= 3) break;
      }
    } catch (e) {
      // skip
    }
  }

  // === HTML全体を保存 ===
  const html = await page.content();
  fs.writeFileSync(
    path.join(__dirname, '..', 'html', 'boxil_full.html'),
    html, 'utf-8'
  );

  console.log('\nCapture complete!');
  await browser.close();
})();
