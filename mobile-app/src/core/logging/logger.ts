export type LogLevel = "debug" | "info" | "warn" | "error";

class LoggerService {
  private isDevelopment = process.env.NODE_ENV !== "production";

  debug(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    console.log(`[INFO] ${message}`, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }

  error(message: string, error?: unknown, ...args: unknown[]): void {
    console.error(`[ERROR] ${message}`, error, ...args);
  }
}

export const logger = new LoggerService();
export default logger;
