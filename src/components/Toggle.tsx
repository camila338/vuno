import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Switch, View } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { tokens, useOS } from '../theme';

type Props = { value: boolean; onValueChange: (v: boolean) => void; label: string; hint?: string; disabled?: boolean };

// Platform specs, not brand values: Apple HIG UISwitch and Material 3 switch.
const IOS = { width: 51, height: 31, thumb: 27, inset: 2 };
const M3 = { width: 52, height: 32, outline: 2, handleOff: 16, handleOn: 24, handlePressed: 28 };

/**
 * On/off switch that follows each platform:
 * - iOS: the native UISwitch (on device) with Vuno's switch.* colors.
 * - Android: the Material 3 switch: outlined track when off, larger handle when on.
 * The web prototype draws the same two shapes so previews match the devices.
 */
export function Toggle(props: Props) {
  const os = useOS();
  if (Platform.OS === 'ios') {
    return (
      <Switch
        value={props.value}
        disabled={props.disabled}
        onValueChange={props.onValueChange}
        trackColor={{ true: tokens['switch.on'], false: tokens['switch.off'] }}
        thumbColor={tokens['switch.thumb']}
        accessibilityLabel={props.label}
        accessibilityHint={props.hint}
      />
    );
  }
  return os === 'android' ? <MaterialSwitch {...props} /> : <CupertinoSwitch {...props} />;
}

/** Shared behaviour of the drawn switches: role, state, haptic. */
function useSwitch({ value, onValueChange, disabled }: Props) {
  const reduceMotion = useReducedMotion();
  const toggle = () => {
    if (disabled) return;
    Haptics.selectionAsync();
    onValueChange(!value);
  };
  return { reduceMotion, toggle };
}

function MaterialSwitch(props: Props) {
  const { value, label, hint, disabled } = props;
  const { reduceMotion, toggle } = useSwitch(props);
  const [pressed, setPressed] = useState(false);
  const size = pressed ? M3.handlePressed : value ? M3.handleOn : M3.handleOff;
  const center = useSharedValue(value ? M3.width - M3.height / 2 : M3.height / 2);
  const diameter = useSharedValue(size);
  useEffect(() => {
    const go = (v: number) => (reduceMotion ? v : withSpring(v, tokens['motion.spring.soft']));
    center.value = go(value ? M3.width - M3.height / 2 : M3.height / 2);
    diameter.value = go(size);
  }, [value, size, reduceMotion, center, diameter]);
  const handle = useAnimatedStyle(() => ({
    width: diameter.value,
    height: diameter.value,
    left: center.value - diameter.value / 2,
    top: (M3.height - diameter.value) / 2,
  }));
  return (
    <Pressable
      onPress={toggle}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={label}
      accessibilityHint={hint}
      style={[styles.hit, disabled && styles.disabled]}
    >
      <View style={[styles.m3Track, value ? styles.m3TrackOn : styles.m3TrackOff]}>
        {/* Outline as an overlay so the handle keeps the same coordinates on and off. */}
        {value ? null : <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.m3Outline]} />}
        <Animated.View style={[styles.handle, { backgroundColor: value ? tokens['switch.thumb'] : tokens['switch.off'] }, handle]} />
      </View>
    </Pressable>
  );
}

function CupertinoSwitch(props: Props) {
  const { value, label, hint, disabled } = props;
  const { reduceMotion, toggle } = useSwitch(props);
  const travel = IOS.width - IOS.thumb - IOS.inset * 2;
  const x = useSharedValue(value ? travel : 0);
  useEffect(() => {
    x.value = reduceMotion ? (value ? travel : 0) : withSpring(value ? travel : 0, tokens['motion.spring.soft']);
  }, [value, travel, reduceMotion, x]);
  const thumb = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  return (
    <Pressable
      onPress={toggle}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={label}
      accessibilityHint={hint}
      style={[styles.hit, disabled && styles.disabled]}
    >
      <View style={[styles.iosTrack, { backgroundColor: value ? tokens['switch.on'] : tokens['switch.off'] }]}>
        <Animated.View style={[styles.iosThumb, thumb]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: { minHeight: tokens['size.touch.min'], justifyContent: 'center' },
  disabled: { opacity: tokens['opacity.disabled'] },
  iosTrack: { width: IOS.width, height: IOS.height, borderRadius: tokens['radius.pill'], padding: IOS.inset },
  iosThumb: { width: IOS.thumb, height: IOS.thumb, borderRadius: tokens['radius.pill'], backgroundColor: tokens['switch.thumb'], boxShadow: tokens['elevation.sm'] },
  m3Track: { width: M3.width, height: M3.height, borderRadius: tokens['radius.pill'] },
  m3TrackOn: { backgroundColor: tokens['switch.on'] },
  m3TrackOff: { backgroundColor: tokens['color.surface.card'] },
  m3Outline: { borderRadius: tokens['radius.pill'], borderWidth: M3.outline, borderColor: tokens['switch.off'] },
  handle: { position: 'absolute', borderRadius: tokens['radius.pill'] },
});
