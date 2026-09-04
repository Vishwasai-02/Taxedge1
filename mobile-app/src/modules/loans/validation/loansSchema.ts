import { validatePan, validatePhone } from "../../../shared/validators/indianTaxValidators";

export function validateLoanApplication(values: {
  amount?: number;
  tenureMonths?: number;
  pan?: string;
  phone?: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.amount || values.amount <= 0) {
    errors.amount = "Valid loan amount is required";
  }

  if (!values.tenureMonths || values.tenureMonths <= 0) {
    errors.tenureMonths = "Loan tenure is required";
  }

  if (values.pan && !validatePan(values.pan)) {
    errors.pan = "Valid 10-digit PAN is required";
  }

  if (values.phone && !validatePhone(values.phone)) {
    errors.phone = "Valid 10-digit phone number is required";
  }

  return errors;
}

export default {
  validateLoanApplication,
};
