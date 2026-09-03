import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface UploadProgressHeaderProps {
  uploadedCount: number;
  totalCount: number;
}

export const UploadProgressHeader: React.FC<UploadProgressHeaderProps> = ({
  uploadedCount,
  totalCount,
}) => {
  const percent = totalCount > 0 ? (uploadedCount / totalCount) * 100 : 0;
  const isCompleted = uploadedCount === totalCount && totalCount > 0;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.counterText}>
          {uploadedCount} of {totalCount} Documents Uploaded
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {isCompleted ? "Completed" : "In Progress"}
          </Text>
        </View>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.max(percent, 0)}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  counterText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  badge: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 3.5,
  },
  badgeText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#EA580C",
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E2E8F0",
    marginTop: 8,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#F97316",
    borderRadius: 3,
  },
});
