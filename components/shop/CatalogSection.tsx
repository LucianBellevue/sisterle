import type { ReactNode } from "react";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { ProductCard } from "@/components/shop/ProductCard";
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
  const [featured, ...rest] = products;
  const featuredSpan =
    rest.length === 0
      ? "lg:col-span-3"
      : "sm:col-span-2 lg:col-span-2 lg:row-span-2";

  return (
    <section id={id} className="scroll-anchor">
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-4">
        <BentoPanel
          tone={headerTone}
          className="flex flex-col justify-between p-4 sm:p-6 lg:col-span-1"
        >
          <div>
            <div className="flex items-end justify-between gap-3 lg:block">
              <h2 className="bento-title text-xl text-current sm:text-3xl">
                {title}
              </h2>
              {products.length > 0 ? (
                <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-current/60 lg:mt-6 lg:text-xs lg:tracking-[0.16em]">
                  {products.length}{" "}
                  {products.length === 1 ? "piece" : "pieces"}
                </p>
              ) : null}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-current/85 sm:mt-3">
              {subtitle}
            </p>
          </div>
        </BentoPanel>

        {products.length === 0 ? (
          <BentoPanel
            tone="cream"
            className="p-4 text-sm leading-relaxed text-[#222]/85 sm:p-6 lg:col-span-3"
          >
            {emptyMessage}
          </BentoPanel>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-3 lg:grid-cols-3">
            {featured ? (
              <div className={featuredSpan}>
                <ProductCard product={featured} index={0} featured />
              </div>
            ) : null}
            {rest.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index + 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
