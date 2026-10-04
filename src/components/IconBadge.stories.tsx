import type { Meta, StoryObj } from '@storybook/react-native';
import { Row } from '../docs/StoryStage';
import { VerticalProvider, type Vertical } from '../theme';
import { IconBadge } from './Surface';

const meta = {
  title: 'Components/IconBadge',
  component: IconBadge,
  args: { icon: 'card-outline', tone: 'neutral' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['neutral', 'vertical'] },
    icon: { control: 'select', options: ['card-outline', 'wallet-outline', 'trending-up-outline', 'cafe-outline'] },
  },
} satisfies Meta<typeof IconBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview' };

export const Tones: Story = {
  name: 'Tones',
  render: () => (
    <Row>
      <IconBadge icon="card-outline" />
      <IconBadge icon="card-outline" tone="vertical" />
    </Row>
  ),
};

export const Verticals: Story = {
  name: 'Per vertical',
  render: () => (
    <Row>
      {(['banking', 'save', 'invest', 'credit'] as Vertical[]).map((v) => (
        <VerticalProvider key={v} vertical={v}>
          <IconBadge icon="card-outline" tone="vertical" />
        </VerticalProvider>
      ))}
    </Row>
  ),
};
