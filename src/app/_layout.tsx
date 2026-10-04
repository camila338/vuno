import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DeviceFrame } from '../components/DeviceFrame';
import { AccountProvider } from '../features/account/AccountContext';
import { GoalsProvider } from '../features/goals/GoalsContext';
import { tokens, vunoFonts } from '../theme';

const STORYBOOK = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

export const unstable_settings = {
  initialRouteName: STORYBOOK ? 'storybook' : '(tabs)',
};

// Native iOS modals; on the web prototype they stay inside the phone frame as pushed screens.
const modal = Platform.OS === 'web' ? 'card' : 'modal';

export default function RootLayout() {
  const [loaded, error] = useFonts(vunoFonts);
  if (!loaded && !error) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AccountProvider>
        <GoalsProvider>
          <StatusBar style="dark" />
          <DeviceFrame>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: tokens['color.surface.page'] } }}>
              <Stack.Protected guard={STORYBOOK}>
                <Stack.Screen name="storybook" />
              </Stack.Protected>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="goal/create" options={{ presentation: modal }} />
              <Stack.Screen name="goal/[id]" />
              <Stack.Screen name="move/[type]" options={{ presentation: modal }} />
            </Stack>
          </DeviceFrame>
        </GoalsProvider>
      </AccountProvider>
    </GestureHandlerRootView>
  );
}
