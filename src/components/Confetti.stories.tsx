import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { tokens } from '../theme';
import { Button } from './Button';
import { Chip } from './Chip';
import { Confetti } from './Confetti';
import { ProgressRing, RING_SIZE } from './Progress';
import { Text } from './Text';

const STAGE = RING_SIZE * 2;

function Replay({ milestone }: { milestone?: boolean }) {
  const [round, setRound] = useState(0);
  return (
    <View style={{ height: STAGE, alignItems: 'center', justifyContent: 'center', gap: tokens['space.md'], overflow: 'hidden' }}>
      {milestone ? (
        <>
          <ProgressRing key={`r${round}`} value={0.25} color={tokens['color.vertical.save.on-accent']} track={tokens['color.vertical.save.accent']}>
            <Text variant="headline" tabular>
              25%
            </Text>
          </ProgressRing>
          <Chip status="highlight" label="Milestone" />
        </>
      ) : null}
      <Button kind="secondary" label="Replay" onPress={() => setRound((r) => r + 1)} />
      <Confetti key={`c${round}`} x={tokens['space.3xl'] * 3.5} y={milestone ? RING_SIZE / 2 : STAGE / 2} delay={milestone ? tokens['motion.duration.nav'] : 0} />
    </View>
  );
}

const meta = { title: 'Components/Confetti', component: Confetti, args: { x: 0, y: 0 } } satisfies Meta<typeof Confetti>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = { name: 'Overview', render: () => <Replay /> };
export const Milestone: Story = { name: 'Milestone moment', render: () => <Replay milestone /> };
