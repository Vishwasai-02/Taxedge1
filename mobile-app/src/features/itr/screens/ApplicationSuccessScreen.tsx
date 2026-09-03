import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SuccessCelebrationHeader } from "../components/success/SuccessCelebrationHeader";
import { FilingProgressTracker } from "../components/success/FilingProgressTracker";
import { ApplicationSummaryCard } from "../components/success/ApplicationSummaryCard";
import { WhatHappensNextCard } from "../components/success/WhatHappensNextCard";
import { ApplicationSummaryData } from "../types/success.types";

interface ApplicationSuccessScreenProps {
  onTrackStatus?: () => void;
  onDownloadAcknowledgement?: () => void;
}

export const ApplicationSuccessScreen: React.FC<ApplicationSuccessScreenProps> = ({
  onTrackStatus,
  onDownloadAcknowledgement,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    applicationId?: string;
    professionTitle?: string;
    formType?: string;
    assessmentYear?: string;
    uploadedDocsCount?: string;
  }>();

  const appId = params.applicationId || "ITR-2026-00042";
  const incomeType = params.professionTitle || "Business";
  const formType = params.formType || "ITR-3";
  const assessmentYear = params.assessmentYear || "AY 2026-27";
  const docsUploaded = params.uploadedDocsCount ? `${params.uploadedDocsCount} of 7` : "7 of 7";

  const summaryData: ApplicationSummaryData = {
    applicationId: appId,
    incomeType,
    itrForm: formType,
    assessmentYear: assessmentYear.startsWith("AY") ? assessmentYear : `AY ${assessmentYear}`,
    documentsUploaded: docsUploaded,
    submissionDate: "10 Aug 2026",
    status: "Received",
  };

  const handleBack = () => {
    router.replace("/service/itr" as any);
  };

  const handleTrackStatus = () => {
    if (onTrackStatus) {
      onTrackStatus();
    } else {
      router.replace({
        pathname: "/(main)/home" as any,
      });
    }
  };

  const handleDownload = () => {
    if (onDownloadAcknowledgement) {
      onDownloadAcknowledgement();
    } else {
      Alert.alert(
        "Acknowledgement Downloaded",
        `Acknowledgement for ${appId} has been saved to your device.`
      );
    }
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
          <Text style={styles.headerTitle}>ITR Filing</Text>
          <Text style={styles.headerSubtitle}>Application Received</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 130 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Celebration Header & ID Card */}
        <SuccessCelebrationHeader applicationId={appId} />

        {/* 6-Stage Progress Tracker */}
        <FilingProgressTracker />

        {/* What We Have Summary Card */}
        <ApplicationSummaryCard summary={summaryData} />

        {/* What Happens Next Card */}
        <WhatHappensNextCard />
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleTrackStatus}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>View Application Status</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleDownload}
          style={styles.secondaryButton}
        >
          <Ionicons name="download-outline" size={18} color="#F97316" />
          <Text style={styles.secondaryButtonText}>Download Acknowledgement</Text>
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
    paddingTop: 8,
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
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  primaryButton: {
    height: 50,
    borderRadius: 14,
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
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15.5,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  secondaryButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#F97316",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  secondaryButtonText: {
    color: "#F97316",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default ApplicationSuccessScreen;
