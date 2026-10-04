import { StyleSheet, View } from 'react-native';
import { Pressable } from '../../components/Pressable';
import { ProgressBar } from '../../components/Progress';
import { Card } from '../../components/Surface';
import { Text } from '../../components/Text';
import { tokens, useVerticalColors } from '../../theme';
import { money, moneySpoken, monthDay } from '../goals/format';
import type { CreditCard } from './AccountContext';

/**
 * Credit summary: a vertical (accent) Card in the Credit context — what you owe, what's available
 * and when it's due. Debit is the account balance itself (see Home) and lives in Banking.
 */
export function CreditSummary({ credit, onPress }: { credit: CreditCard; onPress?: () => void }) {
  const { onAccent } = useVerticalColors();
  const used = credit.balance / credit.limit;
  const label = `Vuno Credit. ${moneySpoken(credit.balance)} owed. ${moneySpoken(credit.limit - credit.balance)} available. Payment due ${monthDay(new Date(credit.dueDate))}.`;
  const card = (
    <Card tone="accent">
      <View style={styles.top}>
        <View>
          <Text variant="caption" color={onAccent}>
            Balance owed
          </Text>
          <Text variant="headline" color={onAccent} tabular>
            {money(credit.balance, true)}
          </Text>
        </View>
        <View style={styles.right}>
          <Text variant="caption" color={onAccent}>
            Payment due
          </Text>
          <Text variant="label" color={onAccent}>
            {monthDay(new Date(credit.dueDate))}
          </Text>
        </View>
      </View>
      <ProgressBar value={used} color={onAccent} track={tokens['color.surface.card']} />
      <View style={styles.bottom}>
        <Text variant="caption" color={onAccent} tabular>
          {`${money(credit.limit - credit.balance)} available of ${money(credit.limit)}`}
        </Text>
        <Text variant="caption" color={onAccent} tabular>
          {`Min. ${money(credit.minimumDue)}`}
        </Text>
      </View>
    </Card>
  );
  return onPress ? (
    <Pressable onPress={onPress} scale={0.98} accessibilityRole="button" accessibilityLabel={label}>
      {card}
    </Pressable>
  ) : (
    <View accessible accessibilityLabel={label}>
      {card}
    </View>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  bottom: { flexDirection: 'row', justifyContent: 'space-between' },
  right: { alignItems: 'flex-end' },
});
