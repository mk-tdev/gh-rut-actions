/**
 * Environment variable configuration utility
 * Provides type-safe access to environment variables with defaults
 */

interface EnvConfig {
  appName: string;
  storageKeyPrefix: string;
  enableLocalStorage: boolean;
  enableDemoMode: boolean;
  logLevel: "debug" | "info" | "warn" | "error";
  testMode: boolean;
}

function getEnvVariable(key: string, defaultValue: string): string {
  return import.meta.env[key] ?? defaultValue;
}

function parseBoolean(value: string): boolean {
  return value.toLowerCase() === "true";
}

export function getEnvConfig(): EnvConfig {
  return {
    appName: getEnvVariable("VITE_APP_NAME", "Todo App"),
    storageKeyPrefix: getEnvVariable("VITE_STORAGE_KEY_PREFIX", "todos"),
    enableLocalStorage: parseBoolean(
      getEnvVariable("VITE_ENABLE_LOCAL_STORAGE", "true")
    ),
    enableDemoMode: parseBoolean(
      getEnvVariable("VITE_ENABLE_DEMO_MODE", "false")
    ),
    logLevel: getEnvVariable("VITE_LOG_LEVEL", "info") as
      | "debug"
      | "info"
      | "warn"
      | "error",
    testMode: parseBoolean(getEnvVariable("VITE_TEST_MODE", "false")),
  };
}

export const ENV = getEnvConfig();
