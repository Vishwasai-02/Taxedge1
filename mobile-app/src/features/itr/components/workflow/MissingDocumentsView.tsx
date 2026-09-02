import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors, Shadows } from "../../../../shared/theme";
import { WorkflowDocumentItem } from "../../types/workflowTypes";
import { DocumentIcon } from "./DocumentIcons";
import { DocumentStatusBadge } from "./DocumentStatusBadge";

interface MissingDocumentsViewProps {
  missingDocuments: WorkflowDocumentItem[];
  uploadedDocuments: WorkflowDocumentItem[];
  onUploadDoc: (doc: WorkflowDocumentItem) => void;
  onCompletePending: () => void;
}

export const MissingDocumentsView: React.FC<MissingDocumentsViewProps> = ({
  missingDocuments,
  uploadedDocuments,
  onUploadDoc,
  onCompletePending,
}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Warning Card */}
      <View style={styles.warningCard}>
        <View style={styles.warningHeaderRow}>
          <View style={styles.warningIconCircle}>
            <Ionicons name="alert-circle" size={24} color={BrandColors.PRIMARY_ORANGE} />
          </View>
          <View style={styles.warningTextCol}>
            <Text style={styles.warningTitle}>Upload Incomplete</Text>
            <Text style={styles.warningDesc}>
              Please upload all required documents before proceeding. The application cannot proceed to payment until all mandatory documents are submitted.
            </Text>
          </View>
        </View>
      </View>

      {/* Pending Documents Section */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeading}>
          PENDING DOCUMENTS ({missingDocuments.length})
        </Text>
      </View>

      <View style={styles.cardList}>
        {missingDocuments.map((doc) => (
          <View key={doc.id} style={styles.pendingCard}>
            <View style={styles.docLeft}>
              <DocumentIcon type={doc.iconType} size={30} />
              <View style={styles.docInfoCol}>
                <Text style={styles.docName} numberOfLines={1} ellipsizeMode="tail">
                  {doc.name}
                </Text>
                <Text style={styles.docStatusHint}>Mandatory • Upload required</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onUploadDoc(doc)}
              style={styles.uploadNowBtn}
            >
              <Text style={styles.uploadNowBtnText}>Upload Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Already Uploaded Documents Section */}
      {uploadedDocuments.length > 0 && (
        <View style={styles.alreadyUploadedSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>
              ALREADY UPLOADED ({uploadedDocuments.length})
            </Text>
          </View>

          <View style={styles.cardList}>
            {uploadedDocuments.map((doc) => (
              <View key={doc.id} style={styles.uploadedCard}>
                <View style={styles.docLeft}>
                  <DocumentIcon type={doc.iconType} size={30} />
                  <View style={styles.docInfoCol}>
                    <Text style={styles.docName} numberOfLines={1} ellipsizeMode="tail">
                      {doc.name}
                    </Text>
                    {doc.fileName ? (
                      <Text style={styles.docSub} numberOfLines={1} ellipsizeMode="middle">
                        {doc.fileName}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <View style={styles.badgeWrapper}>
                  <DocumentStatusBadge status={doc.status} />
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Primary Action Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onCompletePending}
        style={styles.primaryBtn}
      >
        <Ionicons name="cloud-upload" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={styles.primaryBtnText}>Complete Pending Uploads</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  warningCard: {
    backgroundColor: BrandColors.PRIMARY_LIGHT_ORANGE,
    borderWidth: 1.5,
    borderColor: "#FDBA74",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    ...Shadows.sm,
  },
  warningHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  warningIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  warningTextCol: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: BrandColors.PRIMARY_BLUE,
    marginBottom: 4,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  warningDesc: {
    fontSize: 13,
    lineHeight: 18,
    color: BrandColors.TEXT_PRIMARY,
  },
  sectionHeaderRow: {
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: "800",
    color: BrandColors.TEXT_MUTED,
    letterSpacing: 0.8,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  cardList: {
    gap: 10,
  },
  pendingCard: {
    minHeight: 70,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Shadows.sm,
  },
  uploadedCard: {
    minHeight: 70,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Shadows.sm,
  },
  docLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
    gap: 12,
  },
  docInfoCol: {
    flex: 1,
  },
  docName: {
    fontSize: 14,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
  },
  docStatusHint: {
    fontSize: 11.5,
    color: BrandColors.PRIMARY_ORANGE,
    fontWeight: "600",
    marginTop: 2,
  },
  docSub: {
    fontSize: 11.5,
    color: BrandColors.TEXT_SECONDARY,
    marginTop: 2,
  },
  badgeWrapper: {
    flexShrink: 0,
    alignItems: "flex-end",
  },
  uploadNowBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    flexShrink: 0,
  },
  uploadNowBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  alreadyUploadedSection: {
    marginTop: 22,
  },
  primaryBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: BrandColors.PRIMARY_ORANGE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    ...Shadows.sm,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
});
