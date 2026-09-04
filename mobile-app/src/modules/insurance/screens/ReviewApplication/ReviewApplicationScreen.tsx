import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AppHeader } from '../../../../shared/components/AppHeader';
import { Button } from '../../../../shared/components/Button/Button';
import { useInsuranceStore } from '../../store/insuranceSlice';
import { useTheme } from '../../../../hooks/use-theme';

export const ReviewApplicationScreen: React.FC = () => {
  const colors = useTheme();
  const plan = useInsuranceStore((s) => s.selectedPlan);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Review Proposal" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card, { backgroundColor: colors.backgroundElement }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Selected Insurance Plan</Text>
          <Text style={[styles.cardValue, { color: colors.textSecondary }]}>{plan?.provider} - {plan?.planName}</Text>
          <Text style={[styles.cardValue, { color: colors.textSecondary }]}>Coverage: ₹{plan?.coverAmount?.toLocaleString()}</Text>
        </View>
        <Button title="Pay Premium" onPress={() => {}} variant="primary" />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16 },
  card: { padding: 16, borderRadius: 12, marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  cardValue: { fontSize: 14, marginBottom: 4 },
});
export default ReviewApplicationScreen;
