import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../../hooks/use-theme';
import { formatCurrency } from '../../../../shared/formatters/currencyFormatter';

interface QuoteCardProps {
  baseAmount: number;
  taxAmount: number;
  totalAmount: number;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ baseAmount, taxAmount, totalAmount }) => {
  const colors = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Premium Summary</Text>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Base Premium</Text>
        <Text style={[styles.value, { color: colors.text }]}>{formatCurrency(baseAmount)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>GST (18%)</Text>
        <Text style={[styles.value, { color: colors.text }]}>{formatCurrency(taxAmount)}</Text>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={styles.row}>
        <Text style={[styles.totalLabel, { color: colors.text }]}>Total Payable</Text>
        <Text style={[styles.totalValue, { color: colors.primary }]}>{formatCurrency(totalAmount)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 16 },
  heading: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { fontSize: 14 },
  value: { fontSize: 14, fontWeight: '600' },
  divider: { height: 1, marginVertical: 8 },
  totalLabel: { fontSize: 15, fontWeight: '700' },
  totalValue: { fontSize: 18, fontWeight: '800' },
});
