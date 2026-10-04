import type { Preview } from '@storybook/react-native-web-vite';
import '../src/docs/blocks/docs.css';
import { withVunoFonts } from '../src/theme/withVunoFonts';
import { StoryStage } from '../src/docs/StoryStage';
import { tokens } from '../src/theme/tokens';
import { PlatformProvider, type OS } from '../src/theme/platform';
import { vunoTheme } from './vunoTheme';

const preview: Preview = {
  // The toolbar's platform switch renders every story with iOS (HIG) or Android (Material 3) conventions.
  decorators: [
    (Story, { globals }) => (
      <PlatformProvider os={(globals.platform as OS) ?? 'ios'}>
        <StoryStage>
          <Story />
        </StoryStage>
      </PlatformProvider>
    ),
    withVunoFonts,
  ],
  globalTypes: {
    platform: {
      description: 'Platform',
      toolbar: {
        title: 'Platform',
        icon: 'mobile',
        items: [
          { value: 'ios', title: 'iOS' },
          { value: 'android', title: 'Android' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Color', 'Typography', 'Spacing', 'Radius', 'Elevation', 'Motion', 'Icons', 'Accessibility', 'Platforms'],
          'Components',
          'Patterns',
          'Contributing',
          'Changelog',
        ],
      },
    },
    docs: {
      theme: vunoTheme,
      toc: { headingSelector: 'h2, h3', title: 'On this page', disable: false },
    },
    backgrounds: {
      options: {
        page: { name: 'page', value: tokens['color.surface.page'] },
        card: { name: 'card', value: tokens['color.surface.card'] },
        inverse: { name: 'inverse', value: tokens['color.surface.inverse'] },
      },
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
  },
  initialGlobals: { backgrounds: { value: 'page' }, platform: 'ios' },
};

export default preview;
