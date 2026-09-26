# Sisterle

Curated thrift & vintage storefront at **[sisterle.com](https://sisterle.com)**. Sisterle items sell on this site through **Square**. Depop listings are mirrored here and link out to [depop.com/sisterle](https://www.depop.com/sisterle/).

**Go live:** see [GO_LIVE.md](GO_LIVE.md) for Square, DNS, Vercel, secrets, smoke test, and Search Console.

## Stack

- Next.js (App Router) + React + Tailwind
- Square Catalog, Inventory, and Checkout (Payment Links)
- SEO: sitemap, robots, Open Graph, product pages, JSON-LD

## Setup

1. Copy env defaults:

```bash
cp .env.example .env.local
```

2. In [Square Developer Console](https://developer.squareup.com/apps), create an application and copy:
   - Access token → `SQUARE_ACCESS_TOKEN`
   - A location ID → `SQUARE_LOCATION_ID`
   - Set `SQUARE_ENVIRONMENT` to `sandbox` or `production`

3. Set `NEXT_PUBLIC_SITE_URL` to your public origin (production: `https://sisterle.com`). Required for Square checkout return redirects and SEO canonicals.

4. Set `NEXT_PUBLIC_DEPOP_URL` (default: `https://www.depop.com/sisterle/`).

5. Create the seller-visible **Depop URL** catalog attribute (one-time):

```bash
npm run setup:square
```

6. Install and run:

```bash
npm install
npm run dev
```

## How to list items (seller workflow)

All listing happens in **Square Dashboard → Item library**. No site admin is required.

### Sisterle shop item (sold on this website)

1. Create an item with name, photos, description, and price.
2. Turn on **Track stock** and set quantity to `1` for one-of-ones.
3. Leave **Depop URL** blank.
4. Save. The item appears under **Shop Sisterle** and at `/shop/{itemId}`.

### Depop-only mirror

1. Create the same kind of item in Square (photos/price help the site card look right).
2. Set the **Depop URL** custom attribute to the exact Depop product URL.
3. Save. The item appears under **On Depop** and `/shop/{itemId}` with a Depop checkout CTA.

### After a sale

- Successful Square checkouts show in the Square Dashboard and update inventory for tracked items.
- Stock is confirmed at payment time (not reserved while the hosted checkout is open). If two people somehow pay for the same one-of-one, resolve/refund from the Square Dashboard.

## Scripts

```bash
npm run dev          # local site
npm run build        # production build
npm run lint         # eslint
npm test             # catalog + checkout unit tests
npm run setup:square # create Depop URL attribute in Square
```

## SEO endpoints

- `https://sisterle.com/robots.txt`
- `https://sisterle.com/sitemap.xml` (homepage, trust pages, product URLs)
- Product pages: `/shop/[itemId]` with unique metadata + JSON-LD
- Trust pages: `/privacy`, `/terms`, `/shipping`, `/returns`, `/contact`
- Default social image: `/og-default.jpg`

## Notes

- Cart is client-side (localStorage). Checkout always re-validates catalog IDs and stock on the server before creating a Square Payment Link.
- Taxes/shipping should be configured in Square rather than hardcoded in this app.
