import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { tokens } from '../theme';
import { Text } from './Text';

/**
 * Vuno logo from the brand brief: the app mark (a rounded square in color.brand.logo
 * with a "V" stroke and the lime dot) and, optionally, the wordmark.
 * The mark is drawn on a 48-unit grid and scales with `size`. color.brand.logo never carries text.
 */
export function Logo({ size = tokens['space.2xl'], wordmark = true, color = tokens['color.text.primary'] }: { size?: number; wordmark?: boolean; color?: string }) {
  return (
    <View style={styles.row} accessible accessibilityRole="image" accessibilityLabel="Vuno">
      <Svg width={size} height={size} viewBox="0 0 48 48">
        <Rect width={48} height={48} rx={12} fill={tokens['color.brand.logo']} />
        <Path d="M15 16 L23.5 32 L31 19" stroke={tokens['color.brand.on-primary']} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Circle cx={33.5} cy={13.5} r={3.5} fill={tokens['color.highlight.accent']} />
      </Svg>
      {wordmark ? (
        // The wordmark keeps the display family and scales with the mark.
        <Text color={color} style={[tokens['font.role.headline'], { fontSize: size * 0.8, lineHeight: size }]}>
          Vuno
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: tokens['space.xs'] },
});
