import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTheme } from "../../hooks/use-theme";
import { SERVICES, CATEGORIES } from "../../data/services";
import { ScreenLayout, SCREEN_BOTTOM_PADDING } from "../../components/ScreenLayout";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ServicesScreen() {
  const colors = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ selectedCategory?: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // Handle deep-link redirection from home dashboard carousel
  useEffect(() => {
    if (params.selectedCategory) {
      setActiveCategory(params.selectedCategory);
    }
  }, [params.selectedCategory]);

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory =
      activeCategory === "ALL" || service.category === activeCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ScreenLayout title="TaxEdge Services">

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search services (e.g. GST, Loan, OPC...)"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: colors.text }]}
          />

          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={18}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Category Pills Horizontal Scroll */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsScroll}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveCategory("ALL")}
            style={[
              styles.pillBtn,
              {
                backgroundColor:
                  activeCategory === "ALL"
                    ? colors.primary
                    : colors.backgroundElement,
                borderColor:
                  activeCategory === "ALL" ? colors.primary : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.pillText,
                { color: activeCategory === "ALL" ? "#FFFFFF" : colors.text },
              ]}
            >
              All Services
            </Text>
          </TouchableOpacity>

          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.8}
              onPress={() => setActiveCategory(cat.id)}
              style={[
                styles.pillBtn,
                {
                  backgroundColor:
                    activeCategory === cat.id
                      ? colors.primary
                      : colors.backgroundElement,
                  borderColor:
                    activeCategory === cat.id ? colors.primary : colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  {
                    color: activeCategory === cat.id ? "#FFFFFF" : colors.text,
                  },
                ]}
              >
                {cat.name.split(" ")[0]}{" "}
                {/* display first word like GST, ITR, Loans */}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Services List */}
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: SCREEN_BOTTOM_PADDING }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={48}
              color={colors.textSecondary}
              style={{ marginBottom: 12 }}
            />
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No services found
            </Text>
            <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
              Try search queries like GST, ITR or Company
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push(`/service/${item.id}`)}
            style={[
              styles.serviceCard,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <View
                style={[styles.iconBg, { backgroundColor: colors.orangeLight }]}
              >
                <Ionicons name={item.icon} size={24} color={colors.orange} />
              </View>
              <View style={styles.headerInfo}>
                <Text style={[styles.serviceName, { color: colors.text }]}>
                  {item.name}
                </Text>
                <View
                  style={[
                    styles.catBadge,
                    { backgroundColor: colors.background },
                  ]}
                >
                  <Text
                    style={[styles.catBadgeText, { color: colors.primary }]}
                  >
                    {item.category}
                  </Text>
                </View>
              </View>
            </View>

            <Text
              style={[styles.serviceDesc, { color: colors.textSecondary }]}
              numberOfLines={2}
            >
              {item.description}
            </Text>

            <View style={styles.cardFooter}>
              <View style={styles.docsCountContainer}>
                <Ionicons
                  name="document-text-outline"
                  size={16}
                  color={colors.textSecondary}
                />
                <Text
                  style={[
                    styles.docsCountText,
                    { color: colors.textSecondary },
                  ]}
                >
                  {item.requiredDocs.length} Documents Required
                </Text>
              </View>

              <View style={styles.actionBtn}>
                <Text style={[styles.actionBtnText, { color: colors.primary }]}>
                  Apply
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={colors.primary}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchBar: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  categoriesContainer: {
    marginBottom: 8,
  },
  pillsScroll: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  pillBtn: {
    paddingHorizontal: 16,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  pillText: {
    fontSize: 13,
    fontWeight: "700",
  },
  listContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  serviceCard: {
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "700",
  },
  catBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  catBadgeText: {
    fontSize: 10,
    fontWeight: "800",
  },
  serviceDesc: {
    fontSize: 13,
    marginTop: 12,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#00000005",
  },
  docsCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  docsCountText: {
    fontSize: 12,
    fontWeight: "500",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: "700",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
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
