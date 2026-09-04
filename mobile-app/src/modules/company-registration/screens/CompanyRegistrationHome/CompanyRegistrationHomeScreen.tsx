import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../../hooks/use-theme';
import { ServiceHeader } from '../../../../shared/components/ServiceHeader';
import { companyRegistrationService } from '../../services/companyRegistrationService';
import { CompanyTypeCard } from '../../components/CompanyTypeCard/CompanyTypeCard';
import type { CompanyTypeOption } from '../../services/companyRegistrationService';

export const CompanyRegistrationHomeScreen: React.FC = () => {
  const colors = useTheme();
  const router = useRouter();
  const companyTypes = companyRegistrationService.getCompanyTypes();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <ServiceHeader
        title="Company Registration"
        subtitle="Incorporate your business in India with full MCA, GST & PAN compliance."
        tag="Corporate Services"
        iconName="business"
      />
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Choose Entity Type</Text>
        {companyTypes.map((item) => (
          <CompanyTypeCard
            key={item.type}
            item={item}
            selected={false}
            onSelect={() => router.push('/(main)/applications' as any)}
          />
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
});
export default CompanyRegistrationHomeScreen;
