import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AppHeader } from '../../../../shared/components/AppHeader';
import { useTheme } from '../../../../hooks/use-theme';

export const CompletedApplicationsScreen: React.FC = () => {
  const colors = useTheme();

  return (
    <View style={styles.container}>
      <AppHeader title="Completed Applications" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card, { backgroundColor: colors.backgroundElement }]}>
          <Text style={[styles.title, { color: colors.text }]}>GST Registration (GST-2026-9812)</Text>
          <Text style={[styles.desc, { color: colors.success }]}>Completed on 28 Feb 2026</Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16 },
  card: { padding: 16, borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  desc: { fontSize: 13, fontWeight: '600' },
});
export default CompletedApplicationsScreen;
