import { CatalogSection } from "@/components/shop/CatalogSection";
import type { CatalogFetchResult } from "@/lib/square/types";

type ShopSectionsProps = {
  catalog: CatalogFetchResult;
  depopShopUrl: string;
};

export function ShopSections({ catalog, depopShopUrl }: ShopSectionsProps) {
  const unavailableNote = catalog.available
    ? null
    : "The live catalog is temporarily unavailable. Check back soon, or browse Depop in the meantime.";

  return (
    <>
      <CatalogSection
        id="shop"
        title="Shop Sisterle"
        subtitle="Pieces you can buy right here. Listed in Square, fulfilled by us."
        products={catalog.sisterle}
        emptyMessage={
          unavailableNote ??
          "No Sisterle items are live yet. New drops land here as soon as we list them."
        }
        accent="blue"
      />
      <CatalogSection
        id="depop"
        title="On Depop"
        subtitle="Mirrored listings that live on Depop. Tap through to buy there."
        products={catalog.depop}
        emptyMessage={
          unavailableNote ?? (
            <>
              No Depop mirrors are listed yet.{" "}
              <a
                href={depopShopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                Visit the Depop shop
              </a>
              .
            </>
          )
        }
        accent="paper"
      />
    </>
  );
}
