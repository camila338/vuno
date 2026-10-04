import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Pressable } from '../../components/Pressable';
import { ProgressBar } from '../../components/Progress';
import { Card, IconBadge } from '../../components/Surface';
import { Text } from '../../components/Text';
import { tokens, useVerticalColors } from '../../theme';
import { categories } from './categories';
import { money, moneySpoken, monthYearShort } from './format';
import type { Goal } from './model';

/** Goal as a vertical card (card.accent: the color comes from the Save context, never the component). */
export function GoalCard({ goal }: { goal: Goal }) {
  const { onAccent } = useVerticalColors();
  const pct = goal.saved / goal.target;
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/goal/[id]', params: { id: goal.id } })}
      scale={0.98}
      accessibilityRole="button"
      accessibilityLabel={`${goal.name}. ${moneySpoken(goal.saved)} of ${moneySpoken(goal.target)}. ${Math.round(pct * 100)} percent.`}
    >
      <Card tone="accent">
        <View style={styles.top}>
          <IconBadge icon={categories[goal.category].icon} />
          <Text variant="label" color={onAccent} style={styles.name} numberOfLines={1}>
            {goal.name}
          </Text>
          <Ionicons name="chevron-forward" size={tokens['icon.size.sm']} color={onAccent} />
        </View>
        <View>
          <Text variant="headline" color={onAccent} tabular>
            {money(goal.saved)}
          </Text>
          <Text variant="caption" color={onAccent}>
            {`of ${money(goal.target)} · ${Math.round(pct * 100)}%`}
          </Text>
        </View>
        <ProgressBar value={pct} color={onAccent} track={tokens['color.surface.card']} slim />
        <Text variant="caption" color={onAccent}>
          {`${money(goal.monthly)} a month · done by ${monthYearShort(new Date(goal.targetDate))}`}
        </Text>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', gap: tokens['space.sm'] },
  name: { flex: 1 },
});
