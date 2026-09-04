import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppHeader } from '../../../../shared/components/AppHeader';
import { FormInput } from '../../../../shared/components/Input/FormInput';
import { useCompanyRegistration } from '../../hooks/useCompanyRegistration';

export const CapitalDetailsScreen: React.FC = () => {
  const { draft, updateCompanyDetails } = useCompanyRegistration();

  return (
    <View style={styles.container}>
      <AppHeader title="Capital & Share Structure" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <FormInput
          label="Authorized Capital (₹)"
          value={String(draft.company.authorizedCapital)}
          onChangeText={(v) => updateCompanyDetails({ authorizedCapital: Number(v) || 0 })}
          keyboardType="numeric"
        />
        <FormInput
          label="Paid-up Capital (₹)"
          value={String(draft.company.paidUpCapital)}
          onChangeText={(v) => updateCompanyDetails({ paidUpCapital: Number(v) || 0 })}
          keyboardType="numeric"
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({ container: { flex: 1 }, scroll: { padding: 16, gap: 12 } });
export default CapitalDetailsScreen;
