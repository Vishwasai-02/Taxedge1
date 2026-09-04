export interface IncomeDetails {
  salaryIncome: number;
  businessIncome: number;
  housePropertyIncome: number;
  capitalGains: number;
  otherIncome: number;
  exemptIncome: number;
}

export interface DeductionDetails {
  section80C: number;
  section80D: number;
  section80E: number;
  section80G: number;
  section80TTA: number;
  otherDeductions: number;
}

export interface ItrFilingDraft {
  assessmentYear: string;
  financialYear: string;
  pan: string;
  income: IncomeDetails;
  deductions: DeductionDetails;
  totalTaxPaid: number;
  refundAmount: number;
  documents: { name: string; uri: string }[];
}
