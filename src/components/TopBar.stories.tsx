import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { tokens, useSystemIcon } from '../theme';
import { IconButton } from './Button';
import { StepProgress } from './StepProgress';
import { TopBar } from './TopBar';

const noop = () => {};

function MoreButton() {
  return <IconButton icon={useSystemIcon('more')} label="More" onPress={noop} />;
}

const meta = {
  title: 'Components/TopBar',
  component: TopBar,
  args: { title: 'Title', leading: { kind: 'back', onPress: noop } },
  // Full-bleed like a real screen: the bar brings its own screen insets.
  decorators: [(Story) => <View style={{ marginHorizontal: -tokens['space.inset.screen'] }}>{Story()}</View>],
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview' };
export const Close: Story = { name: 'Close (modal)', args: { leading: { kind: 'close', onPress: noop } } };
export const WithActions: Story = { name: 'With actions', render: (args) => <TopBar {...args} trailing={<MoreButton />} /> };
export const WithoutLeading: Story = { name: 'Without navigation', args: { leading: undefined } };
export const FlowHeader: Story = {
  name: 'Flow header',
  render: () => (
    <TopBar leading={{ kind: 'back', onPress: noop }} trailing={<IconButton icon="close" label="Close" onPress={noop} />}>
      <StepProgress step={2} total={4} />
    </TopBar>
  ),
};
