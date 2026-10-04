import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { money } from '../features/goals/format';
import { tokens } from '../theme';
import { Button } from './Button';
import { applyKey, Keypad } from './Keypad';
import { Text } from './Text';

function AmountEntry({ withAction }: { withAction?: boolean }) {
  const [amount, setAmount] = useState(0);
  return (
    <View style={{ gap: tokens['space.md'] }}>
      <Text variant="balance" tabular style={{ textAlign: 'center' }} color={amount ? tokens['color.text.primary'] : tokens['color.text.tertiary']}>
        {money(amount)}
      </Text>
      <Keypad onKey={(k) => setAmount((a) => applyKey(a, k))} />
      {withAction ? <Button fullWidth label="Continue" disabled={!amount} onPress={() => {}} /> : null}
    </View>
  );
}

const meta = { title: 'Components/Keypad', component: Keypad, args: { onKey: () => {} } } satisfies Meta<typeof Keypad>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview' };
export const WithAmount: Story = { name: 'With an amount', render: () => <AmountEntry /> };
export const AmountScreen: Story = { name: 'Amount screen', render: () => <AmountEntry withAction /> };
