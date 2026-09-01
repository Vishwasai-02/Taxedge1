import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../hooks/use-theme";
import { useNotificationStore } from "../store/notificationStore";
import { AppHeader } from "../components/AppHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { IconName, NotificationType } from "../types/domain";

export default function NotificationsScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { notifications, markAllAsRead, markAsRead } = useNotificationStore();

  // Automatically mark all notifications as read when the screen is opened
  useEffect(() => {
    markAllAsRead();
  }, []);

  const getIcon = (
    type: NotificationType,
  ): { name: IconName; color: string } => {
    switch (type) {
      case "gst":
        return { name: "receipt-outline", color: colors.primary };
      case "itr":
        return { name: "cash-outline", color: colors.primaryDark };
      case "loans":
        return { name: "business-outline", color: colors.orange };
      case "insurance":
        return { name: "shield-checkmark-outline", color: colors.success };
      case "payment":
        return { name: "card-outline", color: colors.success };
      case "document":
        return { name: "document-text-outline", color: colors.error };
      default:
        return { name: "notifications-outline", color: colors.textSecondary };
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="Notifications" showBack showNotification={false} />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="notifications-off-outline"
              size={48}
              color={colors.textSecondary}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No notifications
            </Text>
            <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
              You are all caught up!
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const icon = getIcon(item.type);
          return (
            <View
              style={[
                styles.notifCard,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}
            >
              <View
                style={[styles.iconBg, { backgroundColor: icon.color + "12" }]}
              >
                <Ionicons name={icon.name} size={20} color={icon.color} />
              </View>
              <View style={styles.notifContent}>
                <View style={styles.notifHeader}>
                  <Text style={[styles.notifTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.notifTime, { color: colors.textSecondary }]}
                  >
                    {item.timestamp}
                  </Text>
                </View>
                <Text
                  style={[styles.notifBody, { color: colors.textSecondary }]}
                >
                  {item.body}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  notifCard: {
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  notifContent: {
    flex: 1,
    marginLeft: 12,
  },
  notifHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  notifTime: {
    fontSize: 10,
    fontWeight: "500",
  },
  notifBody: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "700",
  },
  emptySub: {
    fontSize: 13,
    marginTop: 6,
  },
});
