import React from "react";
import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import { BrandColors, Shadows } from "../../../../shared/theme";
import { DeductionsData } from "../../types/workflowTypes";
import { FormValidationErrors } from "../../utils/validation";

interface DeductionsSectionProps {
  data: DeductionsData;
  errors?: FormValidationErrors;
  onChange: (updated: Partial<DeductionsData>) => void;
}

export const DeductionsSection: React.FC<DeductionsSectionProps> = ({
  data,
  errors = {},
  onChange,
}) => {
  const sanitizeNumeric = (val: string) => {
    return val.replace(/[^0-9]/g, "");
  };

  const renderAmountField = (
    label: string,
    value: string,
    fieldKey: keyof DeductionsData,
    placeholder: string,
    errorKey: keyof FormValidationErrors
  ) => {
    const hasError = !!errors[errorKey];
    const errorMsg = errors[errorKey];

    return (
      <View style={styles.fieldWrapper}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={[styles.inputRow, hasError ? styles.inputRowError : null]}>
          <View style={styles.currencyPrefix}>
            <Text style={styles.currencySymbol}>₹</Text>
          </View>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={(val) => onChange({ [fieldKey]: sanitizeNumeric(val) })}
            placeholder={placeholder}
            placeholderTextColor={BrandColors.TEXT_MUTED}
            keyboardType="number-pad"
          />
        </View>
        {hasError ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      </View>
    );
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Deductions (Chapter VI-A)</Text>
      <View style={styles.card}>
        {renderAmountField(
          "Section 80C (EPF, PPF, ELSS, LIC) - Max ₹1.5L *",
          data.sec80c,
          "sec80c",
          "Enter Section 80C Deductions",
          "sec80c"
        )}
        {renderAmountField(
          "Section 80D (Health Insurance Premium) *",
          data.sec80d,
          "sec80d",
          "Enter Section 80D Deductions",
          "sec80d"
        )}
        {renderAmountField(
          "Home Loan Interest (Section 24b) *",
          data.homeLoan24b,
          "homeLoan24b",
          "Enter Home Loan Interest",
          "homeLoan24b"
        )}
        {renderAmountField(
          "Education Loan Interest (Section 80E) *",
          data.educationLoan80e,
          "educationLoan80e",
          "Enter Education Loan Interest",
          "educationLoan80e"
        )}
        {renderAmountField(
          "Other Deductions (80G, 80TTA, 80CCD) *",
          data.otherDeductions,
          "otherDeductions",
          "Enter Other Deductions",
          "otherDeductions"
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: BrandColors.PRIMARY_BLUE,
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
  fieldWrapper: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    height: 48,
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    overflow: "hidden",
  },
  inputRowError: {
    borderColor: BrandColors.PRIMARY_ORANGE,
    backgroundColor: "#FFF9F5",
  },
  currencyPrefix: {
    width: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
    borderRightWidth: 1.5,
    borderRightColor: BrandColors.BORDER,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: "700",
    color: BrandColors.PRIMARY_BLUE,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 15,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
  },
  errorText: {
    fontSize: 12,
    fontWeight: "600",
    color: BrandColors.PRIMARY_ORANGE,
    marginTop: 4,
    marginLeft: 2,
  },
});
