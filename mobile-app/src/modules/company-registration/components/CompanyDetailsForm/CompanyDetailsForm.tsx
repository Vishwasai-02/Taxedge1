import React from "react";
import { View, StyleSheet } from "react-native";
import { FormInput } from "../../../../shared/components/Input/FormInput";
import type { CompanyDetails } from "../../types/company.types";

export interface CompanyDetailsFormProps {
  values: Partial<CompanyDetails>;
  onChange: (updates: Partial<CompanyDetails>) => void;
}

export const CompanyDetailsForm: React.FC<CompanyDetailsFormProps> = ({
  values,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <FormInput
        label="Proposed Company Name (Option 1)"
        value={values.proposedName1 || ""}
        onChangeText={(text) => onChange({ proposedName1: text })}
        placeholder="e.g. Acme Tech Solutions Private Limited"
        required
      />
      <FormInput
        label="Proposed Company Name (Option 2 - Alternative)"
        value={values.proposedName2 || ""}
        onChangeText={(text) => onChange({ proposedName2: text })}
        placeholder="e.g. Acme Innovations Private Limited"
      />
      <FormInput
        label="Industry Category"
        value={values.industryCategory || ""}
        onChangeText={(text) => onChange({ industryCategory: text })}
        placeholder="e.g. Information Technology / Software"
        required
      />
      <FormInput
        label="Business Activity Description"
        value={values.businessActivityDescription || ""}
        onChangeText={(text) => onChange({ businessActivityDescription: text })}
        placeholder="Brief description of business operations"
        required
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default CompanyDetailsForm;
