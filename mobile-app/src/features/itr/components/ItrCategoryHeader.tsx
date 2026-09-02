import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors, Shadows } from "../../../shared/theme";

interface ItrCategoryHeaderProps {
  title?: string;
  categoryTag?: string;
  description?: string;
}

export const ItrCategoryHeader: React.FC<ItrCategoryHeaderProps> = ({
  title = "ITR Filing",
  categoryTag = "ITR CATEGORY",
  description = "File your Income Tax Return. Safe, accurate, and optimized for maximum refunds.",
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconBox}>
          <Ionicons name="calculator-outline" size={26} color={BrandColors.PRIMARY_ORANGE} />
        </View>
        <View style={styles.titleColumn}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.categoryTag}>{categoryTag}</Text>
        </View>
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    padding: 16,
    ...Shadows.sm,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: BrandColors.PRIMARY_LIGHT_ORANGE,
    justifyContent: "center",
    alignItems: "center",
  },
  titleColumn: {
    marginLeft: 14,
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "700",
    color: BrandColors.PRIMARY_BLUE,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  categoryTag: {
    fontSize: 11,
    fontWeight: "800",
    color: BrandColors.PRIMARY_BLUE,
    letterSpacing: 0.6,
    marginTop: 2,
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 19,
    color: BrandColors.TEXT_SECONDARY,
    marginTop: 12,
    fontWeight: "400",
  },
});
