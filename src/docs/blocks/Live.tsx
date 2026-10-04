import type { ReactNode } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PlatformProvider, VerticalProvider, type OS, type Vertical } from '../../theme';
import { FontGate } from '../../theme/withVunoFonts';

/**
 * Renders real components from src/components inside an MDX page (do's and don'ts,
 * catalog, patterns). `width` caps the width like a phone; `center` centers components
 * that hug their content; `os` picks iOS or Android conventions.
 */
export function Live({ children, vertical = 'banking', width = 353, gap = 12, center, os = 'ios' }: { children: ReactNode; vertical?: Vertical; width?: number; gap?: number; center?: boolean; os?: OS }) {
  return (
    <div className="vds-live" style={{ width: '100%', maxWidth: width }}>
      <FontGate>
        <GestureHandlerRootView style={{ width: '100%' }}>
          <SafeAreaProvider>
            <PlatformProvider os={os}>
              <VerticalProvider vertical={vertical}>
                <View style={center ? { gap, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' } : { gap }}>{children}</View>
              </VerticalProvider>
            </PlatformProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </FontGate>
    </div>
  );
}
