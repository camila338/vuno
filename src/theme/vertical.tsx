import { createContext, useContext, type ReactNode } from 'react';
import { tokens } from './tokens';

// "Vertical context" pattern (TOKEN-NAMING.md, layer 3): components never name a
// vertical; they use color.vertical.accent / on-accent, which this provider resolves.
export type Vertical = 'banking' | 'save' | 'invest' | 'credit';

const pairs = {
  banking: { accent: tokens['color.vertical.banking.accent'], onAccent: tokens['color.vertical.banking.on-accent'] },
  save: { accent: tokens['color.vertical.save.accent'], onAccent: tokens['color.vertical.save.on-accent'] },
  invest: { accent: tokens['color.vertical.invest.accent'], onAccent: tokens['color.vertical.invest.on-accent'] },
  credit: { accent: tokens['color.vertical.credit.accent'], onAccent: tokens['color.vertical.credit.on-accent'] },
} as const;

const VerticalContext = createContext<Vertical>('banking');

export function VerticalProvider({ vertical, children }: { vertical: Vertical; children: ReactNode }) {
  return <VerticalContext.Provider value={vertical}>{children}</VerticalContext.Provider>;
}

/** `color.vertical.accent` and `color.vertical.on-accent` of the active vertical. */
export function useVerticalColors() {
  return pairs[useContext(VerticalContext)];
}
