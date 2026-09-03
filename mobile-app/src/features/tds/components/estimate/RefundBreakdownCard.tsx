import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TdsRefundEstimateData } from "../../types/estimate.types";

interface RefundBreakdownCardProps {
  data: TdsRefundEstimateData;
}

export const RefundBreakdownCard: React.FC<RefundBreakdownCardProps> = ({ data }) => {
  return (
    <View style={styles.card}>
      {/* Card Header */}
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Ionicons name="receipt-outline" size={18} color="#0B1F3A" />
        </View>
        <Text style={styles.headerTitle}>Refund Breakdown</Text>
      </View>

      {/* Breakdown Rows */}
      <View style={styles.rowsList}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Total TDS Deducted</Text>
          <Text style={styles.rowValue}>₹{data.totalTdsDeducted.toLocaleString("en-IN")}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Total Tax Liability</Text>
          <Text style={styles.rowValue}>₹{data.totalTaxLiability.toLocaleString("en-IN")}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.rowLabel, styles.orangeText]}>Estimated Refund</Text>
          <Text style={[styles.rowValue, styles.orangeText]}>
            ₹{data.estimatedRefund.toLocaleString("en-IN")}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Service Fee ({data.serviceFeeRate})</Text>
          <Text style={styles.rowValue}>₹{data.serviceFee.toLocaleString("en-IN")}</Text>
        </View>
      </View>

      {/* Subtle Divider */}
      <View style={styles.divider} />

      {/* Final Summary Row */}
      <View style={styles.finalRow}>
        <Text style={styles.finalLabel}>You will receive (estimated)</Text>
        <Text style={styles.finalValue}>
          ₹{data.netEstimatedRefund.toLocaleString("en-IN")}
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
    marginTop: 16,
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 15.5,
    fontWeight: "700",
    color: "#0B1F3A",
    letterSpacing: -0.1,
  },
  rowsList: {
    gap: 12,
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
  },
  rowValue: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  orangeText: {
    color: "#F97316",
    fontWeight: "700",
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
    fontSize: 14,
    fontWeight: "800",
    color: "#0B1F3A",
  },
  finalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#F97316",
  },
});
