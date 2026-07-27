import type { ReactNode } from "react";
import { BentoPanel } from "@/components/bento/BentoPanel";
import { ProductCard } from "@/components/shop/ProductCard";
import type { StorefrontProduct } from "@/lib/square/types";

type CatalogSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  products: StorefrontProduct[];
  emptyMessage: ReactNode;
};

export function CatalogSection({
  id,
  title,
  subtitle,
  products,
  emptyMessage,
}: CatalogSectionProps) {
  return (
    <section id={id} className="scroll-anchor">
      <div className="mb-4 flex flex-col gap-1 border-b-[3px] border-[var(--panel-coral)] pb-3 sm:mb-5">
        <h2 className="bento-title text-2xl text-[#141414] sm:text-3xl">{title}</h2>
        <p className="max-w-xl text-sm text-[#222]/80">{subtitle}</p>
      </div>

      {products.length === 0 ? (
        <BentoPanel tone="cream" className="p-6 text-sm leading-relaxed text-[#222]/85">
          {emptyMessage}
        </BentoPanel>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
