import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Svg, { Path, Rect } from "react-native-svg";
import { useTheme } from "../../hooks/use-theme";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { useResponsive } from "../../hooks/use-responsive";
import { useApplicationStore } from "../../store/applicationStore";
import { useNotificationStore } from "../../store/notificationStore";
import { SCREEN_BOTTOM_PADDING } from "../../components/ScreenLayout";
import type { Application, ServiceCategoryId } from "../../types/domain";

type StatusFilterType = "ALL" | "IN_PROGRESS" | "COMPLETED" | "UNDER_VERIFICATION";

const CATEGORY_TABS: { id: "ALL" | ServiceCategoryId; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "GST", label: "GST" },
  { id: "ITR", label: "ITR" },
  { id: "LOANS", label: "Loans" },
  { id: "BUSINESS", label: "Business" },
  { id: "INSURANCE", label: "Insurance" },
];

/** Custom Tagged Document Icon (GST / ITR) */
function TaggedDocIcon({ tag, color = "#083B75", size = 26 }: { tag: string; color?: string; size?: number }) {
  return (
    <View style={{ width: size, height: size + 2, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size + 2} viewBox="0 0 24 26" fill="none">
        <Path d="M4 3.5C4 2.4 4.9 1.5 6 1.5H14.5L20 7V22.5C20 23.6 19.1 24.5 18 24.5H6C4.9 24.5 4 23.6 4 22.5V3.5Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M14 1.5V7H19.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M8 7H11" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <Rect x="6.5" y="12" width="11" height="8.5" rx="2" stroke={color} strokeWidth="1.4" />
      </Svg>
      <Text style={{ position: "absolute", bottom: 4.5, fontSize: size > 24 ? 6.5 : 5.5, fontWeight: "900", color, letterSpacing: -0.2 }}>{tag}</Text>
    </View>
  );
}

function LoanRupeeIcon({ color = "#EA580C", size = 26 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2C8.5 2 6.5 4.5 6.5 7C6.5 8.2 7 9.2 7.7 10H5C3.9 10 3 10.9 3 12V14C3 15.1 3.9 16 5 16H8L13 21C13.5 21.5 14.3 21.3 14.6 20.7L15.3 19.3C15.6 18.7 15.3 18 14.7 17.7L12.5 16.6H17C19.2 16.6 21 14.8 21 12.6C21 10.4 19.2 8.6 17 8.6H14.5C14.8 7.8 15 7 15 6C15 3.8 13.7 2 12 2Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8C13.1 8 14 7.1 14 6Z" stroke={color} strokeWidth="1.6" />
    </Svg>
  );
}

function CategoryTabIcon({ id, isActive }: { id: "ALL" | ServiceCategoryId; isActive: boolean }) {
  const color = isActive ? "#FF5722" : "#0A2346";
  switch (id) {
    case "ALL": return <Ionicons name="grid-outline" size={23} color={color} />;
    case "GST": return <TaggedDocIcon tag="GST" color={color} size={22} />;
    case "ITR": return <TaggedDocIcon tag="ITR" color={color} size={22} />;
    case "LOANS": return <LoanRupeeIcon color={color} size={22} />;
    case "BUSINESS": return <Ionicons name="briefcase-outline" size={23} color={color} />;
    case "INSURANCE": return <Ionicons name="shield-checkmark-outline" size={23} color={color} />;
    default: return <Ionicons name="folder-outline" size={23} color={color} />;
  }
}

function ApplicationCardAvatar({ category }: { category: ServiceCategoryId }) {
  const isOrange = category === "BUSINESS" || category === "LOANS";
  const bg = isOrange ? "#FFF1E8" : "#EAF2FF";
  const color = isOrange ? "#EA580C" : "#083B75";

  let icon = <Ionicons name="document-text-outline" size={26} color={color} />;
  if (category === "GST") icon = <TaggedDocIcon tag="GST" color={color} size={26} />;
  else if (category === "ITR") icon = <TaggedDocIcon tag="ITR" color={color} size={26} />;
  else if (category === "BUSINESS") icon = <Ionicons name="briefcase-outline" size={26} color={color} />;
  else if (category === "LOANS") icon = <LoanRupeeIcon color={color} size={26} />;
  else if (category === "INSURANCE") icon = <Ionicons name="shield-checkmark-outline" size={26} color={color} />;

  return <View style={[styles.avatarBox, { backgroundColor: bg }]}>{icon}</View>;
}

function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return "15 Aug 2026";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (months.some((m) => dateStr.includes(m))) return dateStr;
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {}
  return dateStr;
}

