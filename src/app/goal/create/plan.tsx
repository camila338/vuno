import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { Button } from '../../../components/Button';
import { Chip } from '../../../components/Chip';
import { ProgressBar } from '../../../components/Progress';
import { Segmented } from '../../../components/Segmented';
import { StepSlider } from '../../../components/Slider';
import { Text } from '../../../components/Text';
import { useDraft } from '../../../features/goals/DraftContext';
import { FlowScreen } from '../../../features/goals/FlowScreen';
import { duration, money, monthYear, monthYearShort } from '../../../features/goals/format';
import { finances } from '../../../features/goals/model';
import { addMonths, curve, feasibility, MAX_MONTHS, MIN_MONTHS, MONTHLY_STEP, monthlyFor, monthsFor } from '../../../features/goals/plan';
import { tokens, useVerticalColors } from '../../../theme';

const LEVEL = {
  comfortable: { status: 'success', label: 'Comfortable', color: tokens['color.status.success.fg'] },
  tight: { status: 'warning', label: 'Tight', color: tokens['color.status.warning.fg'] },
  demanding: { status: 'error', label: 'Stretch', color: tokens['color.status.error.fg'] },
} as const;

/** Step 3 · Your plan. Date and contribution are linked: move one and the other recalculates. */
export default function PlanStep() {
  const [draft, setDraft] = useDraft();
  const { accent, onAccent } = useVerticalColors();
  const remaining = Math.max(0, draft.target - draft.initialDeposit);
  const end = addMonths(new Date(), draft.months);
  const fit = feasibility(draft.monthly);
  const level = LEVEL[fit.level];
  const maxMonthly = Math.max(MONTHLY_STEP * 2, Math.ceil(Math.min(remaining, finances.freeMonthly * 1.2) / MONTHLY_STEP) * MONTHLY_STEP);
  const points = curve(draft.initialDeposit, draft.monthly, Math.min(draft.months, MAX_MONTHS));

  const setMonths = (months: number) => setDraft((d) => ({ ...d, months, monthly: monthlyFor(remaining, months) }));
  const setMonthly = (step: number) => {
    const monthly = step * MONTHLY_STEP;
    setDraft((d) => ({ ...d, monthly, months: monthsFor(remaining, monthly) }));
  };

  return (
    <FlowScreen step={3} title="Your plan" subtitle="Pick what you want to lock in. We’ll work out the rest instantly." footer={<Button fullWidth label="Continue" onPress={() => router.push('/goal/create/automate')} />}>
      <Segmented
        value={draft.mode}
        onChange={(mode) => setDraft((d) => ({ ...d, mode }))}
        options={[
          { value: 'date', label: 'By date' },
          { value: 'amount', label: 'By amount' },
        ]}
      />

      {/* Resumen vivo del plan */}
      <View style={[styles.hero, { backgroundColor: accent }]} accessible accessibilityLiveRegion="polite" accessibilityLabel={`${money(draft.monthly)} a month. You’ll get there by ${monthYear(end)}.`}>
        <View style={styles.heroRow}>
          <View style={styles.heroCol}>
            <Text variant="caption" color={onAccent}>
              You save
            </Text>
            <Text variant="headline" color={onAccent} tabular>
              {money(draft.monthly)}
              <Text variant="label" color={onAccent}>
                {' '}/mo
              </Text>
            </Text>
          </View>
          <View style={[styles.heroCol, styles.right]}>
            <Text variant="caption" color={onAccent}>
              Done by
            </Text>
            <Text variant="title" color={onAccent}>
              {monthYearShort(end)}
            </Text>
          </View>
        </View>

        {/* Month-by-month projection */}
        <View style={styles.chart} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
          {points.map((v, i) => (
            <Animated.View
              key={i}
              layout={LinearTransition.springify().mass(1).stiffness(300).damping(22)}
              style={[styles.bar, { height: `${Math.max(6, (v / draft.target) * 100)}%`, backgroundColor: i === points.length - 1 ? onAccent : tokens['color.surface.card'] }]}
            />
          ))}
        </View>
        <View style={styles.chartLegend}>
          <Text variant="caption" color={onAccent}>
            Today
          </Text>
          <Text variant="caption" color={onAccent}>
            {`${duration(draft.months)} · ${money(draft.target)}`}
          </Text>
        </View>
      </View>

      {draft.mode === 'date' ? (
        <View style={styles.control}>
          <View style={styles.controlHead}>
            <Text variant="label">Timeframe</Text>
            <Text variant="label" color={tokens['color.text.secondary']}>
              {duration(draft.months)}
            </Text>
          </View>
          <StepSlider min={MIN_MONTHS} max={MAX_MONTHS} value={Math.min(draft.months, MAX_MONTHS)} onChange={setMonths} label="Timeframe in months" valueText={duration(draft.months)} color={tokens['color.surface.inverse']} track={tokens['color.border.default']} />
        </View>
      ) : (
        <View style={styles.control}>
          <View style={styles.controlHead}>
            <Text variant="label">Monthly amount</Text>
            <Text variant="label" color={tokens['color.text.secondary']} tabular>
              {money(draft.monthly)}
            </Text>
          </View>
          <StepSlider min={1} max={maxMonthly / MONTHLY_STEP} value={Math.min(Math.round(draft.monthly / MONTHLY_STEP), maxMonthly / MONTHLY_STEP)} onChange={setMonthly} label="Monthly amount" valueText={`${money(draft.monthly)} a month`} color={tokens['color.surface.inverse']} track={tokens['color.border.default']} />
        </View>
      )}

      {/* Feasibility meter: color + icon + text (FOUNDATIONS §8) */}
      <View style={styles.fit}>
        <View style={styles.controlHead}>
          <Text variant="label">Does it fit your month?</Text>
          <Chip status={level.status} label={level.label} />
        </View>
        <ProgressBar value={Math.min(1, fit.share)} color={level.color} track={tokens['color.border.default']} />
        <Text variant="caption" color={tokens['color.text.secondary']}>
          {`Uses ${Math.round(fit.share * 100)}% of your free cash (${money(finances.freeMonthly)} a month after bills).`}
        </Text>
      </View>
    </FlowScreen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: tokens['card.radius'], padding: tokens['card.inset'], gap: tokens['space.md'] },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens['space.md'] },
  heroCol: { gap: 0 },
  right: { alignItems: 'flex-end' },
  chart: { height: tokens['space.3xl'] + tokens['space.xl'], flexDirection: 'row', alignItems: 'flex-end', gap: tokens['space.2xs'] },
  bar: { flex: 1, borderRadius: tokens['radius.xs'] },
  chartLegend: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -tokens['space.xs'] },
  control: { gap: tokens['space.2xs'] },
  controlHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  fit: {
    gap: tokens['space.xs'],
    padding: tokens['card.inset'],
    borderRadius: tokens['card.radius'],
    backgroundColor: tokens['card.bg'],
    borderWidth: tokens['card.border'].width,
    borderColor: tokens['card.border'].color,
  },
});
