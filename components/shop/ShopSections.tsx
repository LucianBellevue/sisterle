import { CatalogSection } from "@/components/shop/CatalogSection";
import { UI_COPY } from "@/lib/copy/ui";
import type { CatalogFetchResult } from "@/lib/square/types";

type ShopSectionsProps = {
  catalog: CatalogFetchResult;
  depopShopUrl: string;
};

export function ShopSections({ catalog, depopShopUrl }: ShopSectionsProps) {
  const unavailableNote = catalog.available
    ? null
    : UI_COPY.empty.catalogUnavailable;

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <CatalogSection
        id="shop"
        title={UI_COPY.sections.shop}
        subtitle="Pieces you can buy right here. Listed in Square, fulfilled by us. ✨"
        products={catalog.sisterle}
        emptyMessage={unavailableNote ?? UI_COPY.empty.sisterle}
        headerTone="yellow"
      />
      <CatalogSection
        id="depop"
        title={UI_COPY.sections.depop}
        subtitle="Mirrored listings that live on Depop. Tap through to buy there. 💫"
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
              </a>{" "}
              ✨
            </>
          )
        }
        headerTone="blue"
      />
    </div>
  );
}
