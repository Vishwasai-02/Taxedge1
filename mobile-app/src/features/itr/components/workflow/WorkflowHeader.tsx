import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BrandColors } from "../../../../shared/theme";

interface WorkflowHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  rightAction?: React.ReactNode;
}

export const WorkflowHeader: React.FC<WorkflowHeaderProps> = ({
  title,
  subtitle,
  onBack,
  rightAction,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 10) }]}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={20} color={BrandColors.PRIMARY_BLUE} />
        </TouchableOpacity>

        <View style={styles.titleCol}>
          <Text style={styles.titleText} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitleText} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        {rightAction ? (
          rightAction
        ) : (
          <View style={styles.rightSpacer} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.BORDER,
  },
  headerBar: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: BrandColors.BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  titleCol: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
  },
  titleText: {
    fontSize: 17,
    fontWeight: "700",
    color: BrandColors.PRIMARY_BLUE,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif-medium" }),
  },
  subtitleText: {
    fontSize: 12,
    color: BrandColors.TEXT_SECONDARY,
    marginTop: 1,
  },
  rightSpacer: {
    width: 38,
  },
});
