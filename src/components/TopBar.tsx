import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { tokens, useOS, useSystemIcon } from '../theme';
import { IconButton } from './Button';
import { Text } from './Text';

// Platform spec: Material 3 small top app bar is 64 dp tall. iOS uses the 48 pt touch row.
const M3_HEIGHT = 64;

type Props = {
  title?: string;
  /** back: platform back arrow (chevron on iOS, arrow on Android). close: leaves a modal flow. */
  leading?: { kind: 'back' | 'close'; onPress: () => void };
  /** Up to two IconButtons, or a small element such as a step indicator. */
  trailing?: ReactNode;
  /** Content between leading and trailing instead of the title (e.g. StepProgress). */
  children?: ReactNode;
};

/**
 * Top bar of a screen.
 * - iOS (HIG navigation bar): centered title, chevron back.
 * - Android (Material 3 small top app bar): title aligned to the start after the navigation icon, arrow back.
 */
export function TopBar({ title, leading, trailing, children }: Props) {
  const os = useOS();
  const back = useSystemIcon('back');
  const lead = leading ? (
    <IconButton icon={leading.kind === 'back' ? back : 'close'} label={leading.kind === 'back' ? 'Back' : 'Close'} onPress={leading.onPress} />
  ) : null;
  const heading = title ? (
    <Text variant="title" accessibilityRole="header" numberOfLines={1}>
      {title}
    </Text>
  ) : null;

  if (os === 'android') {
    return (
      <View style={[styles.bar, styles.android]}>
        {lead}
        <View style={styles.start}>{children ?? heading}</View>
        {trailing}
      </View>
    );
  }
  return (
    <View style={styles.bar}>
      <View style={styles.side}>{lead}</View>
      <View style={styles.center}>{children ?? heading}</View>
      <View style={[styles.side, styles.end]}>{trailing}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', alignItems: 'center', gap: tokens['space.md'], minHeight: tokens['size.touch.min'], paddingHorizontal: tokens['space.inset.screen'] },
  android: { minHeight: M3_HEIGHT },
  start: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  side: { minWidth: tokens['size.touch.min'] },
  end: { alignItems: 'flex-end' },
  center: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
});
