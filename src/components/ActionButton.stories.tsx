import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Row } from '../docs/StoryStage';
import { tokens } from '../theme';
import { ActionButton } from './ActionButton';

const noop = () => {};

const meta = {
  title: 'Components/ActionButton',
  component: ActionButton,
  args: { icon: 'add', label: 'Label', onPress: noop },
  argTypes: { icon: { control: 'select', options: ['add', 'arrow-up', 'arrow-down', 'swap-horizontal', 'qr-code-outline'] } },
  // Sized by its content: shown in a row, as it's always used.
  decorators: [(Story) => <Row>{Story()}</Row>],
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview' };

export const Labels: Story = {
  name: 'Labels',
  render: () => (
    <Row style={{ gap: tokens['space.lg'], alignItems: 'flex-start' }}>
      <ActionButton icon="arrow-up" label="Send" onPress={noop} />
      <ActionButton icon="swap-horizontal" label="Move money" onPress={noop} />
    </Row>
  ),
};

export const QuickActions: Story = {
  name: 'Quick actions row',
  render: () => (
    <View style={{ flexDirection: 'row', width: '100%' }}>
      {(
        [
          ['arrow-up', 'Send'],
          ['arrow-down', 'Request'],
          ['qr-code-outline', 'Scan'],
        ] as const
      ).map(([icon, label]) => (
        <View key={label} style={{ flex: 1, alignItems: 'center' }}>
          <ActionButton icon={icon} label={label} onPress={noop} />
        </View>
      ))}
    </View>
  ),
};
