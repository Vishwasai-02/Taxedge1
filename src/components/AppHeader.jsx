import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../hooks/use-theme";
import { useNotificationStore } from "../store/notificationStore";

export function AppHeader({
  title,
  showBack = false,
  showNotification = true,
}) {
  const colors = useTheme();
  const router = useRouter();
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  return (
    <SafeAreaView style={{ backgroundColor: colors.primaryDark }}>
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: colors.primaryDark },
        ]}
      >
        <View style={styles.leftContainer}>
          {showBack ? (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <Ionicons name="briefcase" size={24} color={colors.orange} />
          )}
        </View>

        <Text style={styles.titleText}>{title}</Text>

        <View style={styles.rightContainer}>
          {showNotification && (
            <TouchableOpacity
              onPress={() => router.push("/notifications")}
              style={styles.iconButton}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#FFFFFF"
              />
              {unreadCount > 0 && (
                <View
                  style={[styles.badge, { backgroundColor: colors.orange }]}
                >
                  <Text style={styles.badgeText}>
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: Platform.OS === "ios" ? 44 : 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  leftContainer: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  rightContainer: {
    width: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
  },
  iconButton: {
    position: "relative",
    padding: 4,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },
});
