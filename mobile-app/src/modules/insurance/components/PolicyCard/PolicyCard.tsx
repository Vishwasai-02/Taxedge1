import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../../hooks/use-theme';

interface PolicyCardProps {
  policyNumber: string;
  planName: string;
  provider: string;
  status: string;
  validUntil: string;
}

export const PolicyCard: React.FC<PolicyCardProps> = ({
  policyNumber,
  planName,
  provider,
  status,
  validUntil,
}) => {
  const colors = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
      <View style={styles.topRow}>
        <View>
          <Text style={[styles.provider, { color: colors.textSecondary }]}>{provider}</Text>
          <Text style={[styles.plan, { color: colors.text }]}>{planName}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <Text style={[styles.policyNum, { color: colors.textSecondary }]}>Policy #{policyNumber}</Text>
        <Text style={[styles.validity, { color: colors.textSecondary }]}>Valid until {validUntil}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 12 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  provider: { fontSize: 12, fontWeight: '600' },
  plan: { fontSize: 15, fontWeight: '700', marginTop: 2 },
  statusBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusText: { color: '#15803D', fontSize: 11, fontWeight: '700' },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between' },
  policyNum: { fontSize: 12 },
  validity: { fontSize: 12 },
});
