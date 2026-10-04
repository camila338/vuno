import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { tokens } from '../theme';
import { Balance } from './Balance';
import { Chip } from './Chip';

const meta = {
  title: 'Components/Balance',
  component: Balance,
  args: { amount: 1250.5, label: 'Label' },
  argTypes: { amount: { control: { type: 'number', min: 0, step: 0.01 } } },
} satisfies Meta<typeof Balance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview' };

export const Amounts: Story = {
  name: 'Amounts',
  render: () => (
    <View style={{ gap: tokens['space.lg'] }}>
      <Balance amount={0} label="Zero" />
      <Balance amount={84.2} label="With cents" />
      <Balance amount={12500} label="Whole amount" />
    </View>
  ),
};

export const WithNotice: Story = {
  name: 'With a notice',
  render: () => (
    <View style={{ gap: tokens['space.xs'] }}>
      <Balance amount={1250.5} label="Available" />
      <Chip status="info" label="+$100.00 arrives tomorrow" />
    </View>
  ),
};
