import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface RefundHeroCardProps {
  isRefund?: boolean;
  amount: number;
}

export const RefundHeroCard: React.FC<RefundHeroCardProps> = ({
  isRefund = true,
  amount = 29585,
}) => {
  const formattedAmount = `₹${amount.toLocaleString("en-IN")}`;

  return (
    <View style={[styles.card, isRefund ? styles.refundCard : styles.payableCard]}>
      {/* Left Wallet/Icon Circle */}
      <View style={[styles.iconCircle, isRefund ? styles.refundIconCircle : styles.payableIconCircle]}>
        <Ionicons
          name={isRefund ? "wallet" : "receipt"}
          size={24}
          color={isRefund ? "#065F46" : "#7C2D12"}
        />
      </View>

      {/* Center Details */}
      <View style={styles.centerDetails}>
        <Text style={styles.heroSubtitle}>
          {isRefund ? "Estimated Refund" : "Tax Payable"}
        </Text>
        <Text style={styles.heroAmount}>{formattedAmount}</Text>
        <Text style={styles.heroExplanation}>
          Calculated after considering TDS, advance tax, deductions and eligible exemptions.
        </Text>
      </View>

      {/* Right Watermark Circle */}
      <View style={styles.watermarkCircle}>
        <Ionicons name="checkmark" size={24} color="#FFFFFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    ...Platform.select({
      ios: {
        shadowColor: "#059669",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  refundCard: {
    backgroundColor: "#059669",
  },
  payableCard: {
    backgroundColor: "#F97316",
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  refundIconCircle: {
    backgroundColor: "#A7F3D0",
  },
  payableIconCircle: {
    backgroundColor: "#FED7AA",
  },
  centerDetails: {
    flex: 1,
    marginRight: 8,
  },
  heroSubtitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    opacity: 0.95,
  },
  heroAmount: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
    marginVertical: 2,
  },
  heroExplanation: {
    fontSize: 11,
    color: "#FFFFFF",
    opacity: 0.9,
    lineHeight: 15,
  },
  watermarkCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
});
