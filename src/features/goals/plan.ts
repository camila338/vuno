import { finances, type Rules } from './model';

export const MIN_MONTHS = 1;
export const MAX_MONTHS = 36;
export const MONTHLY_STEP = 10;

const WEEKS_PER_MONTH = 52 / 12;

export type Feasibility = 'comfortable' | 'tight' | 'demanding';

/** Monthly contribution to reach `remaining` in `months` months (rounded to a multiple of 5). */
export function monthlyFor(remaining: number, months: number) {
  return Math.max(5, Math.ceil(remaining / months / 5) * 5);
}

/** Months needed with a monthly contribution. */
export function monthsFor(remaining: number, monthly: number) {
  return Math.min(MAX_MONTHS * 2, Math.max(MIN_MONTHS, Math.ceil(remaining / Math.max(1, monthly))));
}

/** Default term: the one that keeps the contribution around 30% of free money. */
export function defaultMonths(remaining: number) {
  return Math.min(MAX_MONTHS, Math.max(3, Math.ceil(remaining / (finances.freeMonthly * 0.3))));
}

/** How comfortable the contribution is against the month's free money. */
export function feasibility(monthly: number): { level: Feasibility; share: number } {
  const share = monthly / finances.freeMonthly;
  return { level: share <= 0.4 ? 'comfortable' : share <= 0.75 ? 'tight' : 'demanding', share };
}

/** Estimated extra monthly contribution from the automatic rules. */
export function rulesExtra(rules: Rules) {
  return (rules.roundUps ? finances.roundUpsMonthly : 0) + (rules.windfall ? finances.windfallMonthly : 0);
}

/** Real term with the rules: how many months, and how many weeks earlier it's reached. */
export function projection(remaining: number, monthly: number, rules: Rules) {
  const base = rules.payday ? monthly : 0;
  const perMonth = base + rulesExtra(rules);
  if (perMonth <= 0) return { months: Infinity, weeksEarlier: 0, perMonth };
  const exact = remaining / perMonth;
  const planned = remaining / monthly;
  return { months: Math.ceil(exact), weeksEarlier: Math.max(0, Math.round((planned - exact) * WEEKS_PER_MONTH)), perMonth };
}

export function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

/** Month-by-month projection points (for the plan chart). */
export function curve(start: number, monthly: number, months: number) {
  return Array.from({ length: months }, (_, i) => start + monthly * (i + 1));
}

/** Next payday (the 1st or 15th) from today. */
export function nextPayday(from = new Date()) {
  const d = new Date(from);
  if (d.getDate() < 15) d.setDate(15);
  else d.setMonth(d.getMonth() + 1, 1);
  return d;
}
