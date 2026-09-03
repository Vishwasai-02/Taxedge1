import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PersonalInformationData, IncomeDetailsFormErrors } from "../../types/incomeDetails.types";
import { AssessmentYearPickerModal } from "./AssessmentYearPickerModal";

interface PersonalInformationCardProps {
  data: PersonalInformationData;
  errors: IncomeDetailsFormErrors;
  onChange: (updated: Partial<PersonalInformationData>) => void;
}

export const PersonalInformationCard: React.FC<PersonalInformationCardProps> = ({
  data,
  errors,
  onChange,
}) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showYearModal, setShowYearModal] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Personal Information</Text>

      {/* Row with PAN & Aadhaar */}
      <View style={styles.twoColumnRow}>
        {/* PAN Number Field */}
        <View style={styles.columnField}>
          <Text style={styles.fieldLabel}>
            PAN Number <Text style={styles.requiredStar}>*</Text>
          </Text>
          <View
            style={[
              styles.inputContainer,
              focusedField === "pan" && styles.inputFocused,
              !!errors.panNumber && styles.inputError,
            ]}
          >
            <Ionicons name="card-outline" size={18} color="#0B1F3A" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter PAN Number"
              placeholderTextColor="#94A3B8"
              value={data.panNumber}
              autoCapitalize="characters"
              maxLength={10}
              onFocus={() => setFocusedField("pan")}
              onBlur={() => setFocusedField(null)}
              onChangeText={(text) => onChange({ panNumber: text.toUpperCase() })}
            />
          </View>
          {!!errors.panNumber && (
            <Text style={styles.errorText}>{errors.panNumber}</Text>
          )}
        </View>

        {/* Aadhaar Number Field */}
        <View style={styles.columnField}>
          <Text style={styles.fieldLabel}>
            Aadhaar Number <Text style={styles.requiredStar}>*</Text>
          </Text>
          <View
            style={[
              styles.inputContainer,
              focusedField === "aadhaar" && styles.inputFocused,
              !!errors.aadhaarNumber && styles.inputError,
            ]}
          >
            <Ionicons name="person-outline" size={18} color="#0B1F3A" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter Aadhaar Number"
              placeholderTextColor="#94A3B8"
              value={data.aadhaarNumber}
              keyboardType="number-pad"
              maxLength={12}
              onFocus={() => setFocusedField("aadhaar")}
              onBlur={() => setFocusedField(null)}
              onChangeText={(text) => onChange({ aadhaarNumber: text.replace(/[^0-9]/g, "") })}
            />
          </View>
          {!!errors.aadhaarNumber && (
            <Text style={styles.errorText}>{errors.aadhaarNumber}</Text>
          )}
        </View>
      </View>

      {/* Assessment Year Field */}
      <View style={styles.fullWidthField}>
        <Text style={styles.fieldLabel}>
          Assessment Year <Text style={styles.requiredStar}>*</Text>
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowYearModal(true)}
          style={[
            styles.dropdownContainer,
            !!errors.assessmentYear && styles.inputError,
          ]}
        >
          <Text
            style={[
              styles.dropdownText,
              !data.assessmentYear && styles.dropdownPlaceholder,
            ]}
          >
            {data.assessmentYear
              ? `${data.assessmentYear}`
              : "Select Assessment Year"}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#0B1F3A" />
        </TouchableOpacity>
        {!!errors.assessmentYear && (
          <Text style={styles.errorText}>{errors.assessmentYear}</Text>
        )}
      </View>

      <AssessmentYearPickerModal
        visible={showYearModal}
        selectedYear={data.assessmentYear}
        onSelect={(year) => onChange({ assessmentYear: year })}
        onClose={() => setShowYearModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0B1F3A",
    marginBottom: 14,
  },
  twoColumnRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  columnField: {
    flex: 1,
  },
  fullWidthField: {
    marginTop: 2,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0B1F3A",
    marginBottom: 6,
  },
  requiredStar: {
    color: "#DC2626",
    fontWeight: "700",
  },
  inputContainer: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  inputFocused: {
    borderColor: "#F97316",
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#DC2626",
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: "#0B1F3A",
    fontWeight: "500",
    padding: 0,
  },
  dropdownContainer: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  dropdownText: {
    fontSize: 13.5,
    fontWeight: "500",
    color: "#0B1F3A",
  },
  dropdownPlaceholder: {
    color: "#94A3B8",
  },
  errorText: {
    fontSize: 11,
    color: "#DC2626",
    marginTop: 4,
    fontWeight: "500",
  },
});
