import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import type { Preview } from '@storybook/react-native';
import { withVunoFonts } from '../src/theme/withVunoFonts';
import { StoryStage } from '../src/docs/StoryStage';
import { tokens } from '../src/theme/tokens';

const preview: Preview = {
  decorators: [(Story) => (<StoryStage><Story /></StoryStage>), withVunoFonts, withBackgrounds],
  parameters: {
    backgrounds: {
      default: 'page',
      values: [
        { name: 'page', value: tokens['color.surface.page'] },
        { name: 'card', value: tokens['color.surface.card'] },
        { name: 'inverse', value: tokens['color.surface.inverse'] },
      ],
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
  },
};

export default preview;
