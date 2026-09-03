import { TdsRefundEstimateData } from "../types/estimate.types";

export const DEFAULT_TDS_ESTIMATE: TdsRefundEstimateData = {
  totalTdsDeducted: 46800,
  totalTaxLiability: 23400,
  estimatedRefund: 23400,
  serviceFeeRate: "15%",
  serviceFee: 3510,
  netEstimatedRefund: 23400,
};
