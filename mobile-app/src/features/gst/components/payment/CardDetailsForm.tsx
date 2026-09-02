import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { BrandColors } from "../../../../shared/theme";

export interface CardFormData {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

interface CardDetailsFormProps {
  cardType: "Debit Card" | "Credit Card";
  data: CardFormData;
  onChange: (fields: Partial<CardFormData>) => void;
  errors?: Record<string, string>;
}

export const CardDetailsForm: React.FC<CardDetailsFormProps> = ({
  cardType,
  data,
  onChange,
  errors = {},
}) => {
  const formatCardNumber = (text: string) => {
    const clean = text.replace(/[^0-9]/g, "").slice(0, 16);
    const parts = clean.match(/.{1,4}/g) || [];
    return parts.join(" ");
  };

  const formatExpiry = (text: string) => {
    const clean = text.replace(/[^0-9]/g, "").slice(0, 4);
    if (clean.length > 2) {
      return `${clean.slice(0, 2)}/${clean.slice(2)}`;
    }
    return clean;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{cardType} Details</Text>

      {/* Card Number */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Card Number *</Text>
        <TextInput
          style={[styles.input, errors.cardNumber && styles.inputError]}
          placeholder="XXXX XXXX XXXX XXXX"
          placeholderTextColor="#94A3B8"
          value={data.cardNumber}
          onChangeText={(t) => onChange({ cardNumber: formatCardNumber(t) })}
          keyboardType="numeric"
          maxLength={19}
        />
        {errors.cardNumber ? <Text style={styles.errorText}>{errors.cardNumber}</Text> : null}
      </View>

      {/* Cardholder Name */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Cardholder Name *</Text>
        <TextInput
          style={[styles.input, errors.cardHolder && styles.inputError]}
          placeholder="Enter name on card"
          placeholderTextColor="#94A3B8"
          value={data.cardHolder}
          onChangeText={(t) => onChange({ cardHolder: t })}
        />
        {errors.cardHolder ? <Text style={styles.errorText}>{errors.cardHolder}</Text> : null}
      </View>

      {/* Expiry & CVV Row */}
      <View style={styles.row}>
        <View style={[styles.fieldGroup, { flex: 1 }]}>
          <Text style={styles.label}>Expiry (MM/YY) *</Text>
          <TextInput
            style={[styles.input, errors.expiry && styles.inputError]}
            placeholder="MM/YY"
            placeholderTextColor="#94A3B8"
            value={data.expiry}
            onChangeText={(t) => onChange({ expiry: formatExpiry(t) })}
            keyboardType="numeric"
            maxLength={5}
          />
          {errors.expiry ? <Text style={styles.errorText}>{errors.expiry}</Text> : null}
        </View>

        <View style={[styles.fieldGroup, { flex: 1 }]}>
          <Text style={styles.label}>CVV / CVC *</Text>
          <TextInput
            style={[styles.input, errors.cvv && styles.inputError]}
            placeholder="123"
            placeholderTextColor="#94A3B8"
            value={data.cvv}
            onChangeText={(t) => onChange({ cvv: t.replace(/[^0-9]/g, "").slice(0, 4) })}
            keyboardType="numeric"
            secureTextEntry
            maxLength={4}
          />
          {errors.cvv ? <Text style={styles.errorText}>{errors.cvv}</Text> : null}
        </View>
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
    marginBottom: 2,
  },
  fieldGroup: {
    gap: 4,
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
  row: {
    flexDirection: "row",
    gap: 12,
  },
});
