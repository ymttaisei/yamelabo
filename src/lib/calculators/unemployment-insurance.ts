import type { UnemploymentInput, UnemploymentResult } from "@/lib/types";
import {
  UI_WAGE_LOWER_LIMIT,
  UI_WAGE_UPPER_LIMITS,
  UI_BENEFIT_UPPER_LIMITS,
  UI_FORMULA_THRESHOLD_LOW,
  UI_FORMULA_THRESHOLD_HIGH,
  UI_FORMULA_THRESHOLD_60_64_HIGH,
  UI_FORMULA_COEFF_A,
  UI_FORMULA_COEFF_B,
  UI_FORMULA_COEFF_C,
  UI_FORMULA_60_COEFF_A,
  UI_FORMULA_60_COEFF_B,
  UI_FORMULA_60_COEFF_C,
  UI_FORMULA_60_LINEAR_A,
  UI_FORMULA_60_LINEAR_B,
  UI_COMPANY_DAYS,
  UI_DISABLED_DAYS,
  UI_WAITING_PERIOD,
  UI_VOLUNTARY_RESTRICTION_MONTHS,
} from "@/lib/constants";

function getAgeBracket(age: number): string {
  if (age < 30) return "under30";
  if (age < 45) return "30to44";
  if (age < 60) return "45to59";
  return "60to64";
}

function getAgeBracketIndex(age: number): number {
  if (age < 30) return 0;
  if (age < 35) return 1;
  if (age < 45) return 2;
  if (age < 60) return 3;
  return 4;
}

function getTenureBracketIndex(years: number): number {
  if (years < 1) return 0;
  if (years < 5) return 1;
  if (years < 10) return 2;
  if (years < 20) return 3;
  return 4;
}

function calcDailyWage(monthlySalary: number, age: number): number {
  const bracket = getAgeBracket(age);
  const upperLimit = UI_WAGE_UPPER_LIMITS[bracket];
  const w = (monthlySalary * 6) / 180;
  return Math.max(UI_WAGE_LOWER_LIMIT, Math.min(w, upperLimit));
}

function calcDailyBenefit(w: number, age: number): number {
  const bracket = getAgeBracket(age);
  let y: number;

  if (bracket === "60to64") {
    // 60-64歳
    if (w < UI_FORMULA_THRESHOLD_LOW) {
      y = 0.8 * w;
    } else if (w <= UI_FORMULA_THRESHOLD_60_64_HIGH) {
      const formula =
        (-UI_FORMULA_60_COEFF_A * w * w + UI_FORMULA_60_COEFF_B * w) /
        UI_FORMULA_60_COEFF_C;
      const linear = UI_FORMULA_60_LINEAR_A * w + UI_FORMULA_60_LINEAR_B;
      y = Math.min(formula, linear);
    } else {
      y = 0.45 * w;
    }
  } else {
    // 30歳未満・30-44・45-59 共通
    if (w < UI_FORMULA_THRESHOLD_LOW) {
      y = 0.8 * w;
    } else if (w <= UI_FORMULA_THRESHOLD_HIGH) {
      y =
        (-UI_FORMULA_COEFF_A * w * w + UI_FORMULA_COEFF_B * w) /
        UI_FORMULA_COEFF_C;
    } else {
      y = 0.5 * w;
    }
  }

  y = Math.floor(y);

  // Clamp to benefit upper limit
  const benefitUpperLimit = UI_BENEFIT_UPPER_LIMITS[bracket];
  return Math.min(y, benefitUpperLimit);
}

function calcTotalDays(
  age: number,
  tenureYears: number,
  resignationType: "voluntary" | "company" | "specified-reason",
  isDisabled: boolean
): number {
  // 障害者等
  if (isDisabled) {
    const disabledBracket = age < 45 ? "under45" : "45to64";
    const tenureBracket = tenureYears < 1 ? "under1" : "1plus";
    return UI_DISABLED_DAYS[disabledBracket][tenureBracket];
  }

  // 自己都合
  if (resignationType === "voluntary") {
    if (tenureYears < 1) return 0;
    if (tenureYears < 10) return 90;
    if (tenureYears < 20) return 120;
    return 150;
  }

  // 会社都合 / 特定理由離職者
  const ageIndex = getAgeBracketIndex(age);
  const tenureIndex = getTenureBracketIndex(tenureYears);
  return UI_COMPANY_DAYS[ageIndex][tenureIndex];
}

function calcRestrictionMonths(
  resignationType: "voluntary" | "company" | "specified-reason"
): number {
  if (resignationType === "voluntary") {
    return UI_VOLUNTARY_RESTRICTION_MONTHS;
  }
  return 0;
}

export function calculateUnemploymentInsurance(
  input: UnemploymentInput
): UnemploymentResult {
  const { age, monthlySalary, tenureYears, resignationType, isDisabled } =
    input;

  // Keep w as float for benefit calculation (spec: 小数点以下は切り捨てない)
  const rawDailyWage = calcDailyWage(monthlySalary, age);
  const dailyBenefit = calcDailyBenefit(rawDailyWage, age);
  const displayDailyWage = Math.floor(rawDailyWage);
  const benefitRate = rawDailyWage > 0 ? dailyBenefit / rawDailyWage : 0;
  const totalDays = calcTotalDays(age, tenureYears, resignationType, isDisabled);
  const totalAmount = dailyBenefit * totalDays;
  const waitingPeriod = UI_WAITING_PERIOD;
  const restrictionMonths = calcRestrictionMonths(resignationType);

  return {
    dailyWage: displayDailyWage,
    dailyBenefit,
    benefitRate,
    totalDays,
    totalAmount,
    waitingPeriod,
    restrictionMonths,
  };
}
