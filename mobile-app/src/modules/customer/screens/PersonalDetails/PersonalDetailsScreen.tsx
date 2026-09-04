import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { ScreenLayout, SCREEN_BOTTOM_PADDING } from "../../../../shared/components/ScreenLayout/ScreenLayout";
import { useTheme } from "../../../../hooks/use-theme";
import { useAuthStore } from "../../../authentication/store/authStore";

export function PersonalDetailsScreen() {
  const colors = useTheme();
  const customer = useAuthStore((state) => state.customer);

  const infoRow = (label: string, value: string) => (
    <View key={label} style={styles.infoRow}>
      <Text style={[styles.infoKey, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
    </View>
  );

  return (
    <ScreenLayout title="Personal Details" showBack>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: SCREEN_BOTTOM_PADDING }]}
      >
        <View style={[styles.card, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
          {infoRow("Full Name", customer?.name || "N/A")}
          {infoRow("Mobile", customer?.mobile || "N/A")}
          {infoRow("Email", customer?.email || "N/A")}
          {infoRow("Date of Birth", customer?.dob || "N/A")}
          {infoRow("Customer Type", customer?.customerType || "N/A")}
          {infoRow("Address", customer?.address || "N/A")}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E2E8F0",
  },
  infoKey: {
    fontSize: 14,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default PersonalDetailsScreen;
