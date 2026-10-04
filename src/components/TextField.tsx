import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, type ReactNode } from 'react';
import { Platform, StyleSheet, TextInput, View, type TextInputProps, type TextStyle } from 'react-native';
import { tokens } from '../theme';
import { Text } from './Text';

/**
 * Text field (FOUNDATIONS §10, input.*): border.input (3:1), focus ring on focus,
 * error with border + icon + text (the color never goes alone). `large` is a step's hero field.
 */
export function TextField({ label, error, size = 'default', footer, ...props }: TextInputProps & { label: string; error?: string; size?: 'default' | 'large'; footer?: ReactNode }) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? tokens['input.error.border'] : focused ? tokens['input.border.focus'].color : tokens['input.border'].color;
  const borderWidth = focused ? tokens['input.border.focus'].width : tokens['input.border'].width;
  return (
    <View style={styles.wrap}>
      {size === 'default' ? <Text variant="label">{label}</Text> : null}
      <View style={[styles.box, size === 'large' && styles.large, { borderColor, borderWidth }]}>
        <TextInput
          {...props}
          accessibilityLabel={label}
          placeholderTextColor={tokens['input.placeholder']}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          maxFontSizeMultiplier={size === 'large' ? 1.5 : 2}
          style={[size === 'large' ? tokens['input.large.font'] : tokens['input.font'], styles.input, styles.webInput]}
        />
        {footer}
      </View>
      {error ? (
        <View style={styles.error}>
          <Ionicons name="close-circle" size={tokens['icon.size.sm']} color={tokens['color.status.error.fg']} />
          <Text variant="caption" color={tokens['color.status.error.fg']}>
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: tokens['space.2xs'] },
  box: { minHeight: tokens['input.height'], borderRadius: tokens['input.radius'], backgroundColor: tokens['input.bg'], paddingHorizontal: tokens['space.md'], justifyContent: 'center' },
  large: { borderRadius: tokens['card.radius'], padding: tokens['card.inset'], gap: tokens['space.md'] },
  input: { color: tokens['input.fg'], padding: 0, minHeight: tokens['input.height'] },
  // The focus ring is drawn by the box; the web preview must not add the browser's own outline.
  // React Native Web accepts outlineStyle 'none', which RN's TextStyle type doesn't list.
  webInput: (Platform.OS === 'web' ? { outlineStyle: 'none' } : {}) as TextStyle,
  error: { flexDirection: 'row', alignItems: 'center', gap: tokens['space.2xs'] },
});
