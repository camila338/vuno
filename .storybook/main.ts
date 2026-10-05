import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-native-web-vite';

const shim = (file: string) => fileURLToPath(new URL(`../src/docs/shims/${file}`, import.meta.url));

// Web build to share. The MDX docs pages only exist here;
// the native Storybook (.rnstorybook) shows the stories in src/foundations and src/components.
// `title` is a Storybook preset that its config type doesn't list.
const main: StorybookConfig & { title: string } = {
  stories: ['../src/docs/**/*.mdx', '../src/components/**/*.mdx', '../src/components/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-native-web-vite',
    // Reanimated 4 needs its worklets transform outside Metro too.
    options: { pluginReactOptions: { babel: { plugins: ['react-native-worklets/plugin'] } } },
  },
  staticDirs: [
    './public',
    { from: '../node_modules/@expo-google-fonts/plus-jakarta-sans', to: '/fonts/plus-jakarta-sans' },
    { from: '../node_modules/@expo-google-fonts/bricolage-grotesque', to: '/fonts/bricolage-grotesque' },
  ],
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  features: {
    // No Storybook onboarding.
    sidebarOnboardingChecklist: false,
    menuOnboardingChecklist: false,
    // No canvas toolbars: StoryStage sets the background.
    backgrounds: false,
    measure: false,
    outline: false,
    // Search also finds docs page headings.
    experimentalSearchDocsHeadings: true,
  },
  docs: {
    defaultName: 'Docs',
  },
  // Browser tab and link previews: the system's name instead of "Storybook".
  title: 'Vuno Design System',
  // Native-only modules swapped for web equivalents so components render in the web Storybook.
  viteFinal: (config) => {
    const extra = [
      { find: /^@expo\/vector-icons\/Ionicons$/, replacement: shim('Ionicons.tsx') },
      { find: /^expo-haptics$/, replacement: shim('expo-haptics.ts') },
    ];
    const alias = config.resolve?.alias;
    const existing = Array.isArray(alias) ? alias : Object.entries(alias ?? {}).map(([find, replacement]) => ({ find, replacement: String(replacement) }));
    config.resolve = { ...config.resolve, alias: [...extra, ...existing] };
    return config;
  },
};

export default main;
