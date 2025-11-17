import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    env: {
      VITE_APP_NAME: "Todo App (Test)",
      VITE_TEST_MODE: "true",
      VITE_LOG_LEVEL: "debug",
      VITE_STORAGE_KEY_PREFIX: "todos-test",
      VITE_ENABLE_LOCAL_STORAGE: "true",
      VITE_ENABLE_DEMO_MODE: "false",
    },
  },
});
