/**
 * Public site constants used for SEO, schema, and CTAs.
 * Override via env where noted.
 */
export const SITE_NAME = "Sisterle";
export const SITE_TAGLINE = "Thrift & vintage shop";
/** Visible homepage H1 — brand + short phrase for SEO without fighting the logo. */
export const SITE_HEADLINE = "Sisterle thrift & vintage";
export const SITE_DESCRIPTION =
  "Sisterle is a curated thrift and vintage storefront for antique pieces, pre-loved fashion, and one-of-one finds. Shop on sisterle.com or browse mirrored Depop listings.";

export const CONTACT_EMAIL =
  process.env.SQUARE_SUPPORT_EMAIL?.trim() || "sales@sisterle.com";

export function getPublicSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "https://sisterle.com";
}

export function getDepopShopUrl(): string {
  return (
    process.env.NEXT_PUBLIC_DEPOP_URL?.trim() ||
    "https://www.depop.com/sisterle/"
  );
}

export function getInstagramUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim();
  return url || null;
}

export function getSameAsLinks(): string[] {
  const links = [getDepopShopUrl()];
  const instagram = getInstagramUrl();
  if (instagram) links.push(instagram);
  return links.filter((link) => {
    try {
      const u = new URL(link);
      return u.hostname !== "www.depop.com" || u.pathname.length > 1;
    } catch {
      return false;
    }
  });
}
