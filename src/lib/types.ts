// --- Unemployment Insurance (失業保険) ---
export type ResignationType = "voluntary" | "company" | "specified-reason";

export type UnemploymentInput = {
  age: number;
  monthlySalary: number;
  tenureYears: number;
  resignationType: ResignationType;
  isDisabled: boolean;
};

export type UnemploymentResult = {
  dailyWage: number;
  dailyBenefit: number;
  benefitRate: number;
  totalDays: number;
  totalAmount: number;
  waitingPeriod: number;
  restrictionMonths: number;
};

// --- Retirement Tax (退職金税金) ---
export type RetirementTaxInput = {
  retirementPay: number;
  tenureYears: number;
  isDisability: boolean;
  isExecutive: boolean;
};

export type RetirementTaxResult = {
  deduction: number;
  taxableIncome: number;
  incomeTax: number;
  reconstructionTax: number;
  residentTax: number;
  totalTax: number;
  takeHome: number;
  effectiveRate: number;
};

// --- Paid Leave (有給休暇) ---
export type EmploymentType = "fulltime" | "parttime";

export type PaidLeaveInput = {
  startDate: Date;
  baseDate: Date;
  employmentType: EmploymentType;
  weeklyWorkDays?: number;
};

export type PaidLeaveResult = {
  tenureMonths: number;
  currentGrant: number;
  previousGrant: number;
  maxDays: number;
  nextGrantDate: Date | null;
  nextGrantDays: number;
  isBeforeFirstGrant: boolean;
  firstGrantDate?: Date;
};

// --- Tenshoku Service (転職エージェント) ---
export type TenshokuServiceType = "comprehensive" | "it-web" | "highclass" | "young";

export type TenshokuService = {
  id: string;
  name: string;
  type: TenshokuServiceType;
  description: string;
  features: string[];
  affiliateUrl: string | null;
  /** Moshimo impression pixel URL for tracking */
  impressionUrl: string | null;
  officialUrl: string;
  recommended: boolean;
  /** Path relative to /public, e.g. "/logos/recruit-agent.png". null = initial fallback */
  logoUrl: string | null;
  /** e.g. "200,000件以上" */
  jobCount: string;
  /** e.g. "全国" */
  area: string;
  /** Primary strength shown in specs, e.g. "業界最大級の求人数" */
  strength: string;
};

// --- Taishoku Service (退職代行) ---
export type TaishokuServiceType = "lawyer" | "union" | "private";

export type TaishokuService = {
  id: string;
  name: string;
  type: TaishokuServiceType;
  price: number;
  features: string[];
  affiliateUrl: string | null;
  /** Moshimo impression pixel URL for tracking */
  impressionUrl: string | null;
  officialUrl: string;
  recommended: boolean;
  warning?: string;
  /** Path relative to /public, e.g. "/logos/miyabi.png". null = initial fallback */
  logoUrl: string | null;
  /** Primary strength, e.g. "弁護士が直接対応、残業代請求も可" */
  strength: string;
  /** Response time, e.g. "即日対応", "最短30分" */
  responseTime: string;
  /** Consultation method, e.g. "LINE・電話・メール" */
  consultationMethod: string;
  /** Success rate, e.g. "100%". null = not disclosed */
  successRate: string | null;
  /** Refund policy, e.g. "全額返金保証". null = none */
  refundPolicy: string | null;
};
