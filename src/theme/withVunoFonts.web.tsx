import { useEffect, useState, type ReactNode } from 'react';
import { vunoFonts } from './fonts';

// In the web Storybook fonts load with the browser's FontFace API:
// expo-font pulls in expo-modules-core, which Vite can't pre-bundle in dev mode.
type FontSource = string | { uri?: string; default?: string };
const toUrl = (src: FontSource) => (typeof src === 'string' ? src : (src.uri ?? src.default ?? ''));

let loading: Promise<unknown> | undefined;
function loadFonts() {
  loading ??= Promise.all(
    Object.entries(vunoFonts).map(async ([family, src]) => {
      const face = new FontFace(family, `url(${toUrl(src as FontSource)})`);
      document.fonts.add(await face.load());
    }),
  );
  return loading;
}

export function FontGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    loadFonts().finally(() => setReady(true));
  }, []);
  return ready ? <>{children}</> : null;
}

export const withVunoFonts = (Story: () => ReactNode) => (
  <FontGate>
    <Story />
  </FontGate>
);
