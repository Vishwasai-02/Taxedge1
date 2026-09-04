import { localStorage } from "./localStorage";

class SecureStorageService {
  private prefix = "taxedge_secure_";

  async getItem(key: string): Promise<string | null> {
    return localStorage.getItem(`${this.prefix}${key}`);
  }

  async setItem(key: string, value: string): Promise<void> {
    return localStorage.setItem(`${this.prefix}${key}`, value);
  }

  async removeItem(key: string): Promise<void> {
    return localStorage.removeItem(`${this.prefix}${key}`);
  }
}

export const secureStorage = new SecureStorageService();
export default secureStorage;
