# Wealth Portfolio (`/portfolio`)

Next.js app migrated from [`brothermos/wealth-portfolio`](https://github.com/brothermos/wealth-portfolio).

Served on the main bromos domain at **`/portfolio`** via `basePath` + root `vercel.json` rewrites.

## Local development

`basePath` is `/portfolio`, so the app is **not** at `/`.

### From the monorepo root (recommended)

```bash
npm install
npm install --prefix apps/portfolio
npm run dev:all
```

Open [http://localhost:5173/portfolio](http://localhost:5173/portfolio) — Vite proxies to Next.js.

### This app only

```bash
cd apps/portfolio
cp .env.example .env.local   # fill Logo.dev keys if needed
npm install
npm run dev
```

Open [http://localhost:3000/portfolio](http://localhost:3000/portfolio).

## Vercel setup (same domain as portfolio-v2)

1. In Vercel, **Add New Project** from this same GitHub repo.
2. Set **Root Directory** to `apps/portfolio`.
3. Suggested project name: `bromos-portfolio` (must match the rewrite host in root `vercel.json`).
4. Deploy. Confirm `https://bromos-portfolio.vercel.app/portfolio` works.
5. If the production host differs, update the rewrite destinations in the repo-root `vercel.json`.

The main `portfolio-v2` project keeps `www.bromos.dev` and proxies `/portfolio` (+ `/portfolio/*`) to this app.

## Environment variables

Copy from `.env.example`:

- `NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY`
- `LOGO_DEV_SECRET_KEY`
