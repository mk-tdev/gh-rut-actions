# Quick Start: Environment Variables

## 🚀 Get Started in 30 Seconds

### 1. Copy the Template

```bash
cp .env.example .env.local
```

### 2. Edit for Your Needs (Optional)

```bash
# Edit as needed
nano .env.local
```

### 3. Start Development

```bash
npm run dev
```

Your `.env.local` will automatically be loaded!

## 📝 Common Configurations

### Debug Mode (Maximum Logging)

```env
VITE_LOG_LEVEL=debug
VITE_TEST_MODE=false
VITE_ENABLE_DEMO_MODE=false
```

### Demo Mode (Sample Data)

```env
VITE_ENABLE_DEMO_MODE=true
VITE_ENABLE_LOCAL_STORAGE=false
```

### Production Ready

```env
VITE_LOG_LEVEL=warn
VITE_TEST_MODE=false
VITE_ENABLE_DEMO_MODE=false
VITE_STORAGE_KEY_PREFIX=todos
```

## 🧪 Run Tests

```bash
# All tests (automatically uses .env.test)
npm test

# With UI
npm run test:ui

# With coverage
npm run test:coverage
```

## 💡 Use in Code

```typescript
import { ENV } from "@/utils/env";

if (ENV.testMode) console.log("Testing!");
if (ENV.enableDemoMode) console.log("Demo mode!");
```

## 📚 Full Documentation

See `ENV_VARIABLES.md` for detailed documentation on all available variables.
