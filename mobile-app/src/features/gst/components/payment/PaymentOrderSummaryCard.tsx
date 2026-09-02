import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../shared/theme";

interface PaymentOrderSummaryCardProps {
  serviceTitle?: string;
  businessSubtitle?: string;
  professionalFee?: string;
  gstAmount?: string;
  discountAmount?: string;
  totalAmount?: string;
}

export const PaymentOrderSummaryCard: React.FC<PaymentOrderSummaryCardProps> = ({
  serviceTitle = "GST Registration",
  businessSubtitle = "Pavan Enterprises • Bengaluru",
  professionalFee = "₹1,986",
  gstAmount = "₹358",
  discountAmount = "₹0",
  totalAmount = "₹2,344",
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Order Summary</Text>

      <View style={styles.serviceRow}>
        <View style={styles.iconBox}>
          <Ionicons name="document-text" size={20} color="#6366F1" />
        </View>
        <View style={styles.textCol}>
          <Text style={styles.title}>{serviceTitle}</Text>
          <Text style={styles.subtitle}>{businessSubtitle}</Text>
        </View>
      </View>

      <View style={styles.calcList}>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Professional Fee</Text>
          <Text style={styles.calcValue}>{professionalFee}</Text>
        </View>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>GST (18%)</Text>
          <Text style={styles.calcValue}>{gstAmount}</Text>
        </View>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Discount</Text>
          <Text style={styles.calcValue}>{discountAmount}</Text>
        </View>
      </View>

      <View style={styles.totalBanner}>
        <Text style={styles.totalLabel}>Total Amount</Text>
        <Text style={styles.totalValue}>{totalAmount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEF2F6",
    overflow: "hidden",
  },
  heading: {
    fontSize: 15.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 12,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 14,
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  textCol: {
    flex: 1,
  },
  title: {
    fontSize: 14.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  subtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  calcList: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 14,
  },
  calcRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  calcLabel: {
    fontSize: 13,
    color: "#64748B",
  },
  calcValue: {
    fontSize: 13,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
  },
  totalBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FEF0E6",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#FFD8BF",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: BrandColors.PRIMARY_ORANGE,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: BrandColors.PRIMARY_ORANGE,
  },
});
