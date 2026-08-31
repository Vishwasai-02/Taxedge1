import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Pressable,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { useAuthStore } from "../../store/authStore";
import { useApplicationStore } from "../../store/applicationStore";
import { useNotificationStore } from "../../store/notificationStore";
import { ServiceCarousel } from "../../components/ServiceCarousel";
import { SavingsJarAnimation } from "../../components/SavingsJarAnimation";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Maybe } from "../../utils/functional";

const { width } = Dimensions.get("window");

const H_PADDING = 16;
const CARD_WIDTH = width - H_PADDING * 2;
const TILES_PER_PAGE = 5;
const TILE_WIDTH = (CARD_WIDTH - 20) / TILES_PER_PAGE;
const GRID_TILE_WIDTH = (width - 72) / 4;

/* Full service catalogue. The first five are the primary row; the rest fill the
   swipeable pages and the "All Services" sheet. Every route resolves to a real screen. */
const SERVICE_TILES = [
  { id: "gst", label: "GST", icon: "document-text", tint: "#2563EB", tintBg: "#EAF1FE", route: "/(main)/gst" },
  { id: "itr", label: "ITR", icon: "reader", tint: "#0F766E", tintBg: "#E6F5F2", route: "/service/itr-filing" },
  { id: "tds", label: "TDS", icon: "calculator", tint: "#6D28D9", tintBg: "#F1ECFE", route: "/service/tds-refund" },
  { id: "loans", label: "Loans", icon: "business", tint: "#EA580C", tintBg: "#FEF0E6", route: "/service/business-loan" },
  { id: "insurance", label: "Insurance", icon: "shield-checkmark", tint: "#DC2626", tintBg: "#FDEBEB", route: "/service/health-insurance" },

  { id: "accounting", label: "Accounting", icon: "stats-chart", tint: "#0369A1", tintBg: "#E6F0F9", route: "/service/accounting-bookkeeping" },
  { id: "company", label: "Business Reg.", icon: "briefcase", tint: "#7C3AED", tintBg: "#F1ECFE", route: "/service/company-registration" },
  { id: "gst-reg", label: "GST Reg.", icon: "create", tint: "#1D4ED8", tintBg: "#E8EFFD", route: "/service/gst-registration" },
  { id: "gst-filing", label: "GST Filing", icon: "cloud-upload", tint: "#0891B2", tintBg: "#E5F5F9", route: "/service/gst-filing" },
  { id: "compliance", label: "Compliance", icon: "checkmark-done-circle", tint: "#059669", tintBg: "#E6F5F0", route: "/service/gst-compliance" },
  { id: "consultation", label: "Tax Advice", icon: "chatbubbles", tint: "#B45309", tintBg: "#FBF1E3", route: "/(main)/services" },

  { id: "personal-loan", label: "Personal Loan", icon: "person", tint: "#D97706", tintBg: "#FDF2E3", route: "/service/personal-loan" },
  { id: "working-capital", label: "Working Cap.", icon: "trending-up", tint: "#047857", tintBg: "#E5F3EF", route: "/service/working-capital" },
  { id: "health", label: "Health Cover", icon: "medkit", tint: "#E11D48", tintBg: "#FDEAEE", route: "/service/health-insurance" },
  { id: "life", label: "Life Cover", icon: "umbrella", tint: "#BE123C", tintBg: "#FCEBEF", route: "/service/life-insurance" },
  { id: "payments", label: "Payments", icon: "card", tint: "#4F46E5", tintBg: "#ECEBFD", route: "/(main)/payments" },
  { id: "my-filings", label: "My Filings", icon: "folder-open", tint: "#0284C7", tintBg: "#E6F2FA", route: "/(main)/applications" },
];

const MORE_TILE = {
  id: "more",
  label: "More Services",
  icon: "grid",
  tint: "#083B75",
  tintBg: "#E7EDF5",
  isMore: true,
};

/* The home row is fixed: GST / ITR / TDS / Loans and the More entry, which opens
   the full catalogue in a sheet. Nothing scrolls here. */
const HOME_TILES = [...SERVICE_TILES.slice(0, 4), MORE_TILE];

