import { StyleSheet, View } from 'react-native';
import { money, moneySpoken } from '../features/goals/format';
import { tokens } from '../theme';
import { Text } from './Text';

/**
 * Balance (FOUNDATIONS §10, balance.*): the one big figure on a screen, in the display face.
 * Cents step down to balance.cents. VoiceOver reads the full amount.
 */
export function Balance({ amount, label }: { amount: number; label: string }) {
  const [whole, cents] = money(amount, true).split('.');
  return (
    <View style={styles.wrap} accessible accessibilityLabel={`${label}: ${moneySpoken(amount)}`}>
      <Text variant="caption" color={tokens['color.text.tertiary']} style={styles.label}>
        {label}
      </Text>
      <Text variant="balance" tabular color={tokens['balance.fg']}>
        {whole}
        <Text variant="balance" color={tokens['balance.fg']} style={styles.cents}>
          {`.${cents}`}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 0 },
  label: { textTransform: 'uppercase' },
  cents: { fontSize: tokens['balance.cents'] },
});
