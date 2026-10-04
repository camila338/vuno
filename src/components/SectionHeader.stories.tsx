import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { tokens, VerticalProvider } from '../theme';
import { Button } from './Button';
import { Card } from './Surface';
import { Chip } from './Chip';
import { SectionHeader } from './SectionHeader';
import { Text } from './Text';

const meta = {
  title: 'Components/SectionHeader',
  component: SectionHeader,
  args: { title: 'Section title', detail: '' },
  argTypes: { icon: { control: 'select', options: [undefined, 'card-outline', 'wallet-outline', 'trending-up-outline'] } },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview', render: (args) => <SectionHeader {...args} detail={args.detail || undefined} /> };

export const WithDetail: Story = { name: 'With detail', args: { detail: 'One line that explains the section' } };

export const WithIcon: Story = {
  name: 'With a vertical icon',
  render: () => (
    <VerticalProvider vertical="invest">
      <SectionHeader icon="trending-up-outline" title="Section title" detail="Detail" />
    </VerticalProvider>
  ),
};

export const WithTrailing: Story = {
  name: 'With a trailing element',
  render: () => (
    <View style={{ gap: tokens['space.gap.section'] }}>
      <SectionHeader title="Section title" trailing={<Chip status="success" label="Active" />} />
      <SectionHeader title="Section title" trailing={<Button kind="tertiary" label="See all" onPress={() => {}} />} />
    </View>
  ),
};

export const ProductSection: Story = {
  name: 'Product section',
  render: () => (
    <VerticalProvider vertical="credit">
      <View style={{ gap: tokens['space.sm'] }}>
        <SectionHeader icon="card-outline" title="Product" detail="What this product is, in plain words" />
        <Card>
          <Text color={tokens['color.text.secondary']}>Section content</Text>
        </Card>
      </View>
    </VerticalProvider>
  ),
};
