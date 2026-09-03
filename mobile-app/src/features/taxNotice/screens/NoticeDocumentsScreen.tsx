import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TaxNoticeHeader } from "../components/common/TaxNoticeHeader";
import { NoticeDocUploadCard } from "../components/documents/NoticeDocUploadCard";
import { MOCK_SUPPORTING_DOCS } from "../mock/taxNoticeData";
import { TaxNoticeSupportingDoc } from "../types/taxNotice.types";

export const NoticeDocumentsScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    noticeNumber?: string;
    assessmentYear?: string;
  }>();

  const assessmentYear = params.assessmentYear || "AY 2025–26";

  const [docs, setDocs] = useState<TaxNoticeSupportingDoc[]>(() =>
    MOCK_SUPPORTING_DOCS.map((doc) =>
      doc.id === "doc-ais"
        ? {
            ...doc,
            title: `AIS for ${assessmentYear}`,
          }
        : doc
    )
  );

  const [remarks, setRemarks] = useState("");

  const mandatoryDocs = docs.filter((d) => d.isMandatory);
  const uploadedMandatoryCount = mandatoryDocs.filter(
    (d) => d.status === "uploaded" || !!d.fileUri
  ).length;
  const totalMandatory = mandatoryDocs.length;
  const percent = totalMandatory > 0 ? (uploadedMandatoryCount / totalMandatory) * 100 : 0;

  const handleUploadSuccess = (
    id: string,
    fileInfo: { uri: string; name: string; size: string }
  ) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "uploaded",
              fileUri: fileInfo.uri,
              fileName: fileInfo.name,
              fileSize: fileInfo.size,
            }
          : d
      )
    );
  };

  const handleSubmitDocuments = () => {
    // Navigate to Screen 4: Review Response
    router.push({
      pathname: "/service/tax-notice-review" as any,
      params: {
        noticeNumber: params.noticeNumber,
        assessmentYear,
      },
    });
  };

  const getDocIcon = (index: number) => {
    switch (index) {
      case 0:
        return "document-text-outline" as const;
      case 1:
        return "document-text-outline" as const;
      case 2:
        return "business-outline" as const;
      case 3:
        return "document-outline" as const;
      case 4:
        return "bar-chart-outline" as const;
      case 5:
        return "pie-chart-outline" as const;
      default:
        return "document-outline" as const;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <TaxNoticeHeader subtitle="Upload Supporting Documents" />

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>We need a few more details</Text>
          <Text style={styles.pageSubtitle}>
            Upload the documents relevant to this notice. This helps your Tax
            Executive prepare the response.
          </Text>
        </View>

        {/* Progress Section */}
        <View style={styles.progressContainer}>
          <Text style={styles.counterText}>
            {uploadedMandatoryCount} of {totalMandatory} uploaded
          </Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${percent}%` }]} />
          </View>
        </View>

        {/* 6 Upload Cards */}
        {docs.map((doc, idx) => (
          <NoticeDocUploadCard
            key={doc.id}
            item={doc}
            iconName={getDocIcon(idx)}
            onUploadSuccess={handleUploadSuccess}
          />
        ))}

        {/* Remarks Input */}
        <View style={styles.remarksSection}>
          <Text style={styles.remarksLabel}>Remarks (Optional)</Text>
          <TextInput
            style={styles.remarksInput}
            placeholder="Add any additional information here..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={3}
            maxLength={500}
            value={remarks}
            onChangeText={setRemarks}
          />
          <Text style={styles.charCounter}>{remarks.length}/500</Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Button */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSubmitDocuments}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Submit Documents</Text>
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
  progressContainer: {
    marginBottom: 14,
  },
  counterText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 8,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#F97316",
    borderRadius: 3,
  },
  remarksSection: {
    marginTop: 6,
    marginBottom: 16,
  },
  remarksLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0B1F3A",
    marginBottom: 6,
  },
  remarksInput: {
    minHeight: 80,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
    fontSize: 13.5,
    color: "#0B1F3A",
    textAlignVertical: "top",
  },
  charCounter: {
    fontSize: 11,
    color: "#94A3B8",
    textAlign: "right",
    marginTop: 4,
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
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
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
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});

export default NoticeDocumentsScreen;
