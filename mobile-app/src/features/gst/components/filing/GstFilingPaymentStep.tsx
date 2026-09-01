import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../shared/theme";

const PAYMENT_METHODS = [
  {
    id: "upi",
    title: "UPI",
    subtitle: "Pay via any UPI app",
    iconName: "phone-portrait",
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
  },
  {
    id: "debit",
    title: "Debit Card",
    subtitle: "Visa / Mastercard / RuPay",
    iconName: "card",
    iconBg: "#E0F2FE",
    iconColor: "#0284C7",
  },
  {
    id: "credit",
    title: "Credit Card",
    subtitle: "Visa / Mastercard / Amex",
    iconName: "card",
    iconBg: "#E0F2FE",
    iconColor: "#2563EB",
  },
  {
    id: "netbanking",
    title: "Net Banking",
    subtitle: "All major banks",
    iconName: "business",
    iconBg: "#F1F5F9",
    iconColor: "#64748B",
  },
];

export const GstFilingPaymentStep: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState("upi");

  return (
    <View style={styles.container}>
      {/* 1. Order Summary Card */}
      <Text style={styles.sectionHeading}>Order Summary</Text>
      <View style={styles.summaryCard}>
        <View style={styles.serviceHeader}>
          <View style={styles.serviceIconBox}>
            <Ionicons name="document-text" size={20} color="#0284C7" />
          </View>
          <View style={styles.serviceTextCol}>
            <Text style={styles.serviceTitle}>GST Filing</Text>
            <Text style={styles.serviceSub}>Akhil Enterprises • Bengaluru</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Professional Fee</Text>
          <Text style={styles.value}>₹2,000</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>GST (18%)</Text>
          <Text style={styles.value}>₹360</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Discount</Text>
          <Text style={styles.value}>₹0</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₹2,360</Text>
        </View>
      </View>

      {/* 2. Choose Payment Method */}
      <Text style={styles.sectionHeading}>Choose Payment Method</Text>
      <View style={styles.methodsList}>
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <TouchableOpacity
              key={method.id}
              activeOpacity={0.8}
              onPress={() => setSelectedMethod(method.id)}
              style={[
                styles.methodCard,
                isSelected && styles.methodCardSelected,
              ]}
            >
              <View style={[styles.methodIconBox, { backgroundColor: method.iconBg }]}>
                <Ionicons name={method.iconName as any} size={20} color={method.iconColor} />
              </View>

              <View style={styles.methodTextCol}>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
              </View>

              <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
                {isSelected && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    gap: 12,
  },
  sectionHeading: {
    fontSize: 14.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    marginBottom: 4,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEF2F6",
    marginBottom: 12,
  },
  serviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  serviceIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
  },
  serviceTextCol: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  serviceSub: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: "#64748B",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  value: {
    fontSize: 13,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E6F7EF",
    borderRadius: 10,
    paddingVertical: 11,
    paddingHorizontal: 12,
    marginTop: 6,
  },
  totalLabel: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#059669",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#059669",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  methodsList: {
    gap: 10,
    marginBottom: 10,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  methodCardSelected: {
    backgroundColor: "#F0FDF4",
    borderColor: "#10B981",
  },
  methodIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  methodTextCol: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  methodSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleActive: {
    backgroundColor: "#059669",
    borderColor: "#059669",
  },
});
