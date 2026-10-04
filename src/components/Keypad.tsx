import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import { tokens } from '../theme';
import { Pressable } from './Pressable';
import { Text } from './Text';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', 'del'] as const;

/** Custom number pad for amounts: 64-tall keys, a selection haptic on every press. */
export function Keypad({ onKey }: { onKey: (key: (typeof KEYS)[number]) => void }) {
  return (
    <View style={styles.grid}>
      {KEYS.map((k) => (
        <Pressable
          key={k}
          haptic="selection"
          scale={0.9}
          onPress={() => onKey(k)}
          accessibilityRole="button"
          accessibilityLabel={k === 'del' ? 'Delete' : k}
          style={styles.key}
        >
          {k === 'del' ? (
            <Ionicons name="backspace-outline" size={tokens['icon.size.md']} color={tokens['keypad.key.fg']} />
          ) : (
            <Text color={tokens['keypad.key.fg']} style={tokens['keypad.key.font']}>
              {k}
            </Text>
          )}
        </Pressable>
      ))}
    </View>
  );
}

/** Applies a key to a whole-dollar amount (no cents, 7 digits max). */
export function applyKey(amount: number, key: (typeof KEYS)[number]) {
  if (key === 'del') return Math.floor(amount / 10);
  const next = Number(`${amount}${key}`);
  return next > 9_999_999 ? amount : next;
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: tokens['space.2xs'] },
  key: { width: '33.333%', height: tokens['keypad.key.height'] + tokens['space.md'], alignItems: 'center', justifyContent: 'center', borderRadius: tokens['radius.pill'] },
});
