import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ItrStepHeaderProps {
  title?: string;
  categoryName?: string;
  onBack?: () => void;
}

export const ItrStepHeader: React.FC<ItrStepHeaderProps> = ({
  title = "ITR Filing",
  categoryName = "Business Income",
  onBack,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/service/itr-filing" as any);
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleBack}
        style={styles.backButton}
      >
        <Ionicons name="chevron-back" size={20} color="#0B1F3A" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.categoryRow}>
          <Text style={styles.categoryPrefix}>Category: </Text>
          <Text style={styles.categoryHighlight}>{categoryName}</Text>
        </View>
      </View>

      {/* Right spacer to keep the center title balanced */}
      <View style={styles.rightSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B1F3A",
    letterSpacing: -0.2,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  categoryPrefix: {
    fontSize: 12.5,
    fontWeight: "500",
    color: "#0B1F3A",
  },
  categoryHighlight: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#F97316",
  },
  rightSpacer: {
    width: 38,
  },
});
