import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../shared/theme";

const POPULAR_BANKS = [
  { id: "hdfc", name: "HDFC Bank" },
  { id: "sbi", name: "State Bank of India" },
  { id: "icici", name: "ICICI Bank" },
  { id: "axis", name: "Axis Bank" },
  { id: "kotak", name: "Kotak Bank" },
  { id: "pnb", name: "Punjab National Bank" },
];

export interface NetBankingFormData {
  selectedBank: string;
  customerId: string;
}

interface NetBankingFormProps {
  data: NetBankingFormData;
  onChange: (fields: Partial<NetBankingFormData>) => void;
  errors?: Record<string, string>;
}

export const NetBankingForm: React.FC<NetBankingFormProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Net Banking Details</Text>
      <Text style={styles.subHeading}>Select your bank</Text>

      {/* Popular Banks 2x3 Grid */}
      <View style={styles.bankGrid}>
        {POPULAR_BANKS.map((bank) => {
          const isSelected = data.selectedBank === bank.name;
          return (
            <TouchableOpacity
              key={bank.id}
              style={[styles.bankPill, isSelected && styles.bankPillActive]}
              activeOpacity={0.75}
              onPress={() => onChange({ selectedBank: bank.name })}
            >
              <Text style={[styles.bankName, isSelected && styles.bankNameActive]}>
                {bank.name}
              </Text>
              {isSelected && <Ionicons name="checkmark-circle" size={14} color={BrandColors.PRIMARY_ORANGE} />}
            </TouchableOpacity>
          );
        })}
      </View>
      {errors.selectedBank ? <Text style={styles.errorText}>{errors.selectedBank}</Text> : null}

      {/* Customer ID / Account Number */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Customer ID / User ID *</Text>
        <TextInput
          style={[styles.input, errors.customerId && styles.inputError]}
          placeholder="Enter bank User ID / Customer ID"
          placeholderTextColor="#94A3B8"
          value={data.customerId}
          onChangeText={(t) => onChange({ customerId: t })}
          autoCapitalize="none"
        />
        {errors.customerId ? <Text style={styles.errorText}>{errors.customerId}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEF2F6",
    gap: 10,
  },
  heading: {
    fontSize: 13.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  subHeading: {
    fontSize: 12,
    color: "#64748B",
    marginTop: -4,
  },
  bankGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  bankPill: {
    width: "48.5%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bankPillActive: {
    borderColor: BrandColors.PRIMARY_ORANGE,
    backgroundColor: "#FEF0E6",
  },
  bankName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
    flex: 1,
  },
  bankNameActive: {
    color: BrandColors.PRIMARY_ORANGE,
    fontWeight: "700",
  },
  fieldGroup: {
    gap: 4,
    marginTop: 4,
  },
  label: {
    fontSize: 12.5,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
  },
  input: {
    height: 48,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    fontSize: 14,
    color: BrandColors.TEXT_PRIMARY,
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  errorText: {
    fontSize: 11.5,
    color: "#DC2626",
    marginTop: 2,
    fontWeight: "500",
  },
});
