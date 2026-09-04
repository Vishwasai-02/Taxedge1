import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AppHeader } from '../../../../shared/components/AppHeader';
import { StatusTimeline } from '../../../../shared/components/ProgressStepper/StatusTimeline';
import type { TimelineStep } from '../../../../shared/types/domain';

export const ApplicationDetailsScreen: React.FC = () => {
  const steps: TimelineStep[] = [
    { title: 'Application Submitted', description: 'Documents received', status: 'completed', date: '01 Mar 2026' },
    { title: 'Verification by Officer', description: 'Assigned specialist reviewing documents', status: 'current', date: 'Under Review' },
    { title: 'Final Approval & Certificate', description: 'Digital certificate generation', status: 'pending' },
  ];

  return (
    <View style={styles.container}>
      <AppHeader title="Application Tracking" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <StatusTimeline steps={steps} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({ container: { flex: 1 }, scroll: { padding: 16 } });
export default ApplicationDetailsScreen;
