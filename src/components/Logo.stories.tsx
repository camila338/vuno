import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Row } from '../docs/StoryStage';
import { tokens } from '../theme';
import { Logo } from './Logo';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  args: { size: tokens['space.2xl'], wordmark: true },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview' };

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <Row style={{ gap: tokens['space.lg'] }}>
      <Logo size={tokens['space.xl']} />
      <Logo size={tokens['space.2xl']} />
      <Logo size={tokens['space.3xl']} />
    </Row>
  ),
};

export const MarkOnly: Story = { name: 'Mark only', args: { wordmark: false } };

export const OnDark: Story = {
  name: 'On a dark surface',
  render: () => (
    <View style={{ backgroundColor: tokens['color.surface.inverse'], borderRadius: tokens['radius.card'], padding: tokens['space.inset.card'], alignSelf: 'flex-start' }}>
      <Logo color={tokens['color.text.on-inverse']} />
    </View>
  ),
};
