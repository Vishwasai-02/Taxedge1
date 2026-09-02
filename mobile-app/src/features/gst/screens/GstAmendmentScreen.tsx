import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../shared/theme";
import { GstServiceBanner } from "../components/common/GstServiceBanner";
import { GstSelectModal } from "../components/common/GstSelectModal";
import { GstFileUploadField } from "../components/common/GstFileUploadField";
import { GstSuccessAnimationScreen } from "../components/common/GstSuccessAnimationScreen";
import { GstValidators } from "../utils/gstValidators";

const AMENDMENT_FIELDS = [
  "Business Name",
  "Address",
  "Business Type",
  "Bank Details",
  "Authorized Signatory",
  "Additional Place of Business",
];

const CURRENT_REGISTERED_DATA: Record<string, string> = {
  "Business Name": "Pavan Enterprises",
  "Address": "221B, Baker Street, London, UK",
  "Business Type": "Proprietorship",
  "Bank Details": "HDFC Bank • A/C Ending in 8921",
  "Authorized Signatory": "Pavan Kalyan (Proprietor)",
  "Additional Place of Business": "None Registered",
};

export default function GstAmendmentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const gstin = "29PAVAN1234K1Z5";
  const [selectedField, setSelectedField] = useState("");
  const [newValue, setNewValue] = useState("");
  const [supportingDoc, setSupportingDoc] = useState<{ uri: string; name: string; size: string } | null>(null);

  const [showFieldModal, setShowFieldModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const oldValue = selectedField ? CURRENT_REGISTERED_DATA[selectedField] || "None" : "";

  const clearError = (key: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!selectedField) {
      errs.selectedField = "Please select the field being changed.";
    }

    if (!GstValidators.isNotEmpty(newValue, 2)) {
      errs.newValue = "New value is required.";
    } else if (oldValue && newValue.trim().toLowerCase() === oldValue.trim().toLowerCase()) {
      errs.newValue = "New value must be different from the current value.";
    }

    if (!supportingDoc) {
      errs.supportingDoc = "Please upload a supporting document as proof of change.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert("Incomplete Details", "Please correct the highlighted errors before submitting.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  if (isSubmitted) {
    return (
      <GstSuccessAnimationScreen
        title="Amendment Submitted!"
        subtitle={`Your amendment request for ${selectedField || "Address"} has been submitted for ${gstin}.\n\nOur CA team will process the change with the GST portal.`}
      />
    );
  }

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={[styles.headerBar, { paddingTop: Math.max(insets.top, 12) + 6 }]}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color={BrandColors.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GST Amendment</Text>
        <View style={styles.placeholderBox} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={true}
        overScrollMode="always"
      >
        {/* Top Info Banner */}
        <GstServiceBanner
          iconName="pencil"
          text="Update a detail on your existing GST registration"
        />

        {/* GSTIN (Read-Only) */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>GSTIN</Text>
          <TextInput
            style={[styles.input, styles.readOnlyInput]}
            value={gstin}
            editable={false}
          />
        </View>

        {/* Field Being Changed Dropdown */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Field Being Changed <Text style={styles.star}>*</Text></Text>
          <TouchableOpacity
            style={[styles.selectBox, errors.selectedField && styles.inputError]}
            activeOpacity={0.7}
            onPress={() => setShowFieldModal(true)}
          >
            <Text style={[styles.selectText, !selectedField && styles.placeholderText]}>
              {selectedField || "Select Field Being Changed"}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#64748B" />
          </TouchableOpacity>
          {errors.selectedField ? <Text style={styles.errorText}>{errors.selectedField}</Text> : null}
        </View>

        {/* Old Value Display (Auto-filled) */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Old Value</Text>
          <TextInput
            style={[styles.input, styles.readOnlyInput]}
            value={oldValue || (selectedField ? "None" : "")}
            placeholder="Select a field to view current value"
            placeholderTextColor="#94A3B8"
            editable={false}
          />
        </View>

        {/* New Value Input */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>New Value <Text style={styles.star}>*</Text></Text>
          <TextInput
            style={[styles.textArea, errors.newValue && styles.inputError]}
            placeholder="Enter new value"
            placeholderTextColor="#94A3B8"
            value={newValue}
            onChangeText={(t) => {
              setNewValue(t);
              clearError("newValue");
            }}
            multiline
            numberOfLines={4}
            maxLength={250}
          />
          <View style={styles.counterRow}>
            {errors.newValue ? <Text style={styles.errorText}>{errors.newValue}</Text> : <View />}
            <Text style={styles.charCount}>{newValue.length}/250</Text>
          </View>
        </View>

        {/* Supporting Document Upload */}
        <GstFileUploadField
          label="Supporting Document"
          required
          fileUri={supportingDoc?.uri}
          fileName={supportingDoc?.name}
          fileSize={supportingDoc?.size}
          onFileSelected={(uri, name, size) => {
            setSupportingDoc({ uri, name, size });
            clearError("supportingDoc");
          }}
          onFileRemoved={() => setSupportingDoc(null)}
          error={errors.supportingDoc}
          placeholder="Upload Supporting Document"
        />

        {/* Submit CTA */}
        <TouchableOpacity
          style={styles.actionOrangeBtn}
          activeOpacity={0.85}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.actionOrangeBtnText}>
            {isSubmitting ? "Processing..." : "Submit Amendment"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Field Selector Modal */}
      <GstSelectModal
        visible={showFieldModal}
        title="Select Field Being Changed"
        options={AMENDMENT_FIELDS}
        selectedValue={selectedField}
        onSelect={(v) => {
          setSelectedField(v);
          clearError("selectedField");
        }}
        onClose={() => setShowFieldModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  placeholderBox: { width: 38 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 240, gap: 14, flexGrow: 1 },
  fieldGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: "600", color: BrandColors.TEXT_PRIMARY },
  star: { color: "#EF4444" },
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
  readOnlyInput: {
    backgroundColor: "#F1F5F9",
    color: "#475569",
    fontWeight: "600",
  },
  textArea: {
    minHeight: 88,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
    fontSize: 13.5,
    color: BrandColors.TEXT_PRIMARY,
    textAlignVertical: "top",
  },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  charCount: { fontSize: 11, color: "#94A3B8" },
  selectBox: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectText: { fontSize: 14, fontWeight: "600", color: BrandColors.TEXT_PRIMARY },
  placeholderText: { color: "#94A3B8", fontWeight: "400" },
  inputError: { borderColor: "#EF4444", backgroundColor: "#FEF2F2" },
  errorText: { fontSize: 11.5, color: "#DC2626", fontWeight: "500" },
  actionOrangeBtn: {
    height: 52,
    borderRadius: 26,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: BrandColors.PRIMARY_ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 8,
  },
  actionOrangeBtnText: { fontSize: 15, fontWeight: "700", color: "#FFFFFF" },
});
