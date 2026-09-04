import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../shared/theme";
import { GstFileUploadField } from "../common/GstFileUploadField";

interface GstNoticeResponseSectionProps {
  noticeNumber: string;
  onChangeNoticeNumber: (val: string) => void;
  noticeNumberError?: string;
  noticeDoc: { uri: string; name: string; size: string } | null;
  onSelectNoticeDoc: (doc: { uri: string; name: string; size: string } | null) => void;
  noticeDocError?: string;
  dueDate: string;
  onOpenDatePicker: () => void;
  dueDateError?: string;
}

export const GstNoticeResponseSection: React.FC<GstNoticeResponseSectionProps> = ({
  noticeNumber,
  onChangeNoticeNumber,
  noticeNumberError,
  noticeDoc,
  onSelectNoticeDoc,
  noticeDocError,
  dueDate,
  onOpenDatePicker,
  dueDateError,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Department Notice Details</Text>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Department Notice Number *</Text>
        <TextInput
          style={[styles.input, noticeNumberError && styles.inputError]}
          placeholder="Enter notice number"
          placeholderTextColor="#94A3B8"
          value={noticeNumber}
          onChangeText={onChangeNoticeNumber}
        />
        {noticeNumberError ? <Text style={styles.errorText}>{noticeNumberError}</Text> : null}
      </View>

      <GstFileUploadField
        label="Notice Document"
        description="Upload copy of the official department notice (PDF / JPG)"
        required
        fileUri={noticeDoc?.uri}
        fileName={noticeDoc?.name}
        fileSize={noticeDoc?.size}
        onFileSelected={(uri, name, size) => onSelectNoticeDoc({ uri, name, size })}
        onFileRemoved={() => onSelectNoticeDoc(null)}
        error={noticeDocError}
        placeholder="Upload Notice Document"
      />

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Response Due Date *</Text>
        <TouchableOpacity
          style={[styles.selectBox, dueDateError && styles.inputError]}
          activeOpacity={0.7}
          onPress={onOpenDatePicker}
        >
          <Text style={[styles.selectText, !dueDate && styles.placeholderText]}>
            {dueDate || "Select Response Due Date"}
          </Text>
          <Ionicons name="calendar-outline" size={18} color="#083B75" />
        </TouchableOpacity>
        {dueDateError ? <Text style={styles.errorText}>{dueDateError}</Text> : null}
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
  selectBox: {
    height: 48,
    backgroundColor: "#F8FAFC",
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
});
