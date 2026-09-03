export type PaymentMethodType = "upi" | "debit" | "credit" | "netbanking";

export interface PaymentOptionItem {
  id: PaymentMethodType;
  title: string;
  subtitle?: string;
  iconName: "qr-code-outline" | "card-outline" | "card" | "business-outline";
}

export interface TdsFeeBreakdown {
  refundEstimate: number;
  serviceFeePercent: number;
  serviceFeeAmount: number;
  gstPercent: number;
  gstAmount: number;
  totalPayable: number;
}
