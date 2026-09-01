import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors, Typography, Spacing, BorderRadius, Shadows } from "../theme";

interface ServiceHeaderProps {
  title: string;
  subtitle?: string;
  tag?: string;
  heroImage?: ImageSourcePropType;
  iconName?: string;
  iconColor?: string;
  iconBg?: string;
  backgroundColor?: string;
}

export const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  title,
  subtitle,
  tag,
  heroImage,
  iconName,
  iconColor = "#FFFFFF",
  iconBg = "rgba(255, 255, 255, 0.15)",
  backgroundColor = BrandColors.PRIMARY_BLUE,
}) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight || 24 : 20;
  const topPadding = Math.max(insets.top, statusBarHeight) + Spacing.xs;

  return (
    <View style={[styles.headerContainer, { backgroundColor }]}>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      <View style={[styles.innerContainer, { paddingTop: topPadding }]}>
        {/* Top Bar: Back Button */}
        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.back()}
            style={styles.backBtn}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Main Title Row */}
        <View style={styles.titleSection}>
          {iconName && (
            <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
              <Ionicons name={iconName as any} size={28} color={iconColor} />
            </View>
          )}

          <View style={styles.titleCol}>
            {tag && <Text style={styles.tagText}>{tag}</Text>}
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </View>

        {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}

        {/* Hero Image if provided */}
        {heroImage && (
          <View style={styles.heroImageCard}>
            <Image source={heroImage} style={styles.heroImg} resizeMode="cover" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: Spacing.base,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Shadows.md,
  },
  innerContainer: {
    paddingHorizontal: Spacing.base,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginTop: Spacing.xs,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  titleCol: {
    flex: 1,
  },
  tagText: {
    fontSize: 12,
    color: "#E2E8F0",
    fontWeight: Typography.fontWeight.semiBold,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  titleText: {
    fontSize: 24,
    fontWeight: Typography.fontWeight.extraBold,
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontSize: 13,
    color: "#E2E8F0",
    lineHeight: 18,
    marginTop: Spacing.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  heroImageCard: {
    marginTop: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    height: 140,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  heroImg: {
    width: "100%",
    height: "100%",
  },
});
