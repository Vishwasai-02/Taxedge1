import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import { IncomeDetailsFormErrors } from "../../types/incomeDetails.types";

interface IncomeDetailsCardProps {
  categoryTitle?: string;
  amount: string;
  error?: string;
  onChange: (value: string) => void;
}

export const IncomeDetailsCard: React.FC<IncomeDetailsCardProps> = ({
  categoryTitle = "Business Income",
  amount,
  error,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const formatWithCommas = (val: string) => {
    const rawNumber = val.replace(/[^0-9]/g, "");
    if (!rawNumber) return "";
    return Number(rawNumber).toLocaleString("en-IN");
  };

  const handleChangeText = (text: string) => {
    const raw = text.replace(/[^0-9]/g, "");
    onChange(raw);
  };

  const displayValue = formatWithCommas(amount);

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{categoryTitle} Details</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>
          {categoryTitle} <Text style={styles.requiredStar}>*</Text>
        </Text>

        <View
          style={[
            styles.inputContainer,
            isFocused && styles.inputFocused,
            !!error && styles.inputError,
          ]}
        >
          <View style={styles.currencyPrefixContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder={`Enter ${categoryTitle}`}
            placeholderTextColor="#94A3B8"
            value={displayValue}
            keyboardType="number-pad"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={handleChangeText}
          />
        </View>

        {!!error && <Text style={styles.errorText}>{error}</Text>}
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B1F3A",
    marginBottom: 14,
  },
  fieldContainer: {
    width: "100%",
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0B1F3A",
    marginBottom: 6,
  },
  requiredStar: {
    color: "#DC2626",
    fontWeight: "700",
  },
  inputContainer: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  inputFocused: {
    borderColor: "#F97316",
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#DC2626",
  },
  currencyPrefixContainer: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: "#0B1F3A",
    fontWeight: "500",
    padding: 0,
  },
  errorText: {
    fontSize: 11,
    color: "#DC2626",
    marginTop: 4,
    fontWeight: "500",
  },
});
