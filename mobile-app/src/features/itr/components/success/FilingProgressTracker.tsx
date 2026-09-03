import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const FilingProgressTracker: React.FC = () => {
  const steps = [
    { id: "received", label: "Received", icon: "document-text" as const, active: true },
    { id: "verification", label: "Verification", icon: "search" as const, active: false },
    { id: "preparation", label: "Preparation", icon: "receipt" as const, active: false },
    { id: "approval", label: "Your Approval", icon: "person" as const, active: false },
    { id: "filed", label: "Filed", icon: "send" as const, active: false },
    { id: "everified", label: "E-verified", icon: "shield-checkmark" as const, active: false },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.stepsRow}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              {/* Step Node */}
              <View style={styles.stepNode}>
                <View
                  style={[
                    styles.iconCircle,
                    step.active ? styles.activeCircle : styles.inactiveCircle,
                  ]}
                >
                  <Ionicons
                    name={step.icon}
                    size={14}
                    color={step.active ? "#FFFFFF" : "#64748B"}
                  />
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    step.active ? styles.activeLabel : styles.inactiveLabel,
                  ]}
                  numberOfLines={1}
                >
                  {step.label}
                </Text>
              </View>

              {/* Dashed connector line */}
              {!isLast && <View style={styles.connector} />}
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
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 16,
    marginBottom: 14,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepNode: {
    alignItems: "center",
    width: 48,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  activeCircle: {
    backgroundColor: "#F97316",
    ...Platform.select({
      ios: {
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  inactiveCircle: {
    backgroundColor: "#F1F5F9",
  },
  stepLabel: {
    fontSize: 9.5,
    fontWeight: "600",
    textAlign: "center",
  },
  activeLabel: {
    color: "#F97316",
    fontWeight: "700",
  },
  inactiveLabel: {
    color: "#64748B",
  },
  connector: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
    marginBottom: 18,
  },
});
