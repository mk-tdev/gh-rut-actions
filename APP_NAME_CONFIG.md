# App Name Configuration via Environment Variables

## Overview

The Todo App now reads its display name from environment variables, allowing you to easily customize the app title for different environments (development, testing, production).

## How It Works

### Environment Variables

The app name is configured via the `VITE_APP_NAME` environment variable:

**`.env.example`** (Development default):

```env
VITE_APP_NAME=Todo App
```

**`.env.test`** (Testing):

```env
VITE_APP_NAME=Todo App (Test)
```

### Configuration Access

The `src/utils/env.ts` utility provides type-safe access:

```typescript
import { ENV } from "@/utils/env";

console.log(ENV.appName); // "Todo App" or "Todo App (Test)" depending on environment
```

### Usage in Components

The `TodoApp` component now uses the environment variable for the heading:

**Before:**

```tsx
<h1>Todo App</h1>
```

**After:**

```tsx
import { ENV } from "../utils/env";

<h1>{ENV.appName}</h1>;
```

## Testing

The app automatically detects it's running in test mode and displays "Todo App (Test)":

```bash
npm test
```

All tests (98 tests) pass and automatically use `ENV.appName`:

```typescript
// src/components/__tests__/TodoApp.test.tsx
import { ENV } from "../../utils/env";

it("renders the todo app heading", () => {
  render(<TodoApp />);
  expect(screen.getByText(ENV.appName)).toBeInTheDocument(); // Checks for "Todo App (Test)"
});
```

## Quick Start

### 1. Development

Create `.env.local` from the template:

```bash
cp .env.example .env.local
```

Edit to customize:

```env
VITE_APP_NAME=My Todo App
```

Start dev server:

```bash
npm run dev
```

### 2. Production Build

```bash
VITE_APP_NAME="Production Todo App" npm run build
```

Or create `.env.production`:

```env
VITE_APP_NAME=Production Todo App
```

Then build:

```bash
npm run build
```

### 3. Testing

Tests automatically use `VITE_APP_NAME=Todo App (Test)`:

```bash
npm test
```

## Environment-Specific Configurations

| Environment | App Name          | Purpose               |
| ----------- | ----------------- | --------------------- |
| Development | `Todo App`        | Local development     |
| Testing     | `Todo App (Test)` | Automated tests       |
| Demo        | `Todo App (Demo)` | Live demonstrations   |
| Production  | `My App`          | Production deployment |

## Related Files

- `src/utils/env.ts` - Environment configuration utility
- `src/components/TodoApp.tsx` - Uses `ENV.appName` in heading
- `src/components/__tests__/TodoApp.test.tsx` - Tests use `ENV.appName`
- `.env.example` - Development template
- `.env.test` - Test configuration
- `vitest.config.ts` - Test environment setup

## Test Coverage

✅ **98 tests passing** including:

- 4 environment configuration tests
- 25 TodoApp component tests (use `ENV.appName`)
- 28 storage tests
- 15 todo item tests
- 7 todo list tests
- 7 todo input tests
- 6 todo filter tests
- 6 todo footer tests

All tests automatically adapt to the configured app name in their environment.
