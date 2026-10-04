import type { Meta, StoryObj } from '@storybook/react-native';
import { Row } from '../docs/StoryStage';
import { Chip } from './Chip';
import { List, ListRow } from './List';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  args: { label: 'Label', status: 'info' },
  argTypes: {
    status: { control: 'inline-radio', options: ['success', 'error', 'warning', 'info', 'highlight'] },
    icon: { control: 'select', options: [undefined, 'time-outline', 'snow-outline', 'repeat-outline'] },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview' };

export const Statuses: Story = {
  name: 'States',
  render: () => (
    <Row>
      <Chip status="success" label="Success" />
      <Chip status="error" label="Error" />
      <Chip status="warning" label="Warning" />
      <Chip status="info" label="Info" />
    </Row>
  ),
};

export const Highlight: Story = { name: 'Highlight (10%)', args: { status: 'highlight', label: 'Milestone' } };

export const CustomIcon: Story = {
  name: 'Custom icon',
  render: () => (
    <Row>
      <Chip status="info" icon="time-outline" label="Pending" />
      <Chip status="info" icon="repeat-outline" label="Recurring" />
    </Row>
  ),
};

export const InListRow: Story = {
  name: 'Status in a row',
  render: () => (
    <List>
      <ListRow icon="card-outline" title="Title" detail="Detail" trailing={<Chip status="success" label="Active" />} />
      <ListRow icon="card-outline" title="Title" detail="Detail" trailing={<Chip status="warning" label="Expiring" />} />
    </List>
  ),
};
