import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { Category, Rules } from './model';

/** Draft goal while going through the creation flow. */
export type Draft = {
  name: string;
  category: Category;
  /** true once the user picks the category by hand and detection stops. */
  categoryLocked: boolean;
  target: number;
  mode: 'date' | 'amount';
  months: number;
  monthly: number;
  rules: Rules;
  initialDeposit: number;
};

export const emptyDraft: Draft = {
  name: '',
  category: 'other',
  categoryLocked: false,
  target: 0,
  mode: 'date',
  months: 8,
  monthly: 0,
  rules: { payday: true, roundUps: true, windfall: false },
  initialDeposit: 25,
};

const DraftContext = createContext<[Draft, Dispatch<SetStateAction<Draft>>] | null>(null);

export function DraftProvider({ children }: { children: ReactNode }) {
  const state = useState(emptyDraft);
  return <DraftContext.Provider value={state}>{children}</DraftContext.Provider>;
}

export function useDraft() {
  const ctx = useContext(DraftContext);
  if (!ctx) throw new Error('useDraft must be used inside DraftProvider');
  return ctx;
}
