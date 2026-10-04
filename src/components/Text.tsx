import { Text as RNText, StyleSheet, type TextProps } from 'react-native';
import { tokens } from '../theme';

type Role = 'balance' | 'headline' | 'title' | 'body' | 'label' | 'caption';

const MAX_SCALE: Partial<Record<Role, number>> = {
  // FOUNDATIONS §2.3: the balance scales up to 1.5×; body up to 200%.
  balance: 1.5,
  headline: 1.5,
  body: 2,
};

/** Text with a type role from FOUNDATIONS §2. */
export function Text({ variant = 'body', color = tokens['color.text.primary'], tabular, style, ...props }: TextProps & { variant?: Role; color?: string; tabular?: boolean }) {
  return (
    <RNText
      maxFontSizeMultiplier={MAX_SCALE[variant] ?? 1.75}
      {...props}
      style={[tokens[`font.role.${variant}`], { color }, styles.metrics, tabular && { fontVariant: ['tabular-nums'] }, style]}
    />
  );
}

const styles = StyleSheet.create({
  // Android adds extra top/bottom padding to custom fonts; without it the line height matches iOS.
  metrics: { includeFontPadding: false },
});
