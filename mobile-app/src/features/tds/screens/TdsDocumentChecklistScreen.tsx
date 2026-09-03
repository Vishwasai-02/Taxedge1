import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TDS_CHECKLIST_DOCUMENTS } from "../mock/checklistData";
import { TdsChecklistItem } from "../types/checklist.types";
import { ChecklistHeaderCard } from "../components/checklist/ChecklistHeaderCard";
import { ChecklistProgressHeader } from "../components/checklist/ChecklistProgressHeader";
import { ChecklistDocumentCard } from "../components/checklist/ChecklistDocumentCard";
import { ChecklistImportantBanner } from "../components/checklist/ChecklistImportantBanner";

export const TdsDocumentChecklistScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [documents, setDocuments] = useState<TdsChecklistItem[]>(
    TDS_CHECKLIST_DOCUMENTS
  );

  const uploadedCount = documents.filter(
    (d) => d.status === "uploaded" || d.status === "verified" || !!d.fileUri
  ).length;
  const totalCount = documents.length;

  // Check if all mandatory documents are uploaded
  const mandatoryDocs = documents.filter((d) => d.isMandatory);
  const isMandatoryComplete = mandatoryDocs.every(
    (d) => d.status === "uploaded" || d.status === "verified" || !!d.fileUri
  );

  const handleUploadSuccess = (
    id: string,
    fileInfo: { uri: string; name: string; size: string; mimeType?: string }
  ) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              status: "uploaded",
              fileUri: fileInfo.uri,
              fileName: fileInfo.name,
              fileSize: fileInfo.size,
              mimeType: fileInfo.mimeType,
            }
          : doc
      )
    );
  };

  const handleRemove = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              status: "not_uploaded",
              fileUri: undefined,
              fileName: undefined,
              fileSize: undefined,
              mimeType: undefined,
            }
          : doc
      )
    );
  };

  const handleContinue = () => {
    if (!isMandatoryComplete) {
      const missingTitles = mandatoryDocs
        .filter((d) => d.status === "not_uploaded" && !d.fileUri)
        .map((d) => d.title)
        .join(", ");

      Alert.alert(
        "Mandatory Documents Pending",
        `Please upload the following required documents before continuing:\n\n${missingTitles}`
      );
      return;
    }

    // Navigate to next screen (TDS Refund Estimate & Confirmation)
    router.push({
      pathname: "/service/tds-estimate" as any,
      params: {
        uploadedCount: uploadedCount.toString(),
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color="#0B1F3A" />
        </TouchableOpacity>

        <View style={styles.headerTitleGroup}>
          <Text style={styles.headerTitle}>TDS Refund</Text>
          <Text style={styles.headerSubtitle}>Document Checklist</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Info Banner Card with Illustration */}
        <ChecklistHeaderCard />

        {/* Dynamic Progress Header */}
        <ChecklistProgressHeader
          uploadedCount={uploadedCount}
          totalCount={totalCount}
        />

        {/* 8 Document Checklist Cards */}
        {documents.map((doc) => (
          <ChecklistDocumentCard
            key={doc.id}
            item={doc}
            onUploadSuccess={handleUploadSuccess}
            onRemove={handleRemove}
          />
        ))}

        {/* Important Banner */}
        <ChecklistImportantBanner />
      </ScrollView>

      {/* Bottom Sticky Button */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinue}
          style={[
            styles.continueButton,
            isMandatoryComplete
              ? styles.continueActive
              : styles.continueDisabled,
          ]}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Ionicons
            name="arrow-forward"
            size={18}
            color="#FFFFFF"
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  header: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  headerTitleGroup: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B1F3A",
    letterSpacing: -0.2,
  },
  headerSubtitle: {
    fontSize: 12.5,
    fontWeight: "500",
    color: "#0B1F3A",
    marginTop: 2,
  },
  headerRightSpacer: {
    width: 38,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  continueButton: {
    height: 52,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  continueActive: {
    backgroundColor: "#F97316",
    ...Platform.select({
      ios: {
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  continueDisabled: {
    backgroundColor: "#FDBA74",
    opacity: 0.9,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  buttonIcon: {
    marginLeft: 2,
  },
});

export default TdsDocumentChecklistScreen;
