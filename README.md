# MIDI - Editor Case Study

This project using basic template with React + TypeScript + Vite, provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Note

I use fake delay time for enjoy loading and skeleton on page action. We can edit delay time in ```./src/lib/config.ts```
```js
// ./src/lib/config.ts
export const DELAY_TIME_LOADING = 1000;
```

## Completed Features

- Store data in localstorage
- Song/Sequence Management
    - create | update | delete actions in home page
    - list all songs in home page
    - update action in song detail page
- MDID Note Management
    - add note via createButton
    - add note by clicking on blank time cell
    - update & delete note by clicking on note in grid
    - Import/Export Song feature via button in song detail page

## Using Libraries
- Mui
- Tailwind
- React Hook Form
- Yup
- Lodash
- Moment
- UUID

## Project Folder Structure

```js
src
├── hooks
│
├── lib 
│   ├── repositories // Working with external data like localstorage, IndexedDB or RESTful Api
│   │   ├── index.ts // Ideally we can use export to easy switching between localstorage, IndexedDB and RESTful Api.
│   │   ├── base-repository-with-localstorage.ts
│   │   └── ...
│   ├── services // Working with business logic
│   ├── validation-schemas // Contain validation schemas to validate input params of service
│   ├── config.ts // ex: edit faking delay time here
│   ├── constant.ts
│   ├── paths.ts // Define const PATH for router
│   ├── themes.ts // Themes are defined here
│   └── utils.ts
├── pages
│   ├── ...
│   └── share-feature-components // Contain feature components which are using on pages
├── shared-components // Contain presentation components
├── types // Type of entities are declared here
├── index.css
├── main.tsx
└── Router.tsx
```

## React Compiler

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

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
])
```
