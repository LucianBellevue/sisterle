# Go-live checklist (Sisterle)

Complete these before production traffic. Code SEO (sitemap, product pages, JSON-LD) ships in the repo; **you** must supply accounts, DNS, and secrets.

## 1. Gather secrets and links

| Item | Where | Set as |
| --- | --- | --- |
| Square business account | [squareup.com/signup](https://squareup.com/signup) | Merchant payouts |
| Square app (Production) | [Developer Console](https://developer.squareup.com/apps) | API access |
| Production access token | Credentials → Production | `SQUARE_ACCESS_TOKEN` |
| Location ID | Square Dashboard → Locations | `SQUARE_LOCATION_ID` |
| Environment | — | `SQUARE_ENVIRONMENT=production` |
| Live site URL | Domain | `NEXT_PUBLIC_SITE_URL=https://sisterle.shop` |
| Exact Depop shop URL | Your Depop profile (not depop.com home) | `NEXT_PUBLIC_DEPOP_URL` |
| Support email | Inbox that works | `SQUARE_SUPPORT_EMAIL=hello@sisterle.shop` |
| Instagram (optional) | Profile URL | `NEXT_PUBLIC_INSTAGRAM_URL` |
| GA4 (optional) | Google Analytics | `NEXT_PUBLIC_GA_ID` |

Copy from [`.env.example`](.env.example) into Vercel → Project → Settings → Environment Variables (Production).

## 2. Square Dashboard (not code)

- Business name, logo, bank payouts
- Shipping rates for online checkout
- Tax settings for your region
- Receipt / notification email
- List 1–3 real items for smoke test (Sisterle stock = 1; Depop mirrors fill **Depop URL**)

## 3. Domain + Vercel

1. Confirm DNS for `sisterle.shop`.
2. Create a Vercel project from this repo.
3. Add domain in Vercel; apply the A/CNAME records Vercel shows.
4. Ensure `hello@sisterle.shop` receives mail (MX at registrar / Workspace).
5. Deploy Production with env vars set.

## 4. One-time production attribute

With production token in `.env.local`:

```bash
npm run setup:square
```

Creates the seller-visible **Depop URL** catalog field.

## 5. Smoke test (after deploy)

Use this script once Production is live with real Square credentials:

```bash
# 1) Confirm catalog
curl -sI https://sisterle.shop | head -n 5
curl -sI https://sisterle.shop/robots.txt | head -n 5
curl -sI https://sisterle.shop/sitemap.xml | head -n 5

# 2) In the browser:
# - Open homepage shop sections
# - Open /shop/{itemId}
# - Add Sisterle item → Checkout with Square → pay small amount
# - Confirm order + inventory in Square Dashboard; refund if needed
```

## 6. Search Console

1. [Google Search Console](https://search.google.com/search-console) → add `sisterle.shop` (DNS TXT or HTML meta).
2. Submit sitemap: `https://sisterle.shop/sitemap.xml`
3. Request indexing for `/` and 2–3 product pages.

## Deploy blockers (need from you)

Production deploy cannot be finished from this repo alone until you provide:

1. Square Production `SQUARE_ACCESS_TOKEN` + `SQUARE_LOCATION_ID`
2. Exact `NEXT_PUBLIC_DEPOP_URL` (your Depop profile)
3. Vercel project access (or run `npx vercel --prod` after `npx vercel login`)
4. DNS for `sisterle.shop` pointed at Vercel

Then: set Vercel env vars → deploy → `npm run setup:square` with production token → smoke test → submit sitemap.

## Local vs production

- Local: Sandbox token + `SQUARE_ENVIRONMENT=sandbox` + `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- Never commit `.env.local` or production tokens
