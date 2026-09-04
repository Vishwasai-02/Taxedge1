import type { Customer, CustomerProfile } from "../../../shared/types/domain";

export interface DevUser {
  customerId: string;
  mobileNumber: string;
  name: string;
  email: string;
  pan?: string;
  aadhaar?: string;
  dob?: string;
  address?: string;
  customerType?: string;
  avatarUri?: string | null;
  passcode?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  mobileNumber: string | null;
  customer: Customer | null;
  setMobileNumber: (m: string) => void;
  loginWithPasscode: (p: string) => Promise<{ success: boolean; error?: string }>;
  login: (p?: string) => Promise<{ success: boolean; error?: string }>;
  register: (profile: CustomerProfile, passcode?: string, autoLogin?: boolean) => Promise<{ success: boolean; error?: string }>;
  setAvatar: (uri: string | null) => void;
  logout: () => void;
  syncFromDevAuth: () => void;
}
