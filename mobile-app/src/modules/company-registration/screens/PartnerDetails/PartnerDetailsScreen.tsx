import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppHeader } from '../../../../shared/components/AppHeader';
import { PartnerForm } from '../../components/PartnerForm/PartnerForm';
import { useDirectors } from '../../hooks/useDirectors';

export const PartnerDetailsScreen: React.FC = () => {
  const { addPartner } = useDirectors();

  return (
    <View style={styles.container}>
      <AppHeader title="Partner Details (LLP)" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <PartnerForm onAddPartner={addPartner} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({ container: { flex: 1 }, scroll: { padding: 16 } });
export default PartnerDetailsScreen;
