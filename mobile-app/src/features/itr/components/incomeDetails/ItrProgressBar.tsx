import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ItrProgressBarProps {
  currentStep?: number;
  totalSteps?: number;
}

export const ItrProgressBar: React.FC<ItrProgressBarProps> = ({
  currentStep = 2,
  totalSteps = 5,
}) => {
  const percentage = Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100);

  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>
        Step {currentStep} of {totalSteps}
      </Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  stepText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  track: {
    flex: 1,
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#F97316",
    borderRadius: 3,
  },
});
