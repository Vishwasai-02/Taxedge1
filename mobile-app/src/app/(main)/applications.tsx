import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { useApplicationStore } from "../../store/applicationStore";
import { ScreenLayout, SCREEN_BOTTOM_PADDING } from "../../components/ScreenLayout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./applications.styles";

export default function ApplicationsScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const applications = useApplicationStore((state) => state.applications);
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredApps = applications.filter((app) => {
    if (activeTab === "ACTIVE") return app.status !== "Completed";
    if (activeTab === "COMPLETED") return app.status === "Completed";
    return true;
  });

  return (
    <ScreenLayout title="My Applications">

      {/* Segmented Tab Headers */}
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor: colors.backgroundElement,
            borderBottomColor: colors.border,
          },
        ]}
      >
        {["ALL", "ACTIVE", "COMPLETED"].map((tab) => {
          const isSelected = activeTab === tab;
          const label =
            tab === "ALL" ? "All" : tab === "ACTIVE" ? "Active" : "Completed";
          return (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabItem,
                isSelected && { borderBottomColor: colors.primary },
              ]}
            >
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isSelected ? colors.primary : colors.textSecondary,
                    fontWeight: isSelected ? "700" : "600",
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Applications List */}
      <FlatList
        data={filteredApps}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: SCREEN_BOTTOM_PADDING }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="folder-open-outline"
              size={48}
              color={colors.textSecondary}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No applications in this category
            </Text>
            <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
              Start a new service in the Services tab
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const isCompleted = item.status === "Completed";
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                useApplicationStore
                  .getState()
                  .setSelectedApplicationId(item.id);
                router.push(`/application/${item.id}`);
              }}
              style={[
                styles.appCard,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.titleInfo}>
                  <Text style={[styles.appName, { color: colors.text }]}>
                    {item.serviceName}
                  </Text>
                  <Text style={[styles.appId, { color: colors.textSecondary }]}>
                    {item.id}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: isCompleted
                        ? "#E8F5E9"
                        : colors.orangeLight,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color: isCompleted ? colors.success : colors.orange,
                      },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.progressRow}>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${item.progress}%`,
                        backgroundColor: isCompleted
                          ? colors.success
                          : colors.primary,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.progressText, { color: colors.text }]}>
                  {item.progress}%
                </Text>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.cardFooter}>
                <View style={styles.footerDetail}>
                  <Ionicons
                    name="person-outline"
                    size={14}
                    color={colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.footerDetailText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Rep: {item.assignedExecutive}
                  </Text>
                </View>

                {item.paymentStatus === "Pending" && (
                  <View style={styles.paymentBadge}>
                    <Ionicons
                      name="card-outline"
                      size={14}
                      color={colors.error}
                    />
                    <Text
                      style={[styles.paymentBadgeText, { color: colors.error }]}
                    >
                      ₹{item.paymentAmount.toLocaleString()} Pending
                    </Text>
                  </View>
                )}

                <View style={styles.arrowContainer}>
                  <Text style={[styles.trackText, { color: colors.primary }]}>
                    Track
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={14}
                    color={colors.primary}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </ScreenLayout>
  );
}

