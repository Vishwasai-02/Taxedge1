import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { PreviousYearSubmissionDetails } from "../../types/submission.types";

interface PreviousYearStatusInfoCardProps {
  details: PreviousYearSubmissionDetails;
}

export const PreviousYearStatusInfoCard: React.FC<
  PreviousYearStatusInfoCardProps
> = ({ details }) => {
  const rows = [
    {
      id: "status",
      label: "Application Status",
      value: details.applicationStatus,
      isStatusBadge: true,
    },
    {
      id: "ay",
      label: "Assessment Year",
      value: details.assessmentYear,
      isStatusBadge: false,
    },
    {
      id: "assigned",
      label: "Assigned To",
      value: details.assignedTo,
      isStatusBadge: false,
    },
    {
      id: "time",
      label: "Estimated Processing Time",
      value: details.estimatedProcessingTime,
      isStatusBadge: false,
    },
    {
      id: "notification",
      label: "Notification Method",
      value: details.notificationMethod,
      isStatusBadge: false,
    },
  ];

  return (
    <View style={styles.card}>
      {rows.map((row, index) => {
        const isLast = index === rows.length - 1;

        return (
          <View
            key={row.id}
            style={[styles.row, !isLast && styles.rowBorder]}
          >
            <Text style={styles.label}>{row.label}</Text>

            {row.isStatusBadge ? (
              <View style={styles.statusPill}>
                <View style={styles.orangeDot} />
                <Text style={styles.statusText}>{row.value}</Text>
              </View>
            ) : (
              <Text style={styles.value}>{row.value}</Text>
            )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 14,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 11,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    borderStyle: "dashed",
  },
  label: {
    fontSize: 12.5,
    color: "#64748B",
    fontWeight: "500",
  },
  value: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
  },
  orangeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EA580C",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#EA580C",
  },
});
