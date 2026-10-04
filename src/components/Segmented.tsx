import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { tokens } from '../theme';
import { Pressable } from './Pressable';
import { Text } from './Text';

/** Pill segmented control; the indicator moves with motion.spring.soft. */
export function Segmented<T extends string>({ options, value, onChange }: { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  const [width, setWidth] = useState(0);
  const index = options.findIndex((o) => o.value === value);
  const x = useSharedValue(0);
  const segment = width ? (width - tokens['segmented.inset'] * 2) / options.length : 0;
  useEffect(() => {
    x.value = withSpring(index * segment, tokens['motion.spring.soft']);
  }, [index, segment, x]);
  const indicator = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  return (
    <View style={styles.wrap} onLayout={(e) => setWidth(e.nativeEvent.layout.width)} accessibilityRole="tablist">
      {segment ? <Animated.View style={[styles.indicator, { width: segment }, indicator]} /> : null}
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <Pressable key={o.value} haptic="selection" scale={0.98} onPress={() => onChange(o.value)} accessibilityRole="tab" accessibilityState={{ selected }} style={styles.item}>
            <Text variant="label" color={selected ? tokens['segmented.active.label'] : tokens['segmented.label']}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    padding: tokens['segmented.inset'],
    borderRadius: tokens['radius.pill'],
    backgroundColor: tokens['segmented.bg'],
    borderWidth: tokens['segmented.border'].width,
    borderColor: tokens['segmented.border'].color,
  },
  indicator: { position: 'absolute', top: tokens['segmented.inset'], bottom: tokens['segmented.inset'], left: tokens['segmented.inset'], borderRadius: tokens['radius.pill'], backgroundColor: tokens['segmented.indicator'] },
  item: { flex: 1, minHeight: tokens['size.touch.min'], alignItems: 'center', justifyContent: 'center' },
});
