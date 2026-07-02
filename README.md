# bilbis-demo-infra

## acme-site (Cloudflare Pages)

A static landing page deployed on Cloudflare Pages.

- **Deployment URL:** https://acme-site.pages.dev
- **Source:** `public/index.html` — a plain static HTML page with no build step
- **Deployment:** Connected to this repository; changes to `public/` are automatically deployed

## acme-hello (Cloudflare Worker)

A serverless worker handling dynamic requests (see `wrangler.toml` and `src/index.ts`).