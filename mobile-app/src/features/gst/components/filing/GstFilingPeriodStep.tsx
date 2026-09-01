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
import { BrandColors } from "../../../../shared/theme";

const FILING_PERIODS = ["Monthly", "Quarterly", "Annual"];
const MONTHS = [
  "July 2026",
  "August 2026",
  "September 2026",
  "October 2026",
  "November 2026",
  "December 2026",
];
const FILING_TYPES = [
  "GSTR-3B (Monthly Summary Return)",
  "GSTR-1 (Outward Supplies Return)",
  "GSTR-9 (Annual Return)",
  "CMP-08 (Composition Scheme)",
];

const PREVIOUS_FILINGS = [
  { month: "June 2026", type: "GSTR-3B", status: "Filed" },
  { month: "May 2026", type: "GSTR-3B", status: "Filed" },
  { month: "Apr 2026", type: "GSTR-3B", status: "Filed" },
];

export interface GstFilingPeriodData {
  periodType: string;
  filingMonth: string;
  gstin: string;
  filingType: string;
}

interface GstFilingPeriodStepProps {
  data: GstFilingPeriodData;
  onChange: (fields: Partial<GstFilingPeriodData>) => void;
  errors?: Record<string, string>;
}

export const GstFilingPeriodStep: React.FC<GstFilingPeriodStepProps> = ({
  data,
  onChange,
  errors = {},
}) => {
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);

  return (
    <View style={styles.container}>
      {/* 1. Select Filing Period (Pills) */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Select Filing Period *</Text>
        <View style={styles.periodPillsRow}>
          {FILING_PERIODS.map((period) => {
            const isSelected = data.periodType === period;
            return (
              <TouchableOpacity
                key={period}
                activeOpacity={0.8}
                onPress={() => onChange({ periodType: period })}
                style={[styles.periodPill, isSelected && styles.periodPillActive]}
              >
                <Text
                  style={[
                    styles.periodPillText,
                    isSelected && styles.periodPillTextActive,
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 2. Filing Month / Period */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Filing Month / Period *</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowMonthModal(true)}
          style={[styles.selectInput, errors.filingMonth && styles.inputError]}
        >
          <Text style={styles.selectText}>{data.filingMonth || "Select month"}</Text>
          <Ionicons name="chevron-down" size={18} color="#1E293B" />
        </TouchableOpacity>
        {errors.filingMonth ? (
          <Text style={styles.errorText}>{errors.filingMonth}</Text>
        ) : null}
      </View>

      {/* 3. GSTIN */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>GSTIN *</Text>
        <TextInput
          style={[styles.input, errors.gstin && styles.inputError]}
          placeholder="29AKHIL1234K1Z5"
          placeholderTextColor="#94A3B8"
          value={data.gstin}
          onChangeText={(t) => onChange({ gstin: t.toUpperCase() })}
          autoCapitalize="characters"
          maxLength={15}
        />
        {errors.gstin ? <Text style={styles.errorText}>{errors.gstin}</Text> : null}
      </View>

      {/* 4. Filing Type */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Filing Type *</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowTypeModal(true)}
          style={[styles.selectInput, errors.filingType && styles.inputError]}
        >
          <Text style={styles.selectText} numberOfLines={1}>
            {data.filingType || "Select filing type"}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#1E293B" />
        </TouchableOpacity>
        {errors.filingType ? (
          <Text style={styles.errorText}>{errors.filingType}</Text>
        ) : null}
      </View>

      {/* 5. Previous Filing Status Card */}
      <View style={styles.prevCard}>
        <Text style={styles.prevTitle}>Previous Filing Status</Text>
        <View style={styles.prevList}>
          {PREVIOUS_FILINGS.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.prevRow,
                idx < PREVIOUS_FILINGS.length - 1 && styles.prevRowBorder,
              ]}
            >
              <View>
                <Text style={styles.prevMonth}>{item.month}</Text>
                <Text style={styles.prevType}>{item.type}</Text>
              </View>
              <Text style={styles.prevStatus}>{item.status}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Month Modal */}
      <Modal visible={showMonthModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMonthModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Filing Month</Text>
            <FlatList
              data={MONTHS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalOption,
                    data.filingMonth === item && styles.modalOptionSelected,
                  ]}
                  onPress={() => {
                    onChange({ filingMonth: item });
                    setShowMonthModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                  {data.filingMonth === item && (
                    <Ionicons name="checkmark" size={18} color={BrandColors.PRIMARY_BLUE} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Filing Type Modal */}
      <Modal visible={showTypeModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowTypeModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Filing Type</Text>
            <FlatList
              data={FILING_TYPES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalOption,
                    data.filingType === item && styles.modalOptionSelected,
                  ]}
                  onPress={() => {
                    onChange({ filingType: item });
                    setShowTypeModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                  {data.filingType === item && (
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
  periodPillsRow: {
    flexDirection: "row",
    gap: 8,
  },
  periodPill: {
    flex: 1,
    height: 44,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
  },
  periodPillActive: {
    backgroundColor: "#059669",
    borderColor: "#059669",
  },
  periodPillText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  periodPillTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
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
  input: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    fontSize: 14,
    color: BrandColors.TEXT_PRIMARY,
    fontWeight: "600",
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
  prevCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEF2F6",
    marginTop: 4,
    marginBottom: 10,
  },
  prevTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    marginBottom: 12,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  prevList: {
    gap: 8,
  },
  prevRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  prevRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
    paddingBottom: 10,
  },
  prevMonth: {
    fontSize: 13,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  prevType: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 1,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  prevStatus: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#059669",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
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
});
