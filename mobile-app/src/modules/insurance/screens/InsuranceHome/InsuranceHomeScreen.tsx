import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../../hooks/use-theme';
import { ServiceHeader } from '../../../../shared/components/ServiceHeader';
import { InsuranceTypeCard } from '../../components/InsuranceTypeCard/InsuranceTypeCard';

export const InsuranceHomeScreen: React.FC = () => {
  const colors = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <ServiceHeader
        title="Insurance Coverage"
        subtitle="Protect what matters most with top-rated Health, Term Life & Vehicle insurance."
        tag="Protection & Wealth"
        iconName="shield-checkmark"
      />
      <View style={styles.section}>
        <InsuranceTypeCard
          category="HEALTH"
          title="Health Insurance"
          subtitle="Cashless hospitalization, ₹10L - ₹1Cr cover, 80D tax savings"
          icon="fitness"
          onPress={() => router.push('/(main)/applications' as any)}
        />
        <InsuranceTypeCard
          category="TERM"
          title="Term Life Insurance"
          subtitle="High life cover at affordable rates with critical illness cover"
          icon="heart"
          onPress={() => router.push('/(main)/applications' as any)}
        />
        <InsuranceTypeCard
          category="MOTOR"
          title="Car & Two Wheeler"
          subtitle="Instant policy issuance, zero depreciation & roadside support"
          icon="car"
          onPress={() => router.push('/(main)/applications' as any)}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({ container: { flex: 1 }, section: { padding: 16 } });
export default InsuranceHomeScreen;
