import type { Meta, StoryObj } from '@storybook/react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { tokens } from '../theme';

const ROLES = [
  ['balance', '$12,480.50'],
  ['headline', 'Your money, clear'],
  ['title', 'Recent activity'],
  ['body', "Your payment arrived. Here's your balance now."],
  ['label', 'Send money'],
  ['caption', 'Hoy, 9:41 · Tarjeta •••• 4821'],
] as const;

function Scale() {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {ROLES.map(([role, sample]) => {
        const style = tokens[`font.role.${role}`];
        return (
          <View key={role} style={styles.item}>
            <Text style={styles.meta}>{`font.role.${role} · ${style.fontFamily} · ${style.fontSize}/${style.lineHeight}`}</Text>
            <Text style={[style, { color: tokens['color.text.primary'] }]}>{sample}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const meta = { title: 'Foundations/Typography' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Escala: Story = { render: () => <Scale /> };

const styles = StyleSheet.create({
  screen: { padding: tokens['space.inset.screen'], gap: tokens['space.gap.section'], backgroundColor: tokens['color.surface.page'] },
  item: { gap: tokens['space.2xs'] },
  meta: { ...tokens['font.role.caption'], color: tokens['color.text.tertiary'] },
});
