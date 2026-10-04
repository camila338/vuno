import Ionicons from '@expo/vector-icons/Ionicons';
import { createContext, useContext, type ComponentProps, type ReactNode } from 'react';
import { Platform } from 'react-native';

// iOS (Apple HIG) and Android (Material 3) conventions. On a device the OS decides;
// the web prototype and Storybook override it with <PlatformProvider os="android">.
export type OS = 'ios' | 'android';

const PlatformContext = createContext<OS | null>(null);

export function PlatformProvider({ os, children }: { os: OS; children: ReactNode }) {
  return <PlatformContext.Provider value={os}>{children}</PlatformContext.Provider>;
}

/** The platform whose conventions the UI follows. */
export function useOS(): OS {
  const forced = useContext(PlatformContext);
  if (Platform.OS === 'ios' || Platform.OS === 'android') return Platform.OS;
  return forced ?? 'ios';
}

type IconName = ComponentProps<typeof Ionicons>['name'];

/** System icons that each platform draws differently (HIG SF Symbols vs Material Symbols). */
const SYSTEM_ICONS: Record<'back' | 'more' | 'share', Record<OS, IconName>> = {
  back: { ios: 'chevron-back', android: 'arrow-back' },
  more: { ios: 'ellipsis-horizontal', android: 'ellipsis-vertical' },
  share: { ios: 'share-outline', android: 'share-social-outline' },
};

export type SystemIcon = keyof typeof SYSTEM_ICONS;

export function systemIcon(name: SystemIcon, os: OS): IconName {
  return SYSTEM_ICONS[name][os];
}

export function useSystemIcon(name: SystemIcon): IconName {
  return systemIcon(name, useOS());
}

/** Material 3 pressed state layer: the content color at 10% opacity. Tokens are #RRGGBB. */
export function stateLayer(color: string) {
  return `${color}1A`;
}
