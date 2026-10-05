import Ionicons from '@expo/vector-icons/Ionicons';
import { Children, isValidElement, cloneElement, type ReactElement, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import type { IconName } from './icons';
import { tokens } from '../theme';
import { Pressable } from './Pressable';
import { Card } from './Surface';
import { IconBadge } from './Surface';
import { Text } from './Text';

type RowProps = {
  title: string;
  detail?: string;
  icon?: IconName;
  /** `vertical` paints the badge with the active vertical's accent. */
  iconTone?: 'neutral' | 'vertical';
  /** Right side: a value, a chip, a switch… */
  trailing?: ReactNode;
  value?: string;
  valueTone?: 'default' | 'positive';
  onPress?: () => void;
  accessibilityLabel?: string;
  /** Set by List: draws the divider under every row but the last. */
  divider?: boolean;
};

/** One row of a list (list.row.* tokens): badge, title and detail, and a trailing value or control. */
export function ListRow({ title, detail, icon, iconTone, trailing, value, valueTone = 'default', onPress, accessibilityLabel, divider }: RowProps) {
  const body = (
    <>
      {icon ? <IconBadge icon={icon} tone={iconTone} /> : null}
      <View style={styles.text}>
        <Text variant="label" color={tokens['list.row.title']} numberOfLines={1}>
          {title}
        </Text>
        {detail ? (
          <Text variant="caption" color={tokens['list.row.detail']}>
            {detail}
          </Text>
        ) : null}
      </View>
      {value ? (
        <Text variant="label" tabular color={valueTone === 'positive' ? tokens['list.row.positive'] : tokens['list.row.title']} style={styles.value}>
          {value}
        </Text>
      ) : null}
      {trailing}
      {onPress ? <Ionicons name="chevron-forward" size={tokens['icon.size.sm']} color={tokens['color.text.tertiary']} /> : null}
    </>
  );
  const style = [styles.row, divider && styles.divider];
  return onPress ? (
    <Pressable onPress={onPress} scale={0.98} accessibilityRole="button" accessibilityLabel={accessibilityLabel ?? title} style={style}>
      {body}
    </Pressable>
  ) : (
    <View style={style} accessible={!!accessibilityLabel} accessibilityLabel={accessibilityLabel}>
      {body}
    </View>
  );
}

/** A neutral card holding ListRows separated by list.divider. */
export function List({ children }: { children: ReactNode }) {
  const rows = Children.toArray(children).filter(isValidElement) as ReactElement<RowProps>[];
  return <Card padded={false}>{rows.map((row, i) => cloneElement(row, { divider: i < rows.length - 1 }))}</Card>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: tokens['space.sm'], minHeight: tokens['list.row.height'], paddingVertical: tokens['list.row.inset'] },
  divider: { borderBottomWidth: tokens['list.divider'].width, borderBottomColor: tokens['list.divider'].color },
  text: { flex: 1, gap: 0 },
  value: { textAlign: 'right', flexShrink: 1 },
});
