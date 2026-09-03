import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../shared/theme";

interface GstStepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export const GstStepIndicator: React.FC<GstStepIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <React.Fragment key={step}>
            <View style={styles.stepItem}>
              <View
                style={[
                  styles.circle,
                  isActive && styles.circleActive,
                  isCompleted && styles.circleCompleted,
                ]}
              >
                {isCompleted ? (
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                ) : (
                  <Text
                    style={[
                      styles.numberText,
                      isActive && styles.numberTextActive,
                    ]}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.labelText,
                  (isActive || isCompleted) && styles.labelTextActive,
                ]}
              >
                {step}
              </Text>
            </View>

            {index < steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  isCompleted && styles.lineCompleted,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
  },
  stepItem: {
    alignItems: "center",
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  circleActive: {
    backgroundColor: BrandColors.PRIMARY_ORANGE,
  },
  circleCompleted: {
    backgroundColor: BrandColors.PRIMARY_BLUE,
  },
  numberText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#94A3B8",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  numberTextActive: {
    color: "#FFFFFF",
  },
  labelText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#94A3B8",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  labelTextActive: {
    color: BrandColors.PRIMARY_ORANGE,
    fontWeight: "700",
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 4,
    marginBottom: 16,
  },
  lineCompleted: {
    backgroundColor: BrandColors.PRIMARY_BLUE,
  },
});
