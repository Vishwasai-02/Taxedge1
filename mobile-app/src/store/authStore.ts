import { create } from "zustand";

import type { Customer, CustomerProfile } from "../types/domain";

export interface AuthState {
  isLoggedIn: boolean;
  mobileNumber: string | null;
  customer: Customer | null;
  setMobileNumber: (mobile: string) => void;
  login: () => void;
  register: (profile: CustomerProfile) => void;
  /** Local profile photo. Stored as the picker's file URI on this device. */
  setAvatar: (avatarUri: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  mobileNumber: null,
  customer: null,
  setMobileNumber: (mobile) => set({ mobileNumber: mobile }),
  login: () =>
    set((state) => {
      const mob = state.mobileNumber || "9876543210";
      return {
        isLoggedIn: true,
        customer: {
          name:
            state.mobileNumber === "9876543210"
              ? "Priya Sharma"
              : "TaxEdge Client",
          mobile: mob,
          email: `${mob}@taxedge.in`,
          dob: "1992-05-15",
          pan: "ABCPS1234E",
          aadhaar: "1234 5678 9012",
          address: "Flat 402, Sunshine Heights, Mumbai - 400001",
          customerType: "Salaried",
          customerId: "CUST-2026-" + mob.slice(-5),
        },
      };
    }),
  register: (profile) =>
    set((state) => {
      const randomId = "CUST-2026-" + Math.floor(10000 + Math.random() * 90000);
      const newCustomer: Customer = {
        ...profile,
        mobile: state.mobileNumber || "9999999999",
        customerId: randomId,
      };
      return {
        isLoggedIn: true,
        customer: newCustomer,
      };
    }),
  setAvatar: (avatarUri) =>
    set((state) =>
      state.customer ? { customer: { ...state.customer, avatarUri } } : {},
    ),
  logout: () => set({ isLoggedIn: false, customer: null, mobileNumber: null }),
}));
