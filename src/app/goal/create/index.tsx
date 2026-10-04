import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { Button } from '../../../components/Button';
import { ChoiceChip } from '../../../components/Chip';
import { IconBadge } from '../../../components/Surface';
import { Text } from '../../../components/Text';
import { TextField } from '../../../components/TextField';
import { categories, detectCategory, quickIdeas } from '../../../features/goals/categories';
import { useDraft } from '../../../features/goals/DraftContext';
import { FlowScreen } from '../../../features/goals/FlowScreen';
import { tokens } from '../../../theme';

/** Step 1 · What are you saving for? Natural language with category detection. */
export default function PurposeStep() {
  const [draft, setDraft] = useDraft();
  const category = categories[draft.category];
  const ready = draft.name.trim().length >= 2;

  // If the text doesn't reveal a category, keep the one from the chosen idea.
  const onName = (name: string) =>
    setDraft((d) => {
      const detected = detectCategory(name);
      return { ...d, name, category: detected !== 'other' || !d.categoryLocked ? detected : d.category };
    });

  const next = () => {
    if (!ready) return;
    setDraft((d) => ({ ...d, target: d.target || categories[d.category].suggestions[1].amount }));
    router.push('/goal/create/amount');
  };

  return (
    <FlowScreen
      step={1}
      title="What are you saving for?"
      subtitle="Say it the way you’d tell a friend. We’ll build the plan."
      footer={
        <Button fullWidth label="Continue" disabled={!ready} onPress={next} />
      }
    >
      <TextField
        label="Goal name"
        size="large"
        value={draft.name}
        onChangeText={onName}
        placeholder="A trip to Japan"
        autoFocus
        maxLength={40}
        returnKeyType="next"
        onSubmitEditing={next}
        footer={
          draft.name.trim().length > 0 ? (
            <Animated.View entering={FadeIn.duration(tokens['motion.duration.state'])} exiting={FadeOut.duration(tokens['motion.duration.state'])} layout={LinearTransition} style={styles.detected}>
              <IconBadge icon={category.icon} tone="vertical" />
              <View>
                <Text variant="caption" color={tokens['color.text.tertiary']}>
                  Category
                </Text>
                <Text variant="label">{category.label}</Text>
              </View>
            </Animated.View>
          ) : null
        }
      />

      <Text variant="label" color={tokens['color.text.secondary']} style={styles.section}>
        Or start with an idea
      </Text>
      <View style={styles.ideas}>
        {quickIdeas.map((idea) => (
          <ChoiceChip
            key={idea.name}
            label={idea.name}
            icon={categories[idea.category].icon}
            selected={draft.name === idea.name}
            onPress={() => setDraft((d) => ({ ...d, name: idea.name, category: idea.category, categoryLocked: true }))}
          />
        ))}
      </View>
    </FlowScreen>
  );
}

const styles = StyleSheet.create({
  detected: { flexDirection: 'row', alignItems: 'center', gap: tokens['space.sm'] },
  section: { marginTop: tokens['space.md'] },
  ideas: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens['space.xs'] },
});
