import type { Meta, StoryObj } from '@storybook/react-native';
import { useState, type ComponentProps } from 'react';
import { View } from 'react-native';
import { tokens } from '../theme';
import { Button } from './Button';
import { TextField } from './TextField';

function Field({ initial = '', ...props }: Omit<ComponentProps<typeof TextField>, 'value' | 'onChangeText'> & { initial?: string }) {
  const [value, setValue] = useState(initial);
  return <TextField {...props} value={value} onChangeText={setValue} />;
}

const meta = {
  title: 'Components/TextField',
  component: TextField,
  args: { label: 'Label', placeholder: 'Placeholder', size: 'default', error: '' },
  argTypes: { size: { control: 'inline-radio', options: ['default', 'large'] } },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview', render: (args) => <Field label={args.label} placeholder={args.placeholder} size={args.size} error={args.error || undefined} /> };

export const States: Story = {
  name: 'States',
  render: () => (
    <View style={{ gap: tokens['space.lg'] }}>
      <Field label="Empty" placeholder="Placeholder" />
      <Field label="Filled" initial="Value" />
      <Field label="Error" initial="Value" error="Explain how to fix it" />
    </View>
  ),
};

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <View style={{ gap: tokens['space.lg'] }}>
      <Field label="Default" placeholder="Placeholder" />
      <Field label="Large" size="large" placeholder="Large placeholder" />
    </View>
  ),
};

export const Form: Story = {
  name: 'Form',
  render: () => (
    <View style={{ gap: tokens['space.lg'] }}>
      <Field label="Full name" placeholder="As it appears on your ID" />
      <Field label="Email" placeholder="name@example.com" keyboardType="email-address" autoCapitalize="none" />
      <Button fullWidth label="Continue" onPress={() => {}} />
    </View>
  ),
};
