import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors, Shadows } from "../../../shared/theme";
import { IncomeTypeOption } from "../types/incomeTypes";
import { IncomeTypeIcon } from "./IncomeTypeIcons";

interface IncomeTypeCardProps {
  item: IncomeTypeOption;
  isSelected: boolean;
  onPress: () => void;
}

export const IncomeTypeCard: React.FC<IncomeTypeCardProps> = ({
  item,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[
        styles.cardContainer,
        isSelected ? styles.cardSelected : styles.cardUnselected,
      ]}
    >
      {/* Selected Indicator Badge (Orange Checkmark at top-right) */}
      {isSelected && (
        <View style={styles.selectedIndicator}>
          <Ionicons name="checkmark-circle" size={18} color={BrandColors.PRIMARY_ORANGE} />
        </View>
      )}

      {/* Identical Sized Icon Container */}
      <View
        style={[
          styles.iconContainer,
          isSelected ? styles.iconContainerSelected : styles.iconContainerUnselected,
        ]}
      >
        <IncomeTypeIcon type={item.id} isSelected={isSelected} size={36} />
      </View>

      {/* Card Content */}
      <View style={styles.textContainer}>
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            { color: isSelected ? "#FFFFFF" : BrandColors.TEXT_PRIMARY },
          ]}
        >
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            styles.subtitle,
            {
              color: isSelected
                ? "rgba(255, 255, 255, 0.82)"
                : BrandColors.TEXT_SECONDARY,
            },
          ]}
        >
          {item.subtitle}
        </Text>
        <Text
          style={[
            styles.badge,
            { color: isSelected ? "#FFA94D" : BrandColors.PRIMARY_ORANGE },
          ]}
        >
          {item.badge}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height: 148,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: "space-between",
    position: "relative",
  },
  cardUnselected: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    ...Shadows.sm,
  },
  cardSelected: {
    backgroundColor: BrandColors.PRIMARY_BLUE,
    borderWidth: 1.5,
    borderColor: BrandColors.PRIMARY_ORANGE,
    ...Shadows.md,
  },
  selectedIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerUnselected: {
    backgroundColor: "#F8FAFC",
  },
  iconContainerSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  textContainer: {
    marginTop: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11.5,
    lineHeight: 15,
    fontWeight: "400",
    marginBottom: 4,
  },
  badge: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});
