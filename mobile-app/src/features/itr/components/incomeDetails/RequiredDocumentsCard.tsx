import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { RequiredDocumentItem } from "../../types/incomeDetails.types";
import { DocumentUploadItem } from "./DocumentUploadItem";

interface RequiredDocumentsCardProps {
  categoryTitle?: string;
  documents: RequiredDocumentItem[];
  onFilePicked: (id: string, fileInfo: { uri: string; name: string; size?: string }) => void;
  onFileRemoved: (id: string) => void;
}

export const RequiredDocumentsCard: React.FC<RequiredDocumentsCardProps> = ({
  categoryTitle = "Business Income",
  documents,
  onFilePicked,
  onFileRemoved,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        Required Documents for {categoryTitle}
      </Text>

      <View style={styles.listContainer}>
        {documents.map((doc) => (
          <DocumentUploadItem
            key={doc.id}
            item={doc}
            onFilePicked={onFilePicked}
            onFileRemoved={onFileRemoved}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  sectionTitle: {
    fontSize: 15.5,
    fontWeight: "700",
    color: "#0B1F3A",
    marginBottom: 14,
  },
  listContainer: {
    width: "100%",
  },
});
