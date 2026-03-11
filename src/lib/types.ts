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

// --- Taishoku Service (退職代行) ---
export type TaishokuService = {
  id: string;
  name: string;
  type: "lawyer" | "union" | "private";
  price: number;
  features: string[];
  affiliateUrl: string | null;
  officialUrl: string;
  recommended: boolean;
  warning?: string;
};
