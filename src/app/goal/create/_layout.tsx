import { Stack } from 'expo-router';
import { DraftProvider } from '../../../features/goals/DraftContext';
import { tokens, VerticalProvider } from '../../../theme';

// "Create a saving goal" flow: its own stack inside the modal, in the Save context.
export default function NewGoalLayout() {
  return (
    <VerticalProvider vertical="save">
      <DraftProvider>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: tokens['color.surface.page'] } }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="amount" />
          <Stack.Screen name="plan" />
          <Stack.Screen name="automate" />
          {/* The final screen can't go back: the goal already exists. */}
          <Stack.Screen name="done" options={{ gestureEnabled: false, animation: 'fade' }} />
        </Stack>
      </DraftProvider>
    </VerticalProvider>
  );
}
