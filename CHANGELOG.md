# Changelog

Every change to the Vuno Design System. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow [SemVer](https://semver.org/).

## Unreleased

### Added

- The web Storybook is published at [vuno-storybook.vercel.app](https://vuno-storybook.vercel.app); `npm run deploy-storybook` builds and publishes it.
- The browser tab and link previews show “Vuno Design System”.
- Each component page in Figma links to its Storybook page from the header (“View in Storybook ↗”).
- `vuno-ds`, a Claude Code plugin (`plugins/vuno-ds`) to design and build with the system: a skill with the rules and the components catalog, `/vuno-ds:screen`, `/vuno-ds:component` and `/vuno-ds:audit` commands, a `ds-reviewer` agent and the Figma MCP connection.
- `/vuno-ds:setup` installs the system in any Expo project: it copies `src/components`, `src/theme` and the decision documents into `src/vuno/`, installs the dependencies and sets up the app root.

### Changed

- `src/components` and `src/theme` no longer import from the app: `IconName` (`components/icons.ts`) and `money` / `moneySpoken` (`components/format.ts`) are part of the system, and `FontGate` is exported from `theme`.

## 0.2.0 — 2026-10-03

The prototype app now runs entirely on the system: foundations, component tokens, components and patterns, documented in Storybook for iOS and Android.

### Added

- Layer 3 of tokens in `tokens/component.json`: 114 component tokens that only reference semantic tokens (`button`, `action`, `chip`, `input`, `card`, `list`, `badge`, `avatar`, `balance`, `keypad`, `slider`, `segmented`, `slide-confirm`, `progress`, `switch`, `tabbar`, `confetti`).
- `input.border.focus` (→ `border.focus.ring`), already described in FOUNDATIONS §10, now as a token.
- `button.tertiary.fg` (→ `color.text.primary`) for the tertiary button.
- Effect durations: primitive `motion.duration.1800`, semantic `motion.duration.effect` (decorative effects that never block the UI, outside the 100–400 ms transition scale) and component tokens `confetti.duration`, `confetti.gravity` and `confetti.count`.
- 24 generic components in `src/components` (exported from `src/components/index.ts`): Button, IconButton, ActionButton, SlideToConfirm, Chip, ChoiceChip, TextField, Toggle, Segmented, Slider, Keypad, Card, List, SectionHeader, Balance, IconBadge, Avatar, ProgressBar, ProgressRing, StepProgress, TopBar, TabBar, Logo and Confetti.
- Button kinds (primary, secondary, tertiary), icon on either side, `loading` and `fullWidth`. By default it sizes to its content.
- `Logo`: the brand-brief mark (`color.brand.logo` square, “V” and lime dot) and wordmark, now in the Home header.
- iOS and Android support (FOUNDATIONS §14, Foundations › Platforms): `useOS()`, `PlatformProvider` and `useSystemIcon()`; `TopBar` with a centered title on iOS and a start-aligned one on Android; `Pressable` scales on iOS and shows a Material ripple with a 10% state layer on Android; `Toggle` is UISwitch on iOS and the Material 3 switch on Android; `includeFontPadding: false` on Android.
- A platform switch in the Storybook toolbar and a “Platforms” section on the pages of components that differ.
- One page per component, structured like monday.com's Vibe: overview, import, props, usage, accessibility, variants, platforms, do's and don'ts, use cases and related components. Generic examples, always at phone width.
- Do's and Don'ts with Vibe's anatomy (the example on a soft stage, a Do / Don't badge and a one-line rule) and more pairs for the basic components.
- Components catalog with linked cards, and a Patterns page built with real components.
- Docs blocks: `Live`, `PlatformPair` and an `auto` preview in `TokenTable`.
- Figma library ([Vuno Design System](https://www.figma.com/design/m05PZu0ab0numdST2ebXf2)): 304 variables in 4 collections (Primitives, Semantic, Vertical with one mode per vertical, Component) with scopes and React Native code syntax; 6 text styles and 2 effect styles; 58 single-layer icons; the 24 components with variants and properties, fully bound to variables; foundation pages and a Patterns page with a Home screen built only from instances.
- Figma documentation: one page per component, matching Storybook (overview, numbered anatomy, import, properties mapped to code props, usage, accessibility, labeled variants, platforms, do's and don'ts, use cases, code, tokens, related components and the main component). Button gains a Loading state, ProgressBar a Value=100 variant, and each Chip status its own default icon.
- Figma Screens page: the 15 prototype screens on iOS and Android, built only from component instances, variables and text styles, with device chrome (`System / Status bar`, `System / Home indicator`).
- Figma Wireframes page: the 15 iOS screens as low-fidelity sketches, connected by flow arrows and annotated with decision, idea and question notes.
- Web prototype with an iOS / Android switch: iPhone 15 (393 × 852 pt) and a reference Android phone (412 × 915 dp) with their system bars.

### Changed

- Credit's vertical color moves from coral to the purple ramp: `color.vertical.credit.accent` → `purple.300`, `on-accent` → `purple.900` (10.23:1, AAA). `coral` stays in the palette without a semantic role.
- Storybook is entirely in English: pages, stories, token descriptions and this changelog. Repo documents (`*.md` except this file) stay in Spanish.
- Every prototype screen (Home, Cards, Save, goals, transfer and withdraw) is built only with system components; no loose colors, sizes, radius or durations remain. Documented exceptions: platform-spec sizes (UISwitch, the Material 3 switch and top app bar), the device frame's hardware measurements and the confetti's per-piece randomization ranges.
- Save: “Create goal” sits next to the screen title on both platforms.
- “How much do you need?”: the suggested-amount chips are gone; the amount starts prefilled and the first key replaces it.
- `Text` uses the `variant` prop for the type role (formerly `role`, which clashed with React Native's accessibility `role`).
- `CircleButton` is now `IconButton`. Screen calls to action use `fullWidth`; quick actions are spread by their row, not by the component.
- `TabBar` is generic (`items`, `activeKey`, `onChange`); `Toggle` accepts `disabled`.
- The tab bar sits on an opaque strip: content never shows underneath.
- Component pages no longer repeat token tables; tokens are documented in Foundations and in `tokens/component.json`.

### Removed

- The HTML mock-ups used by the first docs pages (`Mocks.tsx`): every example now renders real components.

## 0.1.0 — 2026-10-03

First release: complete foundations, tokens and documentation.

### Added

- Foundations for option B · Soft tech in `FOUNDATIONS.md`: color, typography, spacing, radius, elevation, motion, icons and accessibility.
- A three-layer naming convention (primitive → semantic → component) in `TOKEN-NAMING.md`, with the Figma conversion.
- 193 DTCG tokens (`tokens/`) built with Style Dictionary 5 into `src/theme/tokens.ts`.
- Expo SDK 57 app with a native Storybook (device) and a web Storybook (to share).
- Docs: introduction, one page per foundation, an AA contrast table generated from the tokens and reusable blocks.
- `color.status.error.border` (`red.600`) for the border of fields with an error.
- The definition of the 10% in 70/20/10: rare, unexpected details, only at milestone moments.

### Accessibility

- 33 text/background pairs in use, all AA.
- `border.input` (`ink.600`, 4.90:1) for the boundary of fields and controls (WCAG 1.4.11).
- Minimum touch target `size.touch.min` = 48.