/* Swipeable "apply for" banners. id matches a category in data/services.js. */
const APPLY_BANNERS = [
  { key: "b-gst", id: "GST", title: "GST", desc: "Registration, filing & compliance", cta: "Apply Now", icon: "receipt", bg: "#0B5ED7" },
  { key: "b-itr", id: "ITR", title: "ITR & TDS", desc: "File returns, claim your refund", cta: "File Now", icon: "calculator", bg: "#0E7490" },
  { key: "b-loans", id: "LOANS", title: "LOANS", desc: "Explore our loan solutions", cta: "Explore", icon: "wallet", bg: "#083B75" },
  { key: "b-ins", id: "INSURANCE", title: "INSURANCE", desc: "Health & life cover plans", cta: "Get Quote", icon: "shield-checkmark", bg: "#047857" },
  { key: "b-company", id: "BUSINESS", title: "COMPANY SETUP", desc: "Incorporation & registrations", cta: "Start Now", icon: "business", bg: "#6D28D9" },
  { key: "b-acct", id: "BUSINESS", title: "ACCOUNTING", desc: "Bookkeeping & monthly reports", cta: "Know More", icon: "stats-chart", bg: "#B45309" },
];

/* serviceId is set only where a matching entry exists in data/services.js.
   The rest open the filtered LOANS category instead of a dead /service/<id> route. */
const LOAN_SOLUTIONS = [
  { id: "business-loan", label: "Business Loan", desc: "Grow your business", icon: "business", serviceId: "business-loan" },
  { id: "personal-loan", label: "Personal Loan", desc: "Fulfill your personal needs", icon: "person", serviceId: "personal-loan" },
  { id: "home-loan", label: "Home Loan", desc: "Own your dream home", icon: "home", serviceId: null },
  { id: "vehicle-loan", label: "Vehicle Loan", desc: "Finance your dream vehicle", icon: "car", serviceId: null },
];

const MENU_ITEMS = [
  { label: "Home", icon: "home-outline", route: "/(main)/home" },
  { label: "Services", icon: "grid-outline", route: "/(main)/services" },
  { label: "Applications", icon: "document-text-outline", route: "/(main)/applications" },
  { label: "Payments", icon: "cash-outline", route: "/(main)/payments" },
  { label: "GST Index", icon: "book-outline", route: "/(main)/gst" },
  { label: "Notifications", icon: "notifications-outline", route: "/notifications" },
  { label: "Profile", icon: "person-outline", route: "/(main)/profile" },
];

