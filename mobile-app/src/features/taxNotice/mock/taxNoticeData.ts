import {
  TaxNoticeSummaryData,
  TaxNoticeSupportingDoc,
  NoticeTrackingStep,
  NoticeStatusDetails,
} from "../types/taxNotice.types";

export const MOCK_NOTICE_SUMMARY: TaxNoticeSummaryData = {
  noticeType: "Proposed Adjustment",
  section: "143(1)(a)",
  issuedDate: "18 Aug 2026",
  responseDueDate: "17 Sep 2026",
  daysLeft: 15,
  riskLevel: "Low",
  whatItMeans:
    "The department's records show ₹42,000 of interest income that does not appear on your return. They are proposing to add it to your taxable income and have given you an opportunity to respond.",
  actionRequired:
    "You need to confirm whether the income was already reported, agree with the adjustment, or provide an explanation with supporting documents.",
};

export const MOCK_SUPPORTING_DOCS: TaxNoticeSupportingDoc[] = [
  {
    id: "doc-ais",
    title: "AIS for AY 2025–26",
    subtitle: "PDF, JPG or PNG • Up to 10 MB",
    isMandatory: true,
    status: "not_uploaded",
  },
  {
    id: "doc-26as",
    title: "Form 26AS",
    subtitle: "PDF, JPG or PNG • Up to 10 MB",
    isMandatory: true,
    status: "not_uploaded",
  },
  {
    id: "doc-bank",
    title: "Bank Statement",
    subtitle: "PDF, JPG or PNG • Up to 10 MB",
    isMandatory: true,
    status: "not_uploaded",
  },
  {
    id: "doc-interest",
    title: "Interest Certificate",
    subtitle: "PDF, JPG or PNG • Up to 10 MB",
    isMandatory: true,
    status: "not_uploaded",
  },
  {
    id: "doc-proof",
    title: "Supporting Proof",
    subtitle: "PDF, JPG or PNG • Up to 10 MB",
    isMandatory: true,
    status: "not_uploaded",
  },
  {
    id: "doc-additional",
    title: "Additional Document\n(Optional)",
    subtitle: "PDF, JPG or PNG • Up to 10 MB",
    isMandatory: false,
    status: "not_uploaded",
  },
];

export const MOCK_DRAFT_RESPONSE_TEXT = `Respected Sir/Madam,

With reference to the intimation under section 143(1)(a) bearing number CPC/2526/A3/284419260 dated 18 August 2026, we respectfully submit the following response on behalf of the assessee, Ms. Anjali Deshmukh (PAN AXTPD4419K), for Assessment Year 2025–26.

The proposed adjustment relates to interest income of ₹42,000 reflected in the Annual Information Statement. The assessee confirms that this interest was received and was inadvertently omitted from Schedule OS of the return. The assessee therefore agrees with the proposed adjustment. The resulting additional tax of ₹8,736 including cess has been paid vide challan dated 1 September 2026, a copy of which is enclosed.

We request that the return be processed accordingly.

Yours faithfully,
For TaxEdge Fin Solutions
Meera Iyer, Tax Executive`;

export const MOCK_TRACKING_STEPS: NoticeTrackingStep[] = [
  {
    id: "step-1",
    title: "Received",
    date: "18 Aug 2026",
    description: "Notice received from Income Tax Department",
    status: "completed",
  },
  {
    id: "step-2",
    title: "Under Review",
    date: "20 Aug 2026",
    description: "Our team is reviewing your documents",
    status: "completed",
  },
  {
    id: "step-3",
    title: "Response Submitted",
    date: "2 Sep 2026",
    description: "Response submitted to Income Tax Department",
    status: "completed",
  },
  {
    id: "step-4",
    title: "Resolved",
    date: "Pending",
    description: "We'll update you once the notice is closed",
    status: "pending",
  },
];

export const MOCK_NOTICE_STATUS_DETAILS: NoticeStatusDetails = {
  noticeNumber: "CPC/2526/A3/284419260",
  section: "143(1)(a)",
  submittedOn: "2 Sep 2026",
  acknowledgementNo: "RSP284419260902",
  assignedTaxExecutive: "Meera Iyer",
  currentStatus: "Response Submitted",
};
