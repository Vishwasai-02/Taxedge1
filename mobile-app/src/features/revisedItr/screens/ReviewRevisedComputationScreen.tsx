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
import { RevisedItrHeader } from "../components/common/RevisedItrHeader";
import { ComputationComparisonTable } from "../components/review/ComputationComparisonTable";
import { RevisedRefundHeroCard } from "../components/review/RevisedRefundHeroCard";

export const ReviewRevisedComputationScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    acknowledgementNumber?: string;
    assessmentYear?: string;
    revisionReason?: string;
  }>();

  const assessmentYear = params.assessmentYear || "AY 2025–26";

  const handleProceedPayment = () => {
    // Navigate to Application Received / Success screen with Revised ITR details
    router.push({
      pathname: "/service/itr-success" as any,
      params: {
        serviceType: "revised",
        serviceTitle: "Revised ITR",
        assessmentYear,
        applicationId: "REV-2026-00052",
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <RevisedItrHeader subtitle="Review & Submit" />

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Pill Badge */}
        <View style={styles.badgeWrapper}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>
              • Revised Return • {assessmentYear}
            </Text>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>
            Please review your revised computation
          </Text>
          <Text style={styles.pageSubtitle}>
            Same review, approval, filing and e-verification as regular ITR
            Filing — labelled as a revision.
          </Text>
        </View>

        {/* 5-Row Comparison Table */}
        <ComputationComparisonTable />

        {/* Revised Refund Summary Card */}
        <RevisedRefundHeroCard />

        {/* Confirmation Note Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconCircle}>
            <Ionicons name="information" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.infoText}>
            By submitting, you confirm that the above details are correct and you
            want to file a revised return for {assessmentYear}.
          </Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Button */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleProceedPayment}
          style={styles.proceedButton}
        >
          <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  badgeWrapper: {
    alignItems: "flex-start",
    marginBottom: 10,
  },
  statusBadge: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3.5,
  },
  statusBadgeText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#EA580C",
  },
  titleSection: {
    marginBottom: 14,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  pageSubtitle: {
    fontSize: 12.5,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 18,
    fontWeight: "400",
  },
  infoCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 2,
    marginBottom: 16,
  },
  infoIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 1,
  },
  infoText: {
    flex: 1,
    fontSize: 11.5,
    color: "#475569",
    lineHeight: 16,
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
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  proceedButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
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
  proceedButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});

export default ReviewRevisedComputationScreen;
