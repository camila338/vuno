import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActionButton } from '../../components/ActionButton';
import { Balance } from '../../components/Balance';
import { Chip } from '../../components/Chip';
import { List, ListRow } from '../../components/List';
import { Logo } from '../../components/Logo';
import { SectionHeader } from '../../components/SectionHeader';
import { Avatar } from '../../components/Surface';
import { Text } from '../../components/Text';
import { debitCard, useAccount, user } from '../../features/account/AccountContext';
import { CreditSummary } from '../../features/account/AccountSections';
import { money } from '../../features/goals/format';
import { useGoals } from '../../features/goals/GoalsContext';
import { SavingsSummary, SpendingSummary, TransactionRow } from '../../features/home/HomeParts';
import { tokens, VerticalProvider } from '../../theme';

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
};

/**
 * Home, top to bottom by how often it's needed:
 * debit (balance, actions, card) → credit → savings → activity → insights.
 */
export default function Home() {
  const insets = useSafeAreaInsets();
  const { balance, transactions, credit, cardFrozen } = useAccount();
  const { goals } = useGoals();
  const payroll = transactions.find((t) => t.subtitle === 'Direct deposit');

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Brand header: logo on the start side, the person on the end side. */}
        <View style={styles.header}>
          <Logo />
          <View style={styles.greeting}>
            <View style={styles.greetingText}>
              <Text variant="caption" color={tokens['color.text.tertiary']}>
                {`${greeting()},`}
              </Text>
              <Text variant="label">{user.firstName}</Text>
            </View>
            <Avatar initials={`${user.firstName[0]}${user.lastName[0]}`} label={`${user.firstName} ${user.lastName}`} />
          </View>
        </View>

        {/* Debit: the account balance, what you do with it, and the card that spends it */}
        <VerticalProvider vertical="banking">
          <View style={styles.section}>
            <View style={styles.balance}>
              <Balance amount={balance} label="Vuno account · Debit" />
              {payroll ? <Chip status="success" icon="arrow-down" label={`${money(payroll.amount, true)} payroll arrived Oct 1`} /> : null}
            </View>
            <View style={styles.actions}>
              <View style={styles.action}>
                <ActionButton icon="arrow-up" label="Transfer" onPress={() => router.push({ pathname: '/move/[type]', params: { type: 'transfer' } })} />
              </View>
              <View style={styles.action}>
                <ActionButton icon="cash-outline" label="Withdraw" onPress={() => router.push({ pathname: '/move/[type]', params: { type: 'withdraw' } })} />
              </View>
              <View style={styles.action}>
                <ActionButton icon="add" label="Add money" onPress={() => router.push({ pathname: '/move/[type]', params: { type: 'add' } })} />
              </View>
              <View style={styles.action}>
                <ActionButton icon="sparkles-outline" label="New goal" onPress={() => router.push('/goal/create')} />
              </View>
            </View>
            <List>
              <ListRow
                icon="card-outline"
                iconTone="vertical"
                title="Debit card"
                detail={`•••• ${debitCard.last4} · spends from this balance`}
                trailing={cardFrozen ? <Chip status="info" icon="snow-outline" label="Frozen" /> : <Chip status="success" label="Active" />}
                onPress={() => router.navigate('/cards')}
                accessibilityLabel={`Debit card ending in ${debitCard.last4}, ${cardFrozen ? 'frozen' : 'active'}. Spends from this balance.`}
              />
            </List>
          </View>
        </VerticalProvider>

        {/* Credit: separate product, separate color */}
        <VerticalProvider vertical="credit">
          <View style={styles.section}>
            <SectionHeader icon="card-outline" title="Credit" detail={`Vuno Credit •••• ${credit.last4} · money you owe`} />
            <CreditSummary credit={credit} onPress={() => router.navigate('/cards')} />
          </View>
        </VerticalProvider>

        {/* Savings */}
        <VerticalProvider vertical="save">
          <View style={styles.section}>
            <SectionHeader icon="wallet-outline" title="Savings" detail="Money set aside for your goals" />
            <SavingsSummary goals={goals} />
          </View>
        </VerticalProvider>

        {/* Activity */}
        <View style={styles.section}>
          <SectionHeader title="Recent activity" />
          <List>
            {transactions.slice(0, 5).map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </List>
        </View>

        {/* Insights: useful, not urgent, so it comes last */}
        <View style={styles.section}>
          <SectionHeader title="Insights" />
          <SpendingSummary />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: tokens['color.surface.page'] },
  content: { paddingHorizontal: tokens['space.inset.screen'], paddingBottom: tokens['space.lg'], gap: tokens['space.gap.section'] },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: tokens['space.md'] },
  greeting: { flexDirection: 'row', alignItems: 'center', gap: tokens['space.sm'] },
  greetingText: { alignItems: 'flex-end' },
  section: { gap: tokens['space.gap.stack'] },
  balance: { gap: tokens['space.xs'] },
  actions: { flexDirection: 'row' },
  action: { flex: 1, alignItems: 'center' },
});
