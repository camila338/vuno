import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { tokens } from '../theme';

const THUMB = tokens['slider.thumb.size'];

/**
 * Slider of whole steps with a haptic on every step.
 * Accessible: adjustable with VoiceOver and TalkBack (increment / decrement).
 */
export function StepSlider({ min, max, value, onChange, label, valueText, color = tokens['slider.fill'], track = tokens['slider.track'] }: { min: number; max: number; value: number; onChange: (v: number) => void; label: string; valueText: string; color?: string; track?: string }) {
  const [width, setWidth] = useState(0);
  const x = useSharedValue(0);
  const start = useSharedValue(0);
  const last = useSharedValue(value);
  const usable = Math.max(1, width - THUMB);
  const toX = (v: number) => ((v - min) / (max - min)) * usable;

  useEffect(() => {
    if (width) x.value = withSpring(toX(value), tokens['motion.spring.soft']);
    last.value = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, width]);

  const emit = (v: number) => {
    Haptics.selectionAsync();
    onChange(v);
  };

  const pan = Gesture.Pan()
    .minDistance(0)
    .onBegin((e) => {
      start.value = Math.min(usable, Math.max(0, e.x - THUMB / 2));
      x.value = start.value;
    })
    .onUpdate((e) => {
      const nx = Math.min(usable, Math.max(0, start.value + e.translationX));
      x.value = nx;
      const v = Math.round(min + (nx / usable) * (max - min));
      if (v !== last.value) {
        last.value = v;
        runOnJS(emit)(v);
      }
    })
    .onFinalize(() => {
      x.value = withSpring(((last.value - min) / (max - min)) * usable, tokens['motion.spring.soft']);
    });

  const thumb = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  const fill = useAnimatedStyle(() => ({ width: x.value + THUMB / 2 }));

  return (
    <GestureDetector gesture={pan}>
      <View
        onLayout={(e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width)}
        style={styles.hit}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel={label}
        accessibilityValue={{ text: valueText }}
        accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
        onAccessibilityAction={(e) => {
          if (e.nativeEvent.actionName === 'increment') onChange(Math.min(max, value + 1));
          if (e.nativeEvent.actionName === 'decrement') onChange(Math.max(min, value - 1));
        }}
      >
        <View style={[styles.track, { backgroundColor: track }]}>
          <Animated.View style={[styles.fill, { backgroundColor: color }, fill]} />
        </View>
        <Animated.View style={[styles.thumb, thumb]} />
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  hit: { height: tokens['size.touch.min'], justifyContent: 'center' },
  track: { height: tokens['slider.height'], borderRadius: tokens['radius.sm'], overflow: 'hidden', marginHorizontal: THUMB / 2 - tokens['space.2xs'] },
  fill: { height: tokens['slider.height'], borderRadius: tokens['radius.sm'] },
  thumb: {
    position: 'absolute',
    left: 0,
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB,
    backgroundColor: tokens['slider.thumb.bg'],
    borderWidth: tokens['slider.thumb.border'].width,
    borderColor: tokens['slider.thumb.border'].color,
    boxShadow: tokens['slider.thumb.elevation'],
  },
});
