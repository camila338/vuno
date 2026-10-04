import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { Row } from '../docs/StoryStage';
import { List, ListRow } from './List';
import { Toggle } from './Toggle';

function Controlled({ initial, label, disabled }: { initial: boolean; label: string; disabled?: boolean }) {
  const [on, setOn] = useState(initial);
  return <Toggle value={on} onValueChange={setOn} label={label} disabled={disabled} />;
}

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  args: { value: true, label: 'Label', disabled: false, onValueChange: () => {} },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview', render: (args) => <Controlled initial={args.value} label={args.label} disabled={args.disabled} /> };

export const States: Story = {
  name: 'States',
  render: () => (
    <Row>
      <Controlled initial label="On" />
      <Controlled initial={false} label="Off" />
      <Controlled initial disabled label="Disabled on" />
      <Controlled initial={false} disabled label="Disabled off" />
    </Row>
  ),
};

export const Settings: Story = {
  name: 'Settings row',
  render: () => (
    <List>
      <ListRow icon="notifications-outline" title="Title" detail="What happens when it's on." trailing={<Controlled initial label="Title" />} />
      <ListRow icon="lock-closed-outline" title="Title" detail="What happens when it's on." trailing={<Controlled initial={false} label="Title" />} />
    </List>
  ),
};
