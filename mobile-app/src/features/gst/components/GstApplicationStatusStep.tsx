import React from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { BrandColors } from "../../../shared/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  status: "completed" | "active" | "pending";
}

const TIMELINE_STEPS: TimelineItem[] = [
  { id: "1", title: "New Request", subtitle: "15 Aug 2026, 10:32 AM", status: "completed" },
  { id: "2", title: "Documents Pending", subtitle: "Checklist sent to customer", status: "completed" },
  { id: "3", title: "Documents Received", subtitle: "All documents uploaded", status: "completed" },
  { id: "4", title: "Verification", subtitle: "Documents under verification", status: "active" },
  { id: "5", title: "Application Prepared", subtitle: "Draft prepared by CA", status: "pending" },
  { id: "6", title: "Submitted to Department", subtitle: "Filed with GST portal", status: "pending" },
  { id: "7", title: "ARN Generated", subtitle: "Acknowledgement number issued", status: "pending" },
  { id: "8", title: "Department Query", subtitle: "If any clarification needed", status: "pending" },
  { id: "9", title: "GST Approved", subtitle: "Registration approved", status: "pending" },
  { id: "10", title: "Certificate Delivered", subtitle: "GSTIN & certificate issued", status: "pending" },
];

export const GstApplicationStatusStep: React.FC = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Hero Application Status Card */}
      <View style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <View>
            <Text style={styles.heroAppIdLabel}>APPLICATION ID</Text>
            <Text style={styles.heroAppIdValue}>GST-2026-00001</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>Under Verification</Text>
          </View>
        </View>

        <View style={styles.heroDetailsRow}>
          <View style={styles.heroCol}>
            <Text style={styles.colLabel}>Service</Text>
            <Text style={styles.colValue}>GST Registration</Text>
          </View>
          <View style={styles.heroCol}>
            <Text style={styles.colLabel}>Applied On</Text>
            <Text style={styles.colValue}>15 Aug 2026</Text>
          </View>
          <View style={styles.heroCol}>
            <Text style={styles.colLabel}>Est. Completion</Text>
            <Text style={styles.colValue}>7-10 Days</Text>
          </View>
        </View>
      </View>

      {/* Application Progress Timeline */}
      <Text style={styles.sectionHeading}>Application Progress</Text>
      <View style={styles.timelineList}>
        {TIMELINE_STEPS.map((step, idx) => {
          const isLast = idx === TIMELINE_STEPS.length - 1;
          return (
            <View key={step.id} style={styles.timelineRow}>
              {/* Timeline Indicator Column */}
              <View style={styles.timelineLeftCol}>
                {step.status === "completed" && (
                  <View style={styles.circleCompleted}>
                    <Ionicons name="checkmark" size={14} color={BrandColors.PRIMARY_ORANGE} />
                  </View>
                )}
                {step.status === "active" && (
                  <View style={styles.circleActive}>
                    <View style={styles.innerDotActive} />
                  </View>
                )}
                {step.status === "pending" && (
                  <View style={styles.circlePending}>
                    <View style={styles.innerDotPending} />
                  </View>
                )}
                {!isLast && (
                  <View
                    style={[
                      styles.timelineTrack,
                      step.status === "completed" && styles.timelineTrackCompleted,
                    ]}
                  />
                )}
              </View>

              {/* Timeline Content */}
              <View style={styles.timelineRightCol}>
                <Text
                  style={[
                    styles.stepTitle,
                    step.status === "pending" && styles.stepTitlePending,
                  ]}
                >
                  {step.title}
                </Text>
                <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Contact Support Action Button */}
      <TouchableOpacity
        style={styles.contactSupportBtn}
        activeOpacity={0.8}
        onPress={() => router.push("/chat/support")}
      >
        <Text style={styles.contactSupportBtnText}>Contact Support</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  heroCard: {
    backgroundColor: BrandColors.PRIMARY_BLUE,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#083B75",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  heroAppIdLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.75)",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  heroAppIdValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 2,
    letterSpacing: 0.5,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  statusBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  statusBadgeText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#92400E",
  },
  heroDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.15)",
    paddingTop: 14,
  },
  heroCol: {
    flex: 1,
  },
  colLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.75)",
    marginBottom: 3,
  },
  colValue: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    marginBottom: 16,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  timelineList: {
    paddingLeft: 4,
    marginBottom: 20,
  },
  timelineRow: {
    flexDirection: "row",
    minHeight: 52,
  },
  timelineLeftCol: {
    alignItems: "center",
    width: 32,
    marginRight: 12,
  },
  circleCompleted: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FEF0E6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD8BF",
  },
  circleActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    justifyContent: "center",
    alignItems: "center",
  },
  innerDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  circlePending: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  innerDotPending: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#CBD5E1",
  },
  timelineTrack: {
    flex: 1,
    width: 2,
    backgroundColor: "#E2E8F0",
    marginVertical: 4,
  },
  timelineTrackCompleted: {
    backgroundColor: "#FFD8BF",
  },
  timelineRightCol: {
    flex: 1,
    paddingBottom: 14,
  },
  stepTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    marginBottom: 2,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  stepTitlePending: {
    color: "#94A3B8",
    fontWeight: "600",
  },
  stepSubtitle: {
    fontSize: 12,
    color: "#64748B",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  contactSupportBtn: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: BrandColors.PRIMARY_ORANGE,
    justifyContent: "center",
    alignItems: "center",
  },
  contactSupportBtnText: {
    fontSize: 14.5,
    fontWeight: "700",
    color: BrandColors.PRIMARY_ORANGE,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
});
