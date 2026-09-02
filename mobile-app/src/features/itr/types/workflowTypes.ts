export type ServiceWorkflowId =
  | "itr-filing"
  | "tds-refund"
  | "previous-year-itr"
  | "revised-itr"
  | "tax-notice-assistance";

export interface PersonalDetailsData {
  panNumber: string;
  aadhaarNumber: string;
  assessmentYear: string;
}

export interface IncomeDetailsData {
  grossSalary: string;
  businessIncome: string;
  rentalIncome: string;
  stcg: string;
  ltcg: string;
  otherIncome: string;
}

export interface DeductionsData {
  sec80c: string;
  sec80d: string;
  homeLoan24b: string;
  educationLoan80e: string;
  otherDeductions: string;
}

export type DocumentWorkflowStatus =
  | "Not Uploaded"
  | "Pending"
  | "Uploaded"
  | "Under Review"
  | "Verified"
  | "Rejected";

export interface WorkflowDocumentItem {
  id: string;
  name: string;
  status: DocumentWorkflowStatus;
  iconType:
    | "pan"
    | "aadhaar"
    | "form16"
    | "form16a"
    | "aistis"
    | "bank"
    | "previous-itr"
    | "investment"
    | "homeloan"
    | "capital-gains";
  fileName?: string;
  fileSize?: string;
  fileUri?: string;
  uploadedAt?: string;
}

export const WORKFLOW_STANDARD_DOCUMENTS: WorkflowDocumentItem[] = [
  {
    id: "pan",
    name: "PAN Card",
    status: "Not Uploaded",
    iconType: "pan",
  },
  {
    id: "aadhaar",
    name: "Aadhaar Card",
    status: "Not Uploaded",
    iconType: "aadhaar",
  },
  {
    id: "form16",
    name: "Form 16 (from Employer)",
    status: "Not Uploaded",
    iconType: "form16",
  },
  {
    id: "form16a",
    name: "Form 16A (TDS Certificate)",
    status: "Not Uploaded",
    iconType: "form16a",
  },
  {
    id: "aistis",
    name: "AIS / TIS (from IT Portal)",
    status: "Not Uploaded",
    iconType: "aistis",
  },
  {
    id: "bank",
    name: "Bank Statements (All Accounts)",
    status: "Not Uploaded",
    iconType: "bank",
  },
  {
    id: "previous-itr",
    name: "Previous Year's ITR",
    status: "Not Uploaded",
    iconType: "previous-itr",
  },
  {
    id: "investment",
    name: "Investment Proofs (80C)",
    status: "Not Uploaded",
    iconType: "investment",
  },
  {
    id: "homeloan",
    name: "Home Loan Interest Certificate",
    status: "Not Uploaded",
    iconType: "homeloan",
  },
  {
    id: "capital-gains",
    name: "Capital Gains Statement",
    status: "Not Uploaded",
    iconType: "capital-gains",
  },
];

export interface TimelineProgressStep {
  id: string;
  title: string;
  subtitle: string;
  status: "completed" | "current" | "pending";
  timestamp?: string;
}

export const WORKFLOW_TIMELINE_STEPS: TimelineProgressStep[] = [
  {
    id: "1",
    title: "New Request Received",
    subtitle: "Request registered successfully",
    status: "completed",
    timestamp: "10 Aug 2026, 2:15 PM",
  },
  {
    id: "2",
    title: "Documents Pending",
    subtitle: "Checklist shared with customer",
    status: "completed",
  },
  {
    id: "3",
    title: "Documents Received",
    subtitle: "All documents uploaded",
    status: "completed",
  },
  {
    id: "4",
    title: "Under Verification",
    subtitle: "Documents being verified by CA",
    status: "current",
  },
  {
    id: "5",
    title: "ITR Preparation",
    subtitle: "Return computation by CA",
    status: "pending",
  },
  {
    id: "6",
    title: "Tax Calculation",
    subtitle: "Final tax liability determined",
    status: "pending",
  },
  {
    id: "7",
    title: "Customer Approval",
    subtitle: "Review and approve the return",
    status: "pending",
  },
  {
    id: "8",
    title: "ITR Filed",
    subtitle: "Submitted on IT Department portal",
    status: "pending",
  },
  {
    id: "9",
    title: "E-Verification Pending",
    subtitle: "Verify using Aadhaar OTP / DSC",
    status: "pending",
  },
  {
    id: "10",
    title: "E-Verified",
    subtitle: "ITR acknowledgement generated",
    status: "pending",
  },
  {
    id: "11",
    title: "Processing by IT Dept.",
    subtitle: "Income tax department processing",
    status: "pending",
  },
  {
    id: "12",
    title: "Refund / Tax Payable",
    subtitle: "Final status communicated",
    status: "pending",
  },
];
