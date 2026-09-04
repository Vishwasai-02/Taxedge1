import type { DevUser } from "../types/auth.types";

const KEY_USERS = "taxEdgeDevUsersMap";
const KEY_SESSION = "taxEdgeDevSession";
const memory: Record<string, string> = {};

const get = (k: string) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(k);
    }
  } catch {}
  return memory[k] || null;
};

const set = (k: string, v: string) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(k, v);
    }
  } catch {}
  memory[k] = v;
};

const del = (k: string) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(k);
    }
  } catch {}
  delete memory[k];
};

export const authStorage = {
  getUsersMap: (): Record<string, DevUser> => {
    try {
      return JSON.parse(get(KEY_USERS) || "{}");
    } catch {
      return {};
    }
  },
  getUserByMobile: (mobile: string): DevUser | null =>
    authStorage.getUsersMap()[mobile.replace(/\D/g, "")] || null,
  saveUser: (user: DevUser) => {
    const map = authStorage.getUsersMap();
    map[user.mobileNumber] = user;
    set(KEY_USERS, JSON.stringify(map));
  },
  getSession: () => {
    try {
      return JSON.parse(get(KEY_SESSION) || '{"isLoggedIn":false,"activeMobile":null}');
    } catch {
      return { isLoggedIn: false, activeMobile: null, lastLoginAt: null };
    }
  },
  saveSession: (s: any) => set(KEY_SESSION, JSON.stringify(s)),
  clearSession: () =>
    set(KEY_SESSION, JSON.stringify({ isLoggedIn: false, activeMobile: null, lastLoginAt: null })),
  clearAllAuthData: () => {
    del(KEY_USERS);
    del(KEY_SESSION);
    del("taxEdgeDevUser");
  },
};

export default authStorage;
