import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const PreviousYearStepperTimeline: React.FC = () => {
  const steps = [
    { id: "received", label: "Received", type: "completed" as const },
    { id: "verification", label: "Verification", type: "active" as const },
    { id: "filed", label: "Filed", type: "upcoming" as const },
    { id: "processing", label: "Processing", type: "upcoming" as const },
    { id: "credited", label: "Refund\nCredited", type: "upcoming" as const },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.stepsRow}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isFirstConnector = index === 0;

          return (
            <React.Fragment key={step.id}>
              {/* Step Node */}
              <View style={styles.stepNode}>
                {step.type === "completed" && (
                  <View style={styles.completedCircle}>
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  </View>
                )}

                {step.type === "active" && (
                  <View style={styles.activeCircle}>
                    <View style={styles.activeInnerDot} />
                  </View>
                )}

                {step.type === "upcoming" && (
                  <View style={styles.upcomingCircle} />
                )}

                <Text
                  style={[
                    styles.stepLabel,
                    step.type === "completed" && styles.completedLabel,
                    step.type === "active" && styles.activeLabel,
                    step.type === "upcoming" && styles.upcomingLabel,
                  ]}
                  numberOfLines={2}
                >
                  {step.label}
                </Text>
              </View>

              {/* Connector */}
              {!isLast && (
                <View
                  style={[
                    styles.connector,
                    isFirstConnector
                      ? styles.completedConnector
                      : styles.upcomingConnector,
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
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
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
  stepsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  stepNode: {
    alignItems: "center",
    width: 54,
  },
  completedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  activeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: "#F97316",
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
  upcomingCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
    marginBottom: 10,
    marginTop: 2,
  },
  stepLabel: {
    fontSize: 10.5,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 13,
  },
  completedLabel: {
    color: "#16A34A",
  },
  activeLabel: {
    color: "#F97316",
  },
  upcomingLabel: {
    color: "#0B1F3A",
  },
  connector: {
    flex: 1,
    height: 2.5,
    marginTop: 11,
    marginHorizontal: -2,
  },
  completedConnector: {
    backgroundColor: "#16A34A",
  },
  upcomingConnector: {
    backgroundColor: "#E2E8F0",
  },
});
