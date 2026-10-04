import type { Meta, StoryObj } from '@storybook/react-native';
import { tokens } from '../theme';
import { ProgressRing } from './Progress';
import { Text } from './Text';

const meta = {
  title: 'Components/ProgressRing',
  component: ProgressRing,
  args: { value: 0.4, color: tokens['color.vertical.save.on-accent'], track: tokens['color.vertical.save.accent'] },
  argTypes: { value: { control: { type: 'range', min: 0, max: 1, step: 0.01 } } },
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview' };

export const WithContent: Story = {
  name: 'With content',
  render: (args) => (
    <ProgressRing value={args.value} color={args.color} track={args.track}>
      <Text variant="headline" tabular>{`${Math.round(args.value * 100)}%`}</Text>
      <Text variant="caption" color={tokens['color.text.secondary']}>
        of target
      </Text>
    </ProgressRing>
  ),
};
