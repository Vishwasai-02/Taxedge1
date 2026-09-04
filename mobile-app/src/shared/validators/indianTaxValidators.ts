export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const AADHAAR_REGEX = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
export const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
export const PINCODE_REGEX = /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[6-9]\d{9}$/;

export function validatePan(pan: string): boolean {
  if (!pan) return false;
  return PAN_REGEX.test(pan.trim().toUpperCase());
}

export function validateGstin(gstin: string): boolean {
  if (!gstin) return false;
  return GSTIN_REGEX.test(gstin.trim().toUpperCase());
}

export function validateAadhaar(aadhaar: string): boolean {
  if (!aadhaar) return false;
  const clean = aadhaar.replace(/\s+/g, "");
  return AADHAAR_REGEX.test(clean);
}

export function validateIfsc(ifsc: string): boolean {
  if (!ifsc) return false;
  return IFSC_REGEX.test(ifsc.trim().toUpperCase());
}

export function validatePincode(pincode: string): boolean {
  if (!pincode) return false;
  return PINCODE_REGEX.test(pincode.trim());
}

export function validateEmail(email: string): boolean {
  if (!email) return false;
  return EMAIL_REGEX.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  const clean = phone.replace(/\D/g, "");
  return PHONE_REGEX.test(clean);
}
