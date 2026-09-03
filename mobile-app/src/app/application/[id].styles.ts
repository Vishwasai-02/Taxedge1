/**
 * Screen: Application Detail
 * Migrated from internal StyleSheet to external styles module.
 * Uses shared design tokens from src/shared/theme.ts.
 */

import { StyleSheet, Platform } from "react-native";
import {
  BrandColors,
  BorderRadius,
  BorderWidth,
  Spacing,
  Typography,
} from "../../shared/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.base,
    gap: Spacing.base,
    paddingBottom: Spacing.xxl,
  },
  card: {
    borderRadius: BorderRadius.base,
    borderWidth: BorderWidth.regular,
    padding: Spacing.lg,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appIdText: {
    fontSize: Typography.fontSize.xs - 1,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  appIdVal: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  divider: {
    height: 1,
    backgroundColor: "#00000005",
    marginVertical: Spacing.base,
  },
  repRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  repInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  repLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  repName: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    marginTop: 2,
  },
  chatBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: Spacing.base,
    paddingVertical: 10,
    borderRadius: BorderRadius.sm + 2,
  },
  chatBtnText: {
    color: BrandColors.WHITE,
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.sm + 1,
  },
  paymentCard: {
    borderRadius: BorderRadius.base,
    borderWidth: BorderWidth.regular,
    padding: Spacing.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  paymentDueTitle: {
    fontSize: Typography.fontSize.sm + 1,
    fontWeight: Typography.fontWeight.semiBold,
  },
  paymentDueAmt: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.extraBold,
    marginTop: 2,
  },
  payNowBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: BorderRadius.sm + 2,
  },
  payNowText: {
    color: BrandColors.WHITE,
    fontWeight: Typography.fontWeight.bold,
    fontSize: Typography.fontSize.sm + 1,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.md,
  },
  checklistHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  checklistProgressText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  formSummaryList: {
    gap: Spacing.md,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "#00000003",
  },
  summaryKey: {
    fontSize: Typography.fontSize.sm + 1,
    fontWeight: Typography.fontWeight.medium,
  },
  summaryVal: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
  },
  errorContainer: {
    flex: 1,
  },
  errorContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  errorText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
    marginTop: Spacing.md,
  },
});
