export interface FormValidationErrors {
  panNumber?: string;
  aadhaarNumber?: string;
  assessmentYear?: string;
  grossSalary?: string;
  businessIncome?: string;
  rentalIncome?: string;
  stcg?: string;
  ltcg?: string;
  otherIncome?: string;
  sec80c?: string;
  sec80d?: string;
  homeLoan24b?: string;
  educationLoan80e?: string;
  otherDeductions?: string;
}

export const cleanNumericValue = (val?: string): number => {
  if (!val) return 0;
  const cleaned = val.toString().replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
};

export const validatePanNumber = (pan?: string): string | undefined => {
  if (!pan || !pan.trim()) {
    return "Enter a valid PAN Number.";
  }
  const cleanPan = pan.trim().toUpperCase();
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panRegex.test(cleanPan)) {
    return "Enter a valid PAN Number.";
  }
  return undefined;
};

export const validateAadhaarNumber = (aadhaar?: string): string | undefined => {
  if (!aadhaar || !aadhaar.trim()) {
    return "Enter a valid 12-digit Aadhaar Number.";
  }
  const cleanAadhaar = aadhaar.replace(/[^0-9]/g, "");
  if (cleanAadhaar.length !== 12) {
    return "Enter a valid 12-digit Aadhaar Number.";
  }
  return undefined;
};

export const validateAssessmentYear = (ay?: string): string | undefined => {
  if (!ay || !ay.trim()) {
    return "Select Assessment Year.";
  }
  return undefined;
};

export const validateGrossSalary = (salary?: string): string | undefined => {
  if (salary === undefined || salary === null || salary.trim() === "") {
    return "Enter Gross Salary.";
  }
  const raw = salary.replace(/[^0-9]/g, "");
  if (raw === "" || isNaN(Number(raw)) || Number(raw) < 0) {
    return "Enter Gross Salary.";
  }
  return undefined;
};

export const validateMandatoryNumericField = (
  val: string | undefined,
  fieldLabel: string
): string | undefined => {
  if (val === undefined || val === null || val.trim() === "") {
    return `Enter ${fieldLabel} (or 0).`;
  }
  const raw = val.replace(/[^0-9]/g, "");
  if (raw === "" || isNaN(Number(raw)) || Number(raw) < 0) {
    return `Enter a valid numeric amount for ${fieldLabel}.`;
  }
  return undefined;
};

export const validateSection80C = (val?: string): string | undefined => {
  if (val === undefined || val === null || val.trim() === "") {
    return "Enter Section 80C Deductions (or 0).";
  }
  const num = cleanNumericValue(val);
  if (num > 150000) {
    return "Maximum deduction allowed under Section 80C is ₹1,50,000.";
  }
  return undefined;
};
