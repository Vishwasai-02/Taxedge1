export interface TaxNoticeUploadFormData {
  noticeFileUri?: string;
  noticeFileName?: string;
  noticeFileSize?: string;
  noticeNumber: string;
  noticeDate: string;
  assessmentYear: string;
}

export interface TaxNoticeSummaryData {
  noticeType: string;
  section: string;
  issuedDate: string;
  responseDueDate: string;
  daysLeft: number;
  riskLevel: "Low" | "Medium" | "High";
  whatItMeans: string;
  actionRequired: string;
}

export interface TaxNoticeSupportingDoc {
  id: string;
  title: string;
  subtitle: string;
  isMandatory: boolean;
  fileUri?: string;
  fileName?: string;
  fileSize?: string;
  status: "not_uploaded" | "uploaded";
}

export interface NoticeTrackingStep {
  id: string;
  title: string;
  date: string;
  description: string;
  status: "completed" | "active" | "pending";
}

export interface NoticeStatusDetails {
  noticeNumber: string;
  section: string;
  submittedOn: string;
  acknowledgementNo: string;
  assignedTaxExecutive: string;
  currentStatus: string;
}
