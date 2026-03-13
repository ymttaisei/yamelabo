// Phase 0: FACLOG computed style 完全抽出
// faclog.jp のトップページ + ランキングページから全デザイントークンを機械的に取得
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PAGES = [
  { name: 'top', url: 'https://faclog.jp/' },
  { name: 'ranking', url: 'https://faclog.jp/ranking/overall' },
  { name: 'magazine', url: 'https://faclog.jp/magazine' },
];

const PROPS = [
  'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
  'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
  'width', 'height', 'maxWidth', 'minWidth', 'minHeight',
  'fontSize', 'fontWeight', 'fontFamily', 'lineHeight', 'letterSpacing', 'color',
  'backgroundColor', 'backgroundImage',
  'borderTop', 'borderBottom', 'borderLeft', 'borderRight', 'borderRadius',
  'borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor',
  'borderTopWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth',
  'display', 'flexDirection', 'justifyContent', 'alignItems', 'gap', 'flexWrap',
  'position', 'boxShadow', 'textAlign', 'overflow', 'textDecoration',
  'opacity', 'zIndex',
];

function extractStyles(el, props) {
  const cs = getComputedStyle(el);
  const vals = {};
  for (const p of props) vals[p] = cs[p];
  const rect = el.getBoundingClientRect();
  vals._rect = {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    top: Math.round(rect.top),
    left: Math.round(rect.left),
  };
  vals._tag = el.tagName.toLowerCase();
  vals._class = el.className?.toString().substring(0, 200) || '';
  vals._text = el.textContent?.trim().substring(0, 80) || '';
  return vals;
}

