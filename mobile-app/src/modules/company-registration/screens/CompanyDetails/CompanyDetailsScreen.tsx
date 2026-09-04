import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppHeader } from '../../../../shared/components/AppHeader';
import { CompanyDetailsForm } from '../../components/CompanyDetailsForm/CompanyDetailsForm';
import { useCompanyRegistration } from '../../hooks/useCompanyRegistration';

export const CompanyDetailsScreen: React.FC = () => {
  const { draft, updateCompanyDetails } = useCompanyRegistration();

  return (
    <View style={styles.container}>
      <AppHeader title="Company Details" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <CompanyDetailsForm
          values={draft.company}
          onChange={updateCompanyDetails}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({ container: { flex: 1 }, scroll: { padding: 16 } });
export default CompanyDetailsScreen;
