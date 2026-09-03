import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const RefundProgressTracker: React.FC = () => {
  const stages = [
    { id: "submitted", label: "Application\nSubmitted", state: "completed" as const },
    { id: "payment", label: "Payment\nCompleted", state: "completed" as const },
    { id: "verification", label: "Under\nVerification", state: "active" as const },
    { id: "filed", label: "Refund\nFiled", state: "pending" as const },
    { id: "processing", label: "Refund\nProcessing", state: "pending" as const },
    { id: "credited", label: "Refund\nCredited", state: "pending" as const },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.stagesRow}>
        {stages.map((stage, index) => {
          const isLast = index === stages.length - 1;
          const isOrangeConnector = index < 2;

          return (
            <React.Fragment key={stage.id}>
              {/* Stage Node */}
              <View style={styles.stageNode}>
                {stage.state === "completed" && (
                  <View style={styles.completedCircle}>
                    <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                  </View>
                )}

                {stage.state === "active" && (
                  <View style={styles.activeCircle}>
                    <View style={styles.activeInnerDot} />
                  </View>
                )}

                {stage.state === "pending" && (
                  <View style={styles.pendingCircle} />
                )}

                <Text
                  style={[
                    styles.stageLabel,
                    stage.state === "active" && styles.activeLabel,
                    stage.state === "completed" && styles.completedLabel,
                    stage.state === "pending" && styles.pendingLabel,
                  ]}
                  numberOfLines={2}
                >
                  {stage.label}
                </Text>
              </View>

              {/* Connecting Line */}
              {!isLast && (
                <View
                  style={[
                    styles.connector,
                    isOrangeConnector
                      ? styles.orangeConnector
                      : styles.greyConnector,
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 16,
    marginBottom: 14,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  stagesRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  stageNode: {
    alignItems: "center",
    width: 48,
  },
  completedCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  activeCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2.2,
    borderColor: "#0B1F3A",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  activeInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F97316",
  },
  pendingCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    marginTop: 1,
  },
  stageLabel: {
    fontSize: 9,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 12,
  },
  completedLabel: {
    color: "#0B1F3A",
    fontWeight: "700",
  },
  activeLabel: {
    color: "#0B1F3A",
    fontWeight: "800",
  },
  pendingLabel: {
    color: "#64748B",
  },
  connector: {
    flex: 1,
    height: 2,
    marginTop: 10,
    marginHorizontal: -4,
  },
  orangeConnector: {
    backgroundColor: "#F97316",
  },
  greyConnector: {
    backgroundColor: "#E2E8F0",
  },
});
