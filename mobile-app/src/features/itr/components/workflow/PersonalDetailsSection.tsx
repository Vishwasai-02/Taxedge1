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
import { BrandColors, Shadows } from "../../../../shared/theme";
import { PersonalDetailsData } from "../../types/workflowTypes";
import { FormValidationErrors } from "../../utils/validation";

interface PersonalDetailsSectionProps {
  data: PersonalDetailsData;
  errors?: FormValidationErrors;
  onChange: (updated: Partial<PersonalDetailsData>) => void;
}

const ASSESSMENT_YEAR_OPTIONS = [
  "AY 2025-26",
  "AY 2024-25",
  "AY 2023-24",
  "AY 2022-23",
];

export const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({
  data,
  errors = {},
  onChange,
}) => {
  const [showAyModal, setShowAyModal] = useState(false);

  const formatAadhaar = (val: string) => {
    const raw = val.replace(/[^0-9]/g, "").slice(0, 12);
    const parts = [];
    for (let i = 0; i < raw.length; i += 4) {
      parts.push(raw.slice(i, i + 4));
    }
    return parts.join(" ");
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Personal Details</Text>
      <View style={styles.card}>
        {/* PAN Number */}
        <View style={styles.fieldWrapper}>
          <Text style={styles.inputLabel}>PAN Number *</Text>
          <TextInput
            style={[
              styles.textInput,
              errors.panNumber ? styles.textInputError : null,
            ]}
            value={data.panNumber}
            onChangeText={(val) => {
              const clean = val.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
              onChange({ panNumber: clean });
            }}
            placeholder="Enter PAN Number"
            placeholderTextColor={BrandColors.TEXT_MUTED}
            autoCapitalize="characters"
            maxLength={10}
            autoCorrect={false}
          />
          {errors.panNumber ? (
            <Text style={styles.errorText}>{errors.panNumber}</Text>
          ) : null}
        </View>

        {/* Aadhaar Number */}
        <View style={styles.fieldWrapper}>
          <Text style={styles.inputLabel}>Aadhaar Number *</Text>
          <TextInput
            style={[
              styles.textInput,
              errors.aadhaarNumber ? styles.textInputError : null,
            ]}
            value={data.aadhaarNumber}
            onChangeText={(val) => {
              const formatted = formatAadhaar(val);
              onChange({ aadhaarNumber: formatted });
            }}
            placeholder="Enter Aadhaar Number"
            placeholderTextColor={BrandColors.TEXT_MUTED}
            keyboardType="number-pad"
            maxLength={14}
          />
          {errors.aadhaarNumber ? (
            <Text style={styles.errorText}>{errors.aadhaarNumber}</Text>
          ) : null}
        </View>

        {/* Assessment Year (Dropdown Selection - No Free Text) */}
        <View style={[styles.fieldWrapper, { marginBottom: 0 }]}>
          <Text style={styles.inputLabel}>Assessment Year *</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowAyModal(true)}
            style={[
              styles.dropdownButton,
              errors.assessmentYear ? styles.textInputError : null,
            ]}
          >
            <Text
              style={[
                styles.dropdownText,
                !data.assessmentYear && { color: BrandColors.TEXT_MUTED },
              ]}
            >
              {data.assessmentYear || "Select Assessment Year"}
            </Text>
            <Ionicons name="chevron-down" size={18} color={BrandColors.PRIMARY_BLUE} />
          </TouchableOpacity>
          {errors.assessmentYear ? (
            <Text style={styles.errorText}>{errors.assessmentYear}</Text>
          ) : null}
        </View>
      </View>

      {/* Assessment Year Selection Modal */}
      <Modal
        visible={showAyModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAyModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowAyModal(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Assessment Year</Text>
              <TouchableOpacity onPress={() => setShowAyModal(false)}>
                <Ionicons name="close" size={22} color={BrandColors.TEXT_PRIMARY} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={ASSESSMENT_YEAR_OPTIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isSelected = data.assessmentYear === item;
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      onChange({ assessmentYear: item });
                      setShowAyModal(false);
                    }}
                    style={[
                      styles.optionRow,
                      isSelected && styles.optionRowSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color={BrandColors.PRIMARY_ORANGE}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
  textInput: {
    height: 48,
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: BrandColors.TEXT_PRIMARY,
    backgroundColor: "#F8FAFC",
  },
  dropdownButton: {
    height: 48,
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownText: {
    fontSize: 15,
    color: BrandColors.TEXT_PRIMARY,
    fontWeight: "600",
  },
  textInputError: {
    borderColor: BrandColors.PRIMARY_ORANGE,
    backgroundColor: "#FFF9F5",
  },
  errorText: {
    fontSize: 12,
    fontWeight: "600",
    color: BrandColors.PRIMARY_ORANGE,
    marginTop: 4,
    marginLeft: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(11, 31, 58, 0.45)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    ...Shadows.md,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.BORDER,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: BrandColors.PRIMARY_BLUE,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  optionRowSelected: {
    backgroundColor: BrandColors.PRIMARY_LIGHT_BLUE,
  },
  optionText: {
    fontSize: 15,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
  },
  optionTextSelected: {
    color: BrandColors.PRIMARY_BLUE,
    fontWeight: "800",
  },
});
