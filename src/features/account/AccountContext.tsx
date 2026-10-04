import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { IconName } from '../goals/model';

// In-memory account for the prototype (no backend).

export type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: number; // negative = money out
  icon: IconName;
  date: string; // ISO
};

export type CreditCard = { balance: number; limit: number; dueDate: string; minimumDue: number; last4: string };

export const user = { firstName: 'Maya', lastName: 'Rivera' };
export const debitCard = { last4: '4821', expires: '09/29' };
export const contacts = [
  { id: 'alex', name: 'Alex Kim', initials: 'AK' },
  { id: 'jordan', name: 'Jordan Lee', initials: 'JL' },
  { id: 'sam', name: 'Sam Ortiz', initials: 'SO' },
  { id: 'priya', name: 'Priya Shah', initials: 'PS' },
];

/** Spending this month by category (for the Home summary). */
export const spending = {
  lastMonth: 1252,
  categories: [
    { label: 'Groceries', icon: 'basket-outline' as IconName, amount: 412 },
    { label: 'Dining out', icon: 'restaurant-outline' as IconName, amount: 268 },
    { label: 'Shopping', icon: 'bag-handle-outline' as IconName, amount: 231 },
    { label: 'Transport', icon: 'car-outline' as IconName, amount: 154 },
    { label: 'Subscriptions', icon: 'repeat-outline' as IconName, amount: 86 },
  ],
};

const d = (day: number, hour = 10) => new Date(2026, 9, day, hour).toISOString();
const seed: Transaction[] = [
  { id: 't1', title: 'Blue Bottle Coffee', subtitle: 'Dining out', amount: -6.5, icon: 'cafe-outline', date: d(3, 9) },
  { id: 't2', title: 'Whole Foods Market', subtitle: 'Groceries', amount: -86.42, icon: 'basket-outline', date: d(2, 18) },
  { id: 't3', title: 'Uber', subtitle: 'Transport', amount: -18.3, icon: 'car-outline', date: d(2, 8) },
  { id: 't4', title: 'Payroll · Acme Studio', subtitle: 'Direct deposit', amount: 2140, icon: 'briefcase-outline', date: d(1, 7) },
  { id: 't5', title: 'Spotify', subtitle: 'Subscriptions', amount: -11.99, icon: 'musical-notes-outline', date: d(1, 6) },
];

const credit: CreditCard = { balance: 320.15, limit: 2000, dueDate: d(14), minimumDue: 35, last4: '7702' };

type Ctx = {
  balance: number;
  transactions: Transaction[];
  credit: CreditCard;
  cardFrozen: boolean;
  setCardFrozen: (v: boolean) => void;
  /** Moves money in (+) or out (−) of the Vuno account and logs it. */
  move: (amount: number, title: string, subtitle: string, icon: IconName) => void;
};

const AccountContext = createContext<Ctx | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(1050.77);
  const [transactions, setTransactions] = useState(seed);
  const [cardFrozen, setCardFrozen] = useState(false);

  const move = useCallback((amount: number, title: string, subtitle: string, icon: IconName) => {
    setBalance((b) => Math.round((b + amount) * 100) / 100);
    setTransactions((t) => [{ id: `${Date.now()}`, title, subtitle, amount, icon, date: new Date().toISOString() }, ...t]);
  }, []);

  const value = useMemo(() => ({ balance, transactions, credit, cardFrozen, setCardFrozen, move }), [balance, transactions, cardFrozen, move]);
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error('useAccount must be used inside AccountProvider');
  return ctx;
}
