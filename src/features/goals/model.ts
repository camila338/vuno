import type { IconName } from '../../components/icons';

export type { IconName };

export type Category = 'travel' | 'emergency' | 'tech' | 'home' | 'gift' | 'car' | 'education' | 'other';

export type Rules = {
  /** Automatic contribution on paydays (the 1st and 15th). */
  payday: boolean;
  /** Round each card purchase up to the next dollar. */
  roundUps: boolean;
  /** 10% of any extra income (refunds, bonuses, incoming transfers). */
  windfall: boolean;
};

export type Goal = {
  id: string;
  name: string;
  category: Category;
  target: number;
  saved: number;
  monthly: number;
  rules: Rules;
  targetDate: string; // ISO
  createdAt: string; // ISO
};

/** The user's financial profile (sample data for the design prototype). */
export const finances = {
  bankingBalance: 1050.77,
  monthlyExpenses: 1400,
  /** Free money per month after fixed costs. Basis of the feasibility meter. */
  freeMonthly: 900,
  roundUpsMonthly: 32,
  windfallMonthly: 45,
};
