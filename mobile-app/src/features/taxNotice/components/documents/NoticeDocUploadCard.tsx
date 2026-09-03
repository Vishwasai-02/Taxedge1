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
import { TaxNoticeSupportingDoc } from "../../types/taxNotice.types";

interface NoticeDocUploadCardProps {
  item: TaxNoticeSupportingDoc;
  iconName: keyof typeof Ionicons.glyphMap;
  onUploadSuccess: (
    id: string,
    fileInfo: { uri: string; name: string; size: string }
  ) => void;
}

export const NoticeDocUploadCard: React.FC<NoticeDocUploadCardProps> = ({
  item,
  iconName,
  onUploadSuccess,
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

        // 10 MB limit check
        if (asset.size && asset.size > 10 * 1024 * 1024) {
          Alert.alert("File Too Large", "Maximum supported file size is 10 MB.");
          return;
        }

        const sizeInMb = asset.size
          ? `${(asset.size / (1024 * 1024)).toFixed(1)} MB`
          : "2.1 MB";

        onUploadSuccess(item.id, {
          uri: asset.uri,
          name: asset.name,
          size: sizeInMb,
        });
      }
    } catch {
      Alert.alert("Upload Error", "Could not open file picker.");
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Ionicons name={iconName} size={22} color="#0B1F3A" />
      </View>

      <View style={styles.textGroup}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {isUploaded && item.fileName
            ? `${item.fileName} • ${item.fileSize || "2.1 MB"}`
            : item.subtitle}
        </Text>
      </View>

      {isUploaded ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePickDocument}
          style={styles.uploadedBadge}
        >
          <Ionicons name="checkmark" size={14} color="#EA580C" />
          <Text style={styles.uploadedText}>Uploaded</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePickDocument}
          style={styles.uploadButton}
        >
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F0F5FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textGroup: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#0B1F3A",
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 3,
    fontWeight: "400",
  },
  uploadButton: {
    borderWidth: 1.2,
    borderColor: "#F97316",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#EA580C",
  },
  uploadedBadge: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1.2,
    borderColor: "#F97316",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  uploadedText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#EA580C",
  },
});
