import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { BrandColors } from "../../../../shared/theme";
import { GstFileUploadField } from "../common/GstFileUploadField";

interface GstReconciliationSectionProps {
  purchaseDoc: { uri: string; name: string; size: string } | null;
  onSelectPurchaseDoc: (doc: { uri: string; name: string; size: string } | null) => void;
  purchaseError?: string;
  salesDoc: { uri: string; name: string; size: string } | null;
  onSelectSalesDoc: (doc: { uri: string; name: string; size: string } | null) => void;
  salesError?: string;
  gstr2bRef: string;
  onChangeGstr2bRef: (val: string) => void;
  gstr2bError?: string;
}

export const GstReconciliationSection: React.FC<GstReconciliationSectionProps> = ({
  purchaseDoc,
  onSelectPurchaseDoc,
  purchaseError,
  salesDoc,
  onSelectSalesDoc,
  salesError,
  gstr2bRef,
  onChangeGstr2bRef,
  gstr2bError,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Reconciliation Documents</Text>

      <GstFileUploadField
        label="Purchase Register"
        description="Upload your purchase invoices / statement (PDF, XLS, CSV)"
        required
        fileUri={purchaseDoc?.uri}
        fileName={purchaseDoc?.name}
        fileSize={purchaseDoc?.size}
        onFileSelected={(uri, name, size) => onSelectPurchaseDoc({ uri, name, size })}
        onFileRemoved={() => onSelectPurchaseDoc(null)}
        error={purchaseError}
        placeholder="Upload Purchase Register"
      />

      <GstFileUploadField
        label="Sales Register"
        description="Upload your outward supplies register"
        required
        fileUri={salesDoc?.uri}
        fileName={salesDoc?.name}
        fileSize={salesDoc?.size}
        onFileSelected={(uri, name, size) => onSelectSalesDoc({ uri, name, size })}
        onFileRemoved={() => onSelectSalesDoc(null)}
        error={salesError}
        placeholder="Upload Sales Register"
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>GSTR-2B Reference *</Text>
        <Text style={styles.subText}>The government's auto-generated purchase statement reference or ARN</Text>
        <TextInput
          style={[styles.input, gstr2bError && styles.inputError]}
          placeholder="Enter GSTR-2B reference / ARN"
          placeholderTextColor="#94A3B8"
          value={gstr2bRef}
          onChangeText={onChangeGstr2bRef}
        />
        {gstr2bError ? <Text style={styles.errorText}>{gstr2bError}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEF2F6",
    gap: 14,
  },
  heading: { fontSize: 14.5, fontWeight: "700", color: BrandColors.TEXT_PRIMARY, marginBottom: 2 },
  fieldGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: "700", color: BrandColors.TEXT_PRIMARY },
  subText: { fontSize: 11.5, color: "#64748B", marginTop: -2 },
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
  inputError: { borderColor: "#EF4444", backgroundColor: "#FEF2F2" },
  errorText: { fontSize: 11.5, color: "#DC2626", fontWeight: "500" },
});
