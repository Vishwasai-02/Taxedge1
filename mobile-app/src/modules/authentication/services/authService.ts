import { authStorage } from "./authStorage";
import type { DevUser } from "../types/auth.types";

export interface RegisterParams {
  mobileNumber?: string;
  name: string;
  email?: string;
  customerType?: string;
  dob?: string;
  pan?: string;
  aadhaar?: string;
  address?: string;
  avatarUri?: string | null;
  passcode?: string;
}

export interface AuthResult {
  success: boolean;
  user?: DevUser;
  error?: string;
}

export const authService = {
  findUserByMobile: (m: string) => authStorage.getUserByMobile(m),
  isUserRegistered: (m: string) => Boolean(authStorage.getUserByMobile(m)?.passcode),

  async registerUser(params: RegisterParams, autoLogin = true): Promise<AuthResult> {
    const mobile = (params.mobileNumber || "").replace(/\D/g, "");
    if (mobile.length !== 10) return { success: false, error: "Please enter a valid 10-digit mobile number" };
    const passcode = (params.passcode || "").replace(/\D/g, "");
    if (passcode.length !== 6) return { success: false, error: "Passcode must be exactly 6 numeric digits" };
    if (!params.name?.trim()) return { success: false, error: "Full name is required" };

    const user: DevUser = {
      mobileNumber: mobile,
      passcode,
      name: params.name.trim(),
      email: params.email?.trim() || `${mobile}@taxedge.in`,
      customerType: params.customerType || "Individual",
      dob: params.dob?.trim() || "",
      pan: params.pan?.trim().toUpperCase() || "",
      aadhaar: params.aadhaar?.trim() || "",
      address: params.address?.trim() || "",
      avatarUri: params.avatarUri || null,
      customerId: `CUST-2026-${mobile.slice(-5) || "00001"}`,
    };

    authStorage.saveUser(user);
    if (autoLogin) {
      authStorage.saveSession({
        isLoggedIn: true,
        activeMobile: mobile,
        lastLoginAt: new Date().toISOString(),
      });
    }
    return { success: true, user };
  },

  async loginWithPasscode(m: string, p: string): Promise<AuthResult> {
    const clean = (m || "").replace(/\D/g, "");
    const pass = (p || "").replace(/\D/g, "");
    if (clean.length !== 10) return { success: false, error: "Please enter a valid 10-digit mobile number" };
    if (pass.length !== 6) return { success: false, error: "Passcode must be exactly 6 numeric digits" };

    const user = authStorage.getUserByMobile(clean);
    if (!user) return { success: false, error: "Mobile number not found. Please register." };
    if (user.passcode !== pass) return { success: false, error: "Incorrect passcode. Please try again." };

    authStorage.saveSession({
      isLoggedIn: true,
      activeMobile: clean,
      lastLoginAt: new Date().toISOString(),
    });
    return { success: true, user };
  },

  login: (m: string, p: string) => authService.loginWithPasscode(m, p),
  logout: () => authStorage.clearSession(),
  isAuthenticated: () => Boolean(authStorage.getSession().isLoggedIn && authStorage.getSession().activeMobile),
  getCurrentUser: (): DevUser | null => {
    const session = authStorage.getSession();
    return session.activeMobile ? authStorage.getUserByMobile(session.activeMobile) : null;
  },
  setAvatar: (uri: string | null) => {
    const u = authService.getCurrentUser();
    if (u) {
      u.avatarUri = uri;
      authStorage.saveUser(u);
    }
  },
  resetAccount: () => authStorage.clearAllAuthData(),
};

// Aliased for seamless backwards-compatibility
export const devAuthService = authService;
export default authService;
