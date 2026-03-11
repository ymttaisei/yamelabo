import { differenceInMonths, addMonths } from "date-fns";
import type { PaidLeaveInput, PaidLeaveResult } from "@/lib/types";
import { PL_FULLTIME_TABLE, PL_PARTTIME_TABLE } from "@/lib/constants";

// Grant milestones in years: 0.5, 1.5, 2.5, ...
const GRANT_MILESTONES = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5];

function getGrantDate(startDate: Date, yearsFromStart: number): Date {
  const months = Math.round(yearsFromStart * 12);
  return addMonths(startDate, months);
}

function getGrantDays(
  yearsFromStart: number,
  employmentType: "fulltime" | "parttime",
  weeklyWorkDays?: number
): number {
  // Find which milestone bracket this falls into
  let milestoneIndex = -1;
  for (let i = GRANT_MILESTONES.length - 1; i >= 0; i--) {
    if (yearsFromStart >= GRANT_MILESTONES[i]) {
      milestoneIndex = i;
      break;
    }
  }
  // If past 6.5 years, use the last bracket (same as 6.5)
  if (yearsFromStart >= 6.5) {
    milestoneIndex = GRANT_MILESTONES.length - 1;
  }

  if (milestoneIndex < 0) return 0;

  if (employmentType === "fulltime" || (weeklyWorkDays && weeklyWorkDays >= 5)) {
    // For 6.5+ years all use 20 days
    if (milestoneIndex >= PL_FULLTIME_TABLE.length) {
      return PL_FULLTIME_TABLE[PL_FULLTIME_TABLE.length - 1].days;
    }
    return PL_FULLTIME_TABLE[milestoneIndex].days;
  }

  // Part-time
  const days = weeklyWorkDays || 1;
  const table = PL_PARTTIME_TABLE[days];
  if (!table) return 0;
  if (milestoneIndex >= table.length) {
    return table[table.length - 1];
  }
  return table[milestoneIndex];
}

export function calculatePaidLeave(input: PaidLeaveInput): PaidLeaveResult {
  const { startDate, baseDate, employmentType, weeklyWorkDays } = input;

  const tenureMonths = differenceInMonths(baseDate, startDate);
  const tenureYears = tenureMonths / 12;

  // First grant is at 0.5 years (6 months)
  const firstGrantDate = getGrantDate(startDate, 0.5);

  if (tenureYears < 0.5) {
    return {
      tenureMonths,
      currentGrant: 0,
      previousGrant: 0,
      maxDays: 0,
      nextGrantDate: firstGrantDate,
      nextGrantDays: getGrantDays(0.5, employmentType, weeklyWorkDays),
      isBeforeFirstGrant: true,
      firstGrantDate,
    };
  }

  // Find the most recent grant milestone
  let currentMilestone = 0.5;
  for (const m of GRANT_MILESTONES) {
    if (tenureYears >= m) {
      currentMilestone = m;
    }
  }
  // For years beyond 6.5, grant happens every year
  if (tenureYears >= 6.5) {
    // Find the latest .5-year milestone
    const yearsSince6_5 = tenureYears - 6.5;
    const additionalYears = Math.floor(yearsSince6_5);
    currentMilestone = 6.5 + additionalYears;
    // Check if we've passed the .5 mark of the additional year
    if (tenureYears >= currentMilestone + 1) {
      currentMilestone = currentMilestone + 1;
    }
  }

  const currentGrant = getGrantDays(
    currentMilestone,
    employmentType,
    weeklyWorkDays
  );

  // Previous grant (one milestone before current)
  let previousMilestone: number | null = null;
  if (currentMilestone === 0.5) {
    previousMilestone = null;
  } else if (currentMilestone <= 6.5) {
    const idx = GRANT_MILESTONES.indexOf(currentMilestone);
    previousMilestone = idx > 0 ? GRANT_MILESTONES[idx - 1] : null;
  } else {
    previousMilestone = currentMilestone - 1;
  }

  const previousGrant = previousMilestone !== null
    ? getGrantDays(previousMilestone, employmentType, weeklyWorkDays)
    : 0;

  const maxDays = currentGrant + previousGrant;

  // Next grant
  let nextMilestoneYears: number;
  if (currentMilestone < 6.5) {
    const idx = GRANT_MILESTONES.indexOf(currentMilestone);
    nextMilestoneYears = GRANT_MILESTONES[idx + 1] ?? currentMilestone + 1;
  } else {
    nextMilestoneYears = currentMilestone + 1;
  }

  const nextGrantDate = getGrantDate(startDate, nextMilestoneYears);
  const nextGrantDays = getGrantDays(
    nextMilestoneYears,
    employmentType,
    weeklyWorkDays
  );

  return {
    tenureMonths,
    currentGrant,
    previousGrant,
    maxDays,
    nextGrantDate,
    nextGrantDays,
    isBeforeFirstGrant: false,
  };
}
