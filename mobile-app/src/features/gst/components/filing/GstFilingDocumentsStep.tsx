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
import { BrandColors } from "../../../../shared/theme";
import { pickImageFromGallery, pickImageFromCamera } from "../../utils/imageUploadHelper";

export interface FilingDocItem {
  id: string;
  name: string;
  status: "Uploaded" | "Pending" | "Under Review" | "Approved";
  iconName: string;
  iconColor: string;
  iconBg: string;
  uri?: string;
}

const INITIAL_DOCS: FilingDocItem[] = [
  { id: "sales", name: "Sales Invoices (B2B)", status: "Uploaded", iconName: "document-text", iconColor: "#2563EB", iconBg: "#E0F2FE" },
  { id: "purchase", name: "Purchase Invoices", status: "Uploaded", iconName: "file-tray-full", iconColor: "#0284C7", iconBg: "#E0F2FE" },
  { id: "expense", name: "Expense Invoices", status: "Pending", iconName: "bar-chart", iconColor: "#D97706", iconBg: "#FEF3C7" },
  { id: "credit", name: "Credit Notes", status: "Pending", iconName: "card", iconColor: "#0284C7", iconBg: "#E0F2FE" },
  { id: "debit", name: "Debit Notes", status: "Pending", iconName: "clipboard", iconColor: "#D97706", iconBg: "#FEF3C7" },
  { id: "bank", name: "Bank Statement", status: "Under Review", iconName: "business", iconColor: "#7C3AED", iconBg: "#F3E8FF" },
  { id: "prev-data", name: "Previous GST Data", status: "Approved", iconName: "folder", iconColor: "#F59E0B", iconBg: "#FEF3C7" },
];

export const GstFilingDocumentsStep: React.FC = () => {
  const [documents, setDocuments] = useState<FilingDocItem[]>(INITIAL_DOCS);

  const handleUploadDoc = (docId: string) => {
    Alert.alert("Upload Document", "Choose source to upload and crop document:", [
      {
        text: "Gallery & Crop",
        onPress: async () => {
          const uri = await pickImageFromGallery();
          if (uri) updateDocUri(docId, uri);
        },
      },
      {
        text: "Camera & Crop",
        onPress: async () => {
          const uri = await pickImageFromCamera();
          if (uri) updateDocUri(docId, uri);
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const updateDocUri = (docId: string, uri: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId ? { ...doc, status: "Uploaded", uri } : doc
      )
    );
  };

  const getBadgeStyle = (status: FilingDocItem["status"]) => {
    switch (status) {
      case "Approved":
        return { bg: "#FEF0E6", text: BrandColors.PRIMARY_ORANGE, label: "● Approved" };
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
      {/* Top Advisory Banner */}
      <View style={styles.banner}>
        <Ionicons name="information-circle-outline" size={18} color="#083B75" />
        <Text style={styles.bannerText}>
          Upload documents for <Text style={styles.boldText}>GSTR-3B — July 2026</Text>. Tap any document to capture or select from gallery with automatic crop.
        </Text>
      </View>

      {/* Document Items */}
      <View style={styles.list}>
        {documents.map((doc) => {
          const badge = getBadgeStyle(doc.status);
          return (
            <TouchableOpacity
              key={doc.id}
              style={styles.card}
              activeOpacity={0.75}
              onPress={() => handleUploadDoc(doc.id)}
            >
              {doc.uri ? (
                <Image source={{ uri: doc.uri }} style={styles.thumbnail} />
              ) : (
                <View style={[styles.iconBox, { backgroundColor: doc.iconBg }]}>
                  <Ionicons name={doc.iconName as any} size={18} color={doc.iconColor} />
                </View>
              )}

              <View style={styles.textCol}>
                <Text style={styles.docName}>{doc.name}</Text>
                <Text style={styles.docMeta}>
                  {doc.uri ? "Cropped & Uploaded" : "Tap to upload image"}
                </Text>
              </View>

              <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                <Text style={[styles.badgeText, { color: badge.text }]}>
                  {badge.label}
                </Text>
              </View>

              <Ionicons name="cloud-upload-outline" size={18} color={BrandColors.PRIMARY_ORANGE} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  banner: {
    flexDirection: "row",
    backgroundColor: "#EAF1FE",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    gap: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  bannerText: {
    flex: 1,
    fontSize: 12,
    color: "#083B75",
    lineHeight: 17,
  },
  boldText: {
    fontWeight: "700",
  },
  list: {
    gap: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  thumbnail: {
    width: 38,
    height: 38,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#F1F5F9",
  },
  textCol: {
    flex: 1,
  },
  docName: {
    fontSize: 13.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  docMeta: {
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
  badgeText: {
    fontSize: 10.5,
    fontWeight: "700",
  },
});
