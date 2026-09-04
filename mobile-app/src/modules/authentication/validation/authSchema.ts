import { validatePhone, validatePan, validateAadhaar, validateEmail } from "../../../shared/validators/indianTaxValidators";

export function validateLoginPhone(phone: string): { valid: boolean; error?: string } {
  const clean = phone.replace(/\D/g, "");
  if (!clean) return { valid: false, error: "Mobile number is required" };
  if (clean.length !== 10) return { valid: false, error: "Please enter a valid 10-digit mobile number" };
  if (!validatePhone(clean)) return { valid: false, error: "Invalid mobile number format" };
  return { valid: true };
}

export function validatePasscode(passcode: string): { valid: boolean; error?: string } {
  const clean = passcode.replace(/\D/g, "");
  if (clean.length !== 6) return { valid: false, error: "Passcode must be exactly 6 digits" };
  return { valid: true };
}

export function validateRegisterForm(values: {
  name: string;
  email: string;
  pan?: string;
  aadhaar?: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.name?.trim()) {
    errors.name = "Full name is required";
  }

  if (values.email && !validateEmail(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (values.pan && !validatePan(values.pan)) {
    errors.pan = "Please enter a valid 10-character PAN (e.g. ABCDE1234F)";
  }

  if (values.aadhaar && !validateAadhaar(values.aadhaar)) {
    errors.aadhaar = "Please enter a valid 12-digit Aadhaar number";
  }

  return errors;
}
