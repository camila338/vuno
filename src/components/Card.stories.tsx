import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { tokens, VerticalProvider, type Vertical } from '../theme';
import { Button } from './Button';
import { ProgressBar } from './Progress';
import { Card, IconBadge } from './Surface';
import { Text } from './Text';

const verticals: Vertical[] = ['banking', 'save', 'invest', 'credit'];

function Content({ fg }: { fg?: string }) {
  return (
    <>
      <Text variant="label" color={fg}>
        Title
      </Text>
      <Text color={fg ?? tokens['color.text.secondary']}>Card content goes here.</Text>
    </>
  );
}

const meta = {
  title: 'Components/Card',
  component: Card,
  args: { tone: 'neutral', padded: true, children: null },
  argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'accent'] } },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: 'Overview',
  render: (args) => (
    <Card tone={args.tone} padded={args.padded}>
      <Content fg={args.tone === 'accent' ? tokens['color.vertical.banking.on-accent'] : undefined} />
    </Card>
  ),
};

export const Tones: Story = {
  name: 'Tones',
  render: () => (
    <View style={{ gap: tokens['space.gap.list'] }}>
      <Card>
        <Content />
      </Card>
      <VerticalProvider vertical="save">
        <Card tone="accent">
          <Content fg={tokens['color.vertical.save.on-accent']} />
        </Card>
      </VerticalProvider>
    </View>
  ),
};

export const Verticals: Story = {
  name: 'Accent per vertical',
  render: () => (
    <View style={{ gap: tokens['space.gap.list'] }}>
      {verticals.map((v) => (
        <VerticalProvider key={v} vertical={v}>
          <Card tone="accent">
            <Text variant="label" color={tokens[`color.vertical.${v}.on-accent`]}>{`vertical="${v}"`}</Text>
          </Card>
        </VerticalProvider>
      ))}
    </View>
  ),
};

export const ProductSummary: Story = {
  name: 'Product summary',
  render: () => {
    const fg = tokens['color.vertical.save.on-accent'];
    return (
      <VerticalProvider vertical="save">
        <Card tone="accent">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens['space.sm'] }}>
            <IconBadge icon="wallet-outline" />
            <Text variant="label" color={fg}>
              Product name
            </Text>
          </View>
          <Text variant="headline" color={fg} tabular>
            $1,250.00
          </Text>
          <ProgressBar value={0.4} color={fg} track={tokens['color.surface.card']} />
          <Button kind="secondary" label="Action" onPress={() => {}} />
        </Card>
      </VerticalProvider>
    );
  },
};
