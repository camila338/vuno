import Ionicons from '@expo/vector-icons/Ionicons';
import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import type { IconName } from './icons';
import { tokens, useVerticalColors } from '../theme';
import { Text } from './Text';

/**
 * Card (FOUNDATIONS §10). `neutral`: card.* tokens, flat with a border.
 * `accent`: the vertical card — color.vertical.accent / on-accent resolved by the VerticalProvider.
 */
export function Card({ tone = 'neutral', children, style, padded = true }: { tone?: 'neutral' | 'accent'; children: ReactNode; style?: StyleProp<ViewStyle>; padded?: boolean }) {
  const { accent } = useVerticalColors();
  return (
    <View
      style={[
        styles.card,
        tone === 'neutral' ? styles.neutral : { backgroundColor: accent },
        padded ? styles.padded : styles.paddedX,
        style,
      ]}
    >
      {children}
    </View>
  );
}

/** Round icon badge: badge.* tokens. `vertical` takes the active vertical's accent pair. */
export function IconBadge({ icon, tone = 'neutral' }: { icon: IconName; tone?: 'neutral' | 'vertical' }) {
  const { accent, onAccent } = useVerticalColors();
  return (
    <View style={[styles.badge, { backgroundColor: tone === 'vertical' ? accent : tokens['badge.bg'] }]}>
      <Ionicons name={icon} size={tokens['badge.icon']} color={tone === 'vertical' ? onAccent : tokens['color.text.primary']} />
    </View>
  );
}

/** Avatar with initials: avatar.* tokens. */
export function Avatar({ initials, label }: { initials: string; label: string }) {
  return (
    <View style={styles.avatar} accessible accessibilityLabel={label}>
      <Text variant="label" color={tokens['avatar.fg']}>
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: tokens['card.radius'], gap: tokens['space.gap.stack'] },
  neutral: { backgroundColor: tokens['card.bg'], borderWidth: tokens['card.border'].width, borderColor: tokens['card.border'].color },
  padded: { padding: tokens['card.inset'] },
  paddedX: { paddingHorizontal: tokens['card.inset'], gap: 0 },
  badge: { padding: tokens['badge.inset'], borderRadius: tokens['radius.pill'], alignSelf: 'flex-start' },
  avatar: { width: tokens['avatar.size'], height: tokens['avatar.size'], borderRadius: tokens['radius.pill'], backgroundColor: tokens['avatar.bg'], alignItems: 'center', justifyContent: 'center' },
});
