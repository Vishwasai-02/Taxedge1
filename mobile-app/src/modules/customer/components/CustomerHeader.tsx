import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/use-theme';

export const CustomerHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  const colors = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {subtitle && <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({ container: { marginBottom: 16 }, title: { fontSize: 20, fontWeight: '700' }, subtitle: { fontSize: 13, marginTop: 4 } });
export default CustomerHeader;
