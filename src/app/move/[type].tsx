import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { ChoiceChip } from '../../components/Chip';
import { List, ListRow } from '../../components/List';
import { applyKey, Keypad } from '../../components/Keypad';
import { SlideToConfirm } from '../../components/SlideToConfirm';
import { Text } from '../../components/Text';
import { TopBar } from '../../components/TopBar';
import { contacts, useAccount } from '../../features/account/AccountContext';
import { money, moneySpoken } from '../../features/goals/format';
import type { IconName } from '../../features/goals/model';
import { tokens } from '../../theme';

type MoveType = 'transfer' | 'withdraw' | 'add';

const CONFIG: Record<MoveType, { title: string; slide: string; icon: IconName; out: boolean }> = {
  transfer: { title: 'Send money', slide: 'Slide to send', icon: 'arrow-up', out: true },
  withdraw: { title: 'Withdraw cash', slide: 'Slide to withdraw', icon: 'cash-outline', out: true },
  add: { title: 'Add money', slide: 'Slide to add money', icon: 'add', out: false },
};

/** Transfer, withdraw or add money: one screen, the amount on a keypad and a slide to confirm. */
export default function MoveMoney() {
  const { type = 'transfer' } = useLocalSearchParams<{ type: MoveType }>();
  const config = CONFIG[type] ?? CONFIG.transfer;
  const insets = useSafeAreaInsets();
  const { balance, move } = useAccount();
  const [amount, setAmount] = useState(0);
  const [to, setTo] = useState(contacts[0].id);
  const [done, setDone] = useState(false);
  const [code] = useState(() => String(100000 + Math.floor(Math.random() * 900000)).replace(/(\d{3})(\d{3})/, '$1 $2'));

  const recipient = contacts.find((c) => c.id === to)!;
  const tooMuch = config.out && amount > balance;
  const valid = amount > 0 && !tooMuch;

  const confirm = () => {
    if (type === 'transfer') move(-amount, `To ${recipient.name}`, 'Transfer', 'arrow-up');
    if (type === 'withdraw') move(-amount, 'ATM withdrawal', 'Cash', 'cash-outline');
    if (type === 'add') move(amount, 'From external bank', 'Deposit', 'arrow-down');
    setTimeout(() => setDone(true), tokens['motion.duration.nav']);
  };

  const top = Platform.OS === 'web' ? insets.top : tokens['space.md'];

  if (done) {
    const headline = type === 'transfer' ? `Sent ${money(amount)} to ${recipient.name.split(' ')[0]}` : type === 'withdraw' ? 'Your cash is ready' : `${money(amount)} added`;
    return (
      <View style={[styles.root, { paddingTop: top }]}>
        <View style={styles.success}>
          <Animated.View entering={ZoomIn.springify().mass(1).stiffness(300).damping(22)} style={styles.check}>
            <Ionicons name="checkmark" size={tokens['icon.size.lg']} color={tokens['color.status.success.fg']} />
          </Animated.View>
          <Animated.View entering={FadeIn.delay(120).duration(tokens['motion.duration.state'])} style={styles.successText}>
            <Text variant="headline" style={styles.center} accessibilityRole="header">
              {headline}
            </Text>
            {type === 'withdraw' ? (
              <>
                <Text variant="body" color={tokens['color.text.secondary']} style={styles.center}>
                  {`Enter this code at any partner ATM to take out ${money(amount)}. It works for 30 minutes.`}
                </Text>
                <Text variant="balance" tabular style={styles.center} accessibilityLabel={`Code ${code.split('').join(' ')}`}>
                  {code}
                </Text>
              </>
            ) : (
              <Text variant="body" color={tokens['color.text.secondary']} style={styles.center}>
                {`Your Vuno account now has ${money(balance, true)}.`}
              </Text>
            )}
          </Animated.View>
        </View>
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, tokens['space.md']) }]}>
          <Button fullWidth label="Done" onPress={() => router.back()} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.root, { paddingTop: top }]}>
      <TopBar title={config.title} leading={{ kind: 'close', onPress: () => router.back() }} />

      {type === 'transfer' ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips} style={styles.chipsWrap}>
          {contacts.map((c) => (
            <ChoiceChip key={c.id} label={c.name} icon="person-circle-outline" selected={c.id === to} onPress={() => setTo(c.id)} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.infoWrap}>
          <List>
            <ListRow
              icon={type === 'withdraw' ? 'location-outline' : 'business-outline'}
              title={type === 'withdraw' ? 'Any partner ATM' : 'Linked bank •••• 2210'}
              detail={type === 'withdraw' ? 'No fees at 40,000+ ATMs. You’ll get a one-time code.' : 'Usually arrives instantly.'}
            />
          </List>
        </View>
      )}

      <View style={styles.display} accessible accessibilityLiveRegion="polite" accessibilityLabel={`Amount: ${moneySpoken(amount)}`}>
        <Text variant="balance" tabular adjustsFontSizeToFit numberOfLines={1} color={amount ? tokens['color.text.primary'] : tokens['color.text.tertiary']}>
          {money(amount)}
        </Text>
        <Text variant="caption" color={tooMuch ? tokens['color.status.error.fg'] : tokens['color.text.tertiary']}>
          {tooMuch ? `That’s more than your ${money(balance, true)} balance` : config.out ? `${money(balance, true)} available` : `Balance after: ${money(balance + amount, true)}`}
        </Text>
      </View>

      <View style={styles.keypad}>
        <Keypad onKey={(k) => setAmount((a) => applyKey(a, k))} />
      </View>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, tokens['space.md']) }]}>
        <SlideToConfirm key={`${valid}`} label={config.slide} onConfirm={confirm} disabled={!valid} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: tokens['color.surface.page'] },
  chipsWrap: { flexGrow: 0 },
  chips: { gap: tokens['space.xs'], paddingHorizontal: tokens['space.inset.screen'] },
  infoWrap: { paddingHorizontal: tokens['space.inset.screen'] },
  display: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: tokens['space.2xs'], paddingHorizontal: tokens['space.inset.screen'] },
  keypad: { paddingHorizontal: tokens['space.inset.screen'] },
  footer: { paddingHorizontal: tokens['space.inset.screen'], paddingTop: tokens['space.sm'] },
  success: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: tokens['space.lg'], paddingHorizontal: tokens['space.inset.screen'] },
  check: { padding: tokens['space.xl'], borderRadius: tokens['radius.pill'], backgroundColor: tokens['color.status.success.bg'], alignItems: 'center', justifyContent: 'center' },
  successText: { gap: tokens['space.sm'], alignItems: 'center' },
  center: { textAlign: 'center' },
});
