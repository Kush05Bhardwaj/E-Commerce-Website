# 🎨 Web - Frontend Application# React + TypeScript + Vite



Modern React frontend for the MERN E-Commerce platform with beautiful animations, responsive design, and seamless user experience.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



## 🚀 Tech StackCurrently, two official plugins are available:



- **React 19** - UI library- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- **TypeScript** - Type safety- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **Vite** - Build tool & dev server

- **Redux Toolkit** - State management## React Compiler

- **React Router v7** - Routing

- **Tailwind CSS** - Utility-first stylingThe React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

- **Framer Motion** - Animations

- **React Query** - Server state## Expanding the ESLint configuration

- **React Hook Form** - Form handling

- **Zod** - Schema validationIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- **Axios** - HTTP client

```js

## 📁 Project Structureexport default defineConfig([

  globalIgnores(['dist']),

```  {

apps/web/    files: ['**/*.{ts,tsx}'],

├── public/    extends: [

│   └── vite.svg      // Other configs...

├── src/

│   ├── api/                    # API client setup      // Remove tseslint.configs.recommended and replace with this

│   │   └── client.ts      tseslint.configs.recommendedTypeChecked,

│   ├── app/                    # App-level providers      // Alternatively, use this for stricter rules

│   │   ├── providers.tsx      tseslint.configs.strictTypeChecked,

│   │   ├── theme.tsx      // Optionally, add this for stylistic rules

│   │   ├── theme-context.ts      tseslint.configs.stylisticTypeChecked,

│   │   └── useTheme.ts

│   ├── assets/                 # Static assets      // Other configs...

│   ├── components/    ],

│   │   ├── animations/         # Animation components    languageOptions: {

│   │   ├── cards/             # Card components      parserOptions: {

│   │   ├── layout/            # Layout components        project: ['./tsconfig.node.json', './tsconfig.app.json'],

│   │   └── ui/                # Reusable UI components        tsconfigRootDir: import.meta.dirname,

│   ├── features/              # Redux slices      },

│   │   ├── auth/      // other options...

│   │   ├── cart/    },

│   │   └── ui/  },

│   ├── hooks/                 # Custom hooks])

│   ├── pages/                 # Page components```

│   ├── routes/                # Route configuration

│   ├── store/                 # Redux storeYou can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

│   ├── styles/                # Global styles

│   ├── utils/                 # Utilities```js

│   ├── App.tsx// eslint.config.js

│   ├── main.tsximport reactX from 'eslint-plugin-react-x'

│   └── index.cssimport reactDom from 'eslint-plugin-react-dom'

├── index.html

├── package.jsonexport default defineConfig([

└── vite.config.ts  globalIgnores(['dist']),

```  {

    files: ['**/*.{ts,tsx}'],

## 🔧 Setup & Run    extends: [

      // Other configs...

```bash      // Enable lint rules for React

# Install dependencies      reactX.configs['recommended-typescript'],

npm install      // Enable lint rules for React DOM

      reactDom.configs.recommended,

# Development server    ],

npm run dev    languageOptions: {

      parserOptions: {

# Build for production        project: ['./tsconfig.node.json', './tsconfig.app.json'],

npm run build        tsconfigRootDir: import.meta.dirname,

      },

# Preview production build      // other options...

npm run preview    },

```  },

])

## 🎨 Features```


### Animations
- Scroll-triggered fade-ins
- Hover effects on all interactive elements
- Staggered list animations
- Spring physics for natural movement

### State Management
- Redux Toolkit for global state
- Auth, cart, and UI slices
- Persistent cart state

### Styling
- Tailwind CSS utility classes
- Custom design tokens
- Dark/Light theme support
- Responsive design

## 📚 Documentation

See the [main README](../../README.md) for complete documentation.

---

**Part of the MERN E-Commerce Platform**
