import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { Row } from '../docs/StoryStage';
import { tokens } from '../theme';
import { Button } from './Button';
import { Text } from './Text';

const noop = () => {};

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { label: 'Button', kind: 'primary', disabled: false, loading: false, fullWidth: false, iconPosition: 'left', onPress: noop },
  argTypes: {
    kind: { control: 'inline-radio', options: ['primary', 'secondary', 'tertiary'] },
    iconPosition: { control: 'inline-radio', options: ['left', 'right'] },
    icon: { control: 'select', options: [undefined, 'add', 'arrow-forward', 'checkmark'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview' };

export const Kinds: Story = {
  name: 'Kinds',
  render: () => (
    <Row>
      <Button label="Primary" onPress={noop} />
      <Button kind="secondary" label="Secondary" onPress={noop} />
      <Button kind="tertiary" label="Tertiary" onPress={noop} />
    </Row>
  ),
};

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <Row>
      <Button label="Primary" disabled onPress={noop} />
      <Button kind="secondary" label="Secondary" disabled onPress={noop} />
      <Button kind="tertiary" label="Tertiary" disabled onPress={noop} />
    </Row>
  ),
};

export const Icons: Story = {
  name: 'Icons',
  render: () => (
    <Row>
      <Button label="Left icon" icon="add" onPress={noop} />
      <Button kind="secondary" label="Right icon" icon="arrow-forward" iconPosition="right" onPress={noop} />
    </Row>
  ),
};

function LoadingDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      label="Tap to load"
      loading={loading}
      onPress={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1600);
      }}
    />
  );
}
export const Loading: Story = { name: 'Loading', render: () => <LoadingDemo /> };

export const FullWidth: Story = { name: 'Full width', render: () => <Button fullWidth label="Continue" onPress={noop} /> };

export const Adjacent: Story = {
  name: 'Adjacent buttons',
  render: () => (
    <Row style={{ justifyContent: 'flex-end' }}>
      <Button kind="tertiary" label="Cancel" onPress={noop} />
      <Button label="Confirm" onPress={noop} />
    </Row>
  ),
};

export const ScreenAction: Story = {
  name: 'Main screen action',
  render: () => (
    <View style={{ gap: tokens['space.xl'] }}>
      <View style={{ gap: tokens['space.2xs'] }}>
        <Text variant="headline">Title</Text>
        <Text color={tokens['color.text.secondary']}>Supporting text that explains the step.</Text>
      </View>
      <View style={{ gap: tokens['space.xs'] }}>
        <Button fullWidth label="Continue" onPress={noop} />
        <Button fullWidth kind="tertiary" label="Not now" onPress={noop} />
      </View>
    </View>
  ),
};
