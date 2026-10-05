import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import type { IconName } from './icons';
import { tokens } from '../theme';
import { IconBadge } from './Surface';
import { Text } from './Text';

/**
 * Section header: title (font.role.title), an optional one-line explanation and, for a product,
 * the vertical's accent badge so debit, credit and savings read as separate products.
 */
export function SectionHeader({ title, detail, icon, trailing }: { title: string; detail?: string; icon?: IconName; trailing?: ReactNode }) {
  return (
    <View style={styles.row}>
      {icon ? <IconBadge icon={icon} tone="vertical" /> : null}
      <View style={styles.text}>
        <Text variant="title" accessibilityRole="header">
          {title}
        </Text>
        {detail ? (
          <Text variant="caption" color={tokens['color.text.tertiary']}>
            {detail}
          </Text>
        ) : null}
      </View>
      {trailing}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: tokens['space.sm'] },
  text: { flex: 1 },
});
