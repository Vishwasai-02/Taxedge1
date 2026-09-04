import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppHeader } from '../../../../shared/components/AppHeader';
import { DocumentChecklist } from '../../components/DocumentChecklist/DocumentChecklist';
import type { ApplicationDocument } from '../../../../shared/types/domain';

export const CompanyDocumentsScreen: React.FC = () => {
  const docs: ApplicationDocument[] = [
    { name: 'PAN Card of all Directors', status: 'Uploaded' },
    { name: 'Aadhaar / Passport / Voter ID', status: 'Uploaded' },
    { name: 'Bank Statement / Electricity Bill', status: 'Pending' },
    { name: 'NOC from Property Owner', status: 'Pending' },
  ];

  return (
    <View style={styles.container}>
      <AppHeader title="Company Documents" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <DocumentChecklist documents={docs} onUpload={() => {}} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({ container: { flex: 1 }, scroll: { padding: 16 } });
export default CompanyDocumentsScreen;
