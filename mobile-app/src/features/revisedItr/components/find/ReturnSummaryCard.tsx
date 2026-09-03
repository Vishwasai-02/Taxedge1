import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { OriginalReturnDetails } from "../../types/revisedItr.types";

interface ReturnSummaryCardProps {
  details: OriginalReturnDetails;
}

export const ReturnSummaryCard: React.FC<ReturnSummaryCardProps> = ({ details }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
        </View>
        <View style={styles.headerTextGroup}>
          <Text style={styles.cardTitle}>Original Return Found</Text>
          <Text style={styles.ackNumber}>Ack No: {details.acknowledgementNumber}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>{details.filingStatus}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailsGrid}>
        <View style={styles.row}>
          <Text style={styles.label}>Filing Date</Text>
          <Text style={styles.value}>{details.filingDate}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Assessment Year</Text>
          <Text style={styles.value}>{details.assessmentYear}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>ITR Form</Text>
          <Text style={styles.value}>{details.itrForm}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Gross Total Income</Text>
          <Text style={[styles.value, styles.incomeValue]}>
            {details.grossTotalIncome}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#86EFAC",
    marginTop: 16,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#16A34A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
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
  },
  iconCircle: {
    marginRight: 10,
  },
  headerTextGroup: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  ackNumber: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 1.5,
  },
  statusBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#16A34A",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 12,
  },
  detailsGrid: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  value: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  incomeValue: {
    color: "#EA580C",
  },
});
