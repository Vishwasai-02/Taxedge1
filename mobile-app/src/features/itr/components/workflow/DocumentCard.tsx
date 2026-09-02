import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { BrandColors, Shadows } from "../../../../shared/theme";
import { WorkflowDocumentItem } from "../../types/workflowTypes";
import { DocumentIcon } from "./DocumentIcons";
import { DocumentStatusBadge } from "./DocumentStatusBadge";

interface DocumentCardProps {
  item: WorkflowDocumentItem;
  onPress: (item: WorkflowDocumentItem) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onPress(item)}
      style={styles.card}
    >
      <View style={styles.leftSection}>
        <DocumentIcon type={item.iconType} size={32} />
        <View style={styles.textContainer}>
          <Text style={styles.docName} numberOfLines={1}>
            {item.name}
          </Text>
          {!!item.fileName && item.status !== "Not Uploaded" && (
            <Text style={styles.fileName} numberOfLines={1}>
              {item.fileSize ? `${item.fileName} • ${item.fileSize}` : item.fileName}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.rightSection}>
        <DocumentStatusBadge status={item.status} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 72,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    ...Shadows.sm,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  docName: {
    fontSize: 14.5,
    fontWeight: "700",
    color: BrandColors.TEXT_PRIMARY,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  fileName: {
    fontSize: 11.5,
    color: BrandColors.TEXT_SECONDARY,
    marginTop: 2,
    fontWeight: "400",
  },
  rightSection: {
    alignItems: "flex-end",
  },
});
