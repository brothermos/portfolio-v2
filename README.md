# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

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

## My Work API (Vercel + Postgres)

This project can serve `My Work` content from `GET /api/works`.

- Endpoint file: `api/works.ts`
- Frontend hook: `src/hooks/useProjectsData.ts`
- If `DATABASE_URL` is missing or query fails, API automatically falls back to in-file seed data.

### 1) Create table

```sql
CREATE TABLE IF NOT EXISTS works (
  id BIGSERIAL PRIMARY KEY,
  number TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  tech TEXT[] NOT NULL DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 999,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 2) Seed example data

```sql
INSERT INTO works (number, title, company, description, tech, sort_order, published)
VALUES
  ('01', 'FINOVA', 'Odd-e Thailand × TTB Bank', 'Core banking web app replacing a legacy system for TTB Bank''s financial operations', ARRAY['React', 'TypeScript'], 1, TRUE),
  ('02', 'Corporate Value Up', 'Odd-e Thailand × SET', 'Multi-step form platform under the Stock Exchange of Thailand''s Corporate Value Up initiative', ARRAY['React', 'TypeScript'], 2, TRUE)
ON CONFLICT (number) DO UPDATE
SET
  title = EXCLUDED.title,
  company = EXCLUDED.company,
  description = EXCLUDED.description,
  tech = EXCLUDED.tech,
  sort_order = EXCLUDED.sort_order,
  published = EXCLUDED.published,
  updated_at = NOW();
```

### 3) Set Vercel environment variable

- `DATABASE_URL=<your_postgres_connection_string>`

After setting env, redeploy and the frontend will read `My Work` content from `/api/works`.
