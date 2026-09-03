import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import { BusinessDocumentItem } from "../../types/documentUpload.types";
import { DocumentUploadIcon } from "./DocumentUploadIcons";

interface DocumentUploadCardProps {
  item: BusinessDocumentItem;
  onUploadSuccess: (
    id: string,
    fileInfo: { uri: string; name: string; size: string; mimeType?: string }
  ) => void;
  onRemove: (id: string) => void;
}

export const DocumentUploadCard: React.FC<DocumentUploadCardProps> = ({
  item,
  onUploadSuccess,
  onRemove,
}) => {
  const isUploaded = item.status === "uploaded" || !!item.fileUri;

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/jpeg", "image/png"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];

        // 10 MB limit check (10 * 1024 * 1024 bytes = 10,485,760 bytes)
        if (asset.size && asset.size > 10 * 1024 * 1024) {
          Alert.alert("File Too Large", "Maximum supported file size is 10 MB.");
          return;
        }

        const sizeInMb = asset.size
          ? `${(asset.size / (1024 * 1024)).toFixed(1)} MB`
          : "2.4 MB";

        onUploadSuccess(item.id, {
          uri: asset.uri,
          name: asset.name,
          size: sizeInMb,
          mimeType: asset.mimeType,
        });
      }
    } catch (error) {
      Alert.alert("File Upload", "Could not open document picker.");
    }
  };

  const renderStatusButton = () => {
    if (item.status === "verified") {
      return (
        <View style={styles.verifiedBadge}>
          <Ionicons name="checkmark-done" size={14} color="#FFFFFF" />
          <Text style={styles.verifiedText}>Verified</Text>
        </View>
      );
    }

    if (item.status === "under_review") {
      return (
        <View style={styles.underReviewBadge}>
          <Ionicons name="time-outline" size={14} color="#0B1F3A" />
          <Text style={styles.underReviewText}>Under Review</Text>
        </View>
      );
    }

    if (item.status === "rejected") {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePickDocument}
          style={styles.rejectedButton}
        >
          <Ionicons name="refresh-outline" size={14} color="#DC2626" />
          <Text style={styles.rejectedText}>Re-upload</Text>
        </TouchableOpacity>
      );
    }

    if (isUploaded) {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePickDocument}
          style={styles.uploadedBadge}
        >
          <Ionicons name="checkmark" size={14} color="#F97316" />
          <Text style={styles.uploadedText}>Uploaded</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePickDocument}
        style={styles.uploadButton}
      >
        <Ionicons name="arrow-up-outline" size={15} color="#F97316" />
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.leftGroup}>
        <DocumentUploadIcon type={item.iconType} />

        <View style={styles.textGroup}>
          <Text style={styles.docTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.docSubtitle} numberOfLines={1}>
            {isUploaded && item.fileName
              ? `${item.fileName} • ${item.fileSize || "2.4 MB"}`
              : item.subtitle}
          </Text>
        </View>
      </View>

      {renderStatusButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: 13,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 11,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  textGroup: {
    marginLeft: 12,
    flex: 1,
  },
  docTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B1F3A",
    letterSpacing: -0.1,
  },
  docSubtitle: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 2.5,
    fontWeight: "500",
  },
  uploadButton: {
    borderWidth: 1.5,
    borderColor: "#F97316",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
  },
  uploadButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#F97316",
  },
  uploadedBadge: {
    borderWidth: 1.5,
    borderColor: "#F97316",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FFF7ED",
  },
  uploadedText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#F97316",
  },
  verifiedBadge: {
    backgroundColor: "#0B1F3A",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  verifiedText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  underReviewBadge: {
    backgroundColor: "#EAF1FE",
    borderWidth: 1,
    borderColor: "#0B1F3A",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  underReviewText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  rejectedButton: {
    borderWidth: 1.5,
    borderColor: "#DC2626",
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rejectedText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#DC2626",
  },
});
