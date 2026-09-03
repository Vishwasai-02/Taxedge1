import React from "react";
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

interface GstFileUploadFieldProps {
  label: string;
  description?: string;
  required?: boolean;
  fileUri?: string;
  fileName?: string;
  fileSize?: string;
  onFileSelected: (uri: string, name: string, size: string) => void;
  onFileRemoved: () => void;
  error?: string;
  placeholder?: string;
}

export const GstFileUploadField: React.FC<GstFileUploadFieldProps> = ({
  label,
  description,
  required = false,
  fileUri,
  fileName,
  fileSize,
  onFileSelected,
  onFileRemoved,
  error,
  placeholder = "Upload Document",
}) => {
  const handlePickSource = () => {
    Alert.alert(label, "Choose image source with automatic crop tool:", [
      {
        text: "Browse Gallery",
        onPress: async () => {
          const uri = await pickImageFromGallery();
          if (uri) {
            const name = `Doc_${Date.now().toString().slice(-4)}.jpg`;
            onFileSelected(uri, name, "1.8 MB");
          }
        },
      },
      {
        text: "Scan with Camera",
        onPress: async () => {
          const uri = await pickImageFromCamera();
          if (uri) {
            const name = `Scan_${Date.now().toString().slice(-4)}.jpg`;
            onFileSelected(uri, name, "2.2 MB");
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Label and description */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label} {required ? <Text style={styles.requiredStar}>*</Text> : null}
        </Text>
      </View>
      {description ? <Text style={styles.descText}>{description}</Text> : null}

      {/* If file is uploaded -> Show preview card */}
      {fileUri ? (
        <View style={styles.previewCard}>
          <Image source={{ uri: fileUri }} style={styles.thumbnail} />
          <View style={styles.infoCol}>
            <Text style={styles.fileName} numberOfLines={1}>
              {fileName || "Uploaded_Document.jpg"}
            </Text>
            <Text style={styles.fileSize}>{fileSize || "1.8 MB"}</Text>
          </View>
          <View style={styles.uploadedBadge}>
            <Text style={styles.uploadedBadgeText}>● Selected</Text>
          </View>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={onFileRemoved}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      ) : (
        /* Empty Upload Trigger Box */
        <TouchableOpacity
          style={[styles.uploadBox, error ? styles.uploadBoxError : null]}
          activeOpacity={0.75}
          onPress={handlePickSource}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="cloud-upload-outline" size={18} color={BrandColors.PRIMARY_ORANGE} />
          </View>
          <View style={styles.boxTextCol}>
            <Text style={styles.placeholderText}>{placeholder}</Text>
            <Text style={styles.boxSubText}>PDF, JPG or PNG (Max 10 MB)</Text>
          </View>
          <Ionicons name="add-circle-outline" size={20} color="#94A3B8" />
        </TouchableOpacity>
      )}

      {/* Error text */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  requiredStar: {
    color: "#EF4444",
  },
  descText: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: -2,
    marginBottom: 2,
  },
  uploadBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  uploadBoxError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FEF0E6",
    justifyContent: "center",
    alignItems: "center",
  },
  boxTextCol: {
    flex: 1,
  },
  placeholderText: {
    fontSize: 13.5,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
  },
  boxSubText: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
  },
  previewCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EEF2F6",
    padding: 10,
    gap: 10,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
  },
  infoCol: {
    flex: 1,
  },
  fileName: {
    fontSize: 13,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  fileSize: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  uploadedBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  uploadedBadgeText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#2563EB",
  },
  removeBtn: {
    padding: 4,
  },
  errorText: {
    fontSize: 11.5,
    color: "#DC2626",
    fontWeight: "500",
  },
});
