import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
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

const UPI_APPS = ["PhonePe", "GPay", "Paytm", "BHIM"];

interface GstPaymentMethodStepProps {
  amount?: string;
  selectedMethod: string;
  onSelectMethod: (method: string) => void;
  upiId: string;
  onChangeUpiId: (id: string) => void;
  upiError?: string;
}

export const GstPaymentMethodStep: React.FC<GstPaymentMethodStepProps> = ({
  amount = "₹5,900",
  selectedMethod,
  onSelectMethod,
  upiId,
  onChangeUpiId,
  upiError,
}) => {
  return (
    <View style={styles.container}>
      {/* Top Total Amount Banner */}
      <View style={styles.topAmountCard}>
        <View style={styles.topRow}>
          <Text style={styles.discountLabel}>Discount</Text>
          <Text style={styles.discountValue}>₹0</Text>
        </View>
        <View style={styles.amountDivider} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>{amount}</Text>
        </View>
      </View>

      {/* Section: Choose Payment Method */}
      <Text style={styles.sectionHeading}>Choose Payment Method</Text>

      <View style={styles.methodsList}>
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <TouchableOpacity
              key={method.id}
              activeOpacity={0.8}
              onPress={() => onSelectMethod(method.id)}
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

      {/* Expanded UPI Section if UPI is selected */}
      {selectedMethod === "upi" && (
        <View style={styles.upiCard}>
          <Text style={styles.upiLabel}>UPI ID *</Text>
          <TextInput
            style={[styles.upiInput, upiError ? styles.upiInputError : null]}
            value={upiId}
            onChangeText={onChangeUpiId}
            placeholder="yourname@bank"
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
          />
          {upiError ? <Text style={styles.errorText}>{upiError}</Text> : null}

          <View style={styles.upiAppsRow}>
            {UPI_APPS.map((app) => (
              <TouchableOpacity
                key={app}
                style={styles.appPill}
                activeOpacity={0.7}
                onPress={() => onChangeUpiId(`akhil@${app.toLowerCase()}`)}
              >
                <Text style={styles.appPillText}>{app}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* PCI-DSS Compliance Security Note */}
      <View style={styles.securityBox}>
        <Ionicons name="shield-checkmark-outline" size={16} color="#059669" />
        <Text style={styles.securityText}>
          Secure payment powered by encrypted transaction processing. PCI-DSS compliant.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    gap: 12,
  },
  topAmountCard: {
    backgroundColor: "#F0FDF4",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  discountLabel: {
    fontSize: 13,
    color: "#64748B",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  discountValue: {
    fontSize: 13,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  amountDivider: {
    height: 1,
    backgroundColor: "#DCFCE7",
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#059669",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#059669",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  sectionHeading: {
    fontSize: 14.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    marginTop: 4,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  methodsList: {
    gap: 10,
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
  upiCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEF2F6",
    marginTop: 2,
  },
  upiLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  upiInput: {
    height: 48,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    fontSize: 14,
    color: BrandColors.TEXT_PRIMARY,
    marginBottom: 8,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  upiInputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  errorText: {
    fontSize: 11.5,
    color: "#DC2626",
    marginBottom: 8,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  upiAppsRow: {
    flexDirection: "row",
    gap: 8,
  },
  appPill: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  appPillText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  securityBox: {
    flexDirection: "row",
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DCFCE7",
    gap: 8,
    alignItems: "center",
    marginBottom: 6,
  },
  securityText: {
    flex: 1,
    fontSize: 11.5,
    color: "#166534",
    lineHeight: 16,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
});
