import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { tokens, VerticalProvider, type Vertical } from '../theme';
import { ProgressBar } from './Progress';
import { Card } from './Surface';
import { Text } from './Text';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: { value: 0.4, slim: false, color: tokens['color.vertical.save.on-accent'], track: tokens['color.vertical.save.accent'] },
  argTypes: { value: { control: { type: 'range', min: 0, max: 1, step: 0.01 } } },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview' };

export const Sizes: Story = {
  name: 'Sizes',
  render: (args) => (
    <View style={{ gap: tokens['space.md'] }}>
      <ProgressBar value={args.value} color={args.color} track={args.track} />
      <ProgressBar value={args.value} color={args.color} track={args.track} slim />
    </View>
  ),
};

export const Verticals: Story = {
  name: 'Vertical colors',
  render: () => (
    <View style={{ gap: tokens['space.md'] }}>
      {(['save', 'invest', 'credit'] as Vertical[]).map((v) => (
        <ProgressBar key={v} value={0.6} color={tokens[`color.vertical.${v}.on-accent`]} track={tokens[`color.vertical.${v}.accent`]} />
      ))}
    </View>
  ),
};

export const WithLabel: Story = {
  name: 'With a figure',
  render: () => {
    const fg = tokens['color.vertical.save.on-accent'];
    return (
      <VerticalProvider vertical="save">
        <Card tone="accent">
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="label" color={fg}>
              Label
            </Text>
            <Text variant="label" color={fg} tabular>
              40%
            </Text>
          </View>
          <ProgressBar value={0.4} color={fg} track={tokens['color.surface.card']} />
        </Card>
      </VerticalProvider>
    );
  },
};
