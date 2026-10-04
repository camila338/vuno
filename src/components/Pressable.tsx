import * as Haptics from 'expo-haptics';
import { useState, type ReactNode } from 'react';
import { Platform, Pressable as RNPressable, StyleSheet, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { stateLayer, tokens, useOS } from '../theme';

const AnimatedPressable = Animated.createAnimatedComponent(RNPressable);

type Props = Omit<PressableProps, 'style' | 'children'> & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** iOS press scale (FOUNDATIONS §6). */
  scale?: number;
  haptic?: 'light' | 'selection' | 'none';
  /** Content color on top of this surface: Android's pressed state layer is this color at 10%. */
  contentColor?: string;
};

/**
 * Pressable with each platform's feedback:
 * - iOS (HIG): scales to `scale` during motion.duration.press and springs back with motion.spring.soft.
 * - Android (Material 3): ripple with a pressed state layer of the content color at 10%; no scale.
 * Optional light haptic on both.
 */
export function Pressable({ children, style, scale = 0.96, haptic = 'light', contentColor = tokens['color.text.primary'], onPressIn, onPressOut, onPress, disabled, ...props }: Props) {
  const os = useOS();
  const android = os === 'android';
  const pressed = useSharedValue(1);
  const [down, setDown] = useState(false);
  const reduceMotion = useReducedMotion();
  const animated = useAnimatedStyle(() => ({ transform: [{ scale: pressed.value }] }));
  const layer = stateLayer(contentColor);
  // The web preview can't draw Android's native ripple: it shows the state layer while pressed.
  const simulateRipple = android && Platform.OS !== 'android';
  const radius = StyleSheet.flatten(style)?.borderRadius;

  return (
    <AnimatedPressable
      {...props}
      disabled={disabled}
      android_ripple={android ? { color: layer, foreground: true } : undefined}
      onPressIn={(e) => {
        if (android) setDown(true);
        else if (!reduceMotion) pressed.value = withTiming(scale, { duration: tokens['motion.duration.press'] });
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        if (android) setDown(false);
        else pressed.value = reduceMotion ? 1 : withSpring(1, tokens['motion.spring.soft']);
        onPressOut?.(e);
      }}
      onPress={(e) => {
        if (haptic === 'light') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (haptic === 'selection') Haptics.selectionAsync();
        onPress?.(e);
      }}
      style={[style, !android && animated, android && styles.clip]}
    >
      {children}
      {simulateRipple && down ? <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: layer, borderRadius: radius }]} /> : null}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  // Keeps the ripple inside rounded shapes.
  clip: { overflow: 'hidden' },
});
