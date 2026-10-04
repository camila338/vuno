import { addons } from 'storybook/manager-api';
import { vunoTheme } from './vunoTheme';

addons.setConfig({
  theme: vunoTheme,
  sidebar: {
    showRoots: false,
  },
  panelPosition: 'bottom',
  enableShortcuts: true,
});
