import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { BrandColors } from "../../../../shared/theme";
import { DocumentWorkflowStatus } from "../../types/workflowTypes";

interface DocumentStatusBadgeProps {
  status: DocumentWorkflowStatus | string;
  customLabel?: string;
}

export const DocumentStatusBadge: React.FC<DocumentStatusBadgeProps> = ({
  status,
  customLabel,
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case "Verified":
      case "Approved":
        return {
          label: customLabel || "Verified",
          textColor: BrandColors.PRIMARY_BLUE,
          dotColor: BrandColors.PRIMARY_BLUE,
          bgColor: BrandColors.PRIMARY_LIGHT_BLUE,
          borderColor: "transparent",
        };

      case "Uploaded":
        return {
          label: customLabel || "Uploaded",
          textColor: BrandColors.PRIMARY_ORANGE,
          dotColor: BrandColors.PRIMARY_ORANGE,
          bgColor: BrandColors.PRIMARY_LIGHT_ORANGE,
          borderColor: "transparent",
        };

      case "Under Review":
        return {
          label: customLabel || "Under Review",
          textColor: BrandColors.PRIMARY_BLUE,
          dotColor: BrandColors.PRIMARY_BLUE,
          bgColor: "#EEF2F6",
          borderColor: "transparent",
        };

      case "Rejected":
        return {
          label: customLabel || "Rejected",
          textColor: BrandColors.PRIMARY_ORANGE,
          dotColor: BrandColors.PRIMARY_ORANGE,
          bgColor: "#FFF5EB",
          borderColor: BrandColors.PRIMARY_ORANGE,
        };

      case "Not Uploaded":
      case "Pending":
      case "Pending Upload":
      default:
        return {
          label: customLabel || "Not Uploaded",
          textColor: BrandColors.TEXT_MUTED,
          dotColor: BrandColors.TEXT_MUTED,
          bgColor: "#F1F5F9",
          borderColor: "transparent",
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <View
      style={[
        styles.badgeContainer,
        {
          backgroundColor: config.bgColor,
          borderColor: config.borderColor,
          borderWidth: config.borderColor !== "transparent" ? 1 : 0,
        },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: config.dotColor }]} />
      <Text style={[styles.badgeText, { color: config.textColor }]}>
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
});
