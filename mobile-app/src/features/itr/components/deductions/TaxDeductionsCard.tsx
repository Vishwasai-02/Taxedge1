import React from "react";
import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DeductionCurrencyInput } from "./DeductionCurrencyInput";
import { DeductionsFormData, DeductionsFormErrors } from "../../types/deductions.types";

interface TaxDeductionsCardProps {
  formData: DeductionsFormData;
  errors: DeductionsFormErrors;
  onChange: (updated: Partial<DeductionsFormData>) => void;
}

export const TaxDeductionsCard: React.FC<TaxDeductionsCardProps> = ({
  formData,
  errors,
  onChange,
}) => {
  return (
    <View style={styles.card}>
      {/* Header with Orange Shield Icon */}
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Ionicons name="shield-checkmark" size={20} color="#F97316" />
        </View>
        <Text style={styles.cardTitle}>Tax Deductions</Text>
      </View>

      {/* Row 1: 80C & 80D */}
      <View style={styles.inputRow}>
        <DeductionCurrencyInput
          label="Section 80C Investments"
          required
          value={formData.sec80c}
          placeholder="Enter amount"
          error={errors.sec80c}
          onChangeText={(val) => onChange({ sec80c: val })}
        />

        <DeductionCurrencyInput
          label="Section 80D Health Insurance"
          required
          value={formData.sec80d}
          placeholder="Enter amount"
          error={errors.sec80d}
          onChangeText={(val) => onChange({ sec80d: val })}
        />
      </View>

      {/* Row 2: Home Loan 24B & Education Loan 80E */}
      <View style={styles.inputRow}>
        <DeductionCurrencyInput
          label="Home Loan Interest (Sec 24B)"
          value={formData.homeLoan24b}
          placeholder="Enter amount"
          error={errors.homeLoan24b}
          onChangeText={(val) => onChange({ homeLoan24b: val })}
        />

        <DeductionCurrencyInput
          label="Education Loan Interest (Sec 80E)"
          value={formData.educationLoan80e}
          placeholder="Enter amount"
          error={errors.educationLoan80e}
          onChangeText={(val) => onChange({ educationLoan80e: val })}
        />
      </View>

      {/* Other Deductions Text Area */}
      <View style={styles.textAreaContainer}>
        <Text style={styles.textAreaLabel}>Other Deductions</Text>
        <View style={styles.textAreaWrapper}>
          <TextInput
            style={styles.textArea}
            placeholder="Mention any additional deductions you wish to claim."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={3}
            maxLength={300}
            value={formData.otherDeductions}
            onChangeText={(text) => onChange({ otherDeductions: text })}
          />
          <Text style={styles.charCounter}>
            {formData.otherDeductions?.length || 0}/300
          </Text>
        </View>
      </View>

      {/* Mandatory Note */}
      <View style={styles.infoRow}>
        <Ionicons name="information-circle-outline" size={16} color="#0B1F3A" />
        <Text style={styles.infoText}>
          Fields marked with <Text style={styles.requiredStar}>*</Text> are mandatory.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
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
    marginBottom: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  textAreaContainer: {
    marginTop: 4,
    marginBottom: 14,
  },
  textAreaLabel: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#0B1F3A",
    marginBottom: 6,
  },
  textAreaWrapper: {
    borderWidth: 1.2,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    padding: 12,
    minHeight: 88,
    justifyContent: "space-between",
  },
  textArea: {
    fontSize: 13,
    color: "#0B1F3A",
    lineHeight: 18,
    padding: 0,
    textAlignVertical: "top",
    minHeight: 48,
  },
  charCounter: {
    fontSize: 11,
    color: "#94A3B8",
    textAlign: "right",
    marginTop: 4,
    fontWeight: "500",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  infoText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  requiredStar: {
    color: "#DC2626",
    fontWeight: "700",
  },
});
