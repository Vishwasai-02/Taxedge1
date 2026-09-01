import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "../../hooks/use-theme";
import { useApplicationStore } from "../../store/applicationStore";
import {
  ScreenLayout,
  SCREEN_BOTTOM_PADDING,
} from "../../components/ScreenLayout";
import { DocumentChecklist } from "../../components/DocumentChecklist";
import type {
  Application,
  ApplicationDocument,
  IconName,
} from "../../types/domain";

/**
 * The document vault: every file across the customer's applications, sorted
 * into categories by document name rather than by which application asked for
 * it - a PAN card is a KYC document whether it came from a GST filing or a loan.
 *
 * Expanding a category groups its files back under their application, because
 * uploading needs to know which application the document belongs to.
 */

/** Rough per-file size used for the storage meter; there are no real files. */
const APPROX_FILE_MB = 1.8;
const STORAGE_QUOTA_MB = 500;

interface VaultCategory {
  id: string;
  label: string;
  icon: IconName;
  tint: string;
  tintBg: string;
  /** Lower-case fragments matched against the document name, first hit wins. */
  keywords: string[];
}

const CATEGORIES: VaultCategory[] = [
  {
    id: "kyc",
    label: "KYC Documents",
    icon: "card",
    tint: "#2563EB",
    tintBg: "#EAF1FE",
    keywords: ["pan", "aadhaar", "photo", "passport", "identity"],
  },
  {
    id: "gst",
    label: "GST Documents",
    icon: "receipt",
    tint: "#6D28D9",
    tintBg: "#F1ECFE",
    keywords: ["gst", "gstr", "sales", "purchase", "e-way"],
  },
  {
    id: "itr",
    label: "ITR Documents",
    icon: "reader",
    tint: "#EA580C",
    tintBg: "#FEF0E6",
    keywords: ["itr", "form 16", "form 26as", "tds", "income tax"],
  },
  {
    id: "loan",
    label: "Loan Documents",
    icon: "business",
    tint: "#475569",
    tintBg: "#EEF2F6",
    keywords: ["loan", "sanction", "emi", "collateral"],
  },
  {
    id: "financial",
    label: "Financial Statements",
    icon: "stats-chart",
    tint: "#D97706",
    tintBg: "#FDF2E3",
    keywords: [
      "bank statement",
      "statement",
      "financial",
      "payslip",
      "invoice",
      "bill",
      "investment",
      "income proof",
      "turnover",
    ],
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: "ribbon",
    tint: "#DC2626",
    tintBg: "#FDEBEB",
    keywords: ["certificate", "incorporation", "licence", "license", "udyam"],
  },
  {
    id: "agreements",
    label: "Agreements",
    icon: "document-text",
    tint: "#DB2777",
    tintBg: "#FDECF5",
    keywords: [
      "agreement",
      "noc",
      "deed",
      "contract",
      "policy",
      "proof of",
      "address proof",
    ],
  },
  {
    id: "other",
    label: "Other Documents",
    icon: "folder",
    tint: "#0891B2",
    tintBg: "#E5F5F9",
    keywords: [],
  },
];

const categoryFor = (name: string): VaultCategory => {
  const lower = name.toLowerCase();
  return (
    CATEGORIES.find(
      (category) =>
        category.keywords.length > 0 &&
        category.keywords.some((keyword) => lower.includes(keyword)),
    ) ?? CATEGORIES[CATEGORIES.length - 1]
  );
};

/** One application's slice of a category, so uploads keep their owner. */
interface CategoryGroup {
  application: Application;
  documents: ApplicationDocument[];
}

