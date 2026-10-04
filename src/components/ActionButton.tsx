import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import type { IconName } from '../features/goals/model';
import { tokens } from '../theme';
import { Pressable } from './Pressable';
import { Text } from './Text';

/** Quick action: a round icon button with a short label underneath (action.* tokens). Sized by its content; the row decides the spacing. */
export function ActionButton({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} scale={0.92} accessibilityRole="button" accessibilityLabel={label} style={styles.action}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={tokens['icon.size.md']} color={tokens['action.icon']} />
      </View>
      <Text variant="caption" color={tokens['action.label']}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  action: { alignItems: 'center', gap: tokens['space.xs'] },
  circle: {
    padding: tokens['action.inset'],
    borderRadius: tokens['radius.pill'],
    backgroundColor: tokens['action.bg'],
    borderWidth: tokens['action.border'].width,
    borderColor: tokens['action.border'].color,
  },
});
