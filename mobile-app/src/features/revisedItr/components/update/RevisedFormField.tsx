import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface RevisedFormFieldProps {
  label: string;
  value: string;
  onChangeText: (val: string) => void;
  isMandatory?: boolean;
  isLikelyChange?: boolean;
  placeholder?: string;
  keyboardType?: "default" | "number-pad" | "numeric";
  maxLength?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
}

export const RevisedFormField: React.FC<RevisedFormFieldProps> = ({
  label,
  value,
  onChangeText,
  isMandatory = false,
  isLikelyChange = false,
  placeholder,
  keyboardType = "default",
  maxLength,
  autoCapitalize = "none",
  error,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label} {isMandatory ? <Text style={styles.star}>*</Text> : null}
        </Text>

        {isLikelyChange && (
          <View style={styles.likelyChangeBadge}>
            <Text style={styles.likelyChangeText}>Likely change</Text>
          </View>
        )}
      </View>

      <TextInput
        style={[
          styles.input,
          isLikelyChange ? styles.highlightedInput : null,
          error ? styles.errorInput : null,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  star: {
    color: "#DC2626",
  },
  likelyChangeBadge: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  likelyChangeText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#EA580C",
  },
  input: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#0B1F3A",
    fontWeight: "600",
  },
  highlightedInput: {
    borderColor: "#FDBA74",
    backgroundColor: "#FFFBF7",
  },
  errorInput: {
    borderColor: "#DC2626",
  },
  errorText: {
    fontSize: 11.5,
    color: "#DC2626",
    marginTop: 4,
    fontWeight: "500",
  },
});
