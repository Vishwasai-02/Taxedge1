export interface TdsRefundStatusDetails {
  applicationId: string;
  filedOn: string;
  estimatedRefund: string;
  refundToBank: string;
  expectedProcessingTime: string;
}

export interface NextStepTimelineItem {
  id: number;
  title: string;
  status: "Completed" | "In Progress" | "Upcoming";
  description?: string;
}
