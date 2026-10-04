import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { tokens } from '../theme';
import { Text } from './Text';

const PAD = tokens['slide-confirm.inset'];
const THUMB = tokens['slide-confirm.thumb.size'];
const HEIGHT = THUMB + PAD * 2;
const THRESHOLD = 0.85;

/**
 * Slide-to-confirm: the primary action for committing money (FOUNDATIONS §10, button.primary).
 * The thumb follows the finger; past 85% it locks, haptics fire and `onConfirm` runs.
 * Released early, it returns with motion.spring.soft.
 * VoiceOver: exposed as a button whose activation confirms (a swipe is not accessible).
 */
export function SlideToConfirm({ label, onConfirm, disabled }: { label: string; onConfirm: () => void; disabled?: boolean }) {
  const [width, setWidth] = useState(0);
  const [done, setDone] = useState(false);
  const x = useSharedValue(0);
  const max = Math.max(1, width - THUMB - PAD * 2);

  const confirm = () => {
    if (done) return;
    setDone(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onConfirm();
  };
  const tick = () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

  const pan = Gesture.Pan()
    .enabled(!done && !disabled)
    .onBegin(() => runOnJS(tick)())
    .onUpdate((e) => {
      x.value = Math.min(max, Math.max(0, e.translationX));
    })
    .onEnd(() => {
      if (x.value >= max * THRESHOLD) {
        x.value = withTiming(max, { duration: tokens['motion.duration.press'] });
        runOnJS(confirm)();
      } else {
        x.value = withSpring(0, tokens['motion.spring.soft']);
      }
    });

  const thumb = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  const fill = useAnimatedStyle(() => ({ width: x.value + THUMB + PAD }));
  const text = useAnimatedStyle(() => ({ opacity: interpolate(x.value, [0, max * 0.6], [1, 0], 'clamp') }));

  return (
    <View
      style={[styles.track, disabled && { backgroundColor: tokens['color.brand.primary.disabled'], opacity: tokens['opacity.disabled'] }]}
      onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
      accessible
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint="Double-tap to confirm"
      accessibilityState={{ disabled: done || disabled }}
      accessibilityActions={[{ name: 'activate' }]}
      onAccessibilityAction={(e) => !disabled && e.nativeEvent.actionName === 'activate' && confirm()}
    >
      <Animated.View style={[styles.fill, fill]} />
      <Animated.View style={[styles.labelWrap, text]} pointerEvents="none">
        <Text color={tokens['slide-confirm.fg']} style={tokens['slide-confirm.font']}>
          {label}
        </Text>
        <Ionicons name="chevron-forward" size={tokens['icon.size.sm']} color={tokens['slide-confirm.fg']} style={styles.chev1} />
        <Ionicons name="chevron-forward" size={tokens['icon.size.sm']} color={tokens['slide-confirm.fg']} style={styles.chev2} />
      </Animated.View>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.thumb, thumb]} hitSlop={8}>
          <Ionicons name={done ? 'checkmark' : 'arrow-forward'} size={tokens['icon.size.md']} color={tokens['slide-confirm.thumb.icon']} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: HEIGHT,
    borderRadius: tokens['radius.pill'],
    backgroundColor: tokens['slide-confirm.bg'],
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fill: { position: 'absolute', left: 0, top: 0, bottom: 0, borderRadius: tokens['radius.pill'], backgroundColor: tokens['slide-confirm.fill'] },
  labelWrap: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: THUMB / 2 },
  chev1: { marginLeft: tokens['space.xs'], opacity: 0.5 },
  chev2: { marginLeft: -tokens['space.xs'], opacity: 0.85 },
  thumb: {
    position: 'absolute',
    left: PAD,
    width: THUMB,
    height: THUMB,
    borderRadius: tokens['radius.pill'],
    backgroundColor: tokens['slide-confirm.thumb.bg'],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
