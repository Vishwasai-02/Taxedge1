import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { BrandColors } from "../../../../shared/theme";

interface DocumentProgressProps {
  completedCount: number;
  totalCount: number;
}

export const DocumentProgress: React.FC<DocumentProgressProps> = ({
  completedCount,
  totalCount,
}) => {
  const percentage = totalCount > 0 ? Math.min(100, (completedCount / totalCount) * 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <Text style={styles.instructionText}>
          Upload required documents to proceed.
        </Text>
        <Text style={styles.countText}>
          {completedCount}/{totalCount} Done
        </Text>
      </View>

      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 13.5,
    color: BrandColors.TEXT_SECONDARY,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  countText: {
    fontSize: 13.5,
    fontWeight: "700",
    color: BrandColors.PRIMARY_BLUE,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
    overflow: "hidden",
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    borderRadius: 3,
  },
});
