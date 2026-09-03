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

interface NoticeUploadCardProps {
  fileName?: string;
  fileSize?: string;
  onUploadSuccess: (fileInfo: { uri: string; name: string; size: string }) => void;
  error?: string;
}

export const NoticeUploadCard: React.FC<NoticeUploadCardProps> = ({
  fileName,
  fileSize,
  onUploadSuccess,
  error,
}) => {
  const isUploaded = !!fileName;

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
          : "2.4 MB";

        onUploadSuccess({
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
    <View style={[styles.card, error ? styles.cardError : null]}>
      <View style={styles.iconCircle}>
        <Ionicons name="document-text-outline" size={24} color="#0B1F3A" />
      </View>

      <View style={styles.textGroup}>
        <Text style={styles.title}>Notice Document</Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {isUploaded ? `${fileName} • ${fileSize || "2.4 MB"}` : "PDF, JPG or PNG • Up to 10 MB"}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handlePickDocument}
        style={[styles.actionButton, isUploaded ? styles.uploadedButton : styles.uploadButton]}
      >
        {isUploaded ? (
          <View style={styles.uploadedContent}>
            <Ionicons name="checkmark" size={14} color="#EA580C" />
            <Text style={styles.uploadedText}>Uploaded</Text>
          </View>
        ) : (
          <Text style={styles.uploadText}>Upload</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#FED7AA",
    borderStyle: "dashed",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
  cardError: {
    borderColor: "#DC2626",
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
  },
  subtitle: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 2.5,
    fontWeight: "400",
  },
  actionButton: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButton: {
    backgroundColor: "#EA580C",
  },
  uploadText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  uploadedButton: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1.2,
    borderColor: "#F97316",
    paddingHorizontal: 12,
  },
  uploadedContent: {
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
