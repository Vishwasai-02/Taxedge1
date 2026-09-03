import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GovernmentChargesBreakdown } from "../../types/charges.types";

interface GovernmentChargesCardProps {
  charges: GovernmentChargesBreakdown;
}

export const GovernmentChargesCard: React.FC<GovernmentChargesCardProps> = ({
  charges,
}) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Ionicons name="business-outline" size={20} color="#0B1F3A" />
        </View>
        <Text style={styles.headerTitle}>Government charges{"\n"}(estimated)</Text>
      </View>

      {/* Rows */}
      <View style={styles.rowsList}>
        <View style={styles.row}>
          <Text style={styles.label}>Late filing fee — Sec 234F</Text>
          <Text style={styles.value}>
            ₹{charges.lateFilingFeeSec234F.toLocaleString("en-IN")}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Interest — Sec 234A</Text>
          <Text style={styles.value}>
            ₹{charges.interestSec234A.toLocaleString("en-IN")}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Additional tax — ITR-U</Text>
          <Text style={styles.value}>
            ₹{charges.additionalTaxItrU.toLocaleString("en-IN")}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Total Row */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Payable to department</Text>
        <Text style={styles.totalValue}>
          ₹{charges.totalGovernmentCharges.toLocaleString("en-IN")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0B1F3A",
    lineHeight: 17,
  },
  rowsList: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 11.5,
    color: "#64748B",
    fontWeight: "500",
    flex: 1,
    paddingRight: 4,
  },
  value: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 14,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0B1F3A",
    flex: 1,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#EA580C",
    letterSpacing: -0.2,
  },
});
