import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors, Typography, Spacing, BorderRadius, Shadows } from "../theme";
import { ScalePressable } from "./ScalePressable";

export interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  iconName?: string;
  iconType?:
    | "registration"
    | "filing"
    | "compliance"
    | "amendment"
    | "cancellation"
    | "certificate"
    | string;
  iconColor?: string;
  iconBg?: string;
  route: string;
  badgeText?: string;
  badgeColor?: string;
  badgeBg?: string;
  badgeVariant?: "start" | "rate" | "custom";
  rateText?: string;
}

interface ServiceCardProps {
  item: ServiceCardData;
  onPress?: (item: ServiceCardData) => void;
}

const renderCardIcon = (item: ServiceCardData) => {
  const bg = item.iconBg || "#EDF9F3";

  if (item.iconType === "registration" || item.id === "gst-registration") {
    return (
      <View style={[styles.iconWrapper, { backgroundColor: bg }]}>
        <View style={styles.compositeIconContainer}>
          <Ionicons name="document-text" size={22} color="#CBD5E1" />
          <View style={styles.pencilOverlay}>
            <Ionicons name="pencil" size={14} color="#F43F5E" />
          </View>
        </View>
      </View>
    );
  }

  if (item.iconType === "filing" || item.id === "gst-filing") {
    return (
      <View style={[styles.iconWrapper, { backgroundColor: item.iconBg || "#EDF9F3" }]}>
        <View style={styles.chartBarsContainer}>
          <View style={[styles.chartBar, { height: 11, backgroundColor: "#F43F5E" }]} />
          <View style={[styles.chartBar, { height: 17, backgroundColor: "#06B6D4" }]} />
          <View style={[styles.chartBar, { height: 23, backgroundColor: "#3B82F6" }]} />
        </View>
      </View>
    );
  }

  if (item.iconType === "compliance" || item.id === "gst-compliance") {
    return (
      <View style={[styles.iconWrapper, { backgroundColor: bg }]}>
        <View style={styles.greenCheckBadge}>
          <Ionicons name="checkmark-sharp" size={14} color="#FFFFFF" />
        </View>
      </View>
    );
  }

  if (item.iconType === "amendment" || item.id === "gst-amendment") {
    return (
      <View style={[styles.iconWrapper, { backgroundColor: bg }]}>
        <Ionicons name="pencil" size={22} color="#F97316" />
      </View>
    );
  }

  if (item.iconType === "cancellation" || item.id === "gst-cancellation") {
    return (
      <View style={[styles.iconWrapper, { backgroundColor: bg }]}>
        <Ionicons name="ban" size={22} color="#EF4444" />
      </View>
    );
  }

  if (item.iconType === "certificate" || item.id === "gst-certificate") {
    return (
      <View style={[styles.iconWrapper, { backgroundColor: bg }]}>
        <Ionicons name="ribbon" size={22} color="#F59E0B" />
      </View>
    );
  }

  return (
    <View style={[styles.iconWrapper, { backgroundColor: bg }]}>
      <Ionicons
        name={(item.iconName || "document-text") as any}
        size={22}
        color={item.iconColor || BrandColors.PRIMARY_BLUE}
      />
    </View>
  );
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ item, onPress }) => {
  return (
    <ScalePressable onPress={() => onPress?.(item)} style={styles.container}>
      <View style={styles.card}>
        {/* Left Icon Container */}
        {renderCardIcon(item)}

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
            <View
              style={[
                styles.badgePill,
                item.badgeBg ? { backgroundColor: item.badgeBg } : null,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  item.badgeColor ? { color: item.badgeColor } : null,
                ]}
              >
                {item.badgeText}
              </Text>
            </View>
          )}

          {item.rateText && (
            <Text style={styles.rateText}>{item.rateText}</Text>
          )}

          <Ionicons
            name="chevron-forward"
            size={15}
            color="#94A3B8"
            style={styles.chevron}
          />
        </View>
      </View>
    </ScalePressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 13,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEF2F6",
    ...Platform.select({
      ios: {
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  compositeIconContainer: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  pencilOverlay: {
    position: "absolute",
    bottom: -2,
    right: -2,
  },
  chartBarsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 3,
    height: 24,
  },
  chartBar: {
    width: 5,
    borderRadius: 2,
  },
  greenCheckBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsCol: {
    flex: 1,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 16.5,
    fontWeight: "700",
    color: "#1E293B",
    letterSpacing: -0.2,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  descText: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 17.5,
    marginTop: 3,
    fontWeight: "400",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
  },
  rightCol: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 48,
    marginLeft: 8,
  },
  badgePill: {
    backgroundColor: "#FEF0E6",
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: BrandColors.PRIMARY_ORANGE,
    fontSize: 11,
    fontWeight: "700",
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  rateText: {
    color: BrandColors.PRIMARY_ORANGE,
    fontSize: 12,
    fontWeight: "700",
  },
  chevron: {
    marginTop: "auto",
  },
});

