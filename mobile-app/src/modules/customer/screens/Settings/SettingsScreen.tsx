import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScreenLayout, SCREEN_BOTTOM_PADDING } from "../../../../shared/components/ScreenLayout/ScreenLayout";
import { useTheme } from "../../../../hooks/use-theme";

export function SettingsScreen() {
  const colors = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [biometricEnabled, setBiometricEnabled] = React.useState(false);

  return (
    <ScreenLayout title="Settings" showBack>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: SCREEN_BOTTOM_PADDING }]}
      >
        <View style={[styles.card, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Push Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#CBD5E1", true: colors.orange }}
            />
          </View>

          <View style={[styles.row, { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.text }]}>Biometric Authentication</Text>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: "#CBD5E1", true: colors.orange }}
            />
          </View>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
  },
});

export default SettingsScreen;
