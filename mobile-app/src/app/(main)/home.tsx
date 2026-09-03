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
  TextInput,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, type Href } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { useAuthStore } from "../../store/authStore";
import { useApplicationStore } from "../../store/applicationStore";
import { useNotificationStore } from "../../store/notificationStore";
import { SavingsJarAnimation } from "../../components/SavingsJarAnimation";
import { SERVICE_CATALOGUE } from "../../data/catalogue";
import { SCREEN_BOTTOM_PADDING } from "../../components/ScreenLayout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Maybe } from "../../utils/functional";
import type {
  CatalogueItem,
  IconName,
  ServiceCategoryId,
} from "../../types/domain";

/** A tile in the Quick Services row or the "All Services" sheet. */
interface ServiceTile {
  id: string;
  label: string;
  icon: IconName;
  tint: string;
  tintBg: string;
  /** Absent on the "More Services" tile, which opens the sheet instead. */
  route?: Href;
  isMore?: boolean;
}

interface Deadline {
  id: string;
  tag: string;
  tint: string;
  tintBg: string;
  title: string;
  date: string;
  urgent: boolean;
  route: Href;
}

interface StatTile {
  id: string;
  label: string;
  value: string;
  tint: string;
  tintBg: string;
  icon: IconName;
  route: Href;
}

interface ApplyBanner {
  key: string;
  id: ServiceCategoryId;
  title: string;
  desc: string;
  cta: string;
  icon: IconName;
  /** Assigned below so the navy alternates as you swipe. */
  bg: string;
}

/** Anything carrying the two-tone palette used by the tiles and stat cards. */
interface Tinted {
  tint: string;
  tintBg: string;
}

const { width } = Dimensions.get("window");

const H_PADDING = 16;
const CARD_WIDTH = width - H_PADDING * 2;

/* Full service catalogue. The first five are the primary row; the rest fill the
   swipeable pages and the "All Services" sheet. Every route resolves to a real screen. */
const SERVICE_TILES: ServiceTile[] = [
  { id: "gst", label: "GST", icon: "document-text", tint: "#2563EB", tintBg: "#EAF1FE", route: "/service/gst" },
  { id: "itr", label: "ITR", icon: "reader", tint: "#0F766E", tintBg: "#E6F5F2", route: "/service/itr" },
  { id: "tds", label: "TDS", icon: "calculator", tint: "#6D28D9", tintBg: "#F1ECFE", route: "/service/tds-refund" },
  { id: "loans", label: "Loans", icon: "business", tint: "#EA580C", tintBg: "#FEF0E6", route: "/service/loans" },
  { id: "insurance", label: "Insurance", icon: "shield-checkmark", tint: "#DC2626", tintBg: "#FDEBEB", route: "/service/health-insurance" },

  { id: "accounting", label: "Accounting", icon: "stats-chart", tint: "#0369A1", tintBg: "#E6F0F9", route: "/service/accounting-bookkeeping" },
  { id: "company", label: "Business Reg.", icon: "briefcase", tint: "#7C3AED", tintBg: "#F1ECFE", route: "/service/company-registration" },
  { id: "gst-reg", label: "GST Reg.", icon: "create", tint: "#1D4ED8", tintBg: "#E8EFFD", route: "/service/gst-registration" },
  { id: "gst-filing", label: "GST Filing", icon: "cloud-upload", tint: "#0891B2", tintBg: "#E5F5F9", route: "/service/gst-filing" },
  { id: "compliance", label: "Compliance", icon: "checkmark-done-circle", tint: "#059669", tintBg: "#E6F5F0", route: "/service/gst-compliance" },
  { id: "consultation", label: "Tax Advice", icon: "chatbubbles", tint: "#B45309", tintBg: "#FBF1E3", route: "/services" },

  { id: "personal-loan", label: "Personal Loan", icon: "person", tint: "#D97706", tintBg: "#FDF2E3", route: "/service/personal-loan" },
  { id: "working-capital", label: "Working Cap.", icon: "trending-up", tint: "#047857", tintBg: "#E5F3EF", route: "/service/working-capital" },
  { id: "health", label: "Health Cover", icon: "medkit", tint: "#E11D48", tintBg: "#FDEAEE", route: "/service/health-insurance" },
  { id: "life", label: "Life Cover", icon: "umbrella", tint: "#BE123C", tintBg: "#FCEBEF", route: "/service/life-insurance" },
  { id: "payments", label: "Payments", icon: "card", tint: "#4F46E5", tintBg: "#ECEBFD", route: "/(main)/payments" },
  { id: "my-filings", label: "My Filings", icon: "folder-open", tint: "#0284C7", tintBg: "#E6F2FA", route: "/(main)/applications" },
];

