# Wealth Portfolio (`wealth.bromos.dev`)

Next.js app migrated from [`brothermos/wealth-portfolio`](https://github.com/brothermos/wealth-portfolio).

Served at **`https://wealth.bromos.dev`**. The main site redirects `/portfolio` → this subdomain.

## Local development

The app is served at `/` (no `basePath`).

### From the monorepo root (recommended)

```bash
npm install
npm install --prefix apps/portfolio
npm run dev:all
```

- Main site: [http://localhost:5173](http://localhost:5173)
- Wealth app: [http://localhost:3000](http://localhost:3000)

### This app only

```bash
cd apps/portfolio
cp .env.example .env.local   # fill Logo.dev keys if needed
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Vercel setup

1. In Vercel, **Add New Project** from this same GitHub repo (if not already).
2. Set **Root Directory** to `apps/portfolio`.
3. Suggested project name: `bromos-portfolio`.
4. **Settings → Domains** → add `wealth.bromos.dev` (DNS: CNAME to `cname.vercel-dns.com`, or follow Vercel’s instructions).
5. Deploy. Confirm `https://wealth.bromos.dev` works.

The main `portfolio-v2` project keeps `www.bromos.dev` and 301-redirects `/portfolio` (+ `/portfolio/*`) to `wealth.bromos.dev`.

## Environment variables

Copy from `.env.example`:

- `NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY`
- `LOGO_DEV_SECRET_KEY`
