import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { tokens } from '../theme';
import { Pressable } from './Pressable';
import { Text } from './Text';

type IconName = ComponentProps<typeof Ionicons>['name'];
type Status = 'success' | 'error' | 'warning' | 'info';

const STATUS_ICON: Record<Status, IconName> = {
  success: 'checkmark',
  error: 'close',
  warning: 'alert',
  info: 'information-circle-outline',
};

/** Status chip (chip.status.*): always icon + text. `highlight` is the 10% (chip.highlight.*). */
export function Chip({ label, status, icon }: { label: string; status: Status | 'highlight'; icon?: IconName }) {
  const bg = status === 'highlight' ? tokens['chip.highlight.bg'] : tokens[`chip.status.${status}.bg`];
  const fg = status === 'highlight' ? tokens['chip.highlight.fg'] : tokens[`chip.status.${status}.fg`];
  return (
    <View style={[styles.chip, { backgroundColor: bg }]} accessibilityRole="text">
      <Ionicons name={icon ?? (status === 'highlight' ? 'checkmark' : STATUS_ICON[status])} size={tokens['chip.icon']} color={fg} />
      <Text color={fg} style={tokens['chip.font']}>
        {label}
      </Text>
    </View>
  );
}

/** Selectable chip for suggestions and pickers (chip.choice.*). Selected = the inverse pill. */
export function ChoiceChip({ label, icon, selected, onPress }: { label: string; icon?: IconName; selected?: boolean; onPress: () => void }) {
  const fg = selected ? tokens['chip.choice.selected.fg'] : tokens['chip.choice.fg'];
  return (
    <Pressable
      onPress={onPress}
      contentColor={fg}
      haptic="selection"
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      style={[styles.choice, selected && styles.choiceSelected]}
    >
      {icon ? <Ionicons name={icon} size={tokens['icon.size.sm']} color={selected ? tokens['chip.choice.selected.icon'] : fg} /> : null}
      <Text color={fg} style={tokens['chip.choice.font']}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: tokens['space.2xs'],
    borderRadius: tokens['chip.radius'],
    paddingVertical: tokens['space.2xs'],
    paddingLeft: tokens['chip.inset'],
    paddingRight: tokens['space.sm'],
  },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens['space.xs'],
    minHeight: tokens['chip.choice.height'],
    paddingHorizontal: tokens['space.md'],
    borderRadius: tokens['chip.radius'],
    backgroundColor: tokens['chip.choice.bg'],
    borderWidth: tokens['chip.choice.border'].width,
    borderColor: tokens['chip.choice.border'].color,
  },
  choiceSelected: { backgroundColor: tokens['chip.choice.selected.bg'], borderColor: tokens['chip.choice.selected.bg'] },
});
