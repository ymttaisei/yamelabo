// Site constants
export const SITE_NAME = "ヤメラボ";
export const SITE_NAME_EN = "YAMELABO";
export const SITE_URL = "https://yamelabo.goodlabs.jp";
export const SITE_DESCRIPTION =
  "失業保険の給付額、退職金の手取り額、有給休暇の付与日数を30秒で無料計算できるツール集。厚生労働省・国税庁の公式情報に基づき、令和7年最新の法改正にも対応。退職を考えたら、まずお金の不安を解消しましょう。";
export const SITE_CATCHCOPY = "退職のお金、まるわかり。";

// GA4 (set after creating GA4 property)
export const GA4_MEASUREMENT_ID = "";

// Contact (set after creating Google Form)
export const CONTACT_FORM_URL = "";

// --- Unemployment Insurance Constants ---
// UPDATE: 毎年8月1日改定 — 厚生労働省告示を確認
// 上限額・下限額・閾値・係数はすべて一体のセットとして更新する

export const UI_WAGE_LOWER_LIMIT = 2_746; // 賃金日額下限（全年齢共通）

export const UI_WAGE_UPPER_LIMITS: Record<string, number> = {
  "under30": 13_890,
  "30to44": 15_430,
  "45to59": 16_980,
  "60to64": 16_210,
};

export const UI_BENEFIT_UPPER_LIMITS: Record<string, number> = {
  "under30": 6_945,
  "30to44": 7_715,
  "45to59": 8_490,
  "60to64": 7_294,
};

// Formula thresholds (change annually with the limits above)
export const UI_FORMULA_THRESHOLD_LOW = 4_640;
export const UI_FORMULA_THRESHOLD_HIGH = 11_740;
export const UI_FORMULA_THRESHOLD_60_64_HIGH = 10_570;

// Formula coefficients for 30歳未満/30-44/45-59
export const UI_FORMULA_COEFF_A = 3; // -3w²
export const UI_FORMULA_COEFF_B = 70_720; // +70,720w
export const UI_FORMULA_COEFF_C = 71_000; // ÷71,000

// Formula coefficients for 60-64
export const UI_FORMULA_60_COEFF_A = 7; // -7w²
export const UI_FORMULA_60_COEFF_B = 127_360; // +127,360w
export const UI_FORMULA_60_COEFF_C = 118_600; // ÷118,600
export const UI_FORMULA_60_LINEAR_A = 0.05; // 0.05w + 4,228
export const UI_FORMULA_60_LINEAR_B = 4_228;

// Benefit duration (自己都合)
export const UI_VOLUNTARY_DAYS: Record<string, number> = {
  "under1": 0,
  "1to10": 90,
  "10to20": 120,
  "20plus": 150,
};

// Benefit duration (会社都合/特定理由)
// [age bracket][tenure bracket]
export const UI_COMPANY_DAYS: number[][] = [
  // under1, 1-5, 5-10, 10-20, 20+
  [90, 90, 120, 180, 0],    // under30 (20+ is N/A)
  [90, 120, 180, 210, 240], // 30-34
  [90, 150, 180, 240, 270], // 35-44
  [90, 180, 240, 270, 330], // 45-59
  [90, 150, 180, 210, 240], // 60-64
];

// Benefit duration (障害者等)
export const UI_DISABLED_DAYS: Record<string, Record<string, number>> = {
  "under45": { "under1": 150, "1plus": 300 },
  "45to64": { "under1": 150, "1plus": 360 },
};

// Waiting period and restriction
export const UI_WAITING_PERIOD = 7;
export const UI_VOLUNTARY_RESTRICTION_MONTHS = 1; // 令和7年4月改正: 2ヶ月→1ヶ月

// --- Retirement Tax Constants ---

// Income tax brackets
export const TAX_BRACKETS: { limit: number; rate: number; deduction: number }[] = [
  { limit: 1_950_000, rate: 0.05, deduction: 0 },
  { limit: 3_300_000, rate: 0.10, deduction: 97_500 },
  { limit: 6_950_000, rate: 0.20, deduction: 427_500 },
  { limit: 9_000_000, rate: 0.23, deduction: 636_000 },
  { limit: 18_000_000, rate: 0.33, deduction: 1_536_000 },
  { limit: 40_000_000, rate: 0.40, deduction: 2_796_000 },
  { limit: Infinity, rate: 0.45, deduction: 4_796_000 },
];

// UPDATE: 復興特別所得税は2037年（令和19年）まで。2038年以降は0%に変更
export const RECONSTRUCTION_TAX_RATE = 0.021;
export const RESIDENT_TAX_RATE = 0.10;

// --- Paid Leave Constants ---

// Fulltime grant table (years since start → days)
export const PL_FULLTIME_TABLE: { years: number; days: number }[] = [
  { years: 0.5, days: 10 },
  { years: 1.5, days: 11 },
  { years: 2.5, days: 12 },
  { years: 3.5, days: 14 },
  { years: 4.5, days: 16 },
  { years: 5.5, days: 18 },
  { years: 6.5, days: 20 },
];

// Part-time proportional grant table
// [weeklyDays index (4,3,2,1)] × [tenure bracket (0.5,1.5,2.5,3.5,4.5,5.5,6.5+)]
export const PL_PARTTIME_TABLE: Record<number, number[]> = {
  4: [7, 8, 9, 10, 12, 13, 15],
  3: [5, 6, 6, 8, 9, 10, 11],
  2: [3, 4, 4, 5, 6, 6, 7],
  1: [1, 2, 2, 2, 3, 3, 3],
};

// Navigation
export const TOOLS = [
  {
    name: "失業保険計算",
    href: "/tools/unemployment-insurance",
    description: "基本手当日額と給付総額をシミュレート",
    emoji: "💰",
  },
  {
    name: "退職金税金計算",
    href: "/tools/retirement-tax",
    description: "手取り額をシミュレーション",
    emoji: "🧾",
  },
  {
    name: "有給休暇計算",
    href: "/tools/paid-leave",
    description: "法定付与日数をすぐ確認",
    emoji: "🌴",
  },
] as const;
