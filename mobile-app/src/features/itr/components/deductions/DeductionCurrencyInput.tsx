import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

interface DeductionCurrencyInputProps {
  label: string;
  required?: boolean;
  value: string;
  placeholder?: string;
  error?: string;
  onChangeText: (rawVal: string) => void;
}

export const DeductionCurrencyInput: React.FC<DeductionCurrencyInputProps> = ({
  label,
  required = false,
  value,
  placeholder = "Enter amount",
  error,
  onChangeText,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const formatWithCommas = (val: string) => {
    const rawNumber = val.replace(/[^0-9]/g, "");
    if (!rawNumber) return "";
    return Number(rawNumber).toLocaleString("en-IN");
  };

  const handleChange = (text: string) => {
    const raw = text.replace(/[^0-9]/g, "");
    onChangeText(raw);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.requiredStar}>*</Text>}
      </Text>

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputFocused,
          !!error && styles.inputError,
        ]}
      >
        <View style={styles.currencyPrefixContainer}>
          <Text style={styles.currencySymbol}>₹</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          value={formatWithCommas(value)}
          keyboardType="number-pad"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={handleChange}
        />
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 140,
  },
  label: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#0B1F3A",
    marginBottom: 6,
  },
  requiredStar: {
    color: "#DC2626",
    fontWeight: "700",
  },
  inputWrapper: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  inputFocused: {
    borderColor: "#F97316",
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#DC2626",
  },
  currencyPrefixContainer: {
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  currencySymbol: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  textInput: {
    flex: 1,
    fontSize: 13.5,
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
