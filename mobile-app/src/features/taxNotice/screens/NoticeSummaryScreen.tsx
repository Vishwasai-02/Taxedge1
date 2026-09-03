import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TaxNoticeHeader } from "../components/common/TaxNoticeHeader";
import { NoticeMetadataCard } from "../components/summary/NoticeMetadataCard";
import { NoticeExplanationCard } from "../components/summary/NoticeExplanationCard";
import { MOCK_NOTICE_SUMMARY } from "../mock/taxNoticeData";

export const NoticeSummaryScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    noticeNumber?: string;
    noticeDate?: string;
    assessmentYear?: string;
  }>();

  const handleContinue = () => {
    // Navigate to Screen 3: Upload Supporting Documents
    router.push({
      pathname: "/service/tax-notice-documents" as any,
      params: {
        noticeNumber: params.noticeNumber,
        assessmentYear: params.assessmentYear || "AY 2025–26",
      },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Screen Header */}
      <TaxNoticeHeader subtitle="Notice Summary" />

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Here’s what this notice means</Text>
          <Text style={styles.pageSubtitle}>
            A plain-language explanation from your Tax Executive — no jargon.
          </Text>
        </View>

        {/* Notice Metadata Card */}
        <NoticeMetadataCard summary={MOCK_NOTICE_SUMMARY} />

        {/* Explanation Card 1: What this notice means */}
        <NoticeExplanationCard
          iconName="document-text-outline"
          title="What this notice means"
          description={MOCK_NOTICE_SUMMARY.whatItMeans}
        />

        {/* Explanation Card 2: What action is required */}
        <NoticeExplanationCard
          iconName="checkmark-circle-outline"
          title="What action is required"
          description={MOCK_NOTICE_SUMMARY.actionRequired}
        />
      </ScrollView>

      {/* Sticky Bottom Action Button */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleContinue}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  titleSection: {
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0B1F3A",
    letterSpacing: -0.2,
  },
  pageSubtitle: {
    fontSize: 12.5,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 18,
    fontWeight: "400",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    ...Platform.select({
      ios: {
        shadowColor: "#0B1F3A",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  continueButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#F97316",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      default: {},
    }),
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});

export default NoticeSummaryScreen;
