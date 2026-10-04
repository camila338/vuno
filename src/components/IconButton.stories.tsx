import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Row } from '../docs/StoryStage';
import { tokens, useSystemIcon } from '../theme';
import { IconButton } from './Button';
import { Text } from './Text';

const noop = () => {};

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: { icon: 'add', label: 'Add', disabled: false, onPress: noop },
  argTypes: { icon: { control: 'select', options: ['add', 'close', 'chevron-back', 'arrow-back', 'ellipsis-horizontal', 'ellipsis-vertical'] } },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview' };

function SystemIcons() {
  return (
    <Row>
      <IconButton icon={useSystemIcon('back')} label="Back" onPress={noop} />
      <IconButton icon="close" label="Close" onPress={noop} />
      <IconButton icon={useSystemIcon('more')} label="More" onPress={noop} />
      <IconButton icon={useSystemIcon('share')} label="Share" onPress={noop} />
    </Row>
  );
}
// Back, more and share change with the platform: switch it in the toolbar.
export const Icons: Story = { name: 'System icons', render: () => <SystemIcons /> };

export const Disabled: Story = { name: 'Disabled', args: { disabled: true } };

export const CloseButton: Story = {
  name: 'Closing a modal',
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens['space.sm'] }}>
      <IconButton icon="close" label="Close" onPress={noop} />
      <Text variant="title">Modal title</Text>
    </View>
  ),
};
