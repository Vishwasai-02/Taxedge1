import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../shared/theme";
import { CardDetailsForm, CardFormData } from "./CardDetailsForm";
import { NetBankingForm, NetBankingFormData } from "./NetBankingForm";

export { CardFormData, NetBankingFormData };
export type PaymentMethodType = "upi" | "debit" | "credit" | "netbanking";

const UPI_APPS = [
  { id: "phonepe", label: "PhonePe", handle: "okhdfcbank" },
  { id: "gpay", label: "GPay", handle: "okaxis" },
  { id: "paytm", label: "Paytm", handle: "paytm" },
  { id: "bhim", label: "BHIM", handle: "upi" },
];

const METHODS = [
  { id: "upi" as const, title: "UPI", subtitle: "Pay via any UPI app", icon: "grid-outline", iconBg: "#EEF2FF", iconColor: "#6366F1" },
  { id: "debit" as const, title: "Debit Card", subtitle: "Visa / Mastercard / RuPay", icon: "card-outline", iconBg: "#E0F2FE", iconColor: "#0284C7" },
  { id: "credit" as const, title: "Credit Card", subtitle: "Visa / Mastercard / Amex", icon: "card-outline", iconBg: "#E0F2FE", iconColor: "#0284C7" },
  { id: "netbanking" as const, title: "Net Banking", subtitle: "All major banks", icon: "business-outline", iconBg: "#F1F5F9", iconColor: "#475569" },
];

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType;
  onSelectMethod: (method: PaymentMethodType) => void;
  upiId: string;
  onChangeUpiId: (id: string) => void;
  upiError?: string;
  cardData: CardFormData;
  onChangeCardData: (fields: Partial<CardFormData>) => void;
  cardErrors?: Record<string, string>;
  netBankingData: NetBankingFormData;
  onChangeNetBankingData: (fields: Partial<NetBankingFormData>) => void;
  netBankingErrors?: Record<string, string>;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelectMethod,
  upiId,
  onChangeUpiId,
  upiError,
  cardData,
  onChangeCardData,
  cardErrors = {},
  netBankingData,
  onChangeNetBankingData,
  netBankingErrors = {},
}) => {
  const handleSelectApp = (handle: string) => {
    const username = upiId.includes("@") ? upiId.split("@")[0] : upiId || "pavan";
    onChangeUpiId(`${username}@${handle}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose Payment Method</Text>

      {/* Methods Radio List */}
      {METHODS.map((m) => {
        const isSelected = selectedMethod === m.id;
        return (
          <TouchableOpacity
            key={m.id}
            style={[styles.card, isSelected && styles.cardActive]}
            activeOpacity={0.8}
            onPress={() => onSelectMethod(m.id)}
          >
            <View style={[styles.iconBox, { backgroundColor: m.iconBg }]}>
              <Ionicons name={m.icon as any} size={20} color={m.iconColor} />
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.title}>{m.title}</Text>
              <Text style={styles.subtitle}>{m.subtitle}</Text>
            </View>
            <View style={[styles.radio, isSelected && styles.radioActive]}>
              {isSelected && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
            </View>
          </TouchableOpacity>
        );
      })}

      {/* Dynamic Sub-form based on selection */}
      {selectedMethod === "upi" && (
        <View style={styles.upiCard}>
          <Text style={styles.upiLabel}>UPI ID *</Text>
          <TextInput
            style={[styles.upiInput, upiError ? styles.inputError : null]}
            placeholder="pavan@ybl"
            placeholderTextColor="#94A3B8"
            value={upiId}
            onChangeText={onChangeUpiId}
            autoCapitalize="none"
          />
          {upiError ? <Text style={styles.errorText}>{upiError}</Text> : null}

          <View style={styles.pillsRow}>
            {UPI_APPS.map((app) => (
              <TouchableOpacity
                key={app.id}
                style={styles.pill}
                activeOpacity={0.7}
                onPress={() => handleSelectApp(app.handle)}
              >
                <Text style={styles.pillText}>{app.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {(selectedMethod === "debit" || selectedMethod === "credit") && (
        <CardDetailsForm
          cardType={selectedMethod === "debit" ? "Debit Card" : "Credit Card"}
          data={cardData}
          onChange={onChangeCardData}
          errors={cardErrors}
        />
      )}

      {selectedMethod === "netbanking" && (
        <NetBankingForm
          data={netBankingData}
          onChange={onChangeNetBankingData}
          errors={netBankingErrors}
        />
      )}

      {/* PCI-DSS Security Banner */}
      <View style={styles.securityBanner}>
        <Ionicons name="shield-checkmark" size={16} color="#2563EB" />
        <Text style={styles.securityText}>
          256-bit encrypted & PCI-DSS compliant secure payment gateway
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 10 },
  heading: { fontSize: 15.5, fontWeight: "700", color: BrandColors.TEXT_PRIMARY, marginBottom: 4 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  cardActive: { backgroundColor: "#FEF0E6", borderColor: BrandColors.PRIMARY_ORANGE },
  iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center", marginRight: 12 },
  infoCol: { flex: 1 },
  title: { fontSize: 14, fontWeight: "700", color: BrandColors.TEXT_PRIMARY },
  subtitle: { fontSize: 12, color: "#64748B", marginTop: 2 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  radioActive: { backgroundColor: BrandColors.PRIMARY_ORANGE, borderColor: BrandColors.PRIMARY_ORANGE },
  upiCard: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#EEF2F6" },
  upiLabel: { fontSize: 13, fontWeight: "600", color: BrandColors.TEXT_PRIMARY, marginBottom: 8 },
  upiInput: {
    height: 48,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    fontSize: 14,
    color: BrandColors.TEXT_PRIMARY,
  },
  inputError: { borderColor: "#EF4444", backgroundColor: "#FEF2F2" },
  errorText: { fontSize: 11.5, color: "#DC2626", marginTop: 4, fontWeight: "500" },
  pillsRow: { flexDirection: "row", gap: 8, marginTop: 12 },
  pill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    alignItems: "center",
  },
  pillText: { fontSize: 12, fontWeight: "600", color: "#475569" },
  securityBanner: {
    flexDirection: "row",
    backgroundColor: "#EAF1FE",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    gap: 8,
    alignItems: "center",
  },
  securityText: { flex: 1, fontSize: 11.5, color: "#083B75", lineHeight: 16 },
});
