import { Tabs } from 'expo-router';
import { TabBar, type TabBarItem } from '../../components/TabBar';
import { tokens } from '../../theme';

const ITEMS: TabBarItem[] = [
  { key: 'index', label: 'Home', icon: 'home' },
  { key: 'cards', label: 'Cards', icon: 'card' },
  { key: 'save', label: 'Save', icon: 'wallet' },
];

// Main app: Home, Cards and Save, with Vuno's floating tab bar.
export default function TabsLayout() {
  return (
    <Tabs
      tabBar={({ state, navigation }) => <TabBar items={ITEMS} activeKey={state.routes[state.index].name} onChange={(name) => navigation.navigate(name)} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: tokens['color.surface.page'] }, animation: 'fade' }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="cards" />
      <Tabs.Screen name="save" />
    </Tabs>
  );
}
