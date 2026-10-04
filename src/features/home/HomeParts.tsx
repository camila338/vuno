import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Chip } from '../../components/Chip';
import { ListRow } from '../../components/List';
import { Pressable } from '../../components/Pressable';
import { ProgressBar } from '../../components/Progress';
import { Card } from '../../components/Surface';
import { Text } from '../../components/Text';
import { tokens, useVerticalColors } from '../../theme';
import { spending, type Transaction } from '../account/AccountContext';
import { categories } from '../goals/categories';
import { money, moneySpoken } from '../goals/format';
import type { Goal } from '../goals/model';

const when = (iso: string) => {
  const d = new Date(iso);
  if (d.toDateString() === new Date().toDateString()) return 'Today';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

/** A transaction as a ListRow. Incoming money uses list.row.positive and a + sign. */
export function TransactionRow({ tx }: { tx: Transaction }) {
  const incoming = tx.amount > 0;
  return (
    <ListRow
      icon={tx.icon}
      title={tx.title}
      detail={`${tx.subtitle} · ${when(tx.date)}`}
      value={`${incoming ? '+' : '−'}${money(Math.abs(tx.amount), true)}`}
      valueTone={incoming ? 'positive' : 'default'}
      accessibilityLabel={`${tx.title}, ${tx.subtitle}, ${incoming ? 'received' : 'spent'} ${moneySpoken(Math.abs(tx.amount))}`}
    />
  );
}

/** Spending this month: total, comparison and a ranked bar list in one hue (no new colors). */
export function SpendingSummary() {
  const total = spending.categories.reduce((s, c) => s + c.amount, 0);
  const max = Math.max(...spending.categories.map((c) => c.amount));
  const delta = Math.round(((spending.lastMonth - total) / spending.lastMonth) * 100);
  return (
    <Card>
      <View style={styles.head}>
        <View>
          <Text variant="caption" color={tokens['color.text.tertiary']}>
            Spent in October
          </Text>
          <Text variant="headline" tabular>
            {money(total)}
          </Text>
        </View>
        <Chip status="success" icon="trending-down" label={`${delta}% less than September`} />
      </View>
      <View style={styles.bars}>
        {spending.categories.map((c) => (
          <View key={c.label} style={styles.barRow} accessible accessibilityLabel={`${c.label}: ${moneySpoken(c.amount)}`}>
            <View style={styles.barLabel}>
              <Ionicons name={c.icon} size={tokens['icon.size.sm']} color={tokens['color.text.secondary']} />
              <Text variant="caption" numberOfLines={1}>
                {c.label}
              </Text>
            </View>
            <View style={styles.barTrack}>
              <ProgressBar value={c.amount / max} color={tokens['color.text.primary']} track={tokens['color.border.default']} />
            </View>
            <Text variant="caption" tabular style={styles.barValue}>
              {money(c.amount)}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

/** Vuno Save on Home: total saved and the top goals, as a vertical (accent) card. */
export function SavingsSummary({ goals }: { goals: Goal[] }) {
  const { onAccent } = useVerticalColors();
  const total = goals.reduce((s, g) => s + g.saved, 0);
  return (
    <Pressable onPress={() => router.navigate('/save')} scale={0.98} accessibilityRole="button" accessibilityLabel={`Vuno Save. ${moneySpoken(total)} saved in ${goals.length} goals.`}>
      <Card tone="accent">
        <View style={styles.head}>
          <View>
            <Text variant="headline" color={onAccent} tabular>
              {money(total)}
            </Text>
            <Text variant="caption" color={onAccent}>
              {`saved in ${goals.length} ${goals.length === 1 ? 'goal' : 'goals'}`}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={tokens['icon.size.sm']} color={onAccent} />
        </View>
        <View style={styles.goals}>
          {goals.slice(0, 3).map((g) => (
            <View key={g.id} style={styles.goal}>
              <Ionicons name={categories[g.category].icon} size={tokens['icon.size.sm']} color={onAccent} />
              <View style={styles.goalText}>
                <View style={styles.goalHead}>
                  <Text variant="caption" color={onAccent} numberOfLines={1} style={styles.flex}>
                    {g.name}
                  </Text>
                  <Text variant="caption" color={onAccent} tabular>
                    {`${Math.round((g.saved / g.target) * 100)}%`}
                  </Text>
                </View>
                <ProgressBar value={g.saved / g.target} color={onAccent} track={tokens['color.surface.card']} slim />
              </View>
            </View>
          ))}
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: tokens['space.sm'] },
  bars: { gap: tokens['space.sm'] },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: tokens['space.xs'] },
  barLabel: { flex: 3, flexDirection: 'row', alignItems: 'center', gap: tokens['space.xs'] },
  barTrack: { flex: 4 },
  barValue: { flex: 1, textAlign: 'right' },
  goals: { gap: tokens['space.sm'] },
  goal: { flexDirection: 'row', alignItems: 'center', gap: tokens['space.sm'] },
  goalText: { flex: 1, gap: tokens['space.2xs'] },
  goalHead: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens['space.xs'] },
  flex: { flex: 1 },
});
