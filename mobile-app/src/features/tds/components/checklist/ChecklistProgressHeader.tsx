import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ChecklistProgressHeaderProps {
  uploadedCount: number;
  totalCount: number;
}

export const ChecklistProgressHeader: React.FC<ChecklistProgressHeaderProps> = ({
  uploadedCount,
  totalCount,
}) => {
  const percentage = Math.round((uploadedCount / totalCount) * 100);

  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <Text style={styles.counterText}>
          <Text style={styles.counterHighlight}>{uploadedCount}</Text> of {totalCount} uploaded
        </Text>

        <View style={styles.statusBadge}>
          <View style={styles.bulletDot} />
          <Text style={styles.statusBadgeText}>
            {uploadedCount === totalCount ? "Completed" : "In progress"}
          </Text>
        </View>
      </View>

      {/* Progress Bar Track */}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  counterText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  counterHighlight: {
    color: "#F97316",
    fontSize: 15,
    fontWeight: "800",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#F97316",
    marginRight: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#EA580C",
  },
  track: {
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#F97316",
    borderRadius: 2.5,
  },
});
