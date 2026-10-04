import type { ReactNode } from 'react';

/** On device the app is the device: no frame. The web prototype uses DeviceFrame.web.tsx. */
export function DeviceFrame({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
