import type { TokenName } from '../theme/tokens';

// Text/background pairs from FOUNDATIONS.md §11. Only the pairs are listed;
// ratios and the AA result are computed from the tokens (ContrastTable).

export type ContrastPair = { fg: TokenName; bg: TokenName; min: 4.5 | 3; use: string };

export const pairsInUse: ContrastPair[] = [
  { fg: 'color.text.primary', bg: 'color.surface.page', min: 4.5, use: 'Primary text' },
  { fg: 'color.text.primary', bg: 'color.surface.card', min: 4.5, use: 'Primary text' },
  { fg: 'color.text.secondary', bg: 'color.surface.page', min: 4.5, use: 'Supporting text' },
  { fg: 'color.text.secondary', bg: 'color.surface.card', min: 4.5, use: 'Supporting text' },
  { fg: 'color.text.tertiary', bg: 'color.surface.page', min: 4.5, use: 'Captions' },
  { fg: 'color.text.tertiary', bg: 'color.surface.card', min: 4.5, use: 'Captions, inactive tab icon' },
  { fg: 'color.text.on-inverse', bg: 'color.surface.inverse', min: 4.5, use: 'Text on the dark surface' },
  { fg: 'color.text.on-inverse-muted', bg: 'color.surface.inverse', min: 4.5, use: 'Secondary text on dark' },
  { fg: 'color.brand.on-primary', bg: 'color.brand.primary', min: 4.5, use: 'Primary button' },
  { fg: 'color.brand.on-primary', bg: 'color.brand.primary.pressed', min: 4.5, use: 'Pressed primary button' },
  { fg: 'color.border.focus', bg: 'color.surface.page', min: 3, use: 'Focus ring' },
  { fg: 'color.border.focus', bg: 'color.surface.card', min: 3, use: 'Focus ring' },
  { fg: 'color.border.input', bg: 'color.surface.card', min: 3, use: 'Field border' },
  { fg: 'color.status.error.border', bg: 'color.surface.card', min: 3, use: 'Field border with an error' },
  { fg: 'color.vertical.banking.on-accent', bg: 'color.vertical.banking.accent', min: 4.5, use: 'Banking card' },
  { fg: 'color.vertical.save.on-accent', bg: 'color.vertical.save.accent', min: 4.5, use: 'Save card' },
  { fg: 'color.vertical.invest.on-accent', bg: 'color.vertical.invest.accent', min: 4.5, use: 'Invest card' },
  { fg: 'color.vertical.credit.on-accent', bg: 'color.vertical.credit.accent', min: 4.5, use: 'Credit card' },
  { fg: 'color.status.success.fg', bg: 'color.status.success.bg', min: 4.5, use: 'Success chip' },
  { fg: 'color.status.error.fg', bg: 'color.status.error.bg', min: 4.5, use: 'Error chip' },
  { fg: 'color.status.warning.fg', bg: 'color.status.warning.bg', min: 4.5, use: 'Warning chip' },
  { fg: 'color.status.info.fg', bg: 'color.status.info.bg', min: 4.5, use: 'Info chip' },
  { fg: 'color.status.success.fg', bg: 'color.surface.page', min: 4.5, use: 'Success text' },
  { fg: 'color.status.success.fg', bg: 'color.surface.card', min: 4.5, use: 'Success text' },
  { fg: 'color.status.error.fg', bg: 'color.surface.page', min: 4.5, use: 'Error text' },
  { fg: 'color.status.error.fg', bg: 'color.surface.card', min: 4.5, use: 'Error text' },
  { fg: 'color.status.warning.fg', bg: 'color.surface.page', min: 4.5, use: 'Warning text' },
  { fg: 'color.status.warning.fg', bg: 'color.surface.card', min: 4.5, use: 'Warning text' },
  { fg: 'color.status.info.fg', bg: 'color.surface.page', min: 4.5, use: 'Info text' },
  { fg: 'color.status.info.fg', bg: 'color.surface.card', min: 4.5, use: 'Info text' },
  { fg: 'color.highlight.on-accent', bg: 'color.highlight.accent', min: 4.5, use: 'Milestone chip (10%)' },
  { fg: 'color.highlight.accent', bg: 'color.surface.inverse', min: 3, use: 'Active tab icon' },
  { fg: 'color.surface.inverse', bg: 'color.surface.card', min: 3, use: 'Active pill on the tab bar' },
];

// Prohibited combinations (§11.2). `exempt` marks the ones WCAG exempts (disabled).
export const pairsProhibited: (ContrastPair & { why: string; exempt?: boolean })[] = [
  { fg: 'color.ink.100', bg: 'color.purple.500', min: 4.5, use: 'Light text on Vuno Purple (brief)', why: 'That is why actions use purple.600; color.brand.logo never carries text.' },
  { fg: 'color.ink.900', bg: 'color.purple.500', min: 4.5, use: 'Dark text on Vuno Purple (brief)', why: 'It does not reach AA either.' },
  { fg: 'color.ink.500', bg: 'color.ink.100', min: 4.5, use: 'ink.500 as text', why: 'ink.500 is not a text token.' },
  { fg: 'color.lime.500', bg: 'color.ink.100', min: 3, use: 'Lime on a light background', why: 'Lime never carries information on a light background.' },
  { fg: 'color.ink.600', bg: 'color.mint.300', min: 4.5, use: 'Tertiary text on an accent', why: 'Only its on-accent goes on an accent.' },
  { fg: 'color.ink.300', bg: 'color.ink.100', min: 3, use: 'border.default as a control boundary', why: 'Fields and controls use border.input.' },
  { fg: 'color.ink.100', bg: 'color.purple.300', min: 4.5, use: 'Disabled primary button', why: 'Exempt: disabled element (WCAG 1.4.3).', exempt: true },
];
