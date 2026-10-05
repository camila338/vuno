import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { tokens } from '../theme';
import type { IconName } from './icons';
import { Pressable } from './Pressable';
import { Text } from './Text';

export type ButtonProps = {
  /** Visible text; also the VoiceOver label. Verb first, 1–3 words. */
  label: string;
  onPress: () => void;
  /** primary: the one main action of the screen. secondary: alternatives. tertiary: the lowest-weight action. */
  kind?: 'primary' | 'secondary' | 'tertiary';
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  /** Stretches to the container width: only for a screen's main call to action. */
  fullWidth?: boolean;
  disabled?: boolean;
  /** Replaces the label with a spinner while the action runs; the button keeps its width. */
  loading?: boolean;
  accessibilityHint?: string;
};

const FG = { primary: tokens['button.primary.fg'], secondary: tokens['button.secondary.fg'], tertiary: tokens['button.tertiary.fg'] };

/** Pill button (FOUNDATIONS §10, button.*). Sized by its content unless `fullWidth`. */
export function Button({ label, onPress, kind = 'primary', icon, iconPosition = 'left', fullWidth, disabled, loading, accessibilityHint }: ButtonProps) {
  const fg = FG[kind];
  const bg = kind === 'primary' ? (disabled ? tokens['color.brand.primary.disabled'] : tokens['button.primary.bg']) : kind === 'secondary' ? tokens['button.secondary.bg'] : 'transparent';
  const iconEl = icon ? <Ionicons name={icon} size={tokens['icon.size.md']} color={fg} /> : null;
  return (
    <Pressable
      onPress={onPress}
      contentColor={fg}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled, busy: loading }}
      style={[styles.base, { backgroundColor: bg, opacity: disabled ? tokens['opacity.disabled'] : 1 }, kind === 'secondary' && styles.secondary, kind === 'tertiary' && styles.tertiary, fullWidth ? styles.full : styles.hug]}
    >
      <View style={[styles.row, loading && styles.hidden]}>
        {iconPosition === 'left' ? iconEl : null}
        <Text color={fg} style={tokens['button.primary.font']}>
          {label}
        </Text>
        {iconPosition === 'right' ? iconEl : null}
      </View>
      {loading ? <ActivityIndicator color={fg} style={StyleSheet.absoluteFill} /> : null}
    </Pressable>
  );
}

/** Icon-only round button for back, close and more (button.circle.*). `label` is required: it's what VoiceOver reads. */
export function IconButton({ icon, label, onPress, disabled }: { icon: IconName; label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      scale={0.92}
      style={[styles.circle, disabled && { opacity: tokens['opacity.disabled'] }]}
    >
      <Ionicons name={icon} size={tokens['icon.size.md']} color={tokens['button.circle.icon']} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: tokens['button.primary.height'],
    borderRadius: tokens['button.primary.radius'],
    paddingHorizontal: tokens['space.xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  hug: { alignSelf: 'flex-start' },
  full: { alignSelf: 'stretch' },
  secondary: { borderWidth: tokens['button.secondary.border'].width, borderColor: tokens['button.secondary.border'].color },
  tertiary: { paddingHorizontal: tokens['space.md'] },
  row: { flexDirection: 'row', alignItems: 'center', gap: tokens['space.xs'] },
  hidden: { opacity: 0 },
  circle: {
    width: tokens['button.circle.size'],
    height: tokens['button.circle.size'],
    borderRadius: tokens['radius.pill'],
    backgroundColor: tokens['button.circle.bg'],
    borderWidth: tokens['button.circle.border'].width,
    borderColor: tokens['button.circle.border'].color,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
