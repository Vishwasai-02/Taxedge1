/**
 * Screen: Applications
 * Migrated from internal StyleSheet to external styles module.
 * Uses shared design tokens from src/shared/theme.ts.
 */

import { StyleSheet, Platform } from "react-native";
import {
  BorderRadius,
  BorderWidth,
  Spacing,
  Typography,
} from "../../shared/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    height: 48,
    borderBottomWidth: BorderWidth.regular,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabLabel: {
    fontSize: Typography.fontSize.base,
  },
  listContent: {
    padding: Spacing.base,
    gap: 14,
    paddingBottom: Spacing.xxl,
  },
  appCard: {
    borderRadius: BorderRadius.base - 2,
    borderWidth: BorderWidth.regular,
    padding: Spacing.base,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
      default: {},
    }),
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  appName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  appId: {
    fontSize: Typography.fontSize.sm,
    marginTop: 2,
    fontWeight: Typography.fontWeight.medium,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.base,
    gap: Spacing.md,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: "#00000008",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    width: 32,
    textAlign: "right",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#00000005",
    marginVertical: 14,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerDetailText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  paymentBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFEBEE",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 6,
  },
  paymentBadgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  trackText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  emptySub: {
    fontSize: Typography.fontSize.sm + 1,
    marginTop: 6,
  },
});
