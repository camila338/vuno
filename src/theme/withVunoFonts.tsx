import { useFonts } from 'expo-font';
import type { ReactNode } from 'react';
import { vunoFonts } from './fonts';

export function FontGate({ children }: { children: ReactNode }) {
  const [loaded, error] = useFonts(vunoFonts);
  if (!loaded && !error) return null;
  return <>{children}</>;
}

// Storybook decorator: doesn't render the story until the fonts are loaded.
export const withVunoFonts = (Story: () => ReactNode) => (
  <FontGate>
    <Story />
  </FontGate>
);
