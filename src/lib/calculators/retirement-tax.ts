import type { RetirementTaxInput, RetirementTaxResult } from "@/lib/types";
import { TAX_BRACKETS, RECONSTRUCTION_TAX_RATE, RESIDENT_TAX_RATE } from "@/lib/constants";

function calcDeduction(years: number, isDisability: boolean): number {
  let deduction: number;
  if (years <= 20) {
    deduction = Math.max(400_000 * years, 800_000);
  } else {
    deduction = 8_000_000 + 700_000 * (years - 20);
  }
  if (isDisability) {
    deduction += 1_000_000;
  }
  return deduction;
}

function calcRawTaxableIncome(
  retirementPay: number,
  deduction: number,
  years: number,
  isExecutive: boolean
): number {
  const diff = retirementPay - deduction;
  if (diff <= 0) return 0;

  // 勤続5年以下の役員等: 1/2課税なし
  if (years <= 5 && isExecutive) {
    return diff;
  }

  // 勤続5年以下の非役員: 300万円超の部分は1/2課税なし (2022年改正)
  if (years <= 5 && !isExecutive) {
    if (diff <= 3_000_000) {
      return Math.floor(diff / 2);
    } else {
      return Math.floor(3_000_000 / 2) + (diff - 3_000_000);
    }
  }

  // 通常: 1/2課税
  return Math.floor(diff / 2);
}

function calcIncomeTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  for (const bracket of TAX_BRACKETS) {
    if (taxableIncome <= bracket.limit) {
      return taxableIncome * bracket.rate - bracket.deduction;
    }
  }
  // Should not reach here
  const last = TAX_BRACKETS[TAX_BRACKETS.length - 1];
  return taxableIncome * last.rate - last.deduction;
}

export function calculateRetirementTax(
  input: RetirementTaxInput
): RetirementTaxResult {
  const { retirementPay, tenureYears, isDisability, isExecutive } = input;

  const deduction = calcDeduction(tenureYears, isDisability);

  const rawTaxable = calcRawTaxableIncome(
    retirementPay,
    deduction,
    tenureYears,
    isExecutive
  );
  // 1,000円未満切り捨て
  const taxableIncome = Math.floor(rawTaxable / 1000) * 1000;

  const incomeTax = calcIncomeTax(taxableIncome);
  const reconstructionTax = incomeTax * RECONSTRUCTION_TAX_RATE;
  // 1円未満切り捨て
  const totalIncomeTax = Math.floor(incomeTax + reconstructionTax);

  // 住民税: 100円未満切り捨て
  const residentTax =
    Math.floor((taxableIncome * RESIDENT_TAX_RATE) / 100) * 100;

  const totalTax = totalIncomeTax + residentTax;
  const takeHome = retirementPay - totalTax;
  const effectiveRate =
    retirementPay > 0 ? totalTax / retirementPay : 0;

  return {
    deduction,
    taxableIncome,
    incomeTax: Math.floor(incomeTax),
    reconstructionTax: Math.floor(reconstructionTax),
    residentTax,
    totalTax,
    takeHome,
    effectiveRate,
  };
}
