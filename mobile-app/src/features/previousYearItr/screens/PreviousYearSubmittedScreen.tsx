import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PreviousYearSuccessCard } from "../components/submission/PreviousYearSuccessCard";
import { PreviousYearStepperTimeline } from "../components/submission/PreviousYearStepperTimeline";
import { PreviousYearStatusInfoCard } from "../components/submission/PreviousYearStatusInfoCard";
import { WhatHappensNextInfoCard } from "../components/submission/WhatHappensNextInfoCard";
import { PreviousYearSubmissionDetails } from "../types/submission.types";

export const PreviousYearSubmittedScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    applicationId?: string;
    assessmentYear?: string;
  }>();

  const applicationId = params.applicationId || "ITR-2026-00046";
  const assessmentYear = params.assessmentYear || "AY 2023–24";

  const details: PreviousYearSubmissionDetails = {
    applicationId,
    applicationStatus: "Under Verification",
    assessmentYear,
    assignedTo: "Tax Executive",
    estimatedProcessingTime: "3–5 Working Days",
    notificationMethod: "SMS & Email",
  };

  const handleBack = () => {
    router.replace("/service/itr" as any);
  };

  const handleTrackStatus = () => {
    router.replace("/(main)/home" as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBack}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color="#0B1F3A" />
        </TouchableOpacity>

        <View style={styles.headerTitleGroup}>
          <Text style={styles.headerTitle}>Previous Year ITR</Text>
          <Text style={styles.headerSubtitle}>Application Submitted</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Card with Green Checkmark & Application ID */}
        <PreviousYearSuccessCard applicationId={applicationId} />

        {/* 5-Stage Stepper Timeline */}
        <PreviousYearStepperTimeline />

        {/* Status Information Card */}
        <PreviousYearStatusInfoCard details={details} />

        {/* What Happens Next Information Card */}
        <WhatHappensNextInfoCard />
      </ScrollView>

      {/* Bottom Sticky Action Button */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleTrackStatus}
          style={styles.trackButton}
        >
          <Text style={styles.trackButtonText}>Track Application Status</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  headerTitleGroup: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B1F3A",
    letterSpacing: -0.2,
  },
  headerSubtitle: {
    fontSize: 12.5,
    fontWeight: "500",
    color: "#0B1F3A",
    marginTop: 2,
  },
  headerRightSpacer: {
    width: 38,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  trackButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F97316",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  trackButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});

export default PreviousYearSubmittedScreen;
