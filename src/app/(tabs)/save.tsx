import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Balance } from '../../components/Balance';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { SectionHeader } from '../../components/SectionHeader';
import { Text } from '../../components/Text';
import { monthDay } from '../../features/goals/format';
import { GoalCard } from '../../features/goals/GoalCard';
import { useGoals } from '../../features/goals/GoalsContext';
import { nextPayday } from '../../features/goals/plan';
import { tokens, VerticalProvider } from '../../theme';

/** Vuno Save · Your goals. Entry point of the "Create a saving goal" flow. */
export default function SaveTab() {
  const insets = useSafeAreaInsets();
  const { goals, lastCreated } = useGoals();
  const total = goals.reduce((sum, g) => sum + g.saved, 0);

  return (
    <VerticalProvider vertical="save">
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Title with the screen's one primary action beside it. */}
          <View style={styles.titleRow}>
            <Text variant="headline" accessibilityRole="header">
              Save
            </Text>
            <Button label="Create goal" icon="add" onPress={() => router.push('/goal/create')} />
          </View>

          <View style={styles.balance}>
            <Balance amount={total} label="Total saved" />
            <Chip status="info" label={`Next automatic transfer: ${monthDay(nextPayday())}`} />
          </View>

          <SectionHeader title="Your goals" trailing={<Text variant="caption" color={tokens['color.text.tertiary']}>{`${goals.length} active`}</Text>} />

          <View style={styles.list}>
            {goals.map((goal) => (
              <Animated.View key={goal.id} entering={goal.id === lastCreated ? FadeInDown.springify().mass(1).stiffness(300).damping(22) : undefined} layout={LinearTransition}>
                <GoalCard goal={goal} />
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      </View>
    </VerticalProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: tokens['color.surface.page'] },
  content: { paddingHorizontal: tokens['space.inset.screen'], paddingBottom: tokens['space.lg'], gap: tokens['space.gap.stack'] },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens['space.md'], paddingTop: tokens['space.md'] },
  balance: { gap: tokens['space.xs'], marginBottom: tokens['space.md'] },
  list: { gap: tokens['space.gap.list'] },
});
