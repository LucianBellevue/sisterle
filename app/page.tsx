import { HeroBento } from "@/components/bento/HeroBento";
import { StoryBento } from "@/components/bento/StoryBento";
import { SectionScrollSpy } from "@/components/SectionScrollSpy";
import { ShelfNav } from "@/components/ShelfNav";
import { ShopSections } from "@/components/shop/ShopSections";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { fetchStorefrontCatalog } from "@/lib/square/catalog";
import {
  buildItemListSchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/seo/schema";
import {
  CONTACT_EMAIL,
  getDepopShopUrl,
  getInstagramUrl,
} from "@/lib/site";

export const dynamic = "force-dynamic";

const UIFORGE_URL = "https://uiforge.io/";

export default async function Home() {
  const catalog = await fetchStorefrontCatalog();
  const depopUrl = getDepopShopUrl();
  const allProducts = [...catalog.sisterle, ...catalog.depop];
  const featured =
    catalog.sisterle.find((p) => p.imageUrl && p.purchasable) ??
    catalog.sisterle[0] ??
    null;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildWebSiteSchema()} />
      {allProducts.length > 0 ? (
        <JsonLd data={buildItemListSchema(allProducts)} />
      ) : null}

      <SectionScrollSpy
        sectionIds={["info", "about", "shop", "depop", "contact"]}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-3 pb-8 pt-3 sm:px-8 sm:pb-16 sm:pt-10 lg:px-10">
        <div className="mb-3 hidden md:block">
          <ShelfNav depopUrl={depopUrl} />
        </div>

        {/* One continuous bento board — tight gaps so bands read as one layout */}
        <main className="flex flex-1 flex-col gap-3 sm:gap-4">
          <HeroBento products={allProducts} />
          <ShopSections catalog={catalog} depopShopUrl={depopUrl} />
          <StoryBento
            featuredProduct={featured}
            depopUrl={depopUrl}
            email={CONTACT_EMAIL}
          />
        </main>

        <SiteFooter
          depopUrl={depopUrl}
          email={CONTACT_EMAIL}
          uiforgeUrl={UIFORGE_URL}
          instagramUrl={getInstagramUrl()}
        />
      </div>
    </div>
  );
}
