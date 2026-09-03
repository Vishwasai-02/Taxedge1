import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UploadProgressHeader } from "../components/documents/UploadProgressHeader";
import { PreviousYearDocCard } from "../components/documents/PreviousYearDocCard";
import { KeepDocumentsReadyCard } from "../components/documents/KeepDocumentsReadyCard";
import { PREVIOUS_YEAR_DOCUMENTS } from "../mock/documentsData";
import { PreviousYearDocItem } from "../types/document.types";

export const PreviousYearDocumentsScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    assessmentYear?: string;
  }>();

  const assessmentYear = params.assessmentYear || "AY 2023–24";

  const [documents, setDocuments] = useState<PreviousYearDocItem[]>(() =>
    PREVIOUS_YEAR_DOCUMENTS.map((doc) =>
      doc.id === "form-16"
        ? {
            ...doc,
            title: `Form 16 / Form 16A\n(for ${assessmentYear})`,
          }
        : doc
    )
  );

  const uploadedCount = documents.filter(
    (d) => d.status === "uploaded" || !!d.fileUri
  ).length;
  const totalCount = documents.length;
  const isAllUploaded = uploadedCount === totalCount && totalCount > 0;

  const handleBack = () => {
    router.back();
  };

  const handleUploadSuccess = (
    id: string,
    fileInfo: { uri: string; name: string; size: string }
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
            }
          : doc
      )
    );
  };

  const handleSubmitApplication = () => {
    if (!isAllUploaded) {
      const missingTitles = documents
        .filter((d) => d.status !== "uploaded" && !d.fileUri)
        .map((d) => d.title.replace("\n", " "))
        .join(", ");

      Alert.alert(
        "Documents Required",
        `Please upload all required documents before submitting:\n\n${missingTitles}`
      );
      return;
    }

    // Navigate to Charges & Payment screen for Previous Year ITR
    router.push({
      pathname: "/service/previous-year-charges" as any,
      params: {
        assessmentYear,
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBack}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color="#0B1F3A" />
        </TouchableOpacity>

        <View style={styles.headerTitleGroup}>
          <Text style={styles.headerTitle}>Previous Year ITR</Text>
          <Text style={styles.headerSubtitle}>Documents & Submission</Text>
        </View>

        <View style={styles.headerRightSpacer} />
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Heading */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Upload Required Documents</Text>
          <Text style={styles.pageSubtitle}>
            Upload all mandatory documents required for filing your Previous
            Year Income Tax Return.
          </Text>
        </View>

        {/* Upload Progress */}
        <UploadProgressHeader
          uploadedCount={uploadedCount}
          totalCount={totalCount}
        />

        {/* Document Cards */}
        {documents.map((doc) => (
          <PreviousYearDocCard
            key={doc.id}
            item={doc}
            onUploadSuccess={handleUploadSuccess}
          />
        ))}

        {/* Keep Documents Ready Information Card */}
        <KeepDocumentsReadyCard assessmentYear={assessmentYear} />
      </ScrollView>

      {/* Bottom Sticky Action Button */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSubmitApplication}
          disabled={!isAllUploaded}
          style={[
            styles.submitButton,
            isAllUploaded
              ? styles.submitButtonActive
              : styles.submitButtonDisabled,
          ]}
        >
          <Text style={styles.submitButtonText}>Submit Application</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
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
    paddingTop: 16,
  },
  titleSection: {
    marginBottom: 14,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: -0.2,
  },
  pageSubtitle: {
    fontSize: 12.5,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 18,
    fontWeight: "400",
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
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  submitButton: {
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonActive: {
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
  submitButtonDisabled: {
    backgroundColor: "#FDBA74",
    opacity: 0.85,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});

export default PreviousYearDocumentsScreen;
