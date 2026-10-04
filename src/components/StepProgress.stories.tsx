import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { tokens } from '../theme';
import { IconButton } from './Button';
import { StepProgress } from './StepProgress';
import { TopBar } from './TopBar';

const meta = {
  title: 'Components/StepProgress',
  component: StepProgress,
  args: { step: 2, total: 4 },
  argTypes: { step: { control: { type: 'range', min: 1, max: 6, step: 1 } }, total: { control: { type: 'range', min: 2, max: 6, step: 1 } } },
  decorators: [(Story) => <View style={{ flexDirection: 'row' }}>{Story()}</View>],
} satisfies Meta<typeof StepProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview' };
export const Start: Story = { name: 'First step', args: { step: 1, total: 4 } };
export const Last: Story = { name: 'Last step', args: { step: 4, total: 4 } };
export const FlowHeader: Story = {
  name: 'Flow header',
  render: () => (
    <View style={{ flex: 1, marginHorizontal: -tokens['space.inset.screen'] }}>
      <TopBar leading={{ kind: 'back', onPress: () => {} }} trailing={<IconButton icon="close" label="Close" onPress={() => {}} />}>
        <StepProgress step={2} total={4} />
      </TopBar>
    </View>
  ),
};
