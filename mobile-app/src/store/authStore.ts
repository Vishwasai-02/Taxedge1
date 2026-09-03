import { create } from "zustand";
import type { Customer, CustomerProfile } from "../types/domain";
import { devAuthService, type DevUser } from "../features/developmentAuth";

const toCustomer = (u: DevUser): Customer => ({
  name: u.name,
  email: u.email,
  dob: u.dob || "",
  pan: u.pan || "",
  aadhaar: u.aadhaar || "",
  address: u.address || "",
  customerType: u.customerType || "Individual",
  mobile: u.mobileNumber,
  customerId: u.customerId,
  avatarUri: u.avatarUri,
});

const user = devAuthService.getCurrentUser();

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

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: Boolean(devAuthService.isAuthenticated() && user),
  mobileNumber: user?.mobileNumber || null,
  customer: user ? toCustomer(user) : null,

  setMobileNumber: (m) => set({ mobileNumber: m.replace(/\D/g, "") }),

  loginWithPasscode: async (passcode: string) => {
    const res = await devAuthService.loginWithPasscode(get().mobileNumber || "", passcode);
    if (res.success && res.user) {
      set({ isLoggedIn: true, mobileNumber: res.user.mobileNumber, customer: toCustomer(res.user) });
      return { success: true };
    }
    return { success: false, error: res.error || "Incorrect passcode. Please try again." };
  },

  login: async (passcode = "") => get().loginWithPasscode(passcode),

  register: async (profile, passcode = "123456", autoLogin = true) => {
    const mobile = get().mobileNumber || "9876543210";
    const res = await devAuthService.registerUser({ ...profile, mobileNumber: mobile, passcode }, autoLogin);
    if (res.success && res.user) {
      if (autoLogin) set({ isLoggedIn: true, mobileNumber: res.user.mobileNumber, customer: toCustomer(res.user) });
      return { success: true };
    }
    return { success: false, error: res.error || "Registration failed" };
  },

  setAvatar: (avatarUri) => {
    devAuthService.setAvatar(avatarUri);
    set((s) => (s.customer ? { customer: { ...s.customer, avatarUri } } : {}));
  },

  logout: () => {
    devAuthService.logout();
    set({ isLoggedIn: false, customer: null, mobileNumber: null });
  },

  syncFromDevAuth: () => {
    const u = devAuthService.getCurrentUser();
    set({ isLoggedIn: Boolean(devAuthService.isAuthenticated() && u), mobileNumber: u?.mobileNumber || null, customer: u ? toCustomer(u) : null });
  },
}));
