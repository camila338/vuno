import { useEffect, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedProps, useAnimatedStyle, useReducedMotion, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { tokens } from '../theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const standard = Easing.bezier(...tokens['motion.easing.standard']);

/** Progress ring. Fills with motion.easing.standard (FOUNDATIONS §9: the milestone progress). */
/** Ring diameter: 4 × space.3xl. */
export const RING_SIZE = tokens['space.3xl'] * 4;

export function ProgressRing({ value, size = RING_SIZE, stroke = tokens['progress.ring.stroke'], color, track, duration = tokens['motion.duration.nav'], delay = 0, children }: { value: number; size?: number; stroke?: number; color: string; track: string; duration?: number; delay?: number; children?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const progress = useSharedValue(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const target = Math.max(0, Math.min(1, value));
    const t = setTimeout(() => {
      progress.value = reduceMotion ? target : withTiming(target, { duration, easing: standard });
    }, delay);
    return () => clearTimeout(t);
  }, [value, duration, delay, reduceMotion, progress]);
  const animatedProps = useAnimatedProps(() => ({ strokeDashoffset: c * (1 - progress.value) }));
  return (
    <View style={{ width: size, height: size }} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(value * 100) }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${c} ${c}`}
          animatedProps={animatedProps}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={[StyleSheet.absoluteFill, styles.center]}>{children}</View>
    </View>
  );
}

/** Linear progress bar. */
export function ProgressBar({ value, color, track, slim }: { value: number; color: string; track: string; slim?: boolean }) {
  const height = slim ? tokens['progress.slim'] : tokens['progress.height'];
  const progress = useSharedValue(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const target = Math.max(0, Math.min(1, value));
    progress.value = reduceMotion ? target : withTiming(target, { duration: tokens['motion.duration.nav'], easing: standard });
  }, [value, reduceMotion, progress]);
  const fill = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));
  return (
    <View style={[styles.track, { backgroundColor: track, height, borderRadius: height }]} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(value * 100) }}>
      <Animated.View style={[{ backgroundColor: color, height, borderRadius: height }, fill]} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  track: { width: '100%', overflow: 'hidden' },
});
