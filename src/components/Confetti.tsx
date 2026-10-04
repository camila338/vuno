import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withDelay, withTiming, type SharedValue } from 'react-native-reanimated';
import { tokens } from '../theme';

const DURATION = tokens['confetti.duration'];
const GRAVITY = tokens['confetti.gravity'];

// Brand geometry only (FOUNDATIONS §9: circle and pill), in the 10% lime plus the vertical accents.
const COLORS = [
  tokens['color.highlight.accent'],
  tokens['color.highlight.accent'],
  tokens['color.brand.primary'],
  tokens['color.vertical.save.accent'],
  tokens['color.vertical.invest.accent'],
  tokens['color.vertical.credit.accent'],
];

type Piece = { vx: number; vy: number; spin: number; w: number; h: number; color: string; delay: number };

function makePieces(count: number): Piece[] {
  // Deterministic pseudo-random so every celebration looks the same (and tests are stable).
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: count }, (_, i) => {
    const angle = -Math.PI / 2 + (rand() - 0.5) * Math.PI * 0.9; // mostly upward fan
    const speed = 520 + rand() * 520;
    const pill = i % 3 !== 0;
    const size = 8 + rand() * 6;
    return {
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      spin: (rand() - 0.5) * 900,
      w: pill ? size * 0.55 : size,
      h: pill ? size * 1.6 : size,
      color: COLORS[i % COLORS.length],
      delay: rand() * 120,
    };
  });
}

function ConfettiPiece({ piece, t }: { piece: Piece; t: SharedValue<number> }) {
  const style = useAnimatedStyle(() => {
    const s = Math.max(0, t.value * (DURATION / 1000) - piece.delay / 1000);
    const x = piece.vx * s;
    const y = piece.vy * s + 0.5 * GRAVITY * s * s;
    return {
      opacity: t.value === 0 ? 0 : 1 - Math.max(0, (t.value - 0.7) / 0.3),
      transform: [{ translateX: x }, { translateY: y }, { rotate: `${piece.spin * s}deg` }],
    };
  });
  return <Animated.View style={[styles.piece, { width: piece.w, height: piece.h, borderRadius: tokens['radius.pill'], backgroundColor: piece.color }, style]} />;
}

/** One-shot confetti burst from the top-left point (x, y) of its container. Skipped with Reduce Motion. */
export function Confetti({ x, y, delay = 0, count = tokens['confetti.count'] }: { x: number; y: number; delay?: number; count?: number }) {
  const reduceMotion = useReducedMotion();
  const pieces = useMemo(() => makePieces(count), [count]);
  const t = useSharedValue(0);
  useEffect(() => {
    if (!reduceMotion) t.value = withDelay(delay, withTiming(1, { duration: DURATION, easing: Easing.linear }));
  }, [delay, reduceMotion, t]);
  if (reduceMotion) return null;
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.layer]} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
      <View style={{ position: 'absolute', left: x, top: y }}>
        {pieces.map((p, i) => (
          <ConfettiPiece key={i} piece={p} t={t} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layer: { zIndex: 10 },
  piece: { position: 'absolute' },
});
