# React + TypeScript + Vite

Personal site for **bromos** (`www.bromos.dev`).

## Apps in this repo

| Path | Stack | URL |
| --- | --- | --- |
| `/` (repo root) | Vite + React | `https://www.bromos.dev` |
| `apps/portfolio` | Next.js (Wealth Stocks) | `https://wealth.bromos.dev` |

The wealth app was migrated from the standalone `wealth-portfolio` repo. It is a separate Vercel project with custom domain `wealth.bromos.dev`. The root `vercel.json` 301-redirects `/portfolio` → that subdomain (see `apps/portfolio/README.md`).

### Run the main site

```bash
npm install
npm run dev
```

### Run Wealth Portfolio (`wealth.bromos.dev`)

Locally you need the Next.js app running on port 3000.

**Option A — both apps (recommended)**

```bash
npm install
npm install --prefix apps/portfolio
npm run dev:all
```

Then open:
- Main site: [http://localhost:5173](http://localhost:5173)
- Wealth app: [http://localhost:3000](http://localhost:3000)

**Option B — wealth app only**

```bash
npm run dev:portfolio
```

Open [http://localhost:3000](http://localhost:3000).

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
