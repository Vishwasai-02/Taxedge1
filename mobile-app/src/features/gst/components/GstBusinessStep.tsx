import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../shared/theme";

const NATURE_OF_BUSINESS = [
  "Trader",
  "Manufacturer",
  "Service Provider",
  "Wholesaler / Distributor",
  "Retailer",
  "Exporter / Importer",
  "Contractor / Freelancer",
];

const ADDRESS_PROOF_TYPES = [
  "Rental Agreement",
  "Ownership Proof",
  "Electricity Bill",
  "Other Address Proof",
];

export interface GstBusinessFormData {
  registeredBusinessName: string;
  natureOfBusiness: string;
  businessAddress: string;
  bankAccountNumber: string;
  ifscCode: string;
  addressProofType: string;
}

interface GstBusinessStepProps {
  data: GstBusinessFormData;
  onChange: (fields: Partial<GstBusinessFormData>) => void;
  errors?: Record<string, string>;
}

export const GstBusinessStep: React.FC<GstBusinessStepProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const [showNatureModal, setShowNatureModal] = useState(false);

  return (
    <View style={styles.container}>
      {/* Business Name */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Business Name *</Text>
        <TextInput
          style={[styles.input, errors.registeredBusinessName && styles.inputError]}
          placeholder="Enter registered business name"
          placeholderTextColor="#94A3B8"
          value={data.registeredBusinessName}
          onChangeText={(t) => onChange({ registeredBusinessName: t })}
        />
        {errors.registeredBusinessName ? (
          <Text style={styles.errorText}>{errors.registeredBusinessName}</Text>
        ) : null}
      </View>

      {/* Nature of Business */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Nature of Business *</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowNatureModal(true)}
          style={[styles.selectInput, errors.natureOfBusiness && styles.inputError]}
        >
          <Text style={[styles.selectText, !data.natureOfBusiness && styles.placeholderText]}>
            {data.natureOfBusiness || "Select nature of business"}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#1E293B" />
        </TouchableOpacity>
        {errors.natureOfBusiness ? (
          <Text style={styles.errorText}>{errors.natureOfBusiness}</Text>
        ) : null}
      </View>

      {/* Business Address */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Business Address *</Text>
        <TextInput
          style={[styles.input, errors.businessAddress && styles.inputError]}
          placeholder="Full address with pincode"
          placeholderTextColor="#94A3B8"
          value={data.businessAddress}
          onChangeText={(t) => onChange({ businessAddress: t })}
        />
        {errors.businessAddress ? (
          <Text style={styles.errorText}>{errors.businessAddress}</Text>
        ) : null}
      </View>

      {/* Bank Account Number */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Bank Account Number *</Text>
        <TextInput
          style={[styles.input, errors.bankAccountNumber && styles.inputError]}
          placeholder="Enter account number"
          placeholderTextColor="#94A3B8"
          value={data.bankAccountNumber}
          onChangeText={(t) => onChange({ bankAccountNumber: t })}
          keyboardType="numeric"
          maxLength={18}
        />
        {errors.bankAccountNumber ? (
          <Text style={styles.errorText}>{errors.bankAccountNumber}</Text>
        ) : null}
      </View>

      {/* IFSC Code */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>IFSC Code *</Text>
        <TextInput
          style={[styles.input, errors.ifscCode && styles.inputError]}
          placeholder="Enter IFSC code"
          placeholderTextColor="#94A3B8"
          value={data.ifscCode}
          onChangeText={(t) => onChange({ ifscCode: t.toUpperCase() })}
          autoCapitalize="characters"
          maxLength={11}
        />
        {errors.ifscCode ? (
          <Text style={styles.errorText}>{errors.ifscCode}</Text>
        ) : null}
      </View>

      {/* Address Proof Type Pills */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Address Proof Type</Text>
        <View style={styles.proofGrid}>
          {ADDRESS_PROOF_TYPES.map((proof) => {
            const isSelected = data.addressProofType === proof;
            return (
              <TouchableOpacity
                key={proof}
                activeOpacity={0.8}
                onPress={() => onChange({ addressProofType: proof })}
                style={[
                  styles.proofPill,
                  isSelected && styles.proofPillSelected,
                ]}
              >
                <Text
                  style={[
                    styles.proofPillText,
                    isSelected && styles.proofPillTextSelected,
                  ]}
                >
                  {proof}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Nature Modal */}
      <Modal visible={showNatureModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowNatureModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Nature of Business</Text>
            <FlatList
              data={NATURE_OF_BUSINESS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalOption,
                    data.natureOfBusiness === item && styles.modalOptionSelected,
                  ]}
                  onPress={() => {
                    onChange({ natureOfBusiness: item });
                    setShowNatureModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      data.natureOfBusiness === item && styles.modalOptionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {data.natureOfBusiness === item && (
                    <Ionicons name="checkmark" size={18} color={BrandColors.PRIMARY_BLUE} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13.5,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
    marginBottom: 6,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  input: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    fontSize: 14,
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  errorText: {
    fontSize: 11.5,
    color: "#DC2626",
    marginTop: 4,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  selectInput: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectText: {
    fontSize: 14,
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  placeholderText: {
    color: "#94A3B8",
  },
  proofGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  proofPill: {
    width: "48%",
    paddingVertical: 13,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  proofPillSelected: {
    backgroundColor: "#FEF0E6",
    borderColor: BrandColors.PRIMARY_ORANGE,
  },
  proofPillText: {
    fontSize: 12.5,
    fontWeight: "500",
    color: BrandColors.TEXT_PRIMARY,
    textAlign: "center",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  proofPillTextSelected: {
    color: BrandColors.PRIMARY_ORANGE,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    maxHeight: 380,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    marginBottom: 14,
    textAlign: "center",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  modalOptionSelected: {
    backgroundColor: "#F8FAFC",
  },
  modalOptionText: {
    fontSize: 14,
    color: BrandColors.TEXT_PRIMARY,
    fontWeight: "500",
  },
  modalOptionTextSelected: {
    color: BrandColors.PRIMARY_BLUE,
    fontWeight: "700",
  },
});
