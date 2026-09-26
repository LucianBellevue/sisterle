# Go-live checklist (Sisterle)

Canonical domain: **https://sisterle.com**  
Depop shop: **https://www.depop.com/sisterle/**

Code SEO (sitemap, product pages, JSON-LD) ships in the repo. Finish accounts, DNS, and secrets below.

## 1. Gather secrets and links

| Item | Where | Set as |
| --- | --- | --- |
| Square business account | Done | Merchant payouts |
| Square app (Production) | [Developer Console](https://developer.squareup.com/apps) | API access |
| Production access token | Credentials → Production | `SQUARE_ACCESS_TOKEN` |
| Location ID | Square Dashboard → Locations | `SQUARE_LOCATION_ID` |
| Environment | — | `SQUARE_ENVIRONMENT=production` |
| Live site URL | Domain | `NEXT_PUBLIC_SITE_URL=https://sisterle.com` |
| Depop shop URL | Fixed | `NEXT_PUBLIC_DEPOP_URL=https://www.depop.com/sisterle/` |
| Support email | Inbox that works | `SQUARE_SUPPORT_EMAIL=sales@sisterle.com` |
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

1. Confirm DNS for `sisterle.com` (and `www` if you use it).
2. Create a Vercel project from this repo.
3. Add domain in Vercel; apply the A/CNAME records Vercel shows.
4. Prefer apex `sisterle.com` as canonical; redirect `www` → apex (or the reverse — keep one primary).
5. Ensure `sales@sisterle.com` receives mail (MX at registrar / Google Workspace / etc.).
6. Deploy Production with env vars set.

## 4. One-time production attribute

With production token in `.env.local`:

```bash
npm run setup:square
```

Creates the seller-visible **Depop URL** catalog field.

## 5. Smoke test (after deploy)

```bash
curl -sI https://sisterle.com | head -n 5
curl -sI https://sisterle.com/robots.txt | head -n 5
curl -sI https://sisterle.com/sitemap.xml | head -n 5
```

In the browser:

- Open homepage shop sections
- Open `/shop/{itemId}`
- Add a Sisterle item → Checkout with Square → pay a small amount
- Confirm order + inventory in Square Dashboard; refund if needed
- Confirm Depop CTAs open `https://www.depop.com/sisterle/`

## 6. Search Console + SEO verification

Shipped in code already:

- Root metadata (title, description, OG/Twitter, canonical, robots) in `app/layout.tsx`
- `https://sisterle.com/robots.txt` and `https://sisterle.com/sitemap.xml` (includes `/shop/{itemId}`)
- Product pages with unique metadata + Product/Offer/Breadcrumb JSON-LD
- Homepage Organization + WebSite + ItemList JSON-LD
- Visible homepage H1: “Sisterle thrift & vintage”
- Default OG image: `/og-default.jpg` (1200×630)
- GA4 loads only when `NEXT_PUBLIC_GA_ID` is set **and** the visitor accepts cookies

After deploy:

1. [Google Search Console](https://search.google.com/search-console) → add `sisterle.com`
   - Prefer **DNS TXT** at your registrar, or HTML meta / Vercel domain verification
2. Submit sitemap: `https://sisterle.com/sitemap.xml`
3. Request indexing for `/` and 2–3 live `/shop/{itemId}` URLs
4. Optional: set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in Vercel for traffic insights

## Still need from you to finish deploy

1. Square Production `SQUARE_ACCESS_TOKEN` + `SQUARE_LOCATION_ID` (paste into Vercel / local `.env.local` — never commit)
2. Vercel project access (or run `npx vercel --prod` after login)
3. DNS for `sisterle.com` pointed at Vercel

Then: set Vercel env vars → deploy → `npm run setup:square` with production token → smoke test → submit sitemap.

## Local vs production

- Local: Sandbox token + `SQUARE_ENVIRONMENT=sandbox` + `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- Production: Production token + `SQUARE_ENVIRONMENT=production` + `NEXT_PUBLIC_SITE_URL=https://sisterle.com`
- Never commit `.env.local` or production tokens
