import { TdsRefundStatusDetails, NextStepTimelineItem } from "../types/status.types";

export const DEFAULT_TDS_STATUS_DETAILS: TdsRefundStatusDetails = {
  applicationId: "TDS-2026-00043",
  filedOn: "02 Sep 2026",
  estimatedRefund: "₹23,400",
  refundToBank: "HDFC ••••1826",
  expectedProcessingTime: "20–45 Days",
};

export const TDS_NEXT_STEPS: NextStepTimelineItem[] = [
  {
    id: 1,
    title: "Document Verification",
    status: "Completed",
  },
  {
    id: 2,
    title: "Refund Filing",
    status: "Upcoming",
    description: "Your TDS refund return will be filed with the Income Tax Department.",
  },
  {
    id: 3,
    title: "Income Tax Processing",
    status: "Upcoming",
    description: "The Income Tax Department processes your refund.",
  },
  {
    id: 4,
    title: "Refund Credited",
    status: "Upcoming",
    description: "The refund amount will be transferred directly to your registered bank account.",
  },
];
