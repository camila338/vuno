import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { IconName } from '../features/goals/model';
import { tokens } from '../theme';
import { Pressable } from './Pressable';
import { Text } from './Text';

export type TabBarItem = {
  key: string;
  label: string;
  /** Filled Ionicons name; the inactive state uses its `-outline` version. */
  icon: IconName;
};

type Props = {
  items: TabBarItem[];
  activeKey: string;
  onChange: (key: string) => void;
};

/**
 * Tab bar (FOUNDATIONS §10), 2–5 items: the pill on surface.card with elevation.floating; the active item
 * is a surface.inverse pill with the icon in the 10% lime, sliding with motion.spring.soft.
 * It sits in its own opaque strip (surface.page) below the screen, so content never scrolls under it.
 */
export function TabBar({ items, activeKey, onChange }: Props) {
  const insets = useSafeAreaInsets();
  const [width, setWidth] = useState(0);
  const index = Math.max(0, items.findIndex((item) => item.key === activeKey));
  const segment = width ? (width - tokens['tabbar.inset'] * 2) / items.length : 0;
  const x = useSharedValue(0);
  useEffect(() => {
    x.value = withSpring(index * segment, tokens['motion.spring.soft']);
  }, [index, segment, x]);
  const pill = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));

  return (
    <View style={[styles.strip, { paddingBottom: Math.max(insets.bottom, tokens['space.md']) }]}>
      <View style={styles.bar} onLayout={(e) => setWidth(e.nativeEvent.layout.width)} accessibilityRole="tablist">
        {segment ? <Animated.View style={[styles.pill, { width: segment }, pill]} /> : null}
        {items.map((item, i) => {
          const active = i === index;
          return (
            <Pressable
              key={item.key}
              haptic="selection"
              scale={0.94}
              onPress={() => !active && onChange(item.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={item.label}
              style={styles.item}
            >
              <Ionicons name={active ? item.icon : (`${item.icon}-outline` as IconName)} size={tokens['icon.size.md']} color={active ? tokens['tabbar.item.active.icon'] : tokens['tabbar.item.icon']} />
              <Text variant="caption" color={active ? tokens['tabbar.item.active.label'] : tokens['tabbar.item.icon']}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    backgroundColor: tokens['tabbar.strip'],
    paddingHorizontal: tokens['space.xl'],
    paddingTop: tokens['space.xs'],
  },
  bar: {
    flexDirection: 'row',
    padding: tokens['tabbar.inset'],
    borderRadius: tokens['tabbar.radius'],
    backgroundColor: tokens['tabbar.bg'],
    boxShadow: tokens['tabbar.elevation'],
  },
  pill: { position: 'absolute', top: tokens['tabbar.inset'], bottom: tokens['tabbar.inset'], left: tokens['tabbar.inset'], borderRadius: tokens['tabbar.radius'], backgroundColor: tokens['tabbar.item.active.bg'] },
  item: { flex: 1, minHeight: tokens['tabbar.item.height'] + tokens['space.xs'], alignItems: 'center', justifyContent: 'center' },
});
