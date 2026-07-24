import type { MetadataRoute } from "next";
import { fetchStorefrontCatalog } from "@/lib/square/catalog";
import { getPublicSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getPublicSiteUrl();
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  try {
    const catalog = await fetchStorefrontCatalog();
    const products = [...catalog.sisterle, ...catalog.depop];
    for (const product of products) {
      entries.push({
        url: `${siteUrl}/shop/${product.id}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.8,
      });
    }
  } catch (error) {
    console.error("[sitemap]", error);
  }

  return entries;
}