export default function HomeScreen() {
  const colors = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [bannerPage, setBannerPage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const bannerRef = useRef(null);
  const bannerPageRef = useRef(0);

  const customer = useAuthStore((state) => state.customer);
  const applications = useApplicationStore((state) => state.applications);
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  const customerName = Maybe.of(customer)
    .map((c) => c.name)
    .map((name) => name.split(" ")[0])
    .getOrElse("Priya");

  const activeCount = applications.filter((app) => app.status !== "Completed").length;
  const pendingDocsCount = applications.reduce(
    (sum, app) => sum + app.documents.filter((d) => d.status === "Pending").length,
    0
  );
  const recentApps = applications.slice(0, 3);

  const tileBg = (item) => (isDark ? colors.backgroundSelected : item.tintBg);
  const tileFg = (item) => (isDark ? colors.text : item.tint);

  const handleExploreCategory = (categoryId) => {
    router.push({
      pathname: "/(main)/services",
      params: { selectedCategory: categoryId },
    });
  };

  const go = (route) => {
    setMenuOpen(false);
    router.push(route);
  };

  const openTile = (tile) => {
    if (tile.isMore) {
      setMoreOpen(true);
      return;
    }
    setMoreOpen(false);
    router.push(tile.route);
  };

  const onBannerScroll = (e) => {
    const page = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
    bannerPageRef.current = page;
    setBannerPage(page);
  };

  // Auto-advance the banner carousel; cleared on unmount so no stray state updates.
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (bannerPageRef.current + 1) % APPLY_BANNERS.length;
      bannerPageRef.current = next;
      setBannerPage(next);
      bannerRef.current?.scrollTo({ x: next * CARD_WIDTH, animated: true });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

      {/* ---------- Blue hero header ---------- */}
      <View style={[styles.heroHeader, { backgroundColor: colors.primaryDark, paddingTop: insets.top + 8 }]}>
        <View style={styles.topHeaderRow}>
          <TouchableOpacity onPress={() => setMenuOpen(true)} style={styles.menuBtn} hitSlop={8}>
            <Ionicons name="menu" size={26} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.brandContainer}>
            <View style={styles.logoBox}>
              <Image
                source={require("../../../assets/images/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.brandText}>TAXEDGE</Text>
              <Text style={styles.brandSubText}>FIN SOLUTIONS</Text>
            </View>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => router.push("/notifications")} style={styles.iconBtn} hitSlop={6}>
              <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
              {unreadCount > 0 && (
                <View style={[styles.badge, { backgroundColor: colors.orange }]}>
                  <Text style={styles.badgeText}>{unreadCount > 9 ? "9+" : unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/(main)/profile")} style={styles.iconBtn} hitSlop={6}>
              {customer?.avatarUri ? (
                <Image source={{ uri: customer.avatarUri }} style={styles.headerAvatar} />
              ) : (
                <Ionicons name="person-circle-outline" size={28} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.greetingRow}>
          <View style={styles.greetingContainer}>
            <Text style={styles.welcomeText}>Hello, {customerName} 👋</Text>
            <Text style={styles.welcomeSubText}>What can we help you with today?</Text>
          </View>
          <SavingsJarAnimation accent={colors.orange} />
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/(main)/services")}
          style={styles.searchBar}
        >
          <Ionicons name="search" size={20} color="#94A3B8" />
          <Text style={styles.searchPlaceholder}>Search services, applications, documents...</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- Apply-for banner carousel ---------- */}
        <View>
          <ScrollView
            ref={bannerRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onBannerScroll}
            scrollEventThrottle={16}
          >
            {APPLY_BANNERS.map((banner) => (
              <View key={banner.key} style={styles.bannerPage}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => handleExploreCategory(banner.id)}
                  style={[styles.loansBanner, { backgroundColor: banner.bg }]}
                >
                  <View style={styles.bannerLeft}>
                    <Text style={styles.bannerTitle}>{banner.title}</Text>
                    <Text style={styles.bannerDesc}>{banner.desc}</Text>
                    <View style={[styles.exploreButton, { backgroundColor: colors.orange }]}>
                      <Text style={styles.exploreText}>{banner.cta}</Text>
                      <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
                    </View>
                  </View>

                  <View style={styles.dotGrid} pointerEvents="none">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <View key={i} style={styles.decorDot} />
                    ))}
                  </View>

                  <View style={styles.bannerRight}>
                    <View style={styles.bannerIconCircle}>
                      <Ionicons name={banner.icon} size={44} color="#FFFFFF" />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.dotsRow}>
            {APPLY_BANNERS.map((b, i) => (
              <View
                key={b.key}
                style={[
                  styles.pageDot,
                  {
                    backgroundColor: i === bannerPage ? colors.primary : colors.border,
                    width: i === bannerPage ? 18 : 7,
                    height: 7,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* ---------- Quick Services ---------- */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Services</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
          <View style={styles.quickRow}>
            {HOME_TILES.map((tile) => (
              <TouchableOpacity
                key={tile.id}
                activeOpacity={0.75}
                onPress={() => openTile(tile)}
                style={styles.quickTile}
              >
                <View style={[styles.circleIcon, { backgroundColor: tileBg(tile) }]}>
                  <Ionicons name={tile.icon} size={24} color={tileFg(tile)} />
                </View>
                <Text style={[styles.circleLabel, { color: colors.text }]} numberOfLines={2}>
                  {tile.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ---------- Loan Solutions ---------- */}
        <View style={[styles.card, styles.cardPadded, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Loan Solutions</Text>
            <TouchableOpacity onPress={() => handleExploreCategory("LOANS")} hitSlop={8}>
              <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>

          {LOAN_SOLUTIONS.map((loan, index) => (
            <TouchableOpacity
              key={loan.id}
              activeOpacity={0.75}
              onPress={() =>
                loan.serviceId
                  ? router.push(`/service/${loan.serviceId}`)
                  : handleExploreCategory("LOANS")
              }
              style={[
                styles.listRow,
                index < LOAN_SOLUTIONS.length - 1 && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <View style={[styles.listIconCircle, { backgroundColor: colors.orangeLight }]}>
                <Ionicons name={loan.icon} size={20} color={colors.orange} />
              </View>
              <View style={styles.listRowText}>
                <Text style={[styles.listRowTitle, { color: colors.text }]}>{loan.label}</Text>
                <Text style={[styles.listRowDesc, { color: colors.textSecondary }]}>{loan.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------- Action required ---------- */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/(main)/profile")}
          style={[
            styles.actionCard,
            {
              backgroundColor: isDark ? colors.backgroundElement : "#FEF7F0",
              borderColor: isDark ? colors.border : "#FBE0C6",
            },
          ]}
        >
          <View style={[styles.actionIconBox, { backgroundColor: colors.orangeLight }]}>
            <Ionicons name="document-text" size={22} color={colors.orange} />
          </View>
          <View style={styles.actionText}>
            <Text style={[styles.actionTitle, { color: colors.text }]}>Action Required</Text>
            <Text style={[styles.actionSubtitle, { color: colors.text }]}>KYC Documents Expiring</Text>
            <Text style={[styles.actionDesc, { color: colors.textSecondary }]}>Your PAN is expiring in 12 days.</Text>
          </View>
          <View style={styles.actionRight}>
            <View style={[styles.countBadge, { backgroundColor: colors.orange }]}>
              <Text style={styles.countBadgeText}>2</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </View>
        </TouchableOpacity>

        {/* ---------- Stats ---------- */}
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

        {/* ---------- Compliance ---------- */}
        <View style={[styles.card, styles.complianceCard, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
          <View style={styles.complianceLeft}>
            <Text style={[styles.complianceTitle, { color: colors.textSecondary }]}>Upcoming Compliance</Text>
            <Text style={[styles.complianceDesc, { color: colors.text }]}>
              GSTR-3B <Text style={{ color: colors.error, fontWeight: "600" }}>Due in 5 Days</Text>
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.push("/service/gst-filing")}>
            <Text style={[styles.complianceBtnText, { color: colors.primary }]}>File Now →</Text>
          </TouchableOpacity>
        </View>

        {/* ---------- Core categories ---------- */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Core Service Categories</Text>
          <TouchableOpacity onPress={() => router.push("/(main)/services")} hitSlop={8}>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>
        <ServiceCarousel onExplore={handleExploreCategory} />

        {/* ---------- Recent applications ---------- */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Applications</Text>
          <TouchableOpacity onPress={() => router.push("/(main)/applications")} hitSlop={8}>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.cardPadded, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
          {recentApps.length === 0 ? (
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No applications yet. Start a service to see it here.
            </Text>
          ) : (
            recentApps.map((app, index) => (
              <TouchableOpacity
                key={app.id}
                activeOpacity={0.75}
                onPress={() => {
                  useApplicationStore.getState().setSelectedApplicationId(app.id);
                  router.push(`/application/${app.id}`);
                }}
                style={[
                  styles.listRow,
                  index < recentApps.length - 1 && {
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <View style={[styles.listIconCircle, { backgroundColor: colors.orangeLight }]}>
                  <Ionicons name="document-text" size={20} color={colors.orange} />
                </View>
                <View style={styles.listRowText}>
                  <Text style={[styles.listRowTitle, { color: colors.text }]} numberOfLines={1}>
                    {app.serviceName}
                  </Text>
                  <Text style={[styles.listRowDesc, { color: colors.textSecondary }]} numberOfLines={1}>
                    {app.status} • {app.id}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* ---------- All services sheet ---------- */}
      <Modal
        visible={moreOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setMoreOpen(false)}
      >
        <Pressable style={styles.sheetBackdrop} onPress={() => setMoreOpen(false)}>
          <Pressable
            style={[
              styles.sheet,
              { backgroundColor: colors.backgroundElement, paddingBottom: insets.bottom + 20 },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />

            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: colors.text }]}>All Services</Text>
              <TouchableOpacity onPress={() => setMoreOpen(false)} hitSlop={10}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.sheetGrid}>
                {SERVICE_TILES.map((tile) => (
                  <TouchableOpacity
                    key={tile.id}
                    activeOpacity={0.75}
                    onPress={() => openTile(tile)}
                    style={styles.gridTile}
                  >
                    <View style={[styles.circleIcon, { backgroundColor: tileBg(tile) }]}>
                      <Ionicons name={tile.icon} size={24} color={tileFg(tile)} />
                    </View>
                    <Text
                      style={[styles.circleLabel, { color: colors.text }]}
                      numberOfLines={2}
                    >
                      {tile.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {
                  setMoreOpen(false);
                  router.push("/(main)/services");
                }}
                style={[styles.sheetCta, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.sheetCtaText}>Browse full catalogue</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ---------- Side menu ---------- */}
      <Modal visible={menuOpen} transparent animationType="fade" onRequestClose={() => setMenuOpen(false)}>
        <Pressable style={styles.menuBackdrop} onPress={() => setMenuOpen(false)}>
          <Pressable
            style={[styles.menuPanel, { backgroundColor: colors.backgroundElement, paddingTop: insets.top + 16 }]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.menuHeader}>
              {customer?.avatarUri ? (
                <Image source={{ uri: customer.avatarUri }} style={styles.menuAvatar} />
              ) : (
                <View style={[styles.logoBox, { backgroundColor: colors.primaryDark }]}>
                  <Image
                    source={require("../../../assets/images/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
              )}
              <View>
                <Text style={[styles.menuBrand, { color: colors.text }]}>
                  {customer?.name || "TAXEDGE"}
                </Text>
                <Text style={[styles.menuBrandSub, { color: colors.textSecondary }]}>
                  {customer?.customerId || "FIN SOLUTIONS"}
                </Text>
              </View>
            </View>

            <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />

            {MENU_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.label}
                activeOpacity={0.75}
                onPress={() => go(item.route)}
                style={styles.menuItem}
              >
                <Ionicons name={item.icon} size={20} color={colors.primary} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  /* Header */
  heroHeader: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 18,
  },
  topHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuBtn: {
    paddingRight: 12,
  },
  brandContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 28,
    height: 28,
  },
  brandText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  brandSubText: {
    color: "#B9CBE4",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 2,
    marginTop: 1,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconBtn: {
    padding: 2,
  },
  headerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.75)",
  },
  menuAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#052750",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  greetingRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 18,
  },
  greetingContainer: {
    flex: 1,
    paddingRight: 8,
    paddingBottom: 6,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
  },
  welcomeSubText: {
    color: "#CBD9EA",
    fontSize: 14,
    marginTop: 5,
    fontWeight: "500",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  searchPlaceholder: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },

  /* Scroll body */
  scrollContent: {
    padding: H_PADDING,
    gap: 16,
  },

  /* Banner */
  loansBanner: {
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  bannerLeft: {
    flex: 1.4,
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1,
  },
  bannerDesc: {
    color: "#D7E3F2",
    fontSize: 13.5,
    marginTop: 5,
    fontWeight: "600",
  },
  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    height: 36,
    borderRadius: 18,
    alignSelf: "flex-start",
    marginTop: 16,
  },
  exploreText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 13,
  },
  dotGrid: {
    position: "absolute",
    right: 118,
    top: 26,
    width: 34,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    opacity: 0.28,
  },
  decorDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#FFFFFF",
  },
  bannerRight: {
    flex: 0.9,
    alignItems: "flex-end",
  },
  bannerIconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "rgba(255,255,255,0.14)",
    justifyContent: "center",
    alignItems: "center",
  },

  /* Generic card */
  card: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 16,
  },
  cardPadded: {
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: "700",
  },

  /* Quick links */
  bannerPage: {
    width: CARD_WIDTH,
  },
  quickRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  quickTile: {
    width: TILE_WIDTH,
    alignItems: "center",
    paddingHorizontal: 1,
  },
  circleIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  circleLabel: {
    fontSize: 11.5,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 9,
    lineHeight: 14,
  },

  /* All services sheet */
  sheetBackdrop: {
    flex: 1,
    backgroundColor: "rgba(5,39,80,0.45)",
    justifyContent: "flex-end",
  },
  sheet: {
    maxHeight: "78%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sheetHandle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 14,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  sheetGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 20,
  },
  gridTile: {
    width: GRID_TILE_WIDTH,
    alignItems: "center",
  },
  sheetCta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 48,
    borderRadius: 14,
    marginTop: 24,
  },
  sheetCtaText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 14,
  },
  pageDot: {
    borderRadius: 4,
  },

  /* List rows */
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
  },
  listIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  listRowText: {
    flex: 1,
  },
  listRowTitle: {
    fontSize: 14.5,
    fontWeight: "700",
  },
  listRowDesc: {
    fontSize: 12.5,
    fontWeight: "500",
    marginTop: 3,
  },
  emptyText: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    paddingVertical: 12,
  },

  /* Action required */
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  actionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  actionSubtitle: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 3,
  },
  actionDesc: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },
  actionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  countBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  countBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  /* Stats */
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statsCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    alignItems: "center",
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: "800",
  },
  statsLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },

  /* Compliance */
  complianceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  complianceLeft: {
    flex: 1,
    paddingRight: 12,
  },
  complianceTitle: {
    fontSize: 12,
    fontWeight: "600",
  },
  complianceDesc: {
    fontSize: 14.5,
    fontWeight: "700",
    marginTop: 4,
  },
  complianceBtnText: {
    fontSize: 13,
    fontWeight: "800",
  },

  /* Section headers */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
  },

  /* Side menu */
  menuBackdrop: {
    flex: 1,
    backgroundColor: "rgba(5,39,80,0.45)",
    flexDirection: "row",
  },
  menuPanel: {
    width: Math.min(width * 0.76, 320),
    height: "100%",
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuBrand: {
    fontSize: 16,
    fontWeight: "800",
  },
  menuBrandSub: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 18,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
