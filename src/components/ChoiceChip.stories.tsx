import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { Row } from '../docs/StoryStage';
import { ChoiceChip } from './Chip';

const noop = () => {};

const meta = {
  title: 'Components/ChoiceChip',
  component: ChoiceChip,
  args: { label: 'Option', selected: false, onPress: noop },
  argTypes: { icon: { control: 'select', options: [undefined, 'star-outline', 'calendar-outline'] } },
} satisfies Meta<typeof ChoiceChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview' };

export const States: Story = {
  name: 'States',
  render: () => (
    <Row>
      <ChoiceChip label="Default" onPress={noop} />
      <ChoiceChip label="Selected" selected onPress={noop} />
    </Row>
  ),
};

export const WithIcon: Story = {
  name: 'With icon',
  render: () => (
    <Row>
      <ChoiceChip label="Option" icon="star-outline" onPress={noop} />
      <ChoiceChip label="Option" icon="star" selected onPress={noop} />
    </Row>
  ),
};

function SingleChoice() {
  const [value, setValue] = useState('Monthly');
  return (
    <Row>
      {['Weekly', 'Every 2 weeks', 'Monthly'].map((o) => (
        <ChoiceChip key={o} label={o} selected={value === o} onPress={() => setValue(o)} />
      ))}
    </Row>
  );
}
export const Group: Story = { name: 'Single choice', render: () => <SingleChoice /> };
