/**
 * GST & Tax Validation Utilities
 * Follows standard Indian Government format rules for PAN, Aadhaar, GSTIN, IFSC, etc.
 */

export const GstValidators = {
  /**
   * Validates Indian PAN Number: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)
   */
  isValidPan: (pan: string): boolean => {
    const cleanPan = pan.trim().toUpperCase();
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(cleanPan);
  },

  /**
   * Validates 12-digit Indian Aadhaar Number (allows spaces/dashes)
   */
  isValidAadhaar: (aadhaar: string): boolean => {
    const cleanAadhaar = aadhaar.replace(/[\s-]/g, "");
    return /^\d{12}$/.test(cleanAadhaar);
  },

  /**
   * Validates 10-digit Indian Mobile Number starting with 6, 7, 8, or 9
   */
  isValidMobile: (mobile: string): boolean => {
    const cleanMobile = mobile.replace(/^(\+91|0|\s)/g, "").replace(/[\s-]/g, "");
    return /^[6-9]\d{9}$/.test(cleanMobile);
  },

  /**
   * Validates Email Address format
   */
  isValidEmail: (email: string): boolean => {
    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(cleanEmail);
  },

  /**
   * Validates Indian 15-character GSTIN (e.g. 29AKHIL1234K1Z5)
   */
  isValidGstin: (gstin: string): boolean => {
    const cleanGstin = gstin.trim().toUpperCase();
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(cleanGstin);
  },

  /**
   * Validates 11-character Indian IFSC Code (e.g. HDFC0001234, SBIN0001234)
   */
  isValidIfsc: (ifsc: string): boolean => {
    const cleanIfsc = ifsc.trim().toUpperCase();
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscRegex.test(cleanIfsc);
  },

  /**
   * Validates Bank Account Number (between 9 and 18 digits)
   */
  isValidBankAccount: (account: string): boolean => {
    const cleanAcc = account.trim().replace(/[\s-]/g, "");
    return /^\d{9,18}$/.test(cleanAcc);
  },

  /**
   * Validates UPI ID format (e.g. username@bank / akhil@paytm)
   */
  isValidUpi: (upi: string): boolean => {
    const cleanUpi = upi.trim();
    const upiRegex = /^[\w.\-_]{2,}@[\w\-]{2,}$/;
    return upiRegex.test(cleanUpi);
  },

  /**
   * Validates standard string length (minimum non-empty length)
   */
  isNotEmpty: (str: string, minLength: number = 2): boolean => {
    return str.trim().length >= minLength;
  },
};
