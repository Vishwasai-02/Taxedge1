import { create } from "zustand";
import type { Customer, CustomerProfile } from "../../../shared/types/domain";
import type { DevUser, AuthState } from "../types/auth.types";
import { authService } from "../services/authService";

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

const user = authService.getCurrentUser();

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: Boolean(authService.isAuthenticated() && user),
  mobileNumber: user?.mobileNumber || null,
  customer: user ? toCustomer(user) : null,

  setMobileNumber: (m) => set({ mobileNumber: m.replace(/\D/g, "") }),

  loginWithPasscode: async (passcode: string) => {
    const res = await authService.loginWithPasscode(get().mobileNumber || "", passcode);
    if (res.success && res.user) {
      set({ isLoggedIn: true, mobileNumber: res.user.mobileNumber, customer: toCustomer(res.user) });
      return { success: true };
    }
    return { success: false, error: res.error || "Incorrect passcode. Please try again." };
  },

  login: async (passcode = "") => get().loginWithPasscode(passcode),

  register: async (profile: CustomerProfile, passcode = "123456", autoLogin = true) => {
    const mobile = get().mobileNumber || "9876543210";
    const res = await authService.registerUser({ ...profile, mobileNumber: mobile, passcode }, autoLogin);
    if (res.success && res.user) {
      if (autoLogin) set({ isLoggedIn: true, mobileNumber: res.user.mobileNumber, customer: toCustomer(res.user) });
      return { success: true };
    }
    return { success: false, error: res.error || "Registration failed" };
  },

  setAvatar: (avatarUri) => {
    authService.setAvatar(avatarUri);
    set((s) => (s.customer ? { customer: { ...s.customer, avatarUri } } : {}));
  },

  logout: () => {
    authService.logout();
    set({ isLoggedIn: false, customer: null, mobileNumber: null });
  },

  syncFromDevAuth: () => {
    const u = authService.getCurrentUser();
    set({
      isLoggedIn: Boolean(authService.isAuthenticated() && u),
      mobileNumber: u?.mobileNumber || null,
      customer: u ? toCustomer(u) : null,
    });
  },
}));

export default useAuthStore;
