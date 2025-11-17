/**
 * Example of how to use environment variables in components
 * This file demonstrates best practices for accessing environment configuration
 */

import { ENV, getEnvConfig } from "./env";

/**
 * Example logger that respects the VITE_LOG_LEVEL configuration
 */
export class Logger {
  private logLevel: "debug" | "info" | "warn" | "error";

  private levelMap = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  constructor() {
    this.logLevel = ENV.logLevel;
  }

  private shouldLog(level: "debug" | "info" | "warn" | "error"): boolean {
    return this.levelMap[level] >= this.levelMap[this.logLevel];
  }

  debug(message: string, ...args: unknown[]) {
    if (this.shouldLog("debug")) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: unknown[]) {
    if (this.shouldLog("info")) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: unknown[]) {
    if (this.shouldLog("warn")) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string, ...args: unknown[]) {
    if (this.shouldLog("error")) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }
}

/**
 * Create a logger instance
 */
export const logger = new Logger();

/**
 * Example hook to check if in test mode
 */
export function useIsTestMode(): boolean {
  const config = getEnvConfig();
  return config.testMode;
}

/**
 * Example hook to get storage configuration
 */
export function useStorageConfig() {
  const config = getEnvConfig();
  return {
    isEnabled: config.enableLocalStorage,
    keyPrefix: config.storageKeyPrefix,
    isDemoMode: config.enableDemoMode,
  };
}

/**
 * Usage Example in a Component:
 *
 * import { logger, useIsTestMode, useStorageConfig } from '@/utils/env-utils';
 *
 * export function MyComponent() {
 *   const isTestMode = useIsTestMode();
 *   const storage = useStorageConfig();
 *
 *   useEffect(() => {
 *     logger.info('Component mounted', { isTestMode });
 *
 *     if (!storage.isEnabled) {
 *       logger.warn('Storage is disabled');
 *     }
 *   }, []);
 *
 *   return (
 *     <div>
 *       {isTestMode && <div>🧪 Running in test mode</div>}
 *       {storage.isDemoMode && <div>📝 Demo mode active</div>}
 *     </div>
 *   );
 * }
 */
