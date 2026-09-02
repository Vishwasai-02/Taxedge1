import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { VaultIllustration } from "./VaultIllustration";
import type { CategoryInfo, DocumentItem } from "../types/documentTypes";

interface MainVaultViewProps {
  categories: (CategoryInfo & { icon: any; tint: string; tintBg: string; fileCount: number })[];
  onSelectCategory: (categoryId: string) => void;
}

export const MainVaultView: React.FC<MainVaultViewProps> = ({
  categories,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState("");

  const filteredCategories = categories.filter((c) =>
    query.trim() === ""
      ? true
      : c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* 1. Header with Vault Illustration */}
      <View style={styles.headerRow}>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>My Documents</Text>
          <Text style={styles.headerSub}>Secure digital document vault</Text>
        </View>
        <VaultIllustration size={54} />
      </View>

      {/* 2. Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color="#083B75" style={{ marginRight: 8 }} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search documents..."
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")} hitSlop={8} style={{ padding: 4 }}>
            <Ionicons name="close-circle" size={17} color="#94A3B8" />
          </TouchableOpacity>
        )}
        <View style={styles.searchDivider} />
        <TouchableOpacity style={{ padding: 4 }}>
          <Ionicons name="options-outline" size={19} color="#083B75" />
        </TouchableOpacity>
      </View>

      {/* 3. Security AES-256 Card */}
      <View style={styles.securityCard}>
        <View style={styles.securityIconBox}>
          <Ionicons name="shield-checkmark" size={17} color="#EA580C" />
        </View>
        <Text style={styles.securityText}>
          Your documents are securely stored with <Text style={styles.boldOrange}>AES-256</Text> encryption.
        </Text>
      </View>

      {/* 4. Storage Used Card */}
      <View style={styles.storageCard}>
        <View style={styles.rowBetween}>
          <View style={styles.rowAlign}>
            <Ionicons name="pie-chart-outline" size={16} color="#083B75" />
            <Text style={styles.storageTitle}>Storage Used</Text>
          </View>
          <Text style={styles.storageNumbers}>
            <Text style={styles.boldNavy}>23.4 MB</Text>
            <Text style={styles.subText}> / 500 MB</Text>
          </Text>
        </View>
        <View style={styles.track}>
          <View style={styles.trackFill} />
        </View>
        <View style={styles.rowBetween}>
          <View style={styles.rowAlign}>
            <View style={styles.orangeDot} />
            <Text style={styles.usedStat}>4.68% used</Text>
          </View>
          <View style={styles.rowAlign}>
            <Ionicons name="server-outline" size={13} color="#64748B" />
            <Text style={styles.availStat}>476.6 MB available</Text>
          </View>
        </View>
      </View>

      {/* 5. Document Categories Section Heading */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionHeading}>Document Categories</Text>
        <View style={styles.categoriesCountBadge}>
          <Text style={styles.categoriesCountText}>11 Categories</Text>
        </View>
      </View>

      {/* 6. Category Cards (Clicking any category transitions to 2nd Image view) */}
      <View style={styles.cardsList}>
        {filteredCategories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.72}
            onPress={() => onSelectCategory(cat.id)}
            style={styles.categoryCard}
          >
            <View
              style={[
                styles.catIconWrap,
                {
                  backgroundColor: cat.tintBg,
                  borderColor:
                    cat.tint === "#083B75"
                      ? "rgba(8, 59, 117, 0.12)"
                      : "rgba(234, 88, 12, 0.18)",
                },
              ]}
            >
              <Ionicons name={cat.icon as any} size={22} color={cat.tint} />
            </View>

            <View style={styles.catInfo}>
              <Text style={styles.catTitle} numberOfLines={1}>{cat.name}</Text>
              <Text style={styles.catSub}>{cat.fileCount} files</Text>
            </View>

            <View style={styles.chevronWrap}>
              <Ionicons name="chevron-forward" size={17} color="#F97316" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 14,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 2,
  },
  headerTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#083B75",
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 13.5,
    fontWeight: "500",
    color: "#64748B",
    marginTop: 2,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1.2,
    borderColor: "#E2E8F0",
    height: 48,
    paddingHorizontal: 14,
    shadowColor: "#083B75",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: "500",
    color: "#083B75",
    paddingVertical: 0,
  },
  searchDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 8,
  },
  securityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F6FF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(8,59,117,0.1)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 10,
  },
  securityIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#FFF1E6",
    alignItems: "center",
    justifyContent: "center",
  },
  securityText: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: "500",
    color: "#083B75",
    lineHeight: 18,
  },
  boldOrange: {
    fontWeight: "700",
    color: "#EA580C",
  },
  storageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: "#E2E8F0",
    padding: 16,
    shadowColor: "#083B75",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    gap: 10,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowAlign: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  storageTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: "#083B75",
  },
  storageNumbers: {
    fontSize: 13.5,
  },
  boldNavy: {
    fontWeight: "700",
    color: "#083B75",
  },
  subText: {
    fontWeight: "600",
    color: "#64748B",
  },
  track: {
    height: 8,
    backgroundColor: "#EDF2F7",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 2,
  },
  trackFill: {
    width: "4.68%",
    minWidth: 18,
    height: "100%",
    backgroundColor: "#F97316",
    borderRadius: 4,
  },
  orangeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#F97316",
  },
  usedStat: {
    fontSize: 12,
    fontWeight: "600",
    color: "#EA580C",
  },
  availStat: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#083B75",
    letterSpacing: -0.3,
  },
  categoriesCountBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  categoriesCountText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#1D4ED8",
  },
  cardsList: {
    gap: 12,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: "#E2E8F0",
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "#083B75",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  catIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  catInfo: {
    flex: 1,
  },
  catTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#083B75",
    letterSpacing: -0.2,
    marginBottom: 3,
  },
  catSub: {
    fontSize: 12.5,
    fontWeight: "500",
    color: "#64748B",
  },
  chevronWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFF1E6",
    alignItems: "center",
    justifyContent: "center",
  },
});
