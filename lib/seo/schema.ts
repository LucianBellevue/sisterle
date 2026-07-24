import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  getPublicSiteUrl,
  getSameAsLinks,
} from "@/lib/site";
import { formatMoney } from "@/lib/square/money";
import type { StorefrontProduct } from "@/lib/square/types";

export function buildOrganizationSchema() {
  const siteUrl = getPublicSiteUrl();
  const sameAs = getSameAsLinks();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl,
    email: CONTACT_EMAIL,
    description: SITE_DESCRIPTION,
    logo: `${siteUrl}/sisterle-logo.png`,
    image: `${siteUrl}/og-default.jpg`,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function buildWebSiteSchema() {
  const siteUrl = getPublicSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function buildItemListSchema(products: StorefrontProduct[]) {
  const siteUrl = getPublicSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} shop`,
    itemListElement: products.slice(0, 24).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/shop/${product.id}`,
      name: product.name,
    })),
  };
}

export function buildProductSchema(product: StorefrontProduct) {
  const siteUrl = getPublicSiteUrl();
  const pageUrl = `${siteUrl}/shop/${product.id}`;
  const availability = product.soldOut
    ? "https://schema.org/SoldOut"
    : product.purchasable || product.channel === "depop"
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock";

  const offerUrl =
    product.channel === "depop" && product.depopUrl
      ? product.depopUrl
      : pageUrl;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description ||
      `${product.name} — curated thrift and vintage from ${SITE_NAME}.`,
    sku: product.variationId,
    image: product.imageUrl ? [product.imageUrl] : [`${siteUrl}/og-default.jpg`],
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    url: pageUrl,
    offers: {
      "@type": "Offer",
      url: offerUrl,
      priceCurrency: product.currency,
      price: (product.priceCents / 100).toFixed(2),
      availability,
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  };
}

export function buildBreadcrumbSchema(product: StorefrontProduct) {
  const siteUrl = getPublicSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.channel === "depop" ? "On Depop" : "Shop",
        item:
          product.channel === "depop"
            ? `${siteUrl}/#depop`
            : `${siteUrl}/#shop`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteUrl}/shop/${product.id}`,
      },
    ],
  };
}

export function productMetaDescription(product: StorefrontProduct): string {
  const price = formatMoney(product.priceCents, product.currency);
  const base =
    product.description?.trim() ||
    `${product.name} — one-of-one thrift and vintage from ${SITE_NAME}.`;
  const clipped = base.length > 140 ? `${base.slice(0, 137)}…` : base;
  return `${clipped} ${price}.`;
}
