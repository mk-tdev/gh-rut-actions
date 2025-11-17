import { describe, it, expect, beforeEach, vi } from "vitest";
import { getEnvConfig } from "../env";

describe("Environment Configuration", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("should return configuration values in test environment", () => {
    const config = getEnvConfig();

    expect(config).toBeDefined();
    // In test environment, these are set by vitest.config.ts
    expect(config.appName).toBe("Todo App (Test)");
    expect(config.storageKeyPrefix).toBe("todos-test");
    expect(config.enableLocalStorage).toBe(true);
    expect(config.enableDemoMode).toBe(false);
    expect(config.logLevel).toBe("debug");
    expect(config.testMode).toBe(true);
  });

  it("should parse boolean values correctly", () => {
    const config = getEnvConfig();

    expect(typeof config.enableLocalStorage).toBe("boolean");
    expect(typeof config.enableDemoMode).toBe("boolean");
    expect(typeof config.testMode).toBe("boolean");
  });

  it("should have valid log level", () => {
    const config = getEnvConfig();
    const validLogLevels = ["debug", "info", "warn", "error"];

    expect(validLogLevels).toContain(config.logLevel);
  });

  it("should have storage key prefix and app name for testing", () => {
    const config = getEnvConfig();

    expect(config.storageKeyPrefix).toBeDefined();
    expect(config.storageKeyPrefix.length).toBeGreaterThan(0);
    expect(config.appName).toBeDefined();
    expect(config.appName.length).toBeGreaterThan(0);
  });
});
