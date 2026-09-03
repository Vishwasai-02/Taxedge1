import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TaxComputationData } from "../../types/computation.types";

interface TaxSummaryCardProps {
  computation: TaxComputationData;
}

export const TaxSummaryCard: React.FC<TaxSummaryCardProps> = ({ computation }) => {
  const rows = [
    {
      label: "Gross Total Income",
      value: `₹${computation.grossTotalIncome.toLocaleString("en-IN")}`,
    },
    {
      label: "Total Deductions",
      value: `-₹${computation.totalDeductions.toLocaleString("en-IN")}`,
    },
    {
      label: "Taxable Income",
      value: `₹${computation.taxableIncome.toLocaleString("en-IN")}`,
    },
    {
      label: "Income Tax + Cess",
      value: `₹${computation.taxPlusCess.toLocaleString("en-IN")}`,
    },
    {
      label: "Taxes Already Paid (TDS / Advance Tax)",
      value: `₹${computation.taxesPaid.toLocaleString("en-IN")}`,
    },
  ];

  const finalAmount = computation.isRefund
    ? computation.refundDue || 29585
    : computation.taxPayableDue || 0;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="document-text-outline" size={18} color="#0B1F3A" />
        </View>
        <Text style={styles.cardTitle}>Tax Summary</Text>
      </View>

      {/* Breakdown Rows */}
      <View style={styles.rowsList}>
        {rows.map((r) => (
          <View key={r.label} style={styles.row}>
            <Text style={styles.rowLabel}>{r.label}</Text>
            <Text style={styles.rowValue}>{r.value}</Text>
          </View>
        ))}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Final Result */}
      <View style={styles.finalRow}>
        <Text style={styles.finalLabel}>
          {computation.isRefund ? "Refund Due" : "Tax Payable"}
        </Text>
        <Text
          style={[
            styles.finalValue,
            computation.isRefund ? styles.refundValue : styles.payableValue,
          ]}
        >
          ₹{finalAmount.toLocaleString("en-IN")}
        </Text>
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
    borderRadius: 8,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  rowsList: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLabel: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
    flex: 1,
    marginRight: 8,
  },
  rowValue: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 14,
  },
  finalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  finalLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0B1F3A",
  },
  finalValue: {
    fontSize: 18,
    fontWeight: "800",
  },
  refundValue: {
    color: "#16A34A",
  },
  payableValue: {
    color: "#F97316",
  },
});
