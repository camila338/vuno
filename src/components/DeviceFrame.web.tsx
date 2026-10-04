import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, type ReactNode } from 'react';
import { Text as RNText, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { PlatformProvider, tokens, type OS } from '../theme';
import { Segmented } from './Segmented';
import { Text } from './Text';

// Hardware and system-bar specs of the two reference devices (not brand values).
const DEVICES = {
  // iPhone 15 / 16: 393 × 852 pt, Dynamic Island, 54 pt status bar, 34 pt home indicator.
  ios: { w: 393, h: 852, bezel: 12, frameRadius: 64, screenRadius: 52, insets: { top: 54, bottom: 34, left: 0, right: 0 }, label: 'iPhone 15 · 393 × 852 pt' },
  // Android compact phone (Pixel 8 class): 412 × 915 dp, 24 dp status bar, gesture navigation 24 dp.
  android: { w: 412, h: 915, bezel: 8, frameRadius: 44, screenRadius: 36, insets: { top: 24, bottom: 24, left: 0, right: 0 }, label: 'Android · 412 × 915 dp' },
} as const;

const SWITCHER = 56;
const SYSTEM_FONT: Record<OS, string> = { ios: '-apple-system, "SF Pro Text", system-ui, sans-serif', android: 'Roboto, "Google Sans", system-ui, sans-serif' };

/** Wraps the app in an iPhone or Android frame with its real system bars, and lets the viewer switch platform. */
export function DeviceFrame({ children }: { children: ReactNode }) {
  const [os, setOS] = useState<OS>('ios');
  const d = DEVICES[os];
  const frameW = d.w + d.bezel * 2;
  const frameH = d.h + d.bezel * 2;
  const { width, height } = useWindowDimensions();
  const scale = Math.min(1, (height - SWITCHER - 112) / frameH, (width - 32) / frameW);

  return (
    <View style={styles.page}>
      <View style={styles.switcher}>
        <Segmented<OS> value={os} onChange={setOS} options={[{ value: 'ios', label: 'iOS' }, { value: 'android', label: 'Android' }]} />
      </View>
      <View style={{ width: frameW * scale, height: frameH * scale, alignItems: 'center', justifyContent: 'center' }}>
        <View style={[styles.device, { width: frameW, height: frameH, padding: d.bezel, borderRadius: d.frameRadius, transform: [{ scale }] }]}>
          <View style={[styles.screen, { borderRadius: d.screenRadius }]}>
            <PlatformProvider os={os}>
              <SafeAreaInsetsContext.Provider value={d.insets}>{children}</SafeAreaInsetsContext.Provider>
            </PlatformProvider>
            {os === 'ios' ? <IOSChrome /> : <AndroidChrome />}
          </View>
        </View>
      </View>
      <Text variant="caption" color={tokens['color.text.secondary']} style={styles.caption}>
        {`Vuno · Interactive prototype · ${d.label}`}
      </Text>
    </View>
  );
}

function IOSChrome() {
  const fg = tokens['color.text.primary'];
  return (
    <>
      <View style={[styles.statusBar, { height: 54, paddingHorizontal: 34, paddingTop: 6 }]} pointerEvents="none">
        <RNText style={[styles.time, { fontFamily: SYSTEM_FONT.ios, fontSize: 17, fontWeight: '600', width: 54 }]}>9:41</RNText>
        <View style={styles.icons}>
          <Ionicons name="cellular" size={17} color={fg} />
          <Ionicons name="wifi" size={17} color={fg} />
          <Ionicons name="battery-full" size={24} color={fg} />
        </View>
      </View>
      <View style={[styles.island, { top: 11, width: 124, height: 36, borderRadius: 18 }]} pointerEvents="none" />
      <View style={[styles.handle, { bottom: 8, width: 136, height: 5 }]} pointerEvents="none" />
    </>
  );
}

function AndroidChrome() {
  const fg = tokens['color.text.primary'];
  return (
    <>
      <View style={[styles.statusBar, { height: 24, paddingHorizontal: 16 }]} pointerEvents="none">
        <RNText style={[styles.time, { fontFamily: SYSTEM_FONT.android, fontSize: 14, fontWeight: '500' }]}>9:41</RNText>
        <View style={[styles.icons, { gap: 4 }]}>
          <Ionicons name="wifi" size={15} color={fg} />
          <Ionicons name="cellular" size={14} color={fg} />
          <Ionicons name="battery-full" size={18} color={fg} />
        </View>
      </View>
      {/* Punch-hole camera, centered in the status bar. */}
      <View style={[styles.island, { top: 6, width: 12, height: 12, borderRadius: 6 }]} pointerEvents="none" />
      {/* Gesture navigation handle. */}
      <View style={[styles.handle, { bottom: 10, width: 108, height: 4 }]} pointerEvents="none" />
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: tokens['color.border.default'], overflow: 'hidden', gap: tokens['space.md'] },
  switcher: { width: 240 },
  device: { backgroundColor: tokens['color.surface.inverse'], boxShadow: tokens['elevation.overlay'] },
  screen: { flex: 1, overflow: 'hidden', backgroundColor: tokens['color.surface.page'] },
  statusBar: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  time: { color: tokens['color.text.primary'], textAlign: 'center' },
  icons: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  island: { position: 'absolute', alignSelf: 'center', backgroundColor: tokens['color.surface.inverse'] },
  handle: { position: 'absolute', alignSelf: 'center', borderRadius: tokens['radius.pill'], backgroundColor: tokens['color.text.primary'] },
  caption: { position: 'absolute', bottom: 12 },
});
