import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { BrandColors, Shadows } from "../../../../shared/theme";
import { WorkflowDocumentItem } from "../../types/workflowTypes";
import { DocumentIcon } from "./DocumentIcons";
import { DocumentStatusBadge } from "./DocumentStatusBadge";

interface IndividualUploadViewProps {
  serviceName: string;
  targetDoc: WorkflowDocumentItem | null;
  uploadedDocuments: WorkflowDocumentItem[];
  onUploadSuccess: (docName: string, uri: string, fileName: string, fileSize: string) => void;
  onBack: () => void;
  onContinueToReview: () => void;
}

export const IndividualUploadView: React.FC<IndividualUploadViewProps> = ({
  serviceName,
  targetDoc,
  uploadedDocuments,
  onUploadSuccess,
  onBack,
  onContinueToReview,
}) => {
  const insets = useSafeAreaInsets();
  const [isUploading, setIsUploading] = useState(false);

  const handleBrowseFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "image/*",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const docName = targetDoc?.name || "Uploaded Document";
        const fileSize = file.size
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : "2.1 MB";

        setIsUploading(true);
        setTimeout(() => {
          setIsUploading(false);
          onUploadSuccess(docName, file.uri, file.name, fileSize);
          Alert.alert("Upload Successful", `"${docName}" has been uploaded.`);
        }, 500);
      }
    } catch {
      Alert.alert("Error", "Failed to select document.");
    }
  };

  const handleLaunchCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Camera permission is needed.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({ quality: 0.85 });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const docName = targetDoc?.name || "Scanned Document";

        setIsUploading(true);
        setTimeout(() => {
          setIsUploading(false);
          onUploadSuccess(
            docName,
            file.uri,
            `${docName.replace(/\s+/g, "_")}_Scan.jpg`,
            "1.8 MB"
          );
          Alert.alert("Upload Successful", `"${docName}" scan uploaded.`);
        }, 500);
      }
    } catch {
      Alert.alert("Error", "Failed to capture photo.");
    }
  };

  return (
    <View style={styles.root}>
      {/* Top Header */}
      <View style={[styles.headerWrapper, { paddingTop: Math.max(insets.top, 10) }]}>
        <View style={styles.headerBar}>
          <TouchableOpacity activeOpacity={0.7} onPress={onBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color={BrandColors.PRIMARY_BLUE} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Upload {serviceName} Documents</Text>
          <View style={styles.rightSpacer} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 95 }]}
        showsVerticalScrollIndicator={false}
      >
        {targetDoc && (
          <View style={styles.targetBanner}>
            <Text style={styles.targetLabel}>UPLOADING FOR:</Text>
            <Text style={styles.targetName}>{targetDoc.name}</Text>
          </View>
        )}

        {/* Dashed Dropzone */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBrowseFiles}
          style={styles.dropzone}
        >
          <View style={styles.cloudIconCircle}>
            <Ionicons name="cloud-upload-outline" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.dropzoneTitle}>
            {isUploading ? "Uploading File..." : "Upload Document"}
          </Text>
          <Text style={styles.dropzoneSubtitle}>
            PDF, JPG, PNG, Excel • Max 10 MB
          </Text>
        </TouchableOpacity>

        {/* Action Buttons: Browse Files & Camera */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleBrowseFiles}
            style={styles.actionBtn}
          >
            <Ionicons name="folder" size={20} color={BrandColors.PRIMARY_ORANGE} />
            <Text style={styles.actionBtnText}>Browse Files</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleLaunchCamera}
            style={styles.actionBtn}
          >
            <Ionicons name="camera" size={20} color={BrandColors.PRIMARY_BLUE} />
            <Text style={styles.actionBtnText}>Camera</Text>
          </TouchableOpacity>
        </View>

        {/* Uploaded Documents List */}
        <View style={styles.uploadedSection}>
          <Text style={styles.uploadedTitle}>
            Uploaded Documents ({uploadedDocuments.length})
          </Text>

          {uploadedDocuments.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                No documents uploaded yet. Tap Browse Files or Camera above.
              </Text>
            </View>
          ) : (
            uploadedDocuments.map((doc) => (
              <View key={doc.id} style={styles.uploadedCard}>
                <View style={styles.docLeft}>
                  <DocumentIcon type={doc.iconType} size={30} />
                  <View style={styles.docTextCol}>
                    <Text style={styles.fileName} numberOfLines={1}>
                      {doc.fileName || `${doc.name.replace(/\s+/g, "_")}.pdf`}
                    </Text>
                    <Text style={styles.fileSize}>{doc.fileSize || "1.8 MB"}</Text>
                  </View>
                </View>
                <DocumentStatusBadge status={doc.status} />
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Bottom Sticky Button */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 14) }]}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onContinueToReview}
          style={styles.primaryBtn}
        >
          <Text style={styles.primaryBtnText}>Continue to Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BrandColors.BACKGROUND,
  },
  headerWrapper: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.BORDER,
  },
  headerBar: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: BrandColors.PRIMARY_BLUE,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  rightSpacer: {
    width: 38,
  },
  scrollContent: {
    padding: 16,
  },
  targetBanner: {
    backgroundColor: BrandColors.PRIMARY_LIGHT_BLUE,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D0E1FD",
  },
  targetLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: BrandColors.PRIMARY_BLUE,
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  targetName: {
    fontSize: 14.5,
    fontWeight: "700",
    color: BrandColors.PRIMARY_BLUE,
  },
  dropzone: {
    backgroundColor: "#F0F6FE",
    borderWidth: 1.5,
    borderColor: "#93C5FD",
    borderStyle: "dashed",
    borderRadius: 16,
    paddingVertical: 26,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cloudIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BrandColors.PRIMARY_BLUE_ACCENT,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  dropzoneTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: BrandColors.PRIMARY_BLUE,
    marginBottom: 4,
  },
  dropzoneSubtitle: {
    fontSize: 12,
    color: BrandColors.TEXT_SECONDARY,
  },
  btnRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
    marginBottom: 20,
  },
  actionBtn: {
    flex: 1,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    ...Shadows.sm,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: BrandColors.TEXT_PRIMARY,
  },
  uploadedSection: {
    marginTop: 4,
  },
  uploadedTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: BrandColors.PRIMARY_BLUE,
    marginBottom: 12,
  },
  emptyCard: {
    padding: 20,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: BrandColors.BORDER,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 13,
    color: BrandColors.TEXT_MUTED,
    textAlign: "center",
  },
  uploadedCard: {
    height: 68,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    ...Shadows.sm,
  },
  docLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
    gap: 12,
  },
  docTextCol: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  fileSize: {
    fontSize: 12,
    color: BrandColors.TEXT_SECONDARY,
    marginTop: 2,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: BrandColors.BORDER,
    paddingHorizontal: 16,
    paddingTop: 12,
    ...Shadows.md,
  },
  primaryBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.sm,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
});
