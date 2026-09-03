import { TdsBenefitItem, TdsProcessStep, TdsDocumentItem } from "../types/tds.types";

export const TDS_BENEFITS: TdsBenefitItem[] = [
  {
    id: "maximization",
    title: "Refund Maximization",
    description: "We identify all eligible refunds before filing.",
    iconName: "wallet-outline",
  },
  {
    id: "expert_filing",
    title: "Expert Filing",
    description: "Prepared and reviewed by experienced Tax Executives.",
    iconName: "ribbon-outline",
  },
  {
    id: "quick_processing",
    title: "Quick Processing",
    description: "Fast document verification and filing process.",
    iconName: "time-outline",
  },
  {
    id: "live_tracking",
    title: "Live Tracking",
    description: "Track your refund request from submission until refund credit.",
    iconName: "analytics-outline",
  },
];

export const TDS_PROCESS_STEPS: TdsProcessStep[] = [
  {
    id: 1,
    label: "Submit Details",
    iconName: "create-outline",
  },
  {
    id: 2,
    label: "Upload Documents",
    iconName: "cloud-upload-outline",
  },
  {
    id: 3,
    label: "Executive Verification",
    iconName: "person-outline",
  },
  {
    id: 4,
    label: "Refund Filing",
    iconName: "send-outline",
  },
  {
    id: 5,
    label: "Refund Credited",
    iconName: "business-outline",
  },
];

export const TDS_REQUIRED_DOCUMENTS: TdsDocumentItem[] = [
  {
    id: "pan",
    title: "PAN Card",
    iconType: "card",
  },
  {
    id: "aadhaar",
    title: "Aadhaar Card",
    iconType: "aadhaar",
  },
  {
    id: "form16",
    title: "Form 16 /\nForm 16A",
    iconType: "form16",
  },
  {
    id: "ais",
    title: "AIS\nStatement",
    iconType: "chart",
  },
  {
    id: "tis",
    title: "TIS\nStatement",
    iconType: "document",
  },
  {
    id: "bank",
    title: "Bank\nStatement",
    iconType: "bank",
  },
  {
    id: "salary",
    title: "Salary Slip\n(if applicable)",
    iconType: "salary",
  },
  {
    id: "more",
    title: "More",
    iconType: "more",
    isMore: true,
  },
];