const UPCOMING_DEADLINES: Deadline[] = [
  {
    id: "gstr3b",
    tag: "GST",
    tint: "#0F766E",
    tintBg: "#E6F5F2",
    title: "GSTR-3B Filing Due",
    date: "20 Sep 2026",
    urgent: true,
    route: "/service/gst-filing",
  },
  {
    id: "itr1",
    tag: "ITR",
    tint: "#2563EB",
    tintBg: "#EAF1FE",
    title: "ITR-1 Filing Deadline",
    date: "31 Oct 2026",
    urgent: false,
    route: "/service/itr-filing",
  },
  {
    id: "emi",
    tag: "Loan",
    tint: "#EA580C",
    tintBg: "#FEF0E6",
    title: "EMI Due - Business Loan",
    date: "05 Sep 2026",
    urgent: false,
    route: "/service/business-loan",
  },
];

const MORE_TILE: ServiceTile = {
  id: "more",
  label: "More Services",
  icon: "grid",
  tint: "#083B75",
  tintBg: "#E7EDF5",
  isMore: true,
};

/* The home row has ONLY 4 Quick Services: GST / ITR / Loans / More Services */
const HOME_TILES: ServiceTile[] = [
  SERVICE_TILES[0], // GST -> /service/gst
  SERVICE_TILES[1], // ITR -> /service/itr
  SERVICE_TILES[3], // Loans -> /service/loans
  { ...MORE_TILE, label: "More\nServices" },
];

/* Swipeable "apply for" banners. id matches a category in data/services.ts. */
/* Palette is restricted to the two brand colours: navy at two depths for a bit
   of rhythm as you swipe, and orange for the CTA and the icon. */
const BANNER_HEIGHT = 168;
const BANNER_NAVY = "#083B75";
const BANNER_NAVY_DEEP = "#052750";

const APPLY_BANNERS: ApplyBanner[] = (
  [
    { key: "b-gst", id: "GST", title: "GST", desc: "Registration, filing & compliance", cta: "Apply Now", icon: "receipt" },
    { key: "b-itr", id: "ITR", title: "ITR & TDS", desc: "File returns, claim your refund", cta: "File Now", icon: "calculator" },
    { key: "b-loans", id: "LOANS", title: "LOANS", desc: "Explore our loan solutions", cta: "Explore", icon: "wallet" },
    { key: "b-ins", id: "INSURANCE", title: "INSURANCE", desc: "Health & life cover plans", cta: "Get Quote", icon: "shield-checkmark" },
    { key: "b-company", id: "BUSINESS", title: "COMPANY SETUP", desc: "Incorporation & registrations", cta: "Start Now", icon: "business" },
    { key: "b-acct", id: "BUSINESS", title: "ACCOUNTING", desc: "Bookkeeping & monthly reports", cta: "Know More", icon: "stats-chart" },
  ] as const
).map((banner, i) => ({
  ...banner,
  bg: i % 2 === 0 ? BANNER_NAVY : BANNER_NAVY_DEEP,
}));

