import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { TabBar, type TabBarItem } from './TabBar';

const three: TabBarItem[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'activity', label: 'Activity', icon: 'list' },
  { key: 'profile', label: 'Profile', icon: 'person' },
];

const five: TabBarItem[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'cards', label: 'Cards', icon: 'card' },
  { key: 'pay', label: 'Pay', icon: 'swap-horizontal' },
  { key: 'save', label: 'Save', icon: 'wallet' },
  { key: 'profile', label: 'Profile', icon: 'person' },
];

function Controlled({ items }: { items: TabBarItem[] }) {
  const [active, setActive] = useState(items[0].key);
  return <TabBar items={items} activeKey={active} onChange={setActive} />;
}

const meta = {
  title: 'Components/TabBar',
  component: TabBar,
  args: { items: three, activeKey: 'home', onChange: () => {} },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview', render: () => <Controlled items={three} /> };
export const FiveItems: Story = { name: 'Five sections', render: () => <Controlled items={five} /> };
