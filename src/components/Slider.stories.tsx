import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { tokens } from '../theme';
import { StepSlider } from './Slider';
import { Text } from './Text';

function Labelled({ min, max, initial, unit, color, track }: { min: number; max: number; initial: number; unit: string; color?: string; track?: string }) {
  const [value, setValue] = useState(initial);
  const text = `${value} ${unit}`;
  return (
    <View style={{ gap: tokens['space.2xs'] }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text variant="label">Label</Text>
        <Text variant="label" color={tokens['color.text.secondary']} tabular>
          {text}
        </Text>
      </View>
      <StepSlider min={min} max={max} value={value} onChange={setValue} label="Label" valueText={text} color={color} track={track} />
    </View>
  );
}

const meta = {
  title: 'Components/Slider',
  component: StepSlider,
  args: { min: 1, max: 12, value: 6, label: 'Label', valueText: '6', onChange: () => {} },
} satisfies Meta<typeof StepSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview', render: (args) => <Labelled min={args.min} max={args.max} initial={args.value} unit="steps" /> };
export const Range: Story = { name: 'Wide range', render: () => <Labelled min={1} max={60} initial={24} unit="months" /> };
export const VerticalColors: Story = {
  name: 'Vertical colors',
  render: () => <Labelled min={1} max={12} initial={4} unit="steps" color={tokens['color.vertical.save.on-accent']} track={tokens['color.vertical.save.accent']} />,
};