export default function HomeScreen() {
  const colors = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [bannerPage, setBannerPage] = useState(0);
  const [moreOpen, setMoreOpen] = useState(false);
  const [moreQuery, setMoreQuery] = useState("");
  const bannerRef = useRef<ScrollView>(null);
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
  const completedCount = applications.filter((app) => app.status === "Completed").length;
  const paymentDue = applications
    .filter((app) => app.paymentStatus === "Pending")
    .reduce((sum, app) => sum + (app.paymentAmount || 0), 0);

  const recentApps = applications.slice(0, 3);

  const STATS: StatTile[] = [
    { id: "active", label: "Active\nApplications", value: `${activeCount}`, tint: "#059669", tintBg: "#E6F5F0", icon: "folder", route: "/(main)/applications" },
    { id: "docs", label: "Pending\nDocuments", value: `${pendingDocsCount}`, tint: "#EA580C", tintBg: "#FEF0E6", icon: "document-attach", route: "/(main)/applications" },
    { id: "due", label: "Payment Due", value: `₹${paymentDue.toLocaleString("en-IN")}`, tint: "#DC2626", tintBg: "#FDEBEB", icon: "card", route: "/(main)/payments" },
    { id: "done", label: "Completed\nServices", value: `${completedCount}`, tint: "#2563EB", tintBg: "#EAF1FE", icon: "checkbox", route: "/(main)/applications" },
  ];

  const statusTone = (status: string) => {
    if (status === "Completed") return { fg: "#047857", bg: "#E6F5F0" };
    if (status === "Rejected") return { fg: "#B91C1C", bg: "#FDEBEB" };
    if (status === "Verification") return { fg: "#6D28D9", bg: "#F1ECFE" };
    return { fg: "#1D4ED8", bg: "#EAF1FE" };
  };

  const tileBg = (item: Tinted) =>
    isDark ? colors.backgroundSelected : item.tintBg;
  const tileFg = (item: Tinted) => (isDark ? colors.text : item.tint);

  const handleExploreCategory = (categoryId: ServiceCategoryId) => {
    router.push({
      pathname: "/services",
      params: { selectedCategory: categoryId },
    });
  };

  const openCatalogueItem = (
    item: CatalogueItem,
    categoryId: ServiceCategoryId,
  ) => {
    setMoreOpen(false);
    if (item.serviceId) {
      router.push(`/service/${item.serviceId}`);
    } else {
      handleExploreCategory(categoryId);
    }
  };

  const openTile = (tile: ServiceTile) => {
    if (tile.isMore) {
      setMoreQuery("");
      setMoreOpen(true);
      return;
    }
    setMoreOpen(false);
    if (tile.route) router.push(tile.route);
  };

  /* Catalogue narrowed by the sheet's search box; empty sections drop out. */
  const catalogueQuery = moreQuery.trim().toLowerCase();
  const filteredCatalogue = SERVICE_CATALOGUE.map((group) => ({
    ...group,
    items: catalogueQuery
      ? group.items.filter((item) =>
        item.label.toLowerCase().includes(catalogueQuery),
      )
      : group.items,
  })).filter((group) => group.items.length > 0);

  const onBannerScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/(main)/profile")}
            style={styles.menuBtn}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Open profile"
          >
            <Ionicons name="menu" size={26} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.brandContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/(main)/profile")}
              style={styles.logoBox}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Open profile"
            >
              <Image
                source={require("../../../assets/images/icon.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>
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
          </View>
        </View>

        <View style={styles.greetingRow}>
          <View style={styles.greetingContainer}>
            <Text style={styles.welcomeText}>Hello, {customerName} 👋</Text>
            <Text style={styles.welcomeSubText}>What can we help you with today?</Text>
          </View>
          <SavingsJarAnimation accent={colors.orange} scale={0.8} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: SCREEN_BOTTOM_PADDING }]}
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
                    <Text style={styles.bannerTitle} numberOfLines={1}>
                      {banner.title}
                    </Text>
                    <Text style={styles.bannerDesc} numberOfLines={2}>
                      {banner.desc}
                    </Text>
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
                      <Ionicons name={banner.icon} size={44} color={colors.orange} />
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
          <TouchableOpacity onPress={() => setMoreOpen(true)} hitSlop={8} style={styles.linkRow}>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>All Services</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.primary} />
          </TouchableOpacity>
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
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Financial Overview</Text>

        </View>

        {/* ---------- Stats grid ---------- */}
        <View style={styles.statsGrid}>
          {STATS.map((stat) => (
            <TouchableOpacity
              key={stat.id}
              activeOpacity={0.85}
              onPress={() => router.push(stat.route)}
              style={[
                styles.statsCard,
                { backgroundColor: colors.backgroundElement, borderColor: colors.border },
              ]}
            >
              <View style={styles.statsTop}>
                <Text style={[styles.statsLabel, { color: colors.textSecondary }]}>
                  {stat.label}
                </Text>
                <View style={[styles.statsIcon, { backgroundColor: isDark ? colors.backgroundSelected : stat.tintBg }]}>
                  <Ionicons name={stat.icon} size={17} color={isDark ? colors.text : stat.tint} />
                </View>
              </View>
              <Text style={[styles.statsNumber, { color: stat.tint }]}>{stat.value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------- Upcoming deadlines ---------- */}
        <View style={[styles.card, styles.cardPadded, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Upcoming Deadlines</Text>

          {UPCOMING_DEADLINES.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.75}
              onPress={() => router.push(item.route)}
              style={[
                styles.deadlineRow,
                index < UPCOMING_DEADLINES.length - 1 && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <View style={[styles.deadlineTag, { backgroundColor: isDark ? colors.backgroundSelected : item.tintBg }]}>
                <Text style={[styles.deadlineTagText, { color: isDark ? colors.text : item.tint }]}>
                  {item.tag}
                </Text>
              </View>

              <View style={styles.deadlineText}>
                <Text style={[styles.deadlineTitle, { color: colors.text }]} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={[styles.deadlineDate, { color: colors.textSecondary }]}>
                  {item.date}
                </Text>
              </View>

              {item.urgent && (
                <View style={[styles.duePill, { backgroundColor: isDark ? colors.backgroundSelected : "#FDEBEB" }]}>
                  <Text style={[styles.duePillText, { color: colors.error }]}>Due Soon</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------- Recent applications ---------- */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Applications</Text>
          <TouchableOpacity onPress={() => router.push("/(main)/applications")} hitSlop={8} style={styles.linkRow}>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {recentApps.length === 0 ? (
          <View style={[styles.card, styles.cardPadded, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No applications yet. Start a service to see it here.
            </Text>
          </View>
        ) : (
          recentApps.map((app) => {
            const tone = statusTone(app.status);
            return (
              <TouchableOpacity
                key={app.id}
                activeOpacity={0.85}
                onPress={() => {
                  useApplicationStore.getState().setSelectedApplicationId(app.id);
                  router.push(`/application/${app.id}`);
                }}
                style={[
                  styles.appCard,
                  { backgroundColor: colors.backgroundElement, borderColor: colors.border },
                ]}
              >
                <View style={styles.appCardTop}>
                  <Text style={[styles.appId, { color: colors.success }]}>{app.id}</Text>
                  <View style={[styles.statusPill, { backgroundColor: isDark ? colors.backgroundSelected : tone.bg }]}>
                    <Text style={[styles.statusPillText, { color: isDark ? colors.text : tone.fg }]}>
                      {app.status}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.appName, { color: colors.text }]} numberOfLines={1}>
                  {app.serviceName}
                </Text>

                <View style={styles.appCardBottom}>
                  <Text style={[styles.appDate, { color: colors.textSecondary }]}>
                    {app.createdAt}
                  </Text>
                  <View style={styles.linkRow}>
                    <Text style={[styles.viewAllText, { color: colors.primary }]}>View Details</Text>
                    <Ionicons name="chevron-forward" size={14} color={colors.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}

        {/* ---------- Need help ---------- */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/chat/support")}
          style={styles.helpCard}
        >
          <View style={styles.helpIcon}>
            <Ionicons name="chatbubble-ellipses" size={22} color="#FFFFFF" />
          </View>

          <View style={styles.helpText}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpDesc}>Our experts are available 24/7</Text>
          </View>

          <View style={styles.helpBtn}>
            <Text style={styles.helpBtnText}>Chat</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>

      {/* ---------- Explore services sheet ---------- */}
      <Modal
        visible={moreOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setMoreOpen(false)}
      >
        <Pressable
          style={styles.sheetBackdrop}
          onPress={() => setMoreOpen(false)}
        >
          <Pressable
            style={[
              styles.sheet,
              {
                backgroundColor: colors.background,
                paddingBottom: insets.bottom + 12,
              },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: colors.text }]}>
                Explore Services
              </Text>
              <TouchableOpacity onPress={() => setMoreOpen(false)} hitSlop={10}>
                <Text style={[styles.sheetDone, { color: colors.orange }]}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.sheetSearch,
                {
                  backgroundColor: colors.backgroundElement,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons name="search" size={17} color={colors.textSecondary} />
              <TextInput
                value={moreQuery}
                onChangeText={setMoreQuery}
                placeholder="Search services..."
                placeholderTextColor={colors.textSecondary}
                style={[styles.sheetSearchInput, { color: colors.text }]}
                autoCorrect={false}
                returnKeyType="search"
              />
              {moreQuery.length > 0 && (
                <TouchableOpacity onPress={() => setMoreQuery("")} hitSlop={8}>
                  <Ionicons
                    name="close-circle"
                    size={17}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              )}
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.sheetScrollContent}
            >
              {filteredCatalogue.map((group, groupIndex) => (
                <View key={`${group.id}-${groupIndex}`}>
                  <View style={styles.catHeader}>
                    <View
                      style={[
                        styles.catIcon,
                        {
                          backgroundColor: isDark
                            ? colors.backgroundSelected
                            : "#E8EFF7",
                        },
                      ]}
                    >
                      <Ionicons
                        name={group.icon}
                        size={16}
                        color={colors.primary}
                      />
                    </View>
                    <Text style={[styles.catTitle, { color: colors.text }]}>
                      {group.title}
                    </Text>
                  </View>

                  {group.items.map((item) => (
                    <TouchableOpacity
                      key={item.label}
                      activeOpacity={0.75}
                      onPress={() => openCatalogueItem(item, group.id)}
                      style={[
                        styles.serviceRow,
                        {
                          backgroundColor: colors.backgroundElement,
                          borderColor: colors.border,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.serviceRowText, { color: colors.text }]}
                      >
                        {item.label}
                      </Text>
                      <Ionicons
                        name="chevron-forward"
                        size={17}
                        color={colors.textSecondary}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              ))}

              {filteredCatalogue.length === 0 && (
                <View style={styles.sheetEmpty}>
                  <Ionicons
                    name="search-outline"
                    size={34}
                    color={colors.textSecondary}
                  />
                  <Text
                    style={[styles.sheetEmptyText, { color: colors.text }]}
                  >
                    No services match "{moreQuery.trim()}"
                  </Text>
                </View>
              )}
            </ScrollView>
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
    paddingBottom: 12,
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
    alignItems: "center",
    marginTop: 12,
  },
  greetingContainer: {
    flex: 1,
    paddingRight: 8,
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

  /* Scroll body */
  scrollContent: {
    padding: H_PADDING,
    gap: 16,
  },

  /* Banner */
  loansBanner: {
    // Fixed height: the slides carry different amounts of text, and without
    // this the carousel changed size as you swiped.
    height: BANNER_HEIGHT,
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
    color: "#C9D8EC",
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
    opacity: 0.55,
  },
  decorDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#F97316",
  },
  bannerRight: {
    flex: 0.9,
    alignItems: "flex-end",
  },
  bannerIconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "rgba(249,115,22,0.16)",
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
    flex: 1,
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
    height: "92%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sheetTitle: {
    fontSize: 21,
    fontWeight: "800",
  },
  sheetDone: {
    fontSize: 15,
    fontWeight: "700",
  },
  sheetSearch: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  sheetSearchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    padding: 0,
  },
  sheetScrollContent: {
    paddingTop: 6,
    paddingBottom: 12,
  },

  /* Catalogue groups */
  catHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 18,
    marginBottom: 10,
  },
  catIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  catTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  serviceRowText: {
    fontSize: 14.5,
    fontWeight: "500",
  },
  sheetEmpty: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 56,
  },
  sheetEmptyText: {
    fontSize: 14,
    fontWeight: "600",
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
  emptyText: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    paddingVertical: 12,
  },

  /* Action required */

  /* Stats grid */
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statsCard: {
    width: (CARD_WIDTH - 12) / 2,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  statsTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  statsLabel: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: "600",
    lineHeight: 16,
  },
  statsIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  statsNumber: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 12,
  },

  /* Upcoming deadlines */
  deadlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
  },
  deadlineTag: {
    minWidth: 44,
    paddingHorizontal: 8,
    height: 26,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  deadlineTagText: {
    fontSize: 11,
    fontWeight: "800",
  },
  deadlineText: {
    flex: 1,
  },
  deadlineTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  deadlineDate: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 3,
  },
  duePill: {
    paddingHorizontal: 10,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
  },
  duePillText: {
    fontSize: 11,
    fontWeight: "800",
  },

  /* Recent application cards */
  appCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  appCardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  appId: {
    fontSize: 12.5,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  statusPill: {
    paddingHorizontal: 10,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: "700",
  },
  appName: {
    fontSize: 17,
    fontWeight: "800",
    marginTop: 10,
  },
  appCardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  appDate: {
    fontSize: 12.5,
    fontWeight: "500",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
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

  /* Need help */
  helpCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#0B5B41",
    borderRadius: 18,
    padding: 16,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  helpIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.16)",
    justifyContent: "center",
    alignItems: "center",
  },
  helpText: {
    flex: 1,
  },
  helpTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  helpDesc: {
    color: "#C7E5D8",
    fontSize: 12.5,
    fontWeight: "500",
    marginTop: 3,
  },
  helpBtn: {
    paddingHorizontal: 18,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
  },
  helpBtnText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: "800",
  },
});
