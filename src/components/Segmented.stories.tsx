import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { tokens } from '../theme';
import { Segmented } from './Segmented';
import { Text } from './Text';

function Controlled({ labels }: { labels: string[] }) {
  const [value, setValue] = useState(labels[0]);
  return <Segmented value={value} onChange={setValue} options={labels.map((l) => ({ value: l, label: l }))} />;
}

const meta = {
  title: 'Components/Segmented',
  component: Segmented,
  args: { value: 'First', options: [{ value: 'First', label: 'First' }, { value: 'Second', label: 'Second' }], onChange: () => {} },
} satisfies Meta<typeof Segmented>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview', render: () => <Controlled labels={['First', 'Second']} /> };
export const ThreeOptions: Story = { name: 'Three options', render: () => <Controlled labels={['Day', 'Week', 'Month']} /> };

function SwitchView() {
  const [value, setValue] = useState('list');
  return (
    <View style={{ gap: tokens['space.md'] }}>
      <Segmented value={value} onChange={setValue} options={[{ value: 'list', label: 'List' }, { value: 'chart', label: 'Chart' }]} />
      <Text color={tokens['color.text.secondary']}>{value === 'list' ? 'List view content' : 'Chart view content'}</Text>
    </View>
  );
}
export const ViewSwitch: Story = { name: 'Switching views', render: () => <SwitchView /> };