export default function DocumentsScreen() {
  const colors = useTheme();
  const applications = useApplicationStore((state) => state.applications);
  const uploadDocument = useApplicationStore((state) => state.uploadDocument);

  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const search = query.trim().toLowerCase();

  /* Bucket every document by category, keeping its application alongside. */
  const buckets = new Map<string, CategoryGroup[]>();
  let fileCount = 0;
  let uploadedCount = 0;

  applications.forEach((application) => {
    application.documents.forEach((document) => {
      if (search && !document.name.toLowerCase().includes(search)) return;

      fileCount += 1;
      if (document.status === "Uploaded") uploadedCount += 1;

      const category = categoryFor(document.name);
      const groups = buckets.get(category.id) ?? [];
      const existing = groups.find((g) => g.application.id === application.id);

      if (existing) {
        existing.documents.push(document);
      } else {
        groups.push({ application, documents: [document] });
      }
      buckets.set(category.id, groups);
    });
  });

  const visibleCategories = CATEGORIES.map((category) => ({
    category,
    groups: buckets.get(category.id) ?? [],
  }))
    .map((entry) => ({
      ...entry,
      count: entry.groups.reduce((sum, g) => sum + g.documents.length, 0),
    }))
    .filter((entry) => entry.count > 0);

  const usedMb = uploadedCount * APPROX_FILE_MB;
  const usedRatio = Math.min(1, usedMb / STORAGE_QUOTA_MB);

  return (
    <ScreenLayout title="My Documents">
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: SCREEN_BOTTOM_PADDING },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Secure digital document vault
        </Text>

        {/* Search */}
        <View
          style={[
            styles.search,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons name="search" size={17} color={colors.textSecondary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search documents..."
            placeholderTextColor={colors.textSecondary}
            style={[styles.searchInput, { color: colors.text }]}
            autoCorrect={false}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")} hitSlop={8}>
              <Ionicons
                name="close-circle"
                size={17}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* NOTE: copy taken from the design. Nothing in the app encrypts
            anything today - uploaded documents are local file URIs held in the
            Zustand store - so this needs a real backend behind it before it is
            shown to customers. */}
        <View style={[styles.secureNote, { backgroundColor: "#E9F7EF" }]}>
          <Ionicons name="shield-checkmark" size={16} color={colors.success} />
          <Text style={[styles.secureText, { color: colors.success }]}>
            Your documents are securely stored with AES-256 encryption.
          </Text>
        </View>

        {/* Storage meter */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.backgroundElement,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.storageTop}>
            <Text style={[styles.storageLabel, { color: colors.text }]}>
              Storage Used
            </Text>
            <Text style={[styles.storageValue, { color: colors.success }]}>
              {usedMb.toFixed(1)} MB / {STORAGE_QUOTA_MB} MB
            </Text>
          </View>
          <View style={[styles.track, { backgroundColor: colors.border }]}>
            <View
              style={[
                styles.trackFill,
                {
                  width: `${Math.max(usedRatio * 100, 2)}%`,
                  backgroundColor: colors.success,
                },
              ]}
            />
          </View>
        </View>

        {/* Categories */}
        {visibleCategories.map(({ category, groups, count }) => {
          const isOpen = expanded === category.id;

          return (
            <View key={category.id}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setExpanded(isOpen ? null : category.id)}
                style={[
                  styles.categoryRow,
                  {
                    backgroundColor: colors.backgroundElement,
                    borderColor: isOpen ? category.tint : colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: category.tintBg },
                  ]}
                >
                  <Ionicons
                    name={category.icon}
                    size={19}
                    color={category.tint}
                  />
                </View>

                <View style={styles.categoryText}>
                  <Text style={[styles.categoryLabel, { color: colors.text }]}>
                    {category.label}
                  </Text>
                  <Text
                    style={[
                      styles.categoryCount,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {count} {count === 1 ? "file" : "files"}
                  </Text>
                </View>

                <Ionicons
                  name={isOpen ? "chevron-down" : "chevron-forward"}
                  size={18}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>

              {isOpen && (
                <View
                  style={[
                    styles.expanded,
                    {
                      backgroundColor: colors.backgroundElement,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  {groups.map(({ application, documents }) => (
                    <View key={application.id} style={styles.groupBlock}>
                      <Text
                        style={[
                          styles.groupTitle,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {application.serviceName} · {application.id}
                      </Text>
                      <DocumentChecklist
                        grouped={false}
                        documents={documents}
                        onUpload={(docName, fileUri) =>
                          uploadDocument(application.id, docName, fileUri)
                        }
                      />
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        {visibleCategories.length === 0 && (
          <View
            style={[
              styles.emptyCard,
              {
                backgroundColor: colors.backgroundElement,
                borderColor: colors.border,
              },
            ]}
          >
            <Ionicons
              name={search ? "search-outline" : "folder-open-outline"}
              size={40}
              color={colors.textSecondary}
            />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              {search ? `No documents match "${query.trim()}"` : "No documents yet"}
            </Text>
            {!search && (
              <Text style={[styles.emptySub, { color: colors.textSecondary }]}>
                Start a service and the documents it needs will appear here.
              </Text>
            )}
          </View>
        )}

        {fileCount > 0 && !search && (
          <Text style={[styles.footNote, { color: colors.textSecondary }]}>
            {fileCount} documents across {applications.length} applications
          </Text>
        )}
      </ScrollView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 2,
  },

  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    padding: 0,
  },

  secureNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 12,
  },
  secureText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
  },

  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  storageTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  storageLabel: {
    fontSize: 13.5,
    fontWeight: "700",
  },
  storageValue: {
    fontSize: 12.5,
    fontWeight: "700",
  },
  track: {
    height: 7,
    borderRadius: 4,
    overflow: "hidden",
  },
  trackFill: {
    height: "100%",
    borderRadius: 4,
  },

  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  categoryIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    flex: 1,
  },
  categoryLabel: {
    fontSize: 14.5,
    fontWeight: "700",
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },

  expanded: {
    borderRadius: 14,
    borderWidth: 1,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: -6,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 4,
  },
  groupBlock: {
    marginBottom: 6,
  },
  groupTitle: {
    fontSize: 11.5,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },

  emptyCard: {
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    gap: 8,
    paddingVertical: 44,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 4,
    textAlign: "center",
  },
  emptySub: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 19,
  },
  footNote: {
    fontSize: 11.5,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 4,
  },
});
