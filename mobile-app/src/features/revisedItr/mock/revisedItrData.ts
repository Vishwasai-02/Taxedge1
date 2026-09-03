import {
  OriginalReturnDetails,
  RevisionReasonOption,
  RevisedFormFields,
  RevisedDocumentItem,
  ComputationComparisonRow,
} from "../types/revisedItr.types";

export const MOCK_ORIGINAL_RETURN: OriginalReturnDetails = {
  acknowledgementNumber: "284419250714208",
  assessmentYear: "AY 2025–26",
  filingDate: "18 Jul 2025",
  itrForm: "ITR-1 (Sahaj)",
  filingStatus: "Successfully Filed",
  grossTotalIncome: "₹8,12,400",
};

export const REVISION_REASONS: RevisionReasonOption[] = [
  {
    id: "missed_income",
    title: "Missed income",
    subtitle: "Income you did not report in the original return",
    iconName: "cash-outline",
  },
  {
    id: "wrong_deduction",
    title: "Wrong deduction claimed",
    subtitle: "A deduction claimed in error, or one you missed",
    iconName: "document-text-outline",
  },
  {
    id: "incorrect_bank",
    title: "Incorrect bank details",
    subtitle: "Refund could not be credited to the account given",
    iconName: "business-outline",
  },
  {
    id: "other",
    title: "Other",
    subtitle: "Something else — tell us in your own words",
    iconName: "pencil-outline",
  },
];

export const DEFAULT_REVISED_FORM_FIELDS: RevisedFormFields = {
  salaryBusinessIncome: "6,18,400",
  otherIncome: "2,79,280",
  sec80c: "1,50,000",
  sec80d: "28,000",
  homeLoanInterest: "1,42,000",
  bankAccount: "HDFC ••••1826",
  ifsc: "HDFC0000412",
  taxableIncome: "5,17,680",
};

export const REVISED_SUPPORTING_DOCUMENTS: RevisedDocumentItem[] = [
  {
    id: "doc-1",
    title: "PAN Card",
    subtitle: "PDF, JPG or PNG • Up to 10 MB",
    isMandatory: true,
    status: "not_uploaded",
  },
  {
    id: "doc-2",
    title: "Aadhaar Card",
    subtitle: "PDF, JPG or PNG • Up to 10 MB",
    isMandatory: true,
    status: "not_uploaded",
  },
  {
    id: "doc-3",
    title: "Form 16 / Form 16A\n(for AY 2025–26)",
    subtitle: "PDF, JPG or PNG • Up to 10 MB",
    isMandatory: true,
    status: "not_uploaded",
  },
  {
    id: "doc-4",
    title: "AIS and TIS Statement",
    subtitle: "PDF, JPG or PNG • Up to 10 MB",
    isMandatory: true,
    status: "not_uploaded",
  },
  {
    id: "doc-5",
    title: "Bank Statements",
    subtitle: "PDF, JPG or PNG • Up to 10 MB",
    isMandatory: true,
    status: "not_uploaded",
  },
  {
    id: "doc-6",
    title: "Investment Proofs",
    subtitle: "PDF, JPG or PNG • Up to 10 MB",
    isMandatory: true,
    status: "not_uploaded",
  },
];

export const COMPARISON_TABLE_ROWS: ComputationComparisonRow[] = [
  {
    particular: "Gross total income",
    original: "₹8,12,400",
    revised: "₹8,68,900",
    change: "+₹56,500",
    isHighlight: true,
  },
  {
    particular: "Total deductions",
    original: "₹3,20,000",
    revised: "₹3,20,000",
    change: "—",
    isHighlight: false,
  },
  {
    particular: "Taxable income",
    original: "₹4,92,400",
    revised: "₹5,48,900",
    change: "+₹56,500",
    isHighlight: true,
  },
  {
    particular: "Tax + cess",
    original: "₹12,854",
    revised: "₹18,742",
    change: "+₹5,888",
    isHighlight: true,
  },
  {
    particular: "Taxes paid",
    original: "₹31,200",
    revised: "₹31,200",
    change: "—",
    isHighlight: false,
  },
];
