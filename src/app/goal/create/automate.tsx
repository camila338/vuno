import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SlideToConfirm } from '../../../components/SlideToConfirm';
import { Chip, ChoiceChip } from '../../../components/Chip';
import { List, ListRow } from '../../../components/List';
import { Toggle } from '../../../components/Toggle';
import { Text } from '../../../components/Text';
import { useDraft } from '../../../features/goals/DraftContext';
import { FlowScreen } from '../../../features/goals/FlowScreen';
import { useAccount } from '../../../features/account/AccountContext';
import { useGoals } from '../../../features/goals/GoalsContext';
import { money, monthYear } from '../../../features/goals/format';
import { finances, type IconName, type Rules } from '../../../features/goals/model';
import { addMonths, monthlyFor, projection } from '../../../features/goals/plan';
import { tokens } from '../../../theme';

const DEPOSITS = [0, 25, 50, 100];

/** A rule as a ListRow with a native toggle; the badge takes the Save accent while it's on. */
function RuleRow({ icon, title, detail, impact, value, onChange, divider }: { icon: IconName; title: string; detail: string; impact: string; value: boolean; onChange: (v: boolean) => void; divider?: boolean }) {
  return <ListRow divider={divider} icon={icon} iconTone={value ? 'vertical' : 'neutral'} title={title} detail={`${detail}\n${impact}`} trailing={<Toggle value={value} onValueChange={onChange} label={title} hint={detail} />} />;
}

/** Step 4 · Put it on autopilot. Automatic rules and a first deposit. */
export default function AutomateStep() {
  const [draft, setDraft] = useDraft();
  const { addGoal } = useGoals();
  const account = useAccount();
  const remaining = Math.max(0, draft.target - draft.initialDeposit);
  const plan = projection(remaining, draft.monthly, draft.rules);
  const arrival = addMonths(new Date(), plan.months);
  const noAutomation = !draft.rules.payday && !draft.rules.roundUps && !draft.rules.windfall;

  const setRule = (key: keyof Rules) => (value: boolean) => setDraft((d) => ({ ...d, rules: { ...d.rules, [key]: value } }));
  const setDeposit = (initialDeposit: number) =>
    setDraft((d) => ({ ...d, initialDeposit, monthly: d.mode === 'date' ? monthlyFor(Math.max(0, d.target - initialDeposit), d.months) : d.monthly }));

  const create = () => {
    const months = Number.isFinite(plan.months) ? plan.months : draft.months;
    const id = addGoal({
      name: draft.name.trim(),
      category: draft.category,
      target: draft.target,
      saved: draft.initialDeposit,
      monthly: draft.monthly,
      rules: draft.rules,
      targetDate: addMonths(new Date(), months).toISOString(),
    });
    if (draft.initialDeposit) account.move(-draft.initialDeposit, `To ${draft.name.trim()}`, 'Vuno Save', 'wallet-outline');
    router.push({ pathname: '/goal/create/done', params: { id } });
  };

  return (
    <FlowScreen step={4} title="Put it on autopilot" subtitle="Turn on what works for you. You can change it anytime." footer={<SlideToConfirm label="Slide to create goal" onConfirm={create} />}>
      <List>
        <RuleRow icon="calendar-outline" title="Payday transfer" detail={`On the 1st and 15th we move ${money(draft.monthly / 2)} from your Vuno account.`} impact={`${money(draft.monthly)} a month`} value={draft.rules.payday} onChange={setRule('payday')} />
        <RuleRow icon="cart-outline" title="Round-ups" detail="Every card purchase rounds up to the next dollar." impact={`≈ +${money(finances.roundUpsMonthly)} a month from your spending`} value={draft.rules.roundUps} onChange={setRule('roundUps')} />
        <RuleRow icon="trending-up-outline" title="10% of extra income" detail="Refunds, bonuses or money you receive." impact={`≈ +${money(finances.windfallMonthly)} a month based on your history`} value={draft.rules.windfall} onChange={setRule('windfall')} />
      </List>

      {/* The plan's result with the active rules */}
      <Animated.View key={`${plan.months}-${noAutomation}`} entering={FadeIn.duration(tokens['motion.duration.state'])} style={styles.result} accessibilityLiveRegion="polite">
        {noAutomation ? (
          <>
            <Chip status="warning" label="No automatic saving" />
            <Text variant="body" color={tokens['color.text.on-inverse']}>
              You’ll need to add money by hand. Turn on at least one rule to keep the plan moving.
            </Text>
          </>
        ) : (
          <>
            <Text variant="caption" color={tokens['color.text.on-inverse-muted']}>
              With this you’ll get there by
            </Text>
            <Text variant="headline" color={tokens['color.text.on-inverse']}>
              {monthYear(arrival)}
            </Text>
            {plan.weeksEarlier > 0 ? <Chip status="success" label={`${plan.weeksEarlier} ${plan.weeksEarlier === 1 ? 'week' : 'weeks'} ahead of plan`} /> : null}
          </>
        )}
      </Animated.View>

      <View style={styles.deposit}>
        <Text variant="label">Kick it off today</Text>
        <Text variant="caption" color={tokens['color.text.secondary']}>
          {`From your Vuno account · ${money(account.balance, true)} available`}
        </Text>
        <View style={styles.depositRow}>
          {DEPOSITS.map((amount) => (
            <ChoiceChip key={amount} label={amount ? money(amount) : 'Not now'} selected={draft.initialDeposit === amount} onPress={() => setDeposit(amount)} />
          ))}
        </View>
      </View>
    </FlowScreen>
  );
}

const styles = StyleSheet.create({
  result: { backgroundColor: tokens['color.surface.inverse'], borderRadius: tokens['card.radius'], padding: tokens['card.inset'], gap: tokens['space.xs'] },
  deposit: { gap: tokens['space.2xs'] },
  depositRow: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens['space.xs'], marginTop: tokens['space.xs'] },
});
