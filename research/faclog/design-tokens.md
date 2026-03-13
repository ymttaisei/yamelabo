# FACLOG Design Tokens (Extracted 2026-03-13)

Source: Playwright computed style extraction from faclog.jp (top, ranking, magazine pages)

## Color Palette

| Usage | Hex | RGB |
|---|---|---|
| Body text | #252525 | rgb(37, 37, 37) |
| Black (hero subtitle) | #000000 | rgb(0, 0, 0) |
| Header bg / Card bg | #ffffff | rgb(255, 255, 255) |
| Page bg (ranking/magazine) | #edf4f6 | rgb(237, 244, 246) |
| Footer bg | #0b4d64 | rgb(11, 77, 100) |
| Footer text | #ffffff | rgb(255, 255, 255) |
| Primary CTA (orange) | #ffa215 | rgb(255, 162, 21) |
| Card CTA (teal-green) | #2bbfb1 | rgb(43, 191, 177) |
| Ranking CTA (red) | #ff5252 | rgb(255, 82, 82) |
| CTA shadow | #d8d7d7 | rgb(216, 215, 215) |
| Header shadow | #808080 | rgb(128, 128, 128) |
| h1 color (ranking) | #0072a7 | rgb(0, 114, 167) |
| h2 color (top) | #0485c0 | rgb(4, 133, 192) |
| h3 / subtle text | #555555 | rgb(85, 85, 85) |
| Promo banner text | #999999 | rgb(153, 153, 153) |
| Article link color | #4f96f6 | rgb(79, 150, 246) |

## Typography

| Element | fontSize | fontWeight | lineHeight | letterSpacing |
|---|---|---|---|---|
| body (top/ranking) | 16px | 400 | 18.4px (1.15) | normal |
| body (magazine) | 17.12px | 400 | 31.33px (1.83) | normal |
| heroSubtitle | 30px | 500 | 34.5px (1.15) | normal |
| h1 | 25.68px | 700 | 38.52px (1.5) | 2.568px |
| h2 | 24px | 700 | 36px (1.5) | 2.4px |
| h3 (top) | 20px | 700 | 23px (1.15) | 2px |
| h3 (ranking) | 18px | 700 | 20.7px | normal |
| h3 (magazine) | 17px | 700 | 26.52px | normal |
| nav links | 16px | 400 | 18.4px | normal |
| footer links | 12px | 500 | 18px | 1.2px |
| footer copyright | 12.8px | 400 | 14.72px | normal |
| filterPills | 18px | 400 | 20.7px | normal |
| CTA buttons | 18-20px | 400-700 | varies | normal |
| fontFamily | "Noto Sans JP", sans-serif | (all elements) | | |

## Header

- bg: #ffffff (white, NOT teal)
- height: 80px
- width: full
- position: fixed
- zIndex: 80
- container: flex, space-between, center
- container boxShadow: #808080 0px 4px 4px -2px
- logo: paddingLeft 55px, width 240px, height ~59px
- nav: width ~1148px, textAlign center
- nav link color: #252525
- CTA button (一括見積もり): bg #ffa215, color #fff, fontSize 18px, width 225px, height 80px, borderRadius 0, paddingLR 30px, flex center
- hamburger (mobile): display none on desktop, 48x48px, zIndex 100

## Hero

- paddingTop: 80px (accounts for fixed header)
- height: ~735px (top page)
- heroSubtitle: fontSize 30px, fontWeight 500, lineHeight 34.5px, color #000000, paddingTop 30px, textAlign center, width ~529px

## Ranking Cards (top page - .recommend-company)

- card: width 160px, height 325px, textAlign center
- logo: width ~142px, height ~32px, position absolute
- name: fontSize 16px, fontWeight 700, lineHeight 24px, paddingLeft 5px, textAlign left
- CTA: bg #2bbfb1, color #fff, fontWeight 700, lineHeight 30px, borderRadius 3px, boxShadow #d8d7d7 2px 2px 0px 0px, display flex center, marginTop 12px
- rating: display flex, alignItems center, gap 3px, marginTop 12px

## Ranking Cards (ranking page - service cards)

- card: bg #ffffff, width 70px, height 70px, borderRadius 10px, padding 10px, display flex center

## CTA Buttons

### Orange CTA (header/primary)
- bg: #ffa215
- color: #ffffff
- fontSize: 18px
- fontWeight: 400
- height: 80px
- borderRadius: 0px
- paddingLR: 30px
- display: flex center
- gap: 8px

### Card CTA (teal)
- bg: #2bbfb1
- color: #ffffff
- fontSize: 16px
- fontWeight: 700
- borderRadius: 3px
- boxShadow: #d8d7d7 2px 2px 0px 0px

### Large CTA (top page, リストに追加)
- bg: #ffa215
- color: #ffffff
- fontSize: 20px
- fontWeight: 700
- width: 357px
- height: 64px
- borderRadius: 3px
- boxShadow: #d8d7d7 3px 3px 0px 0px
- display: flex center

### Ranking page CTA (red)
- bg: #ff5252
- color: #ffffff
- fontSize: 18px
- fontWeight: 700
- borderRadius: 5px
- paddingTB: 10px
- paddingLR: 20px

## Filter Pills

- fontSize: 18px
- lineHeight: 20.7px
- color: #252525
- display: flex center
- textAlign: center

## Footer

- footerContainer bg: #0b4d64
- footerContainer color: #ffffff
- paddingTB: 50px
- paddingLR: 100px
- textAlign: center
- links: color #fff, fontSize 12px, fontWeight 500, lineHeight 18px, letterSpacing 1.2px, marginBottom 16px, textAlign left
- logo: color #fff, marginBottom 35px, width 200px, height ~63px, textAlign center
- copyright: color #fff, fontSize 12.8px, lineHeight 14.72px

## Page Background

- top page body: transparent (individual sections provide bg)
- ranking page: #edf4f6
- magazine page: #edf4f6

## Section Headings (h2)

- color: #0485c0 (top page), #252525 (ranking in-content)
- fontSize: 24px
- fontWeight: 700
- lineHeight: 36px (1.5)
- letterSpacing: 2.4px
- marginBottom: 40px
- display: inline-block
- position: relative (for decorative underline)
- textAlign: center

## Key Differences from Plan Assumptions

1. **Header is WHITE, not teal** — shadow provides visual weight
2. **Footer is #0b4d64 (dark teal), not #1a2744 (navy)**
3. **Page bg is #edf4f6 (light blue-teal), not #f5f5f5 (gray)**
4. **Primary heading color is #0485c0 (blue), not teal**
5. **Body line-height is 18.4px (1.15 ratio), very tight**
6. **No FAQ section exists on FACLOG**
7. **Card CTA is teal-green #2bbfb1, not orange**
