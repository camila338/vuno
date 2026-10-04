import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Goal } from './model';

// In-memory state for the design prototype (no backend).
const seed: Goal[] = [
  {
    id: 'emergency',
    name: 'Emergency fund',
    category: 'emergency',
    target: 4200,
    saved: 2480,
    monthly: 215,
    rules: { payday: true, roundUps: true, windfall: false },
    targetDate: '2027-06-01T00:00:00.000Z',
    createdAt: '2026-01-10T00:00:00.000Z',
  },
  {
    id: 'austin',
    name: 'Austin City Limits',
    category: 'travel',
    target: 600,
    saved: 540,
    monthly: 60,
    rules: { payday: true, roundUps: false, windfall: false },
    targetDate: '2026-11-01T00:00:00.000Z',
    createdAt: '2026-06-02T00:00:00.000Z',
  },
];

type Ctx = { goals: Goal[]; addGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => string; lastCreated: string | null };
const GoalsContext = createContext<Ctx | null>(null);

export function GoalsProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState(seed);
  const [lastCreated, setLastCreated] = useState<string | null>(null);
  const addGoal = useCallback((goal: Omit<Goal, 'id' | 'createdAt'>) => {
    const id = `${Date.now()}`;
    setGoals((g) => [{ ...goal, id, createdAt: new Date().toISOString() }, ...g]);
    setLastCreated(id);
    return id;
  }, []);
  const value = useMemo(() => ({ goals, addGoal, lastCreated }), [goals, addGoal, lastCreated]);
  return <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>;
}

export function useGoals() {
  const ctx = useContext(GoalsContext);
  if (!ctx) throw new Error('useGoals must be used inside GoalsProvider');
  return ctx;
}
