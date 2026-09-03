import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ApplicationSummaryData } from "../../types/success.types";

interface ApplicationSummaryCardProps {
  summary: ApplicationSummaryData;
}

export const ApplicationSummaryCard: React.FC<ApplicationSummaryCardProps> = ({
  summary,
}) => {
  const rows = [
    { label: "Income Type", value: summary.incomeType },
    { label: "Form", value: summary.itrForm },
    { label: "Assessment Year", value: summary.assessmentYear },
    { label: "Documents Uploaded", value: summary.documentsUploaded },
  ];

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="document-text" size={18} color="#F97316" />
        </View>
        <Text style={styles.cardTitle}>What we have</Text>
      </View>

      {/* Summary Rows */}
      <View style={styles.rowsContainer}>
        {rows.map((row, index) => {
          const isLast = index === rows.length - 1;
          return (
            <View
              key={row.label}
              style={[
                styles.row,
                !isLast && styles.rowBorder,
              ]}
            >
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowValue}>{row.value}</Text>
            </View>
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
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  rowsContainer: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    borderStyle: "dashed",
  },
  rowLabel: {
    fontSize: 13.5,
    color: "#64748B",
    fontWeight: "500",
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B1F3A",
  },
});
