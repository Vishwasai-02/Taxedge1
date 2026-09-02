import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors, Shadows } from "../../../../shared/theme";

interface PaymentViewProps {
  serviceName: string;
  onPaymentSuccess: () => void;
}

export const PaymentView: React.FC<PaymentViewProps> = ({
  serviceName,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 800);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* Top Hero Card */}
      <View style={styles.paymentCard}>
        <Text style={styles.paymentLabel}>TOTAL AMOUNT DUE</Text>
        <Text style={styles.paymentAmount}>₹3,540</Text>
        <Text style={styles.paymentSub}>Professional CA Filing for {serviceName}</Text>
      </View>

      {/* Fee Breakdown */}
      <Text style={[styles.sectionHeading, { marginTop: 20 }]}>Price Breakdown</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Professional CA Service Fee</Text>
          <Text style={styles.rowVal}>₹3,000</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Government GST (18%)</Text>
          <Text style={styles.rowVal}>₹540</Text>
        </View>
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total Payable</Text>
          <Text style={styles.totalVal}>₹3,540</Text>
        </View>
      </View>

      {/* Payment Method Selector */}
      <Text style={[styles.sectionHeading, { marginTop: 20 }]}>Select Payment Method</Text>
      <View style={styles.card}>
        {[
          { id: "upi", name: "UPI (GPay, PhonePe, Paytm)", icon: "phone-portrait-outline" },
          { id: "netbanking", name: "Net Banking (All Indian Banks)", icon: "globe-outline" },
          { id: "cards", name: "Credit / Debit Cards", icon: "card-outline" },
        ].map((method) => (
          <TouchableOpacity
            key={method.id}
            activeOpacity={0.8}
            onPress={() => setSelectedMethod(method.id)}
            style={[
              styles.methodRow,
              selectedMethod === method.id && styles.methodRowActive,
            ]}
          >
            <Ionicons
              name={method.icon as any}
              size={20}
              color={selectedMethod === method.id ? BrandColors.PRIMARY_ORANGE : BrandColors.PRIMARY_BLUE}
            />
            <Text style={styles.methodName}>{method.name}</Text>
            <Ionicons
              name={selectedMethod === method.id ? "radio-button-on" : "radio-button-off"}
              size={20}
              color={selectedMethod === method.id ? BrandColors.PRIMARY_ORANGE : BrandColors.TEXT_MUTED}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Pay Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handlePay}
        style={styles.primaryBtn}
      >
        <Text style={styles.primaryBtnText}>
          {isProcessing ? "Processing Payment..." : "Pay ₹3,540 & Submit"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  paymentCard: {
    backgroundColor: BrandColors.PRIMARY_BLUE,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    ...Shadows.md,
  },
  paymentLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#93C5FD",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  paymentAmount: {
    fontSize: 36,
    fontWeight: "800",
    color: BrandColors.PRIMARY_ORANGE,
    marginBottom: 6,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  paymentSub: {
    fontSize: 13,
    color: "#CBD5E1",
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "800",
    color: BrandColors.TEXT_MUTED,
    letterSpacing: 0.8,
    marginBottom: 10,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    ...Shadows.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  rowLabel: {
    fontSize: 13.5,
    color: BrandColors.TEXT_SECONDARY,
  },
  rowVal: {
    fontSize: 14,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
  },
  totalRow: {
    borderBottomWidth: 0,
    marginTop: 6,
    paddingTop: 12,
    borderTopWidth: 1.5,
    borderTopColor: BrandColors.BORDER,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: BrandColors.PRIMARY_BLUE,
  },
  totalVal: {
    fontSize: 16,
    fontWeight: "800",
    color: BrandColors.PRIMARY_BLUE,
  },
  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    gap: 12,
  },
  methodRowActive: {
    backgroundColor: "#FFF9F5",
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  methodName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
  },
  primaryBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    ...Shadows.sm,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
});
