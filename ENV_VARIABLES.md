# Environment Variables Configuration

This document describes the environment variables used in the Todo App for configuration and testing purposes.

## Overview

The Todo App uses environment variables for:

- Storage configuration
- Feature flags
- Logging levels
- Testing setup

All environment variables are prefixed with `VITE_` to be processed by Vite and made available in the browser runtime through `import.meta.env`.

## Available Variables

### `VITE_STORAGE_KEY_PREFIX`

- **Type**: String
- **Default**: `todos`
- **Description**: Prefix used for storage keys in session storage. Useful for preventing collisions when multiple instances run in the same browser.
- **Example**: `VITE_STORAGE_KEY_PREFIX=my-app-todos`

### `VITE_ENABLE_LOCAL_STORAGE`

- **Type**: Boolean (`true` | `false`)
- **Default**: `true`
- **Description**: Enables or disables local storage persistence. Can be used to temporarily disable storage for testing.
- **Example**: `VITE_ENABLE_LOCAL_STORAGE=false`

### `VITE_ENABLE_DEMO_MODE`

- **Type**: Boolean (`true` | `false`)
- **Default**: `false`
- **Description**: When enabled, the app loads with sample todos and prevents actual persistence (useful for demos and testing).
- **Example**: `VITE_ENABLE_DEMO_MODE=true`

### `VITE_LOG_LEVEL`

- **Type**: String (`debug` | `info` | `warn` | `error`)
- **Default**: `info`
- **Description**: Controls the verbosity of console logging.
- **Example**: `VITE_LOG_LEVEL=debug`

### `VITE_TEST_MODE`

- **Type**: Boolean (`true` | `false`)
- **Default**: `false`
- **Description**: Flag indicating if the app is running in test mode. Used to skip certain initialization or enable test-specific behavior.
- **Example**: `VITE_TEST_MODE=true`

## Usage

### Development Environment

Create a `.env.local` file in the project root (not tracked by git):

```env
VITE_STORAGE_KEY_PREFIX=todos-dev
VITE_ENABLE_LOCAL_STORAGE=true
VITE_ENABLE_DEMO_MODE=false
VITE_LOG_LEVEL=info
VITE_TEST_MODE=false
```

Then run the development server:

```bash
npm run dev
```

### Production Environment

Use `.env.production` file:

```env
VITE_STORAGE_KEY_PREFIX=todos
VITE_ENABLE_LOCAL_STORAGE=true
VITE_ENABLE_DEMO_MODE=false
VITE_LOG_LEVEL=warn
VITE_TEST_MODE=false
```

Build and preview:

```bash
npm run build
npm run preview
```

### Testing Environment

The testing environment automatically loads `.env.test` with test-specific values configured in `vitest.config.ts`:

```env
VITE_TEST_MODE=true
VITE_ENABLE_LOCAL_STORAGE=true
VITE_ENABLE_DEMO_MODE=false
VITE_LOG_LEVEL=debug
VITE_STORAGE_KEY_PREFIX=todos-test
```

Run tests:

```bash
npm test
npm run test:ui
npm run test:coverage
```

## Accessing Environment Variables in Code

Import the environment configuration utility in your components:

```typescript
import { ENV, getEnvConfig } from "@/utils/env";

// Get the current configuration
const config = getEnvConfig();

console.log(config.storageKeyPrefix); // 'todos-test' (in tests)
console.log(config.enableLocalStorage); // true
console.log(config.logLevel); // 'debug'
console.log(config.testMode); // true (in tests)
```

Or use the pre-computed `ENV` object:

```typescript
import { ENV } from "@/utils/env";

if (ENV.testMode) {
  console.debug("Running in test mode");
}
```

## Configuration File Reference

### `.env.example`

Template file showing all available environment variables with default values. Use this as a reference to create your own `.env.local` file.

### `.env.test`

Test-specific environment variables. Automatically loaded during test runs via `vitest.config.ts`.

### `.env.local` (not committed)

Local development overrides. Create this file to customize variables for your local environment.

### `.env.production` (not committed)

Production-specific environment variables.

## Best Practices

1. **Use `.env.example` as a template**: Copy it to `.env.local` and modify as needed
2. **Never commit `.env` files**: They may contain sensitive information
3. **Test with different configurations**: Use environment variables to test different app behaviors
4. **Type-safe access**: Use the `getEnvConfig()` function for type-safe access to variables
5. **Consistent naming**: Always use the `VITE_` prefix for variables that should be available in the browser

## Troubleshooting

### Variables not appearing in code

- Ensure they start with `VITE_` prefix
- Restart the dev server after changing `.env` files
- Rebuild the project if using production builds

### Test environment variables not loading

- Check that `vitest.config.ts` has the correct `env` object defined
- Ensure the `.env.test` file exists with the correct values
- Run `npm test` directly (not through other tools)
