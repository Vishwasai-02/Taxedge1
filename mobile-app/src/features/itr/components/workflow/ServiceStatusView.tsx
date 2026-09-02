import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors, Shadows } from "../../../../shared/theme";
import { WORKFLOW_TIMELINE_STEPS } from "../../types/workflowTypes";

interface ServiceStatusViewProps {
  appId: string;
  serviceName: string;
  onReturnHome: () => void;
}

export const ServiceStatusView: React.FC<ServiceStatusViewProps> = ({
  appId,
  serviceName,
  onReturnHome,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* Hero Card matching Screenshot 2 */}
      <View style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <View>
            <Text style={styles.appIdLabel}>APPLICATION ID</Text>
            <Text style={styles.appIdText}>{appId}</Text>
          </View>
          <View style={styles.processingPill}>
            <Text style={styles.processingPillText}>Processing</Text>
          </View>
        </View>

        <View style={styles.heroMetaRow}>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>Service</Text>
            <Text style={styles.metaValue} numberOfLines={1}>
              {serviceName}
            </Text>
          </View>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>AY</Text>
            <Text style={styles.metaValue}>2025-26</Text>
          </View>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>Applied</Text>
            <Text style={styles.metaValue}>10 Aug 2026</Text>
          </View>
        </View>
      </View>

      {/* Filing Progress Title */}
      <Text style={styles.timelineHeading}>Filing Progress</Text>

      {/* 11 Steps Progress List matching Screenshot 4 */}
      <View style={styles.timelineCard}>
        {WORKFLOW_TIMELINE_STEPS.map((step, idx) => {
          const isCompleted = step.status === "completed";
          const isCurrent = step.status === "current";

          return (
            <View key={step.id} style={styles.timelineStepRow}>
              {/* Left Indicator Column */}
              <View style={styles.dotCol}>
                <View
                  style={[
                    styles.circleIcon,
                    isCompleted && styles.circleCompleted,
                    isCurrent && styles.circleCurrent,
                  ]}
                >
                  {isCompleted ? (
                    <Ionicons name="checkmark" size={14} color={BrandColors.PRIMARY_BLUE} />
                  ) : isCurrent ? (
                    <View style={styles.currentInnerDot} />
                  ) : (
                    <View style={styles.pendingDot} />
                  )}
                </View>

                {idx < WORKFLOW_TIMELINE_STEPS.length - 1 && (
                  <View
                    style={[
                      styles.verticalLine,
                      isCompleted && styles.verticalLineDone,
                    ]}
                  />
                )}
              </View>

              {/* Right Content Column */}
              <View style={styles.stepContentCol}>
                <Text
                  style={[
                    styles.stepTitle,
                    isCurrent && styles.stepTitleCurrent,
                    !isCompleted && !isCurrent && styles.stepTitlePending,
                  ]}
                >
                  {step.title}
                </Text>
                {step.timestamp ? (
                  <Text style={styles.stepTimestamp}>{step.timestamp}</Text>
                ) : null}
                <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Action Buttons */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Alert.alert("TaxEdge Support", "A CA Advisor is available 24/7 on WhatsApp & in-app chat.")}
        style={styles.supportBtn}
      >
        <Text style={styles.supportBtnText}>Contact Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onReturnHome}
        style={styles.homeBtn}
      >
        <Text style={styles.homeBtnText}>Return to Home Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: BrandColors.PRIMARY_BLUE,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    ...Shadows.md,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  appIdLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#93C5FD",
    letterSpacing: 0.8,
  },
  appIdText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 2,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  processingPill: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  processingPillText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  heroMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.15)",
  },
  metaCol: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 11,
    color: "#CBD5E1",
  },
  metaValue: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 2,
  },
  timelineHeading: {
    fontSize: 16,
    fontWeight: "800",
    color: BrandColors.PRIMARY_BLUE,
    marginBottom: 12,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  timelineCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    marginBottom: 20,
    ...Shadows.sm,
  },
  timelineStepRow: {
    flexDirection: "row",
    minHeight: 58,
  },
  dotCol: {
    width: 28,
    alignItems: "center",
    marginRight: 14,
  },
  circleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.8,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  circleCompleted: {
    borderColor: BrandColors.PRIMARY_BLUE,
    backgroundColor: BrandColors.PRIMARY_LIGHT_BLUE,
  },
  circleCurrent: {
    borderColor: BrandColors.PRIMARY_ORANGE,
    backgroundColor: BrandColors.PRIMARY_LIGHT_ORANGE,
  },
  currentInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
  },
  pendingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#CBD5E1",
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 4,
  },
  verticalLineDone: {
    backgroundColor: BrandColors.PRIMARY_LIGHT_BLUE,
  },
  stepContentCol: {
    flex: 1,
    paddingBottom: 16,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  stepTitleCurrent: {
    color: BrandColors.PRIMARY_BLUE,
    fontWeight: "800",
  },
  stepTitlePending: {
    color: BrandColors.TEXT_MUTED,
  },
  stepTimestamp: {
    fontSize: 11,
    color: BrandColors.TEXT_MUTED,
    marginTop: 2,
  },
  stepSubtitle: {
    fontSize: 12,
    color: BrandColors.TEXT_SECONDARY,
    marginTop: 2,
  },
  supportBtn: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: BrandColors.PRIMARY_BLUE,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    ...Shadows.sm,
  },
  supportBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: BrandColors.PRIMARY_BLUE,
  },
  homeBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.sm,
  },
  homeBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
});
