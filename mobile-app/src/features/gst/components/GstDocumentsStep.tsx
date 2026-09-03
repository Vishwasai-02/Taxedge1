import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../shared/theme";

export interface GstDocumentItem {
  id: string;
  name: string;
  fileName?: string;
  size?: string;
  status: "Approved" | "Uploaded" | "Under Review" | "Pending";
  iconName: string;
  iconBg: string;
  iconColor: string;
}

const DEFAULT_DOCUMENTS: GstDocumentItem[] = [
  {
    id: "pan",
    name: "PAN Card",
    fileName: "PAN_Card.pdf",
    size: "2.4 MB",
    status: "Approved",
    iconName: "card",
    iconBg: "#E0F2FE",
    iconColor: "#0284C7",
  },
  {
    id: "aadhaar",
    name: "Aadhaar Card",
    status: "Approved",
    iconName: "finger-print",
    iconBg: "#F3E8FF",
    iconColor: "#7E22CE",
  },
  {
    id: "business-proof",
    name: "Business Proof",
    fileName: "Business_Proof.pdf",
    size: "3.1 MB",
    status: "Uploaded",
    iconName: "document-text",
    iconBg: "#E0F2FE",
    iconColor: "#2563EB",
  },
  {
    id: "address-proof",
    name: "Address Proof",
    status: "Under Review",
    iconName: "home",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
  },
  {
    id: "bank-statement",
    name: "Bank Passbook / Statement",
    status: "Pending",
    iconName: "business",
    iconBg: "#F1F5F9",
    iconColor: "#64748B",
  },
  {
    id: "electricity",
    name: "Electricity Bill",
    status: "Pending",
    iconName: "flash",
    iconBg: "#FEF2F2",
    iconColor: "#DC2626",
  },
  {
    id: "rental",
    name: "Rental Agreement",
    status: "Pending",
    iconName: "receipt",
    iconBg: "#F1F5F9",
    iconColor: "#64748B",
  },
];

interface GstDocumentsStepProps {
  documents?: GstDocumentItem[];
  onUpload?: (docId: string) => void;
}

export const GstDocumentsStep: React.FC<GstDocumentsStepProps> = ({
  documents = DEFAULT_DOCUMENTS,
  onUpload,
}) => {
  const getStatusBadge = (status: GstDocumentItem["status"]) => {
    switch (status) {
      case "Approved":
        return { bg: "#E6F7EF", text: "#059669", label: "● Approved" };
      case "Uploaded":
        return { bg: "#EFF6FF", text: "#2563EB", label: "● Uploaded" };
      case "Under Review":
        return { bg: "#F5F3FF", text: "#7C3AED", label: "● Under Review" };
      case "Pending":
      default:
        return { bg: "#FFFBEB", text: "#D97706", label: "● Pending" };
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Info Header */}
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>
          Upload the following documents to continue.{" "}
          <Text style={styles.progressCount}>4/9 Done</Text>
        </Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      {/* Upload Drop Zone Card */}
      <View style={styles.uploadZone}>
        <View style={styles.uploadIconCircle}>
          <Ionicons name="arrow-up-outline" size={22} color="#FFFFFF" />
        </View>
        <Text style={styles.uploadTitle}>Upload Document</Text>
        <Text style={styles.uploadSubtitle}>
          PDF, JPG, PNG, Excel or Word{"\n"}Max file size: 10 MB per document
        </Text>
      </View>

      {/* Action Buttons Row */}
      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.8}
          onPress={() => Alert.alert("Browse Files", "Select document to upload.")}
        >
          <Ionicons name="folder" size={18} color="#F59E0B" />
          <Text style={styles.actionBtnText}>Browse Files</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.8}
          onPress={() => Alert.alert("Scan Document", "Camera scanner initiated.")}
        >
          <Ionicons name="camera" size={18} color="#64748B" />
          <Text style={styles.actionBtnText}>Scan Document</Text>
        </TouchableOpacity>
      </View>

      {/* Documents List */}
      <Text style={styles.sectionTitle}>Uploaded Documents</Text>
      <View style={styles.docList}>
        {documents.map((doc) => {
          const badge = getStatusBadge(doc.status);
          return (
            <View key={doc.id} style={styles.docCard}>
              <View style={[styles.docIconBox, { backgroundColor: doc.iconBg }]}>
                <Ionicons name={doc.iconName as any} size={20} color={doc.iconColor} />
              </View>
              <View style={styles.docInfo}>
                <Text style={styles.docName}>{doc.fileName || doc.name}</Text>
                {doc.size && <Text style={styles.docSize}>{doc.size}</Text>}
              </View>
              <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                <Text style={[styles.statusBadgeText, { color: badge.text }]}>
                  {badge.label}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Warning Callout Box */}
      <View style={styles.warningBox}>
        <Ionicons name="alert-circle-outline" size={18} color="#D97706" />
        <Text style={styles.warningText}>
          Ensure all documents are clear, readable and not expired. Blurry or cropped documents may cause delays.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
  progressHeader: {
    marginBottom: 14,
  },
  progressTitle: {
    fontSize: 13.5,
    color: "#334155",
    fontWeight: "500",
    marginBottom: 8,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  progressCount: {
    color: "#059669",
    fontWeight: "700",
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  progressFill: {
    width: "45%",
    height: "100%",
    backgroundColor: "#059669",
    borderRadius: 3,
  },
  uploadZone: {
    borderWidth: 1.5,
    borderColor: "#10B981",
    borderStyle: "dashed",
    borderRadius: 16,
    backgroundColor: "#FAFAF9",
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  uploadIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#059669",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    marginBottom: 4,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  uploadSubtitle: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 16,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  actionButtonsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 46,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  sectionTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    marginBottom: 10,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  docList: {
    gap: 10,
    marginBottom: 14,
  },
  docCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  docIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 13.5,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  docSize: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 2,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF9C3",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#FEF08A",
    gap: 10,
    marginBottom: 10,
  },
  warningText: {
    flex: 1,
    fontSize: 11.5,
    color: "#854D0E",
    lineHeight: 16,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
});
