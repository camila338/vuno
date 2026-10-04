import { create } from 'storybook/theming';
import { version } from '../package.json';
import { tokens } from '../src/theme/tokens';

const ui = '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
const mono = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

// Storybook theme built from Vuno's tokens (FOUNDATIONS §1 and §2).
export const vunoTheme = create({
  base: 'light',

  brandTitle: `<span class="vds-brand"><img src="vuno-mark.svg" alt="" /><span><span class="vds-brand-name">Vuno</span><span class="vds-brand-sub">Design System</span></span><span class="vds-brand-version">v${version}</span></span>`,
  brandUrl: './',
  brandTarget: '_self',

  colorPrimary: tokens['color.brand.primary'],
  colorSecondary: tokens['color.brand.primary'],

  appBg: tokens['color.surface.card'],
  appContentBg: tokens['color.surface.card'],
  appPreviewBg: tokens['color.surface.page'],
  appBorderColor: tokens['color.border.default'],
  appBorderRadius: tokens['radius.input'],

  fontBase: ui,
  fontCode: mono,

  textColor: tokens['color.text.primary'],
  textInverseColor: tokens['color.text.on-inverse'],
  textMutedColor: tokens['color.text.tertiary'],

  barTextColor: tokens['color.text.tertiary'],
  barHoverColor: tokens['color.brand.primary'],
  barSelectedColor: tokens['color.brand.primary'],
  barBg: tokens['color.surface.card'],

  buttonBg: tokens['color.surface.card'],
  buttonBorder: tokens['color.border.default'],
  booleanBg: tokens['color.surface.page'],
  booleanSelectedBg: tokens['color.surface.card'],

  inputBg: tokens['color.surface.card'],
  inputBorder: tokens['color.border.input'],
  inputTextColor: tokens['color.text.primary'],
  inputBorderRadius: tokens['radius.sm'],
});
