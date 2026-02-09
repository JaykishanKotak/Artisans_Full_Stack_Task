# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## 🚀 Quick Start

### 1. Install Dependencies

Navigate to the project directory and install all required dependencies:

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### 2. Run Development Server

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

### Development

- **`npm run dev`** - Start the development server with HMR enabled
- **`npm run preview`** - Preview the production build locally

### Building

- **`npm run build`** - Build the application for production (creates optimized bundle in `dist/` folder)

### Code Quality

- **`npm run lint`** - Check for linting errors
- **`npm run lint:fix`** - Automatically fix linting errors
- **`npm run lint:check`** - Check for linting errors without fixing

### Code Formatting

- **`npm run format`** - Format all code files with Prettier
- **`npm run format:check`** - Check code formatting without making changes

### Testing

- **`npm run test`** - Run unit tests with Vitest

## 🐳 Docker Setup

The application can also be run using Docker:

### Build Docker Image

```bash
docker build -t food-delivery-client .
```

### Run Docker Container

```bash
docker run -p 80:80 food-delivery-client
```

The application will be available at `http://localhost`

## 🔧 Key Technologies

- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Vite** - Ultra-fast build tool and dev server
- **Redux Toolkit** - Predictable state management
- **React Router v7** - Client-side routing
- **Axios** - Promise-based HTTP client
- **React Hook Form** - Performant form management
- **Yup** - Schema validation
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Persist** - Local storage persistence
- **React Hot Toast** - Toast notifications
- **Vitest** - Fast unit testing framework

## 🌐 Environment Configuration

The API endpoint is configured in [src/shared/api/config.ts](src/shared/api/config.ts). Update the API base URL if needed for different environments:

```typescript
// Example environment setup
const API_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';
```
