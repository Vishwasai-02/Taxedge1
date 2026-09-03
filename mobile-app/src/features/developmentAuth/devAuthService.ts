/**
 * TEMPORARY DEVELOPMENT AUTHENTICATION SERVICE.
 * REMOVE THIS MODULE WHEN BACKEND AUTHENTICATION IS INTEGRATED.
 */

import type { DevUser, DevSession, DevAuthResult, RegisterParams } from "./devAuthTypes";

const KEY_USERS = "taxEdgeDevUsersMap";
const KEY_SESSION = "taxEdgeDevSession";
const memory: Record<string, string> = {};

const get = (k: string) => {
  try { if (typeof window !== "undefined" && window.localStorage) return window.localStorage.getItem(k); } catch {}
  return memory[k] || null;
};
const set = (k: string, v: string) => {
  try { if (typeof window !== "undefined" && window.localStorage) window.localStorage.setItem(k, v); } catch {}
  memory[k] = v;
};
const del = (k: string) => {
  try { if (typeof window !== "undefined" && window.localStorage) window.localStorage.removeItem(k); } catch {}
  delete memory[k];
};

export const devAuthStorage = {
  getUsersMap: (): Record<string, DevUser> => {
    try { return JSON.parse(get(KEY_USERS) || "{}"); } catch { return {}; }
  },
  getUserByMobile: (mobile: string): DevUser | null => devAuthStorage.getUsersMap()[mobile.replace(/\D/g, "")] || null,
  saveUser: (user: DevUser) => {
    const map = devAuthStorage.getUsersMap();
    map[user.mobileNumber] = user;
    set(KEY_USERS, JSON.stringify(map));
  },
  getSession: (): DevSession => {
    try { return JSON.parse(get(KEY_SESSION) || '{"isLoggedIn":false,"activeMobile":null}'); } catch {
      return { isLoggedIn: false, activeMobile: null, lastLoginAt: null };
    }
  },
  saveSession: (s: DevSession) => set(KEY_SESSION, JSON.stringify(s)),
  clearSession: () => set(KEY_SESSION, JSON.stringify({ isLoggedIn: false, activeMobile: null, lastLoginAt: null })),
  clearAllDevData: () => { del(KEY_USERS); del(KEY_SESSION); del("taxEdgeDevUser"); },
};

export const devAuthSession = {
  isAuthenticated: () => Boolean(devAuthStorage.getSession().isLoggedIn && devAuthStorage.getSession().activeMobile),
  getActiveMobile: () => devAuthStorage.getSession().activeMobile,
  startSession: (m: string) => {
    const s: DevSession = { isLoggedIn: true, activeMobile: m.replace(/\D/g, ""), lastLoginAt: new Date().toISOString() };
    devAuthStorage.saveSession(s);
    return s;
  },
  endSession: () => devAuthStorage.clearSession(),
  getCurrentUser: (): DevUser | null => {
    const m = devAuthSession.getActiveMobile();
    return m ? devAuthStorage.getUserByMobile(m) : null;
  },
};

export const devAuthService = {
  findUserByMobile: (m: string) => devAuthStorage.getUserByMobile(m),
  isUserRegistered: (m: string) => Boolean(devAuthStorage.getUserByMobile(m)?.registrationCompleted),

  async registerUser(params: RegisterParams, autoLogin = true): Promise<DevAuthResult> {
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
      registrationCompleted: true,
      createdAt: new Date().toISOString(),
      customerId: `CUST-2026-${mobile.slice(-5) || "00001"}`,
    };

    devAuthStorage.saveUser(user);
    if (autoLogin) devAuthSession.startSession(mobile);
    return { success: true, user };
  },

  async loginWithPasscode(m: string, p: string): Promise<DevAuthResult> {
    const clean = (m || "").replace(/\D/g, "");
    const pass = (p || "").replace(/\D/g, "");
    if (clean.length !== 10) return { success: false, error: "Please enter a valid 10-digit mobile number" };
    if (pass.length !== 6) return { success: false, error: "Passcode must be exactly 6 numeric digits" };

    const user = devAuthStorage.getUserByMobile(clean);
    if (!user) return { success: false, error: "Mobile number not found. Please register." };
    if (user.passcode !== pass) return { success: false, error: "Incorrect passcode. Please try again." };

    devAuthSession.startSession(clean);
    return { success: true, user };
  },

  login: (m: string, p: string) => devAuthService.loginWithPasscode(m, p),
  logout: () => devAuthSession.endSession(),
  isAuthenticated: () => devAuthSession.isAuthenticated(),
  getCurrentUser: () => devAuthSession.getCurrentUser(),
  setAvatar: (uri: string | null) => {
    const u = devAuthSession.getCurrentUser();
    if (u) { u.avatarUri = uri; devAuthStorage.saveUser(u); }
  },
  resetDevelopmentAccount: () => devAuthStorage.clearAllDevData(),
};
