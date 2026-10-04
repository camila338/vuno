// Code samples for the docs pages. They live here because MDX strips the
// indentation of text inside JSX expressions.

export const snippets = {
  contributingToken: String.raw`"status": {
  "error": {
    "border": {
      "$type": "color",
      "$value": "{color.red.600}",
      "$description": "Border of a field with an error."
    }
  }
}`,
  contributingPage: String.raw`import { Meta } from '@storybook/addon-docs/blocks';
import { PageHeader, TokenTable, DoDont, Do, Dont, Live, CodeExample } from '../blocks';
import { snippets } from '../snippets';

<Meta title="Foundations/New foundation" />

<PageHeader eyebrow="Foundations" title="New foundation">Purpose in one or two sentences.</PageHeader>

## Tokens
<TokenTable prefix="new." />

## Usage
- …

## Do's and Don'ts
<DoDont>
  <Do caption="…"><Live>…</Live></Do>
  <Dont caption="…"><Live>…</Live></Dont>
</DoDont>

## Code
<CodeExample code={snippets.newFoundation} />` + '\n',
  accessibility: String.raw`import { IconButton, Text } from '../components';

// Icon-only control: always a label, and a 48 touch target.
<IconButton icon="close" label="Close" onPress={close} />

// The balance scales with the system text size, up to 1.5×.
<Text variant="balance" tabular>$1,050.77</Text>`,
  color: String.raw`import { tokens } from '../theme';

const styles = StyleSheet.create({
  screen: { backgroundColor: tokens['color.surface.page'] },
  title: { color: tokens['color.text.primary'] },
  primaryButton: {
    backgroundColor: tokens['color.brand.primary'],
    color: tokens['color.brand.on-primary'],
  },
});`,
  elevation: String.raw`// boxShadow needs the New Architecture (Expo SDK 52 or later).
const styles = StyleSheet.create({
  tabbar: { boxShadow: tokens['elevation.floating'], borderRadius: tokens['radius.pill'] },
  card: {
    borderWidth: tokens['border.default'].width,
    borderColor: tokens['border.default'].color,
  },
});`,
  spacing: String.raw`const styles = StyleSheet.create({
  screen: { paddingHorizontal: tokens['space.inset.screen'], gap: tokens['space.gap.section'] },
  list: { gap: tokens['space.gap.list'] },
  card: { padding: tokens['space.inset.card'] },
});`,
  icons: String.raw`import Ionicons from '@expo/vector-icons/Ionicons';

<Ionicons
  name={active ? 'home' : 'home-outline'}
  size={tokens['icon.size.md']}
  color={tokens['color.text.tertiary']}
  accessibilityLabel="Home"
/>`,
  motion: String.raw`import { withSpring, withTiming, Easing } from 'react-native-reanimated';
import { tokens } from '../theme';

scale.value = withSpring(1, tokens['motion.spring.soft']);
opacity.value = withTiming(1, {
  duration: tokens['motion.duration.state'],
  easing: Easing.bezier(...tokens['motion.easing.standard']),
});

// Decorative effects read their own component tokens.
<Confetti x={x} y={y} /> // confetti.duration → motion.duration.effect`,
  radius: String.raw`const styles = StyleSheet.create({
  button: { borderRadius: tokens['radius.pill'] },
  card: { borderRadius: tokens['radius.card'] },
  input: { borderRadius: tokens['radius.input'] },
});`,
  typography: String.raw`import { Text } from '../components';

<Text variant="balance" tabular>$1,050.77</Text>
<Text variant="caption" color={tokens['color.text.tertiary']}>
  Today, 9:41
</Text>`,
};
