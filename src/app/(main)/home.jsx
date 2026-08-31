import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { useAuthStore } from "../../store/authStore";
import { useApplicationStore } from "../../store/applicationStore";
import { AppHeader } from "../../components/AppHeader";
import { ServiceCarousel } from "../../components/ServiceCarousel";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeScreen() {
  const colors = useTheme();
  const router = useRouter();
  const customer = useAuthStore((state) => state.customer);
  const applications = useApplicationStore((state) => state.applications);

  // Dynamic calculations from stores
  const activeCount = applications.filter(
    (app) => app.status !== "Completed",
  ).length;
  const completedCount = applications.filter(
    (app) => app.status === "Completed",
  ).length;
  const pendingDocsCount = applications.reduce(
    (sum, app) =>
      sum + app.documents.filter((d) => d.status === "Pending").length,
    0,
  );
  const pendingPaymentSum = applications
    .filter((app) => app.paymentStatus === "Pending")
    .reduce((sum, app) => sum + app.paymentAmount, 0);

  const recentApps = applications.slice(0, 3);

  const handleExploreCategory = (categoryId) => {
    // Navigate to Services tab, passing the category id
    router.push({
      pathname: "/(main)/services",
      params: { selectedCategory: categoryId },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader title="TaxEdge Dashboard" showBack={false} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeText, { color: colors.text }]}>
            Welcome back, {customer?.name || "Customer"}! 👋
          </Text>
          <Text
            style={[styles.welcomeSubText, { color: colors.textSecondary }]}
          >
            Manage your financial needs and filings easily
          </Text>
        </View>

        {/* Statistics Grid */}
        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={[styles.statIconBg, { backgroundColor: "#E0F2FE" }]}>
              <Ionicons name="folder-open-outline" size={20} color="#0284C7" />
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {activeCount}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Active Apps
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.statIconBg,
                { backgroundColor: colors.orangeLight },
              ]}
            >
              <Ionicons
                name="alert-circle-outline"
                size={20}
                color={colors.orange}
              />
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {pendingDocsCount}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Pending Docs
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={[styles.statIconBg, { backgroundColor: "#FEE2E2" }]}>
              <Ionicons name="wallet-outline" size={20} color="#DC2626" />
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>
              ₹{pendingPaymentSum.toLocaleString()}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Due Fees
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={[styles.statIconBg, { backgroundColor: "#DCFCE7" }]}>
              <Ionicons
                name="checkmark-done-circle-outline"
                size={20}
                color="#16A34A"
              />
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {completedCount}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Completed
            </Text>
          </View>
        </View>

        {/* Due Reminder Card */}
        <View
          style={[styles.reminderCard, { backgroundColor: colors.primaryDark }]}
        >
          <View style={styles.reminderHeader}>
            <Ionicons name="time-outline" size={22} color={colors.orange} />
            <Text style={styles.reminderTitle}>UPCOMING DEADLINE</Text>
          </View>
          <Text style={styles.reminderText}>
            GST Filing (GSTR-3B) for August 2026 is due shortly.
          </Text>
          <View style={styles.reminderFooter}>
            <Text style={styles.reminderDays}>Due in 5 Days</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/service/gst-filing")}
              style={[styles.reminderBtn, { backgroundColor: colors.orange }]}
            >
              <Text style={styles.reminderBtnText}>File Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Explore Services
          </Text>
          <TouchableOpacity onPress={() => router.push("/(main)/services")}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Swipe Carousel */}
        <ServiceCarousel onExplore={handleExploreCategory} />

        {/* Recent Applications Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent Applications
          </Text>
          <TouchableOpacity onPress={() => router.push("/(main)/applications")}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>
              All Applications
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentList}>
          {recentApps.length === 0 ? (
            <View
              style={[
                styles.emptyCard,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                No applications yet. Start a service to see it here.
              </Text>
            </View>
          ) : (
            recentApps.map((app) => (
              <TouchableOpacity
                key={app.id}
                activeOpacity={0.8}
                onPress={() => {
                  useApplicationStore
                    .getState()
                    .setSelectedApplicationId(app.id);
                  router.push(`/application/${app.id}`);
                }}
                style={[
                  styles.appItemCard,
                  {
                    backgroundColor: colors.backgroundElement,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.appCardHeader}>
                  <Text style={[styles.appName, { color: colors.text }]}>
                    {app.serviceName}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          app.status === "Completed"
                            ? "#E8F5E9"
                            : colors.orangeLight,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            app.status === "Completed"
                              ? colors.success
                              : colors.orange,
                        },
                      ]}
                    >
                      {app.status}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.appId, { color: colors.textSecondary }]}>
                  {app.id}
                </Text>

                <View style={styles.progressContainer}>
                  <View style={styles.progressBarWrapper}>
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: `${app.progress}%`,
                          backgroundColor: colors.primary,
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.progressVal, { color: colors.text }]}>
                    {app.progress}%
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "700",
  },
  welcomeSubText: {
    fontSize: 14,
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 14,
  },
  statIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  reminderCard: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  reminderHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reminderTitle: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 11,
    letterSpacing: 0.8,
  },
  reminderText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
    fontWeight: "500",
  },
  reminderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  reminderDays: {
    color: "#FFEAA7",
    fontSize: 13,
    fontWeight: "600",
  },
  reminderBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  reminderBtnText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
  },
  recentList: {
    gap: 12,
  },
  emptyCard: {
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 13,
    textAlign: "center",
  },
  appItemCard: {
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 16,
  },
  appCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appName: {
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  appId: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 10,
  },
  progressBarWrapper: {
    flex: 1,
    height: 6,
    backgroundColor: "#00000008",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 3,
  },
  progressVal: {
    fontSize: 12,
    fontWeight: "700",
    width: 32,
    textAlign: "right",
  },
});
