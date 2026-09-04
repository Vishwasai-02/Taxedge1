import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../../../hooks/use-theme';
import type { InsurancePlan } from '../../types/insurance.types';
import { formatCurrency } from '../../../../shared/formatters/currencyFormatter';

interface InsurancePlanCardProps {
  plan: InsurancePlan;
  onSelect: (plan: InsurancePlan) => void;
}

export const InsurancePlanCard: React.FC<InsurancePlanCardProps> = ({ plan, onSelect }) => {
  const colors = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.provider, { color: colors.primary }]}>{plan.provider}</Text>
          <Text style={[styles.planName, { color: colors.text }]}>{plan.planName}</Text>
        </View>
        <View style={styles.coverBadge}>
          <Text style={styles.coverText}>Cover {formatCurrency(plan.coverAmount)}</Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>CSR</Text>
          <Text style={[styles.metricValue, { color: colors.text }]}>{plan.claimSettlementRatio}%</Text>
        </View>
        {plan.cashlessHospitalsCount && (
          <View style={styles.metric}>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Hospitals</Text>
            <Text style={[styles.metricValue, { color: colors.text }]}>{plan.cashlessHospitalsCount.toLocaleString()}+</Text>
          </View>
        )}
      </View>

      <View style={styles.featuresList}>
        {plan.features.slice(0, 2).map((f, i) => (
          <View key={i} style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={14} color={colors.success} />
            <Text style={[styles.featureText, { color: colors.textSecondary }]}>{f}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footerRow}>
        <View>
          <Text style={[styles.premiumLabel, { color: colors.textSecondary }]}>Starts from</Text>
          <Text style={[styles.premiumValue, { color: colors.primary }]}>{formatCurrency(plan.monthlyPremium)}/mo</Text>
        </View>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => onSelect(plan)}>
          <Text style={styles.buttonText}>View Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 14, borderWidth: 1, marginBottom: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  provider: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  planName: { fontSize: 16, fontWeight: '700', marginTop: 2 },
  coverBadge: { backgroundColor: '#E0F2FE', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  coverText: { color: '#0369A1', fontSize: 12, fontWeight: '700' },
  metricsRow: { flexDirection: 'row', gap: 24, marginBottom: 12 },
  metric: {},
  metricLabel: { fontSize: 11, marginBottom: 2 },
  metricValue: { fontSize: 14, fontWeight: '700' },
  featuresList: { marginBottom: 14 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  featureText: { fontSize: 12 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  premiumLabel: { fontSize: 11 },
  premiumValue: { fontSize: 16, fontWeight: '800' },
  button: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 8 },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
});
