import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AppHeader } from '../../../../shared/components/AppHeader';
import { Button } from '../../../../shared/components/Button/Button';
import { useCompanyRegistration } from '../../hooks/useCompanyRegistration';
import { useTheme } from '../../../../hooks/use-theme';

export const ReviewApplicationScreen: React.FC = () => {
  const colors = useTheme();
  const { draft } = useCompanyRegistration();
  const details = draft.company;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Review Incorporation" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card, { backgroundColor: colors.backgroundElement }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Proposed Names</Text>
          <Text style={[styles.cardValue, { color: colors.textSecondary }]}>Option 1: {details.proposedName1 || 'Not specified'}</Text>
          <Text style={[styles.cardValue, { color: colors.textSecondary }]}>Option 2: {details.proposedName2 || 'Not specified'}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: colors.backgroundElement }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Entity Type</Text>
          <Text style={[styles.cardValue, { color: colors.textSecondary }]}>{details.companyType}</Text>
        </View>
        <Button title="Submit Application" onPress={() => {}} variant="primary" />
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
