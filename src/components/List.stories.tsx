import type { Meta, StoryObj } from '@storybook/react-native';
import { VerticalProvider } from '../theme';
import { Chip } from './Chip';
import { List, ListRow } from './List';

const noop = () => {};

const meta = {
  title: 'Components/List',
  component: ListRow,
  args: { title: 'Title', detail: 'Detail', icon: 'ellipse-outline', value: '' },
  argTypes: {
    icon: { control: 'select', options: [undefined, 'ellipse-outline', 'card-outline', 'person-outline'] },
    iconTone: { control: 'inline-radio', options: ['neutral', 'vertical'] },
    valueTone: { control: 'inline-radio', options: ['default', 'positive'] },
  },
} satisfies Meta<typeof ListRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  name: 'Overview',
  render: (args) => (
    <List>
      <ListRow {...args} value={args.value || undefined} />
      <ListRow {...args} value={args.value || undefined} />
      <ListRow {...args} value={args.value || undefined} />
    </List>
  ),
};

export const TextOnly: Story = {
  name: 'Text only',
  render: () => (
    <List>
      <ListRow title="Title" />
      <ListRow title="Title" detail="Detail" />
    </List>
  ),
};

export const WithValues: Story = {
  name: 'With an amount',
  render: () => (
    <List>
      <ListRow icon="arrow-up" title="Title" detail="Detail" value="−$24.00" />
      <ListRow icon="arrow-down" title="Title" detail="Detail" value="+$120.00" valueTone="positive" />
    </List>
  ),
};

export const Clickable: Story = {
  name: 'Tappable',
  render: () => (
    <List>
      <ListRow icon="person-outline" title="Title" detail="Detail" onPress={noop} />
      <ListRow icon="lock-closed-outline" title="Title" detail="Detail" onPress={noop} />
    </List>
  ),
};

export const WithTrailing: Story = {
  name: 'With a trailing element',
  render: () => (
    <VerticalProvider vertical="credit">
      <List>
        <ListRow icon="card-outline" iconTone="vertical" title="Title" detail="Detail" trailing={<Chip status="success" label="Active" />} />
      </List>
    </VerticalProvider>
  ),
};
