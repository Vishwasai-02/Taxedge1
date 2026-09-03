import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BusinessDocumentItem } from "../../types/documentUpload.types";
import { DocumentUploadIcon } from "./DocumentUploadIcons";

interface MissingDocumentsBottomSheetProps {
  visible: boolean;
  pendingDocuments: BusinessDocumentItem[];
  onUploadItem: (doc: BusinessDocumentItem) => void;
  onClose: () => void;
}

export const MissingDocumentsBottomSheet: React.FC<MissingDocumentsBottomSheetProps> = ({
  visible,
  pendingDocuments,
  onUploadItem,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheetContainer}>
              {/* Top Handle */}
              <View style={styles.handle} />

              {/* Header */}
              <View style={styles.header}>
                <View style={styles.warningIconContainer}>
                  <Ionicons name="alert-circle" size={24} color="#F97316" />
                </View>
                <View style={styles.headerTextGroup}>
                  <Text style={styles.sheetTitle}>Documents Pending</Text>
                  <Text style={styles.sheetSubtitle}>
                    Please upload all required documents before continuing.
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeBtn}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="close" size={20} color="#0B1F3A" />
                </TouchableOpacity>
              </View>

              {/* Pending List */}
              <ScrollView
                style={styles.listScrollView}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              >
                {pendingDocuments.map((doc) => (
                  <View key={doc.id} style={styles.pendingItemRow}>
                    <View style={styles.itemLeft}>
                      <DocumentUploadIcon type={doc.iconType} />
                      <View style={styles.itemTextGroup}>
                        <Text style={styles.itemTitle}>{doc.title}</Text>
                        <Text style={styles.itemSub}>Required for verification</Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        onClose();
                        onUploadItem(doc);
                      }}
                      style={styles.uploadNowBtn}
                    >
                      <Ionicons name="arrow-up-outline" size={14} color="#FFFFFF" />
                      <Text style={styles.uploadNowText}>Upload Now</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              {/* Dismiss Action */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onClose}
                style={styles.gotItButton}
              >
                <Text style={styles.gotItButtonText}>Close & Continue Uploading</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(11, 31, 58, 0.45)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    maxHeight: "80%",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 12,
      },
      default: {},
    }),
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E2E8F0",
    alignSelf: "center",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  warningIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerTextGroup: {
    flex: 1,
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: -0.2,
  },
  sheetSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
    lineHeight: 16,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F8F9FB",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  listScrollView: {
    maxHeight: 320,
  },
  listContent: {
    paddingVertical: 4,
    gap: 10,
  },
  pendingItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F9FB",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  itemTextGroup: {
    marginLeft: 10,
    flex: 1,
  },
  itemTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0B1F3A",
  },
  itemSub: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 1,
  },
  uploadNowBtn: {
    backgroundColor: "#F97316",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  uploadNowText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  gotItButton: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  gotItButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0B1F3A",
  },
});
