import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Chip } from '../../components/Chip';
import { List, ListRow } from '../../components/List';
import { SectionHeader } from '../../components/SectionHeader';
import { Text } from '../../components/Text';
import { Toggle } from '../../components/Toggle';
import { debitCard, useAccount, user } from '../../features/account/AccountContext';
import { CreditSummary } from '../../features/account/AccountSections';
import { money, monthDay } from '../../features/goals/format';
import { tokens, VerticalProvider } from '../../theme';

/** Cards: debit and credit as two clearly separate products, each with its own color and controls. */
export default function CardsTab() {
  const insets = useSafeAreaInsets();
  const { credit, cardFrozen, setCardFrozen, balance } = useAccount();
  const used = Math.round((credit.balance / credit.limit) * 100);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text variant="headline" accessibilityRole="header" style={styles.title}>
          Cards
        </Text>

        <VerticalProvider vertical="banking">
          <View style={styles.section}>
            <SectionHeader
              icon="card-outline"
              title="Debit card"
              detail={`•••• ${debitCard.last4} · spends your own money`}
              trailing={cardFrozen ? <Chip status="info" icon="snow-outline" label="Frozen" /> : <Chip status="success" label="Active" />}
            />
            <List>
              <ListRow
                icon="snow-outline"
                title="Freeze card"
                detail={cardFrozen ? 'Payments are paused until you unfreeze it.' : 'Pause card payments instantly.'}
                trailing={<Toggle value={cardFrozen} onValueChange={setCardFrozen} label="Freeze card" />}
              />
              <ListRow icon="wallet-outline" title="Spends from" detail={`Vuno account · ${money(balance, true)}`} />
              <ListRow icon="calendar-outline" title="Expires" detail={debitCard.expires} />
              <ListRow icon="person-outline" title="Cardholder" detail={`${user.firstName} ${user.lastName}`} />
            </List>
          </View>
        </VerticalProvider>

        <VerticalProvider vertical="credit">
          <View style={styles.section}>
            <SectionHeader icon="card-outline" title="Credit card" detail={`•••• ${credit.last4} · money you owe`} />
            <CreditSummary credit={credit} />
            <List>
              <ListRow icon="calendar-outline" title="Payment due" detail={`${monthDay(new Date(credit.dueDate))} · minimum ${money(credit.minimumDue)}`} trailing={<Chip status="info" icon="repeat-outline" label="Autopay" />} />
              <ListRow icon="speedometer-outline" title="Credit used" detail={`${used}% of your limit · under 30% helps your score`} trailing={used <= 30 ? <Chip status="success" label="Healthy" /> : <Chip status="warning" label="High" />} />
              <ListRow icon="trending-up-outline" title="Credit limit" detail={money(credit.limit)} />
            </List>
          </View>
        </VerticalProvider>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: tokens['color.surface.page'] },
  content: { paddingHorizontal: tokens['space.inset.screen'], paddingBottom: tokens['space.lg'], gap: tokens['space.gap.section'] },
  title: { paddingTop: tokens['space.md'] },
  section: { gap: tokens['space.gap.stack'] },
});
