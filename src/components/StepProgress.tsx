import { StyleSheet, View } from 'react-native';
import { tokens } from '../theme';

/** Segmented step indicator for multi-step flows (progress.step.* tokens). */
export function StepProgress({ step, total }: { step: number; total: number }) {
  return (
    <View style={styles.row} accessible accessibilityRole="progressbar" accessibilityLabel={`Step ${step} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <View key={i} style={[styles.segment, { backgroundColor: i < step ? tokens['progress.step.done'] : tokens['progress.step.track'] }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flex: 1, flexDirection: 'row', gap: tokens['space.2xs'] },
  segment: { flex: 1, height: tokens['progress.slim'], borderRadius: tokens['radius.xs'] },
});
