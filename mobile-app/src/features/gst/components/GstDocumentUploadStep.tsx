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

export const GstDocumentUploadStep: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Dashed Upload Drop Zone */}
      <View style={styles.uploadZone}>
        <View style={styles.uploadIconBox}>
          <Ionicons name="arrow-up-outline" size={24} color="#FFFFFF" />
        </View>
        <Text style={styles.uploadTitle}>Upload Document</Text>
        <Text style={styles.uploadSubtitle}>
          PDF, JPG, PNG, Excel or Word{"\n"}Max file size: 10 MB per document
        </Text>
      </View>

      {/* Action Buttons: Browse / Scan */}
      <View style={styles.actionsRow}>
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

      {/* Uploaded Documents List */}
      <Text style={styles.sectionTitle}>Uploaded Documents</Text>
      <View style={styles.uploadedList}>
        {/* Document 1: PAN_Card.pdf */}
        <View style={styles.docCard}>
          <View style={styles.docRow}>
            <View style={styles.docIconBox}>
              <Ionicons name="document-text" size={20} color="#94A3B8" />
            </View>
            <View style={styles.docInfo}>
              <Text style={styles.docName}>PAN_Card.pdf</Text>
              <Text style={styles.docSize}>2.4 MB</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: "#EFF6FF" }]}>
              <Text style={[styles.badgeText, { color: "#2563EB" }]}>● Uploaded</Text>
            </View>
          </View>
          <View style={styles.fileProgressBar}>
            <View style={[styles.fileProgressFill, { width: "100%" }]} />
          </View>
        </View>

        {/* Document 2: Business_Proof.pdf */}
        <View style={styles.docCard}>
          <View style={styles.docRow}>
            <View style={styles.docIconBox}>
              <Ionicons name="document-text" size={20} color="#94A3B8" />
            </View>
            <View style={styles.docInfo}>
              <Text style={styles.docName}>Business_Proof.pdf</Text>
              <Text style={styles.docSize}>3.1 MB</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: "#F5F3FF" }]}>
              <Text style={[styles.badgeText, { color: "#7C3AED" }]}>● Under Review</Text>
            </View>
          </View>
          <View style={styles.fileProgressBar}>
            <View style={[styles.fileProgressFill, { width: "80%" }]} />
          </View>
        </View>
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
    paddingTop: 8,
  },
  uploadZone: {
    borderWidth: 1.5,
    borderColor: "#10B981",
    borderStyle: "dashed",
    borderRadius: 16,
    backgroundColor: "#F0FDF4",
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 14,
  },
  uploadIconBox: {
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
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
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
  uploadedList: {
    gap: 10,
    marginBottom: 16,
  },
  docCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  docRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  docIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
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
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  fileProgressBar: {
    height: 4,
    backgroundColor: "#F1F5F9",
    borderRadius: 2,
    marginTop: 10,
    overflow: "hidden",
  },
  fileProgressFill: {
    height: "100%",
    backgroundColor: "#059669",
    borderRadius: 2,
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
