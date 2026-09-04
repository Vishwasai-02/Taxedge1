export interface RequestInterceptorContext {
  headers: Record<string, string>;
  url: string;
  method: string;
}

export type RequestInterceptor = (config: RequestInterceptorContext) => Promise<RequestInterceptorContext> | RequestInterceptorContext;
export type ResponseInterceptor = <T>(response: T) => Promise<T> | T;
export type ErrorInterceptor = (error: unknown) => Promise<never> | never;

export class InterceptorManager {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  useRequest(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  useResponse(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  useError(interceptor: ErrorInterceptor): void {
    this.errorInterceptors.push(interceptor);
  }

  async runRequestInterceptors(context: RequestInterceptorContext): Promise<RequestInterceptorContext> {
    let current = context;
    for (const interceptor of this.requestInterceptors) {
      current = await interceptor(current);
    }
    return current;
  }

  async runResponseInterceptors<T>(response: T): Promise<T> {
    let current = response;
    for (const interceptor of this.responseInterceptors) {
      current = await interceptor(current);
    }
    return current;
  }

  async runErrorInterceptors(error: unknown): Promise<never> {
    for (const interceptor of this.errorInterceptors) {
      await interceptor(error);
    }
    throw error;
  }
}
