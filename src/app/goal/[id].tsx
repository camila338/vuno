import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Chip } from '../../components/Chip';
import { List, ListRow } from '../../components/List';
import { ProgressRing } from '../../components/Progress';
import { SectionHeader } from '../../components/SectionHeader';
import { Text } from '../../components/Text';
import { TopBar } from '../../components/TopBar';
import { categories } from '../../features/goals/categories';
import { money, monthYear } from '../../features/goals/format';
import { useGoals } from '../../features/goals/GoalsContext';
import { tokens, useVerticalColors, VerticalProvider } from '../../theme';

const MILESTONES = [0.25, 0.5, 0.75, 1];

/** Goal detail: progress, plan and milestones. */
export default function GoalDetail() {
  return (
    <VerticalProvider vertical="save">
      <Detail />
    </VerticalProvider>
  );
}

function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { goals } = useGoals();
  const { accent, onAccent } = useVerticalColors();
  const insets = useSafeAreaInsets();
  const goal = goals.find((g) => g.id === id);
  if (!goal) return null;
  const pct = goal.saved / goal.target;
  const rules = [goal.rules.payday && 'Payday transfer', goal.rules.roundUps && 'Round-ups', goal.rules.windfall && '10% of extra income'].filter(Boolean) as string[];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <TopBar leading={{ kind: 'back', onPress: () => router.back() }} />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + tokens['space.xl'] }]}>
        <View style={styles.hero}>
          <ProgressRing value={pct} color={onAccent} track={accent}>
            <Text variant="headline" tabular>
              {`${Math.round(pct * 100)}%`}
            </Text>
          </ProgressRing>
          <View style={styles.titleRow}>
            <Ionicons name={categories[goal.category].icon} size={tokens['icon.size.md']} color={tokens['color.text.primary']} />
            <Text variant="headline" accessibilityRole="header">
              {goal.name}
            </Text>
          </View>
          <Text variant="body" color={tokens['color.text.secondary']} tabular>
            {`${money(goal.saved)} of ${money(goal.target)} · ${money(goal.target - goal.saved)} to go`}
          </Text>
        </View>

        <SectionHeader title="Plan" />
        <List>
          <ListRow icon="repeat-outline" title="Saving" value={`${money(goal.monthly)} a month`} />
          <ListRow icon="flag-outline" title="Done by" value={monthYear(new Date(goal.targetDate))} />
          <ListRow icon="flash-outline" title="Autopilot" detail={rules.length ? rules.join(' · ') : 'Off'} />
        </List>

        <SectionHeader title="Milestones" />
        <List>
          {MILESTONES.map((m) => (
            <ListRow
              key={m}
              title={m === 1 ? 'Goal reached' : `${m * 100}%`}
              detail={money(goal.target * m)}
              trailing={pct >= m ? <Chip status="success" label="Reached" /> : <Chip status="info" label="Upcoming" icon="time-outline" />}
            />
          ))}
        </List>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: tokens['color.surface.page'] },
  content: { paddingHorizontal: tokens['space.inset.screen'], gap: tokens['space.gap.stack'] },
  hero: { alignItems: 'center', gap: tokens['space.xs'], marginBottom: tokens['space.md'] },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: tokens['space.xs'], marginTop: tokens['space.md'] },
});
