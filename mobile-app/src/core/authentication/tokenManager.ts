import { secureStorage } from "../storage/secureStorage";

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

class TokenManager {
  private static ACCESS_TOKEN_KEY = "auth_access_token";
  private static REFRESH_TOKEN_KEY = "auth_refresh_token";

  async getAccessToken(): Promise<string | null> {
    return secureStorage.getItem(TokenManager.ACCESS_TOKEN_KEY);
  }

  async setAccessToken(token: string): Promise<void> {
    await secureStorage.setItem(TokenManager.ACCESS_TOKEN_KEY, token);
  }

  async getRefreshToken(): Promise<string | null> {
    return secureStorage.getItem(TokenManager.REFRESH_TOKEN_KEY);
  }

  async setRefreshToken(token: string): Promise<void> {
    await secureStorage.setItem(TokenManager.REFRESH_TOKEN_KEY, token);
  }

  async clearTokens(): Promise<void> {
    await secureStorage.removeItem(TokenManager.ACCESS_TOKEN_KEY);
    await secureStorage.removeItem(TokenManager.REFRESH_TOKEN_KEY);
  }

  async hasValidToken(): Promise<boolean> {
    const token = await this.getAccessToken();
    return !!token && token.length > 0;
  }
}

export const tokenManager = new TokenManager();
export default tokenManager;
