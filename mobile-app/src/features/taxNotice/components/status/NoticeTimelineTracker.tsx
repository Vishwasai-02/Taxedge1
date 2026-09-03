import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NoticeTrackingStep } from "../../types/taxNotice.types";

interface NoticeTimelineTrackerProps {
  steps: NoticeTrackingStep[];
}

export const NoticeTimelineTracker: React.FC<NoticeTimelineTrackerProps> = ({
  steps,
}) => {
  return (
    <View style={styles.card}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isCompleted = step.status === "completed";

        return (
          <View key={step.id} style={styles.stepRow}>
            {/* Left Node & Connector */}
            <View style={styles.nodeColumn}>
              {isCompleted ? (
                <View style={styles.completedCircle}>
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                </View>
              ) : (
                <View style={styles.pendingCircle} />
              )}
              {!isLast && (
                <View
                  style={[
                    styles.connectorLine,
                    isCompleted ? styles.completedLine : styles.pendingLine,
                  ]}
                />
              )}
            </View>

            {/* Right Text Details */}
            <View style={styles.contentColumn}>
              <View style={styles.titleRow}>
                <Text
                  style={[
                    styles.stepTitle,
                    isCompleted ? styles.completedTitle : styles.pendingTitle,
                  ]}
                >
                  {step.title}
                </Text>
                <Text style={styles.stepDate}>{step.date}</Text>
              </View>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  stepRow: {
    flexDirection: "row",
  },
  nodeColumn: {
    alignItems: "center",
    width: 28,
    marginRight: 10,
  },
  completedCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  pendingCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    zIndex: 2,
  },
  connectorLine: {
    width: 2,
    flex: 1,
    marginVertical: 2,
  },
  completedLine: {
    backgroundColor: "#16A34A",
  },
  pendingLine: {
    backgroundColor: "#E2E8F0",
  },
  contentColumn: {
    flex: 1,
    paddingBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepTitle: {
    fontSize: 13.5,
    fontWeight: "700",
  },
  completedTitle: {
    color: "#16A34A",
  },
  pendingTitle: {
    color: "#0B1F3A",
  },
  stepDate: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "500",
  },
  stepDescription: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 2,
    lineHeight: 15,
  },
});
