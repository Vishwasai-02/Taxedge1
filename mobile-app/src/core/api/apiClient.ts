import { ApiError } from "./apiError";
import { InterceptorManager } from "./interceptors";

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeoutMs?: number;
}

export class ApiClient {
  private baseUrl: string;
  public interceptors: InterceptorManager;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
    this.interceptors = new InterceptorManager();
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  private buildUrl(path: string, params?: Record<string, string | number | boolean>): string {
    const fullUrl = path.startsWith("http") ? path : `${this.baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
    if (!params || Object.keys(params).length === 0) {
      return fullUrl;
    }
    const query = Object.entries(params)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join("&");
    return fullUrl.includes("?") ? `${fullUrl}&${query}` : `${fullUrl}?${query}`;
  }

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", path, undefined, options);
  }

  async post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>("POST", path, body, options);
  }

  async put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>("PUT", path, body, options);
  }

  async patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>("PATCH", path, body, options);
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", path, undefined, options);
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    try {
      const initialUrl = this.buildUrl(path, options?.params);
      const initialHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options?.headers || {}),
      };

      const interceptedConfig = await this.interceptors.runRequestInterceptors({
        url: initialUrl,
        headers: initialHeaders,
        method,
      });

      const response = await fetch(interceptedConfig.url, {
        method: interceptedConfig.method,
        headers: interceptedConfig.headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        let errorData: any = {};
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: response.statusText };
        }
        throw new ApiError(
          errorData.message || "Request failed",
          response.status,
          errorData.code || "API_ERROR",
          errorData.errors
        );
      }

      const json = await response.json();
      return await this.interceptors.runResponseInterceptors<T>(json);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      return this.interceptors.runErrorInterceptors(ApiError.fromError(error));
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;
