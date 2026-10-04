import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { Button } from '../../../components/Button';
import { applyKey, Keypad } from '../../../components/Keypad';
import { Text } from '../../../components/Text';
import { useDraft } from '../../../features/goals/DraftContext';
import { FlowScreen } from '../../../features/goals/FlowScreen';
import { money, moneySpoken } from '../../../features/goals/format';
import { defaultMonths, monthlyFor } from '../../../features/goals/plan';
import { tokens } from '../../../theme';

const MIN_TARGET = 10;

/** Step 2 · How much do you need? A custom keypad, prefilled with the category's typical target. */
export default function AmountStep() {
  const [draft, setDraft] = useDraft();
  // The amount starts prefilled with the category's typical target: the first key replaces it.
  const [fresh, setFresh] = useState(true);
  const nudge = useSharedValue(0);
  const amountStyle = useAnimatedStyle(() => ({ transform: [{ translateX: nudge.value }] }));

  const setTarget = (target: number) => setDraft((d) => ({ ...d, target }));

  const onKey = (key: Parameters<typeof applyKey>[1]) => {
    const base = fresh && key !== 'del' ? 0 : draft.target;
    const next = applyKey(base, key);
    if (next === base && key !== 'del') {
      // Digit limit reached: a small sideways nudge instead of an error.
      nudge.value = withSequence(withTiming(tokens['space.xs'], { duration: tokens['motion.duration.press'] }), withSpring(0, tokens['motion.spring.soft']));
    }
    setFresh(false);
    setTarget(next);
  };

  const next = () => {
    setDraft((d) => {
      const months = defaultMonths(d.target - d.initialDeposit);
      return { ...d, months, monthly: monthlyFor(d.target - d.initialDeposit, months) };
    });
    router.push('/goal/create/plan');
  };

  return (
    <FlowScreen
      step={2}
      title="How much do you need?"
      scroll={false}
      footer={<Button fullWidth label="Continue" disabled={draft.target < MIN_TARGET} onPress={next} />}
    >
      <View style={styles.display} accessible accessibilityLabel={`Goal: ${moneySpoken(draft.target)}`} accessibilityLiveRegion="polite">
        <Text variant="caption" color={tokens['color.text.tertiary']} numberOfLines={1}>
          {draft.name}
        </Text>
        <Animated.View style={amountStyle}>
          <Text variant="balance" tabular adjustsFontSizeToFit numberOfLines={1} color={draft.target ? tokens['color.text.primary'] : tokens['color.text.tertiary']}>
            {money(draft.target)}
          </Text>
        </Animated.View>
      </View>

      <Keypad onKey={onKey} />
    </FlowScreen>
  );
}

const styles = StyleSheet.create({
  display: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: tokens['space.2xs'], minHeight: tokens['space.3xl'] * 2 },
});
