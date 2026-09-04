import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppHeader } from '../../../../shared/components/AppHeader';
import { InsuranceHomeScreen } from '../InsuranceHome/InsuranceHomeScreen';

export const InsuranceTypesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <AppHeader title="All Insurance Types" showBack />
      <InsuranceHomeScreen />
    </View>
  );
};
const styles = StyleSheet.create({ container: { flex: 1 } });
export default InsuranceTypesScreen;
