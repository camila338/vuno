import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { tokens } from '../theme';
import { Button } from './Button';
import { List, ListRow } from './List';
import { SlideToConfirm } from './SlideToConfirm';
import { Text } from './Text';

function Resettable({ label, disabled }: { label: string; disabled?: boolean }) {
  const [round, setRound] = useState(0);
  const [done, setDone] = useState(false);
  return (
    <View style={{ gap: tokens['space.sm'] }}>
      <SlideToConfirm key={round} label={label} disabled={disabled} onConfirm={() => setDone(true)} />
      {done ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text variant="caption" color={tokens['color.status.success.fg']}>
            Confirmed
          </Text>
          <Button
            kind="tertiary"
            label="Reset"
            onPress={() => {
              setDone(false);
              setRound((r) => r + 1);
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

const meta = {
  title: 'Components/SlideToConfirm',
  component: SlideToConfirm,
  args: { label: 'Slide to confirm', disabled: false, onConfirm: () => {} },
} satisfies Meta<typeof SlideToConfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview', render: (args) => <Resettable label={args.label} disabled={args.disabled} /> };
export const Disabled: Story = { name: 'Disabled', render: () => <Resettable label="Slide to confirm" disabled /> };
export const Review: Story = {
  name: 'Review and confirm',
  render: () => (
    <View style={{ gap: tokens['space.md'] }}>
      <List>
        <ListRow title="Amount" value="$50.00" />
        <ListRow title="To" detail="Recipient name" />
        <ListRow title="Arrives" detail="Instantly" />
      </List>
      <Resettable label="Slide to send" />
    </View>
  ),
};
