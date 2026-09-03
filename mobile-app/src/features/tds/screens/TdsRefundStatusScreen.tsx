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
import { RefundProgressTracker } from "../components/status/RefundProgressTracker";
import { RefundDetailsCard } from "../components/status/RefundDetailsCard";
import { VerificationStatusCard } from "../components/status/VerificationStatusCard";
import { NextStepsTimeline } from "../components/status/NextStepsTimeline";
import { StatusNotificationCard } from "../components/status/StatusNotificationCard";
import { SupportCard } from "../components/status/SupportCard";
import { DEFAULT_TDS_STATUS_DETAILS } from "../mock/statusData";
import { TdsRefundStatusDetails } from "../types/status.types";

export const TdsRefundStatusScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    applicationId?: string;
    refundAmount?: string;
  }>();

  const details: TdsRefundStatusDetails = {
    applicationId: params.applicationId || DEFAULT_TDS_STATUS_DETAILS.applicationId,
    filedOn: DEFAULT_TDS_STATUS_DETAILS.filedOn,
    estimatedRefund: params.refundAmount || DEFAULT_TDS_STATUS_DETAILS.estimatedRefund,
    refundToBank: DEFAULT_TDS_STATUS_DETAILS.refundToBank,
    expectedProcessingTime: DEFAULT_TDS_STATUS_DETAILS.expectedProcessingTime,
  };

  const handleBack = () => {
    router.replace("/service/itr" as any);
  };

  const handleTaxServices = () => {
    router.replace("/service/itr" as any);
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
          <Text style={styles.headerTitle}>TDS Refund</Text>
          <Text style={styles.headerSubtitle}>Refund Status</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Page Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Your Refund Status</Text>
          <Text style={styles.pageSubtitle}>
            Track your refund request in real time. We’ll notify you
            automatically whenever your application moves to the next stage.
          </Text>
        </View>

        {/* 6-Stage Horizontal Progress Tracker */}
        <RefundProgressTracker />

        {/* 5-Row Refund Details Card */}
        <RefundDetailsCard details={details} />

        {/* Current Status Card: Under Verification */}
        <VerificationStatusCard />

        {/* Vertical Next Steps Timeline */}
        <NextStepsTimeline />

        {/* Automated Notification Notice */}
        <StatusNotificationCard />

        {/* Need Help Support Card */}
        <SupportCard />
      </ScrollView>

      {/* Sticky Bottom Action */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleTaxServices}
          style={styles.ctaButton}
        >
          <Ionicons name="business-outline" size={18} color="#FFFFFF" />
          <Text style={styles.ctaButtonText}>Back to Tax Services</Text>
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
    paddingTop: 16,
  },
  titleSection: {
    marginBottom: 2,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: -0.2,
  },
  pageSubtitle: {
    fontSize: 12.5,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 18,
    fontWeight: "400",
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
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  ctaButton: {
    height: 52,
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
  ctaButtonText: {
    color: "#FFFFFF",
    fontSize: 15.5,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});

export default TdsRefundStatusScreen;
