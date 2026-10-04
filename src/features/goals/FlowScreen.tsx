import { router, useNavigation } from 'expo-router';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from '../../components/Button';
import { StepProgress } from '../../components/StepProgress';
import { Text } from '../../components/Text';
import { TopBar } from '../../components/TopBar';
import { tokens } from '../../theme';

export const STEPS = 4;

/** Template for each flow step: a top bar with progress, the content and a footer with the main action. */
export function FlowScreen({ step, title, subtitle, children, footer, scroll = true }: { step: number; title: string; subtitle?: string; children: ReactNode; footer: ReactNode; scroll?: boolean }) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  // Close leaves the whole flow: the parent (root) stack pops the create route.
  const close = () => navigation.getParent()?.goBack();
  const Body = scroll ? ScrollView : View;
  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* On iOS the modal sheet already sits below the status bar; the web prototype is a pushed screen. */}
      <View style={[styles.header, Platform.OS === 'web' && { paddingTop: insets.top }]}>
        <TopBar leading={step > 1 ? { kind: 'back', onPress: () => router.back() } : undefined} trailing={<IconButton icon="close" label="Close" onPress={close} />}>
          <StepProgress step={step} total={STEPS} />
        </TopBar>
      </View>
      <Body style={styles.body} contentContainerStyle={scroll ? styles.scrollContent : undefined} keyboardShouldPersistTaps="handled">
        <View style={styles.intro}>
          <Text variant="caption" color={tokens['color.text.tertiary']} style={styles.eyebrow}>
            {`Step ${step} of ${STEPS}`}
          </Text>
          <Text variant="headline" accessibilityRole="header">
            {title}
          </Text>
          {subtitle ? (
            <Text variant="body" color={tokens['color.text.secondary']} style={styles.subtitle}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View style={[styles.children, !scroll && styles.fill]}>{children}</View>
      </Body>
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, tokens['space.md']) }]}>{footer}</View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: tokens['color.surface.page'] },
  header: { paddingTop: tokens['space.xs'] },
  body: { flex: 1 },
  scrollContent: { paddingBottom: tokens['space.xl'] },
  intro: { paddingHorizontal: tokens['space.inset.screen'], paddingTop: tokens['space.md'], paddingBottom: tokens['space.md'] },
  eyebrow: { marginBottom: tokens['space.2xs'] },
  subtitle: { marginTop: tokens['space.xs'] },
  children: { paddingHorizontal: tokens['space.inset.screen'], gap: tokens['space.gap.stack'] },
  fill: { flex: 1 },
  footer: { paddingHorizontal: tokens['space.inset.screen'], paddingTop: tokens['space.sm'], gap: tokens['space.xs'], backgroundColor: tokens['color.surface.page'] },
});
