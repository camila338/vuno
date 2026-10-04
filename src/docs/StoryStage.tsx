import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { tokens } from '../theme';

/** Logical width of the target iPhone (393 pt): stories never render wider than the phone. */
export const MOBILE_WIDTH = 393;

/** Wraps every story: gesture root, safe areas and the page surface at phone width, with screen insets. */
export function StoryStage({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <View style={styles.stage}>{children}</View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

/** Variants side by side, wrapping like they would on a phone. */
export function Row({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[styles.row, style]}>{children}</View>;
}

/** Variants stacked, each with a small caption (Vibe-style "Regular / Disabled" groups). */
export function Stack({ children, gap = tokens['space.md'] }: { children: ReactNode; gap?: number }) {
  return <View style={{ gap }}>{children}</View>;
}

const styles = StyleSheet.create({
  root: { flexGrow: 1 },
  stage: { width: '100%', maxWidth: MOBILE_WIDTH, padding: tokens['space.inset.screen'], backgroundColor: tokens['color.surface.page'], gap: tokens['space.gap.stack'] },
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens['space.xs'] },
});
