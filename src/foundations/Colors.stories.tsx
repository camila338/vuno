import type { Meta, StoryObj } from '@storybook/react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { tokens, type TokenName } from '../theme';

const FAMILIES = ['ink', 'purple', 'mint', 'sky', 'coral', 'lime', 'green', 'red', 'amber', 'azure'] as const;
const STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

function Swatch({ name }: { name: TokenName }) {
  const hex = tokens[name] as string;
  return (
    <View style={styles.swatch}>
      <View style={[styles.chip, { backgroundColor: hex }]} />
      <Text style={styles.caption}>{name.split('.').pop()}</Text>
      <Text style={styles.hex}>{hex}</Text>
    </View>
  );
}

function Primitives() {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {FAMILIES.map((family) => (
        <View key={family} style={styles.block}>
          <Text style={styles.title}>{`color.${family}`}</Text>
          <View style={styles.row}>
            {STEPS.map((step) => (
              <Swatch key={step} name={`color.${family}.${step}` as TokenName} />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function Semantic() {
  const names = (Object.keys(tokens) as TokenName[]).filter(
    (n) => n.startsWith('color.') && !/^color\.[a-z]+\.\d{3}$/.test(n),
  );
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {names.map((name) => (
        <View key={name} style={styles.semRow}>
          <View style={[styles.dot, { backgroundColor: tokens[name] as string }]} />
          <Text style={styles.label}>{name}</Text>
          <Text style={styles.hex}>{tokens[name] as string}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const meta = { title: 'Foundations/Color' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primitivos: Story = { render: () => <Primitives /> };
export const Semanticos: Story = { name: 'Semantic', render: () => <Semantic /> };

const styles = StyleSheet.create({
  screen: { padding: tokens['space.inset.screen'], gap: tokens['space.gap.stack'], backgroundColor: tokens['color.surface.page'] },
  block: { gap: tokens['space.xs'] },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens['space.2xs'] },
  swatch: { width: 64, gap: 2 },
  chip: { height: 40, borderRadius: tokens['radius.sm'], borderWidth: 1, borderColor: tokens['color.border.default'] },
  title: { ...tokens['font.role.label'], color: tokens['color.text.primary'] },
  label: { ...tokens['font.role.caption'], color: tokens['color.text.primary'], flex: 1 },
  caption: { ...tokens['font.role.caption'], color: tokens['color.text.secondary'] },
  hex: { ...tokens['font.role.caption'], color: tokens['color.text.tertiary'] },
  semRow: { flexDirection: 'row', alignItems: 'center', gap: tokens['space.sm'] },
  dot: { width: 24, height: 24, borderRadius: tokens['radius.sm'], borderWidth: 1, borderColor: tokens['color.border.default'] },
});
