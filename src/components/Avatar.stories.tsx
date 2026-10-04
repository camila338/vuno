import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { Row } from '../docs/StoryStage';
import { tokens } from '../theme';
import { List, ListRow } from './List';
import { Avatar } from './Surface';
import { Text } from './Text';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  args: { initials: 'AB', label: 'Full name' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview' };

export const WithText: Story = {
  name: 'With text',
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens['space.sm'] }}>
      <Avatar initials="AB" label="Full name" />
      <View>
        <Text variant="caption" color={tokens['color.text.secondary']}>
          Good morning,
        </Text>
        <Text variant="title">Name</Text>
      </View>
    </View>
  ),
};

export const Group: Story = {
  name: 'Several',
  render: () => (
    <Row>
      <Avatar initials="AB" label="Person A" />
      <Avatar initials="CD" label="Person B" />
      <Avatar initials="EF" label="Person C" />
    </Row>
  ),
};

export const InList: Story = {
  name: 'In a contact list',
  render: () => (
    <List>
      <ListRow title="Person A" detail="•••• 1234" trailing={<Avatar initials="AB" label="Person A" />} onPress={() => {}} />
      <ListRow title="Person B" detail="•••• 5678" trailing={<Avatar initials="CD" label="Person B" />} onPress={() => {}} />
    </List>
  ),
};
