import { apiClient } from "../../../core/api/apiClient";
import type { DevUser } from "../types/auth.types";

export const authApi = {
  sendOtp: async (mobileNumber: string) => {
    return { success: true, message: "OTP sent successfully" };
  },
  verifyOtp: async (mobileNumber: string, otp: string) => {
    return { success: true, verified: otp.length === 6 };
  },
  loginWithPasscode: async (mobileNumber: string, passcode: string) => {
    return apiClient.post<{ user: DevUser; token: string }>("/auth/login", {
      mobileNumber,
      passcode,
    });
  },
};

export default authApi;
