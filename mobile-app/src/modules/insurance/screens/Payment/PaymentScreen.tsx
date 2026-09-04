import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AppHeader } from '../../../../shared/components/AppHeader';
import { Button } from '../../../../shared/components/Button/Button';
import { useInsuranceQuotes } from '../../hooks/useInsuranceQuotes';
import { formatCurrencyINR } from '../../../../shared/formatters/currencyFormatter';
import { useTheme } from '../../../../hooks/use-theme';

export const PaymentScreen: React.FC = () => {
  const colors = useTheme();
  const { grandTotal } = useInsuranceQuotes();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Pay Insurance Premium" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card, { backgroundColor: colors.backgroundElement }]}>
          <Text style={[styles.title, { color: colors.text }]}>Total Payable</Text>
          <Text style={[styles.amount, { color: colors.primary }]}>{formatCurrencyINR(grandTotal)}</Text>
          <Text style={[styles.note, { color: colors.textSecondary }]}>Instant Policy issuance on successful payment verification.</Text>
        </View>
        <Button title="Proceed to Checkout" onPress={() => {}} variant="primary" />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16 },
  card: { padding: 16, borderRadius: 12, marginBottom: 16, alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '700' },
  amount: { fontSize: 28, fontWeight: '800', marginVertical: 12 },
  note: { fontSize: 13, textAlign: 'center' },
});
export default PaymentScreen;
