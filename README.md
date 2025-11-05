# Todo App with GitHub Actions

A modern, fully-tested Todo application built with React, TypeScript, and Vite. Features session storage persistence and comprehensive test coverage with automated CI/CD workflows.

## 🚀 Features

- **Modern React Stack**: Built with React 19, TypeScript, and Vite
- **Session Storage Persistence**: Todos persist across page refreshes using a safe session storage utility
- **Component Architecture**: Clean, modular component structure with separation of concerns
- **Comprehensive Testing**: 94 tests with 100% coverage using Vitest and React Testing Library
- **Type Safety**: Full TypeScript support with strict type checking
- **Accessible**: ARIA labels and semantic HTML for better accessibility
- **CI/CD**: Automated testing and building with GitHub Actions

## 📦 Project Structure

```
src/
├── components/
│   ├── __tests__/          # Component tests
│   │   ├── TodoApp.test.tsx
│   │   ├── TodoFilter.test.tsx
│   │   ├── TodoFooter.test.tsx
│   │   ├── TodoInput.test.tsx
│   │   ├── TodoItem.test.tsx
│   │   └── TodoList.test.tsx
│   ├── TodoApp.tsx         # Main app component
│   ├── TodoFilter.tsx      # Filter buttons (All/Active/Completed)
│   ├── TodoFooter.tsx      # Footer with item count and clear button
│   ├── TodoInput.tsx       # Input field and add button
│   ├── TodoItem.tsx        # Individual todo item
│   ├── TodoList.tsx        # List container
│   └── types.ts            # Shared TypeScript types
├── utils/
│   ├── __tests__/
│   │   └── sessionStorage.test.ts
│   └── sessionStorage.ts   # Safe session storage utility
└── App.tsx                 # Root component
```

## 🛠️ Tech Stack

- **Framework**: React 19.1.1
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.1.7
- **Testing**: Vitest 4.0.7 + React Testing Library
- **Linting**: ESLint 9.36.0
- **Styling**: CSS

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run preview      # Preview production build

# Building
npm run build        # Build for production

# Testing
npm test             # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage report

# Linting
npm run lint         # Run ESLint
```

## 🧪 Testing

The project has comprehensive test coverage with 94 tests across all components and utilities:

- **Component Tests**: Test user interactions, rendering, and state management
- **Utility Tests**: Test session storage operations and error handling
- **Integration Tests**: Test session storage persistence across component lifecycle

Run tests with:
```bash
npm test              # Watch mode
npm run test:ui       # Interactive UI
npm run test:coverage # Coverage report
```

## 🔄 GitHub Actions Workflows

### 1. Test Workflow (`test.yml`)
**Trigger**: Push to any branch, manual dispatch

Runs on every push to ensure code quality:
- **Test Job**: Runs all 94 tests on Ubuntu with Node.js 20
- **Build Job**: Builds the project after tests pass

```yaml
Jobs:
  - test: Install dependencies → Run tests
  - build: Install dependencies → Build project (runs after test)
```

### 2. Alpha Workflow (`alpha-action.yml`)
**Trigger**: Manual dispatch only

Simple demonstration workflow:
- Prints greeting messages
- Useful for testing GitHub Actions setup

### 3. Output Workflow (`output.yml`)
**Trigger**: Manual dispatch only

Debugging workflow:
- Prints greeting
- Outputs full GitHub context for inspection

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gh-rut-actions.git
   cd gh-rut-actions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 💾 Session Storage Utility

The app includes a safe session storage utility with error handling:

```typescript
import { sessionStorage } from './utils/sessionStorage';

// Get item with default value
const todos = sessionStorage.getItem<Todo[]>('todos', []);

// Set item
sessionStorage.setItem('todos', updatedTodos);

// Remove item
sessionStorage.removeItem('todos');

// Clear all
sessionStorage.clear();

// Check availability
if (sessionStorage.isAvailable()) {
  // Use session storage
}
```

Features:
- Type-safe generic methods
- Automatic JSON serialization/deserialization
- Error handling with console logging
- Graceful fallback to default values

## 🎯 Todo App Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit todos (double-click)
- ✅ Delete todos
- ✅ Filter by All/Active/Completed
- ✅ Clear all completed todos
- ✅ Persist across page refreshes
- ✅ Active todo count
- ✅ Keyboard shortcuts (Enter to add/save, Escape to cancel)

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please ensure all tests pass before submitting a PR.

```bash
npm test              # Run tests
npm run lint          # Check linting
npm run build         # Verify build works
```
