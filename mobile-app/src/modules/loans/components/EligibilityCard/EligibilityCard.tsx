import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../design-system/colors";
import { formatCurrencyINR } from "../../../../shared/formatters/currencyFormatter";

export interface EligibilityCardProps {
  maxAmount: number;
  interestRate: number;
  tenureMonths: number;
}

export const EligibilityCard: React.FC<EligibilityCardProps> = ({
  maxAmount,
  interestRate,
  tenureMonths,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Ionicons name="sparkles" size={20} color={BrandColors.PRIMARY_ORANGE} />
        <Text style={styles.badgeText}>Pre-Qualified Offer</Text>
      </View>

      <Text style={styles.amountText}>{formatCurrencyINR(maxAmount)}</Text>
      <Text style={styles.subText}>Maximum eligible loan amount</Text>

      <View style={styles.footerRow}>
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Interest Rate</Text>
          <Text style={styles.infoValue}>{interestRate}% p.a.</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Max Tenure</Text>
          <Text style={styles.infoValue}>{tenureMonths} Months</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: BrandColors.PRIMARY_BLUE_DARK,
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  badgeText: {
    color: BrandColors.PRIMARY_ORANGE,
    fontSize: 12,
    fontWeight: "700",
  },
  amountText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },
  subText: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 2,
    marginBottom: 16,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "500",
  },
  infoValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 12,
  },
});

export default EligibilityCard;
