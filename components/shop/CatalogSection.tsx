import type { ReactNode } from "react";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { CatalogProductGrid } from "@/components/shop/CatalogProductGrid";
import { getCatalogShellModifiers } from "@/lib/shop/catalog-layout";
import type { PanelTone } from "@/lib/bento/tones";
import type { StorefrontProduct } from "@/lib/square/types";

type CatalogSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  products: StorefrontProduct[];
  emptyMessage: ReactNode;
  headerTone?: PanelTone;
};

export function CatalogSection({
  id,
  title,
  subtitle,
  products,
  emptyMessage,
  headerTone = "cream",
}: CatalogSectionProps) {
  const starSeed = id === "shop" ? 31 : 37;
  const { layout, modifier } = getCatalogShellModifiers(products.length);
  const accent = id === "shop" ? "catalog-bento--shop" : "catalog-bento--depop";

  return (
    <section id={id} className="scroll-anchor">
      <BentoPanel
        tone={headerTone}
        bordered
        starSeed={starSeed}
        starCount={8}
        className={[
          "catalog-bento",
          accent,
          `catalog-bento--${modifier}`,
        ].join(" ")}
        as="div"
      >
        <div className="catalog-bento__layout">
          <header className="catalog-bento__header">
            <div className="catalog-bento__header-inner">
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
                <h2 className="bento-title text-xl text-[#141414] sm:text-3xl">
                  {title}
                </h2>
                {products.length > 0 ? (
                  <span className="catalog-bento__count">
                    {products.length}{" "}
                    {products.length === 1 ? "piece" : "pieces"}
                  </span>
                ) : null}
              </div>
              <p className="bento-copy max-w-prose">{subtitle}</p>
            </div>
          </header>

          <div className="catalog-bento__body">
            <div className="catalog-bento__well">
              {products.length === 0 ? (
                <p className="text-sm leading-relaxed text-[#222]/85">
                  {emptyMessage}
                </p>
              ) : (
                <CatalogProductGrid
                  products={products}
                  nested
                  layout={layout}
                />
              )}
            </div>
          </div>
        </div>
      </BentoPanel>
    </section>
  );
}
