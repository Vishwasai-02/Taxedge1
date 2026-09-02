import React from "react";
import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import { BrandColors, Shadows } from "../../../../shared/theme";
import { IncomeDetailsData } from "../../types/workflowTypes";
import { FormValidationErrors } from "../../utils/validation";

interface IncomeDetailsSectionProps {
  data: IncomeDetailsData;
  errors?: FormValidationErrors;
  onChange: (updated: Partial<IncomeDetailsData>) => void;
}

export const IncomeDetailsSection: React.FC<IncomeDetailsSectionProps> = ({
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
    fieldKey: keyof IncomeDetailsData,
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
      <Text style={styles.sectionTitle}>Income Details</Text>
      <View style={styles.card}>
        {renderAmountField(
          "Gross Salary (Form 16) *",
          data.grossSalary,
          "grossSalary",
          "Enter Gross Salary",
          "grossSalary"
        )}
        {renderAmountField(
          "Business / Professional Income *",
          data.businessIncome,
          "businessIncome",
          "Enter Business / Professional Income",
          "businessIncome"
        )}
        {renderAmountField(
          "Rental Income *",
          data.rentalIncome,
          "rentalIncome",
          "Enter Rental Income",
          "rentalIncome"
        )}
        {renderAmountField(
          "Short-term Capital Gains (STCG) *",
          data.stcg,
          "stcg",
          "Enter Short-term Capital Gains",
          "stcg"
        )}
        {renderAmountField(
          "Long-term Capital Gains (LTCG) *",
          data.ltcg,
          "ltcg",
          "Enter Long-term Capital Gains",
          "ltcg"
        )}
        {renderAmountField(
          "Other Income *",
          data.otherIncome,
          "otherIncome",
          "Enter Other Income",
          "otherIncome"
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
