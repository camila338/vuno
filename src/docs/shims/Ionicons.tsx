// Web Storybook shim for @expo/vector-icons/Ionicons: the same Ionicons glyphs from the `ionicons`
// package (expo-font can't be pre-bundled by Vite in dev). Same props: name, size, color.
import { Icon } from '../blocks/Icon';

const camel = (name: string) => name.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());

export default function Ionicons({ name, size = 24, color }: { name: string; size?: number; color?: string; style?: unknown }) {
  return <Icon name={camel(name)} size={size} style={{ color, display: 'inline-block' }} />;
}
