import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors, Colors, Typography, Spacing, BorderRadius, Shadows } from "../theme";
import { ScalePressable } from "./ScalePressable";

export interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  iconName: string;
  iconColor: string;
  iconBg: string;
  route: string;
  badgeText?: string;
  badgeVariant?: "start" | "rate" | "custom";
  rateText?: string;
}

interface ServiceCardProps {
  item: ServiceCardData;
  onPress?: (item: ServiceCardData) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ item, onPress }) => {
  return (
    <ScalePressable onPress={() => onPress?.(item)} style={styles.container}>
      <View style={styles.card}>
        {/* Left Icon Container */}
        <View style={[styles.iconWrapper, { backgroundColor: item.iconBg }]}>
          <Ionicons
            name={item.iconName as any}
            size={22}
            color={item.iconColor}
          />
        </View>

        {/* Center Details */}
        <View style={styles.detailsCol}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.descText} numberOfLines={2}>
            {item.description}
          </Text>
        </View>

        {/* Right Action / Badges */}
        <View style={styles.rightCol}>
          {item.badgeText && (
            <View style={styles.orangeBadge}>
              <Text style={styles.orangeBadgeText}>{item.badgeText}</Text>
            </View>
          )}

          {item.rateText && (
            <Text style={styles.rateText}>{item.rateText}</Text>
          )}

          <Ionicons
            name="chevron-forward"
            size={18}
            color={BrandColors.CHEVRON_BLUE}
            style={styles.chevron}
          />
        </View>
      </View>
    </ScalePressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.sm + 4,
  },
  card: {
    backgroundColor: BrandColors.CARD,
    borderRadius: BorderRadius.base,
    paddingVertical: 14,
    paddingHorizontal: Spacing.base,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: BrandColors.CARD_BORDER,
    ...Shadows.sm,
  },
  iconWrapper: {
    width: 46,
    height: 46,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  detailsCol: {
    flex: 1,
    justifyContent: "center",
  },
  titleText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: BrandColors.TEXT_PRIMARY,
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  descText: {
    fontSize: Typography.fontSize.sm,
    color: BrandColors.TEXT_SECONDARY,
    lineHeight: 16,
    fontWeight: Typography.fontWeight.regular,
  },
  rightCol: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: Spacing.sm,
    gap: 4,
  },
  orangeBadge: {
    backgroundColor: BrandColors.PRIMARY_LIGHT_ORANGE,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    marginBottom: 2,
  },
  orangeBadgeText: {
    color: BrandColors.PRIMARY_ORANGE,
    fontSize: 11,
    fontWeight: Typography.fontWeight.bold,
  },
  rateText: {
    color: BrandColors.PRIMARY_ORANGE,
    fontSize: 12,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 2,
  },
  chevron: {
    marginTop: 1,
  },
});