async function forceLoadAll(page) {
  await page.evaluate(async () => {
    const delay = ms => new Promise(r => setTimeout(r, ms));
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await delay(80);
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2000);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const allResults = {};

  for (const pg of PAGES) {
    console.log(`\n=== Extracting: ${pg.name} (${pg.url}) ===`);
    await page.goto(pg.url, { waitUntil: 'load', timeout: 60000 });
    await forceLoadAll(page);

    const result = await page.evaluate((props) => {
      function getStyles(el) {
        const cs = getComputedStyle(el);
        const vals = {};
        for (const p of props) vals[p] = cs[p];
        const rect = el.getBoundingClientRect();
        vals._rect = {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          top: Math.round(rect.top),
          left: Math.round(rect.left),
        };
        vals._tag = el.tagName.toLowerCase();
        vals._class = el.className?.toString().substring(0, 200) || '';
        vals._text = el.textContent?.trim().substring(0, 80) || '';
        return vals;
      }

      function tryGet(selector) {
        const el = document.querySelector(selector);
        return el ? getStyles(el) : null;
      }

      function tryGetAll(selector, limit = 3) {
        const els = document.querySelectorAll(selector);
        return [...els].slice(0, limit).map(el => getStyles(el));
      }

      const data = {};

      // === BODY ===
      data.body = getStyles(document.body);

      // === HEADER ===
      // FACLOG header selectors (from captured HTML analysis)
      data.header = tryGet('header') || tryGet('[class*="header"]') || tryGet('nav');
      data.headerContainer = tryGet('header .container') || tryGet('header > div');
      data.headerLogo = tryGet('.main-logo') || tryGet('header a[class*="logo"]') || tryGet('header img');
      data.headerNav = tryGet('nav') || tryGet('[class*="nav-menu"]');
      data.headerNavLinks = tryGetAll('header a, nav a', 5);
      data.headerCta = tryGet('header [class*="btn"], header [class*="cta"], header a[class*="orange"]');

      // === HERO / FV ===
      data.hero = tryGet('#fv') || tryGet('[class*="fv"]') || tryGet('[class*="hero"]') || tryGet('main > section:first-child');
      data.heroTitle = tryGet('#fv h1, #fv h2, [class*="fv"] h1, [class*="hero"] h1');
      data.heroSubtitle = tryGet('#fv p, [class*="fv"] p, [class*="hero"] p');

      // === MAIN CONTAINER ===
      data.mainContainer = tryGet('main') || tryGet('.main-content') || tryGet('#app > div');
      data.contentContainer = tryGet('.container') || tryGet('[class*="container"]');

      // === RANKING CARDS ===
      // Try multiple selectors for company/service cards
      const cardSelectors = [
        '[class*="company-card"]',
        '[class*="factor-card"]',
        '[class*="service-card"]',
        '[class*="ranking-card"]',
        '.recommend-company',
        '[class*="recommend"]',
      ];
      for (const sel of cardSelectors) {
        const cards = document.querySelectorAll(sel);
        if (cards.length > 0) {
          data.rankingCards = [...cards].slice(0, 3).map(card => {
            const cardData = { card: getStyles(card), children: {} };
            // Card internal elements
            const logo = card.querySelector('img, [class*="logo"]');
            if (logo) cardData.children.logo = getStyles(logo);
            const name = card.querySelector('h3, h4, [class*="name"], [class*="title"]');
            if (name) cardData.children.name = getStyles(name);
            const cta = card.querySelector('a[class*="btn"], a[class*="cta"], a[class*="orange"], button');
            if (cta) cardData.children.cta = getStyles(cta);
            const rating = card.querySelector('[class*="rate"], [class*="star"], [class*="rating"]');
            if (rating) cardData.children.rating = getStyles(rating);
            const tags = card.querySelectorAll('[class*="tag"], [class*="badge"], [class*="label"]');
            if (tags.length > 0) cardData.children.tags = [...tags].slice(0, 3).map(t => getStyles(t));
            // Spec table rows
            const specRows = card.querySelectorAll('tr, dl > div, [class*="spec"]');
            if (specRows.length > 0) cardData.children.specRows = [...specRows].slice(0, 4).map(r => getStyles(r));
            return cardData;
          });
          data._cardSelector = sel;
          break;
        }
      }

      // If no cards found by class, try structural detection
      if (!data.rankingCards) {
        const allCards = [];
        document.querySelectorAll('main *').forEach(el => {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          if (rect.width > 500 && rect.height > 150 &&
              (parseFloat(style.borderTopWidth) > 0 || style.boxShadow !== 'none') &&
              parseFloat(style.paddingTop) > 10 &&
              style.backgroundColor === 'rgb(255, 255, 255)') {
            allCards.push({ el, rect });
          }
        });
        if (allCards.length > 0) {
          data.rankingCards = allCards.slice(0, 3).map(({ el }) => ({
            card: getStyles(el),
            children: {},
          }));
          data._cardSelector = 'structural-detection';
        }
      }

      // === FILTER / TAB PILLS ===
      const pillSelectors = [
        '[class*="filter"] a, [class*="filter"] button',
        '[class*="tab"] a, [class*="tab"] button',
        '[class*="category"] a',
        'nav [class*="pill"]',
      ];
      for (const sel of pillSelectors) {
        const pills = document.querySelectorAll(sel);
        if (pills.length >= 2) {
          data.filterPills = [...pills].slice(0, 5).map(p => getStyles(p));
          data._pillSelector = sel;
          break;
        }
      }

      // === CTA BUTTONS (orange) ===
      const ctaButtons = document.querySelectorAll('a[class*="orange"], a[class*="btn-primary"], a[class*="cta"], button[class*="orange"]');
      if (ctaButtons.length > 0) {
        data.ctaButtons = [...ctaButtons].slice(0, 3).map(b => getStyles(b));
      }
      // Also try by color detection
      if (!data.ctaButtons || data.ctaButtons.length === 0) {
        const orangeButtons = [];
        document.querySelectorAll('a, button').forEach(el => {
          const bg = getComputedStyle(el).backgroundColor;
          if (bg.includes('rgb(2') && bg.includes(', 1') && el.getBoundingClientRect().height > 30) {
            orangeButtons.push(getStyles(el));
          }
        });
        if (orangeButtons.length > 0) data.ctaButtons = orangeButtons.slice(0, 3);
      }

      // === FOOTER ===
      data.footer = tryGet('footer') || tryGet('[class*="footer"]');
      data.footerContainer = tryGet('footer .container') || tryGet('footer > div');
      data.footerLinks = tryGetAll('footer a', 5);
      data.footerLogo = tryGet('footer [class*="logo"], footer img');
      data.footerCopyright = tryGet('footer [class*="copy"], footer small');

      // === MAGAZINE CARDS (if on magazine page) ===
      const articleCards = document.querySelectorAll('[class*="article"], [class*="magazine"] a, [class*="post"] a');
      if (articleCards.length > 0) {
        data.articleCards = [...articleCards].slice(0, 3).map(c => getStyles(c));
      }

      // === FAQ SECTION ===
      data.faqSection = tryGet('[class*="faq"], [class*="accordion"]');
      data.faqItem = tryGet('[class*="faq"] details, [class*="accordion"] [class*="item"]');

      // === SECTION HEADINGS ===
      data.h1 = tryGet('h1');
      data.h2s = tryGetAll('h2', 3);
      data.h3s = tryGetAll('h3', 3);

      // === PROMO / BANNER ===
      data.promoBanner = tryGet('[class*="promo"], [class*="banner"], [class*="notice"]');

      // === PAGE HEIGHT ===
      data._pageHeight = document.documentElement.scrollHeight;

      return data;
    }, PROPS);

    allResults[pg.name] = result;

    // Log key findings
    console.log(`  body fontSize: ${result.body?.fontSize}`);
    console.log(`  body lineHeight: ${result.body?.lineHeight}`);
    console.log(`  body fontFamily: ${result.body?.fontFamily?.substring(0, 60)}`);
    console.log(`  body color: ${result.body?.color}`);
    console.log(`  body bg: ${result.body?.backgroundColor}`);
    console.log(`  header bg: ${result.header?.backgroundColor}`);
    console.log(`  header height: ${result.header?._rect?.height}px`);
    console.log(`  footer bg: ${result.footer?.backgroundColor}`);
    console.log(`  cards found: ${result.rankingCards?.length || 0} (${result._cardSelector || 'none'})`);
    console.log(`  filter pills: ${result.filterPills?.length || 0}`);
    console.log(`  CTA buttons: ${result.ctaButtons?.length || 0}`);
    console.log(`  page height: ${result._pageHeight}px`);
  }

  // Save all results
  const outPath = path.join(__dirname, '..', 'computed_styles.json');
  fs.writeFileSync(outPath, JSON.stringify(allResults, null, 2));
  console.log(`\nSaved all computed styles to ${outPath}`);

  await browser.close();
})();
