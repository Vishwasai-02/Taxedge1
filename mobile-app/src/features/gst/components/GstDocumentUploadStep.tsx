import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../shared/theme";
import { pickImageFromGallery, pickImageFromCamera } from "../utils/imageUploadHelper";

interface UploadedDoc {
  id: string;
  name: string;
  size: string;
  uri?: string;
  status: "Uploaded" | "Under Review";
}

const DEFAULT_DOCS: UploadedDoc[] = [
  { id: "1", name: "PAN_Card.pdf", size: "2.4 MB", status: "Uploaded" },
  { id: "2", name: "Business_Proof.pdf", size: "3.1 MB", status: "Under Review" },
];

export const GstDocumentUploadStep: React.FC = () => {
  const [documents, setDocuments] = useState<UploadedDoc[]>(DEFAULT_DOCS);

  const handleUploadFromGallery = async () => {
    const uri = await pickImageFromGallery();
    if (uri) {
      const newDoc: UploadedDoc = {
        id: Date.now().toString(),
        name: `Document_${documents.length + 1}.jpg`,
        size: "1.8 MB",
        uri,
        status: "Uploaded",
      };
      setDocuments((prev) => [newDoc, ...prev]);
    }
  };

  const handleUploadFromCamera = async () => {
    const uri = await pickImageFromCamera();
    if (uri) {
      const newDoc: UploadedDoc = {
        id: Date.now().toString(),
        name: `Scanned_Doc_${documents.length + 1}.jpg`,
        size: "2.1 MB",
        uri,
        status: "Uploaded",
      };
      setDocuments((prev) => [newDoc, ...prev]);
    }
  };

  const handleUploadBoxPress = () => {
    Alert.alert("Upload Document", "Choose source to select and crop image:", [
      { text: "Browse Gallery", onPress: handleUploadFromGallery },
      { text: "Scan with Camera", onPress: handleUploadFromCamera },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleRemoveDoc = (id: string) => {
    Alert.alert("Remove Document", "Are you sure you want to remove this document?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => setDocuments((prev) => prev.filter((d) => d.id !== id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Upload Zone */}
      <TouchableOpacity
        style={styles.uploadZone}
        activeOpacity={0.75}
        onPress={handleUploadBoxPress}
      >
        <View style={styles.uploadIconBox}>
          <Ionicons name="arrow-up-outline" size={24} color="#FFFFFF" />
        </View>
        <Text style={styles.uploadTitle}>Upload Document</Text>
        <Text style={styles.uploadSubtitle}>
          PDF, JPG, PNG, Excel or Word{"\n"}Max file size: 10 MB per document
        </Text>
      </TouchableOpacity>

      {/* Action Buttons: Browse Files & Scan Document */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.8}
          onPress={handleUploadFromGallery}
        >
          <Ionicons name="folder" size={18} color="#F59E0B" />
          <Text style={styles.actionBtnText}>Browse Files</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          activeOpacity={0.8}
          onPress={handleUploadFromCamera}
        >
          <Ionicons name="camera" size={18} color="#64748B" />
          <Text style={styles.actionBtnText}>Scan Document</Text>
        </TouchableOpacity>
      </View>

      {/* Uploaded Documents List */}
      <Text style={styles.sectionTitle}>Uploaded Documents</Text>
      <View style={styles.uploadedList}>
        {documents.map((doc) => (
          <View key={doc.id} style={styles.docCard}>
            <View style={styles.docRow}>
              {doc.uri ? (
                <Image source={{ uri: doc.uri }} style={styles.docThumbnail} />
              ) : (
                <View style={styles.docIconBox}>
                  <Ionicons name="document-text" size={20} color="#94A3B8" />
                </View>
              )}

              <View style={styles.docInfo}>
                <Text style={styles.docName} numberOfLines={1}>
                  {doc.name}
                </Text>
                <Text style={styles.docSize}>{doc.size}</Text>
              </View>

              <View style={[styles.badge, doc.status === "Uploaded" ? styles.badgeUploaded : styles.badgeReview]}>
                <Text style={[styles.badgeText, doc.status === "Uploaded" ? styles.badgeTextUploaded : styles.badgeTextReview]}>
                  ● {doc.status}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => handleRemoveDoc(doc.id)}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>

            <View style={styles.fileProgressBar}>
              <View style={[styles.fileProgressFill, { width: doc.status === "Uploaded" ? "100%" : "80%" }]} />
            </View>
          </View>
        ))}
      </View>

      {/* Warning Callout Box */}
      <View style={styles.warningBox}>
        <Ionicons name="alert-circle-outline" size={18} color={BrandColors.PRIMARY_ORANGE} />
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
    paddingBottom: 24,
  },
  uploadZone: {
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    borderStyle: "dashed",
    paddingVertical: 26,
    alignItems: "center",
    marginBottom: 16,
  },
  uploadIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 18,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  actionBtn: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  actionBtnText: {
    fontSize: 13.5,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    marginBottom: 12,
  },
  uploadedList: {
    gap: 10,
    marginBottom: 16,
  },
  docCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  docRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  docIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  docThumbnail: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#F1F5F9",
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 13,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  docSize: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  badgeUploaded: {
    backgroundColor: "#EFF6FF",
  },
  badgeReview: {
    backgroundColor: "#FEF0E6",
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: "700",
  },
  badgeTextUploaded: {
    color: "#2563EB",
  },
  badgeTextReview: {
    color: BrandColors.PRIMARY_ORANGE,
  },
  removeBtn: {
    padding: 4,
  },
  fileProgressBar: {
    height: 4,
    backgroundColor: "#F1F5F9",
    borderRadius: 2,
    overflow: "hidden",
  },
  fileProgressFill: {
    height: "100%",
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    borderRadius: 2,
  },
  warningBox: {
    flexDirection: "row",
    backgroundColor: "#FEF0E6",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#FFD8BF",
    gap: 8,
    alignItems: "center",
  },
  warningText: {
    flex: 1,
    fontSize: 11.5,
    color: "#9A3412",
    lineHeight: 16,
  },
});
