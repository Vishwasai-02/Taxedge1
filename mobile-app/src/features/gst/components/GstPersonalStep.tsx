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

const BUSINESS_TYPES = [
  "Proprietorship",
  "Partnership Firm",
  "Private Limited Company",
  "Limited Liability Partnership (LLP)",
  "One Person Company (OPC)",
  "Trust / Society / NGO",
];

export interface GstPersonalFormData {
  panNumber: string;
  aadhaarNumber: string;
  mobileNumber: string;
  emailAddress: string;
  businessName: string;
  businessType: string;
}

interface GstPersonalStepProps {
  data: GstPersonalFormData;
  onChange: (fields: Partial<GstPersonalFormData>) => void;
  errors?: Record<string, string>;
}

export const GstPersonalStep: React.FC<GstPersonalStepProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const [showTypeModal, setShowTypeModal] = useState(false);

  return (
    <View style={styles.container}>
      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <View style={styles.infoIconBox}>
          <Ionicons name="information" size={16} color="#FFFFFF" />
        </View>
        <Text style={styles.infoText}>
          Enter your personal details exactly as they appear on your PAN card and Aadhaar.
        </Text>
      </View>

      {/* PAN Number */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>PAN Number *</Text>
        <TextInput
          style={[styles.input, errors.panNumber && styles.inputError]}
          placeholder="ABCDE1234F"
          placeholderTextColor="#94A3B8"
          value={data.panNumber}
          onChangeText={(t) => onChange({ panNumber: t.toUpperCase() })}
          autoCapitalize="characters"
          maxLength={10}
        />
        {errors.panNumber ? (
          <Text style={styles.errorText}>{errors.panNumber}</Text>
        ) : null}
      </View>

      {/* Aadhaar Number */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Aadhaar Number *</Text>
        <TextInput
          style={[styles.input, errors.aadhaarNumber && styles.inputError]}
          placeholder="XXXX XXXX XXXX"
          placeholderTextColor="#94A3B8"
          value={data.aadhaarNumber}
          onChangeText={(t) => onChange({ aadhaarNumber: t })}
          keyboardType="numeric"
          maxLength={14}
        />
        {errors.aadhaarNumber ? (
          <Text style={styles.errorText}>{errors.aadhaarNumber}</Text>
        ) : null}
      </View>

      {/* Mobile Number */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Mobile Number *</Text>
        <TextInput
          style={[styles.input, errors.mobileNumber && styles.inputError]}
          placeholder="+91 XXXXX XXXXX"
          placeholderTextColor="#94A3B8"
          value={data.mobileNumber}
          onChangeText={(t) => onChange({ mobileNumber: t })}
          keyboardType="phone-pad"
          maxLength={13}
        />
        {errors.mobileNumber ? (
          <Text style={styles.errorText}>{errors.mobileNumber}</Text>
        ) : null}
      </View>

      {/* Email Address */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={[styles.input, errors.emailAddress && styles.inputError]}
          placeholder="email@business.com"
          placeholderTextColor="#94A3B8"
          value={data.emailAddress}
          onChangeText={(t) => onChange({ emailAddress: t })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.emailAddress ? (
          <Text style={styles.errorText}>{errors.emailAddress}</Text>
        ) : null}
      </View>

      {/* Business / Trade Name */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Business / Trade Name *</Text>
        <TextInput
          style={[styles.input, errors.businessName && styles.inputError]}
          placeholder="Enter your business name"
          placeholderTextColor="#94A3B8"
          value={data.businessName}
          onChangeText={(t) => onChange({ businessName: t })}
        />
        {errors.businessName ? (
          <Text style={styles.errorText}>{errors.businessName}</Text>
        ) : null}
      </View>

      {/* Business Type Selector */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Business Type *</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowTypeModal(true)}
          style={[styles.selectInput, errors.businessType && styles.inputError]}
        >
          <Text style={[styles.selectText, !data.businessType && styles.placeholderText]}>
            {data.businessType || "Select business type"}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#1E293B" />
        </TouchableOpacity>
        {errors.businessType ? (
          <Text style={styles.errorText}>{errors.businessType}</Text>
        ) : null}
      </View>

      {/* Modal for Type Selection */}
      <Modal visible={showTypeModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowTypeModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Business Type</Text>
            <FlatList
              data={BUSINESS_TYPES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalOption,
                    data.businessType === item && styles.modalOptionSelected,
                  ]}
                  onPress={() => {
                    onChange({ businessType: item });
                    setShowTypeModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      data.businessType === item && styles.modalOptionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {data.businessType === item && (
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
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF1FE",
    borderRadius: 14,
    padding: 13,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(8, 59, 117, 0.12)",
    gap: 10,
  },
  infoIconBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: BrandColors.PRIMARY_BLUE,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    flex: 1,
    fontSize: 12.5,
    color: BrandColors.PRIMARY_BLUE,
    lineHeight: 18,
    fontWeight: "500",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
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
