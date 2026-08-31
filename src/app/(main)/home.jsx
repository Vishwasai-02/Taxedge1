import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { useAuthStore } from "../../store/authStore";
import { useApplicationStore } from "../../store/applicationStore";
import { ServiceCarousel } from "../../components/ServiceCarousel";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const colors = useTheme();
  const router = useRouter();
  const customer = useAuthStore((state) => state.customer);
  const applications = useApplicationStore((state) => state.applications);

  // Dynamic calculations from stores
  const activeCount = applications.filter((app) => app.status !== "Completed").length;
  const pendingDocsCount = applications.reduce(
    (sum, app) => sum + app.documents.filter((d) => d.status === "Pending").length,
    0
  );
  
  const recentApps = applications.slice(0, 3);

  const handleExploreCategory = (categoryId) => {
    router.push({
      pathname: "/(main)/services",
      params: { selectedCategory: categoryId },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />

      {/* Hero Blue Header Container */}
      <View style={[styles.heroHeader, { backgroundColor: colors.primaryDark }]}>
        <SafeAreaView>
          {/* Top Brand Header Row */}
          <View style={styles.topHeaderRow}>
            <View style={styles.brandContainer}>
              <Image 
                source={require("../../../assets/images/logo.png")} 
                style={styles.logo}
                resizeMode="contain" 
              />
              <Text style={styles.brandText}>TAXEDGE</Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={() => router.push("/notifications")} style={styles.iconBtn}>
                <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/(main)/profile")} style={styles.iconBtn}>
                <Ionicons name="person-circle-outline" size={26} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Hello greeting Section */}
          <View style={styles.greetingContainer}>
            <Text style={styles.welcomeText}>Hello, {customer?.name ? customer.name.split(" ")[0] : "Priya"} 👋</Text>
            <Text style={styles.welcomeSubText}>What can we help you with today?</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner Section: LOANS */}
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => handleExploreCategory("LOANS")}
          style={[styles.loansBanner, { backgroundColor: colors.primary }]}
        >
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTitle}>LOANS</Text>
            <Text style={styles.bannerDesc}>Explore our loan solutions</Text>
            <View style={[styles.exploreButton, { backgroundColor: colors.orange }]}>
              <Text style={styles.exploreText}>Explore</Text>
              <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.bannerRight}>
            <Ionicons name="cash-outline" size={72} color={colors.orangeLight} />
          </View>
        </TouchableOpacity>

        {/* Quick Circular Category Links */}
        <View style={styles.quickLinksGrid}>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => router.push("/service/business-loan")}
            style={styles.quickLinkItem}
          >
            <View style={[styles.circleIcon, { backgroundColor: colors.orangeLight }]}>
              <Ionicons name="business" size={22} color={colors.primary} />
            </View>
            <Text style={[styles.circleLabel, { color: colors.text }]} numberOfLines={2}>Business Loan</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => router.push("/service/personal-loan")}
            style={styles.quickLinkItem}
          >
            <View style={[styles.circleIcon, { backgroundColor: colors.orangeLight }]}>
              <Ionicons name="person" size={22} color={colors.primary} />
            </View>
            <Text style={[styles.circleLabel, { color: colors.text }]} numberOfLines={2}>Personal Loan</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => router.push("/service/working-capital")}
            style={styles.quickLinkItem}
          >
            <View style={[styles.circleIcon, { backgroundColor: colors.orangeLight }]}>
              <Ionicons name="home" size={22} color={colors.primary} />
            </View>
            <Text style={[styles.circleLabel, { color: colors.text }]} numberOfLines={2}>Home Loan</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: "/(main)/services", params: { selectedCategory: "LOANS" } })}
            style={styles.quickLinkItem}
          >
            <View style={[styles.circleIcon, { backgroundColor: colors.orangeLight }]}>
              <Ionicons name="car" size={22} color={colors.primary} />
            </View>
            <Text style={[styles.circleLabel, { color: colors.text }]} numberOfLines={2}>Vehicle Loan</Text>
          </TouchableOpacity>
        </View>

        {/* Side-by-side Statistics Cards */}
        <View style={styles.statsRow}>
          <View style={[styles.statsCard, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
            <Text style={[styles.statsNumber, { color: colors.primary }]}>
              {activeCount < 10 ? `0${activeCount}` : activeCount}
            </Text>
            <Text style={[styles.statsLabel, { color: colors.textSecondary }]}>Active Applications</Text>
          </View>

          <View style={[styles.statsCard, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
            <Text style={[styles.statsNumber, { color: colors.orange }]}>
              {pendingDocsCount < 10 ? `0${pendingDocsCount}` : pendingDocsCount}
            </Text>
            <Text style={[styles.statsLabel, { color: colors.textSecondary }]}>Pending Documents</Text>
          </View>
        </View>

        {/* Compliance due banner card */}
        <View style={[styles.complianceCard, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
          <View style={styles.complianceLeft}>
            <Text style={[styles.complianceTitle, { color: colors.textSecondary }]}>Upcoming Compliance</Text>
            <Text style={[styles.complianceDesc, { color: colors.text }]}>GSTR-3B <Text style={{ color: colors.error, fontWeight: "600" }}>Due in 5 Days</Text></Text>
          </View>
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => router.push("/service/gst-filing")}
            style={styles.complianceBtn}
          >
            <Text style={[styles.complianceBtnText, { color: colors.primary }]}>File Now →</Text>
          </TouchableOpacity>
        </View>

        {/* Explore Services Slider Header */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>CORE SERVICE CATEGORIES</Text>
          <TouchableOpacity onPress={() => router.push("/(main)/services")}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Carousel */}
        <ServiceCarousel onExplore={handleExploreCategory} />

        {/* Recent Applications Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Applications</Text>
        </View>

        <View style={styles.recentList}>
          {recentApps.length === 0 ? (
            <View style={[styles.emptyCard, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
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
                  useApplicationStore.getState().setSelectedApplicationId(app.id);
                  router.push(`/application/${app.id}`);
                }}
                style={[
                  styles.recentAppItem,
                  {
                    backgroundColor: colors.backgroundElement,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View style={styles.recentItemLeft}>
                  <View style={[styles.recentIconBg, { backgroundColor: colors.orangeLight }]}>
                    <Ionicons name="document-text" size={20} color={colors.orange} />
                  </View>
                  <View style={styles.recentItemInfo}>
                    <Text style={[styles.recentAppName, { color: colors.text }]}>{app.serviceName}</Text>
                    <Text style={[styles.recentAppStatus, { color: colors.textSecondary }]}>{app.status} • {app.id}</Text>
                  </View>
                </View>
                <Text style={[styles.recentAppTime, { color: colors.textSecondary }]}>2 Days ago</Text>
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
  heroHeader: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  brandText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBtn: {
    padding: 4,
  },
  greetingContainer: {
    marginTop: 20,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  welcomeSubText: {
    color: "#E2E8F0",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "500",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  loansBanner: {
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bannerLeft: {
    flex: 1.2,
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 1,
  },
  bannerDesc: {
    color: "#E2E8F0",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "600",
  },
  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 16,
    height: 32,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginTop: 14,
  },
  exploreText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  bannerRight: {
    flex: 0.8,
    alignItems: "flex-end",
  },
  quickLinksGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  quickLinkItem: {
    width: (width - 64) / 4,
    alignItems: "center",
  },
  circleIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  circleLabel: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 14,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statsCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
    alignItems: "center",
  },
  statsNumber: {
    fontSize: 26,
    fontWeight: "800",
  },
  statsLabel: {
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 4,
    lineHeight: 16,
  },
  complianceCard: {
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  complianceLeft: {
    flex: 1,
  },
  complianceTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  complianceDesc: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },
  complianceBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  complianceBtnText: {
    fontSize: 13,
    fontWeight: "700",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "700",
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
  recentAppItem: {
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recentItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  recentIconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  recentItemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  recentAppName: {
    fontSize: 14,
    fontWeight: "700",
  },
  recentAppStatus: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  recentAppTime: {
    fontSize: 11,
    fontWeight: "500",
  },
});