function getStatusBadgeStyle(status: string) {
  const lower = status.toLowerCase();
  if (lower.includes("complete") || lower.includes("disbursed") || lower.includes("active")) return { bg: "#E0F2FE", text: "#083B75", label: "Completed" };
  if (lower.includes("verification")) return { bg: "#FFF1E8", text: "#EA580C", label: "Under Verification" };
  if (lower.includes("process") || lower.includes("calculation") || lower.includes("quote")) return { bg: "#E0F2FE", text: "#0284C7", label: "Processing" };
  if (lower.includes("credit")) return { bg: "#FFF1E8", text: "#EA580C", label: "Credit Review" };
  return { bg: "#EAF2FF", text: "#083B75", label: status };
}

export default function ApplicationsScreen() {
  const colors = useTheme();
  const isDark = useColorScheme() === "dark";
  const router = useRouter();
  const insets = useSafeAreaInsets();
  useResponsive();

  const applications = useApplicationStore((state) => state.applications);
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  const [selectedCategory, setSelectedCategory] = useState<"ALL" | ServiceCategoryId>("ALL");
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>("ALL");

  const totalCount = applications.length || 12;
  const inProgressCount = useMemo(() => applications.filter((a) => a.status !== "Completed" && !a.status.toLowerCase().includes("verification")).length || 5, [applications]);
  const completedCount = useMemo(() => applications.filter((a) => a.status === "Completed").length || 5, [applications]);
  const underVerificationCount = useMemo(() => applications.filter((a) => a.status.toLowerCase().includes("verification")).length || 2, [applications]);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesCategory = selectedCategory === "ALL" || app.category === selectedCategory;
      let matchesStatus = true;
      if (statusFilter === "IN_PROGRESS") matchesStatus = app.status !== "Completed" && !app.status.toLowerCase().includes("verification");
      else if (statusFilter === "COMPLETED") matchesStatus = app.status === "Completed";
      else if (statusFilter === "UNDER_VERIFICATION") matchesStatus = app.status.toLowerCase().includes("verification");
      return matchesCategory && matchesStatus;
    });
  }, [applications, selectedCategory, statusFilter]);

  const overviewItems: { key: StatusFilterType; count: number; label: string; color: string; isAll?: boolean }[] = [
    { key: "ALL", count: totalCount, label: "Total\nApplications", color: isDark ? colors.text : "#083B75", isAll: true },
    { key: "IN_PROGRESS", count: inProgressCount, label: "In Progress", color: "#EA580C" },
    { key: "COMPLETED", count: completedCount, label: "Completed", color: isDark ? colors.text : "#083B75" },
    { key: "UNDER_VERIFICATION", count: underVerificationCount, label: "Under\nVerification", color: "#EA580C" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.background : "#F8FAFC" }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0A2346" />

      {/* ---------------- ROYAL NAVY HEADER ---------------- */}
      <View style={[styles.navyHeader, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerTopRow}>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>My Applications</Text>
            <Text style={styles.headerSubtitle}>Track all your service applications</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.push("/notifications")} style={styles.bellButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="notifications" size={24} color="#FF5722" />
            {unreadCount > 0 && <View style={styles.bellDotBadge} />}
          </TouchableOpacity>
        </View>

        {/* Category Tabs */}
        <View style={styles.categoryCardWrapper}>
          <View style={styles.categoryTabsRow}>
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <TouchableOpacity key={tab.id} activeOpacity={0.7} onPress={() => setSelectedCategory(tab.id)} style={styles.categoryTabItem}>
                  <View style={[styles.categoryIconWrap, isActive && styles.activeCategoryIconWrap]}>
                    <CategoryTabIcon id={tab.id} isActive={isActive} />
                  </View>
                  <Text style={[styles.categoryTabLabel, { color: isActive ? "#FF5722" : "#0A2346", fontWeight: isActive ? "700" : "600" }]} numberOfLines={1} adjustsFontSizeToFit>
                    {tab.label}
                  </Text>
                  <View style={isActive ? styles.activeTabIndicator : styles.inactiveTabIndicator} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* ---------------- SCROLLABLE BODY ---------------- */}
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: SCREEN_BOTTOM_PADDING }]} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.text : "#0F172A" }]}>Application Overview</Text>
        </View>

        {/* Overview Metric Boxes */}
        <View style={[styles.overviewCard, { backgroundColor: isDark ? colors.backgroundElement : "#FFFFFF", borderColor: isDark ? colors.border : "#F1F5F9" }]}>
          {overviewItems.map((item, idx) => {
            const isSelected = item.isAll ? statusFilter === "ALL" && selectedCategory === "ALL" : statusFilter === item.key;
            return (
              <React.Fragment key={item.key}>
                {idx > 0 && <View style={[styles.overviewDivider, { backgroundColor: isDark ? colors.border : "#F1F5F9" }]} />}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setStatusFilter(statusFilter === item.key && item.key !== "ALL" ? "ALL" : item.key)}
                  style={[styles.overviewCol, isSelected && styles.activeOverviewCol]}
                >
                  <Text style={[styles.overviewVal, { color: item.color }]}>{item.count}</Text>
                  <Text style={[styles.overviewSub, { color: isDark ? colors.textSecondary : "#64748B" }]}>{item.label}</Text>
                  <View style={isSelected ? styles.activeOverviewIndicator : styles.inactiveOverviewIndicator} />
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </View>

        {/* Recent Applications Header */}
        <View style={styles.recentHeaderRow}>
          <Text style={[styles.sectionTitle, { color: isDark ? colors.text : "#0F172A" }]}>Recent Applications</Text>
        </View>

        {/* Application Cards List */}
        {filteredApplications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={48} color={colors.textSecondary} style={{ marginBottom: 12 }} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No applications match this filter</Text>
          </View>
        ) : (
          filteredApplications.map((item: Application) => {
            const badge = getStatusBadgeStyle(item.status);
            const idColor = item.category === "BUSINESS" || item.category === "LOANS" ? "#EA580C" : "#083B75";
            const formattedDate = formatDisplayDate(item.createdAt);

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                onPress={() => {
                  useApplicationStore.getState().setSelectedApplicationId(item.id);
                  router.push(`/application/${item.id}`);
                }}
                style={[styles.appCard, { backgroundColor: isDark ? colors.backgroundElement : "#FFFFFF", borderColor: isDark ? colors.border : "#F1F5F9" }]}
              >
                <ApplicationCardAvatar category={item.category} />
                <View style={styles.cardContent}>
                  <View style={styles.cardTopRow}>
                    <Text style={[styles.appIdText, { color: idColor }]}>{item.id}</Text>
                    <View style={styles.cardBadgeWithArrow}>
                      <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                        <Text style={[styles.statusBadgeText, { color: badge.text }]}>{badge.label}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={17} color="#EA580C" style={styles.cardChevron} />
                    </View>
                  </View>
                  <Text style={[styles.serviceNameText, { color: isDark ? colors.text : "#0F172A" }]} numberOfLines={1}>{item.serviceName}</Text>
                  <View style={styles.cardBottomRow}>
                    <View style={styles.dateWrap}>
                      <Ionicons name="calendar-outline" size={13.5} color="#64748B" />
                      <Text style={styles.dateText}>{formattedDate}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  navyHeader: { backgroundColor: "#0A2346", paddingHorizontal: 16, paddingBottom: 0, zIndex: 10 },
  headerTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, paddingHorizontal: 4 },
  headerTitleWrap: { flex: 1, paddingRight: 12 },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#FFFFFF", letterSpacing: -0.4 },
  headerSubtitle: { fontSize: 13.5, fontWeight: "400", color: "rgba(255, 255, 255, 0.75)", marginTop: 4 },
  bellButton: { width: 38, height: 38, justifyContent: "center", alignItems: "center", position: "relative" },
  bellDotBadge: { position: "absolute", top: 5, right: 5, width: 8, height: 8, borderRadius: 4, backgroundColor: "#FF5722", borderWidth: 1.5, borderColor: "#0A2346" },
  categoryCardWrapper: { backgroundColor: "#FFFFFF", borderRadius: 18, paddingVertical: 10, paddingHorizontal: 8, marginBottom: -36, zIndex: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 10, elevation: 6 },
  categoryTabsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" },
  categoryTabItem: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 2 },
  categoryIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 2 },
  activeCategoryIconWrap: { backgroundColor: "#FFF2EA" },
  categoryTabLabel: { fontSize: 11, textAlign: "center", letterSpacing: -0.2 },
  activeTabIndicator: { height: 2.5, width: 22, backgroundColor: "#FF5722", borderRadius: 2, marginTop: 4 },
  inactiveTabIndicator: { height: 2.5, width: 22, backgroundColor: "transparent", marginTop: 4 },
  scrollContent: { paddingTop: 52, paddingHorizontal: 16 },
  sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "700", letterSpacing: -0.2 },
  overviewCard: { flexDirection: "row", borderRadius: 16, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 4, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  overviewCol: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 4, borderRadius: 10 },
  activeOverviewCol: { backgroundColor: "#FFF7ED" },
  activeOverviewIndicator: { height: 2, width: 18, backgroundColor: "#FF5722", borderRadius: 1, marginTop: 3 },
  inactiveOverviewIndicator: { height: 2, width: 18, backgroundColor: "transparent", marginTop: 3 },
  overviewVal: { fontSize: 18, fontWeight: "800", marginTop: 2, marginBottom: 2, letterSpacing: -0.3 },
  overviewSub: { fontSize: 11, textAlign: "center", marginTop: 2, lineHeight: 14, fontWeight: "500" },
  overviewDivider: { width: 1, height: 30, alignSelf: "center" },
  recentHeaderRow: { marginBottom: 12 },
  appCard: { flexDirection: "row", borderRadius: 18, borderWidth: 1, padding: 14, marginBottom: 12, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 2 },
  avatarBox: { width: 52, height: 52, borderRadius: 16, alignItems: "center", justifyContent: "center", marginRight: 12 },
  cardContent: { flex: 1 },
  cardTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  appIdText: { fontSize: 13, fontWeight: "700" },
  cardBadgeWithArrow: { flexDirection: "row", alignItems: "center", gap: 6 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4.5, borderRadius: 14 },
  statusBadgeText: { fontSize: 11.5, fontWeight: "600" },
  cardChevron: { marginLeft: 2 },
  serviceNameText: { fontSize: 15.5, fontWeight: "700", marginTop: 2, marginBottom: 4, letterSpacing: -0.2 },
  cardBottomRow: { flexDirection: "row", alignItems: "center" },
  dateWrap: { flexDirection: "row", alignItems: "center", gap: 4 },
  dateText: { fontSize: 12.5, color: "#64748B", fontWeight: "500" },
  emptyContainer: { alignItems: "center", justifyContent: "center", paddingVertical: 48, paddingHorizontal: 20 },
  emptyText: { fontSize: 15, fontWeight: "600", textAlign: "center" },
});
