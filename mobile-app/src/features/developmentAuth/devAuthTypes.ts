/**
 * ============================================================================
 * TEMPORARY DEVELOPMENT AUTHENTICATION TYPES
 * REMOVE THIS MODULE WHEN BACKEND AUTHENTICATION IS INTEGRATED.
 * ============================================================================
 */

export interface DevUser {
  mobileNumber: string;
  passcode: string; // Exactly 6 numeric digits (e.g. "123456")
  name: string;
  email: string;
  customerType: string;
  dob?: string;
  pan?: string;
  aadhaar?: string;
  address?: string;
  avatarUri?: string | null;
  registrationCompleted: boolean;
  createdAt: string;
  customerId: string;
}

export interface DevSession {
  isLoggedIn: boolean;
  activeMobile: string | null;
  lastLoginAt: string | null;
}

export interface DevAuthResult {
  success: boolean;
  error?: string;
  user?: DevUser;
}

export interface RegisterParams {
  mobileNumber: string;
  passcode: string; // Exactly 6 numeric digits
  name: string;
  email: string;
  customerType?: string;
  dob?: string;
  pan?: string;
  aadhaar?: string;
  address?: string;
  avatarUri?: string | null;
}
