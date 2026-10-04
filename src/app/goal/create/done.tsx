import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, useAnimatedStyle, useReducedMotion, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../../components/Button';
import { Chip } from '../../../components/Chip';
import { Confetti } from '../../../components/Confetti';
import { List, ListRow } from '../../../components/List';
import { ProgressRing, RING_SIZE } from '../../../components/Progress';
import { Text } from '../../../components/Text';
import { categories } from '../../../features/goals/categories';
import { useGoals } from '../../../features/goals/GoalsContext';
import { money, monthDay, monthYear } from '../../../features/goals/format';
import { nextPayday } from '../../../features/goals/plan';
import { tokens, useVerticalColors } from '../../../theme';

const FILL = tokens['motion.duration.nav'];


/**
 * Goal created: the 10% moment (FOUNDATIONS §9).
 * The ring fills with easing.standard, the lime chip enters with spring.bounce,
 * confetti bursts and a success haptic plays. With Reduce Motion, only fades.
 */
export default function DoneStep() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { goals } = useGoals();
  const goal = goals.find((g) => g.id === id);
  const { accent, onAccent } = useVerticalColors();
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();
  const [width, setWidth] = useState(0);

  const chip = useSharedValue(0);
  const dot = useSharedValue(0);
  useEffect(() => {
    if (reduceMotion) {
      chip.value = withDelay(FILL, withTiming(1, { duration: tokens['motion.duration.state'] }));
      dot.value = withDelay(FILL, withTiming(1, { duration: tokens['motion.duration.state'] }));
    } else {
      chip.value = withDelay(FILL, withSpring(1, tokens['motion.spring.bounce']));
      dot.value = withDelay(FILL + 80, withSpring(1, tokens['motion.spring.bounce']));
    }
    const t = setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success), FILL);
    return () => clearTimeout(t);
  }, [chip, dot, reduceMotion]);

  const chipStyle = useAnimatedStyle(() => (reduceMotion ? { opacity: chip.value } : { opacity: Math.min(1, chip.value * 2), transform: [{ scale: 0.6 + 0.4 * chip.value }] }));
  const dotStyle = useAnimatedStyle(() => (reduceMotion ? { opacity: dot.value } : { transform: [{ scale: dot.value }] }));

  if (!goal) return null;
  const pct = goal.saved / goal.target;
  const activeRules = [goal.rules.payday && 'payday', goal.rules.roundUps && 'round-ups', goal.rules.windfall && 'extra income'].filter(Boolean).join(' · ');

  return (
    <View style={[styles.root, { paddingTop: insets.top + tokens['space.lg'] }]} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.ringWrap}>
          <ProgressRing value={Math.max(pct, 0.02)} color={onAccent} track={accent} duration={FILL}>
            <Ionicons name={categories[goal.category].icon} size={tokens['icon.size.lg']} color={tokens['color.text.primary']} />
            <Text variant="headline" tabular style={styles.ringAmount}>
              {money(goal.saved)}
            </Text>
            <Text variant="caption" color={tokens['color.text.secondary']}>
              {`of ${money(goal.target)}`}
            </Text>
          </ProgressRing>
          {/* Lime dot: the logo's dot, only in this moment */}
          <Animated.View style={[styles.dot, dotStyle]} importantForAccessibility="no" accessibilityElementsHidden />
        </View>

        <Animated.View style={[styles.chip, chipStyle]}>
          <Chip status="highlight" label="Goal created!" />
        </Animated.View>

        <Animated.View entering={FadeIn.delay(FILL).duration(tokens['motion.duration.state'])} style={styles.copy}>
          <Text variant="headline" style={styles.center} accessibilityRole="header">
            {goal.name}
          </Text>
          <Text variant="body" color={tokens['color.text.secondary']} style={styles.center}>
            {goal.rules.payday
              ? `Your first automatic transfer is on ${monthDay(nextPayday())}. We’ll cheer you on at 25, 50 and 75%.`
              : 'We’ll cheer you on at 25, 50 and 75%.'}
          </Text>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(FILL + 120).duration(tokens['motion.duration.state'])} style={styles.summary}>
          <List>
            <ListRow title="Goal" value={money(goal.target)} />
            <ListRow title="Saving" value={`${money(goal.monthly)} a month`} />
            <ListRow title="Done by" value={monthYear(new Date(goal.targetDate))} />
            <ListRow title="Autopilot" value={activeRules || 'Off'} />
          </List>
        </Animated.View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, tokens['space.md']) }]}>
        <Button fullWidth label="See my goals" onPress={() => router.dismissTo('/save')} />
      </View>

      {/* Confetti bursts from the ring as the chip lands. */}
      {width ? <Confetti x={width / 2} y={insets.top + tokens['space.lg'] + tokens['space.md'] + RING_SIZE / 2} delay={FILL} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: tokens['color.surface.page'] },
  content: { alignItems: 'center', paddingHorizontal: tokens['space.inset.screen'], paddingBottom: tokens['space.xl'], gap: tokens['space.md'] },
  ringWrap: { marginTop: tokens['space.md'] },
  ringAmount: { marginTop: tokens['space.2xs'] },
  dot: { position: 'absolute', top: -tokens['space.xs'], right: -tokens['space.xs'], width: tokens['space.2xl'], height: tokens['space.2xl'], borderRadius: tokens['radius.pill'], backgroundColor: tokens['color.highlight.accent'] },
  chip: { marginTop: tokens['space.xs'] },
  copy: { gap: tokens['space.xs'], alignItems: 'center' },
  center: { textAlign: 'center' },
  summary: { alignSelf: 'stretch', marginTop: tokens['space.xs'] },
  footer: { paddingHorizontal: tokens['space.inset.screen'], paddingTop: tokens['space.sm'] },
});
